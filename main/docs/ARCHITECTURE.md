# Architecture

## Overview
[Brief description of what this app does]

## Key Design Decisions
- **App Router** (not Pages Router) — Server Components by default
- **Named exports only** on components — easier to refactor
- **All env access via `src/lib/config.ts`** — fail fast on bad config
- **API calls go through `src/lib/api/`** — not raw fetch in components

## Data Flow
```
User action
  → Component (server or client)
  → src/lib/api/ fetcher helper
  → /api/ route handler
  → Database / external service
  → ApiResponse<T> back up the chain
```

## Adding shadcn/ui components
```bash
npx shadcn-ui@latest add button card input
# → drops into src/components/ui/ automatically
```

## Change Log
<!-- Append an entry whenever something structural changes. Newest first. -->

| Date | Change | Why |
|---|---|---|
| (start) | Initial scaffold | Baseline |