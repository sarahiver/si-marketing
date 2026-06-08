// src/lib/contentStudio.js
// Data + orchestration layer for the Content Studio.
// Persistence via Supabase (anon client from config); generation via /api endpoints.
//
// NOTE: uses the anon `supabase` client + permissive RLS (see schema SQL).
// If you prefer the service-role admin client, swap the import for your
// `./supabase` `supabaseAdmin` export.

import { supabase } from "../config/supabase"

const API = "" // same-origin Vercel functions at /api/*

// Pipeline stages, in order.
export const STAGES = [
  { id: "trend", label: "Trend" },
  { id: "scripted", label: "Script" },
  { id: "visuals_ready", label: "Visuals" },
  { id: "video_ready", label: "Video" },
  { id: "captioned", label: "Caption" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
]

export const TRIGGERS = ["surprise", "fear", "ego", "urgency", "desire"]

// ---------------------------------------------------------------------------
// low-level helpers
// ---------------------------------------------------------------------------
async function apiPost(path, payload) {
  const res = await fetch(`${API}/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`)
  return json
}

function guard() {
  if (!supabase) throw new Error("Supabase not configured (REACT_APP_SUPABASE_URL / _ANON_KEY)")
}

// ---------------------------------------------------------------------------
// TRENDS
// ---------------------------------------------------------------------------
export async function scanTrends(platform, { language = "de", count = 6 } = {}) {
  try {
    const { trends, date } = await apiPost("content-trends", { platform, language, count })
    guard()
    const rows = trends.map((t) => ({
      platform,
      trend_date: date,
      topic: t.topic,
      angle: t.angle,
      trigger_type: t.trigger_type,
      hook: t.hook,
      format: t.format,
      rationale: t.rationale,
      score: t.score || null,
      used: false,
    }))
    const { data, error } = await supabase.from("content_trends").insert(rows).select()
    if (error) throw error
    return { data, error: null }
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function listTrends(platform, { onlyUnused = true } = {}) {
  try {
    guard()
    let q = supabase.from("content_trends").select("*").eq("platform", platform)
    if (onlyUnused) q = q.eq("used", false)
    const { data, error } = await q.order("score", { ascending: false }).limit(40)
    if (error) throw error
    return { data, error: null }
  } catch (e) {
    return { data: [], error: e.message }
  }
}

export async function markTrendUsed(id) {
  try {
    guard()
    const { error } = await supabase.from("content_trends").update({ used: true }).eq("id", id)
    if (error) throw error
    return { error: null }
  } catch (e) {
    return { error: e.message }
  }
}

// ---------------------------------------------------------------------------
// ITEMS
// ---------------------------------------------------------------------------
export async function createItemFromTrend(trend) {
  try {
    guard()
    const { data, error } = await supabase
      .from("content_items")
      .insert([
        {
          platform: trend.platform,
          trend_id: trend.id || null,
          title: trend.topic,
          status: "trend",
          trigger_type: trend.trigger_type,
          hook: trend.hook,
          topic: trend.topic,
          angle: trend.angle,
          format: trend.format,
        },
      ])
      .select()
      .single()
    if (error) throw error
    if (trend.id) await markTrendUsed(trend.id)
    return { data, error: null }
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function listItems(platform) {
  try {
    guard()
    const { data, error } = await supabase
      .from("content_items")
      .select("*")
      .eq("platform", platform)
      .neq("status", "archived")
      .order("updated_at", { ascending: false })
    if (error) throw error
    return { data, error: null }
  } catch (e) {
    return { data: [], error: e.message }
  }
}

export async function updateItem(id, patch) {
  try {
    guard()
    const { data, error } = await supabase
      .from("content_items")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()
    if (error) throw error
    return { data, error: null }
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function deleteItem(id) {
  try {
    guard()
    const { error } = await supabase.from("content_items").delete().eq("id", id)
    if (error) throw error
    return { error: null }
  } catch (e) {
    return { error: e.message }
  }
}

// ---------------------------------------------------------------------------
// PIPELINE ACTIONS (generate -> persist)
// ---------------------------------------------------------------------------
export async function generateScript(item, language = "de") {
  try {
    const { script } = await apiPost("content-script", {
      platform: item.platform,
      topic: item.topic,
      angle: item.angle,
      trigger_type: item.trigger_type,
      hook: item.hook,
      language,
    })
    return await updateItem(item.id, {
      script,
      hook: script?.hook?.onscreen || item.hook,
      status: "scripted",
    })
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function generateVisuals(item) {
  try {
    const prompts = item.script?.visual_prompts || []
    if (!prompts.length) throw new Error("No visual_prompts in script — generate the script first")
    const aspect = item.platform === "pinterest" ? "2:3" : "9:16"
    const { visuals } = await apiPost("content-visual", {
      platform: item.platform,
      visual_prompts: prompts,
      aspect,
    })
    return await updateItem(item.id, { visuals, status: "visuals_ready" })
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function assembleVideo(item) {
  try {
    const urls = (item.visuals || []).map((v) => v.url).filter(Boolean)
    const out = await apiPost("content-video", {
      itemId: item.id,
      visual_urls: urls,
      script: item.script,
    })
    const patch =
      out.mode === "render"
        ? { video_provider_job_id: out.jobId, video_status: out.status, video_url: out.url || null, status: "video_ready" }
        : { video_edit_list: out.edit_list, video_status: "manual", status: "video_ready" }
    return await updateItem(item.id, patch)
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function refreshVideoStatus(item) {
  try {
    if (!item.video_provider_job_id) return { data: item, error: null }
    const out = await apiPost("content-video", { jobId: item.video_provider_job_id })
    return await updateItem(item.id, { video_status: out.status, video_url: out.url || item.video_url })
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function generateCaption(item, language = "de") {
  try {
    const { caption } = await apiPost("content-caption", {
      platform: item.platform,
      topic: item.topic,
      script: item.script,
      language,
    })
    return await updateItem(item.id, { caption_data: caption, status: "captioned" })
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export async function scheduleItem(id, scheduledFor) {
  return updateItem(id, { scheduled_for: scheduledFor, status: "scheduled" })
}

export async function markPublished(id) {
  return updateItem(id, { published_at: new Date().toISOString(), status: "published" })
}
