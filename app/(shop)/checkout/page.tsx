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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const { mutate: createPaymentIntent, isPending } = api.checkout.createPaymentIntent.useMutation({
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
    },
    onError: (error) => {
      console.error("Failed to create payment intent:", error)
    }
  })

  useEffect(() => {
    if (items.length > 0) {
      createPaymentIntent({
        cartDetails: JSON.stringify(items),
        userId: session?.user?.id,
      })
    }
  }, [items, session, createPaymentIntent])

  const appearance = { theme: 'stripe' as const }
  const options = clientSecret ? { clientSecret, appearance } : undefined

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          {options ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          ) : (
             <div className="text-center p-8 border rounded-lg">
                <p>Loading payment form...</p>
             </div>
          )}
        </div>

        <div className="bg-stone-100 dark:bg-charcoal p-8 rounded-lg lg:py-8">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                  <Image src={item.image.url} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted">Qty: {item.quantity}</p>
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
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
