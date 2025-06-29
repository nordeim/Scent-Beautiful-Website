// app/(shop)/checkout/page.tsx
'use client'

import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils/formatters'
import { CheckoutForm } from '@/components/features/checkout/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api/trpc'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

// Read the public key once and validate it.
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : null

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const {
    mutate: createPaymentIntent,
    isPending,
    isError: isPaymentIntentError,
  } = api.checkout.createPaymentIntent.useMutation({
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
    },
    onError: (error) => {
      console.error('Failed to create payment intent:', error)
      // The state will reflect this error, and the UI will update.
    },
  })

  useEffect(() => {
    // Only create an intent if there are items in the cart.
    if (items.length > 0) {
      createPaymentIntent({
        // The API now expects a structured array, not a JSON string.
        cartItems: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        userId: session?.user?.id,
      })
    }
  }, [items, session, createPaymentIntent])

  // 1. Render an error if the public key is missing in the environment.
  if (!stripePromise) {
    return (
      <div className="container my-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
        <p className="text-muted-foreground mt-2">
          The payment gateway is not configured correctly. Please contact support.
        </p>
      </div>
    )
  }

  const appearance = { theme: 'stripe' as const }
  const options = clientSecret ? { clientSecret, appearance } : undefined

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          {/* 2. Handle the three possible states: loading, error, or success */}
          {isPending && (
            <div className="text-center p-8 border rounded-lg flex flex-col items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Preparing your secure payment session...</p>
            </div>
          )}

          {isPaymentIntentError && (
            <div className="text-center p-8 border rounded-lg border-destructive/50 bg-destructive/10 text-destructive flex flex-col items-center">
              <AlertTriangle className="h-8 w-8 mb-4" />
              <p className="font-semibold">Could not initiate payment.</p>
              <p className="text-sm text-destructive/80 mb-6">There was an issue connecting to our payment provider.</p>
              <Button asChild variant="destructive">
                <Link href="/cart">Return to Cart</Link>
              </Button>
            </div>
          )}

          {options && !isPending && !isPaymentIntentError && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>

        <aside className="bg-stone-100 dark:bg-stone-900/50 p-8 rounded-lg lg:py-8 order-first lg:order-last">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                  <Image src={item.image.url} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p>{formatPrice(Number(item.variant.price) * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
