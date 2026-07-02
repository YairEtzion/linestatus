// Small shared presentational primitives used across every screen.
import type { ReactNode } from 'react'
import {
  CROWD_META,
  SOURCE_META,
  WAIT_META,
  type Confidence,
  type CrowdBand,
  type StatusSource,
  type WaitBand,
} from './data'

export function freshness(mins: number): string {
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const h = Math.round(mins / 60)
  return `${h} hr${h > 1 ? 's' : ''} ago`
}

export function freshnessTone(mins: number): 'fresh' | 'aging' | 'stale' {
  if (mins <= 10) return 'fresh'
  if (mins <= 30) return 'aging'
  return 'stale'
}

export function WaitBadge({ band, size = 'md' }: { band: WaitBand; size?: 'sm' | 'md' | 'lg' }) {
  const m = WAIT_META[band]
  return (
    <span className={`wait-badge tone-${m.tone} sz-${size}`}>
      <span className="wait-badge__dot" />
      <span className="wait-badge__label">{m.label}</span>
      <span className="wait-badge__range">{m.range}</span>
    </span>
  )
}

export function CrowdMeter({ band }: { band: CrowdBand }) {
  const m = CROWD_META[band]
  return (
    <div className="crowd" title={`Crowd: ${m.label}`}>
      <div className="crowd__bars">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`crowd__bar ${i / 4 < m.fill ? 'is-on' : ''}`}
          />
        ))}
      </div>
      <span className="crowd__label">{m.label}</span>
    </div>
  )
}

export function SourceChip({
  source,
  minsAgo,
  confidence,
}: {
  source: StatusSource
  minsAgo: number
  confidence: Confidence
}) {
  const s = SOURCE_META[source]
  const tone = freshnessTone(minsAgo)
  return (
    <span className={`source-chip src-${source} fresh-${tone}`}>
      <span className="source-chip__src">{s.label}</span>
      <span className="source-chip__sep">·</span>
      <span className="source-chip__time">{freshness(minsAgo)}</span>
      <span className={`source-chip__conf conf-${confidence}`}>{confidence} confidence</span>
    </span>
  )
}

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  labelledBy?: string
}) {
  if (!open) return null
  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

// A compact SVG "typical busy" bar chart with a "now" marker.
export function BusyGraph({
  data,
  nowHour = 19,
  height = 76,
}: {
  data: number[]
  nowHour?: number
  height?: number
}) {
  const max = Math.max(...data, 1)
  const barW = 100 / data.length
  return (
    <svg
      className="busy-graph"
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Typical busy times through the day"
    >
      {data.map((v, i) => {
        const h = (v / max) * (height - 12)
        const isNow = i === nowHour
        return (
          <rect
            key={i}
            x={i * barW + barW * 0.15}
            y={height - h - 8}
            width={barW * 0.7}
            height={Math.max(h, 1)}
            rx={1.1}
            className={`busy-graph__bar ${isNow ? 'is-now' : ''}`}
          />
        )
      })}
    </svg>
  )
}
