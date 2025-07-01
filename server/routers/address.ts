// server/routers/address.ts
import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { addressSchema } from '@/lib/validation/schemas' // We'll create this schema

export const addressRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx
    return prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { isDefault: 'desc' },
    })
  }),

  upsert: protectedProcedure
    .input(addressSchema) // Use a Zod schema for validation
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx
      const { id, isDefault, ...data } = input

      // If this address is being set as default, ensure no others are.
      if (isDefault) {
        await prisma.address.updateMany({
          where: { userId: session.user.id, isDefault: true },
          data: { isDefault: false },
        })
      }

      return prisma.address.upsert({
        where: { id: id || '' }, // `upsert` needs a unique where, if id is missing it will fail and go to create
        create: {
          ...data,
          isDefault: isDefault || false,
          user: { connect: { id: session.user.id } },
        },
        update: {
          ...data,
          isDefault: isDefault || false,
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx
      const addressToDelete = await prisma.address.findFirst({
        where: { id: input.id, userId: session.user.id },
      })

      if (!addressToDelete) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Address not found.' })
      }

      await prisma.address.delete({ where: { id: input.id } })
      return { success: true }
    }),
})
