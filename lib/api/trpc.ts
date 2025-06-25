// lib/api/trpc.ts
import { createTRPCReact } from '@trpc/react-query'
import { type AppRouter } from '@/server/routers'
import { httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

/**
 * A set of typesafe hooks for consuming your tRPC API.
 */
export const api = createTRPCReact<AppRouter>()

/**
 * A tRPC client that can be used to call the API from the server.
 */
export const serverApi = api.createClient({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  ],
})
