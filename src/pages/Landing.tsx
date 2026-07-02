import { Link } from 'react-router-dom'
import { PLANS } from '../data'
import { WaitBadge } from '../ui'

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero__copy">
          <span className="hero__eyebrow">Live wait status for real places</span>
          <h1 className="hero__title">
            See the line <span>before you go.</span>
          </h1>
          <p className="hero__lede">
            LineStatus is the public status layer for physical places — restaurants, bars, clinics,
            salons and events. Wait bands, crowd levels, freshness and confidence, so you can decide
            where to go <em>now</em> and join remotely when the venue allows it.
          </p>
          <div className="hero__actions">
            <Link to="/explore" className="btn btn--primary btn--lg">
              Explore the live map
            </Link>
            <Link to="/merchant" className="btn btn--ghost btn--lg">
              I run a venue →
            </Link>
          </div>
          <div className="hero__trust">
            <span className="pill pill--verified">✓ Merchant verified · 3 min ago</span>
            <span className="hero__trust-sep" />
            <span>Wait bands, not surveillance</span>
          </div>
        </div>

        <div className="hero__art">
          <img
            src="/assets/linestatus-hero.png"
            alt="People waiting outside a bar at night with live LineStatus cards floating alongside"
            className="hero__img"
            loading="eager"
          />
          <div className="hero__float hero__float--a">
            <WaitBadge band="short" size="sm" />
            <span className="hero__float-sub">The Lantern Room · updated just now</span>
          </div>
          <div className="hero__float hero__float--b">
            <WaitBadge band="none" size="sm" />
            <span className="hero__float-sub">Blue Hour · walk right in</span>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="stat-strip">
        {[
          ['3', 'disconnected buckets today', 'discovery, queue tools, reservations'],
          ['5', 'categories, one status layer', 'restaurants · bars · clinics · salons · events'],
          ['<5s', 'to publish a status', 'fast enough to update mid-rush'],
          ['0', 'personal data exposed', 'bands and freshness, never individuals'],
        ].map(([big, label, sub]) => (
          <div key={label} className="stat">
            <span className="stat__big">{big}</span>
            <span className="stat__label">{label}</span>
            <span className="stat__sub">{sub}</span>
          </div>
        ))}
      </section>

      {/* Thesis */}
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">The thesis</span>
          <h2>Not another reservation app. A trustworthy status graph for places.</h2>
          <p>
            Today’s tools split into three disconnected buckets — consumer discovery without
            operational precision, merchant queue tools without network effects, and restaurant
            reservations without cross-category live status. The wedge is simpler than any of them:
            <strong> “Can I go now, and what happens if I join?”</strong>
          </p>
        </div>
        <div className="thesis-grid">
          {[
            {
              icon: '📍',
              t: 'Public status, first',
              d: 'Every place gets a live card: wait band, crowd level, last update, confidence and joinability — before you commit to the trip.',
            },
            {
              icon: '🔀',
              t: 'Cross-category',
              d: 'Bars, clinics, salons, pop-ups and event gates — not just restaurants. One map answers “where should I go right now?”',
            },
            {
              icon: '🕒',
              t: 'Freshness & source on everything',
              d: 'Merchant-verified, user-reported, AI-predicted or typical — always labeled, with confidence and a timestamp.',
            },
            {
              icon: '🔒',
              t: 'Privacy-safe by design',
              d: 'We publish bands, not surveillance. Never names, queue positions, health reasons or camera feeds.',
            },
            {
              icon: '✨',
              t: 'AI that quotes better waits',
              d: 'The first AI feature is prediction and confidence — plus a merchant copilot that suggests quotes during a rush. Not a chatbot.',
            },
            {
              icon: '📈',
              t: 'Demand shaping',
              d: '“Come in 25 minutes,” best-time nudges and remote join turn a painful line into measurable merchant value.',
            },
          ].map((c) => (
            <div key={c.t} className="thesis-card">
              <span className="thesis-card__icon">{c.icon}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section section--tint">
        <div className="section__head">
          <span className="section__eyebrow">The trust loop</span>
          <h2>Status you can actually believe</h2>
          <p>
            LineStatus only wins if people trust the number. Every visit tightens the loop — and
            each venue earns a reliability score.
          </p>
        </div>
        <ol className="loop">
          {[
            ['Merchant updates status', 'One tap, under five seconds, mid-rush.'],
            ['Consumer sees source & freshness', 'Verified · 3 min ago · high confidence.'],
            ['Consumer joins or visits', 'Remote join holds their place from anywhere.'],
            ['Actual wait is confirmed', 'Seated / served / left check-ins feed back.'],
            ['Prediction improves', 'AI learns each venue’s real throughput.'],
            ['Reliability score rises', 'More trust → more visits → more supply.'],
          ].map(([t, d], i) => (
            <li key={t} className="loop__step">
              <span className="loop__num">{i + 1}</span>
              <div>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="section__head">
          <span className="section__eyebrow">Pricing</span>
          <h2>Simple per-location SaaS. No per-cover fees.</h2>
          <p>
            Priced below reservation platforms and enterprise queue systems. The merchant math is
            simple: cheaper than the walk-ins you lose and the calls you field.
          </p>
        </div>
        <div className="plans">
          {PLANS.map((p) => (
            <div key={p.name} className={`plan ${p.highlight ? 'plan--hi' : ''}`}>
              {p.highlight && <span className="plan__flag">Most popular</span>}
              <h3 className="plan__name">{p.name}</h3>
              <div className="plan__price">
                <span className="plan__num">{p.price}</span>
                <span className="plan__unit">{p.unit}</span>
              </div>
              <p className="plan__tag">{p.tagline}</p>
              <ul className="plan__features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                to="/merchant"
                className={`btn ${p.highlight ? 'btn--primary' : 'btn--ghost'} btn--wide`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="plans__note">
          Usage add-ons: SMS/WhatsApp credits · AI prediction for high-volume venues · clearly
          labeled “available now” placement · API for guides, hotels, campuses & event pages ·
          white-label event queue pages. Enterprise (SSO, audit logs, SLA, healthcare controls) is
          custom.
        </p>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="cta-band__inner">
          <h2>Make the wedge obvious in ten seconds.</h2>
          <p>
            A consumer instantly finds places with short waits. A merchant updates public status
            during a rush without thinking. See both sides of the prototype.
          </p>
          <div className="cta-band__actions">
            <Link to="/explore" className="btn btn--primary btn--lg">
              Open the live map
            </Link>
            <Link to="/merchant" className="btn btn--ghost btn--lg">
              Open merchant console
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
