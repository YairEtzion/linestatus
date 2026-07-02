import { COMPETITORS, PLANS } from '../data'

const gaps = [
  ['Public status first', 'Incumbents optimize reservations or back-office queues; LineStatus starts with the consumer decision: go now, wait, or join remotely.'],
  ['Cross-category coverage', 'Bars, salons, clinics, events and public services share the same uncertainty problem but are underserved by restaurant-only tools.'],
  ['Trust primitives', 'Every card shows source, freshness and confidence. Stale data is labeled instead of hidden.'],
  ['Privacy-safe bands', 'Useful public information without exposing individuals, exact positions, health reasons or camera feeds.'],
  ['AI as operations, not hype', 'Wait prediction, reliability scoring, anomaly detection and demand-shaping recommendations.'],
]

export default function Research() {
  return (
    <div className="research-page">
      <section className="research-hero panel">
        <span className="section__eyebrow">Research & competition</span>
        <h1>The gap: a trustworthy public operating-status graph for places.</h1>
        <p>
          Existing apps split into reservations, merchant queue tools, and coarse public busyness data.
          LineStatus combines the missing public layer with lightweight merchant control and AI wait confidence.
        </p>
      </section>

      <section className="panel">
        <div className="panel__head"><div><span className="section__eyebrow">Competitor landscape</span><h2>What exists today</h2></div></div>
        <div className="competitor-table">
          <div className="competitor-row competitor-row--head"><span>Company</span><span>Bucket</span><span>Positioning</span><span>Opening for LineStatus</span></div>
          {COMPETITORS.map((c) => (
            <div className="competitor-row" key={c.name}>
              <span><strong>{c.name}</strong></span>
              <span>{c.bucket}</span>
              <span>{c.focus}</span>
              <span>{c.gap}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="gap-grid">
        {gaps.map(([title, body]) => <article className="gap-card panel" key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </section>

      <section className="panel research-split">
        <div>
          <span className="section__eyebrow">What should be public?</span>
          <h2>Publish bands, not surveillance.</h2>
          <ul className="check-list">
            <li>Wait band: 0–5, 5–15, 15–30, 30–60, 60+.</li>
            <li>Crowd band: quiet, steady, busy, packed.</li>
            <li>Source: merchant, user, predicted, historical.</li>
            <li>Freshness and confidence on every status.</li>
            <li>Remote join only when the venue enables it.</li>
          </ul>
        </div>
        <div>
          <span className="section__eyebrow">Never public</span>
          <h2>Protect people and sensitive places.</h2>
          <ul className="x-list">
            <li>Names, phones, health reasons, service details.</li>
            <li>Individual queue positions except to that user.</li>
            <li>Employee performance or staffed capacity details.</li>
            <li>Camera feeds or identifiable imagery.</li>
            <li>Security-sensitive event gate details.</li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="panel__head"><div><span className="section__eyebrow">Monetization</span><h2>Simple, attractive per-location pricing</h2></div></div>
        <div className="mini-plans">
          {PLANS.map((p) => <div key={p.name} className="mini-plan"><strong>{p.name}</strong><span>{p.price}</span><small>{p.tagline}</small></div>)}
        </div>
        <p className="research-note">Avoid per-cover fees at MVP stage. Start below reservation platforms and enterprise queue systems; charge for merchant value: fewer calls, fewer walkaways, better demand timing.</p>
      </section>

      <section className="panel">
        <div className="panel__head"><div><span className="section__eyebrow">AI opportunity</span><h2>Where AI actually matters</h2></div></div>
        <div className="ai-grid">
          <div><strong>Wait prediction</strong><span>Historical throughput + live queue + weather/events + outcome confirmations.</span></div>
          <div><strong>Merchant copilot</strong><span>Quote suggestions, pause remote join, delay texts, staffing insights.</span></div>
          <div><strong>Trust scoring</strong><span>Detect stale updates, manipulation, suspicious reports and optimistic quotes.</span></div>
          <div><strong>Demand shaping</strong><span>Best-time guidance, alternate nearby places and off-peak incentives.</span></div>
        </div>
      </section>
    </div>
  )
}
