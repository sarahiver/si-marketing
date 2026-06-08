// api/content-trends.js
// STAGE 1 — Daily trend detection for the wedding-website niche.
// POST { platform: "instagram" | "pinterest", count?: number, useWebSearch?: bool, language?: "de"|"en" }
// -> { trends: [{ topic, angle, trigger_type, hook, format, rationale, score }] }

const { callClaude, extractJson, applyCors, readBody } = require("./_lib/anthropic")
const { nicheSystem } = require("./_lib/niche")

const WEB_SEARCH_TOOL = [{ type: "web_search_20250305", name: "web_search", max_uses: 4 }]

module.exports = async (req, res) => {
  applyCors(req, res)
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const body = await readBody(req)
    const platform = body.platform === "pinterest" ? "pinterest" : "instagram"
    const count = Math.min(Math.max(parseInt(body.count) || 6, 3), 12)
    const language = body.language === "de" ? "de" : "en"
    const useWebSearch = body.useWebSearch !== false

    const today = new Date().toISOString().slice(0, 10)
    const langLine =
      language === "de"
        ? "Write topic/angle/hook in GERMAN (DACH market). Keep keys English."
        : "Write topic/angle/hook in ENGLISH."

    const user = `Today is ${today}. Identify the ${count} strongest content topics for ${platform.toUpperCase()} in the wedding-website niche RIGHT NOW.

${useWebSearch ? "Use web search to ground these in what is actually trending in the last ~30 days (sounds, formats, recurring discussions on TikTok/Reels/Reddit/Pinterest)." : "Use your knowledge of current wedding-website content trends."}

${langLine}

For each topic return an object with:
- "topic": the subject in 3–8 words
- "angle": the specific take that makes it scroll-stopping (1 sentence)
- "trigger_type": one of surprise | fear | ego | urgency | desire
- "hook": a ready-to-shoot first-2-seconds line
- "format": e.g. "website tour", "mistakes listicle", "guest POV", "red flag/green flag", "our story", "idea pin steps"
- "rationale": why this works for ${platform} right now (1 sentence)
- "score": 1–100 estimated stop-scroll potential

Diversify the trigger_types across the set. Output ONLY a JSON array.`

    let text
    try {
      text = await callClaude({
        system: nicheSystem(platform),
        user,
        maxTokens: 2500,
        tools: useWebSearch ? WEB_SEARCH_TOOL : null,
      })
    } catch (e) {
      // Web search may not be enabled on the account — retry without it.
      if (useWebSearch) {
        text = await callClaude({ system: nicheSystem(platform), user, maxTokens: 2500 })
      } else {
        throw e
      }
    }

    const parsed = extractJson(text)
    const trends = Array.isArray(parsed) ? parsed : parsed?.trends
    if (!Array.isArray(trends)) {
      return res.status(502).json({ error: "Could not parse trends", raw: text?.slice(0, 800) })
    }

    return res.status(200).json({ platform, language, date: today, trends })
  } catch (err) {
    console.error("content-trends error:", err)
    return res.status(500).json({ error: err.message })
  }
}
