// store/cart.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type CartItem } from '@/types'

type CartState = {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: () => void
  setDrawerOpen: (isOpen: boolean) => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (newItem, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id)
          if (existingItem) {
            // Update quantity of existing item
            const updatedItems = state.items.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item,
            )
            return { items: updatedItems }
          } else {
            // Add new item
            const newCartItem: CartItem = { ...newItem, quantity }
            return { items: [...state.items, newCartItem] }
          }
        })
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== variantId),
        }))
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === variantId ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = Number(item.variant.price)
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'scent-cart-storage', // name of the item in localStorage
      partialize: (state) => ({ items: state.items }), // Only persist the items array
    },
  ),
)
