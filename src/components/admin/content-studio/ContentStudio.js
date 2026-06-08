// src/components/admin/content-studio/ContentStudio.js
// Drop-in superadmin module: AI content pipeline for Instagram + Pinterest.
//
// Wire into AdminPage with:
//   import ContentStudio from "../../components/admin/content-studio/ContentStudio"
//   ... add a nav tab, then: {currentView === VIEW.CONTENT_STUDIO && <ContentStudio />}

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  STAGES,
  scanTrends,
  listTrends,
  listItems,
  createItemFromTrend,
  deleteItem,
  generateScript,
  generateVisuals,
  assembleVideo,
  generateCaption,
  scheduleItem,
  markPublished,
} from "../../../lib/contentStudio"
import ContentItemCard from "./ContentItemCard"
import TrendList from "./TrendList"
import {
  Wrap, Bar, Tabs, Tab, Btn, KPIs, KPI, Board, Column, ColTitle, Banner, Empty,
} from "./styles"

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "pinterest", label: "Pinterest" },
]

const LANGS = [
  { id: "de", label: "DE" },
  { id: "en", label: "EN" },
]

export default function ContentStudio() {
  const [platform, setPlatform] = useState("instagram")
  const [language, setLanguage] = useState("de")
  const [trends, setTrends] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [msg, setMsg] = useState(null)
  const [showTrends, setShowTrends] = useState(true)

  const flash = (text, error = false) => {
    setMsg({ text, error })
    setTimeout(() => setMsg(null), 5000)
  }

  const load = useCallback(async () => {
    setLoading(true)
    const [t, i] = await Promise.all([listTrends(platform), listItems(platform)])
    if (t.error) flash(t.error, true)
    setTrends(t.data || [])
    setItems(i.data || [])
    setLoading(false)
  }, [platform])

  useEffect(() => {
    load()
  }, [load])

  const handleScan = async () => {
    setScanning(true)
    const res = await scanTrends(platform, { language })
    if (res.error) flash(res.error, true)
    else {
      flash(`Added ${res.data?.length || 0} trends.`)
      setShowTrends(true)
    }
    await load()
    setScanning(false)
  }

  const handleCreate = async (trend) => {
    const res = await createItemFromTrend(trend)
    if (res.error) flash(res.error, true)
    else {
      setItems((prev) => [res.data, ...prev])
      setTrends((prev) => prev.filter((t) => t.id !== trend.id))
    }
  }

  const replace = (updated) =>
    setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)))

  const handleRun = async (action, item) => {
    let res
    if (action === "script") res = await generateScript(item, language)
    else if (action === "visuals") res = await generateVisuals(item)
    else if (action === "video") res = await assembleVideo(item)
    else if (action === "caption") res = await generateCaption(item, language)
    else if (action === "schedule") {
      const when = window.prompt("Schedule for (YYYY-MM-DD HH:MM):")
      if (!when) return { error: null }
      const iso = new Date(when.replace(" ", "T")).toISOString()
      res = await scheduleItem(item.id, iso)
    } else if (action === "publish") res = await markPublished(item.id)

    if (res?.error) {
      flash(res.error, true)
      return res
    }
    if (res?.data) replace(res.data)
    return res
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete “${item.title}”?`)) return
    const { error } = await deleteItem(item.id)
    if (error) flash(error, true)
    else setItems((prev) => prev.filter((it) => it.id !== item.id))
  }

  const byStage = useMemo(() => {
    const map = Object.fromEntries(STAGES.map((s) => [s.id, []]))
    items.forEach((it) => {
      if (map[it.status]) map[it.status].push(it)
    })
    return map
  }, [items])

  return (
    <Wrap>
      <Bar>
        <Tabs>
          {PLATFORMS.map((p) => (
            <Tab key={p.id} active={platform === p.id} onClick={() => setPlatform(p.id)}>
              {p.label}
            </Tab>
          ))}
        </Tabs>

        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <Tabs>
            {LANGS.map((l) => (
              <Tab key={l.id} active={language === l.id} onClick={() => setLanguage(l.id)}>
                {l.label}
              </Tab>
            ))}
          </Tabs>
          <Btn onClick={handleScan} disabled={scanning}>
            {scanning ? "Scanning…" : "Scan today’s trends"}
          </Btn>
        </div>
      </Bar>

      {msg && <Banner error={msg.error}>{msg.text}</Banner>}

      <KPIs>
        {STAGES.map((s) => (
          <KPI key={s.id}>
            <b>{byStage[s.id]?.length || 0}</b>
            <span>{s.label}</span>
          </KPI>
        ))}
      </KPIs>

      <div>
        <Bar>
          <ColTitle style={{ opacity: 0.85 }}>
            Trends ({trends.length})
          </ColTitle>
          <Btn small ghost onClick={() => setShowTrends((s) => !s)}>
            {showTrends ? "Hide" : "Show"}
          </Btn>
        </Bar>
        {showTrends && (
          <div style={{ marginTop: "0.7rem" }}>
            <TrendList trends={trends} onCreate={handleCreate} />
          </div>
        )}
      </div>

      {loading ? (
        <Empty>Loading…</Empty>
      ) : (
        <Board>
          {STAGES.map((s) => (
            <Column key={s.id}>
              <ColTitle>
                <span>{s.label}</span>
                <span>{byStage[s.id]?.length || 0}</span>
              </ColTitle>
              {byStage[s.id]?.length ? (
                byStage[s.id].map((it) => (
                  <ContentItemCard key={it.id} item={it} onRun={handleRun} onDelete={handleDelete} />
                ))
              ) : (
                <Empty>—</Empty>
              )}
            </Column>
          ))}
        </Board>
      )}
    </Wrap>
  )
}
