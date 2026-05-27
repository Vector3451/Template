import { Shell } from "@/components/layout/Shell";
import { ProductsGrid } from "./ProductsGrid";

export const metadata = {
  title: "Products — Store",
  description: "Browse our full product catalog.",
};

export default function ProductsPage() {
  return (
    <Shell variant="wide" className="py-8">
      <h1 className="text-3xl font-bold">All Products</h1>
      <ProductsGrid />
    </Shell>
  );
}
