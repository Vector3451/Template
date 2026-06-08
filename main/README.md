# Hackathon Starter

> Full-stack e-commerce template with auth, database, and notifications — ready to customize.

## Quick Start

```bash
cp .env.example .env.local   # fill in secrets (see below)
npm install
npm run dev                   # http://localhost:3000
```

Or use the one-command setup:

```bash
bash scripts/setup.sh
```

## What's Included

| Feature | Status |
|---|---|
| Google OAuth (NextAuth v4) | Done |
| PostgreSQL via Prisma 7 | Done |
| Protected routes (`/account`) | Done |
| Toast notifications | Done |
| Product catalog + cart + checkout | Done |
| Stripe-ready payment flow | Needs your keys |

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Prisma 7** + **Prisma Postgres** (PostgreSQL)
- **NextAuth v4** (Google OAuth)
- **Zustand** (cart + toast state)
- **Vitest** for tests

## Environment Variables

| Variable | Required | How to get it |
|---|---|---|
| `GOOGLE_CLIENT_ID` | Yes | Google Cloud Console > Credentials > OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Same as above |
| `NEXTAUTH_SECRET` | Yes | Run `openssl rand -base64 32` |
| `DATABASE_URL` | Yes (with Prisma) | Run `npx prisma postgres link --database "your-id"` |
| `STRIPE_SECRET_KEY` | For payments | Stripe Dashboard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Same as above |

**Google OAuth setup:**
1. Go to https://console.cloud.google.com > APIs & Services > Credentials
2. Create OAuth Client ID (Web application)
3. Add redirect URIs: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID + Secret into `.env.local`

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint + type check |
| `npm run test` | Run tests |
| `npx prisma generate` | Regenerate Prisma Client |
| `npx prisma migrate dev` | Run DB migrations |
| `npx prisma db seed` | Seed database |
| `npx prisma studio` | Browse database |

## Using Toasts

```typescript
import { toast } from "@/lib/store/toast";

toast.success("Order placed!");
toast.error("Something went wrong");
toast.info("Loading...");
```

## Auth in Server Components

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
// session.user.email, session.user.name, session.user.image
```

## Using the Database (Prisma)

```typescript
import prisma from "@/lib/prisma";

// Read
const products = await prisma.product.findMany({ include: { category: true } });

// Write
const order = await prisma.order.create({ data: { ... } });
```

Never import `prisma` into client components — only use it in server components, API routes, or scripts.

## Project Structure

```
main/
├── prisma/
│   ├── schema.prisma          # Data models
│   ├── seed.ts                # Seed data
│   └── migrations/            # DB migrations
├── scripts/
│   ├── setup.sh               # One-command setup
│   └── verify-prisma.ts       # DB connection test
├── src/
│   ├── app/
│   │   ├── account/           # Protected route example
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── checkout/      # Stripe checkout
│   │   │   ├── products/      # Product API
│   │   │   └── health/        # Health check
│   │   ├── checkout/          # Checkout page
│   │   ├── login/             # Login page
│   │   └── products/          # Product catalog
│   ├── components/
│   │   ├── auth/              # Session provider
│   │   ├── features/          # Cart, ProductCard
│   │   ├── layout/            # Header, Footer, Shell
│   │   └── ui/                # Toaster, shadcn
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config + exports
│   │   ├── config.ts          # Env config
│   │   ├── prisma.ts          # PrismaClient singleton
│   │   ├── store/             # Zustand stores (cart, toast)
│   │   └── utils/             # Helpers
│   └── types/                 # Shared types
└── docs/ARCHITECTURE.md       # System design
