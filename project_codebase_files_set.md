# .gitignore
```txt
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .husky/pre-commit
```txt
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint

```

# .prettierrc
```txt
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}

```

# .eslintrc.json
```json
{
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}

```

# .env
```txt
# =================================================================
# ==           ENVIRONMENT VARIABLES FOR "THE SCENT"             ==
# =================================================================
#
# This file is for local development secrets and configuration.
# It is ignored by Git. DO NOT commit this file to version control.
#

#---------------------------------
# Application Environment
#---------------------------------
# Set the environment for Next.js. Should be 'development' for local work.
NODE_ENV=development

# The public URL of your site, used by Next.js and various libraries.
NEXT_PUBLIC_SITE_URL="http://localhost:3000"


#---------------------------------
# Database (PostgreSQL)
#---------------------------------
# This connection string is used by Prisma for runtime queries with connection pooling.
# It is configured based on your docker-compose.yml file.
DATABASE_URL="postgresql://scent_user:StrongPass1234@localhost:5432/scent_db?schema=public"

# This connection string is used by Prisma for migrations and other direct DB access.
# For this Docker setup, it's the same as the pooled URL.
DATABASE_DIRECT_URL="postgresql://scent_user:StrongPass1234@localhost:5432/scent_db?schema=public"


#---------------------------------
# Authentication (NextAuth.js)
#---------------------------------
# A secret key for signing JWTs and other security tokens.
# REQUIRED for production. You can generate a good secret with:
# `openssl rand -hex 32` in your terminal.
#NEXTAUTH_SECRET="REPLACE_WITH_A_SECURE_RANDOM_STRING_32_CHARS_LONG"
NEXTAUTH_SECRET="3c090c32f46eb14d0aa64453bf0275d89f8aadae439759b5227edcd1ed9b09bf"

# The canonical URL for NextAuth callbacks.
NEXTAUTH_URL="http://localhost:3000"

# --- Google Provider ---
# Get these from the Google Cloud Console: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="REPLACE_WITH_YOUR_GOOGLE_CLIENT_SECRET"

# --- Email Provider ---
# Configuration for passwordless sign-in via email (e.g., using SendGrid, Resend, etc.)
# Example for a standard SMTP server: "smtp://user:pass@smtp.example.com:587"
EMAIL_SERVER="REPLACE_WITH_YOUR_SMTP_SERVER_URL"
EMAIL_FROM="noreply@thescent.com"


#---------------------------------
# External Services
#---------------------------------

# --- Stripe (Payments) ---
# Get these from your Stripe Dashboard: https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY="pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLIC_KEY"
STRIPE_SECRET_KEY="sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY"
STRIPE_WEBHOOK_SECRET="whsec_REPLACE_WITH_YOUR_STRIPE_WEBHOOK_SECRET"

# --- SendGrid (Transactional Emails) ---
# Get this from your SendGrid account: https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY="SG.REPLACE_WITH_YOUR_SENDGRID_API_KEY"

# --- Algolia (Search) ---
# Get these from your Algolia Dashboard: https://www.algolia.com/account/api-keys/
ALGOLIA_APP_ID="REPLACE_WITH_YOUR_ALGOLIA_APP_ID"
ALGOLIA_API_KEY="REPLACE_WITH_YOUR_ALGOLIA_API_KEY" # Use the Admin API Key for backend operations

# --- AWS S3 (File Storage) ---
# Get these from your AWS IAM console.
S3_REGION="us-east-1" # e.g., us-east-1
S3_ACCESS_KEY_ID="REPLACE_WITH_YOUR_S3_ACCESS_KEY"
S3_SECRET_ACCESS_KEY="REPLACE_WITH_YOUR_S3_SECRET_KEY"
S3_BUCKET_NAME="the-scent-media" # The name of your S3 bucket


```

# package.json
```json
{
  "name": "the-scent",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "prisma:seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed.ts"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.600.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "@prisma/client": "^6.10.1",
    "@radix-ui/react-slot": "^1.2.3",
    "@sendgrid/mail": "^8.1.3",
    "@tanstack/react-query": "^5.50.1",
    "@trpc/client": "11.0.0-rc.446",
    "@trpc/next": "11.0.0-rc.446",
    "@trpc/react-query": "11.0.0-rc.446",
    "@trpc/server": "11.0.0-rc.446",
    "algoliasearch": "^4.24.0",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.19.1",
    "lucide-react": "^0.523.0",
    "next": "^14.2.30",
    "next-auth": "^4.24.7",
    "pnpm": "^10.12.3",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "stripe": "^16.2.0",
    "superjson": "^2.2.1",
    "tailwind-merge": "^3.3.1",
    "zod": "^3.23.8",
    "zustand": "^4.5.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.1",
    "@tailwindcss/postcss": "^4.0.0-alpha.16",
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.14.9",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.21",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.5.6",
    "prisma": "^6.10.1",
    "tailwindcss": "^4.1.10",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.3"
  }
}

```

# tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/lib/*": ["./lib/*"],
      "@/server/*": ["./server/*"],
      "@/store/*": ["./store/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# components/animations/FadeIn.tsx
```tsx
// components/animations/FadeIn.tsx
'use client'

import { motion, Variants } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export function FadeIn({ children, duration = 0.5, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

```

# components/providers/AuthProvider.tsx
```tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

```

# components/providers/TrpcProvider.tsx
```tsx
// components/providers/TrpcProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import superjson from 'superjson'

import { api } from '@/lib/api/trpc'

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    }),
  )
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  )
}

```

# components/providers/ThemeProvider.tsx
```tsx
"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "day" | "night"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "day"
    }
    return "day"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => setThemeState((prev) => (prev === "day" ? "night" : "day"))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

```

# components/features/product/ProductCard.tsx
```tsx
// components/features/product/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import type { ProductCardType } from '@/types'

interface ProductCardProps {
  product: ProductCardType
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // In a future step, this will call a "useCart" hook.
    console.log(`Adding ${product.name} to cart.`)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className={cn('overflow-hidden transition-shadow hover:shadow-lg', className)}>
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <Image
              src={primaryImage?.url || '/placeholder.jpg'}
              alt={primaryImage?.altText || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
          <p className="mt-2 text-xl font-semibold">
            ${primaryVariant?.price.toString() ?? product.price.toString()}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

```

# components/features/product/ProductCard.test.tsx
```tsx
// components/features/product/ProductCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'
import type { ProductCardType } from '@/types'

const mockProduct: ProductCardType = {
  id: '1',
  name: 'Lavender Dreams',
  slug: 'lavender-dreams',
  price: 29.99,
  images: [{ url: '/lavender.jpg', altText: 'A bottle of lavender oil' }],
  variants: [{ price: 29.99 }],
  // Add other required fields from Product model with dummy data
  sku: 'LD-001',
  description: ' calming lavender oil',
  shortDescription: 'Calming oil',
  isActive: true,
  isFeatured: false,
  scentNotes: {},
  ingredients: ['lavender'],
  usageInstructions: 'Apply to pulse points.',
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryId: 'cat1',
  brandId: 'brand1',
}

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Lavender Dreams')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /a bottle of lavender oil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})

```

# components/features/product/ProductInfo.tsx
```tsx
// components/features/product/ProductInfo.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { serverApi } from '@/lib/api/trpc'

type Product = Awaited<ReturnType<typeof serverApi.product.bySlug.query>>

interface ProductInfoProps {
  product: NonNullable<Product>
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // In a future step, this will call a "useCart" hook with the selected variant and quantity
    console.log(`Adding ${quantity} of ${product.name} to cart.`)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <p className="text-3xl">${product.price.toString()}</p>
      <p className="text-base text-muted-foreground">{product.shortDescription}</p>

      <div className="mt-6 flex items-center gap-4">
        {/* Quantity selector can be added here */}
        <Button size="lg" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <div className="prose prose-sm mt-4 text-muted-foreground">{product.description}</div>
      </div>
    </div>
  )
}

```

# components/common/Card.tsx
```tsx
// components/common/Card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-limestone text-charcoal shadow-sm dark:bg-midnight dark:text-pearl dark:border-neutral-800',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# components/common/Layout/Header.tsx
```tsx
// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/common/Button'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 text-lg font-semibold"
          >
            The Scent
          </Link>
          <Link
            href="/products"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Products
          </Link>
          <Link
            href="/journal"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Journal
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}

```

# components/common/Layout/Footer.tsx
```tsx
// components/common/Layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-balance text-center text-sm leading-loose text-foreground/60 md:text-left">
          &copy; {new Date().getFullYear()} The Scent. All Rights Reserved.
        </p>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/terms"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

```

# components/common/Button.tsx
```tsx
// components/common/Button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-sage text-pearl hover:bg-deep-sage',
        secondary:
          'border border-sage bg-transparent text-charcoal hover:bg-sage/10 dark:text-pearl',
        destructive: 'bg-terracotta text-pearl hover:bg-terracotta/90',
        ghost: 'hover:bg-charcoal/10 dark:hover:bg-pearl/10',
        link: 'text-charcoal underline-offset-4 hover:underline dark:text-pearl',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

```

# components/common/Card.test.tsx
```tsx
// components/common/Card.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './Card'

describe('Card Component', () => {
  test('renders all parts of the card correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content goes here.')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })
})

```

# components/common/Button.test.tsx
```tsx
// components/common/Button.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('bg-sage') // Primary variant
  })

  test('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const buttonElement = screen.getByRole('button', { name: /secondary/i })
    expect(buttonElement).toHaveClass('border-sage')
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const buttonElement = screen.getByRole('button', { name: /clickable/i })
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when the disabled prop is true', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    )
    const buttonElement = screen.getByRole('button', { name: /disabled/i })
    expect(buttonElement).toBeDisabled()
    fireEvent.click(buttonElement)
    expect(handleClick).not.toHaveBeenCalled()
  })
})

```

# next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# tailwind.config.ts
```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', "[data-theme='night']"],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}', // Also scan lib for any potential classes
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Day mode
        sage: '#7B9B7E',
        limestone: '#F5F2ED',
        charcoal: '#2C2C2C',
        lavender: '#E6E0F5',
        terracotta: '#D4846F',
        ocean: '#6B8CAE',
        moss: '#5F7955',
        // Night mode
        'deep-sage': '#4A5F4C',
        midnight: '#1A1A1A',
        pearl: '#F5F5F5',
        'deep-lavender': '#4A4565',
        burgundy: '#8B4A47',
        'deep-ocean': '#3A5470',
        forest: '#3A4A3A',
        // Shadcn/ui compatible color names
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

```

# tests/e2e/shop.spec.ts
```ts
// tests/e2e/shop.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Shopping Flow', () => {
  test('User can navigate from PLP to PDP', async ({ page }) => {
    // Navigate to the Product Listing Page (PLP)
    await page.goto('/products')

    // Verify the page title is correct
    await expect(page).toHaveTitle(/All Products/)
    const heading = page.getByRole('heading', { name: 'Our Collection' })
    await expect(heading).toBeVisible()

    // Find the first product card and get its name
    const firstProductCard = page.locator('a.group').first()
    await expect(firstProductCard).toBeVisible()
    const productName = await firstProductCard.getByRole('heading').textContent()
    expect(productName).not.toBeNull()

    // Click the first product card to navigate to the Product Detail Page (PDP)
    await firstProductCard.click()

    // Verify the URL has changed to the product's slug
    await expect(page).toHaveURL(/\/products\//)

    // Verify the PDP shows the correct product name in its heading
    const pdpHeading = page.getByRole('heading', { name: productName! })
    await expect(pdpHeading).toBeVisible()

    // Verify the page title now reflects the product name
    await expect(page).toHaveTitle(new RegExp(productName!))
  })
})

```

# tests/setup/jest.setup.ts
```ts
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

```

# jest.config.js
```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/server/(.*)$': '<rootDir>/server/$1',
    '^@/store/(.*)$': '<rootDir>/store/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

```

# next.config.js
```js
// next.config.js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The 'reactStrictMode' is true by default in Next.js 14+
  // and does not need to be explicitly set.

  // As per the project architecture, we will need to load images
  // from external domains like Cloudinary. This configuration block
  // prepares our application for that.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // You can add port and pathname if needed, for example:
        // port: '',
        // pathname: '/your-cloudinary-account/**',
      },
      // Add other image provider domains here as needed
    ],
  },
};

module.exports = nextConfig;

```

# postcss.config.mjs
```mjs
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;

```

# tailwind.config.js
```js
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', "[data-theme='night']"],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Custom brand colors
        sage: '#7B9B7E',
        'deep-sage': '#4A5F4C',
        limestone: '#F5F2ED',
        midnight: '#1A1A1A',
        charcoal: '#2C2C2C',
        pearl: '#F5F5F5',
        terracotta: '#D4846F',
        // Abstracted theme colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

```

# app/layout.tsx
```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Header } from '@/components/common/Layout/Header'
import { Footer } from '@/components/common/Layout/Footer'
import { cn } from '@/lib/utils'
import { TrpcProvider } from '@/components/providers/TrpcProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
          'min-h-screen bg-limestone font-sans antialiased dark:bg-midnight',
          inter.variable,
        )}
      >
        <TrpcProvider>
          <AuthProvider>
            <ThemeProvider>
              <div className="relative flex min-h-dvh flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </TrpcProvider>
      </body>
    </html>
  )
}

```

# app/error.tsx
```tsx
"use client"
import React from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-limestone text-charcoal">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        className="px-6 py-2 rounded bg-sage text-white hover:bg-deep-sage transition"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  )
}

```

# app/page.tsx
```tsx
// app/page.tsx
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Link from 'next/link'

export default function Home() {
  return (
    // The main container with a subtle background texture or image.
    // For now, we use a gradient to simulate depth.
    // In a real implementation, a high-quality image would be used:
    // style={{ backgroundImage: 'url(/hero-background.jpg)' }}
    <div className="relative w-full overflow-hidden bg-limestone dark:bg-charcoal">
      <div className="container relative z-10 flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <FadeIn delay={0.2} duration={0.8}>
            <h1 className="text-4xl font-extrabold tracking-tighter text-charcoal dark:text-pearl sm:text-5xl md:text-6xl lg:text-7xl">
              A Digital Sanctuary for the Senses
            </h1>
          </FadeIn>

          <FadeIn delay={0.4} duration={0.8}>
            <p className="mt-6 max-w-xl text-lg text-charcoal/80 dark:text-pearl/80">
              Explore our collection of premium, natural aromatherapy products designed to
              transform your space and elevate your well-being.
            </p>
          </FadeIn>

          <FadeIn delay={0.6} duration={0.8}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="px-8 py-6 text-base">
                  Explore The Collection
                </Button>
              </Link>
              <Link href="/journal">
                <Button size="lg" variant="secondary" className="px-8 py-6 text-base">
                  Read Our Journal
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Optional: Add subtle decorative elements */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/50 to-transparent dark:from-black/50"
        aria-hidden="true"
      />
    </div>
  )
}

```

# app/(shop)/products/[slug]/page.tsx
```tsx
// app/(shop)/products/[slug]/page.tsx
import { serverApi } from '@/lib/api/trpc'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { ProductInfo } from '@/components/features/product/ProductInfo'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await serverApi.product.bySlug.query({ slug: params.slug })

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.shortDescription || product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await serverApi.product.bySlug.query({ slug: params.slug })

  if (!product) {
    notFound()
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image Gallery Section */}
        <div className="relative aspect-square">
          {product.images?.[0]?.url && (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          )}
        </div>

        {/* Product Information Section */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}

```

# app/(shop)/products/page.tsx
```tsx
// app/(shop)/products/page.tsx
import { serverApi } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'

export const metadata = {
  title: 'All Products',
  description: 'Explore our full collection of premium, natural aromatherapy products.',
}

export default async function ProductsPage() {
  // Fetch data on the server using our tRPC server client
  const productListData = await serverApi.product.list.query({ limit: 12 })

  return (
    <div className="container py-10">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover scents that soothe, uplift, and transform. Each product is crafted with the
          purest ingredients to elevate your daily rituals.
        </p>
      </section>

      {productListData.items.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productListData.items.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
      {/* Pagination can be added here later */}
    </div>
  )
}

```

# app/api/webhooks/stripe/route.ts
```ts
import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Stripe webhook logic
  return NextResponse.json({ received: true })
}

```

# app/api/auth/[...nextauth]/route.ts
```ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth/config'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

```

# app/api/health/route.ts
```ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

```

# app/api/trpc/[trpc]/route.ts
```ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined,
  })

export { handler as GET, handler as POST }

```

# app/not-found.tsx
```tsx
"use client"
import React from "react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-limestone text-charcoal">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="px-6 py-2 rounded bg-sage text-white hover:bg-deep-sage transition">Go Home</a>
    </div>
  )
}

```

# app/globals.css
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

# components/animations/FadeIn.tsx
```tsx
// components/animations/FadeIn.tsx
'use client'

import { motion, Variants } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export function FadeIn({ children, duration = 0.5, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

```

# components/providers/AuthProvider.tsx
```tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

```

# components/providers/TrpcProvider.tsx
```tsx
// components/providers/TrpcProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import superjson from 'superjson'

import { api } from '@/lib/api/trpc'

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    }),
  )
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  )
}

```

# components/providers/ThemeProvider.tsx
```tsx
"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "day" | "night"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "day"
    }
    return "day"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => setThemeState((prev) => (prev === "day" ? "night" : "day"))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

```

# components/features/product/ProductCard.tsx
```tsx
// components/features/product/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import type { ProductCardType } from '@/types'

interface ProductCardProps {
  product: ProductCardType
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // In a future step, this will call a "useCart" hook.
    console.log(`Adding ${product.name} to cart.`)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className={cn('overflow-hidden transition-shadow hover:shadow-lg', className)}>
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <Image
              src={primaryImage?.url || '/placeholder.jpg'}
              alt={primaryImage?.altText || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
          <p className="mt-2 text-xl font-semibold">
            ${primaryVariant?.price.toString() ?? product.price.toString()}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

```

# components/features/product/ProductCard.test.tsx
```tsx
// components/features/product/ProductCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'
import type { ProductCardType } from '@/types'

const mockProduct: ProductCardType = {
  id: '1',
  name: 'Lavender Dreams',
  slug: 'lavender-dreams',
  price: 29.99,
  images: [{ url: '/lavender.jpg', altText: 'A bottle of lavender oil' }],
  variants: [{ price: 29.99 }],
  // Add other required fields from Product model with dummy data
  sku: 'LD-001',
  description: ' calming lavender oil',
  shortDescription: 'Calming oil',
  isActive: true,
  isFeatured: false,
  scentNotes: {},
  ingredients: ['lavender'],
  usageInstructions: 'Apply to pulse points.',
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryId: 'cat1',
  brandId: 'brand1',
}

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Lavender Dreams')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /a bottle of lavender oil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})

```

# components/features/product/ProductInfo.tsx
```tsx
// components/features/product/ProductInfo.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { serverApi } from '@/lib/api/trpc'

type Product = Awaited<ReturnType<typeof serverApi.product.bySlug.query>>

interface ProductInfoProps {
  product: NonNullable<Product>
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // In a future step, this will call a "useCart" hook with the selected variant and quantity
    console.log(`Adding ${quantity} of ${product.name} to cart.`)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <p className="text-3xl">${product.price.toString()}</p>
      <p className="text-base text-muted-foreground">{product.shortDescription}</p>

      <div className="mt-6 flex items-center gap-4">
        {/* Quantity selector can be added here */}
        <Button size="lg" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <div className="prose prose-sm mt-4 text-muted-foreground">{product.description}</div>
      </div>
    </div>
  )
}

```

# components/common/Card.tsx
```tsx
// components/common/Card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-limestone text-charcoal shadow-sm dark:bg-midnight dark:text-pearl dark:border-neutral-800',
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# components/common/Layout/Header.tsx
```tsx
// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/common/Button'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 text-lg font-semibold"
          >
            The Scent
          </Link>
          <Link
            href="/products"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Products
          </Link>
          <Link
            href="/journal"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Journal
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}

```

# components/common/Layout/Footer.tsx
```tsx
// components/common/Layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-balance text-center text-sm leading-loose text-foreground/60 md:text-left">
          &copy; {new Date().getFullYear()} The Scent. All Rights Reserved.
        </p>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/terms"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

```

# components/common/Button.tsx
```tsx
// components/common/Button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-sage text-pearl hover:bg-deep-sage',
        secondary:
          'border border-sage bg-transparent text-charcoal hover:bg-sage/10 dark:text-pearl',
        destructive: 'bg-terracotta text-pearl hover:bg-terracotta/90',
        ghost: 'hover:bg-charcoal/10 dark:hover:bg-pearl/10',
        link: 'text-charcoal underline-offset-4 hover:underline dark:text-pearl',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

```

# components/common/Card.test.tsx
```tsx
// components/common/Card.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './Card'

describe('Card Component', () => {
  test('renders all parts of the card correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content goes here.')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })
})

```

# components/common/Button.test.tsx
```tsx
// components/common/Button.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: /click me/i })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('bg-sage') // Primary variant
  })

  test('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const buttonElement = screen.getByRole('button', { name: /secondary/i })
    expect(buttonElement).toHaveClass('border-sage')
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const buttonElement = screen.getByRole('button', { name: /clickable/i })
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when the disabled prop is true', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    )
    const buttonElement = screen.getByRole('button', { name: /disabled/i })
    expect(buttonElement).toBeDisabled()
    fireEvent.click(buttonElement)
    expect(handleClick).not.toHaveBeenCalled()
  })
})

```

# lib/db/client.ts
```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

```

# lib/utils.ts
```ts
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to conditionally join class names together.
 * It also merges Tailwind CSS classes without style conflicts.
 * @param inputs - A list of class values (strings, objects, arrays).
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# lib/validation/schemas.ts
```ts
import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email(),
})

export const passwordSchema = z.string().min(8)

```

# lib/auth/config.ts
```ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db/client'
import { compare } from 'bcryptjs'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Note: In a real app, ensure these environment variables are set.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        if (!user || !user.passwordHash) return null

        const isValid = await compare(parsed.data.password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    // Add other pages as they are built
    // error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

```

# lib/auth/rbac.ts
```ts
import { Session } from 'next-auth'

export const permissions = {
  'settings:manage': ['staff'],
  'order:view': ['customer', 'staff'],
  'product:edit': ['staff'],
} as const

export type Permission = keyof typeof permissions
export type AllowedRole = (typeof permissions)[Permission][number]

export function hasPermission(session: Session | null, permission: Permission): boolean {
  if (!session?.user?.role) return false
  const allowedRoles = [...permissions[permission]] as string[]
  return allowedRoles.includes(session.user.role)
}

export function requirePermission(session: Session | null, permission: Permission): void {
  if (!hasPermission(session, permission)) {
    throw new Error('Unauthorized')
  }
}

```

# lib/api/trpc.ts
```ts
// lib/api/trpc.ts
import { createTRPCReact } from '@trpc/react-query'
import { type AppRouter } from '@/server/routers'
import { httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

/**
 * A set of typesafe hooks for consuming your tRPC API.
 */
export const api = createTRPCReact<AppRouter>()

/**
 * A tRPC client that can be used to call the API from the server.
 */
export const serverApi = api.createClient({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  ],
})

```

# lib/payments/stripe.ts
```ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

```

# lib/email/sender.ts
```ts
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export { sgMail }

```

# lib/search/algolia.ts
```ts
import algoliasearch from 'algoliasearch'

export const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
)

```

# lib/storage/s3.ts
```ts
import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

```

# prisma/schema.prisma
```prisma
// prisma/schema.prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = [] // "jsonProtocol" removed as it's now stable
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_DIRECT_URL")
}

enum OrderStatus {
  pending
  processing
  shipped
  delivered
  cancelled
  refunded
}

enum UserRole {
  customer
  staff
  admin
}

enum DiscountType {
  percentage
  fixed_amount
}

model User {
  id                String             @id @default(uuid())
  email             String             @unique
  emailVerified     DateTime?
  passwordHash      String?
  role              UserRole           @default(customer)
  firstName         String?
  lastName          String?
  avatarUrl         String?
  stripeCustomerId  String?            @unique
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  preferences       UserPreference?
  sessions          Session[]
  reviews           Review[]
  addresses         Address[]
  orders            Order[]
  wishlists         Wishlist[]
  emailSubscription EmailSubscription?
  cart              Cart?

  @@index([email])
}

model UserPreference {
  id                 String   @id @default(uuid())
  theme              String   @default("light")
  emailNotifications Boolean  @default(true)
  language           String   @default("en")
  currency           String   @default("USD")
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  userId             String   @unique
  user               User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  imageUrl    String?
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[]

  @@index([slug])
}

model Brand {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  logoUrl     String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[]
}

model Product {
  id                String           @id @default(uuid())
  sku               String           @unique
  name              String
  slug              String           @unique
  description       String?
  shortDescription  String?
  price             Decimal          @db.Decimal(10, 2)
  isActive          Boolean          @default(true)
  isFeatured        Boolean          @default(false)
  scentNotes        Json             @default("{}")
  ingredients       String[]
  usageInstructions String?
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  categoryId        String
  category          Category         @relation(fields: [categoryId], references: [id])
  brandId           String?
  brand             Brand?           @relation(fields: [brandId], references: [id])
  variants          ProductVariant[]
  images            ProductImage[]
  reviews           Review[]
  wishlists         Wishlist[]
  orderItems        OrderItem[]

  @@index([slug])
  @@index([categoryId])
}

model ProductVariant {
  id                String      @id @default(uuid())
  sku               String      @unique
  name              String
  price             Decimal     @db.Decimal(10, 2)
  inventoryQuantity Int         @default(0)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  productId         String
  product           Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  cartItems         CartItem[]
  wishlists         Wishlist[]
  orderItems        OrderItem[]

  @@index([productId])
  @@index([sku])
}

model ProductImage {
  id        String   @id @default(uuid())
  url       String
  altText   String?
  position  Int      @default(0)
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Review {
  id                 String        @id @default(uuid())
  rating             Int
  title              String?
  comment            String?
  isVerifiedPurchase Boolean       @default(false)
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
  productId          String
  product            Product       @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId             String
  user               User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  images             ReviewImage[]

  @@index([productId])
  @@index([userId])
}

model ReviewImage {
  id       String @id @default(uuid())
  url      String
  reviewId String
  review   Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
}

model Cart {
  id        String     @id @default(uuid())
  userId    String?    @unique
  sessionId String?    @unique
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  user      User?      @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
}

model CartItem {
  id        String         @id @default(uuid())
  quantity  Int
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt
  cartId    String
  cart      Cart           @relation(fields: [cartId], references: [id], onDelete: Cascade)
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)

  @@unique([cartId, variantId])
}

model Address {
  id            String   @id @default(uuid())
  type          String   @default("shipping")
  isDefault     Boolean  @default(false)
  firstName     String
  lastName      String
  addressLine1  String
  addressLine2  String?
  city          String
  stateProvince String
  postalCode    String
  countryCode   String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  shippingOrders Order[] @relation("ShippingAddress")
  billingOrders  Order[] @relation("BillingAddress")
}

model Order {
  id                String      @id @default(uuid())
  orderNumber       String      @unique
  status            OrderStatus @default(pending)
  total             Decimal     @db.Decimal(10, 2)
  notes             String?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  userId            String
  user              User        @relation(fields: [userId], references: [id], onDelete: NoAction)
  shippingAddressId String
  shippingAddress   Address     @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  billingAddressId  String
  billingAddress    Address     @relation("BillingAddress", fields: [billingAddressId], references: [id])
  items             OrderItem[]
  appliedCoupons    Json?

  @@index([userId])
}

model OrderItem {
  id        String         @id @default(uuid())
  quantity  Int
  price     Decimal        @db.Decimal(10, 2)
  orderId   String
  order     Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: NoAction)
  productId String
  product   Product        @relation(fields: [productId], references: [id], onDelete: NoAction)
}

model Coupon {
  id            String       @id @default(uuid())
  code          String       @unique
  discountType  DiscountType
  discountValue Decimal      @db.Decimal(10, 2)
  isActive      Boolean      @default(true)
  validUntil    DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Wishlist {
  id        String         @id @default(uuid())
  createdAt DateTime       @default(now())
  userId    String
  user      User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  productId String
  product   Product        @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, variantId])
  @@unique([userId, productId])
}

model EmailSubscription {
  id           String   @id @default(uuid())
  email        String   @unique
  isActive     Boolean  @default(true)
  subscribedAt DateTime @default(now())
  userId       String?  @unique
  user         User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
}

```

# prisma/migrations/migration_lock.toml
```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

# prisma/migrations/20250625035634_test/migration.sql
```sql
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'staff', 'admin');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('percentage', 'fixed_amount');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'customer',
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarUrl" TEXT,
    "stripeCustomerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'en',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "scentNotes" JSONB NOT NULL DEFAULT '{}',
    "ingredients" TEXT[],
    "usageInstructions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "brandId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "inventoryQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "isVerifiedPurchase" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "ReviewImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cartId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'shipping',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "stateProvince" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "total" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "shippingAddressId" TEXT NOT NULL,
    "billingAddressId" TEXT NOT NULL,
    "appliedCoupons" JSONB,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "orderId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSubscription" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "EmailSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE INDEX "ProductVariant_sku_idx" ON "ProductVariant"("sku");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_sessionId_key" ON "Cart"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_variantId_key" ON "CartItem"("cartId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_variantId_key" ON "Wishlist"("userId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_productId_key" ON "Wishlist"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscription_email_key" ON "EmailSubscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscription_userId_key" ON "EmailSubscription"("userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewImage" ADD CONSTRAINT "ReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSubscription" ADD CONSTRAINT "EmailSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# prisma/seed.ts
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@scent.com' },
    update: {},
    create: {
      email: 'test@scent.com',
      name: 'Test User',
      password: 'password',
      role: 'customer',
    },
  })

  // Seed a category
  const category = await prisma.category.upsert({
    where: { slug: 'aromatherapy' },
    update: {},
    create: {
      name: 'Aromatherapy',
      slug: 'aromatherapy',
    },
  })

  // Seed a product
  await prisma.product.upsert({
    where: { slug: 'lavender-oil' },
    update: {},
    create: {
      name: 'Lavender Essential Oil',
      slug: 'lavender-oil',
      description: 'Premium lavender oil for relaxation.',
      price: 29.99,
      categoryId: category.id,
      isActive: true,
      isFeatured: true,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

```

# public/vercel.svg
```svg
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
```

# public/globe.svg
```svg
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
```

# public/next.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
```

# public/window.svg
```svg
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
```

# public/file.svg
```svg
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
```

# server/context.ts
```ts
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'
import { authOptions } from '@/lib/auth/config'

export async function createContext() {
  const session = await getServerSession(authOptions)
  return { session, prisma }
}

export type Context = Awaited<ReturnType<typeof createContext>>

```

# server/trpc.ts
```ts
import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from './context'
import superjson from 'superjson'
import { ZodError } from 'zod'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const router = t.router
export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { ...ctx, session: ctx.session } })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

```

# server/routers/order.ts
```ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@/lib/db/client'
import type { Context } from '../context'

export const orderRouter = router({
  all: protectedProcedure.query(async ({ ctx }: { ctx: Context }) => {
    const userId = ctx.session?.user?.id
    if (!userId) throw new Error('Unauthorized')
    return prisma.order.findMany({ where: { userId } })
  }),
})

```

# server/routers/cart.ts
```ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@/lib/db/client'
import type { Context } from '../context'

export const cartRouter = router({
  get: protectedProcedure.query(async ({ ctx }: { ctx: Context }) => {
    const userId = ctx.session?.user?.id
    if (!userId) throw new Error('Unauthorized')
    return prisma.cart.findFirst({ where: { userId }, include: { items: true } })
  }),
})

```

# server/routers/product.ts
```ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const productRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        cursor: z.string().nullish(), // For cursor-based pagination
        category: z.string().optional(),
        sortBy: z.enum(['price', 'createdAt']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: input.limit + 1,
        where: {
          isActive: true,
          category: input.category ? { slug: input.category } : undefined,
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          [input.sortBy]: input.sortOrder,
        },
        include: {
          variants: {
            orderBy: {
              price: 'asc',
            },
            take: 1,
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      })

      let nextCursor: typeof input.cursor | undefined = undefined
      if (products.length > input.limit) {
        const nextItem = products.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: products,
        nextCursor,
      }
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: { slug: input.slug, isActive: true },
        include: {
          variants: true,
          images: true,
          reviews: {
            include: {
              user: {
                select: {
                  firstName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          category: true,
          brand: true,
        },
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with slug "${input.slug}" not found.`,
        })
      }

      return product
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        slug: z.string().min(3),
        sku: z.string().min(3),
        description: z.string().optional(),
        price: z.number(),
        categoryId: z.string().uuid(),
        // ... more fields
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.session.user
      if (role !== 'admin' && role !== 'staff') {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }

      // In a real implementation, you would create the product and its first variant
      // in a transaction. This is a simplified example.
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          slug: input.slug,
          sku: input.sku,
          description: input.description,
          price: input.price,
          categoryId: input.categoryId,
        },
      })
      return product
    }),
})

```

# server/routers/user.ts
```ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { prisma } from '@/lib/db/client'
import type { Context } from '../context'

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }: { ctx: Context }) => {
    return ctx.session?.user
  }),
})

```

# server/routers/index.ts
```ts
import { productRouter } from './product'
import { cartRouter } from './cart'
import { orderRouter } from './order'
import { userRouter } from './user'
import { router } from '../trpc'

export const appRouter = router({
  product: productRouter,
  cart: cartRouter,
  order: orderRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter

```

# store/ui.store.ts
```ts
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

```

# types/index.d.ts
```ts
// types/index.d.ts
import type { Product, ProductImage, ProductVariant } from '@prisma/client'

export type ProductCardType = Product & {
  variants: Pick<ProductVariant, 'price'>[]
  images: Pick<ProductImage, 'url' | 'altText'>[]
}

```

# types/next-auth.d.ts
```ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string
      role?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  interface User {
    id: string
    role?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

```

# types/database.d.ts
```ts
// Custom types for The Scent database models (extend as needed)
import type {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  ProductVariant,
  ProductImage,
  Wishlist,
  Coupon,
  Address,
  EmailSubscription,
} from '@prisma/client'

export type { User, Product, Category, Cart, CartItem, Order, OrderItem, Review, ProductVariant, ProductImage, Wishlist, Coupon, Address, EmailSubscription }

// Example: Extended type for product with variants and images
export interface ProductWithVariantsAndImages extends Product {
  variants: ProductVariant[]
  images: ProductImage[]
}

```

# tests/e2e/shop.spec.ts
```ts
// tests/e2e/shop.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Shopping Flow', () => {
  test('User can navigate from PLP to PDP', async ({ page }) => {
    // Navigate to the Product Listing Page (PLP)
    await page.goto('/products')

    // Verify the page title is correct
    await expect(page).toHaveTitle(/All Products/)
    const heading = page.getByRole('heading', { name: 'Our Collection' })
    await expect(heading).toBeVisible()

    // Find the first product card and get its name
    const firstProductCard = page.locator('a.group').first()
    await expect(firstProductCard).toBeVisible()
    const productName = await firstProductCard.getByRole('heading').textContent()
    expect(productName).not.toBeNull()

    // Click the first product card to navigate to the Product Detail Page (PDP)
    await firstProductCard.click()

    // Verify the URL has changed to the product's slug
    await expect(page).toHaveURL(/\/products\//)

    // Verify the PDP shows the correct product name in its heading
    const pdpHeading = page.getByRole('heading', { name: productName! })
    await expect(pdpHeading).toBeVisible()

    // Verify the page title now reflects the product name
    await expect(page).toHaveTitle(new RegExp(productName!))
  })
})

```

# tests/setup/jest.setup.ts
```ts
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

```

# README.md
```md
# 🌿 The Scent — Luxury Aromatherapy E-Commerce Platform

> _A world-class digital sanctuary where the art of aromatherapy meets cutting-edge web innovation.  
> Modern UI, immersive experiences, and production-quality code._

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Features](#features)
3. [System Architecture Overview](#system-architecture-overview)
4. [Codebase Structure](#codebase-structure)
5. [Technology Stack](#technology-stack)
6. [Getting Started (Development)](#getting-started-development)
7. [Accessibility & Inclusivity](#accessibility--inclusivity)
8. [Contribution Guide](#contribution-guide)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [License](#license)
11. [Credits](#credits)

---

## Executive Summary

**The Scent** is a new standard in luxury e-commerce, blending modern design, advanced personalization, and immersive product discovery. This platform is meticulously crafted to transform the intangible essence of scent into a digital experience—emotionally engaging, visually stunning, and technically robust.

Built on the latest web technologies, The Scent features:
- **Next.js 15** with App Router & React Server Components
- **Tailwind CSS 4** with a custom design system for day/night luxury themes
- **Type-Safe, Modular Backend** with tRPC, Prisma (Postgres), and seamless third-party integrations (Stripe, SendGrid, Algolia, S3)
- **Modern DevOps** with monorepo, CI/CD, and comprehensive test coverage

> **Purpose:**  
> To deliver a sensory-rich, high-performance, and accessible online retail experience for discerning wellness and luxury customers.

---

## Features

- **Immersive Product Discovery**: 3D views, ingredient exploration, interactive scent profiles
- **AI-Driven Personalization**: Mood-based recommendations, scent memory timeline, custom blend creator
- **Luxury Unboxing**: Virtual unboxing previews, editorial storytelling
- **Advanced Filtering & Search**: NLP-powered search, visual/mood filters, season/time recommendations
- **Day/Night Mode**: Adaptive luxury color palettes and atmospheres
- **Seamless Shopping & Checkout**: Single-page checkout, multiple payment methods, live cart harmonization
- **Comprehensive User Dashboard**: Orders, scent profiles, subscriptions, rewards, wellness calendar
- **Performance & Accessibility**: Core Web Vitals optimized, WCAG 2.1 AA, internationalization
- **Content Marketing**: Magazine-style blog, guides, and educational modules

---

## System Architecture Overview

The Scent leverages a **modular, component-driven, and cloud-native architecture** for scalability and maintainability.  
Below is a high-level interaction diagram:

```
           ┌──────────────────────┐
           │        Users         │
           │ (Web & Mobile Browsers)
           └─────────┬────────────┘
                     │
             HTTPS Requests
                     │
           ┌─────────▼────────────┐
           │  Vercel Edge/CDN     │
           │  (Cloudflare CDN)    │
           └─────────┬────────────┘
                     │
           ┌─────────▼────────────┐
           │    Next.js App       │
           │ (SSR + RSC + API)    │
           └─────────┬────────────┘
                     │
       ┌─────────────┼──────────────┐
       │             │              │
┌──────▼─────┐ ┌─────▼──────┐ ┌─────▼─────┐
│ Prisma ORM │ │  tRPC API  │ │ Auth.js   │
│ PostgreSQL │ │  Routers   │ │ Sessions  │
└──────┬─────┘ └─────┬──────┘ └─────┬─────┘
       │             │              │
       │     ┌───────▼──────────┐   │
       │     │ External Services │   │
       │     │ Stripe, SendGrid, │   │
       └────►│ Algolia, S3, CMS │◄──┘
             └──────────────────┘
```

**Key Notes:**
- **Frontend:** React 19, Next.js 15 App Router, Tailwind 4, Framer Motion, Three.js
- **Backend:** Next.js API routes & tRPC (strict TypeScript), Prisma/Postgres, Auth.js
- **Infrastructure:** Vercel (serverless/edge), Cloudflare CDN, Cloudinary (images), AWS S3
- **Integrations:** Stripe (payments), SendGrid (email), Algolia (search), Sanity (CMS)
- **State Management:** Zustand (global), React Context (per-feature)

---

## Codebase Structure

A modular monorepo for optimal separation of concerns and scalability.

```
the-scent/
├── app/                # Next.js App Router pages/layouts (SSR & API)
│   ├── (auth)/         # Authentication (login/register)
│   ├── (marketing)/    # Content (blog, about, guides)
│   ├── (shop)/         # Shop pages (products, cart, checkout)
│   ├── account/        # User dashboard (orders, profile, rewards)
│   ├── api/            # API routes (tRPC, auth, webhooks)
│   ├── globals.css     # Global CSS (Tailwind base)
│   └── layout.tsx      # Root layout (theme, fonts, header/footer)
├── components/         # UI & feature components
│   ├── common/         # Design system: Button, Card, Modal, etc.
│   ├── features/       # Domain features: product, cart, checkout, search
│   ├── icons/          # SVG icon components
│   └── providers/      # Theme/Auth/Cart React providers
├── hooks/              # Custom React hooks
├── lib/                # Utilities, integrations, backend logic
│   ├── api/            # API clients
│   ├── auth/           # Auth.js config, RBAC, helpers
│   ├── db/             # Prisma client, migrations
│   ├── email/          # SendGrid integration
│   ├── payments/       # Stripe integration
│   ├── search/         # Algolia integration
│   ├── storage/        # S3 integration
│   ├── validation/     # Zod schemas, sanitization
│   └── utils/          # Constants, formatters, helpers
├── prisma/             # Prisma schema, migrations, seed scripts
├── public/             # Static assets (fonts, images, icons, manifest)
├── server/             # tRPC routers, backend context
├── store/              # Zustand global state stores
├── styles/             # SCSS/CSS modules and design tokens
├── tests/              # Unit, integration, and e2e test suites
├── types/              # TypeScript type definitions
├── .github/            # Workflows (CI/CD), issue templates
├── .husky/             # Git hooks (pre-commit, pre-push)
├── .env.example        # Example environment variables
├── README.md
└── ...config files     # (package.json, tailwind.config.ts, etc.)
```

> _See [docs/Project_Architecture_Document.md](docs/Project_Architecture_Document.md) for a full breakdown of every directory and file purpose._

---

## Technology Stack

**Frontend**
- [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animation)
- [Three.js](https://threejs.org/) (3D product views)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)

**Backend & API**
- [tRPC](https://trpc.io/) (type-safe API)
- [Prisma](https://www.prisma.io/) ORM ([PostgreSQL 16](https://www.postgresql.org/))
- [Auth.js (NextAuth)](https://authjs.dev/) (authentication, social & email)
- [Stripe](https://stripe.com/) (payments)
- [SendGrid](https://sendgrid.com/) (email)
- [Algolia](https://www.algolia.com/) (search)
- [AWS S3](https://aws.amazon.com/s3/) (media storage)
- [Sanity](https://www.sanity.io/) (CMS)

**DevOps & Tooling**
- [Vercel](https://vercel.com/) (hosting, edge, CDN)
- [Cloudflare](https://www.cloudflare.com/) (global CDN)
- [GitHub Actions](https://github.com/features/actions) (CI/CD)
- [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [Commitizen](https://commitizen-tools.github.io/commitizen/)
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/), [Playwright](https://playwright.dev/) (testing)
- [Sentry](https://sentry.io/), [Vercel Analytics](https://vercel.com/analytics) (monitoring)
- [TypeScript 5+](https://www.typescriptlang.org/) (strict mode, end-to-end)

---

## Getting Started (Development)

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm 8+](https://pnpm.io/) (used as package manager)
- [PostgreSQL 16+](https://www.postgresql.org/)
- [Vercel CLI](https://vercel.com/docs/cli) *(optional: for full stack/edge emulation)*
- (Optional) [Docker](https://www.docker.com/) for local database

### 1. Clone the Repository

```bash
git clone https://github.com/nordeim/Scent-Beautiful-Website.git
cd Scent-Beautiful-Website
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

- Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

- Fill in values for:
  - `DATABASE_URL` (Postgres connection string)
  - `STRIPE_SECRET_KEY`, `SENDGRID_API_KEY`, etc.
  - Social login keys (Google, etc.)
  - See the [Execution Plan](docs/Execution_Plan.md#phase-2-core-domain-models--database) for details.

### 4. Set Up the Database

You can use local Postgres or Docker:

<details>
<summary>Postgres via Docker</summary>

```bash
docker run --name scent-postgres -e POSTGRES_PASSWORD=dev -p 5432:5432 -d postgres:16
```

Set your `.env.local`:

```
DATABASE_URL=postgresql://postgres:dev@localhost:5432/postgres
```
</details>

- Run migrations & seed data:

```bash
pnpm prisma migrate deploy
pnpm prisma db seed
```

### 5. Generate the Prisma Client

```bash
pnpm prisma generate
```

### 6. Start the Development Server

```bash
pnpm dev
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

### 7. Run Tests

- **Unit & Integration:**
  ```bash
  pnpm test
  ```
- **End-to-End (E2E):**
  ```bash
  pnpm test:e2e
  ```
- **Linting & Formatting:**
  ```bash
  pnpm lint
  pnpm format
  ```

### 8. Optional: Vercel CLI for Full Stack/Edge

```bash
vercel dev
```

---

## Accessibility & Inclusivity

- **WCAG 2.1 AA** compliance: keyboard navigation, semantic HTML, ARIA, color contrast
- **Internationalization:** Full i18n/RTL support, currency localization
- **Reduced Motion & High Contrast Modes:** Respects user system preferences
- **Screen Reader Optimization:** Custom focus indicators, skip links, contextual labels

_See the PRD and Architecture docs for a detailed accessibility implementation blueprint._

---

## Contribution Guide

We welcome contributions from the open source community and luxury e-commerce enthusiasts!

1. **Fork & clone** the repository.
2. **Create a new branch** for your feature or bugfix.
3. **Follow the code style**:  
   - TypeScript strict  
   - Tailwind CSS best practices  
   - [Conventional Commits](https://www.conventionalcommits.org/)
4. **Test your changes** locally and with `pnpm test`.
5. **Lint & format** your code: `pnpm lint && pnpm format`.
6. **Open a Pull Request** describing your changes.

Please read the [Execution Plan](docs/Execution_Plan.md) to understand the project’s structure and development flow.

---

## Testing & Quality Assurance

- **Unit Tests**: Components, utils, logic ([Jest](https://jestjs.io/))
- **Integration Tests**: API endpoints, backend logic
- **E2E Tests**: User flows ([Playwright](https://playwright.dev/))
- **Performance**: Core Web Vitals, Lighthouse
- **Security**: Input validation, RBAC, security headers

Run all tests before submitting a PR.  
See [docs/Project_Architecture_Document.md](docs/Project_Architecture_Document.md) for CI/CD and QA details.

---

## License

[MIT](LICENSE)

---

## Credits

- **Product, design, and code:** [@nordeim](https://github.com/nordeim)
- **Architecture, PRD, & execution plan:** See [docs/](docs/)
- **Inspired by**: The world’s finest luxury e-commerce experiences and the transformative power of digital wellness.

---

> _For feature requests, issues, or questions, please open an [issue](https://github.com/nordeim/Scent-Beautiful-Website/issues) or reach out via GitHub discussions._

---

**The Scent**  
*— Where technology meets the soul of scent.*

```

