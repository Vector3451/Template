"use client";

import { useCartStore } from "@/lib/store/cart";
import { createCheckoutSession } from "@/lib/api/checkout";
import Link from "next/link";
import { useState } from "react";

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await createCheckoutSession(items);
      if (res.success) {
        clearCart();
        window.location.href = res.data.url;
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium">Your cart is empty</p>
        <Link
          href="/products"
          className="mt-4 rounded-md bg-foreground px-6 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="divide-y rounded-lg border">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity} &times; ${item.product.price.toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>${subtotal().toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Place order"}
      </button>
    </div>
  );
}
