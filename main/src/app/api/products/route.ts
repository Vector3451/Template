import { NextResponse } from "next/server";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Classic T-Shirt",
    slug: "classic-t-shirt",
    description: "A comfortable cotton t-shirt for everyday wear.",
    price: 29.99,
    compareAtPrice: 39.99,
    images: [],
    category: { id: "cat-1", name: "Clothing", slug: "clothing" },
    tags: ["cotton", "casual"],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description: "Premium wireless headphones with noise cancellation.",
    price: 149.99,
    images: [],
    category: { id: "cat-2", name: "Electronics", slug: "electronics" },
    tags: ["audio", "wireless"],
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Leather Wallet",
    slug: "leather-wallet",
    description: "Handcrafted leather wallet with multiple card slots.",
    price: 59.99,
    compareAtPrice: 79.99,
    images: [],
    category: { id: "cat-3", name: "Accessories", slug: "accessories" },
    tags: ["leather", "handmade"],
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "4",
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 129.99,
    images: [],
    category: { id: "cat-1", name: "Clothing", slug: "clothing" },
    tags: ["shoes", "sports"],
    rating: 4.6,
    reviewCount: 192,
    inStock: true,
    createdAt: "2024-04-05T00:00:00Z",
  },
  {
    id: "5",
    name: "Smart Watch",
    slug: "smart-watch",
    description: "Feature-packed smart watch with health tracking.",
    price: 249.99,
    images: [],
    category: { id: "cat-2", name: "Electronics", slug: "electronics" },
    tags: ["wearable", "fitness"],
    rating: 4.4,
    reviewCount: 310,
    inStock: false,
    createdAt: "2024-05-20T00:00:00Z",
  },
  {
    id: "6",
    name: "Canvas Backpack",
    slug: "canvas-backpack",
    description: "Durable canvas backpack with padded laptop compartment.",
    price: 79.99,
    images: [],
    category: { id: "cat-3", name: "Accessories", slug: "accessories" },
    tags: ["bags", "travel"],
    rating: 4.7,
    reviewCount: 145,
    inStock: true,
    createdAt: "2024-06-12T00:00:00Z",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: product });
  }

  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();

  let filtered = [...MOCK_PRODUCTS];
  if (category) filtered = filtered.filter((p) => p.category.slug === category);
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    success: true,
    data: {
      items,
      total,
      page,
      pageSize,
      hasMore: start + pageSize < total,
    },
  });
}
