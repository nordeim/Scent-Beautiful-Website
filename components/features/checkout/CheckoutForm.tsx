// components/features/checkout/CheckoutForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shippingAddressSchema, TShippingAddressSchema } from '@/lib/validation/schemas'
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input' // Import new component

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
  })

  const processSubmit = async (data: TShippingAddressSchema) => {
    if (!stripe || !elements) return
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        shipping: {
          name: `${data.firstName} ${data.lastName}`,
          address: {
            line1: data.addressLine1,
            line2: data.addressLine2,
            city: data.city,
            state: data.stateProvince,
            postal_code: data.postalCode,
            country: data.countryCode,
          },
        },
      },
    })
    
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } else {
      setErrorMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div>
                <label htmlFor="firstName">First name</label>
                <Input type="text" id="firstName" {...register('firstName')} className="mt-1"/>
                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last name</label>
                <Input type="text" id="lastName" {...register('lastName')} className="mt-1"/>
                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="addressLine1">Address</label>
                <Input type="text" id="addressLine1" {...register('addressLine1')} className="mt-1"/>
                {errors.addressLine1 && <p className="error-text">{errors.addressLine1.message}</p>}
            </div>
             <div className="sm:col-span-2">
                <label htmlFor="addressLine2">Apartment, suite, etc. (Optional)</label>
                <Input type="text" id="addressLine2" {...register('addressLine2')} className="mt-1"/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <Input type="text" id="city" {...register('city')} className="mt-1"/>
                {errors.city && <p className="error-text">{errors.city.message}</p>}
            </div>
             <div>
                <label htmlFor="stateProvince">State / Province</label>
                <Input type="text" id="stateProvince" {...register('stateProvince')} className="mt-1"/>
                {errors.stateProvince && <p className="error-text">{errors.stateProvince.message}</p>}
            </div>
            <div>
                <label htmlFor="postalCode">Postal code</label>
                <Input type="text" id="postalCode" {...register('postalCode')} className="mt-1"/>
                {errors.postalCode && <p className="error-text">{errors.postalCode.message}</p>}
            </div>
            <div>
                <label htmlFor="countryCode">Country</label>
                <Input type="text" id="countryCode" {...register('countryCode')} className="mt-1" defaultValue="US"/>
                {errors.countryCode && <p className="error-text">{errors.countryCode.message}</p>}
            </div>
        </div>
      </div>

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
