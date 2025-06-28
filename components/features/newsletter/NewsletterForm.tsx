// components/features/newsletter/NewsletterForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, TNewsletterSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { useState } from 'react'
import { Input } from '@/components/common/Input' // Import new component

export function NewsletterForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
  })

  const subscribe = api.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message)
      reset()
    },
    onError: (error) => {
      console.error('Subscription failed:', error)
      setSuccessMessage('Something went wrong. Please try again.')
    },
  })

  const onSubmit = (data: TNewsletterSchema) => {
    setSuccessMessage(null)
    subscribe.mutate(data)
  }

  if (successMessage) {
    return (
      <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-md">
        <p className="font-semibold text-primary">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          // This input needs a specific style for its context in the dark footer
          className="flex-1 bg-stone-900/50 border-stone-700 placeholder:text-stone-400 focus:ring-primary"
        />
        <Button type="submit" variant="primary" size="sm" disabled={subscribe.isPending}>
          {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {errors.email && <p className="error-text">{errors.email.message}</p>}
    </form>
  )
}
