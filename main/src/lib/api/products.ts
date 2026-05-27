import { fetcher } from "./fetcher";
import type { ApiResponse, PaginatedResult, Product } from "@/types";

export async function getProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}): Promise<ApiResponse<PaginatedResult<Product>>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params?.category) searchParams.set("category", params.category);
  if (params?.search) searchParams.set("search", params.search);
  const qs = searchParams.toString();
  return fetcher(`/api/products${qs ? `?${qs}` : ""}`);
}

export async function getProductBySlug(
  slug: string,
): Promise<ApiResponse<Product>> {
  return fetcher(`/api/products?slug=${encodeURIComponent(slug)}`);
}
