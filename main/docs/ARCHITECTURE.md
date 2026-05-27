# Architecture

## Overview
E-commerce store template — product catalog, shopping cart, and checkout flow. Ready for hackathon customization.

## Key Design Decisions
- **App Router** (not Pages Router) — Server Components by default
- **Named exports only** on components — easier to refactor
- **All env access via `src/lib/config.ts`** — fail fast on bad config
- **API calls go through `src/lib/api/`** — not raw fetch in components
- **Cart state via Zustand** — persisted to localStorage, accessible anywhere
- **Checkout is Stripe-ready** — swap the mock route for real Stripe sessions

## Data Flow
```
User action
  → Component (server or client)
  → src/lib/api/ fetcher helper
  → /api/ route handler
  → Database / external service
  → ApiResponse<T> back up the chain
```

## Pages
| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage / landing |
| `/products` | `src/app/products/page.tsx` | Product catalog |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | Product detail |
| `/checkout` | `src/app/checkout/page.tsx` | Checkout / order review |

## Endpoints
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/products` | List/search products (paginated) |
| GET | `/api/products?slug=` | Get single product by slug |
| POST | `/api/checkout` | Create checkout session |
| GET | `/api/health` | Health check |

## Store (Zustand)
| Store | File | Purpose |
|---|---|---|
| `useCartStore` | `src/lib/store/cart.ts` | Cart items, open/close, add/remove/update |

## Adding shadcn/ui components
```bash
npx shadcn-ui@latest add button card input
# → drops into src/components/ui/ automatically
```

## Change Log
| Date | Change | Why |
|---|---|---|
| (start) | Initial scaffold | Baseline |
| (e-commerce) | Added products, cart, checkout, types, store | E-commerce template |
