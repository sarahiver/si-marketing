// api/_lib/anthropic.js
// Shared helpers for the Content Studio serverless functions.
// Files/folders prefixed with "_" are ignored as routes by Vercel,
// so this is a pure utility module (not an endpoint).

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514"

// ---------------------------------------------------------------------------
// Anthropic call
// ---------------------------------------------------------------------------
async function callClaude({
  system,
  user,
  maxTokens = 2000,
  tools = null,
  model = DEFAULT_MODEL,
}) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured")

  const body = {
    model,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: user }],
  }
  if (system) body.system = system
  if (tools) body.tools = tools

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Anthropic API ${res.status}: ${t.slice(0, 500)}`)
  }

  const data = await res.json()
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim()
  return text
}

// ---------------------------------------------------------------------------
// Robust JSON extraction (Claude sometimes wraps in prose / code fences)
// ---------------------------------------------------------------------------
function extractJson(text) {
  if (!text) return null
  let t = text.trim()
  t = t.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim()

  const firstObj = t.indexOf("{")
  const firstArr = t.indexOf("[")
  let start = -1
  if (firstArr === -1) start = firstObj
  else if (firstObj === -1) start = firstArr
  else start = Math.min(firstObj, firstArr)
  if (start === -1) return null

  const end = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"))
  const slice = t.slice(start, end + 1)

  try {
    return JSON.parse(slice)
  } catch {
    try {
      return JSON.parse(t)
    } catch {
      return null
    }
  }
}

// ---------------------------------------------------------------------------
// CORS — mirrors api/contact.js
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = [
  "https://siwedding.de",
  "https://www.siwedding.de",
  "https://si-marketing.vercel.app",
  "http://localhost:3000",
]

function applyCors(req, res) {
  const origin = req.headers.origin
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  res.setHeader("Access-Control-Allow-Origin", allowed)
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

// ---------------------------------------------------------------------------
// Body parsing (Vercel passes parsed req.body, but be defensive)
// ---------------------------------------------------------------------------
async function readBody(req) {
  if (req.body) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body
  }
  return await new Promise((resolve, reject) => {
    let d = ""
    req.on("data", (c) => (d += c))
    req.on("end", () => {
      try {
        resolve(d ? JSON.parse(d) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on("error", reject)
  })
}

module.exports = {
  callClaude,
  extractJson,
  applyCors,
  readBody,
  DEFAULT_MODEL,
}
