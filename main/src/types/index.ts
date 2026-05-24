/**
 * types/index.ts — Shared TypeScript types.
 * Domain types go here. Component-specific props stay co-located.
 */

/** Standard API response envelope */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/** Paginated list result */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Add your domain types below:
// export interface User { id: string; name: string; email: string; }
