import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/products"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
