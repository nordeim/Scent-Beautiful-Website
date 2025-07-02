// app/(shop)/checkout/[...step]/page.tsx
'use client'

import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils/formatters'
import { useCheckoutStore } from '@/store/checkout.store'
import { InformationStep } from '@/components/features/checkout/InformationStep'
import { PaymentStep } from '@/components/features/checkout/PaymentStep'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api/trpc'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : null

interface PriceDetails {
  subtotal: number
  taxAmount: number
  total: number
}

export default function CheckoutStepsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { items } = useCart()
  // Only get shippingAddress from the store. The cleanup function is removed from here.
  const { shippingAddress } = useCheckoutStore()

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null)

  const step = Array.isArray(params.step) ? params.step[0] : 'information'

  const {
    mutate: createPaymentIntent,
    isPending,
    isError: isPaymentIntentError,
  } = api.checkout.createPaymentIntent.useMutation({
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
      setPriceDetails({
        subtotal: data.subtotal,
        taxAmount: data.taxAmount,
        total: data.total,
      })
    },
    onError: (error) => {
      console.error('Failed to create payment intent:', error)
    },
  })

  useEffect(() => {
    // Create a payment intent only when we are on the payment step AND all necessary data is available.
    if (step === 'payment' && shippingAddress && items.length > 0 && !clientSecret) {
      createPaymentIntent({
        cartItems: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        userId: session?.user?.id,
      })
    }
  }, [step, shippingAddress, items, clientSecret, session, createPaymentIntent]);

  if (!stripePromise) {
    return (
      <div className="container my-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
        <p className="text-muted-foreground mt-2">The gateway is not configured.</p>
      </div>
    )
  }

  const subtotal = priceDetails ? priceDetails.subtotal : items.reduce((acc, item) => acc + Number(item.variant.price) * item.quantity, 0)
  const appearance = { theme: 'stripe' as const }
  const options = clientSecret ? { clientSecret, appearance } : undefined

  const renderStep = () => {
    if (step === 'information') {
      return <InformationStep />
    }
    
    if (step === 'payment') {
      // If a user somehow lands here without an address (e.g., direct navigation),
      // show a helpful message. This check now works reliably.
      if (!shippingAddress) {
        return (
          <div className="text-center p-8 border rounded-lg flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-4" />
            <p className="font-semibold">Missing Shipping Information</p>
            <p className="text-sm text-muted-foreground mb-6">Please provide your shipping address first.</p>
            <Button asChild>
              <Link href="/checkout/information">Go to Information Step</Link>
            </Button>
          </div>
        )
      }

      if (isPending) {
        return (
          <div className="text-center p-8 border rounded-lg flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Preparing secure payment...</p>
          </div>
        )
      }

      if (isPaymentIntentError) {
        return (
          <div className="text-center p-8 border rounded-lg border-destructive/50 bg-destructive/10 text-destructive flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 mb-4" />
            <p className="font-semibold">Could not initiate payment.</p>
            <Button onClick={() => router.back()} variant="destructive">Go Back</Button>
          </div>
        )
      }

      if (options && shippingAddress) {
        return (
          <Elements options={options} stripe={stripePromise}>
            <PaymentStep shippingAddress={shippingAddress} />
          </Elements>
        )
      }
    }
    
    // Fallback for invalid steps or loading state
    return (
        <div className="text-center p-8 border rounded-lg flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        </div>
    );
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="py-8">{renderStep()}</div>
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
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            {priceDetails && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>GST (9%)</span>
                <span>{formatPrice(priceDetails.taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatPrice(priceDetails ? priceDetails.total : subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
