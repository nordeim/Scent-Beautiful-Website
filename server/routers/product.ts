import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@/lib/db/client'
import type { inferAsyncReturnType } from '@trpc/server'
import type { Context } from '../context'

export const productRouter = router({
  all: publicProcedure.query(async () => {
    return prisma.product.findMany({ include: { variants: true, images: true } })
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input }: { input: string }) => {
    return prisma.product.findUnique({ where: { id: input }, include: { variants: true, images: true } })
  }),
})
