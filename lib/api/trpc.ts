// lib/api/trpc.ts
import { createTRPCReact } from '@trpc/react-query'
import { type AppRouter } from '@/server/routers'

/**
 * A set of typesafe hooks for consuming your tRPC API from Client Components.
 */
export const api = createTRPCReact<AppRouter>()
