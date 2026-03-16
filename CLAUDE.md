# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npm run lint:fix   # Run ESLint with auto-fix
```

No test runner is configured.

## Architecture

**Stack**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, shadcn/ui, Supabase SSR

**Environment variables** (required in `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Directory layout

```
src/
├── app/
│   ├── (auth)/              # Auth route group: login, signup, confirm-email, confirm (OTP route)
│   ├── actions/auth.tsx     # Server actions: signUp, signIn
│   ├── dashboard/page.tsx   # Dashboard page
│   ├── restaurants/
│   │   └── [restaurantId]/
│   │       └── page.tsx     # Server component; fetches via getRestaurantBySlug(slug)
│   ├── layout.tsx
│   └── page.tsx             # Server component; fetches via getRestaurants() + getLandingStats()
├── components/
│   ├── landing-stats-bar.tsx    # Live stats strip (restaurant count, reviews, public lists) with amber icon tint
│   ├── landing-features.tsx     # 4-card feature grid (Track, Rate, Lists, Share) with font-display titles
│   ├── landing-cta.tsx          # Bottom CTA section with warm-tinted card and signup/login buttons
│   ├── login-form.tsx           # Client component using useActionState
│   ├── logo.tsx                 # Logo component (dined)
│   ├── signup-form.tsx          # Client component using useActionState
│   ├── navbar.tsx               # Sticky top navbar used on the landing page
│   ├── restaurant-card.tsx      # Restaurant card with star rating, price range, and accessibility icon
│   ├── restaurant-carousel.tsx  # Client component; wraps Carousel + embla-carousel-auto-scroll
│   ├── star-rating.tsx          # Shared StarRating component; accepts size prop ("sm"=size-4, "lg"=size-5)
│   └── ui/                      # shadcn/ui components (button, card, input, field, label, alert, separator, carousel)
├── lib/
│   ├── definitions.ts   # Zod schemas, form types, and DB types (Restaurant, RestaurantSummary, RestaurantDetail, etc.)
│   ├── queries.ts       # Supabase query helpers: getRestaurants(), getRestaurantBySlug(slug)
│   ├── utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── supabase/
│       ├── server.ts    # Server-side Supabase client (cookie-based)
│       ├── client.ts    # Browser-side Supabase client
│       └── proxy.ts     # Session refresh helper used by middleware
└── styles/globals.css   # Tailwind CSS + CSS variable theme tokens
proxy.ts                 # Next.js middleware: refreshes Supabase session on every request
supabase/
├── config.toml
└── migrations/
    ├── 001_restaurants.sql           # restaurants table
    ├── 002_restaurant_images.sql     # restaurant_images table
    ├── 003_reviews_lists.sql         # reviews, lists, list_items tables
    ├── 004_restaurant_stats_view.sql # restaurant_stats view (avg_rating, review_count)
    ├── 005_rls.sql                   # Row Level Security policies
    ├── 006_seed.sql                  # Initial seed data
    └── 007_seed_more.sql             # Additional seed data
```

### Key patterns

**Forms**: Use React 19's `useActionState` hook wired to server actions in `app/actions/auth.tsx`. The action state carries `{ error, inputs }` so form fields can be repopulated on validation failure (`state?.inputs?.fieldName`).

**Validation**: Zod schemas are defined in `lib/definitions.ts` and run server-side inside the server actions before any Supabase call.

**Auth flow**:

1. Signup → Supabase sends verification email → `/confirm-email` placeholder
2. Email link → `/confirm` route handler verifies OTP → redirects to next URL or dashboard
3. Middleware (`proxy.ts` at repo root) refreshes Supabase session cookies on every request

**Supabase clients**: Always use `lib/supabase/server.ts` in Server Components and Server Actions; use `lib/supabase/client.ts` only in Client Components.

**Styling**: Tailwind CSS 4 with CSS variable-based theming. Use the `cn()` utility for conditional class merging. Component variants are managed with `class-variance-authority` (CVA). Dark mode is toggled via the `.dark` class.

**Typography**: Playfair Display SC is loaded as `--font-playfair-display-sc` (via `next/font/google`) and exposed as `--font-display` in `@theme inline`. Apply with the `.font-display` utility class or `font-display` Tailwind class. Use it for headings, section titles, and card names.

**shadcn/ui**: Configured with the Radix Nova style and `@/` path aliases (see `components.json`). Add new components via `npx shadcn@latest add <component>`.

### Data layer

**Query helpers** (`lib/queries.ts`):

- `getRestaurants()` — fetches all restaurants joined with `restaurant_stats` view; returns `RestaurantSummary[]`
- `getRestaurantBySlug(slug)` — fetches a single restaurant with its images and stats; returns `RestaurantDetail | null`
- `getLandingStats()` — parallel count queries for restaurants, reviews, and public lists; returns `LandingStats`

**DB types** (`lib/definitions.ts`): `Restaurant`, `RestaurantImage`, `Review`, `RestaurantStats`, `List`, `ListItem`, `RestaurantSummary` (flat card shape), `RestaurantDetail` (extends `Restaurant` with `images`, `avg_rating`, `review_count`).

**RLS**: Public read access is granted to `/` and `/restaurants/**` routes via `005_rls.sql`. All other data requires auth.

### Current state

The `signIn` server action in `app/actions/auth.tsx` is an empty stub — password login is not yet implemented.

The landing page (`app/page.tsx`) is a Server Component with a full redesigned structure:
1. **Hero** — `font-display` h1, tagline, Get Started + Sign In CTA buttons
2. **`<LandingStatsBar>`** — live counts from Supabase (restaurants, reviews, public lists)
3. **`<LandingFeatures>`** — 4-card grid with warm icon containers
4. **Restaurant carousel section** — `<RestaurantCarousel>` with section heading; uses `embla-carousel-auto-scroll`
5. **`<LandingCta>`** — warm-tinted rounded card with signup/login buttons
6. **Footer** — in-flow (not absolute), brand tagline + nav links

Restaurant detail pages (`app/restaurants/[restaurantId]/page.tsx`) are Server Components that call `getRestaurantBySlug(slug)` and call `notFound()` on missing slugs. They display a map placeholder, restaurant info (`StarRating` with `size="lg"`, review count, price range, type, address, description), and an image carousel sourced from `restaurant.images`.

### frontend

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
