// app/account/profile/page.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { UpdateProfileForm } from '@/components/features/account/UpdateProfileForm'
import { UpdatePasswordForm } from '@/components/features/account/UpdatePasswordForm'
import { ManageAddresses } from '@/components/features/account/ManageAddresses'

export default function ProfilePage() {
  const { data: user, isLoading } = api.user.me.useQuery()

  if (isLoading) {
    return <div className="container my-12">Loading your profile...</div>
  }

  if (!user) {
    // This case should be handled by middleware, but as a fallback:
    return <div className="container my-12">Please log in to view your profile.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpdateProfileForm user={user} />
        <UpdatePasswordForm />
      </div>

      <ManageAddresses />
    </div>
  )
}
