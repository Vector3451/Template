import type { ApiResponse } from "@/types";
export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  if (!res.ok) { const error = await res.text().catch(() => res.statusText); throw new Error(`${res.status}: ${error}`); }
  return res.json() as Promise<T>;
}
export async function post<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
  return fetcher<ApiResponse<T>>(url, { method: "POST", body: JSON.stringify(body) });
}
