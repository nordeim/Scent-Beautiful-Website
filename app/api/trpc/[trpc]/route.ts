import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'
import { createNextApiHandler } from '@trpc/server/adapters/next'

export default createNextApiHandler({
  router: appRouter,
  createContext,
})
