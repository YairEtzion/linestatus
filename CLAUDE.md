# LineStatus Project Context

## Product concept
LineStatus is a public + merchant live wait-status platform for physical venues: restaurants, bars, clinics, salons, events, and other places where people stand in line or need to decide whether to go now.

Core thesis: not another reservation app. LineStatus is a trustworthy public operating-status layer for real places: wait band, crowd band, source, freshness, confidence, and optional remote join.

## Current prototype
This repo contains a Vite + React + TypeScript mock/prototype, no backend.

Important routes:
- `/` — landing page and pricing thesis
- `/#/explore` — public live wait map/list
- `/#/merchant` — merchant status console, queue board, analytics
- `/#/research` — competition, gaps, privacy stance, monetization, AI opportunities

Run:
```bash
npm install
npm run dev -- --host 0.0.0.0
npm run build
```

## Current verified status
- Local build passed with `npm run build`.
- Dev server has been run at `http://localhost:5173/` and, on this machine/Tailscale, `http://100.104.78.59:5173/`.
- Local git commit exists: `98fcf45 Build LineStatus concept prototype`.
- GitHub push failed with HTTP 403 using the provided token, so do not assume remote is current until push is retried with a token/account that has write access.

## Files to understand first
- `src/data.ts` — seeded venues, queues, competitor/pricing/research content
- `src/pages/Landing.tsx` — landing page
- `src/pages/Explore.tsx` — public map/list
- `src/pages/Merchant.tsx` — merchant console
- `src/pages/Research.tsx` — research page
- `src/modals.tsx` — venue detail, remote join, report modals
- `src/index.css` — all visual styling
- `CODEX_STRATEGY.md` — strategy/product memo
- `research-source-pack.md` — search/source pack
- `GEMINI_STATUS.md` — Gemini CLI was installed but not authenticated in the runtime used for the initial build

## Product decisions made
- Public data should be bands, not surveillance: wait band, crowd band, source, freshness, confidence.
- Never expose personal names, phone numbers, health reasons, exact queue positions publicly, employee performance, or camera feeds.
- Remote join should be merchant-controlled.
- Clinics and other sensitive venues should show operational status only.
- AI should focus on wait prediction, reliability scoring, anomaly/manipulation detection, merchant quote suggestions, and demand-shaping — not generic chatbot features.

## Competitive framing
Incumbents split into:
- Reservation marketplaces: OpenTable, Resy, Yelp Guest Manager, SevenRooms
- Merchant queue tools: Waitwhile, QLess, Qminder, Waitlist Me, NextMe
- Public busyness data: Google Popular Times, BestTime-style data APIs

Gap: none are a neutral, cross-category, public, trust-labeled live status graph with lightweight merchant publishing and optional remote join.

## Pricing direction
Prototype pricing currently uses:
- Free: claimed public status page
- Starter: `$29/mo/location`
- Pro: `$79/mo/location`
- Growth: `$149/mo/location`

Keep pricing simple, per-location, and avoid per-cover fees in the MVP.

## Design direction
Premium SaaS, warm nightlife/urban visual language, privacy-safe trust badges, status bands, map/list cards, merchant console. Hero asset lives at `public/assets/linestatus-hero.png`.

## Important caveats for future agents
- Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, generated Vite config JS/DTS, or secrets.
- Do not embed GitHub tokens in remote URLs or committed files.
- If continuing on another machine, first run `npm install && npm run build` before changes.
- If asked to push, verify GitHub auth/write access first.
