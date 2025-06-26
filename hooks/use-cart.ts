// hooks/use-cart.ts
import { useCartStore } from '@/store/cart.store'
import { useEffect, useState } from 'react'

export const useCart = () => {
  const store = useCartStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Return a hydrated version of the store to avoid hydration mismatch issues
  // with server-side rendering and client-side persisted state.
  return isMounted ? store : {
    items: [],
    isDrawerOpen: false,
    addItem: () => {},
    removeItem: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    toggleDrawer: () => {},
    setDrawerOpen: () => {},
    getTotalItems: () => 0,
    getTotalPrice: () => 0,
  }
}
