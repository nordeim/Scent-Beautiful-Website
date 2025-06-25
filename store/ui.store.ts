import { create } from 'zustand'
import { persist } from 'zustand/middleware'
        
type Theme = 'day' | 'night'

interface UIState { 
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}       
    
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'day',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'day' ? 'night' : 'day' })),
    }),
    {
      name: 'scent-ui-storage', // name of the item in the storage (must be unique)
    },
  ),
)
