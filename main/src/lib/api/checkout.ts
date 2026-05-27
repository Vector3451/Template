import { post } from "./fetcher";
import type { ApiResponse, CheckoutSession, CartItem } from "@/types";

export async function createCheckoutSession(
  items: CartItem[],
): Promise<ApiResponse<CheckoutSession>> {
  return post("/api/checkout", { items });
}
