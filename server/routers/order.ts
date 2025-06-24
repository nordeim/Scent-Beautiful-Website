import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@/lib/db/client'
import type { Context } from '../context'

export const orderRouter = router({
  all: protectedProcedure.query(async ({ ctx }: { ctx: Context }) => {
    const userId = ctx.session?.user?.id
    if (!userId) throw new Error('Unauthorized')
    return prisma.order.findMany({ where: { userId } })
  }),
})
