// src/components/admin/content-studio/TrendList.js
import { useState } from "react"
import { Board, Card, CardTitle, Hook, Tag, Meta, Btn, Empty } from "./styles"

export default function TrendList({ trends, onCreate }) {
  const [busy, setBusy] = useState(null)

  if (!trends?.length) {
    return <Empty>No trends yet — run “Scan today’s trends”.</Empty>
  }

  const handle = async (t) => {
    setBusy(t.id)
    await onCreate(t)
    setBusy(null)
  }

  return (
    <Board>
      {trends.map((t) => (
        <Card key={t.id}>
          <div>
            <Tag>{t.trigger_type}</Tag>
          </div>
          <CardTitle>{t.topic}</CardTitle>
          {t.angle && <Hook>{t.angle}</Hook>}
          {t.hook && (
            <div style={{ fontSize: "0.78rem", opacity: 0.9 }}>
              <strong>Hook:</strong> {t.hook}
            </div>
          )}
          <Meta>
            {t.format && <span>{t.format}</span>}
            {t.score != null && <span>· score {t.score}</span>}
          </Meta>
          <Btn small onClick={() => handle(t)} disabled={busy === t.id}>
            {busy === t.id ? "Adding…" : "Create content →"}
          </Btn>
        </Card>
      ))}
    </Board>
  )
}
