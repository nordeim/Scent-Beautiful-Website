import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@/lib/db/client'
import type { Context } from '../context'

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }: { ctx: Context }) => {
    return ctx.session?.user
  }),
})
