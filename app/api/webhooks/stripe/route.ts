// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db/client'
import { stripe } from '@/lib/payments/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const session = event.data.object as Stripe.PaymentIntent
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = session

    // Check if order already exists to ensure idempotency
    const existingOrder = await prisma.order.findUnique({
      where: { stripePaymentIntentId: paymentIntent.id },
    })

    if (existingOrder) {
      console.log(`Order already exists for Payment Intent: ${paymentIntent.id}`)
      return NextResponse.json({ received: true, message: 'Order already processed.' })
    }

    try {
      // Create the order in our database
      const orderData = paymentIntent.metadata
      const shippingDetails = paymentIntent.shipping
      
      // A more robust implementation would fetch user by email or use userId from metadata
      const user = orderData.userId ? await prisma.user.findUnique({ where: { id: orderData.userId } }) : null

      const createdOrder = await prisma.order.create({
        data: {
          orderNumber: `SCENT-${paymentIntent.id.slice(-8).toUpperCase()}`,
          total: paymentIntent.amount / 100,
          stripePaymentIntentId: paymentIntent.id,
          paymentStatus: 'paid',
          userId: user?.id, // Can be null for guest checkouts
          shippingAddress: shippingDetails ? JSON.stringify(shippingDetails) : undefined,
          items: {
            create: JSON.parse(orderData.cartDetails).map((item: any) => ({
              quantity: item.quantity,
              price: item.variant.price,
              productId: item.product.id,
              variantId: item.variant.id,
              productName: item.product.name,
              variantName: item.variant.name,
              productImage: item.image.url,
            })),
          },
        },
      })
      console.log(`Successfully created order ${createdOrder.orderNumber}`)
    } catch (dbError) {
      console.error('Database error while creating order:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } else {
    console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
