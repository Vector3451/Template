import { Shell } from "@/components/layout/Shell";
import { CheckoutForm } from "./CheckoutForm";

export const metadata = {
  title: "Checkout — Store",
  description: "Complete your purchase.",
};

export default function CheckoutPage() {
  return (
    <Shell variant="narrow" className="py-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <CheckoutForm />
    </Shell>
  );
}
