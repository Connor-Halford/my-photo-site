# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run generate-photos  # Add new photos to app/data/photos.ts (see below)
```

No test suite exists in this project.

## Architecture

This is a Next.js 16 App Router photo portfolio site with three main pages:

- **`/`** (`app/page.tsx`) — Full-screen landing with background image and nav links
- **`/gallery`** (`app/gallery/page.tsx`) — `'use client'` page; filterable photo grid using `react-photo-album` with a custom lightbox
- **`/map`** (`app/map/page.tsx`) — `'use client'` page; Mapbox GL globe with photo pins, clustering via `supercluster`, and a lightbox
- **`/about`** (`app/about/page.tsx`) — Static about page

### Photo data flow

All photo metadata lives in `app/data/photos.ts` as a typed `Photo[]` array. Both gallery and map pages import this array directly at build time — there is no API or database.

The `Photo` type includes: `id`, `src` (path under `/public/images/`), `width`, `height`, `location`, `date` (format `YYYY-MM`), `tags`, `caption`, `lat`, `lng`.

### Adding new photos

1. Place web-optimized JPEGs in `public/images/`
2. Run `npm run generate-photos` — this reads EXIF data, reverse-geocodes coordinates via Nominatim (free, no API key), guesses tags from location name, and appends new entries to `app/data/photos.ts`
3. Search for `// TODO` in `photos.ts` to review auto-generated captions, tags, and coordinates

The script skips files whose derived ID already exists in `photos.ts`, so it's safe to re-run.

### Environment variables

The map page requires `NEXT_PUBLIC_MAPBOX_TOKEN` — set this in `.env.local`.

### Styling

Tailwind CSS v4 with no custom config file (configured via PostCSS). The global stylesheet is `app/globals.css`. Images are served unoptimized (`next.config.mjs` sets `images.unoptimized: true`).
