import { useState } from 'react'
import {
  CATEGORY_META,
  WAIT_META,
  type CrowdBand,
  type Venue,
  type WaitBand,
} from './data'
import { BusyGraph, CrowdMeter, Modal, SourceChip, WaitBadge, freshness } from './ui'

/* ----------------------------- Venue detail ----------------------------- */

export function VenueDetailModal({
  venue,
  onClose,
  onJoin,
  onReport,
}: {
  venue: Venue | null
  onClose: () => void
  onJoin: () => void
  onReport: () => void
}) {
  if (!venue) return null
  const cat = CATEGORY_META[venue.category]
  const w = WAIT_META[venue.waitBand]
  const eta = arrivalWindow(venue.waitBand)
  return (
    <Modal open={!!venue} onClose={onClose} labelledBy="venue-title">
      <div className={`vd tone-${w.tone}`}>
        <header className="vd__head">
          <div>
            <div className="vd__cat">
              <span>{cat.icon}</span> {cat.label} · {venue.neighborhood}
              {!venue.open && <span className="pill pill--muted">Closed now</span>}
            </div>
            <h2 id="venue-title" className="vd__name">
              {venue.name}
            </h2>
            <p className="vd__blurb">{venue.blurb}</p>
          </div>
          <div className="vd__badges">
            {venue.merchantVerified && <span className="pill pill--verified">✓ Verified</span>}
            {venue.remoteJoin && venue.open && <span className="pill pill--join">Remote join</span>}
            {venue.sensitive && <span className="pill pill--muted">Operational status only</span>}
          </div>
        </header>

        <div className="vd__status">
          <div className="vd__status-main">
            <WaitBadge band={venue.waitBand} size="lg" />
            <CrowdMeter band={venue.crowdBand} />
          </div>
          <SourceChip
            source={venue.source}
            minsAgo={venue.updatedMinsAgo}
            confidence={venue.confidence}
          />
        </div>

        {venue.note && (
          <div className="vd__note">
            <span className="vd__note-icon">💬</span>
            {venue.note}
          </div>
        )}

        <div className="vd__reco">
          <div className="vd__reco-icon">✨</div>
          <div>
            <strong>Best-time guidance</strong>
            <p>{eta}</p>
          </div>
        </div>

        <div className="vd__graph-block">
          <div className="vd__graph-head">
            <span>Typically busy · today</span>
            <span className="vd__graph-now">● now ~7 PM</span>
          </div>
          <BusyGraph data={venue.typical} />
          <div className="vd__graph-axis">
            <span>6a</span>
            <span>12p</span>
            <span>6p</span>
            <span>12a</span>
          </div>
        </div>

        <dl className="vd__meta">
          <div>
            <dt>Distance</dt>
            <dd>{venue.distanceMi.toFixed(1)} mi</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd>★ {venue.rating.toFixed(1)}</dd>
          </div>
          <div>
            <dt>Reliability</dt>
            <dd>{venue.reliability}%</dd>
          </div>
          <div>
            <dt>Reports 24h</dt>
            <dd>{venue.reports24h}</dd>
          </div>
        </dl>

        <div className="vd__actions">
          {venue.remoteJoin && venue.open ? (
            <button className="btn btn--primary" onClick={onJoin}>
              {venue.sensitive ? 'Reserve a return window' : 'Join remotely'}
            </button>
          ) : (
            <button className="btn btn--primary" disabled>
              {venue.open ? 'Remote join unavailable' : 'Closed'}
            </button>
          )}
          <button className="btn btn--ghost" onClick={onReport}>
            Report status
          </button>
          <button className="btn btn--ghost">Directions</button>
        </div>
        <p className="vd__privacy">
          LineStatus publishes bands, not surveillance. Wait band, crowd level, freshness and
          confidence only — never individuals in line or sensitive service details.
        </p>
      </div>
    </Modal>
  )
}

function arrivalWindow(band: WaitBand): string {
  switch (band) {
    case 'none':
      return 'Go now — you’ll be seated within about 5 minutes.'
    case 'short':
      return 'Good to go now. If you’d rather skip the wait entirely, 5:30 PM is usually quietest.'
    case 'moderate':
      return 'Join remotely and arrive in ~20 minutes, or come back after 8:45 PM when it typically clears.'
    case 'long':
      return 'Long right now. Remote-join to hold your place, or try again after 9 PM.'
    case 'capacity':
      return 'At capacity. Best to try a nearby option now, or check back around 8:45 PM.'
  }
}

/* ------------------------------ Remote join ----------------------------- */

const SERVICE_TYPES: Record<string, string[]> = {
  restaurant: ['Table', 'Bar seat', 'Patio'],
  bar: ['Table', 'Bar', 'Patio'],
  clinic: ['Sick visit', 'Injury / X-ray', 'Follow-up'],
  salon: ['Haircut', 'Color', 'Beard / shave'],
  event: ['General entry', 'Will call', 'VIP'],
}

export function RemoteJoinModal({
  venue,
  onClose,
}: {
  venue: Venue | null
  onClose: () => void
}) {
  const [party, setParty] = useState(2)
  const [service, setService] = useState(0)
  const [consent, setConsent] = useState(true)
  const [done, setDone] = useState(false)
  if (!venue) return null
  const isSensitive = venue.sensitive
  const services = SERVICE_TYPES[venue.category]
  const eta = etaForBand(venue.waitBand, party)

  return (
    <Modal open={!!venue} onClose={onClose} labelledBy="join-title">
      {done ? (
        <div className="join-done">
          <div className="join-done__check">✓</div>
          <h2 id="join-title">You’re in line at {venue.name}</h2>
          <p className="join-done__eta">
            Estimated wait <strong>{eta}</strong>
          </p>
          <ul className="join-done__steps">
            <li>You’ll get a text when your {isSensitive ? 'return window' : 'table'} is ~15 min out.</li>
            <li>Reply <code>STATUS</code> anytime for a live update, <code>CANCEL</code> to leave.</li>
            <li>Please arrive within 10 min of the callback to keep your place.</li>
          </ul>
          <div className="join-done__pos">
            <div>
              <span className="join-done__pos-num">4th</span>
              <span className="join-done__pos-lbl">in line</span>
            </div>
            <div>
              <span className="join-done__pos-num">{eta}</span>
              <span className="join-done__pos-lbl">est. wait</span>
            </div>
            <div>
              <span className="join-done__pos-num">✓</span>
              <span className="join-done__pos-lbl">merchant verified</span>
            </div>
          </div>
          <button className="btn btn--primary btn--wide" onClick={onClose}>
            Done
          </button>
        </div>
      ) : (
        <div className="join">
          <div className="join__head">
            <span className="join__eyebrow">Remote join · {venue.name}</span>
            <h2 id="join-title">{isSensitive ? 'Reserve a return window' : 'Join the line from here'}</h2>
            <p className="join__sub">
              Hold your place without standing in line. Current estimate <strong>{eta}</strong>.
            </p>
          </div>

          <label className="field">
            <span className="field__label">{isSensitive ? 'Visit type' : 'Service'}</span>
            <div className="seg seg--wrap">
              {services.map((s, i) => (
                <button
                  key={s}
                  className={`seg__btn ${service === i ? 'is-active' : ''}`}
                  onClick={() => setService(i)}
                >
                  {s}
                </button>
              ))}
            </div>
          </label>

          {!isSensitive && (
            <label className="field">
              <span className="field__label">Party size</span>
              <div className="stepper">
                <button onClick={() => setParty((p) => Math.max(1, p - 1))} aria-label="Fewer">
                  −
                </button>
                <span>{party}</span>
                <button onClick={() => setParty((p) => Math.min(12, p + 1))} aria-label="More">
                  +
                </button>
              </div>
            </label>
          )}

          <div className="field-row">
            <label className="field">
              <span className="field__label">Name</span>
              <input className="input" placeholder="First name" defaultValue="" />
            </label>
            <label className="field">
              <span className="field__label">Mobile</span>
              <input className="input" placeholder="(555) 000-0000" inputMode="tel" />
            </label>
          </div>

          <label className="consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              Text me status updates. Standard rates apply. We never share your number or publish
              who’s in line.
            </span>
          </label>

          <button
            className="btn btn--primary btn--wide"
            disabled={!consent}
            onClick={() => setDone(true)}
          >
            {isSensitive ? 'Reserve return window' : `Join line · est. ${eta}`}
          </button>
          <p className="join__fine">
            {isSensitive
              ? 'Operational status only — no health reason or appointment detail is ever made public.'
              : 'You can leave the line anytime. No-shows over 3 in 30 days pause remote join for that venue.'}
          </p>
        </div>
      )}
    </Modal>
  )
}

function etaForBand(band: WaitBand, party = 2): string {
  const bump = party >= 5 ? 10 : party >= 3 ? 5 : 0
  switch (band) {
    case 'none':
      return `${0 + bump}–${5 + bump} min`
    case 'short':
      return `${5 + bump}–${15 + bump} min`
    case 'moderate':
      return `${15 + bump}–${30 + bump} min`
    case 'long':
      return `${30 + bump}–${60 + bump} min`
    case 'capacity':
      return '60+ min'
  }
}

/* ------------------------------ User report ----------------------------- */

const WAIT_OPTS: WaitBand[] = ['none', 'short', 'moderate', 'long', 'capacity']
const CROWD_OPTS: CrowdBand[] = ['quiet', 'steady', 'busy', 'packed']

export function ReportModal({
  venue,
  onClose,
}: {
  venue: Venue | null
  onClose: () => void
}) {
  const [wait, setWait] = useState<WaitBand>(venue?.waitBand ?? 'short')
  const [crowd, setCrowd] = useState<CrowdBand>(venue?.crowdBand ?? 'steady')
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)
  if (!venue) return null

  return (
    <Modal open={!!venue} onClose={onClose} labelledBy="report-title">
      {done ? (
        <div className="join-done">
          <div className="join-done__check">✓</div>
          <h2 id="report-title">Thanks — report added</h2>
          <p className="join-done__eta">
            Your update to <strong>{venue.name}</strong> is live, labeled “User reported · just
            now.”
          </p>
          <p className="report__trust">
            Reports are weighted by reporter reliability and cross-checked against merchant and
            predicted signals. Suspicious patterns are flagged, never auto-published as fact.
          </p>
          <button className="btn btn--primary btn--wide" onClick={onClose}>
            Done
          </button>
        </div>
      ) : (
        <div className="report">
          <div className="join__head">
            <span className="join__eyebrow">Report status · {venue.name}</span>
            <h2 id="report-title">What are you seeing right now?</h2>
            <p className="join__sub">
              Privacy-safe bands only. No photos, no names, no personal details required.
            </p>
          </div>

          <div className="field">
            <span className="field__label">Observed wait</span>
            <div className="seg seg--wrap">
              {WAIT_OPTS.map((b) => (
                <button
                  key={b}
                  className={`seg__btn ${wait === b ? 'is-active' : ''}`}
                  onClick={() => setWait(b)}
                >
                  {WAIT_META[b].label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="field__label">Crowd level</span>
            <div className="seg seg--wrap">
              {CROWD_OPTS.map((b) => (
                <button
                  key={b}
                  className={`seg__btn ${crowd === b ? 'is-active' : ''}`}
                  onClick={() => setCrowd(b)}
                >
                  {b[0].toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span className="field__label">Optional note</span>
            <input
              className="input"
              placeholder="e.g. line moving fast, bar seats open"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={80}
            />
          </label>

          {venue.sensitive && (
            <p className="report__sensitive">
              This is a sensitive venue. Please report operational wait only — never anyone’s reason
              for visiting.
            </p>
          )}

          <button className="btn btn--primary btn--wide" onClick={() => setDone(true)}>
            Submit report
          </button>
          <p className="join__fine">
            Last merchant update was {freshness(venue.updatedMinsAgo)}. Community reports help keep
            status fresh between merchant updates.
          </p>
        </div>
      )}
    </Modal>
  )
}
