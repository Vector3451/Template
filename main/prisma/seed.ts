import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed categories
  const clothing = await prisma.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: { name: "Clothing", slug: "clothing" },
  });

  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: { name: "Electronics", slug: "electronics" },
  });

  const accessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: { name: "Accessories", slug: "accessories" },
  });

  // Seed products
  const products = [
    {
      name: "Classic T-Shirt",
      slug: "classic-t-shirt",
      description: "A comfortable cotton t-shirt for everyday wear.",
      price: 29.99,
      compareAtPrice: 39.99,
      tags: ["cotton", "casual"],
      rating: 4.5,
      reviewCount: 128,
      categoryId: clothing.id,
    },
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Premium wireless headphones with noise cancellation.",
      price: 149.99,
      tags: ["audio", "wireless"],
      rating: 4.8,
      reviewCount: 256,
      categoryId: electronics.id,
    },
    {
      name: "Leather Wallet",
      slug: "leather-wallet",
      description: "Handcrafted leather wallet with multiple card slots.",
      price: 59.99,
      compareAtPrice: 79.99,
      tags: ["leather", "handmade"],
      rating: 4.3,
      reviewCount: 89,
      categoryId: accessories.id,
    },
    {
      name: "Running Shoes",
      slug: "running-shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 129.99,
      tags: ["shoes", "sports"],
      rating: 4.6,
      reviewCount: 192,
      categoryId: clothing.id,
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Feature-packed smart watch with health tracking.",
      price: 249.99,
      tags: ["wearable", "fitness"],
      rating: 4.4,
      reviewCount: 310,
      inStock: false,
      categoryId: electronics.id,
    },
    {
      name: "Canvas Backpack",
      slug: "canvas-backpack",
      description: "Durable canvas backpack with padded laptop compartment.",
      price: 79.99,
      tags: ["bags", "travel"],
      rating: 4.7,
      reviewCount: 145,
      categoryId: accessories.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products in 3 categories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
