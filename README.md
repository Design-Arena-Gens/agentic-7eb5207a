# S10 Digital Solutions - Landing Page

A one-page marketing site with editable content (services, testimonials, pricing, portfolio) powered by Next.js App Router and a simple JSON store with Vercel Blob fallback.

## Features
- Responsive, mobile-first layout with Tailwind CSS
- Animated hero orbit with framer-motion
- Admin page to edit content at `/admin`
- API routes:
  - `GET /api/content` – fetch content
  - `POST /api/content` – update content (JSON body)
  - `POST /api/contact` – submit contact form (logs on server)
- SEO meta tags and social previews
- Simple content persistence to `data/content.json`, with optional Vercel Blob storage when deployed

## Local Development
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build
```bash
npm run build && npm start
```

## Deploy to Vercel
- Ensure `VERCEL_TOKEN` is set in your environment.
- Optionally set `CONTENT_BLOB_URL` after first write.

```bash
vercel deploy --prod --yes --token "$VERCEL_TOKEN" --name agentic-7eb5207a
```

## Content Storage
- Local: `data/content.json` (gitignored)
- Vercel Blob: uses `@vercel/blob`. First POST will create a public blob and use its URL for reads during the request lifecycle.

## Accessibility & Analytics
- Semantic headings, labels, and good contrast.
- Add your analytics snippet in `app/layout.tsx` body if needed.
