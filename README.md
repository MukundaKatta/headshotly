# Headshotly

Studio-grade headshots from your selfies. Forty professional headshots in twenty minutes.

**Status:** v0 skeleton — landing page + selfie-upload preview route. Full AI generation not yet wired.

**Landing:** https://headshotly.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | Upload a selfie, see 3 mocked headshot variants (studio, outdoor, corporate) |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "headshotly"` |

## What's next

- Wire real AI headshot generation behind `/try`
- Multiple selfie upload + model training flow
- Auth + per-user gallery
