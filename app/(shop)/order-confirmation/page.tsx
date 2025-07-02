// app/(shop)/order-confirmation/page.tsx
'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import { useCheckoutStore } from '@/store/checkout.store'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { CheckCircle, Loader2, AlertTriangle } from 'lucide-react'
import { api } from '@/lib/api/trpc'

function OrderConfirmationStatus() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const { clearCheckoutState } = useCheckoutStore()
  
  const paymentIntentId = searchParams.get('payment_intent')
  const clientSecret = searchParams.get('payment_intent_client_secret')

  // We use our new tRPC query to securely fetch the payment status
  const { data, isLoading, isError } = api.order.getPaymentStatus.useQuery(
    { paymentIntentId: paymentIntentId! },
    {
      enabled: !!paymentIntentId, // Only run the query if the paymentIntentId exists
      retry: 3,
      retryDelay: 1000,
    }
  );

  // Clear state only once when payment succeeds
  useEffect(() => {
    if (data?.status === 'succeeded') {
      clearCart();
      clearCheckoutState();
    }
  }, [data?.status, clearCart, clearCheckoutState]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
        <h1 className="text-3xl font-bold mb-2">Verifying Payment...</h1>
        <p className="text-muted-foreground">Please wait while we confirm your transaction.</p>
      </div>
    );
  }
  
  if (isError || !clientSecret) {
     return (
        <div className="flex flex-col items-center">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold text-destructive mb-2">Verification Failed</h1>
            <p className="text-muted-foreground mb-6">Could not verify payment details. Please contact support.</p>
        </div>
     )
  }

  if (data?.status === 'succeeded') {
    return (
      <div className="flex flex-col items-center">
        <CheckCircle className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
        <p className="text-muted-foreground mb-6">A confirmation email has been sent. We will notify you once your order has shipped.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  // Handle other statuses like 'processing' or 'failed'
  return (
    <div className="flex flex-col items-center">
      <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
      <h1 className="text-3xl font-bold text-amber-600 mb-2">Payment Incomplete</h1>
      <p className="text-muted-foreground mb-6">Your payment has not been confirmed. Please check with your payment provider or try again.</p>
      <Button asChild>
        <Link href="/checkout/information">Return to Checkout</Link>
      </Button>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <div className="container my-16 text-center">
      <div className="max-w-2xl mx-auto border rounded-lg p-8">
        <Suspense fallback={<div className="h-48 flex justify-center items-center"><Loader2 className="h-16 w-16 text-primary animate-spin" /></div>}>
          <OrderConfirmationStatus />
        </Suspense>
      </div>
    </div>
  )
}
