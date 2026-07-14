# Aeris — Premium Product Showcase

A production-ready, non-ecommerce product showcase for a fictional ergonomic-furniture brand, **Aeris**. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Framer Motion. Every product uses an **Enquire Now** flow (animated modal contact form) instead of cart/checkout.

## Tech stack

- **Next.js 15** (App Router, Server Components, SSG)
- **TypeScript** (strict)
- **Tailwind CSS** + custom design tokens
- **Framer Motion** (reveal, parallax, stagger, carousel, modal)
- **React Hook Form** + **Zod** (validated forms)
- **Lucide React** (icons)
- shadcn-style hand-rolled UI primitives

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Note: the first `npm run dev` / `npm run build` fetches two Google Fonts
> (Inter + Space Grotesk) via `next/font`. An internet connection is required
> the first time so Next.js can self-host them.

## Pages

- `/` — Home: hero, categories, featured products, why-choose, showcase (parallax), stats (animated counters), process, testimonials (carousel), FAQ, CTA.
- `/products` — grid with category tabs, live search, sorting, animated filtering.
- `/products/[slug]` — premium detail page: gallery with hover-zoom + thumbnails, overview, features, benefits, specs, dimensions, materials, warranty, care, downloads, video placeholder, FAQs, related products, sticky/floating enquiry.
- `/about` — story, mission, vision, values, timeline, achievements.
- `/contact` — info cards, hours, map placeholder, validated contact form.

## Notes / placeholders

- **No backend.** Enquiry and contact submissions are simulated (1.1s) and logged to the console, then show a success animation.
- **Product imagery** is original generated SVG (`ProductRender`) — no third-party or brand assets are used. The gallery "angles" are SVG variants.
- **Video, brochure downloads and the map** are intentional placeholders (no external services wired up).
- Product data is mock JSON in `constants/products.ts`.

## Structure

```
app/            routes, layout, sitemap, robots, not-found, loading
components/
  ui/           button, input, textarea, label, badge, slot
  layout/       Navbar (mega-menu), Footer
  common/       modal, provider, gallery helpers, accordion, reveal, etc.
  home/         home sections
  products/     ProductCard, ProductsView, ProductGallery, StickyEnquiry
constants/      site, categories, products
lib/            utils, motion variants, zod schemas
types/          shared types
```

## SEO

Metadata API on every route, Open Graph + Twitter cards, canonical URLs,
`sitemap.xml`, `robots.txt`, and JSON-LD (Organization + per-product Product).
