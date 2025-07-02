// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/common/Layout/Header'
import { Footer } from '@/components/common/Layout/Footer'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers/Providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: {
    default: 'The Scent - Premium Natural Aromatherapy',
    template: '%s | The Scent',
  },
  description:
    'Discover a world of premium natural aromatherapy products, crafted to elevate your senses and well-being.',
  keywords: ['aromatherapy', 'essential oils', 'natural wellness', 'luxury fragrance'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          inter.variable,
          cormorant.variable,
        )}
      >
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* Global Toaster for notifications, themed to match the app */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              // Base styles for all toasts
              style: {
                borderRadius: 'var(--radius)',
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
              // Specific styles for success toasts
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
              // Specific styles for error toasts
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'hsl(var(--destructive-foreground))',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
