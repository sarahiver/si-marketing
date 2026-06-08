// api/content-video.js
// STAGE 4 — Turn visuals + script into a 9:16 short-form video.
//
// Real video rendering needs a render service. This endpoint integrates with
// Creatomate (template-based, reliable for templated short-form). If it isn't
// configured, it returns a structured "edit list" the operator can drop into
// CapCut — so the stage is never a dead end.
//
// CREATE:  POST { itemId, visual_urls:[], script, audio_url? }
//   -> { mode:"render", jobId, status }   OR   { mode:"manual", edit_list:{...} }
// POLL:    POST { jobId }
//   -> { mode:"render", jobId, status, url|null }
//
// ENV (optional):
//   RENDER_PROVIDER = "creatomate"
//   CREATOMATE_API_KEY
//   CREATOMATE_TEMPLATE_ID   (a 9:16 template with image + text slots)

const { applyCors, readBody } = require("./_lib/anthropic")

function buildEditList(script, visualUrls) {
  const beats = []
  if (script?.hook) {
    beats.push({ t: "0-2s", onscreen: script.hook.onscreen, vo: script.hook.vo, visual: visualUrls[0] || null })
  }
  ;(script?.beats || []).forEach((b, i) => {
    beats.push({ t: b.t, onscreen: b.onscreen, vo: b.vo, visual: visualUrls[i + 1] || visualUrls[i] || null })
  })
  if (script?.cta) {
    beats.push({ t: "end", onscreen: script.cta.onscreen, endcard: script.cta.endcard, visual: null })
  }
  return {
    aspect: "9:16",
    audio_note: script?.audio_note || "Add trending audio; land the drop on the first cut.",
    beats,
  }
}

async function createCreatomate({ visualUrls, script, audioUrl }) {
  const key = process.env.CREATOMATE_API_KEY
  const templateId = process.env.CREATOMATE_TEMPLATE_ID
  if (!key || !templateId) return null

  // Map visuals + on-screen text into template modifications.
  const modifications = {}
  visualUrls.slice(0, 5).forEach((url, i) => {
    modifications[`Image-${i + 1}`] = url
  })
  const lines = []
  if (script?.hook?.onscreen) lines.push(script.hook.onscreen)
  ;(script?.beats || []).forEach((b) => b.onscreen && lines.push(b.onscreen))
  lines.slice(0, 5).forEach((t, i) => (modifications[`Text-${i + 1}`] = t))
  if (audioUrl) modifications["Audio"] = audioUrl

  const r = await fetch("https://api.creatomate.com/v1/renders", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ template_id: templateId, modifications }),
  })
  if (!r.ok) throw new Error(`Creatomate ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const j = await r.json()
  const render = Array.isArray(j) ? j[0] : j
  return { jobId: render.id, status: render.status, url: render.url || null }
}

async function pollCreatomate(jobId) {
  const key = process.env.CREATOMATE_API_KEY
  const r = await fetch(`https://api.creatomate.com/v1/renders/${jobId}`, {
    headers: { authorization: `Bearer ${key}` },
  })
  if (!r.ok) throw new Error(`Creatomate poll ${r.status}`)
  const j = await r.json()
  return { jobId, status: j.status, url: j.url || null }
}

module.exports = async (req, res) => {
  applyCors(req, res)
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const body = await readBody(req)
    const provider = process.env.RENDER_PROVIDER || "none"

    // Poll path
    if (body.jobId) {
      if (provider === "creatomate") {
        const r = await pollCreatomate(body.jobId)
        return res.status(200).json({ mode: "render", ...r })
      }
      return res.status(400).json({ error: "No render provider configured for polling" })
    }

    // Create path
    const visualUrls = (Array.isArray(body.visual_urls) ? body.visual_urls : []).filter(Boolean)
    const script = body.script || null

    if (provider === "creatomate") {
      const created = await createCreatomate({ visualUrls, script, audioUrl: body.audio_url })
      if (created) return res.status(200).json({ mode: "render", ...created })
    }

    // Fallback: hand back a clean edit list (never a dead end).
    return res.status(200).json({ mode: "manual", edit_list: buildEditList(script, visualUrls) })
  } catch (err) {
    console.error("content-video error:", err)
    return res.status(500).json({ error: err.message })
  }
}
