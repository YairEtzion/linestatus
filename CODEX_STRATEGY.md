# LineStatus Strategy Memo

Date: 2026-07-02

LineStatus should become the public status layer for real-world lines, waits, and crowd levels, starting with high-frequency local venues where uncertainty changes behavior: restaurants, bars, clinics, salons, barber shops, pop-ups, events, government counters, campus services, gyms, and attractions.

The product should not start as a full reservation platform. That market is crowded, integration-heavy, and trust-constrained. The wedge is simpler: "Can I go now, and what happens if I join?" Make LineStatus the fastest way for a consumer to see whether a place is worth visiting now, and the fastest way for a merchant to publish accurate queue status without installing a heavyweight front-of-house suite.

## Existing Applications And Positioning

### Restaurant Reservation And Guest Management

**OpenTable**
- Positioning: broad restaurant discovery and reservations marketplace with restaurant-side table, guest, and campaign tools.
- Strengths: large diner audience, mature restaurant network, marketplace demand generation, reservation inventory, consumer habit.
- Weaknesses for LineStatus opportunity: more reservation-centric than "what is happening right now"; cost and per-cover dynamics can be painful; public real-time wait status is not its main consumer promise.
- Pricing signal: public OpenTable plans show monthly software plus cover fees depending on plan and booking source.
- Source: https://www.opentable.com/restaurant-solutions/plans/

**Resy**
- Positioning: premium/culture-forward reservations, especially strong in dining cities and sought-after venues.
- Strengths: strong brand among diners seeking desirable restaurants, Amex ecosystem, reservation availability behaviors such as notify.
- Weaknesses: not designed as a cross-category public queue layer; heavily restaurant and reservation oriented.

**Yelp Guest Manager**
- Positioning: restaurant waitlist, reservations, table management, and guest tools attached to Yelp demand.
- Strengths: Yelp consumer traffic, no cover-fee positioning, clear restaurant adoption path, waitlist heritage from NoWait.
- Weaknesses: restaurant-specific, tied to Yelp ecosystem, not a neutral live status layer across clinics, salons, events, and walk-in services.
- Pricing signal: Yelp publicly presents plan pricing around the low hundreds per month for restaurants.
- Sources: https://business.yelp.com/restaurants/products/yelp-guest-manager/ and https://business.yelp.com/restaurants/yelp-restaurants-pricing/

**SevenRooms**
- Positioning: hospitality CRM, reservations, waitlist, marketing automation, guest profiles, and revenue operations.
- Strengths: enterprise-grade guest data, CRM, marketing, table management, integrations, direct relationship ownership.
- Weaknesses: expensive and complex for small walk-in businesses; not primarily a public "line status near me" product.
- Source: https://sevenrooms.com/pricing/

**Eat App, Tock, Toast Tables, Hostme, Simple Host**
- Positioning: reservation and table management alternatives with differing levels of CRM, POS connection, deposits, event/ticketing, and hospitality workflow depth.
- Strengths: strong vertical workflows for restaurants.
- Weaknesses: category-bounded, operationally heavier than a universal public status feed.

### Queue And Waitlist Management

**Waitwhile**
- Positioning: queue management, waitlists, appointments, messaging, analytics, and APIs across many service categories.
- Strengths: broad category support, mature queue workflows, appointment scheduling, automation, analytics.
- Weaknesses: merchant operations product first; consumer discovery and public city-level wait map are not the central product.
- Pricing signal: public third-party listings and Waitwhile docs show tiered pricing and visit/location concepts, with a free or low-cost entry in some listings.
- Sources: https://waitwhile.com/ and https://help.waitwhile.com/en/articles/11408401-how-much-does-waitwhile-cost

**QLess, Qminder, WaitWell, Skiplino, Qmatic**
- Positioning: queue management for government offices, healthcare, education, telecom, retail, public sector, and branch operations.
- Strengths: operational rigor, appointments, service routing, kiosks, dashboards, branch analytics, staff optimization.
- Weaknesses: mostly B2B service operations, often enterprise sales, little consumer-facing public discovery.

**Waitlist Me, NextMe, ScanQueue**
- Positioning: simpler virtual waitlist and walk-in management for small businesses.
- Strengths: easier adoption, lighter workflows, pragmatic SMS check-in.
- Weaknesses: limited network effects; usually not a destination app for public wait discovery.

### Public Busyness And Foot-Traffic Data

**Google Maps Popular Times / Live Busyness / Wait Times**
- Positioning: ambient planning data inside the dominant local discovery product.
- Strengths: enormous reach, passive location data, historical popular times, some live busyness and visit duration signals.
- Weaknesses: coarse, not merchant-controlled enough, not queue-specific, no join flow, no promise of freshness or operational explanation.
- Sources: https://support.google.com/maps/answer/11323117 and https://support.google.com/business/answer/6263531

**BestTime.app**
- Positioning: foot-traffic API with forecasts and live/relative venue busyness.
- Strengths: developer-accessible public venue traffic forecasts across many countries and categories.
- Weaknesses: data API rather than consumer/merchant product; relative busyness is not the same as wait time or queue position.
- Source: https://besttime.app/

## What Is Missing Today

The gap is not "another waitlist." The gap is a trustworthy public operating-status graph for places.

Current products split into three disconnected buckets:

1. **Consumer discovery without operational precision.** Google and Yelp can tell me whether a place is popular, open, or bookable, but they often cannot tell me the current line length, quoted walk-in wait, host confidence, party-size effects, or whether the wait is moving.

2. **Merchant queue tools without public network effects.** Waitwhile, QLess, Qminder, Waitlist Me, and similar tools help staff manage a line, but they are usually not where a consumer starts when deciding where to go.

3. **Restaurant reservation systems without cross-category real-time status.** OpenTable, Resy, SevenRooms, and Yelp Guest Manager are powerful in restaurants, but LineStatus can be broader and lighter: bars, clinics, salons, service counters, pop-ups, and events.

Missing product primitives:
- A public live status card: wait band, crowd level, last update, confidence, joinability, and next best arrival window.
- Merchant-verified status that is easy enough for a host, barber, nurse, bartender, or event volunteer to update in under five seconds.
- A consumer map/list that answers "where should I go right now?" instead of "where can I reserve later?"
- Cross-venue comparison: "nearby places with under 15 minutes," "walk-in friendly now," "quietest next hour," "no line but likely to fill soon."
- A privacy-safe public standard for wait and crowd data.
- A feedback loop that learns from actual outcomes rather than only quoted waits.

## AI Opportunities In 2026

AI should be used where it improves trust, speed, and operational outcomes. It should not be a vague chatbot wrapper.

### 1. Wait-Time Prediction

Predict wait bands using:
- Current queue size, party sizes, and service channels.
- Historical throughput by venue, day, time, weather, seasonality, holiday, and event context.
- Staff-reported conditions such as short-staffed, kitchen backed up, room turnover slow, provider running late.
- Consumer check-in and "seated/served/left" confirmations.
- Merchant POS or reservation/table data when available.
- Nearby demand and public foot-traffic signals if licensed or integrated.

The UI should show confidence, not false precision:
- "10-20 min, high confidence"
- "25-40 min, updated 3 min ago"
- "Usually clears after 8:45 PM"

### 2. Merchant Copilot

Give staff one-tap AI suggestions:
- "Quote 20-30 min for parties of 2, 35-45 for 4+."
- "Pause public join for 15 min."
- "Send delay text to the next 6 parties."
- "Offer bar seats to parties of 1-2."
- "Mark status as busy but moving."

The copilot should reduce decisions during rush periods, not add a chat chore.

### 3. Demand Shaping

LineStatus can help merchants move demand instead of merely reporting pain:
- Recommend arrival windows to consumers.
- Offer "come in 25 minutes" remote join.
- Promote off-peak incentives.
- Suggest alternate nearby venues if a line is too long, potentially monetized as marketplace placement.
- For clinics/salons/service counters, smooth arrivals with return windows and delay notices.

### 4. Anomaly And Trust Detection

Detect:
- Stale merchant status.
- Quoted waits that consistently understate reality.
- Review-bomb-style crowd reports.
- Suspicious competitor manipulation.
- Venues marking "no wait" while user confirmations say otherwise.

Trust is the product. The system should learn a reliability score for each venue and each signal type.

### 5. Natural-Language Status Intake

For small operators, status updates can be SMS, voice, or WhatsApp-style:
- "Line is 12 people, about 25 min, stop remote joins."
- "Doctor running 30 behind."
- "Kitchen caught up, quote 10."

AI converts this into structured public and private status.

### 6. AI-Generated Operational Summaries

Daily/weekly merchant summaries:
- "Friday 7-9 PM lost an estimated 18 walk-ins due to waits over 35 min."
- "Your quoted waits were 9 minutes too optimistic after 8 PM."
- "Adding one stylist from 5-7 PM would reduce average wait by 22% based on past throughput."
- "Public status views converted to 41 joins and 17 confirmed visits."

### 7. Privacy-Safe Personalization

Consumer AI should advise without exposing sensitive identities:
- "Go now if you need under 20 minutes."
- "This clinic is least busy Tuesday mornings."
- "You usually prefer quieter bars; this one is trending crowded."

Avoid creepy cross-venue personal labels such as "high spender" or hidden behavioral tags. AI-generated guest profiles are already a privacy flashpoint in restaurant technology.

## Public Wait And Crowd Info

### Pros

- Reduces wasted trips and consumer frustration.
- Helps merchants capture walk-ins who would otherwise call, leave, or avoid the venue.
- Deflects phone calls: "How long is the wait?"
- Gives smaller merchants a lightweight live channel without full reservation infrastructure.
- Improves accessibility for people who cannot stand in long lines.
- Helps people choose quieter times, which can smooth demand.
- Creates a differentiated local search surface that Google/Yelp do not fully own.

### Cons And Risks

- Public data can embarrass merchants if empty or overloaded.
- Too much precision can create gaming, crowd surges, or disappointment.
- Health clinics and personal services have higher sensitivity.
- Live crowd maps can reveal staff capacity, business weakness, or event security conditions.
- User reports can be inaccurate, malicious, or biased.
- Public line data may create unfair comparisons across venues with different service models.
- Remote joining can be abused if no-show penalties and confirmation loops are weak.

### What Should Be Public

Default public fields:
- Venue name, category, address/neighborhood, open/closed.
- Status label: no wait, short wait, moderate wait, long wait, at capacity, delayed, accepting walk-ins, remote join available.
- Wait band, not exact minute: 0-5, 5-15, 15-30, 30-60, 60+.
- Crowd band: quiet, steady, busy, packed.
- Last updated timestamp.
- Source indicator: merchant verified, user reported, predicted, historical typical.
- Confidence indicator.
- Join/check-in action when the merchant enables it.
- Accessibility notes such as seating available while waiting, outdoor line, SMS callback.

Public only with explicit merchant opt-in:
- Exact queue length.
- Exact next slot time.
- Department/provider-specific status in clinics.
- Staffed counters or available capacity.
- Event gate-specific congestion.
- Specials or incentives tied to wait reduction.

Never public:
- Names, phone numbers, or identifiers of people in line.
- Individual queue positions except to that user.
- Health reason, service reason, treatment type, or appointment details.
- Employee-level performance.
- Raw camera feeds or identifiable imagery.
- Sensitive venue-specific security details.

### Privacy Principles

- Publish bands, not surveillance.
- Prefer merchant verification over passive tracking.
- Make source and freshness visible.
- Let merchants temporarily suppress public status for safety, harassment, or abnormal operations.
- For clinics and regulated environments, default to operational status only, not patient detail.
- Give consumers useful planning data without creating a hidden identity marketplace.

## Monetization And Pricing

LineStatus should use simple location-based SaaS first, then marketplace and usage economics once liquidity exists.

### Merchant SaaS

**Free**
- Public venue page.
- Manual status updates.
- Basic "wait band" publishing.
- Limited user reports.
- Claim venue.
- Goal: seed supply and SEO.

**Starter: $29/month/location**
- Merchant-verified badge.
- Live status controls.
- Basic queue list.
- QR self check-in.
- Limited SMS credits or bring-your-own messaging.
- Simple analytics.
- Best for small bars, food trucks, barbers, salons, pop-ups.

**Pro: $79/month/location**
- Remote join.
- Automated text updates.
- AI wait prediction.
- No-show controls.
- Staff roles.
- Weekly insights.
- Embeddable widget for website/Instagram/link-in-bio.
- Google Business Profile style status link assets.
- Best for restaurants, clinics, salons, high-volume services.

**Growth: $149/month/location**
- Multi-queue support.
- Demand shaping offers.
- Advanced analytics.
- Integrations/API/webhooks.
- Custom status categories.
- Reputation and feedback capture.
- Multi-location dashboard.

**Enterprise: custom**
- SSO, audit logs, SLA, data export, custom integrations, branch analytics, healthcare/public-sector controls.

### Usage And Add-Ons

- SMS/WhatsApp pass-through or bundled credits.
- AI prediction add-on for high-volume venues if compute costs matter.
- Premium placement for "available now" or off-peak campaigns, clearly labeled.
- Sponsored alternatives when a venue is too busy, but never in a way that hides the original venue's status.
- API access for local guides, event pages, campus apps, tourism boards, hotels.
- White-label event queue pages.

### Pricing Strategy

Keep the initial ask below restaurant reservation platforms and enterprise queue systems. The merchant should think: "This is cheaper than lost walk-ins and phone interruptions." Avoid per-cover fees at MVP stage. Per-cover pricing creates immediate distrust and puts LineStatus into direct OpenTable/Resy/Yelp comparison before the product has network power.

## Recommended MVP

### Decisive MVP Scope

Build a web-first public wait map plus merchant status console for one metro area or simulated seed market. Do not start with native apps. Do not start with full reservations. Do not start with POS integrations.

The MVP should prove:
- Consumers will check public wait status before visiting.
- Merchants will update status because it is fast and visibly useful.
- Status freshness and confidence can become a trust advantage.
- Remote join can convert consumer intent into measurable merchant value.

### Consumer MVP

Core screens:
- Public home/search page with map/list toggle.
- Venue status cards with wait band, crowd band, last updated, confidence, and source.
- Filters: under 15 min, remote join, open now, merchant verified, category, distance.
- Venue detail page with live status, typical busy times, join button, update source, and arrival recommendation.
- Remote join flow: party size/service type, name, phone, notification consent, ETA guidance.
- "Report status" flow with guardrails: crowd band, observed wait band, optional note, no photos required.

Consumer differentiators:
- "Best time to go" and "go now" recommendations.
- Honest stale-state handling: if status is old, say so.
- Wait bands instead of fake precision.
- Cross-category status, not only restaurants.

### Merchant MVP

Core screens:
- Claim/login.
- One-tap status board: no wait, short, moderate, long, paused, at capacity.
- Queue board: parties/customers, party size, quoted wait, contact, status, notify, seat/serve/complete/no-show.
- Public preview: exactly what consumers see.
- AI suggested quote: starts rule-based, later ML-backed.
- QR code and share link for self check-in.
- Basic analytics: views, joins, average quoted wait, average actual wait, stale periods, missed calls avoided if manually entered.

Merchant differentiators:
- Update public status in under five seconds.
- Merchant can choose public detail level.
- Explicit source/freshness builds consumer trust.
- Lightweight enough for businesses that will never buy SevenRooms or QLess.

### Admin MVP

- Seed venue database.
- Moderate reports.
- Mark suspicious status reports.
- Override/disable public status for sensitive venues.
- Manage categories and pricing flags.
- Inspect status history for model training.

### Data Model MVP

Entities:
- Venue
- VenueCategory
- MerchantAccount
- PublicStatusSnapshot
- Queue
- QueueEntry
- UserStatusReport
- StatusPrediction
- NotificationEvent
- SubscriptionPlan

Important fields:
- status_source: merchant, user, predicted, historical, admin
- status_freshness
- confidence_score
- public_visibility_level
- wait_band
- crowd_band
- remote_join_enabled
- sensitive_category flag

### MVP Differentiators

1. **Public status first.** Competitors manage queues; LineStatus publishes trusted local operating status.
2. **Cross-category.** Restaurants are the first obvious market, but the product should visibly support clinics, salons, bars, events, government counters, and campus services.
3. **Freshness and source labels.** Every status has a provenance.
4. **Privacy-safe bands.** Useful without exposing individuals.
5. **Merchant control.** Merchants can publish less detail while still being useful.
6. **AI that quotes better waits.** The first AI feature should be prediction and confidence, not a generic assistant.
7. **Demand shaping.** Recommend when to come, not just whether there is a line.

## What To Avoid

- Do not build a reservation marketplace first.
- Do not require POS integration for the first prototype.
- Do not make exact wait minutes the primary promise.
- Do not scrape or imply private surveillance.
- Do not make consumers download an app to see status.
- Do not bury the public wait card behind account creation.
- Do not make the merchant UI look like enterprise operations software.
- Do not create hidden AI labels about individual customers.
- Do not expose sensitive clinic or service details publicly.

## Image And Visual Direction For Mocks

The visual language should feel like a modern local operations map, not a restaurant reservation clone.

### Product Feel

- Fast, legible, urban, operational, trustworthy.
- The first screen should show live venue status immediately.
- Use a map/list hybrid with dense but readable status cards.
- Status color should communicate urgency without looking like a stock trading app.
- Avoid a luxury dining aesthetic. The platform is broader than restaurants.

### Visual System

Recommended palette:
- Base: warm off-white or neutral light gray background.
- Text: near-black slate.
- Trust blue for merchant-verified and informational elements.
- Fresh green for no/short wait.
- Amber for moderate wait.
- Red/coral for long wait or at capacity.
- Purple should be used sparingly if at all; it is overused in AI products.

Typography:
- Clear sans-serif, compact but humane.
- Strong numeric wait bands.
- Small source/freshness labels.
- No oversized marketing hero type in the core app.

Components:
- Venue status cards with fixed-height status badges.
- Map pins shaped or colored by wait band.
- Segmented controls for category and view modes.
- Icon buttons for map, list, filters, share, directions.
- Merchant console with large tap targets for live rush operation.
- Confidence/source chip: "Merchant verified | 3 min ago."

Mock imagery:
- Use real-world context in mocks: a restaurant host stand, a clinic waiting room, a bar entrance, a salon queue, an event gate.
- If generated images are used, keep them documentary and concrete: people waiting, signage, street-level venue fronts, queue board screens.
- Avoid abstract gradient blobs, faceless SaaS illustrations, and overly polished luxury dining photography.

### Prototype Screens Claude Should Build

1. Public wait map/list page.
2. Venue detail page.
3. Remote join modal.
4. User report modal.
5. Merchant live status console.
6. Merchant queue board.
7. Merchant analytics summary.

## Go-To-Market

### Beachhead

Start with a city/neighborhood where lines are visible and consumer behavior is spontaneous:
- Dining/nightlife district.
- College town.
- Tourist neighborhood.
- Medical/service cluster.
- Event/campus environment.

The best initial wedge is not "all restaurants." It is "places where people routinely ask: how long is the wait right now?"

### Supply Acquisition

- Give merchants a free public status page and QR check-in.
- Let consumers report status for unclaimed venues, but label it clearly.
- Provide an embeddable status widget.
- Offer a "verified live status" badge for merchants.
- Build category-specific landing pages: "Wait times in [neighborhood]," "Walk-in clinics with short waits," "Bars with no line now."

### Demand Acquisition

- SEO for venue + wait time queries.
- Shareable venue status links.
- Hotel concierge/campus/event partnerships.
- Local guides: "short waits near me."
- Consumer notifications for favorite places.

### Trust Loop

LineStatus wins only if users believe the status. The trust loop:
1. Merchant updates status.
2. Consumer sees source and freshness.
3. Consumer joins or visits.
4. Actual wait is confirmed.
5. Prediction improves.
6. Venue reliability score improves.
7. More consumers trust the venue.

## Strategic Assessment

### Why This Can Work

- Wait uncertainty is a frequent, painful, cross-category consumer problem.
- Merchants have a clear reason to publish status: fewer calls, fewer walkaways, better demand timing.
- Existing products are either too broad and coarse, or too operational and private.
- The public/private boundary can become a product advantage.
- AI prediction becomes more defensible as LineStatus accumulates actual wait outcomes.

### Why It Might Fail

- Merchants may not update status during rush unless the UI is extremely fast.
- Consumers may default to Google unless LineStatus has unique live data.
- User-reported data can be noisy before merchant supply exists.
- Remote join introduces no-shows and operational complexity.
- Some merchants may dislike exposing busyness or emptiness.
- Marketplace liquidity is hard category by category, city by city.

### Mitigations

- Make merchant update controls one-tap and mobile-first.
- Always show source/freshness/confidence.
- Start with bands, not exact numbers.
- Allow merchants to publish "accepting walk-ins" without exact queue length.
- Use QR check-in to create real outcome data.
- Build the prototype with seeded data to show the network behavior before supply exists.

## Final Decision Memo For Claude

Claude should build the prototype as a polished web app demonstrating LineStatus as a public live wait-status platform plus merchant queue console.

### Product Thesis

LineStatus is not another reservation app. It is the live status layer for physical places. Consumers use it to decide where to go now. Merchants use it to publish a trustworthy wait/crowd signal, manage lightweight queues, and shape demand.

### Build Direction

Build a single-page or small multi-view web prototype with realistic seeded data. It should feel immediately usable, not like a landing page.

Required views:
- Public map/list with venues across restaurants, bars, clinics, salons, and events.
- Venue detail with live wait band, crowd band, last updated, source, confidence, typical busy graph, and join/report actions.
- Remote join flow with party size or service type, phone capture, estimated wait, and consent note.
- User report flow with privacy-safe wait/crowd bands.
- Merchant dashboard with live status buttons, queue board, public preview, and AI suggested wait.
- Analytics view with views, joins, average wait, stale periods, and prediction accuracy.

Seed data should include:
- 12-20 venues.
- Mixed categories.
- Different statuses: no wait, short wait, moderate, long, at capacity, stale, predicted only, merchant verified.
- Queue entries for at least one restaurant, one clinic, and one salon.

Design requirements:
- No marketing hero as the first screen.
- First screen must show the actual app: map/list and live status cards.
- Use wait-band colors consistently.
- Show source and freshness on every status.
- Keep cards compact, with stable dimensions.
- Merchant UI must be fast and operational, not decorative.
- Use realistic local-place imagery only where it helps. Do not rely on abstract SaaS art.

MVP feature priority:
1. Public status browsing.
2. Merchant-verified updates.
3. Remote join.
4. User reports.
5. AI wait suggestion and confidence.
6. Basic analytics.

Non-goals:
- Full reservations.
- Payments/deposits.
- POS integration.
- Native mobile apps.
- Exact real-time location tracking.
- Individual customer profiling.

### Recommended Differentiating Copy

Use product language like:
- "Live wait status for real places."
- "See the line before you go."
- "Merchant verified | updated 3 min ago."
- "Join remotely when the venue allows it."
- "Wait bands, crowd levels, and confidence without exposing personal data."

Avoid copy like:
- "AI-powered reservation marketplace."
- "Know exactly who is waiting."
- "Real-time surveillance."
- "The OpenTable for everything."

### Build Verdict

Proceed with the prototype. The opportunity is real if LineStatus stays focused on public, privacy-safe, fresh operational status rather than trying to out-reservation incumbents. The prototype should make the wedge obvious in the first 10 seconds: a consumer can instantly find places with short waits, and a merchant can update public status during a rush without thinking.
