// components/features/cart/CartDrawer.tsx
'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/common/Sheet'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/formatters' // Will create this utility later
import { X } from 'lucide-react'

export function CartDrawer() {
  const { items, isDrawerOpen, setDrawerOpen, removeItem, getTotalPrice } = useCart()

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded">
                      <Image
                        src={item.image.url}
                        alt={item.image.altText || item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted">{item.variant.name}</p>
                      <p className="text-sm">
                        {item.quantity} x {formatPrice(item.variant.price)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 border-t px-6 py-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>{formatPrice(getTotalPrice())}</p>
              </div>
              <p className="text-sm text-muted">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
              <div className="mt-4 flex justify-center text-center text-sm">
                <p>
                  or{' '}
                  <Button variant="link" onClick={() => setDrawerOpen(false)}>
                    Continue Shopping
                  </Button>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <h3 className="text-2xl font-semibold">Your cart is empty</h3>
            <p className="text-muted">Add some products to see them here.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
