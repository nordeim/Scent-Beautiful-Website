// app/(shop)/order-confirmation/page.tsx
'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStripe } from '@stripe/react-stripe-js'
import { useCart } from '@/hooks/use-cart'
import { useCheckoutStore } from '@/store/checkout.store'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { CheckCircle, Loader2 } from 'lucide-react'

// The actual logic needs to be in a child component to be wrapped in Suspense
function OrderConfirmationStatus() {
  const stripe = useStripe()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const { clearCheckoutState } = useCheckoutStore()
  
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('Verifying your payment details...')

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret')
    if (!clientSecret || !stripe) {
      setStatus('failed')
      setMessage('Could not find payment details. Please contact support.')
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setStatus('success')
          setMessage('Your payment was successful.')
          // Clear both cart and checkout state on success
          clearCart()
          clearCheckoutState()
          break
        case 'processing':
          setStatus('loading')
          setMessage('Your payment is processing. We will notify you upon confirmation.')
          break
        default:
          setStatus('failed')
          setMessage('Payment failed. Please try again or contact support.')
          break
      }
    })
  }, [stripe, searchParams, clearCart, clearCheckoutState])

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
        <h1 className="text-3xl font-bold mb-2">Processing Order</h1>
        <p className="text-muted-foreground mb-6">{message}</p>
      </div>
    )
  }
  
  if (status === 'success') {
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

  // status === 'failed'
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-destructive mb-2">Payment Failed</h1>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button asChild>
        <Link href="/checkout/information">Try Again</Link>
      </Button>
    </div>
  )
}


export default function OrderConfirmationPage() {
  return (
    <div className="container my-16 text-center">
      <div className="max-w-2xl mx-auto border rounded-lg p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <OrderConfirmationStatus />
        </Suspense>
      </div>
    </div>
  )
}
