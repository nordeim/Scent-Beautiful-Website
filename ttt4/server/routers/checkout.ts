// server/routers/checkout.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { stripe } from '@/lib/payments/stripe'
import { TRPCError } from '@trpc/server'
import { prisma } from '@/lib/db/client'
import { GST_RATE } from '@/lib/config/shop' // Import the GST rate

export const checkoutRouter = router({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        cartItems: z.array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1),
          }),
        ),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { cartItems, userId } = input

        if (cartItems.length === 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot process an empty cart.',
          })
        }

        const variantIds = cartItems.map((item) => item.id)
        const variants = await prisma.productVariant.findMany({
          where: { id: { in: variantIds } },
          select: { id: true, price: true },
        })

        const subtotal = cartItems.reduce((total, cartItem) => {
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
        
        // Server-side tax calculation
        const taxAmount = subtotal * GST_RATE;
        const totalAmount = subtotal + taxAmount;

        if (totalAmount <= 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot process a zero-value cart.',
          })
        }

        const metadataForStripe = {
          cartDetails: JSON.stringify(cartItems),
          userId: userId || 'guest',
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalAmount * 100), // Use the final, taxed amount for Stripe
          currency: 'sgd', // Update currency to Singapore Dollar
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

        // Return the full price breakdown to the client
        return {
          clientSecret: paymentIntent.client_secret,
          subtotal: subtotal,
          taxAmount: taxAmount,
          total: totalAmount,
        }
      } catch (error) {
        console.error('Stripe Payment Intent Error:', error)
        if (error instanceof TRPCError) throw error
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not create a payment session.',
        })
      }
    }),
})
