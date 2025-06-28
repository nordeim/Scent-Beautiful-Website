// server/routers/checkout.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { stripe } from '@/lib/payments/stripe'
import { TRPCError } from '@trpc/server'
import { prisma } from '@/lib/db/client'

export const checkoutRouter = router({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        // The input is now a structured array, providing better type safety.
        cartItems: z.array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1),
          }),
        ),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { cartItems, userId } = input

        // Fetch product details from the database to ensure prices are accurate and not manipulated on the client.
        const variantIds = cartItems.map((item) => item.id)
        const variants = await prisma.productVariant.findMany({
          where: { id: { in: variantIds } },
          select: { id: true, price: true },
        })

        const amount = cartItems.reduce((total, cartItem) => {
          const variant = variants.find((v) => v.id === cartItem.id)
          if (!variant) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: `Invalid item in cart: Variant with ID ${cartItem.id} not found.`,
            })
          }
          const priceInNumber = variant.price.toNumber()
          return total + priceInNumber * cartItem.quantity
        }, 0)

        // Prevent creating a payment intent for a zero-value cart
        if (amount <= 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot process an empty or zero-value cart.',
          })
        }

        // The metadata needs to be a flat object of strings.
        // We'll stringify the cart details for the webhook.
        const metadataForStripe = {
          cartDetails: JSON.stringify(cartItems),
          userId: userId || 'guest',
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Stripe expects the amount in cents
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: metadataForStripe,
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
        // Propagate specific TRPC errors or a generic one
        if (error instanceof TRPCError) throw error
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not create a payment session.',
        })
      }
    }),
})
