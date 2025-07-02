// components/features/account/AddressFormDialog.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, TAddressSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/common/Dialog'
import type { Address } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface AddressFormDialogProps {
  initialData?: Address | null
  trigger: React.ReactNode
  onSuccess?: () => void
}

export function AddressFormDialog({ initialData, trigger, onSuccess }: AddressFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const utils = api.useUtils()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
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

  const upsertAddress = api.address.upsert.useMutation({
    onSuccess: () => {
      utils.address.list.invalidate()
      toast.success(initialData ? 'Address updated!' : 'Address added!')
      setIsOpen(false)
      reset()
      onSuccess?.()
    },
    onError: (error) => {
      console.error('Failed to save address:', error)
      toast.error('Failed to save address. Please try again.')
    },
  })

  const onSubmit = (data: TAddressSchema) => {
    upsertAddress.mutate({
      ...data,
      id: initialData?.id,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName">First Name</label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="addressLine1">Address</label>
            <Input id="addressLine1" {...register('addressLine1')} />
            {errors.addressLine1 && <p className="error-text">{errors.addressLine1.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
            <Input id="addressLine2" {...register('addressLine2')} />
            {errors.addressLine2 && <p className="error-text">{errors.addressLine2.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="city">City</label>
            <Input id="city" {...register('city')} />
            {errors.city && <p className="error-text">{errors.city.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="stateProvince">State/Province</label>
              <Input id="stateProvince" {...register('stateProvince')} />
              {errors.stateProvince && <p className="error-text">{errors.stateProvince.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="postalCode">Postal Code</label>
              <Input id="postalCode" {...register('postalCode')} />
              {errors.postalCode && <p className="error-text">{errors.postalCode.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="countryCode">Country</label>
            <Input id="countryCode" {...register('countryCode')} />
            {errors.countryCode && <p className="error-text">{errors.countryCode.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
