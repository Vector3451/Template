# Architecture

## Overview
Hackathon starter template with e-commerce features, Google OAuth, PostgreSQL, and real-time notifications. Built for rapid customization.

## Key Design Decisions
- **App Router** (not Pages Router) -- Server Components by default
- **Named exports only** on components -- easier to refactor
- **All env access via `src/lib/config.ts`** -- fail fast on bad config
- **API calls go through `src/lib/api/`** -- not raw fetch in components
- **Cart state via Zustand** -- persisted to localStorage, accessible anywhere
- **Prisma 7 + Prisma Postgres** -- managed PostgreSQL, no local DB needed
- **NextAuth v4 with JWT sessions** -- Google OAuth, no session DB table

## Data Flow
```
User action
  -> Component (server or client)
  -> src/lib/api/ fetcher helper
  -> /api/ route handler
  -> Prisma (src/lib/prisma.ts) -- server-side only
  -> Database (Prisma Postgres)
  -> ApiResponse<T> back up the chain
```

## Authentication Flow
```
User clicks "Sign in"
  -> signIn("google", { callbackUrl: "/" })
  -> Google OAuth consent screen
  -> Callback: /api/auth/callback/google
  -> NextAuth creates JWT session with user.email, user.id (Google sub)
  -> SessionProvider exposes session to client components via useSession()
  -> getServerSession(authOptions) for server components
```

## Pages
| Route | File | Auth | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Public | Homepage |
| `/products` | `src/app/products/page.tsx` | Public | Product catalog |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | Public | Product detail |
| `/checkout` | `src/app/checkout/page.tsx` | Public* | Checkout / order review |
| `/login` | `src/app/login/page.tsx` | Public | Login page |
| `/account` | `src/app/account/page.tsx` | Protected | Profile + orders |

*Checkout should be protected in production; left open for template.

## Endpoints
| Method | Route | Purpose |
|---|---|---|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |
| GET | `/api/products` | List/search products (paginated) |
| GET | `/api/products?slug=` | Get single product by slug |
| POST | `/api/checkout` | Create checkout session |
| GET | `/api/health` | Health check |

## Database (Prisma)
| Model | Purpose |
|---|---|
| User | Google-authenticated users, linked to orders |
| Category | Product categories |
| Product | Items for sale (linked to Category) |
| Order | User orders with status tracking |
| OrderItem | Line items per order (snapshot of product at order time) |

## Store (Zustand)
| Store | File | Purpose |
|---|---|---|
| `useCartStore` | `src/lib/store/cart.ts` | Cart items, open/close, add/remove/update |
| `useToastStore` | `src/lib/store/toast.ts` | Toast notifications, auto-dismiss 4s |

## Adding shadcn/ui components
```bash
npx shadcn-ui@latest add button card input
# --> drops into src/components/ui/ automatically
```

## Change Log
| Date | Change | Why |
|---|---|---|
| (start) | Initial scaffold | Baseline |
| (e-commerce) | Added products, cart, checkout, types, store | E-commerce template |
| (auth+db) | Google OAuth, Prisma Postgres, toasts, protected routes, setup script | Full hackathon starter |
