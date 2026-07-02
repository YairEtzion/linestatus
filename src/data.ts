// LineStatus seed data — realistic simulated market for the "Riverside" metro area.
// No backend: everything the prototype shows is derived from this module.

export type Category = 'restaurant' | 'bar' | 'clinic' | 'salon' | 'event'

export type WaitBand = 'none' | 'short' | 'moderate' | 'long' | 'capacity'
export type CrowdBand = 'quiet' | 'steady' | 'busy' | 'packed'
export type StatusSource = 'merchant' | 'user' | 'predicted' | 'historical'
export type Confidence = 'high' | 'medium' | 'low'

export interface Venue {
  id: string
  name: string
  category: Category
  neighborhood: string
  address: string
  blurb: string
  open: boolean
  merchantVerified: boolean
  remoteJoin: boolean
  sensitive: boolean // clinics / regulated: operational status only
  waitBand: WaitBand
  crowdBand: CrowdBand
  source: StatusSource
  confidence: Confidence
  updatedMinsAgo: number
  reliability: number // 0-100 venue reliability score
  distanceMi: number
  rating: number
  reports24h: number
  // Position on the schematic map (0-100 percent of the frame)
  map: { x: number; y: number }
  // 24-value typical busyness curve, index roughly = hour of day
  typical: number[]
  // Optional merchant note surfaced publicly
  note?: string
}

export interface QueueEntry {
  id: string
  name: string
  partySize: number
  channel: 'remote' | 'walk-in' | 'qr'
  quotedMins: number
  waitedMins: number
  phone: string
  state: 'waiting' | 'notified' | 'seated'
  serviceNote?: string
}

export const CATEGORY_META: Record<
  Category,
  { label: string; icon: string; plural: string }
> = {
  restaurant: { label: 'Restaurant', icon: '🍽️', plural: 'Restaurants' },
  bar: { label: 'Bar', icon: '🍸', plural: 'Bars & nightlife' },
  clinic: { label: 'Clinic', icon: '🩺', plural: 'Clinics & urgent care' },
  salon: { label: 'Salon', icon: '💈', plural: 'Salons & barbers' },
  event: { label: 'Event', icon: '🎫', plural: 'Events & venues' },
}

export const WAIT_META: Record<
  WaitBand,
  { label: string; range: string; tone: string }
> = {
  none: { label: 'No wait', range: '0–5 min', tone: 'good' },
  short: { label: 'Short wait', range: '5–15 min', tone: 'ok' },
  moderate: { label: 'Moderate', range: '15–30 min', tone: 'warn' },
  long: { label: 'Long wait', range: '30–60 min', tone: 'bad' },
  capacity: { label: 'At capacity', range: '60+ min', tone: 'bad' },
}

export const CROWD_META: Record<CrowdBand, { label: string; fill: number }> = {
  quiet: { label: 'Quiet', fill: 0.28 },
  steady: { label: 'Steady', fill: 0.52 },
  busy: { label: 'Busy', fill: 0.76 },
  packed: { label: 'Packed', fill: 0.96 },
}

export const SOURCE_META: Record<
  StatusSource,
  { label: string; short: string }
> = {
  merchant: { label: 'Merchant verified', short: 'Verified' },
  user: { label: 'User reported', short: 'Reported' },
  predicted: { label: 'AI predicted', short: 'Predicted' },
  historical: { label: 'Typical for now', short: 'Typical' },
}

// A believable evening-heavy busyness curve for nightlife-style venues.
const nightCurve = [
  2, 1, 1, 0, 0, 0, 2, 8, 14, 18, 22, 30, 42, 38, 30, 34, 44, 58, 72, 88, 95,
  90, 68, 34,
]
// Lunch + dinner double peak for restaurants.
const diningCurve = [
  0, 0, 0, 0, 0, 3, 10, 22, 26, 20, 34, 68, 88, 64, 40, 36, 48, 74, 92, 96, 82,
  58, 30, 12,
]
// Daytime service curve for clinics / salons.
const dayCurve = [
  0, 0, 0, 0, 0, 4, 20, 46, 72, 88, 84, 76, 70, 66, 72, 80, 74, 58, 40, 24, 12,
  6, 2, 0,
]

export const VENUES: Venue[] = [
  {
    id: 'lantern-room',
    name: 'The Lantern Room',
    category: 'restaurant',
    neighborhood: 'Harbor East',
    address: '210 Wharf St',
    blurb: 'Wood-fired small plates and a coastal cellar list.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'moderate',
    crowdBand: 'busy',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 2,
    reliability: 94,
    distanceMi: 0.4,
    rating: 4.7,
    reports24h: 38,
    map: { x: 62, y: 30 },
    typical: diningCurve,
    note: 'Bar seats walk-in friendly — quote ~20 min for parties of 2.',
  },
  {
    id: 'copper-still',
    name: 'Copper & Still',
    category: 'bar',
    neighborhood: 'Warehouse District',
    address: '88 Forge Alley',
    blurb: 'Rooftop cocktail bar with a skyline patio.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'long',
    crowdBand: 'packed',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 1,
    reliability: 91,
    distanceMi: 1.1,
    rating: 4.5,
    reports24h: 61,
    map: { x: 78, y: 52 },
    typical: nightCurve,
    note: 'Line is moving. Remote join open — we text when your table is ~15 min out.',
  },
  {
    id: 'riverside-urgent',
    name: 'Riverside Urgent Care',
    category: 'clinic',
    neighborhood: 'Medical Mile',
    address: '1400 Cedar Blvd',
    blurb: 'Walk-in urgent care, X-ray and labs on site.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: true,
    waitBand: 'moderate',
    crowdBand: 'steady',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 4,
    reliability: 96,
    distanceMi: 2.3,
    rating: 4.4,
    reports24h: 12,
    map: { x: 40, y: 68 },
    typical: dayCurve,
    note: 'Reserve a return window from home — we hold your place, come in when it’s near.',
  },
  {
    id: 'fade-house',
    name: 'Fade House Barbers',
    category: 'salon',
    neighborhood: 'Old Town',
    address: '17 Maple Row',
    blurb: 'Classic cuts, hot-towel shaves, five chairs.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'short',
    crowdBand: 'steady',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 6,
    reliability: 89,
    distanceMi: 0.8,
    rating: 4.8,
    reports24h: 9,
    map: { x: 30, y: 40 },
    typical: dayCurve,
  },
  {
    id: 'night-market',
    name: 'Harbor Night Market',
    category: 'event',
    neighborhood: 'Harbor East',
    address: 'Pier 4 Esplanade',
    blurb: 'Weekend street-food and maker market, 40+ stalls.',
    open: true,
    merchantVerified: true,
    remoteJoin: false,
    sensitive: false,
    waitBand: 'moderate',
    crowdBand: 'packed',
    source: 'merchant',
    confidence: 'medium',
    updatedMinsAgo: 8,
    reliability: 82,
    distanceMi: 0.5,
    rating: 4.6,
    reports24h: 47,
    map: { x: 68, y: 18 },
    typical: nightCurve,
    note: 'East gate busiest — north gate near the carousel is clearer right now.',
  },
  {
    id: 'saffron-table',
    name: 'Saffron Table',
    category: 'restaurant',
    neighborhood: 'Old Town',
    address: '52 Maple Row',
    blurb: 'Regional Indian tasting plates, no reservations.',
    open: true,
    merchantVerified: false,
    remoteJoin: false,
    sensitive: false,
    waitBand: 'long',
    crowdBand: 'busy',
    source: 'user',
    confidence: 'medium',
    updatedMinsAgo: 11,
    reliability: 71,
    distanceMi: 0.9,
    rating: 4.7,
    reports24h: 24,
    map: { x: 34, y: 33 },
    typical: diningCurve,
  },
  {
    id: 'blue-hour',
    name: 'Blue Hour Wine Bar',
    category: 'bar',
    neighborhood: 'Harbor East',
    address: '133 Wharf St',
    blurb: 'Natural wine, low-key listening room.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'none',
    crowdBand: 'quiet',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 3,
    reliability: 90,
    distanceMi: 0.6,
    rating: 4.6,
    reports24h: 14,
    map: { x: 58, y: 40 },
    typical: nightCurve,
    note: 'Walk right in — plenty of counter seats before 8pm.',
  },
  {
    id: 'gilded-comb',
    name: 'The Gilded Comb',
    category: 'salon',
    neighborhood: 'Warehouse District',
    address: '9 Forge Alley',
    blurb: 'Full-service hair studio and color bar.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'moderate',
    crowdBand: 'busy',
    source: 'merchant',
    confidence: 'medium',
    updatedMinsAgo: 9,
    reliability: 85,
    distanceMi: 1.2,
    rating: 4.5,
    reports24h: 7,
    map: { x: 82, y: 44 },
    typical: dayCurve,
  },
  {
    id: 'ferry-clinic',
    name: 'Ferry Street Family Clinic',
    category: 'clinic',
    neighborhood: 'Harbor East',
    address: '300 Ferry St',
    blurb: 'Primary care and same-day sick visits.',
    open: true,
    merchantVerified: false,
    remoteJoin: false,
    sensitive: true,
    waitBand: 'short',
    crowdBand: 'steady',
    source: 'predicted',
    confidence: 'medium',
    updatedMinsAgo: 22,
    reliability: 68,
    distanceMi: 0.7,
    rating: 4.2,
    reports24h: 3,
    map: { x: 54, y: 24 },
    typical: dayCurve,
  },
  {
    id: 'smoke-oak',
    name: 'Smoke & Oak BBQ',
    category: 'restaurant',
    neighborhood: 'Warehouse District',
    address: '61 Forge Alley',
    blurb: 'Central Texas-style brisket, sells out nightly.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'capacity',
    crowdBand: 'packed',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 2,
    reliability: 93,
    distanceMi: 1.0,
    rating: 4.9,
    reports24h: 52,
    map: { x: 74, y: 60 },
    typical: diningCurve,
    note: 'Remote join paused — kitchen at capacity. Reopening joins ~8:45pm.',
  },
  {
    id: 'harbor-lanes',
    name: 'Harbor Lanes',
    category: 'event',
    neighborhood: 'Medical Mile',
    address: '1220 Cedar Blvd',
    blurb: 'Retro bowling, arcade and a walk-up bar.',
    open: true,
    merchantVerified: false,
    remoteJoin: false,
    sensitive: false,
    waitBand: 'short',
    crowdBand: 'steady',
    source: 'user',
    confidence: 'low',
    updatedMinsAgo: 41,
    reliability: 63,
    distanceMi: 2.0,
    rating: 4.1,
    reports24h: 5,
    map: { x: 44, y: 78 },
    typical: nightCurve,
  },
  {
    id: 'morning-glass',
    name: 'Morning Glass Café',
    category: 'restaurant',
    neighborhood: 'Old Town',
    address: '3 Maple Row',
    blurb: 'All-day brunch, famous weekend queue.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'short',
    crowdBand: 'busy',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 5,
    reliability: 88,
    distanceMi: 0.9,
    rating: 4.5,
    reports24h: 33,
    map: { x: 26, y: 48 },
    typical: diningCurve,
  },
  {
    id: 'velvet-room',
    name: 'Velvet Room',
    category: 'bar',
    neighborhood: 'Old Town',
    address: '41 Lantern Ct',
    blurb: 'Speakeasy-style cocktails, capacity 60.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'moderate',
    crowdBand: 'busy',
    source: 'merchant',
    confidence: 'medium',
    updatedMinsAgo: 7,
    reliability: 84,
    distanceMi: 1.0,
    rating: 4.4,
    reports24h: 19,
    map: { x: 22, y: 30 },
    typical: nightCurve,
  },
  {
    id: 'cedar-dental',
    name: 'Cedar Dental Walk-In',
    category: 'clinic',
    neighborhood: 'Medical Mile',
    address: '1500 Cedar Blvd',
    blurb: 'Emergency and same-day dental care.',
    open: false,
    merchantVerified: true,
    remoteJoin: false,
    sensitive: true,
    waitBand: 'none',
    crowdBand: 'quiet',
    source: 'historical',
    confidence: 'low',
    updatedMinsAgo: 96,
    reliability: 79,
    distanceMi: 2.4,
    rating: 4.3,
    reports24h: 1,
    map: { x: 38, y: 84 },
    typical: dayCurve,
    note: 'Closed now — opens 8:00am. Status shown is typical for that hour.',
  },
  {
    id: 'union-taps',
    name: 'Union Taps',
    category: 'bar',
    neighborhood: 'Warehouse District',
    address: '12 Forge Alley',
    blurb: '30 rotating drafts and a game-day patio.',
    open: true,
    merchantVerified: false,
    remoteJoin: false,
    sensitive: false,
    waitBand: 'none',
    crowdBand: 'steady',
    source: 'user',
    confidence: 'low',
    updatedMinsAgo: 28,
    reliability: 66,
    distanceMi: 1.3,
    rating: 4.2,
    reports24h: 8,
    map: { x: 86, y: 62 },
    typical: nightCurve,
  },
  {
    id: 'polish-parlour',
    name: 'The Polish Parlour',
    category: 'salon',
    neighborhood: 'Harbor East',
    address: '260 Wharf St',
    blurb: 'Nail studio and express manicures.',
    open: true,
    merchantVerified: true,
    remoteJoin: true,
    sensitive: false,
    waitBand: 'none',
    crowdBand: 'quiet',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 4,
    reliability: 87,
    distanceMi: 0.5,
    rating: 4.7,
    reports24h: 6,
    map: { x: 64, y: 38 },
    typical: dayCurve,
    note: 'Two chairs open now — walk-ins seated immediately.',
  },
  {
    id: 'grand-theatre',
    name: 'The Grand Theatre',
    category: 'event',
    neighborhood: 'Old Town',
    address: '1 Marquee Way',
    blurb: 'Tonight: sold-out 8pm show, doors at 7.',
    open: true,
    merchantVerified: true,
    remoteJoin: false,
    sensitive: false,
    waitBand: 'long',
    crowdBand: 'packed',
    source: 'merchant',
    confidence: 'high',
    updatedMinsAgo: 3,
    reliability: 92,
    distanceMi: 1.1,
    rating: 4.8,
    reports24h: 29,
    map: { x: 18, y: 44 },
    typical: nightCurve,
    note: 'Will-call line longest; mobile-ticket lane at the west door is clear.',
  },
]

// Queue boards for merchant demo venues.
export const QUEUES: Record<string, QueueEntry[]> = {
  'lantern-room': [
    { id: 'q1', name: 'Marisol R.', partySize: 2, channel: 'remote', quotedMins: 20, waitedMins: 14, phone: '••• ••• 4821', state: 'notified', serviceNote: 'Bar seats OK' },
    { id: 'q2', name: 'The Okafors', partySize: 4, channel: 'walk-in', quotedMins: 35, waitedMins: 22, phone: '••• ••• 9013', state: 'waiting' },
    { id: 'q3', name: 'D. Whitman', partySize: 2, channel: 'qr', quotedMins: 20, waitedMins: 8, phone: '••• ••• 2277', state: 'waiting', serviceNote: 'Anniversary' },
    { id: 'q4', name: 'Priya & Sam', partySize: 3, channel: 'remote', quotedMins: 30, waitedMins: 5, phone: '••• ••• 6650', state: 'waiting' },
    { id: 'q5', name: 'Jordan L.', partySize: 5, channel: 'walk-in', quotedMins: 45, waitedMins: 2, phone: '••• ••• 1188', state: 'waiting', serviceNote: 'High chair' },
    { id: 'q6', name: 'Chen party', partySize: 2, channel: 'qr', quotedMins: 20, waitedMins: 31, phone: '••• ••• 7402', state: 'seated' },
  ],
  'riverside-urgent': [
    { id: 'c1', name: 'Patient 214', partySize: 1, channel: 'remote', quotedMins: 25, waitedMins: 18, phone: '••• ••• 3390', state: 'notified', serviceNote: 'Return window 6:40' },
    { id: 'c2', name: 'Patient 215', partySize: 1, channel: 'walk-in', quotedMins: 30, waitedMins: 12, phone: '••• ••• 4471', state: 'waiting' },
    { id: 'c3', name: 'Patient 216', partySize: 2, channel: 'qr', quotedMins: 30, waitedMins: 6, phone: '••• ••• 5562', state: 'waiting', serviceNote: 'Parent + minor' },
    { id: 'c4', name: 'Patient 217', partySize: 1, channel: 'walk-in', quotedMins: 35, waitedMins: 3, phone: '••• ••• 6653', state: 'waiting' },
  ],
  'fade-house': [
    { id: 's1', name: 'Andre', partySize: 1, channel: 'qr', quotedMins: 10, waitedMins: 7, phone: '••• ••• 2210', state: 'notified', serviceNote: 'Skin fade' },
    { id: 's2', name: 'Marcus', partySize: 1, channel: 'walk-in', quotedMins: 15, waitedMins: 4, phone: '••• ••• 3321', state: 'waiting', serviceNote: 'Cut + beard' },
    { id: 's3', name: 'Devon', partySize: 1, channel: 'remote', quotedMins: 15, waitedMins: 1, phone: '••• ••• 4432', state: 'waiting' },
  ],
}

export interface StatusOption {
  band: WaitBand
  label: string
}
export const MERCHANT_STATUSES: StatusOption[] = [
  { band: 'none', label: 'No wait' },
  { band: 'short', label: 'Short' },
  { band: 'moderate', label: 'Moderate' },
  { band: 'long', label: 'Long' },
  { band: 'capacity', label: 'At capacity' },
]

export const ANALYTICS = {
  venueName: 'The Lantern Room',
  range: 'Last 7 days',
  publicViews: 4820,
  viewsDelta: 12,
  remoteJoins: 612,
  joinsDelta: 18,
  confirmedVisits: 388,
  visitsDelta: 9,
  callsDeflected: 214,
  avgQuotedMins: 22,
  avgActualMins: 27,
  predictionAccuracy: 86,
  stalePeriods: 3,
  reliability: 94,
  // views -> joins -> visits funnel
  funnel: [
    { label: 'Public status views', value: 4820 },
    { label: 'Tapped “join / directions”', value: 1310 },
    { label: 'Remote joins', value: 612 },
    { label: 'Confirmed visits', value: 388 },
  ],
  // quoted vs actual wait by hour for a Friday
  waitByHour: [
    { hour: '5p', quoted: 10, actual: 12 },
    { hour: '6p', quoted: 15, actual: 18 },
    { hour: '7p', quoted: 20, actual: 26 },
    { hour: '8p', quoted: 25, actual: 34 },
    { hour: '9p', quoted: 25, actual: 31 },
    { hour: '10p', quoted: 20, actual: 22 },
    { hour: '11p', quoted: 10, actual: 11 },
  ],
  insights: [
    'Friday 7–9 PM lost an estimated 18 walk-ins to waits over 35 min. Consider opening bar-seat quotes earlier.',
    'Your quoted waits ran ~9 min optimistic after 8 PM. Copilot has nudged the default quote up by 5 min.',
    'Adding one server 6–8 PM is modeled to cut average wait 22% based on your throughput.',
    '214 “how long is the wait?” calls were deflected to your public status page this week.',
  ],
}

// Research / competitive landscape content for the Research view.
export const COMPETITORS = [
  {
    name: 'OpenTable',
    bucket: 'Reservations',
    focus: 'Restaurant discovery + reservations marketplace',
    gap: 'Reservation-centric, per-cover economics, no cross-category live line status.',
  },
  {
    name: 'Resy',
    bucket: 'Reservations',
    focus: 'Premium dining reservations, Amex ecosystem',
    gap: 'Restaurant + reservation bound; not a neutral public status layer.',
  },
  {
    name: 'Yelp Guest Manager',
    bucket: 'Reservations',
    focus: 'Waitlist + tables on Yelp demand (~$100s/mo)',
    gap: 'Restaurant-specific, tied to Yelp; not neutral across clinics, salons, events.',
  },
  {
    name: 'SevenRooms',
    bucket: 'Reservations',
    focus: 'Enterprise hospitality CRM + guest data',
    gap: 'Expensive & complex for walk-in SMBs; not a public “line near me” product.',
  },
  {
    name: 'Waitwhile',
    bucket: 'Queue tools',
    focus: 'Cross-industry queues, appointments, analytics',
    gap: 'Merchant ops first; no consumer city-level wait map.',
  },
  {
    name: 'QLess / Qminder',
    bucket: 'Queue tools',
    focus: 'Gov, healthcare, retail branch queues',
    gap: 'B2B ops, enterprise sales, little public discovery.',
  },
  {
    name: 'Waitlist Me / NextMe',
    bucket: 'Queue tools',
    focus: 'Lightweight SMB virtual waitlists',
    gap: 'Limited network effects; not a discovery destination.',
  },
  {
    name: 'Google Popular Times',
    bucket: 'Busyness data',
    focus: 'Ambient busyness inside Maps',
    gap: 'Coarse, not merchant-controlled, no join flow or freshness promise.',
  },
  {
    name: 'BestTime.app',
    bucket: 'Busyness data',
    focus: 'Foot-traffic forecast API',
    gap: 'Data API, relative busyness ≠ wait time or queue position.',
  },
]

export const PLANS = [
  {
    name: 'Free',
    price: '$0',
    unit: 'forever',
    tagline: 'Seed supply & get discovered',
    features: [
      'Public venue status page',
      'Manual wait-band updates',
      'Claim your venue',
      'Limited user reports',
    ],
    cta: 'Claim venue',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$29',
    unit: '/mo · location',
    tagline: 'Small bars, barbers, food trucks',
    features: [
      'Merchant-verified badge',
      'One-tap live status controls',
      'Basic queue board + QR check-in',
      'Bring-your-own SMS',
      'Simple analytics',
    ],
    cta: 'Start Starter',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$79',
    unit: '/mo · location',
    tagline: 'Restaurants, clinics, busy services',
    features: [
      'Everything in Starter',
      'Remote join + automated texts',
      'AI wait prediction & confidence',
      'No-show controls + staff roles',
      'Weekly insights + embeddable widget',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Growth',
    price: '$149',
    unit: '/mo · location',
    tagline: 'Multi-queue, multi-location',
    features: [
      'Everything in Pro',
      'Multi-queue + custom categories',
      'Demand-shaping offers',
      'Advanced analytics + API/webhooks',
      'Multi-location dashboard',
    ],
    cta: 'Talk to sales',
    highlight: false,
  },
]
