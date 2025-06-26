// app/account/layout.tsx
import { AccountNav } from '@/components/features/account/AccountNav'

export const metadata = {
  title: 'My Account',
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <aside className="lg:col-span-1">
          <AccountNav />
        </aside>
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  )
}
