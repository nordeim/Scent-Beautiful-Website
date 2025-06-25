// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/common/Button'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 text-lg font-semibold"
          >
            The Scent
          </Link>
          <Link
            href="/products"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Products
          </Link>
          <Link
            href="/journal"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Journal
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}
