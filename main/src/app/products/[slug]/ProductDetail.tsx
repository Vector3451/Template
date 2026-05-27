"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/api/products";
import { useCartStore } from "@/lib/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";

interface ProductDetailProps {
  slug: string;
}

export function ProductDetail({ slug }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProductBySlug(slug)
      .then((res) => {
        if (res.success) setProduct(res.data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-lg bg-muted" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-medium">Product not found</p>
        <Link
          href="/products"
          className="mt-4 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <span className="text-muted-foreground">No image available</span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm text-muted-foreground">{product.category.name}</p>
        <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rating:</span>
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="mt-8 flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </div>
  );
}
