// components/features/account/UpdateProfileForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, TProfileSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import type { User } from '@prisma/client'

interface UpdateProfileFormProps {
  user: Pick<User, 'firstName' | 'lastName'>
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const utils = api.useUtils()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
  })

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      // Invalidate the 'me' query to refetch fresh data
      utils.user.me.invalidate()
      // Ideally, show a success toast here
    },
    onError: (error) => {
      setError('root', { message: error.message || 'An unexpected error occurred.' })
    },
  })

  const onSubmit = (data: TProfileSchema) => {
    updateProfile.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your name and personal details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
