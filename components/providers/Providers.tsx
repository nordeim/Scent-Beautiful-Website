// components/providers/Providers.tsx
'use client'

import { TrpcProvider } from '@/components/providers/TrpcProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LazyMotion, domAnimation } from 'framer-motion'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <AuthProvider>
        <ThemeProvider>
          <LazyMotion features={domAnimation}>{children}</LazyMotion>
        </ThemeProvider>
      </AuthProvider>
    </TrpcProvider>
  )
}
