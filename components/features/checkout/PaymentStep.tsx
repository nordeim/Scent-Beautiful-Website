// components/features/checkout/PaymentStep.tsx
'use client'

import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { TAddressSchema } from '@/lib/validation/schemas'

interface PaymentStepProps {
  shippingAddress: TAddressSchema;
}

export function PaymentStep({ shippingAddress }: PaymentStepProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        shipping: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          address: {
            line1: shippingAddress.addressLine1,
            line2: shippingAddress.addressLine2,
            city: shippingAddress.city,
            state: shippingAddress.stateProvince,
            postal_code: shippingAddress.postalCode,
            country: shippingAddress.countryCode,
          },
        },
      },
    });

    if (error && (error.type === 'card_error' || error.type === 'validation_error')) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } else if (error) {
      setErrorMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="mt-4">
          <PaymentElement />
        </div>
      </div>

      {errorMessage && <div className="error-text text-center">{errorMessage}</div>}

      <Button type="submit" disabled={isLoading || !stripe || !elements} className="w-full" size="lg">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}
