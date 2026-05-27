"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils/cn";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="aspect-square overflow-hidden bg-muted">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-sm">No image</span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs text-muted-foreground">{product.category.name}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium leading-tight">{product.name}</h3>
        </Link>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className={cn(
              "rounded-md p-2 transition-colors",
              product.inStock
                ? "bg-foreground text-background hover:opacity-90"
                : "cursor-not-allowed bg-muted text-muted-foreground",
            )}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
