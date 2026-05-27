import Link from "next/link";
import { Shell } from "@/components/layout/Shell";

export default function HomePage() {
  return (
    <Shell variant="wide">
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Welcome to the Store
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Discover our curated collection of products. Start browsing and find
          something you love.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/products"
            className="rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <h2 className="text-2xl font-bold">Featured categories</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg border bg-muted p-6 transition-shadow hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

const categories = [
  { name: "Clothing", slug: "clothing", count: 2 },
  { name: "Electronics", slug: "electronics", count: 2 },
  { name: "Accessories", slug: "accessories", count: 2 },
];
