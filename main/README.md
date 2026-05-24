# Project Name

> One sentence about what this does.

## Quick Start

```bash
cp .env.example .env.local   # fill in your secrets
npm install
npm run dev                   # http://localhost:3000
```

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Vitest** for tests

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint + type check |
| `npm run test` | Run tests |

## Project Structure

See `AGENT.md` for the full directory map and coding conventions.
See `docs/ARCHITECTURE.md` for system design decisions.

## Adding shadcn/ui components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc — components go into src/components/ui/ automatically
```