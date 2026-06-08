import prisma from "../src/lib/prisma";

async function main() {
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  console.log(`✅ Connected — ${productCount} products, ${categoryCount} categories`);
}

main()
  .catch((e) => {
    console.error("❌", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
