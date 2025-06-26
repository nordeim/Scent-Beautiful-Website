// app/(shop)/order-confirmation/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStripe } from '@stripe/react-stripe-js'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  const stripe = useStripe()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('Processing your order...')

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret')
    if (!clientSecret || !stripe) {
      setStatus('failed')
      setMessage('Could not process payment details. Please contact support.')
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setStatus('success')
          setMessage('Your payment was successful.')
          clearCart() // Clear the cart on successful payment
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
  }, [stripe, searchParams, clearCart])

  return (
    <div className="container my-16 text-center">
      <div className="max-w-2xl mx-auto border rounded-lg p-8">
        {status === 'loading' && <p>{message}</p>}
        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-sage mb-4" />
            <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
            <p className="text-muted mb-6">A confirmation email has been sent. We will notify you once your order has shipped.</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
        {status === 'failed' && (
           <div className="flex flex-col items-center">
             <h1 className="text-3xl font-bold text-terracotta mb-2">Payment Failed</h1>
             <p className="text-muted mb-6">{message}</p>
             <Button asChild>
              <Link href="/checkout">Try Again</Link>
            </Button>
           </div>
        )}
      </div>
    </div>
  )
}
