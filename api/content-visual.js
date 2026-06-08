// api/content-visual.js
// STAGE 3 — Matching AI visuals.
// Two layers:
//   (a) ALWAYS works: refine each frame into a production-grade image prompt (Claude).
//   (b) OPTIONAL: actually generate images if an image provider is configured,
//       and host them on Cloudinary if configured. Otherwise returns prompts only,
//       so the operator can generate them in their tool of choice.
//
// POST { platform, visual_prompts: string[], aspect?: "9:16"|"2:3", count?: number }
// -> { visuals: [{ prompt, status, url|null, provider|null }] }
//
// ENV (all optional):
//   IMAGE_PROVIDER = "openai" | "stability" | "none"   (default "none")
//   OPENAI_API_KEY            (for openai)
//   STABILITY_API_KEY         (for stability)
//   CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET   (unsigned upload hosting)

const { callClaude, extractJson, applyCors, readBody } = require("./_lib/anthropic")
const { nicheSystem } = require("./_lib/niche")

const ASPECT_SIZES = {
  "9:16": { w: 1024, h: 1792 },
  "2:3": { w: 1024, h: 1536 },
}

async function refinePrompts(platform, prompts, aspect) {
  const user = `Turn each rough idea into ONE production-grade text-to-image prompt for an editorial wedding-website brand.
Aspect ratio: ${aspect}. Bright, refined, film-like, true-to-color, no text/words rendered in the image, no logos, no real celebrities.
Rough ideas:
${prompts.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Output ONLY a JSON array of refined prompt strings, same order.`
  const text = await callClaude({ system: nicheSystem(platform), user, maxTokens: 1200 })
  const arr = extractJson(text)
  return Array.isArray(arr) ? arr : prompts
}

async function cloudinaryUpload(dataUri) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME
  const preset = process.env.CLOUDINARY_UPLOAD_PRESET
  if (!cloud || !preset) return null
  const form = new URLSearchParams()
  form.append("file", dataUri)
  form.append("upload_preset", preset)
  form.append("folder", "content-studio")
  const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    body: form,
  })
  if (!r.ok) return null
  const j = await r.json()
  return j.secure_url || null
}

async function genOpenAI(prompt, aspect) {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null
  const { w, h } = ASPECT_SIZES[aspect] || ASPECT_SIZES["9:16"]
  const size = `${w}x${h}`
  const r = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size, n: 1 }),
  })
  if (!r.ok) throw new Error(`OpenAI images ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const j = await r.json()
  const b64 = j.data?.[0]?.b64_json
  return b64 ? `data:image/png;base64,${b64}` : j.data?.[0]?.url || null
}

async function genStability(prompt, aspect) {
  const key = process.env.STABILITY_API_KEY
  if (!key) return null
  const ar = aspect === "2:3" ? "2:3" : "9:16"
  const form = new FormData()
  form.append("prompt", prompt)
  form.append("aspect_ratio", ar)
  form.append("output_format", "png")
  const r = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, accept: "image/*" },
    body: form,
  })
  if (!r.ok) throw new Error(`Stability ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const buf = Buffer.from(await r.arrayBuffer())
  return `data:image/png;base64,${buf.toString("base64")}`
}

module.exports = async (req, res) => {
  applyCors(req, res)
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const body = await readBody(req)
    const platform = body.platform === "pinterest" ? "pinterest" : "instagram"
    const aspect = body.aspect === "2:3" ? "2:3" : "9:16"
    let prompts = Array.isArray(body.visual_prompts) ? body.visual_prompts.filter(Boolean) : []
    const limit = Math.min(Math.max(parseInt(body.count) || prompts.length || 3, 1), 6)
    prompts = prompts.slice(0, limit)
    if (prompts.length === 0) return res.status(400).json({ error: "visual_prompts required" })

    const refined = await refinePrompts(platform, prompts, aspect)
    const provider = process.env.IMAGE_PROVIDER || "none"

    const visuals = []
    for (const prompt of refined) {
      if (provider === "none") {
        visuals.push({ prompt, status: "prompt_ready", url: null, provider: null })
        continue
      }
      try {
        let dataOrUrl = null
        if (provider === "openai") dataOrUrl = await genOpenAI(prompt, aspect)
        else if (provider === "stability") dataOrUrl = await genStability(prompt, aspect)

        if (!dataOrUrl) {
          visuals.push({ prompt, status: "prompt_ready", url: null, provider: null })
          continue
        }
        // Host data URIs on Cloudinary when possible so we never store base64 in the DB.
        let url = dataOrUrl
        if (dataOrUrl.startsWith("data:")) {
          const hosted = await cloudinaryUpload(dataOrUrl)
          url = hosted || dataOrUrl
        }
        visuals.push({
          prompt,
          status: url.startsWith("data:") ? "generated_unhosted" : "generated",
          url,
          provider,
        })
      } catch (e) {
        visuals.push({ prompt, status: "error", error: e.message, url: null, provider })
      }
    }

    return res.status(200).json({ platform, aspect, provider, visuals })
  } catch (err) {
    console.error("content-visual error:", err)
    return res.status(500).json({ error: err.message })
  }
}
