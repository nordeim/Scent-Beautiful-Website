// components/features/account/AccountNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/common/Button'

// Updated navigation items to include Dashboard as the primary link
const navItems = [
  { href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/account/profile', label: 'Profile Settings', icon: User },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            // Use startsWith for dashboard to handle potential sub-pages in the future
            pathname === item.href || (item.href === '/account/dashboard' && pathname.startsWith('/account'))
              ? 'bg-stone-200 text-foreground dark:bg-stone-800'
              : 'text-muted-foreground hover:bg-stone-200/50 hover:text-foreground dark:hover:bg-stone-800/50',
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </Button>
    </nav>
  )
}
