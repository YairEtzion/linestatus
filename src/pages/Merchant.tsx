import { useMemo, useState } from 'react'
import {
  ANALYTICS,
  MERCHANT_STATUSES,
  QUEUES,
  VENUES,
  WAIT_META,
  type WaitBand,
} from '../data'
import { SourceChip, WaitBadge } from '../ui'

const managedVenueIds = ['lantern-room', 'riverside-urgent', 'fade-house']

export default function Merchant() {
  const [venueId, setVenueId] = useState(managedVenueIds[0])
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0]
  const [status, setStatus] = useState<WaitBand>(venue.waitBand)
  const queue = QUEUES[venue.id] ?? []
  const suggested = useMemo(() => suggestionFor(venue.waitBand, queue.length), [venue.waitBand, queue.length])

  return (
    <div className="merchant-page">
      <section className="merchant-hero panel">
        <div>
          <span className="section__eyebrow">Merchant console</span>
          <h1>Update public status in under five seconds.</h1>
          <p>
            A rush-time control room for hosts, nurses, barbers and event staff: publish a privacy-safe
            public wait band, manage the queue, and let AI nudge better quoted waits.
          </p>
        </div>
        <div className="merchant-hero__metric">
          <span>Reliability</span>
          <strong>{venue.reliability}%</strong>
          <small>source/freshness trust score</small>
        </div>
      </section>

      <div className="merchant-layout">
        <aside className="venue-switch panel">
          <h2>Managed venues</h2>
          {managedVenueIds.map((id) => {
            const v = VENUES.find((x) => x.id === id)!
            return (
              <button
                key={id}
                className={`venue-switch__item ${venueId === id ? 'is-active' : ''}`}
                onClick={() => {
                  setVenueId(id)
                  setStatus(v.waitBand)
                }}
              >
                <span>{v.name}</span>
                <small>{v.neighborhood} · {v.category}</small>
              </button>
            )
          })}
        </aside>

        <section className="status-console panel">
          <div className="panel__head">
            <div>
              <span className="section__eyebrow">Live public status</span>
              <h2>{venue.name}</h2>
            </div>
            <SourceChip source="merchant" minsAgo={1} confidence="high" />
          </div>

          <div className="status-buttons">
            {MERCHANT_STATUSES.map((s) => (
              <button
                key={s.band}
                className={`status-button tone-${WAIT_META[s.band].tone} ${status === s.band ? 'is-active' : ''}`}
                onClick={() => setStatus(s.band)}
              >
                <WaitBadge band={s.band} size="sm" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <div className="ai-suggestion">
            <div className="ai-suggestion__icon">✨</div>
            <div>
              <strong>AI quote suggestion</strong>
              <p>{suggested}</p>
            </div>
            <button className="btn btn--ghost btn--sm">Apply</button>
          </div>

          <div className="public-preview">
            <h3>Public preview</h3>
            <div className="preview-card">
              <div>
                <strong>{venue.name}</strong>
                <span>{venue.neighborhood} · updated just now</span>
              </div>
              <WaitBadge band={status} />
            </div>
            <p>Consumers see bands, source, freshness and confidence — never names or queue positions.</p>
          </div>
        </section>
      </div>

      <section className="panel queue-panel">
        <div className="panel__head">
          <div>
            <span className="section__eyebrow">Queue board</span>
            <h2>{queue.length} parties waiting</h2>
          </div>
          <div className="queue-actions">
            <button className="btn btn--ghost btn--sm">+ Walk-in</button>
            <button className="btn btn--primary btn--sm">Text next 3</button>
          </div>
        </div>
        <div className="queue-table">
          <div className="queue-row queue-row--head">
            <span>Name</span><span>Size</span><span>Channel</span><span>Quoted</span><span>Waited</span><span>Status</span><span>Action</span>
          </div>
          {queue.map((q) => (
            <div className="queue-row" key={q.id}>
              <span><strong>{q.name}</strong><small>{q.phone}</small></span>
              <span>{q.partySize}</span>
              <span>{q.channel}</span>
              <span>{q.quotedMins}m</span>
              <span>{q.waitedMins}m</span>
              <span className={`queue-state queue-state--${q.state}`}>{q.state}</span>
              <span><button className="btn btn--ghost btn--sm">Notify</button></span>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-grid">
        <Metric label="Public views" value={ANALYTICS.publicViews.toLocaleString()} delta={`+${ANALYTICS.viewsDelta}%`} />
        <Metric label="Remote joins" value={ANALYTICS.remoteJoins.toString()} delta={`+${ANALYTICS.joinsDelta}%`} />
        <Metric label="Confirmed visits" value={ANALYTICS.confirmedVisits.toString()} delta={`+${ANALYTICS.visitsDelta}%`} />
        <Metric label="Prediction accuracy" value={`${ANALYTICS.predictionAccuracy}%`} delta="model" />
      </section>

      <section className="panel insights-panel">
        <div className="panel__head">
          <div>
            <span className="section__eyebrow">AI operations summary · {ANALYTICS.range}</span>
            <h2>What changed this week</h2>
          </div>
        </div>
        <div className="insights-grid">
          <div className="funnel">
            {ANALYTICS.funnel.map((f) => (
              <div key={f.label} className="funnel__bar" style={{ width: `${Math.max(18, (f.value / ANALYTICS.funnel[0].value) * 100)}%` }}>
                <span>{f.label}</span><strong>{f.value.toLocaleString()}</strong>
              </div>
            ))}
          </div>
          <ul className="insight-list">
            {ANALYTICS.insights.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return <div className="metric panel"><span>{label}</span><strong>{value}</strong><small>{delta}</small></div>
}

function suggestionFor(band: WaitBand, count: number) {
  if (band === 'capacity') return 'Pause remote join for 20 min and show “at capacity”. Send delay text to waiting parties.'
  if (band === 'long') return `Quote 35–50 min. ${count} waiting; bar/single seats may clear faster.`
  if (band === 'moderate') return `Quote 18–28 min. Your actual waits run 7 min above quote after 8 PM.`
  if (band === 'short') return 'Quote 8–15 min and keep remote join open. Good time to capture walk-ins.'
  return 'Publish no wait. Consider promoting “walk right in” placement for the next hour.'
}
