// src/components/admin/content-studio/ContentItemCard.js
import { useState } from "react"
import {
  Card, CardTitle, Hook, Tag, Meta, Actions, Btn, Detail,
} from "./styles"

const NEXT = {
  trend: { action: "script", label: "Generate script" },
  scripted: { action: "visuals", label: "Generate visuals" },
  visuals_ready: { action: "video", label: "Assemble video" },
  video_ready: { action: "caption", label: "Generate caption" },
  captioned: { action: "schedule", label: "Schedule" },
  scheduled: { action: "publish", label: "Mark published" },
}

function copy(text) {
  if (navigator?.clipboard) navigator.clipboard.writeText(text)
}

export default function ContentItemCard({ item, onRun, onDelete }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)

  const next = NEXT[item.status]
  const s = item.script
  const cap = item.caption_data

  const run = async (action) => {
    setBusy(true)
    setErr(null)
    const res = await onRun(action, item)
    if (res?.error) setErr(res.error)
    setBusy(false)
  }

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.4rem" }}>
        {item.trigger_type ? <Tag>{item.trigger_type}</Tag> : <span />}
        <button
          onClick={() => onDelete(item)}
          title="Delete"
          style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4, fontSize: "0.9rem" }}
        >
          ✕
        </button>
      </div>

      <CardTitle>{item.title}</CardTitle>
      {item.hook && <Hook>{item.hook}</Hook>}

      <Meta>
        {item.format && <span>{item.format}</span>}
        {item.scheduled_for && <span>· {new Date(item.scheduled_for).toLocaleString()}</span>}
        {item.video_status && <span>· video: {item.video_status}</span>}
      </Meta>

      {err && <div style={{ color: "#c0392b", fontSize: "0.72rem" }}>{err}</div>}

      <Actions>
        {next && (
          <Btn small onClick={() => run(next.action)} disabled={busy}>
            {busy ? "Working…" : next.label}
          </Btn>
        )}
        {(s || cap || item.visuals) && (
          <Btn small ghost onClick={() => setOpen((o) => !o)}>
            {open ? "Hide" : "View"}
          </Btn>
        )}
      </Actions>

      {open && (
        <Detail>
          {s && (
            <>
              <h5>Hook</h5>
              <div><strong>{s.hook?.onscreen}</strong></div>
              <div>🎙 {s.hook?.vo}</div>
              <div style={{ opacity: 0.7 }}>🎬 {s.hook?.visual}</div>
              <h5>Beats</h5>
              {(s.beats || []).map((b, i) => (
                <div key={i} style={{ marginBottom: "0.35rem" }}>
                  <code>{b.t}</code> — <strong>{b.label}</strong><br />
                  🎙 {b.vo}<br />
                  🅰️ {b.onscreen}<br />
                  <span style={{ opacity: 0.7 }}>🎬 {b.broll}</span>
                </div>
              ))}
              {s.cta && (
                <>
                  <h5>CTA</h5>
                  <div>{s.cta.onscreen} — {s.cta.vo}</div>
                  <div style={{ opacity: 0.7 }}>{s.cta.endcard}</div>
                </>
              )}
              {s.audio_note && (<><h5>Audio</h5><div>{s.audio_note}</div></>)}
            </>
          )}

          {item.visuals?.length > 0 && (
            <>
              <h5>Visuals</h5>
              {item.visuals.map((v, i) => (
                <div key={i} style={{ marginBottom: "0.4rem" }}>
                  {v.url ? <img src={v.url} alt={`frame ${i + 1}`} /> : null}
                  <div style={{ fontSize: "0.7rem", opacity: 0.75 }}>
                    [{v.status}] {v.prompt}
                  </div>
                </div>
              ))}
            </>
          )}

          {item.video_edit_list && (
            <>
              <h5>Edit list (CapCut)</h5>
              {item.video_edit_list.beats?.map((b, i) => (
                <div key={i}>
                  <code>{b.t}</code> {b.onscreen} {b.visual ? "🖼" : ""}
                </div>
              ))}
            </>
          )}
          {item.video_url && (<><h5>Video</h5><a href={item.video_url} target="_blank" rel="noreferrer">{item.video_url}</a></>)}

          {cap && (
            <>
              <h5>Caption</h5>
              <div>{cap.caption || cap.description}</div>
              {cap.title && <div><strong>Title:</strong> {cap.title}</div>}
              {(cap.hashtags?.length || cap.keywords?.length) && (
                <>
                  <h5>{cap.keywords ? "Keywords + tags" : "Hashtags"}</h5>
                  <div>
                    {(cap.keywords || []).map((k) => k).join(", ")}
                    {cap.keywords ? " · " : ""}
                    {(cap.hashtags || []).map((h) => `#${h}`).join(" ")}
                  </div>
                </>
              )}
              {cap.first_comment && (<><h5>First comment</h5><div>{cap.first_comment}</div></>)}
              <Actions>
                <Btn
                  small
                  ghost
                  onClick={() =>
                    copy(
                      `${cap.caption || cap.description || ""}\n\n${(cap.hashtags || [])
                        .map((h) => `#${h}`)
                        .join(" ")}`
                    )
                  }
                >
                  Copy caption
                </Btn>
              </Actions>
            </>
          )}
        </Detail>
      )}
    </Card>
  )
}
