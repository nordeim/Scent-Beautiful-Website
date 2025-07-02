// components/features/checkout/InformationStep.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shippingAddressSchema, TAddressSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { useCheckoutStore } from '@/store/checkout.store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardContent } from '@/components/common/Card'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import type { Address } from '@prisma/client'
import { CheckCircle, Loader2 } from 'lucide-react'

export function InformationStep() {
  const router = useRouter()
  const { shippingAddress, setShippingAddress } = useCheckoutStore()
  const { data: savedAddresses, isLoading } = api.address.list.useQuery()

  // This local state is used to reliably trigger navigation AFTER the global state has been set.
  const [addressToSubmit, setAddressToSubmit] = useState<TAddressSchema | null>(null)
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(shippingAddress?.id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: shippingAddress || {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      countryCode: 'SG',
    },
  })

  // When a user selects a saved address, update the form
  useEffect(() => {
    if (selectedAddressId) {
      const selected = savedAddresses?.find(addr => addr.id === selectedAddressId)
      if (selected) {
        reset(selected)
      }
    }
  }, [selectedAddressId, savedAddresses, reset])
  
  // This effect runs *after* the form submission has set the addressToSubmit state.
  useEffect(() => {
    if (addressToSubmit) {
      setShippingAddress(addressToSubmit)
      router.push('/checkout/payment')
    }
  }, [addressToSubmit, router, setShippingAddress])

  // The onSubmit handler now only sets the local state, triggering the effect.
  const onSubmit = (data: TAddressSchema) => {
    setAddressToSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading saved addresses...</span>
        </div>
      )}

      {savedAddresses && savedAddresses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select a Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedAddresses.map((address: Address) => (
              <Card
                key={address.id}
                onClick={() => setSelectedAddressId(address.id)}
                className={cn(
                  'cursor-pointer p-4 transition-all',
                  selectedAddressId === address.id
                    ? 'border-primary ring-2 ring-primary'
                    : 'hover:border-primary/50',
                )}
              >
                <CardContent className="p-0 relative">
                  {selectedAddressId === address.id && (
                    <CheckCircle className="absolute top-0 right-0 h-5 w-5 text-primary" />
                  )}
                  <p className="font-semibold">{address.firstName} {address.lastName}</p>
                  <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.stateProvince} {address.postalCode}, {address.countryCode}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or enter a new address</span></div>
          </div>
        </div>
      )}

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
                <Input type="text" id="countryCode" {...register('countryCode')} className="mt-1" />
                {errors.countryCode && <p className="error-text">{errors.countryCode.message}</p>}
            </div>
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg">
        Continue to Payment
      </Button>
    </form>
  )
}
