# Serendipity Observatory (Next.js)

This directory houses the Serendipity Observatory web app: an aurora-lit surprise generator that rotates whimsical quests, rituals, and cosmic breadcrumbs.

## Development

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` and start exploring. Edits in `src/` hot reload automatically.

## Production Build

```bash
npm run build
npm start
```

## Key Paths

- `src/app/page.tsx` – Page layout and narrative sections.
- `src/components/SurpriseDeck.tsx` – Interactive surprise generator.
- `src/components/StellarCanvas.tsx` – Animated backdrop responding to pointer drift.
- `src/app/page.module.css` – Aurora-driven styling and layout.

## Deployment

Optimized for Vercel. Run `vercel deploy --prod` from this directory (token required).
