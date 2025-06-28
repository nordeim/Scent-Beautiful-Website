// lib/config/shop.ts

/**
 * Defines the available sorting options for the product list.
 * Using a constant object ensures type safety and prevents typos,
 * as these values are shared between the client (SortDropdown) and the server (tRPC router).
 */
export const SORT_OPTIONS = {
  LATEST: 'createdAt_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
} as const

// We can infer the type directly from the object for use in other parts of the app
export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]
