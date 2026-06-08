#!/usr/bin/env bash
# One-command setup for the hackathon template.
# Run from the project root: bash scripts/setup.sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# ── 1. Install dependencies ──────────────────────────────────────────────────
echo ""
echo "==> Installing dependencies..."
npm install

# ── 2. Environment file ─────────────────────────────────────────────────────
echo ""
echo "==> Setting up environment..."
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "  Created .env.local from .env.example"
  echo "  IMPORTANT: Fill in .env.local with your real values:"
  echo "    - GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET (from Google Cloud Console)"
  echo "    - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
  echo "    - STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (from Stripe dashboard)"
else
  echo "  .env.local already exists -- skipping"
fi

# ── 3. Prisma: generate client + migrate + seed ─────────────────────────────
echo ""
echo "==> Setting up Prisma..."
if [ -f prisma/schema.prisma ]; then
  npx prisma generate
  echo "  Prisma Client generated"

  # Try to migrate -- skip if no DATABASE_URL or if Prisma DB isn't linked yet
  if grep -q "^DATABASE_URL=.*db\.prisma\.io" .env.local 2>/dev/null; then
    npx prisma migrate dev --name init 2>/dev/null || echo "  Migrations already applied"
    npx prisma db seed 2>/dev/null || echo "  Seed already run"
    echo "  Prisma DB ready"
  else
    echo "  No DATABASE_URL found -- run 'npx prisma postgres link' to connect your DB"
    echo "  Then run: npx prisma migrate dev && npx prisma db seed"
  fi
else
  echo "  No prisma/schema.prisma found -- skipping"
fi

# ── 4. Done ──────────────────────────────────────────────────────────────────
echo ""
echo "==> Setup complete!"
echo ""
echo "  Next steps:"
echo "    1. Fill in .env.local with your real credentials"
echo "    2. Run 'npm run dev' to start the development server"
echo "    3. Visit http://localhost:3000"
echo "    4. (Optional) Run 'npx prisma studio' to browse your database"
echo ""
