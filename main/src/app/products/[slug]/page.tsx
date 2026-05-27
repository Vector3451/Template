import { Shell } from "@/components/layout/Shell";
import { ProductDetail } from "./ProductDetail";

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps) {
  return { title: `${params.slug} — Store`, description: `View product details.` };
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Shell variant="wide" className="py-8">
      <ProductDetail slug={params.slug} />
    </Shell>
  );
}
