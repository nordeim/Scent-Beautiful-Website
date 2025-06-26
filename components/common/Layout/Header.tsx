// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { Moon, Search, ShoppingBag, Sun, User } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { CartDrawer } from '@/components/features/cart/CartDrawer'

export function Header() {
  const { toggleTheme } = useUIStore()
  const { toggleDrawer, getTotalItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border dark:border-dark-border bg-limestone/80 dark:bg-midnight/80 backdrop-blur-lg'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex flex-col items-start leading-none">
            <span className="font-heading text-3xl font-bold tracking-wider uppercase text-charcoal dark:text-pearl">
              The Scent
            </span>
            <span className="text-xs font-light tracking-[0.2em] text-sage dark:text-secondary -mt-1">
              AROMATHERAPY
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="text-charcoal dark:text-pearl hover:text-sage dark:hover:text-secondary transition-colors">Home</Link>
            <Link href="/products" className="text-charcoal dark:text-pearl hover:text-sage dark:hover:text-secondary transition-colors">Shop</Link>
            <Link href="/scent-finder" className="text-charcoal dark:text-pearl hover:text-sage dark:hover:text-secondary transition-colors">Scent Finder</Link>
            <Link href="/about" className="text-charcoal dark:text-pearl hover:text-sage dark:hover:text-secondary transition-colors">About</Link>
            <Link href="/contact" className="text-charcoal dark:text-pearl hover:text-sage dark:hover:text-secondary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/login" passHref>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" aria-label="Shopping Cart" onClick={toggleDrawer} className="relative">
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sage text-xs text-pearl">
                  {totalItems}
                </span>
              )}
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  )
}
