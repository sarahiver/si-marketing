// api/event-check.js
// Vercel Serverless Function — Termin-Check für den Hochzeitsdatum-Finder
// Prüft per Claude + Web-Suche, welche Großevents (Konzerte, Sport, Messen,
// Ferien-Kollisionen) an Wunschterminen in einer Stadt stattfinden.
// API-Key bleibt serverseitig (ANTHROPIC_API_KEY, bereits konfiguriert).
//
// Kostenkontrolle:
//  - max. 5 Termine pro Anfrage, max. 4 Web-Suchen pro Claude-Call
//  - In-Memory-Cache pro warmer Lambda (Stadt+Termine → 24h)
//  - Best-effort Rate-Limit pro IP (10 Checks / Stunde)

const { callClaude, extractJson, readBody } = require("./_lib/anthropic")

const ALLOWED_ORIGINS = [
  "https://sarahiver.com",
  "https://www.sarahiver.com",
  "https://si-marketing.vercel.app",
  "http://localhost:3000",
]

function cors(req, res) {
  const origin = req.headers.origin
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[1]
  res.setHeader("Access-Control-Allow-Origin", allowed)
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

// --- Best-effort Schutz (gilt pro warmer Lambda-Instanz) ---
const cache = new Map() // key -> { ts, data }
const ipHits = new Map() // ip -> { windowStart, count }
const CACHE_TTL = 24 * 60 * 60 * 1000
const RATE_LIMIT = 10
const RATE_WINDOW = 60 * 60 * 1000

function rateLimited(ip) {
  const now = Date.now()
  const entry = ipHits.get(ip)
  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    ipHits.set(ip, { windowStart: now, count: 1 })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

const DATE_RX = /^\d{4}-\d{2}-\d{2}$/

module.exports = async (req, res) => {
  cors(req, res)
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  let body
  try {
    body = await readBody(req)
  } catch {
    return res.status(400).json({ error: "Ungültiger Request-Body" })
  }

  // --- Validierung ---
  const city = String(body.city || "").trim().slice(0, 40)
  const dates = Array.isArray(body.dates) ? body.dates.slice(0, 5) : []
  if (city.length < 2 || !/^[\p{L}\s\-.']+$/u.test(city)) {
    return res.status(400).json({ error: "Bitte einen gültigen Stadtnamen eingeben." })
  }
  if (dates.length < 1 || !dates.every((x) => DATE_RX.test(x))) {
    return res.status(400).json({ error: "Bitte 1–5 gültige Termine angeben." })
  }
  const years = dates.map((x) => Number(x.slice(0, 4)))
  if (years.some((y) => y < 2026 || y > 2029)) {
    return res.status(400).json({ error: "Termine müssen zwischen 2026 und 2029 liegen." })
  }

  const ip = (req.headers["x-forwarded-for"] || "?").toString().split(",")[0].trim()
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Zu viele Anfragen – bitte in einer Stunde erneut versuchen." })
  }

  const key = `${city.toLowerCase()}|${dates.sort().join(",")}`
  const hit = cache.get(key)
  if (hit && Date.now() - hit.ts < CACHE_TTL) {
    res.setHeader("X-Cache", "HIT")
    return res.status(200).json(hit.data)
  }

  // --- Claude-Call mit Web-Suche ---
  const system = `Du bist ein Recherche-Assistent für Hochzeitsplanung im DACH-Raum.
Deine Aufgabe: Prüfe für die angegebene Stadt und die angegebenen Termine, ob Großereignisse
stattfinden, die Hotelpreise und Verfügbarkeit beeinflussen (große Konzerte, Stadion-Events,
Sport-Großereignisse wie Marathon/Ironman/Fußball-Turniere, Messen, Stadtfeste, Festivals).
Berücksichtige auch überregionale Mega-Events (WM, EM, Olympia), wenn sie in den Zeitraum fallen,
sowie Schulferien-Kollisionen im jeweiligen Bundesland.

Nutze die Web-Suche gezielt und sparsam (max. 4 Suchen). Wenn du für einen Termin nichts
Relevantes findest, ist das ein gutes Zeichen – erfinde KEINE Events. Kennzeichne Unsicherheit ehrlich.

Antworte AUSSCHLIESSLICH mit validem JSON, ohne Markdown, ohne Erklärtext, in exakt diesem Schema:
{
  "results": [
    {
      "date": "YYYY-MM-DD",
      "risk": "niedrig" | "mittel" | "hoch",
      "events": [{ "name": "...", "note": "kurze Einordnung, max. 15 Wörter" }],
      "hinweis": "1 Satz: Was bedeutet das fürs Heiraten an diesem Termin?"
    }
  ],
  "empfehlung": "1–2 Sätze: Welcher der geprüften Termine ist am besten und warum?"
}
Risk-Logik: "hoch" = Mega-Event/Messe direkt am Termin (Hotels teuer/knapp), "mittel" = größeres
Event in der Nähe des Termins oder Ferienbeginn, "niedrig" = nichts Relevantes gefunden.`

  const user = `Stadt: ${city}\nZu prüfende Hochzeitstermine: ${dates.join(", ")}\n\nPrüfe jeden Termin (inkl. des umliegenden Wochenendes) und gib das JSON zurück.`

  const tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }]
  const models = [
    process.env.ANTHROPIC_MODEL_EVENTCHECK || "claude-haiku-4-5-20251001",
    "claude-sonnet-4-20250514", // Fallback: läuft nachweislich (Content Studio)
  ]

  try {
    let text = null
    let lastErr = null
    for (const model of models) {
      try {
        text = await callClaude({ system, user, maxTokens: 2000, model, tools })
        break
      } catch (e) {
        lastErr = e
        console.error(`event-check: Modell ${model} fehlgeschlagen:`, e.message)
      }
    }
    if (text === null) throw lastErr

    const data = extractJson(text)
    if (!data || !Array.isArray(data.results)) {
      return res.status(502).json({ error: "Der Termin-Check hat kein verwertbares Ergebnis geliefert. Bitte erneut versuchen." })
    }

    // Defensive Normalisierung
    const safe = {
      results: data.results.slice(0, 5).map((r) => ({
        date: String(r.date || "").slice(0, 10),
        risk: ["niedrig", "mittel", "hoch"].includes(r.risk) ? r.risk : "niedrig",
        events: (Array.isArray(r.events) ? r.events : []).slice(0, 5).map((e) => ({
          name: String(e.name || "").slice(0, 90),
          note: String(e.note || "").slice(0, 140),
        })),
        hinweis: String(r.hinweis || "").slice(0, 220),
      })),
      empfehlung: String(data.empfehlung || "").slice(0, 320),
      stand: new Date().toISOString().slice(0, 10),
    }

    cache.set(key, { ts: Date.now(), data: safe })
    res.setHeader("X-Cache", "MISS")
    return res.status(200).json(safe)
  } catch (err) {
    console.error("event-check error:", err.message)
    return res.status(502).json({ error: "Termin-Check derzeit nicht verfügbar. Bitte später erneut versuchen." })
  }
}

// Web-Suche braucht Zeit – Vercel-Default (~10s) reicht nicht
module.exports.config = { maxDuration: 60 }
