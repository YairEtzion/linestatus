# LineStatus

A polished concept prototype for a public live wait-status platform for restaurants, bars, clinics, salons, events, and other walk-in venues.

## What this prototype demonstrates

- Public live wait map/list with seeded venues
- Venue detail with wait band, crowd band, source, freshness, confidence, typical busy graph
- Remote join and user report flows
- Merchant live status console with one-tap public updates
- Merchant queue board and analytics summary
- Landing page with pricing thesis
- Research/competition page covering incumbents, gaps, AI differentiation, privacy/public info stance, and monetization

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/
```

On this machine it is currently also reachable at:

```text
http://100.104.78.59:5173/
```

if your client is on the same Tailscale network.

## Build verification

```bash
npm run build
```

Verified passing on this machine.

## Research artifacts

- `CODEX_STRATEGY.md` — Codex-generated strategy and product decision memo
- `research-source-pack.md` — source/search pack used for market analysis
- `GEMINI_STATUS.md` — Gemini CLI auth status note
