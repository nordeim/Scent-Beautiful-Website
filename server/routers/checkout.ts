// server/routers/checkout.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc' // Can use protectedProcedure if login is required
import { stripe } from '@/lib/payments/stripe'
import { TRPCError } from '@trpc/server'

export const checkoutRouter = router({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        // The cart details are now passed from the client
        cartDetails: z.string(), // A JSON string of the cart items
        userId: z.string().optional(), // Optional user ID for logged-in users
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const cartItems = JSON.parse(input.cartDetails)
        const amount = cartItems.reduce(
          (total: number, item: any) =>
            total + Number(item.variant.price) * item.quantity,
          0,
        )

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Stripe expects the amount in cents
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
          // Embed cart and user info for the webhook
          metadata: {
            cartDetails: input.cartDetails,
            userId: input.userId || 'guest',
          },
        })

        if (!paymentIntent.client_secret) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create payment intent.',
          })
        }

        return {
          clientSecret: paymentIntent.client_secret,
        }
      } catch (error) {
        console.error('Stripe Payment Intent Error:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not create a payment session.',
        })
      }
    }),
})
