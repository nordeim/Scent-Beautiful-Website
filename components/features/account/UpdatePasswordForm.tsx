// components/features/account/UpdatePasswordForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema, TPasswordChangeSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useState } from 'react'

export function UpdatePasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TPasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
  })

  const updatePassword = api.user.updatePassword.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message)
      reset()
    },
    onError: (error) => {
      setError('root', { message: error.message || 'An unexpected error occurred.' })
    },
  })

  const onSubmit = (data: TPasswordChangeSchema) => {
    setSuccessMessage(null) // Clear previous messages
    updatePassword.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Choose a strong, new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="currentPassword">Current Password</label>
            <Input id="currentPassword" type="password" {...register('currentPassword')} />
            {errors.currentPassword && <p className="error-text">{errors.currentPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="newPassword">New Password</label>
            <Input id="newPassword" type="password" {...register('newPassword')} />
            {errors.newPassword && <p className="error-text">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          {successMessage && <p className="text-sm font-medium text-primary">{successMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
