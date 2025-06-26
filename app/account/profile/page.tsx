// app/account/profile/page.tsx
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'

export const metadata = {
  title: 'My Profile',
}

export default async function ProfilePage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)

  // The 'me' procedure is protected, ensuring only logged-in users can access it.
  const user = await caller.user.me()

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Full Name</span>
          <span>{`${user?.firstName || ''} ${user?.lastName || ''}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Email</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Role</span>
          <span className="capitalize">{user?.role}</span>
        </div>
      </CardContent>
    </Card>
  )
}
