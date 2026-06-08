// api/content-script.js
// STAGE 2 — High-retention short-form script from a trend.
// POST { platform, topic, angle, trigger_type, hook?, language? }
// -> { title, target_seconds, hook:{...}, beats:[...], cta, audio_note, visual_prompts:[...] }

const { callClaude, extractJson, applyCors, readBody } = require("./_lib/anthropic")
const { nicheSystem } = require("./_lib/niche")

module.exports = async (req, res) => {
  applyCors(req, res)
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const body = await readBody(req)
    const platform = body.platform === "pinterest" ? "pinterest" : "instagram"
    const { topic, angle, trigger_type, hook } = body
    const language = body.language === "de" ? "de" : "en"
    if (!topic) return res.status(400).json({ error: "topic is required" })

    const langLine =
      language === "de"
        ? "All viewer-facing text (hook, vo, onscreen, cta) in GERMAN. Keys stay English."
        : "All viewer-facing text in ENGLISH."

    const schema =
      platform === "instagram"
        ? `{
  "title": "internal name",
  "target_seconds": 26,
  "hook": { "vo": "spoken line", "onscreen": "BOLD FULL-FRAME TEXT", "visual": "what's on screen + the cut" },
  "beats": [
    { "t": "2-9s", "label": "tension", "vo": "...", "onscreen": "...", "broll": "shot description" },
    { "t": "9-22s", "label": "payoff", "vo": "...", "onscreen": "...", "broll": "..." }
  ],
  "cta": { "vo": "comment-bait question", "onscreen": "Drop your number 👇", "endcard": "S&I. · siwedding.de · subtle deadline nudge" },
  "audio_note": "trending-audio guidance; land the drop on the first cut",
  "visual_prompts": ["detailed AI-image prompt per key frame, editorial wedding aesthetic, 9:16"]
}`
        : `{
  "title": "internal name",
  "target_seconds": 0,
  "hook": { "vo": "frame-1 promise (keyword-rich)", "onscreen": "FRAME 1 TEXT", "visual": "bright editorial frame" },
  "beats": [
    { "t": "frame 2", "label": "value", "vo": "...", "onscreen": "...", "broll": "..." },
    { "t": "frame 3", "label": "value", "vo": "...", "onscreen": "...", "broll": "..." }
  ],
  "cta": { "vo": "soft CTA", "onscreen": "Save this for later", "endcard": "siwedding.de" },
  "audio_note": "Pinterest: optional soft audio; prioritise on-pin text + SEO",
  "visual_prompts": ["detailed AI-image prompt per frame, bright editorial, 2:3 or 9:16"]
}`

    const user = `Write a ${platform === "instagram" ? "≤30s Instagram Reel" : "Pinterest Idea Pin (4–6 frames)"} script.

Topic: ${topic}
Angle: ${angle || "(choose the strongest)"}
Primary trigger: ${trigger_type || "(choose)"}
${hook ? `Seed hook (improve or keep): ${hook}` : ""}

Rules:
- The hook must stop the scroll ${platform === "instagram" ? "in the first 2 seconds" : "in frame 1"}.
- Open a curiosity gap and withhold the payoff until later.
- Build for ${platform === "instagram" ? "replays + comments + saves" : "saves + outbound clicks + keyword ranking"}.
- "visual_prompts" must be concrete enough to feed an image generator (subject, composition, lighting, mood, no text in image).
- ${langLine}

Output ONLY JSON in exactly this shape:
${schema}`

    const text = await callClaude({ system: nicheSystem(platform), user, maxTokens: 2000 })
    const parsed = extractJson(text)
    if (!parsed || !parsed.hook) {
      return res.status(502).json({ error: "Could not parse script", raw: text?.slice(0, 800) })
    }
    return res.status(200).json({ platform, language, script: parsed })
  } catch (err) {
    console.error("content-script error:", err)
    return res.status(500).json({ error: err.message })
  }
}
