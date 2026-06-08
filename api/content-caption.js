// api/content-caption.js
// STAGE 5 — Optimised caption + hashtags (Instagram) / SEO copy + keywords (Pinterest).
// POST { platform, topic, script?, language? }
// Instagram -> { caption, first_comment, hashtags:[], alt_text }
// Pinterest -> { title, description, keywords:[], hashtags:[], board_suggestion, alt_text }

const { callClaude, extractJson, applyCors, readBody } = require("./_lib/anthropic")
const { nicheSystem } = require("./_lib/niche")

module.exports = async (req, res) => {
  applyCors(req, res)
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const body = await readBody(req)
    const platform = body.platform === "pinterest" ? "pinterest" : "instagram"
    const { topic, script } = body
    const language = body.language === "de" ? "de" : "en"
    if (!topic && !script) return res.status(400).json({ error: "topic or script required" })

    const langLine =
      language === "de"
        ? "Write all viewer-facing copy in GERMAN. Keys stay English."
        : "Write all viewer-facing copy in ENGLISH."
    const scriptCtx = script ? `Script context:\n${JSON.stringify(script).slice(0, 1500)}` : ""

    const schema =
      platform === "instagram"
        ? `{
  "caption": "1–2 line hook caption that earns the click on 'more', ends with a comment-prompt. No hashtags in the caption.",
  "first_comment": "the hashtag block posted as the first comment",
  "hashtags": ["5–12 mixed-reach niche tags, no # symbol, no banned/spammy tags"],
  "alt_text": "concise accessibility description"
}`
        : `{
  "title": "≤100 char SEO title, front-loaded with the primary search keyword",
  "description": "2–3 sentence keyword-rich description written for Pinterest search, ends with a soft CTA",
  "keywords": ["6–10 search keywords/phrases couples actually type"],
  "hashtags": ["3–6 broad discovery tags, no # symbol"],
  "board_suggestion": "best board to pin to",
  "alt_text": "concise accessibility description"
}`

    const user = `Generate ${platform === "instagram" ? "an Instagram Reel caption + hashtag set" : "Pinterest SEO copy"} for the wedding-website niche.

Topic: ${topic || "(from script)"}
${scriptCtx}

Rules:
- ${platform === "instagram"
        ? "Caption earns watch-time + comments; hashtags go in first_comment, mix of niche (#weddingwebsite) and reach tags, avoid generic spam tags."
        : "Optimise for Pinterest SEARCH: front-load keywords, evergreen phrasing, high save intent."}
- ${langLine}

Output ONLY JSON in exactly this shape:
${schema}`

    const text = await callClaude({ system: nicheSystem(platform), user, maxTokens: 1000 })
    const parsed = extractJson(text)
    if (!parsed) return res.status(502).json({ error: "Could not parse caption", raw: text?.slice(0, 800) })
    return res.status(200).json({ platform, language, caption: parsed })
  } catch (err) {
    console.error("content-caption error:", err)
    return res.status(500).json({ error: err.message })
  }
}
