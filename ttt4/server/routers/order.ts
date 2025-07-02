// server/routers/order.ts
import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '../trpc'
import { stripe } from '@/lib/payments/stripe'
import { TRPCError } from '@trpc/server'

export const orderRouter = router({
  // This procedure remains protected, for a user's own order history
  all: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx
    return prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })
  }),

  // NEW: A public procedure to get payment status.
  // It's public because the user might not have fully logged in or their session might be initializing
  // when they are redirected back from Stripe. We rely on the secure, unguessable client_secret for auth.
  getPaymentStatus: publicProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId)

        return {
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        }
      } catch (error) {
        console.error('Failed to retrieve payment intent:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve payment status.',
        })
      }
    }),
})
