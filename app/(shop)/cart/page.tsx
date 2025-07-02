// app/(shop)/cart/page.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { CartItem } from '@/components/features/cart/CartItem'
import { formatPrice } from '@/lib/utils/formatters'
import { Loader2 } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { items, getTotalPrice, getTotalItems } = useCart()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  const handleCheckout = () => {
    if (status === 'authenticated') {
      router.push('/checkout/information')
    } else {
      // Redirect guest users to login, but tell the login page where to return to.
      router.push('/login?callbackUrl=/checkout/information')
    }
  }

  return (
    <div className="container my-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-8">Shopping Cart</h1>
      {totalItems > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="divide-y p-0">
                {items.map((item) => (
                  <div key={item.id} className="px-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-muted">Calculated at next step</span>
                </div>
                <div className="flex justify-between pt-4 border-t font-bold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  disabled={status === 'loading'}
                  size="lg"
                  className="w-full mt-4"
                >
                  {status === 'loading' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
          <p className="mt-2 text-muted">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
