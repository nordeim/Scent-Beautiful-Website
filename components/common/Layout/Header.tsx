// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/common/Button'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">The Scent</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/products">Products</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {/* Mobile Menu can be added here */}
        </div>
      </div>
    </header>
  )
}
