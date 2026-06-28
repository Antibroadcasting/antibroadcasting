# Antibroadcasting

Minneapolis screen printing shop website built with Next.js 16, Keystatic CMS, Tailwind CSS v4, and Resend.

## Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Keystatic (local mode in both dev and production — content is
  edited directly against the deployed filesystem by the site owner; the
  `/keystatic` admin UI is not indexed by search engines but is reachable
  without its own authentication layer)
- **Styling**: Tailwind CSS v4
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to access the CMS.

## Environment Variables

Copy `.env.local` and fill in your keys:

- `RESEND_API_KEY` — from [resend.com](https://resend.com)
- `NEXT_PUBLIC_SENTRY_DSN` — error monitoring. Leave empty to disable (local dev default).

## Content

All content lives in `/content` and is managed via Keystatic:

- `/content/gallery` — portfolio pieces
- `/content/faq` — FAQ items by category
- `/content/promos` — active promotions
