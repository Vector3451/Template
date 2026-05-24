## Important
> AGENT RULE: This file is a living document.
> Read it fully at the start of every session.
> Update it at the end of every session.
> A stale AGENT.md is worse than no AGENT.md.

## What is this?
[PROJECT NAME] — [one sentence: what it does and who it's for].
For a hackathon. Move fast. Ship working features.

## Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: (fill in: Postgres / SQLite / Supabase / none)
- **Auth**: (fill in: NextAuth / Clerk / none)
- **Deployment**: Vercel

## Directory Map
<!-- Keep this file updated. When you add a file to this directory, add a one-line entry below. -->
```
src/app/             → Next.js pages & API routes (App Router)
src/components/ui/   → shadcn/ui primitives (DO NOT edit)
src/components/layout/  → header, footer, nav, shell wrappers
src/components/features/  → feature-specific components
src/lib/utils/       → pure utility functions (no side effects)
src/lib/hooks/       → custom React hooks
src/lib/api/         → server-side data fetching & mutations
src/types/           → shared TypeScript types & interfaces
public/              → static assets (images, fonts, icons)
tools/               → one-off scripts (migrations, seeding, etc.)
docs/                → specs, wireframes, ADRs
```

## Commands
```bash
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run lint         # ESLint + TypeScript check
npm run test         # run tests
```

## Adding a New Feature
1. Types → `src/types/index.ts`
2. API route → `src/app/api/<feature>/route.ts`
3. Fetcher → `src/lib/api/<feature>.ts`
4. Components → `src/components/features/<Feature>/`
5. Page → `src/app/<feature>/page.tsx`

## Coding Rules
- TypeScript strict mode — no `any`, no `// @ts-ignore`
- Functional components only — no class components
- Named exports only — no default exports (except page.tsx files)
- Co-locate tests: `Button.test.tsx` next to `Button.tsx`
- Server Components by default; add `"use client"` only when needed
- Env vars: access only via `src/lib/config.ts` — never inline `process.env`
- Error handling: never swallow errors silently — log or surface them

## Conventions
<!-- Keep these updated. Only remove entries if a convention is obsoleted. -->
- Components: PascalCase (`UserCard.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Utils: camelCase (`formatDate.ts`)
- API routes: kebab-case files (`/api/user-profile/route.ts`)
- Types/interfaces: PascalCase with descriptive names (`UserProfile`, not `IUser`)

## Never Do
- Never commit `.env` or `.env.local`
- Never edit files in `src/components/ui/` (shadcn — regenerate instead)
- Never use `fetch` directly in components — go through `src/lib/api/`
- Never store secrets in code — use environment variables

## Maintenance Contract
<!-- This section is non-negotiable. Follow it every session. -->

After completing ANY task, you must update documentation before finishing:

- New route or API endpoint → add it to docs/ARCHITECTURE.md under "Endpoints"
- New component or hook → add a one-line description to the relevant directory AGENT.md
- New env variable → add it to .env.example with a comment
- New npm package → note why it was added under "Stack" in this file
- Architectural decision made → add an ADR to docs/decisions/
- Convention changed or added → update "Coding Rules" in this file

If you skip this, the next session starts with a broken map.
Do not mark a task done until docs are updated.