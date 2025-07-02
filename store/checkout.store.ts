// store/checkout.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TAddressSchema } from '@/lib/validation/schemas'

type CheckoutState = {
  shippingAddress: TAddressSchema | null
  setShippingAddress: (address: TAddressSchema) => void
  clearCheckoutState: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingAddress: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
      clearCheckoutState: () => set({ shippingAddress: null }),
    }),
    {
      name: 'scent-checkout-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
    },
  ),
)
