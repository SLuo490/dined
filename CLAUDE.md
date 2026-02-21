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
│   ├── (auth)/          # Auth route group: login, signup, confirm-email, confirm (OTP route)
│   ├── actions/auth.tsx  # Server actions: signUp, signIn
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── login-form.tsx    # Client component using useActionState
│   ├── signup-form.tsx   # Client component using useActionState
│   └── ui/              # shadcn/ui components (button, card, input, field, label, alert, separator)
├── lib/
│   ├── definitions.ts   # Zod schemas and TypeScript types
│   ├── utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── supabase/
│       ├── server.ts    # Server-side Supabase client (cookie-based)
│       ├── client.ts    # Browser-side Supabase client
│       └── proxy.ts     # Session refresh helper used by middleware
└── styles/globals.css   # Tailwind CSS + CSS variable theme tokens
proxy.ts                 # Next.js middleware: refreshes Supabase session on every request
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

**shadcn/ui**: Configured with the Radix Nova style and `@/` path aliases (see `components.json`). Add new components via `npx shadcn@latest add <component>`.

### Current state

The `signIn` server action in `app/actions/auth.tsx` is an empty stub — password login is not yet implemented.
