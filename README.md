# Antibroadcasting

Minneapolis screen printing shop website built with Next.js 16, Keystatic CMS, Tailwind CSS v4, and Resend.

## Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Keystatic (local mode by default, with an inert GitHub-mode
  storage scaffold — see `docs/keystatic-github-mode-migration.md`; the
  `/keystatic` admin UI is not indexed by search engines and, once
  `KEYSTATIC_ADMIN_PASSWORD` is set, sits behind a password gate in
  `proxy.ts`)
- **Styling**: Tailwind CSS v4
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to access the CMS.

Other scripts:

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # eslint
pnpm test    # vitest run
```

## Environment Variables

Create `.env.local` (no committed example file — see the variable list below)
and fill in your keys:

- `RESEND_API_KEY` — from [resend.com](https://resend.com)
- `NEXT_PUBLIC_SENTRY_DSN` — error monitoring. Leave empty to disable (local dev default).
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare
  Turnstile for the quote request form. Leave both empty in local dev to skip
  verification automatically.
- `KEYSTATIC_GITHUB_CLIENT_ID` / `KEYSTATIC_GITHUB_CLIENT_SECRET` /
  `KEYSTATIC_SECRET` / `NEXT_PUBLIC_KEYSTATIC_GITHUB_ENABLED` /
  `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — only needed to switch Keystatic
  to GitHub-mode storage in production, via a GitHub **App** (not a manual
  OAuth App — see `docs/keystatic-github-mode-migration.md`). All five are
  required together. Unset in local dev, which always runs Keystatic in
  local-filesystem mode.
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER` / `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`
  — which repo GitHub-mode commits to. Defaults to
  `travhall`/`antibroadcasting` when unset. This codebase is shared between
  that staging repo and a production fork
  (`Antibroadcasting/antibroadcasting`), each with its own GitHub App —
  the production Vercel project sets these to point at the fork instead.
- `NEXT_PUBLIC_SITE_URL` — canonical site URL used for the sitemap,
  robots.txt, and Open Graph tags. Defaults to the staging Vercel domain.
  The production fork sets its own value in Vercel.
- `KEYSTATIC_ADMIN_PASSWORD` — shared password gating `/keystatic` and
  `/api/keystatic` from the public (`proxy.ts`). Leave empty in local
  dev to skip the gate entirely.

## Content

All content lives in `/content` and is managed via Keystatic:

- `/content/gallery` — portfolio pieces
- `/content/faq` — FAQ items by category
- `/content/art-requirements` — art requirement guidance blocks
- `/content/pages` — freeform update/announcement pages
- `/content/promo-banner` — active promo banner + queued upcoming promos
- `/content/alert-banner.json` — sitewide alert banner singleton
- `/content/site-info.json` — sitewide site info singleton
