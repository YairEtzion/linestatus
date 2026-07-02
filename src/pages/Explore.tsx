import { useMemo, useState } from 'react'
import {
  CATEGORY_META,
  VENUES,
  WAIT_META,
  type Category,
  type Venue,
  type WaitBand,
} from '../data'
import { CrowdMeter, SourceChip, WaitBadge } from '../ui'
import { RemoteJoinModal, ReportModal, VenueDetailModal } from '../modals'

type CategoryFilter = Category | 'all'
type WaitFilter = WaitBand | 'all'
type SortKey = 'distance' | 'wait' | 'fresh'

const CATEGORY_FILTERS: CategoryFilter[] = ['all', 'restaurant', 'bar', 'clinic', 'salon', 'event']
const WAIT_ORDER: WaitBand[] = ['none', 'short', 'moderate', 'long', 'capacity']

export default function Explore() {
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [wait, setWait] = useState<WaitFilter>('all')
  const [openOnly, setOpenOnly] = useState(true)
  const [joinableOnly, setJoinableOnly] = useState(false)
  const [sort, setSort] = useState<SortKey>('distance')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [query, setQuery] = useState('')

  const [detail, setDetail] = useState<Venue | null>(null)
  const [joining, setJoining] = useState<Venue | null>(null)
  const [reporting, setReporting] = useState<Venue | null>(null)

  const venues = useMemo(() => {
    let list = VENUES.filter((v) => {
      if (category !== 'all' && v.category !== category) return false
      if (wait !== 'all' && v.waitBand !== wait) return false
      if (openOnly && !v.open) return false
      if (joinableOnly && !(v.remoteJoin && v.open)) return false
      if (query.trim()) {
        const q = query.trim().toLowerCase()
        if (
          !v.name.toLowerCase().includes(q) &&
          !v.neighborhood.toLowerCase().includes(q) &&
          !v.category.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
    list = [...list].sort((a, b) => {
      if (sort === 'distance') return a.distanceMi - b.distanceMi
      if (sort === 'wait') return WAIT_ORDER.indexOf(a.waitBand) - WAIT_ORDER.indexOf(b.waitBand)
      return a.updatedMinsAgo - b.updatedMinsAgo
    })
    return list
  }, [category, wait, openOnly, joinableOnly, sort, query])

  const openCount = VENUES.filter((v) => v.open).length

  return (
    <div className="explore">
      <div className="explore__head">
        <div>
          <span className="section__eyebrow">Live map · Riverside metro</span>
          <h1>What's the line right now?</h1>
          <p className="explore__sub">
            {openCount} of {VENUES.length} seeded venues open now · {venues.length} match your
            filters
          </p>
        </div>
        <div className="explore__view-toggle">
          <button
            className={`seg__btn ${view === 'list' ? 'is-active' : ''}`}
            onClick={() => setView('list')}
          >
            List
          </button>
          <button
            className={`seg__btn ${view === 'map' ? 'is-active' : ''}`}
            onClick={() => setView('map')}
          >
            Schematic map
          </button>
        </div>
      </div>

      <div className="explore__filters">
        <input
          className="input explore__search"
          placeholder="Search venue, neighborhood, category…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="seg seg--wrap">
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c}
              className={`seg__btn ${category === c ? 'is-active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c === 'all' ? 'All' : CATEGORY_META[c].icon + ' ' + CATEGORY_META[c].plural}
            </button>
          ))}
        </div>
        <div className="explore__filter-row">
          <div className="seg seg--wrap">
            <button
              className={`seg__btn ${wait === 'all' ? 'is-active' : ''}`}
              onClick={() => setWait('all')}
            >
              Any wait
            </button>
            {WAIT_ORDER.map((w) => (
              <button
                key={w}
                className={`seg__btn ${wait === w ? 'is-active' : ''}`}
                onClick={() => setWait(w)}
              >
                {WAIT_META[w].label}
              </button>
            ))}
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(e) => setOpenOnly(e.target.checked)}
            />
            Open now
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={joinableOnly}
              onChange={(e) => setJoinableOnly(e.target.checked)}
            />
            Remote join available
          </label>
          <select
            className="input explore__sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="distance">Sort: Nearest</option>
            <option value="wait">Sort: Shortest wait</option>
            <option value="fresh">Sort: Freshest update</option>
          </select>
        </div>
      </div>

      {view === 'list' ? (
        <div className="venue-grid">
          {venues.map((v) => (
            <VenueCard
              key={v.id}
              venue={v}
              onOpen={() => setDetail(v)}
              onJoin={() => setJoining(v)}
              onReport={() => setReporting(v)}
            />
          ))}
          {venues.length === 0 && (
            <div className="empty-state">No venues match those filters right now.</div>
          )}
        </div>
      ) : (
        <SchematicMap venues={venues} onSelect={(v) => setDetail(v)} />
      )}

      <VenueDetailModal
        venue={detail}
        onClose={() => setDetail(null)}
        onJoin={() => {
          const v = detail
          setDetail(null)
          setJoining(v)
        }}
        onReport={() => {
          const v = detail
          setDetail(null)
          setReporting(v)
        }}
      />
      <RemoteJoinModal venue={joining} onClose={() => setJoining(null)} />
      <ReportModal venue={reporting} onClose={() => setReporting(null)} />
    </div>
  )
}

function VenueCard({
  venue,
  onOpen,
  onJoin,
  onReport,
}: {
  venue: Venue
  onOpen: () => void
  onJoin: () => void
  onReport: () => void
}) {
  const cat = CATEGORY_META[venue.category]
  return (
    <article className={`venue-card ${!venue.open ? 'is-closed' : ''}`}>
      <button className="venue-card__main" onClick={onOpen}>
        <div className="venue-card__top">
          <span className="venue-card__cat">
            {cat.icon} {venue.neighborhood}
          </span>
          {venue.merchantVerified && <span className="pill pill--verified">✓ Verified</span>}
        </div>
        <h3 className="venue-card__name">{venue.name}</h3>
        <p className="venue-card__blurb">{venue.blurb}</p>
        <div className="venue-card__status">
          <WaitBadge band={venue.waitBand} />
          <CrowdMeter band={venue.crowdBand} />
        </div>
        <SourceChip
          source={venue.source}
          minsAgo={venue.updatedMinsAgo}
          confidence={venue.confidence}
        />
        {venue.note && <p className="venue-card__note">💬 {venue.note}</p>}
        <div className="venue-card__meta">
          <span>{venue.distanceMi.toFixed(1)} mi</span>
          <span>★ {venue.rating.toFixed(1)}</span>
          <span>{venue.reports24h} reports/24h</span>
          {!venue.open && <span className="pill pill--muted">Closed now</span>}
        </div>
      </button>
      <div className="venue-card__actions">
        {venue.remoteJoin && venue.open ? (
          <button className="btn btn--primary btn--sm" onClick={onJoin}>
            {venue.sensitive ? 'Reserve window' : 'Join remotely'}
          </button>
        ) : (
          <button className="btn btn--primary btn--sm" disabled>
            {venue.open ? 'No remote join' : 'Closed'}
          </button>
        )}
        <button className="btn btn--ghost btn--sm" onClick={onReport}>
          Report
        </button>
      </div>
    </article>
  )
}

function SchematicMap({
  venues,
  onSelect,
}: {
  venues: Venue[]
  onSelect: (v: Venue) => void
}) {
  return (
    <div className="schematic">
      <div className="schematic__frame">
        <div className="schematic__grid" />
        {venues.map((v) => {
          const tone = WAIT_META[v.waitBand].tone
          return (
            <button
              key={v.id}
              className={`schematic__pin tone-${tone} ${!v.open ? 'is-closed' : ''}`}
              style={{ left: `${v.map.x}%`, top: `${v.map.y}%` }}
              onClick={() => onSelect(v)}
              title={v.name}
            >
              <span className="schematic__pin-dot" />
              <span className="schematic__pin-label">{v.name}</span>
            </button>
          )
        })}
      </div>
      <p className="schematic__hint">
        Schematic layout, not to scale — pin color reflects current wait band. Tap a pin for
        details.
      </p>
    </div>
  )
}
