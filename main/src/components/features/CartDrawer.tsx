"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQuantity, subtotal, itemCount } =
    useCartStore();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={close}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-background shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold">
              Cart {itemCount > 0 && `(${itemCount})`}
            </span>
          </div>
          <button
            onClick={close}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add some products to get started.
            </p>
            <Link
              href="/products"
              onClick={close}
              className="mt-4 rounded-md bg-foreground px-6 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4 py-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        "No image"
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="rounded-md border p-1 transition-colors hover:bg-muted"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="rounded-md border p-1 transition-colors hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t px-4 py-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 flex w-full items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
