// server/routers/newsletter.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { newsletterSchema } from '@/lib/validation/schemas'
import { TRPCError } from '@trpc/server'

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(newsletterSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input

      const existingSubscription = await ctx.prisma.emailSubscription.findUnique({
        where: { email },
      })

      if (existingSubscription) {
        if (existingSubscription.isActive) {
          // You can choose to throw an error or just return a success message
          return { message: 'You are already subscribed!' }
        }
        // If they were inactive, re-activate them
        await ctx.prisma.emailSubscription.update({
          where: { email },
          data: { isActive: true },
        })
        return { message: 'Welcome back! You have been re-subscribed.' }
      }

      // Create new subscription
      await ctx.prisma.emailSubscription.create({
        data: {
          email,
          isActive: true,
        },
      })

      return { message: 'Thank you for subscribing!' }
    }),
})
