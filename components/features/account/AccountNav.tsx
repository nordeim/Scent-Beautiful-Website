// components/features/account/AccountNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/common/Button'

const navItems = [
  { href: '/account/profile', label: 'Profile', icon: User },
  { href: '/account/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
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
            pathname === item.href
              ? 'bg-stone-200 text-foreground dark:bg-stone-800'
              : 'hover:bg-stone-200/50 dark:hover:bg-stone-800/50',
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </Button>
    </nav>
  )
}
