// components/providers/ThemeProvider.tsx
"use client"
import { useEffect } from "react"
import { useUIStore } from "@/store/ui.store"

/**
 * This component is responsible for applying the current theme to the DOM.
 * It listens to the global Zustand store for theme changes and updates the
 * `data-theme` attribute on the `<html>` element accordingly.
 * It does not provide a context, as the state is managed globally by Zustand.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useUIStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    // The 'persist' middleware in the Zustand store handles saving to localStorage.
  }, [theme])

  return <>{children}</>
}
