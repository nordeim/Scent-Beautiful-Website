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

# .pnpmfile.cjs
```cjs
function readPackage(pkg) {
  if (
    pkg.name === '@prisma/client' ||
    pkg.name === '@prisma/engines' ||
    pkg.name === 'prisma'
  ) {
    pkg.scripts = {
      ...pkg.scripts,
      'prisma:postinstall': 'prisma generate',
      postinstall: 'prisma generate',
    };
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};

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

# .env.local
```local
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
STRIPE_PUBLIC_KEY="pk_test_51RLNNX4axRnYhkNVHz16qi7Gq4UnX5LDalYvXf3lIqneXziRQFrzrk0e4dMyBqaKQ8IxmJhSqtpiApC2TaBcIQqS00NJG40ELn"
STRIPE_SECRET_KEY="sk_test_51RLNNX4axRnYhkNVVM6I6jESZEGNKiI6ALCYm5dEzDLqqA17H0BkTz2Jvq3I3jmeBEFmUDN73AKKiL1Dj5omE2iJ00yutlxS1C"
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

#---------------------------------
# CMS (Sanity.io)
#---------------------------------
# Get these from your Sanity project settings: https://www.sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID="dhkgbikf"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-06-28"
# Optional: Create a read-only token for production builds if your dataset is private
# SANITY_API_READ_TOKEN="REPLACE_WITH_YOUR_SANITY_TOKEN"


```

# bulk_load_products.json
```json
[
  {
    "id": "prod_5",
    "sku": "SOAP-OAT-02",
    "name": "Oat & Honey Soap",
    "slug": "oat-and-honey-soap",
    "description": "A gentle, exfoliating soap bar made with colloidal oatmeal and raw honey. Perfect for soothing sensitive or irritated skin while providing a rich, comforting lather.",
    "shortDescription": "Soothing and exfoliating oatmeal soap.",
    "price": 13.50,
    "isActive": true,
    "isFeatured": true,
    "category": {
      "name": "Natural Soaps",
      "slug": "natural-soaps"
    },
    "variants": [
      {
        "sku": "SOAP-OAT-02-BAR",
        "name": "120g Bar",
        "price": 13.50,
        "inventoryQuantity": 200
      }
    ],
    "images": [
      {
        "url": "/images/products/prod_5.jpg",
        "altText": "A handcrafted bar of oat and honey soap on a wooden surface.",
        "isPrimary": true
      }
    ]
  },
  {
    "id": "prod_6",
    "sku": "EO-SLEEP-04",
    "name": "Peaceful Night Blend",
    "slug": "peaceful-night-blend",
    "description": "A serene blend of Lavender, Chamomile, and Sandalwood essential oils, expertly crafted to promote deep relaxation and a restful night's sleep. Ideal for evening diffusion.",
    "shortDescription": "A calming blend for restful sleep.",
    "price": 32.00,
    "isActive": true,
    "isFeatured": false,
    "category": {
      "name": "Essential Oils",
      "slug": "essential-oils"
    },
    "variants": [
      {
        "sku": "EO-SLEEP-04-15ML",
        "name": "15ml Bottle",
        "price": 32.00,
        "inventoryQuantity": 75
      }
    ],
    "images": [
      {
        "url": "/images/products/prod_6.jpg",
        "altText": "A dark glass bottle of Peaceful Night essential oil blend next to a sleeping mask.",
        "isPrimary": true
      }
    ]
  }
]

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
    "test:e2e": "playwright test"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.600.0",
    "@hookform/resolvers": "^5.1.1",
    "@next-auth/prisma-adapter": "^1.0.7",
    "@portabletext/react": "^3.2.1",
    "@prisma/client": "^6.10.1",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.12",
    "@react-three/drei": "^9.115.0",
    "@react-three/fiber": "^8.17.10",
    "@sendgrid/mail": "^8.1.3",
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.4.0",
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
    "next-sanity": "^0.8.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-hook-form": "^7.58.1",
    "stripe": "^16.2.0",
    "superjson": "^2.2.1",
    "tailwind-merge": "^3.3.1",
    "three": "^0.177.0",
    "three-mesh-bvh": "^0.8.0",
    "zod": "^3.23.8",
    "zustand": "^4.5.4"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15.3.4",
    "@playwright/test": "^1.45.1",
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.14.9",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.177.0",
    "autoprefixer": "^10.4.21",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.5.6",
    "prisma": "^6.10.1",
    "tailwindcss": "^3.4.17",
    "ts-node": "^10.9.2",
    "tsx": "^4.20.3",
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

# pnpm-workspace.yaml
```yaml
onlyBuiltDependencies:
  - '@prisma/client'
  - '@prisma/engines'
  - prisma

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
  yOffset?: number
}

export function FadeIn({ children, duration = 0.6, delay = 0, className, yOffset = 20 }: FadeInProps) {
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: 'easeOut' }}
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

# components/providers/Providers.tsx
```tsx
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

```

# components/features/account/UpdatePasswordForm.tsx
```tsx
// components/features/account/UpdatePasswordForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema, TPasswordChangeSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useState } from 'react'

export function UpdatePasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TPasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
  })

  const updatePassword = api.user.updatePassword.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message)
      reset()
    },
    onError: (error) => {
      setError('root', { message: error.message || 'An unexpected error occurred.' })
    },
  })

  const onSubmit = (data: TPasswordChangeSchema) => {
    setSuccessMessage(null) // Clear previous messages
    updatePassword.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Choose a strong, new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="currentPassword">Current Password</label>
            <Input id="currentPassword" type="password" {...register('currentPassword')} />
            {errors.currentPassword && <p className="error-text">{errors.currentPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="newPassword">New Password</label>
            <Input id="newPassword" type="password" {...register('newPassword')} />
            {errors.newPassword && <p className="error-text">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          {successMessage && <p className="text-sm font-medium text-primary">{successMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

```

# components/features/account/ManageAddresses.tsx
```tsx
// components/features/account/ManageAddresses.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { AddressFormDialog } from './AddressFormDialog' // Import the new dialog

export function ManageAddresses() {
  const utils = api.useUtils()
  const { data: addresses, isLoading } = api.address.list.useQuery()

  const deleteAddress = api.address.delete.useMutation({
    onSuccess: () => {
      utils.address.list.invalidate()
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress.mutate({ id })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Shipping Addresses</CardTitle>
          <CardDescription>Manage your saved addresses.</CardDescription>
        </div>
        {/* "Add New" button now triggers the dialog in create mode */}
        <AddressFormDialog
          trigger={
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-muted-foreground text-center py-4">Loading addresses...</p>}
        <div className="space-y-4">
          {addresses?.map((address) => (
            <div key={address.id} className="p-4 border rounded-md flex justify-between items-start gap-4">
              <div className="flex-grow">
                <p className="font-semibold">{address.firstName} {address.lastName}</p>
                <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
                <p className="text-sm text-muted-foreground">{address.city}, {address.stateProvince} {address.postalCode}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                {address.isDefault && <Badge variant="secondary">Default</Badge>}
                <div className="flex gap-1">
                  {/* "Edit" button now triggers the dialog in edit mode */}
                  <AddressFormDialog
                    initialData={address}
                    trigger={
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {addresses?.length === 0 && !isLoading && (
            <p className="text-sm text-muted-foreground text-center py-4">You have no saved addresses.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

```

# components/features/account/AddressFormDialog.tsx
```tsx
// components/features/account/AddressFormDialog.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, TAddressSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/common/Dialog'
import type { Address } from '@prisma/client'
import { useState } from 'react'

interface AddressFormDialogProps {
  initialData?: Address | null
  trigger: React.ReactNode
  onSuccess?: () => void
}

export function AddressFormDialog({ initialData, trigger, onSuccess }: AddressFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const utils = api.useUtils()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      addressLine1: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      countryCode: 'US',
    },
  })

  const upsertAddress = api.address.upsert.useMutation({
    onSuccess: () => {
      utils.address.list.invalidate() // Refetch the address list
      setIsOpen(false) // Close the dialog
      reset() // Reset form state
      onSuccess?.()
    },
    onError: (error) => {
      // In a real app, you might set a form error here
      console.error('Failed to save address:', error)
    },
  })

  const onSubmit = (data: TAddressSchema) => {
    upsertAddress.mutate({
      ...data,
      id: initialData?.id,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName">First Name</label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="addressLine1">Address</label>
            <Input id="addressLine1" {...register('addressLine1')} />
            {errors.addressLine1 && <p className="error-text">{errors.addressLine1.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="city">City</label>
            <Input id="city" {...register('city')} />
            {errors.city && <p className="error-text">{errors.city.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="stateProvince">State/Province</label>
              <Input id="stateProvince" {...register('stateProvince')} />
              {errors.stateProvince && <p className="error-text">{errors.stateProvince.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="postalCode">Postal Code</label>
              <Input id="postalCode" {...register('postalCode')} />
              {errors.postalCode && <p className="error-text">{errors.postalCode.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

```

# components/features/account/UpdateProfileForm.tsx
```tsx
// components/features/account/UpdateProfileForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, TProfileSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import type { User } from '@prisma/client'

interface UpdateProfileFormProps {
  user: Pick<User, 'firstName' | 'lastName'>
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const utils = api.useUtils()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
  })

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      // Invalidate the 'me' query to refetch fresh data
      utils.user.me.invalidate()
      // Ideally, show a success toast here
    },
    onError: (error) => {
      setError('root', { message: error.message || 'An unexpected error occurred.' })
    },
  })

  const onSubmit = (data: TProfileSchema) => {
    updateProfile.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your name and personal details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName">First Name</label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
          </div>
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

```

# components/features/account/AccountNav.tsx
```tsx
// components/features/account/AccountNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/common/Button'

// Updated navigation items to include Dashboard as the primary link
const navItems = [
  { href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/account/profile', label: 'Profile Settings', icon: User },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            // Use startsWith for dashboard to handle potential sub-pages in the future
            pathname === item.href || (item.href === '/account/dashboard' && pathname.startsWith('/account'))
              ? 'bg-stone-200 text-foreground dark:bg-stone-800'
              : 'text-muted-foreground hover:bg-stone-200/50 hover:text-foreground dark:hover:bg-stone-800/50',
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </Button>
    </nav>
  )
}

```

# components/features/account/OrderHistoryItem.tsx
```tsx
// components/features/account/OrderHistoryItem.tsx
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'
import { formatPrice } from '@/lib/utils/formatters'
import { Badge } from '@/components/common/Badge' // We will create this component

type Order = inferRouterOutputs<AppRouter>['order']['all'][number]

interface OrderHistoryItemProps {
  order: Order
}

export function OrderHistoryItem({ order }: OrderHistoryItemProps) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="border rounded-lg p-4 transition-colors hover:bg-stone-100/50 dark:hover:bg-stone-900/50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-semibold">Order #{order.orderNumber}</p>
          <p className="text-sm text-muted-foreground">Date: {orderDate}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatPrice(order.total)}</p>
          <Badge
            variant={order.status === 'delivered' ? 'default' : 'secondary'}
            className="mt-1 capitalize"
          >
            {order.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}

```

# components/features/checkout/CheckoutForm.tsx
```tsx
// components/features/checkout/CheckoutForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shippingAddressSchema, TShippingAddressSchema } from '@/lib/validation/schemas'
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input' // Import new component

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
  })

  const processSubmit = async (data: TShippingAddressSchema) => {
    if (!stripe || !elements) return
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        shipping: {
          name: `${data.firstName} ${data.lastName}`,
          address: {
            line1: data.addressLine1,
            line2: data.addressLine2,
            city: data.city,
            state: data.stateProvince,
            postal_code: data.postalCode,
            country: data.countryCode,
          },
        },
      },
    })
    
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } else {
      setErrorMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div>
                <label htmlFor="firstName">First name</label>
                <Input type="text" id="firstName" {...register('firstName')} className="mt-1"/>
                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last name</label>
                <Input type="text" id="lastName" {...register('lastName')} className="mt-1"/>
                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="addressLine1">Address</label>
                <Input type="text" id="addressLine1" {...register('addressLine1')} className="mt-1"/>
                {errors.addressLine1 && <p className="error-text">{errors.addressLine1.message}</p>}
            </div>
             <div className="sm:col-span-2">
                <label htmlFor="addressLine2">Apartment, suite, etc. (Optional)</label>
                <Input type="text" id="addressLine2" {...register('addressLine2')} className="mt-1"/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <Input type="text" id="city" {...register('city')} className="mt-1"/>
                {errors.city && <p className="error-text">{errors.city.message}</p>}
            </div>
             <div>
                <label htmlFor="stateProvince">State / Province</label>
                <Input type="text" id="stateProvince" {...register('stateProvince')} className="mt-1"/>
                {errors.stateProvince && <p className="error-text">{errors.stateProvince.message}</p>}
            </div>
            <div>
                <label htmlFor="postalCode">Postal code</label>
                <Input type="text" id="postalCode" {...register('postalCode')} className="mt-1"/>
                {errors.postalCode && <p className="error-text">{errors.postalCode.message}</p>}
            </div>
            <div>
                <label htmlFor="countryCode">Country</label>
                <Input type="text" id="countryCode" {...register('countryCode')} className="mt-1" defaultValue="US"/>
                {errors.countryCode && <p className="error-text">{errors.countryCode.message}</p>}
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="mt-4">
          <PaymentElement />
        </div>
      </div>

      {errorMessage && <div className="error-text text-center">{errorMessage}</div>}

      <Button type="submit" disabled={isLoading || !stripe || !elements} className="w-full" size="lg">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}

```

# components/features/cart/CartItem.tsx
```tsx
// components/features/cart/CartItem.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { formatPrice } from '@/lib/utils/formatters'
import { Minus, Plus, X } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity)
  }

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.image.url}
          alt={item.image.altText || item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3>
              <Link href={`/products/${item.product.slug}`}>{item.product.name}</Link>
            </h3>
            <p className="ml-4">{formatPrice(Number(item.variant.price) * item.quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-muted">{item.variant.name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex">
            <Button variant="ghost" type="button" onClick={() => removeItem(item.id)}>
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# components/features/cart/CartDrawer.tsx
```tsx
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

```

# components/features/product/ProductCard.tsx
```tsx
// components/features/product/ProductCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'
import type { ProductCardType } from '@/types'
import { formatPrice } from '@/lib/utils/formatters'

interface ProductCardProps {
  product: ProductCardType
  className?: string
  aspectRatio?: string
  priority?: boolean
}

export function ProductCard({
  product,
  className,
  aspectRatio = 'aspect-[4/5]',
  priority = false,
}: ProductCardProps) {
  const { addItem } = useCart()
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]
  const displayPrice = primaryVariant?.price ?? product.price

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // CRITICAL FIX: Ensure event propagation is stopped to prevent the parent Link from firing.
    e.preventDefault()
    e.stopPropagation()

    if (!primaryVariant) {
      console.error('No variant found for product:', product.name)
      return
    }

    addItem({
      id: primaryVariant.id,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
      },
      variant: {
        id: primaryVariant.id,
        name: primaryVariant.name,
        price: displayPrice,
      },
      image: {
        url: primaryImage?.url || '/placeholder.jpg',
        altText: primaryImage?.altText,
      },
    })
  }

  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
      <Link href={`/products/${product.slug}`} className="group block h-full">
        <Card className={cn('overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full flex flex-col', className)}>
          <CardHeader className="p-0">
            <div className={cn('relative overflow-hidden', aspectRatio)}>
              {primaryImage?.url ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText || product.name}
                  fill
                  priority={priority}
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="h-full w-full bg-secondary" />
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-medium truncate">{product.name}</CardTitle>
            <p className="mt-2 text-xl font-semibold">{formatPrice(displayPrice, { notation: 'standard' })}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            {/* The onClick handler is correctly passed here */}
            <Button variant="secondary" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

```

# components/features/product/Product3DViewer.tsx
```tsx
// components/features/product/Product3DViewer.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

interface Product3DViewerProps {
  modelUrl: string
}

export function Product3DViewer({ modelUrl }: Product3DViewerProps) {
  return (
    <div className="relative aspect-square h-full w-full">
      <Canvas camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
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
import { useCart } from '@/hooks/use-cart'
import { Minus, Plus } from 'lucide-react'
import type { ProductBySlugOutput } from '@/types'

interface ProductInfoProps {
  product: NonNullable<ProductBySlugOutput>
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, setDrawerOpen } = useCart()
  const [quantity, setQuantity] = useState(1)

  const primaryVariant = product.variants?.[0]
  const primaryImage = product.images?.[0]

  const handleAddToCart = () => {
    if (!primaryVariant) {
      console.error('No variant selected for product:', product.name)
      return
    }

    addItem(
      {
        id: primaryVariant.id,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
        },
        variant: {
          id: primaryVariant.id,
          name: primaryVariant.name,
          price: primaryVariant.price,
        },
        image: {
          url: primaryImage?.url || '/placeholder.jpg',
          altText: primaryImage?.altText,
        },
      },
      quantity,
    )
    setDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-4xl font-bold tracking-tight">{product.name}</h1>
      <p className="text-3xl">${product.price.toString()}</p>
      <p className="text-base text-muted dark:text-dark-muted">{product.shortDescription}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button size="lg" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <div className="prose prose-sm mt-4 text-muted dark:text-dark-muted max-w-none">
          {product.description}
        </div>
      </div>
    </div>
  )
}

```

# components/features/product/RelatedProducts.tsx
```tsx
// components/features/product/RelatedProducts.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { ProductCard } from './ProductCard'

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { data: relatedProducts, isLoading } = api.product.getRelated.useQuery({
    categoryId,
    currentProductId,
  })

  if (isLoading) {
    // Optional: Add skeleton loaders for a better UX
    return <div>Loading recommendations...</div>
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null // Don't render the section if there are no related products
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-center mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

```

# components/features/auth/AuthForm.tsx
```tsx
// components/features/auth/AuthForm.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TLoginSchema, TRegisterSchema, loginSchema, registerSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
// Import the new, dedicated AuthTabs components
import { AuthTabs, AuthTabsContent, AuthTabsList, AuthTabsTrigger } from '@/components/features/auth/AuthTabs'
import { Input } from '@/components/common/Input'
import { Chrome } from 'lucide-react'

interface AuthFormProps {
  defaultTab: 'login' | 'register'
}

export function AuthForm({ defaultTab }: AuthFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(defaultTab)

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    setError: setLoginError,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) })

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegisterForm,
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) })

  const registerUser = api.user.register.useMutation({
    onSuccess: () => {
      setActiveTab('login')
      resetRegisterForm()
    },
    onError: (error) => {
      console.error('Registration failed:', error.message)
    },
  })

  const onLoginSubmit = async (data: TLoginSchema) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (result?.error) {
      setLoginError('root', { message: 'Invalid email or password.' })
    } else {
      router.push('/account/dashboard') // Go to dashboard on successful login
      router.refresh()
    }
  }

  const onRegisterSubmit = (data: TRegisterSchema) => {
    registerUser.mutate(data)
  }

  return (
    <AuthTabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full max-w-md">
      <AuthTabsList>
        <AuthTabsTrigger value="login">Sign In</AuthTabsTrigger>
        <AuthTabsTrigger value="register">Create Account</AuthTabsTrigger>
      </AuthTabsList>

      <AuthTabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your journey with The Scent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email">Email</label>
                <Input id="login-email" type="email" {...registerLogin('email')} />
                {loginErrors.email && <p className="error-text">{loginErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="login-password">Password</label>
                <Input id="login-password" type="password" {...registerLogin('password')} />
                {loginErrors.password && <p className="error-text">{loginErrors.password.message}</p>}
              </div>
              {loginErrors.root && <p className="error-text text-center">{loginErrors.root.message}</p>}
              <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
                {isLoginSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => signIn('google')}>
              <Chrome className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </AuthTabsContent>

      <AuthTabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Begin your journey with us today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName">First Name</label>
                  <Input id="firstName" {...registerRegister('firstName')} />
                  {registerErrors.firstName && <p className="error-text">{registerErrors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName">Last Name</label>
                  <Input id="lastName" {...registerRegister('lastName')} />
                  {registerErrors.lastName && <p className="error-text">{registerErrors.lastName.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="register-email">Email</label>
                <Input id="register-email" type="email" {...registerRegister('email')} />
                {registerErrors.email && <p className="error-text">{registerErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="register-password">Password</label>
                <Input id="register-password" type="password" {...registerRegister('password')} />
                {registerErrors.password && <p className="error-text">{registerErrors.password.message}</p>}
              </div>
              {registerUser.isError && <p className="error-text">{registerUser.error.message}</p>}
              <Button type="submit" className="w-full" disabled={isRegisterSubmitting}>
                {isRegisterSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </AuthTabsContent>
    </AuthTabs>
  )
}

```

# components/features/auth/AuthTabs.tsx
```tsx
// components/features/auth/AuthTabs.tsx
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

// A new, dedicated set of Tab components specifically for the Auth forms.
// This decouples its specific styling from the generic Tabs component.

const AuthTabs = TabsPrimitive.Root

const AuthTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'grid w-full grid-cols-2 items-center justify-center rounded-lg border p-1',
      className,
    )}
    {...props}
  />
))
AuthTabsList.displayName = TabsPrimitive.List.displayName

const AuthTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md',
      className,
    )}
    {...props}
  />
))
AuthTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const AuthTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
AuthTabsContent.displayName = TabsPrimitive.Content.displayName

export { AuthTabs, AuthTabsList, AuthTabsTrigger, AuthTabsContent }

```

# components/features/newsletter/NewsletterForm.tsx
```tsx
// components/features/newsletter/NewsletterForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, TNewsletterSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { useState } from 'react'
import { Input } from '@/components/common/Input' // Import new component

export function NewsletterForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
  })

  const subscribe = api.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message)
      reset()
    },
    onError: (error) => {
      console.error('Subscription failed:', error)
      setSuccessMessage('Something went wrong. Please try again.')
    },
  })

  const onSubmit = (data: TNewsletterSchema) => {
    setSuccessMessage(null)
    subscribe.mutate(data)
  }

  if (successMessage) {
    return (
      <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-md">
        <p className="font-semibold text-primary">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          // This input needs a specific style for its context in the dark footer
          className="flex-1 bg-stone-900/50 border-stone-700 placeholder:text-stone-400 focus:ring-primary"
        />
        <Button type="submit" variant="primary" size="sm" disabled={subscribe.isPending}>
          {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {errors.email && <p className="error-text">{errors.email.message}</p>}
    </form>
  )
}

```

# components/features/shop/SortDropdown.tsx
```tsx
// components/features/shop/SortDropdown.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SORT_OPTIONS } from '@/lib/config/shop'

export function SortDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || SORT_OPTIONS.LATEST

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-muted-foreground">Sort by:</label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="input-style text-sm py-1"
      >
        <option value={SORT_OPTIONS.LATEST}>Latest</option>
        <option value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</option>
        <option value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</option>
      </select>
    </div>
  )
}

```

# components/features/shop/CategoryFilterBar.tsx
```tsx
// components/features/shop/CategoryFilterBar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { cn } from '@/lib/utils'

export function CategoryFilterBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const { data: categories, isLoading } = api.product.getCategoryList.useQuery() // We'll need to create this procedure

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    return params.toString()
  }

  if (isLoading || !categories) {
    return <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-md animate-pulse" />
  }

  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-2 items-center">
      <Link
        href={pathname}
        className={cn('px-3 py-1 text-sm rounded-full transition-colors',
          !currentCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
        )}
      >
        All Products
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`${pathname}?${createQueryString('category', cat.slug)}`}
          className={cn('px-3 py-1 text-sm rounded-full transition-colors',
            currentCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
          )}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}

```

# components/features/shop/FiltersSidebar.tsx
```tsx
// components/features/shop/FiltersSidebar.tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { Search } from 'lucide-react'
import { Input } from '@/components/common/Input' // Using the new Input component

export function FiltersSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleApplyFilters = (formData: FormData) => {
    const params = new URLSearchParams(searchParams)
    const minPrice = formData.get('minPrice') as string
    const maxPrice = formData.get('maxPrice') as string
    const searchQuery = formData.get('q') as string // Changed from 'searchQuery' to 'q'

    if (minPrice) params.set('minPrice', minPrice)
    else params.delete('minPrice')
    if (maxPrice) params.set('maxPrice', maxPrice)
    else params.delete('maxPrice')
    if (searchQuery) params.set('q', searchQuery)
    else params.delete('q')

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form action={handleApplyFilters} className="space-y-6 sticky top-24">
      <div>
        <h3 className="font-semibold mb-2">Search Products</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="q" // Changed from 'searchQuery' to 'q'
            type="search"
            defaultValue={searchParams.get('q') || ''}
            placeholder="Search..."
            className="pl-9 w-full"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            name="minPrice"
            type="number"
            defaultValue={searchParams.get('minPrice') || ''}
            placeholder="Min"
          />
          <span>-</span>
          <Input
            name="maxPrice"
            type="number"
            defaultValue={searchParams.get('maxPrice') || ''}
            placeholder="Max"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  )
}

```

# components/features/shop/ProductList.tsx
```tsx
// components/features/shop/ProductList.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'
import { GenericError, ProductCardSkeleton } from '@/components/common/Skeletons'
import type { SerializableProduct } from '@/types'

// This component receives the initial data from the server,
// but then handles all subsequent client-side fetching for filters/sorting.
interface ProductListProps {
  initialProducts: SerializableProduct[]
  initialCategoryName?: string
}

export function ProductList({ initialProducts, initialCategoryName }: ProductListProps) {
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || 'createdAt_desc'
  const q = searchParams.get('q') || undefined
  const minPrice = searchParams.get('minPrice') || undefined
  const maxPrice = searchParams.get('maxPrice') || undefined

  const [sortBy, sortOrder] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc']

  const { data, isLoading, isError, refetch } = api.product.list.useQuery(
    {
      limit: 12,
      category,
      sortBy,
      sortOrder,
      q,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    },
    {
      initialData: { items: initialProducts, nextCursor: null }, // Use server-fetched data initially
      enabled: !!(category || q || minPrice || maxPrice || sort !== 'createdAt_desc'), // Only refetch on client if filters are applied
    },
  )

  const products = data?.items || initialProducts

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    )
  }

  if (isError) {
    return <GenericError onRetry={() => refetch()} />
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold">No Products Found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

```

# components/features/home/FeaturedProducts.tsx
```tsx
// components/features/home/FeaturedProducts.tsx
import { ProductCard } from '@/components/features/product/ProductCard'
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Link from 'next/link'
import type { ProductCardType } from '@/types'

interface FeaturedProductsProps {
  products: ProductCardType[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length < 3) {
    return null
  }

  const [heroProduct, ...otherProducts] = products

  return (
    <section className="py-20 bg-stone-100 dark:bg-stone-900/50" id="featured-products">
      <div className="container mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured Collections
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Handpicked for you, these are the scents our community is currently loving.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Hero Product - Left Column */}
          <FadeIn yOffset={40}>
            <ProductCard
              product={heroProduct}
              aspectRatio="aspect-square md:aspect-[4/5]"
              className="h-full"
              priority
            />
          </FadeIn>

          {/* Stacked Side Products - Right Column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {otherProducts.slice(0, 2).map((product, index) => (
              <FadeIn key={product.id} yOffset={40} delay={(index + 1) * 0.1}>
                <ProductCard product={product} aspectRatio="aspect-video sm:aspect-[2/1] lg:aspect-[16/7]" />
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn className="mt-12 text-center" yOffset={40}>
          <Button asChild size="lg">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}

```

# components/features/home/HeroSection.tsx
```tsx
// components/features/home/HeroSection.tsx
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

export function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="container relative z-20 flex flex-col items-center justify-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-heading"
        >
          A Digital Sanctuary for the Senses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 max-w-xl text-lg text-white/80"
        >
          Explore our collection of premium, natural aromatherapy products designed to
          transform your space and elevate your well-being.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="px-8 py-6 text-base">
            <Link href="/products">Explore The Collection</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-base bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link href="/journal">Read Our Journal</Link>
          </Button>
        </motion.div>
      </div>

      <button
        onClick={toggleMute}
        className="absolute top-24 right-4 md:right-8 z-20 p-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </section>
  )
}

```

# components/features/journal/PostBody.tsx
```tsx
// components/features/journal/PostBody.tsx
'use client'

import { PortableText, type PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/cms/image'

const ptComponents = {
  types: {
    image: ({ value }: { value: PortableTextBlock & { asset?: any } }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative my-6 aspect-video">
          <Image
            src={urlForImage(value).fit('max').auto('format').url()}
            alt={value.alt || ' '}
            fill
            className="object-contain"
            loading="lazy"
          />
        </div>
      )
    },
  },
}

export function PostBody({ content }: { content: PortableTextBlock[] }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <PortableText value={content} components={ptComponents} />
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
        'rounded-lg border border-border bg-limestone text-charcoal shadow-sm dark:border-dark-border dark:bg-midnight dark:text-pearl',
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
  <p ref={ref} className={cn('text-sm text-muted dark:text-dark-muted', className)} {...props} />
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

# components/common/Input.tsx
```tsx
// components/common/Input.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }

```

# components/common/Layout/Header.tsx
```tsx
// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { LayoutDashboard, Moon, Search, ShoppingBag, Sun, User } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { CartDrawer } from '@/components/features/cart/CartDrawer'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()
  const { theme, toggleTheme } = useUIStore()
  const { getTotalItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border bg-background/80 backdrop-blur-lg'
            : 'bg-transparent',
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex flex-col items-start leading-none">
            <span className="font-heading text-3xl font-bold tracking-wider uppercase text-foreground">
              The Scent
            </span>
            <span className="text-xs font-light tracking-[0.2em] text-primary -mt-1">
              AROMATHERAPY
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">Shop</Link>
            <Link href="/journal" className="text-foreground hover:text-primary transition-colors">Journal</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link href={session ? "/account/dashboard" : "/login"} passHref>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {/* The cart icon is now a link to the cart page */}
            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>
      {/* The CartDrawer remains to be opened programmatically when an item is added */}
      <CartDrawer />
    </>
  )
}

```

# components/common/Layout/Footer.tsx
```tsx
// components/common/Layout/Footer.tsx
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { NewsletterForm } from '@/components/features/newsletter/NewsletterForm'

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const shopLinks = [
    { href: '/products?category=essential-oils', label: 'Essential Oils' },
    { href: '/products?category=natural-soaps', label: 'Natural Soaps' },
    { href: '/products?category=gift-sets', label: 'Gift Sets' },
    { href: '/products?category=new-arrivals', label: 'New Arrivals' },
    { href: '/products?category=bestsellers', label: 'Bestsellers' },
  ]

  const helpLinks = [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQs' },
    { href: '/shipping-returns', label: 'Shipping & Returns' },
    { href: '/account/orders', label: 'Track Your Order' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ]

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-stone-50">The Scent</h3>
            <p className="text-sm text-stone-400">
              Creating premium aromatherapy products to enhance mental and physical well-being
              through the power of nature.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-stone-400 hover:text-stone-50 transition-colors">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-stone-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-stone-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Stay Connected</h3>
            <p className="text-sm text-stone-400">
              Join our newsletter for exclusive offers, new products, and wellness tips.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p className="text-stone-500">&copy; {new Date().getFullYear()} The Scent. All Rights Reserved.</p>
          <div className="flex items-center gap-3 text-stone-500">
            <span>Accepted Payments:</span>
            <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-6 opacity-60" />
            <img src="/payment-icons/paypal.svg" alt="PayPal" className="h-5 opacity-60" />
            <img src="/payment-icons/amex.svg" alt="American Express" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  )
}

```

# components/common/Dialog.tsx
```tsx
// components/common/Dialog.tsx
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
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
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // Re-imagined secondary variant for high contrast on any background
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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

# components/common/Sheet.tsx
```tsx
// components/common/Sheet.tsx
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-limestone dark:bg-charcoal p-6 shadow-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# components/common/Tabs.tsx
```tsx
// components/common/Tabs.tsx
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-stone-200 p-1 text-muted dark:bg-charcoal dark:text-dark-muted',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-limestone data-[state=active]:text-charcoal data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border dark:data-[state=active]:text-pearl',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

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

# components/common/Skeletons.tsx
```tsx
// components/common/Skeletons.tsx
import { Card, CardContent, CardFooter, CardHeader } from '@/components/common/Card'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

/**
 * A skeleton component that mimics the layout of a ProductCard.
 * Used to provide a better loading state UI on the products page.
 */
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-6 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
        <div className="mt-3 h-7 w-1/3 rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardFooter>
    </Card>
  )
}

/**
 * A generic error component to display when tRPC queries fail.
 */
export function GenericError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 text-destructive">
      <AlertTriangle className="h-12 w-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Something Went Wrong</h3>
      <p className="text-muted-foreground mb-6">We couldn't load the requested data. Please try again.</p>
      <Button onClick={onRetry} variant="destructive">
        Try Again
      </Button>
    </div>
  )
}

```

# components/common/Badge.tsx
```tsx
// components/common/Badge.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

```

# middleware.ts
```ts
// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { token } = req.nextauth
    // Redirect admins or staff trying to access customer account area
    if (token?.role !== 'customer' && req.nextUrl.pathname.startsWith('/account')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // !!token ensures a boolean is returned
    },
  },
)

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/account/:path*', '/checkout'], // Protect account and checkout pages
}

```

# next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# scripts/database/bulk_load_products.py
```py
# File: scripts/database/bulk_load_products.py
# pip install psycopg2-binary python-dotenv
import os
import json
import psycopg2
import sys
from decimal import Decimal
from dotenv import load_dotenv
from urllib.parse import urlparse

# Get the project root directory
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
# Load environment variables from .env file at the project root
load_dotenv(os.path.join(project_root, '.env'))

def parse_db_url(url):
    """Parses a database URL into a dictionary of connection parameters."""
    result = urlparse(url)
    return {
        'dbname': result.path[1:],
        'user': result.username,
        'password': result.password,
        'host': result.hostname,
        'port': result.port
    }

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        db_url = os.getenv('DATABASE_URL')
        if not db_url:
            raise ValueError("DATABASE_URL environment variable not set.")
        
        conn_params = parse_db_url(db_url)
        conn = psycopg2.connect(**conn_params)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}", file=sys.stderr)
        sys.exit(1)

def load_products(conn, products_data):
    """Loads a list of products into the database transactionally."""
    with conn.cursor() as cur:
        for product in products_data:
            try:
                print(f"Processing product: {product['name']}...")

                # First, ensure the category exists and get its ID
                cur.execute(
                    """
                    INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt", "isActive")
                    VALUES (gen_random_uuid(), %s, %s, NOW(), NOW(), TRUE)
                    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
                    RETURNING id;
                    """,
                    (product['category']['name'], product['category']['slug'])
                )
                category_id = cur.fetchone()[0]
                print(f"  ✓ Upserted category '{product['category']['name']}' with ID: {category_id}")

                # Delete existing product with the same SKU for clean import
                cur.execute('DELETE FROM "Product" WHERE sku = %s;', (product['sku'],))

                # Insert the main product record
                cur.execute(
                    """
                    INSERT INTO "Product" (id, sku, name, slug, description, "shortDescription", price, "isActive", "isFeatured", "categoryId", "createdAt", "updatedAt")
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                    RETURNING id;
                    """,
                    (
                        product['id'], product['sku'], product['name'], product['slug'],
                        product.get('description', ''), product.get('shortDescription', ''),
                        Decimal(product['price']), product.get('isActive', True),
                        product.get('isFeatured', False), category_id
                    )
                )
                product_id = cur.fetchone()[0]
                print(f"  ✓ Inserted product with ID: {product_id}")

                # Insert variants
                for variant in product.get('variants', []):
                    cur.execute(
                        """
                        INSERT INTO "ProductVariant" ("id", "productId", sku, name, price, "inventoryQuantity", "createdAt", "updatedAt")
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, NOW(), NOW());
                        """,
                        (
                            product_id, variant['sku'], variant['name'],
                            Decimal(variant['price']), variant['inventoryQuantity']
                        )
                    )
                print(f"  ✓ Inserted {len(product.get('variants', []))} variant(s).")

                # Insert images
                for image in product.get('images', []):
                    cur.execute(
                        """
                        INSERT INTO "ProductImage" ("id", "productId", url, "altText", "isPrimary", "createdAt")
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, NOW());
                        """,
                        (
                            product_id, image['url'], image.get('altText', ''),
                            image.get('isPrimary', False)
                        )
                    )
                print(f"  ✓ Inserted {len(product.get('images', []))} image(s).")
                
                # Commit the transaction for this product
                conn.commit()
                print(f"✅ Successfully loaded {product['name']}.\n")

            except Exception as e:
                print(f"❌ Error loading product '{product.get('name', 'N/A')}': {e}", file=sys.stderr)
                conn.rollback() # Rollback the transaction for the failed product

def main():
    """Main function to run the script."""
    json_path = os.path.join(project_root, 'bulk_load_products.json')
    
    if not os.path.exists(json_path):
        print(f"Error: JSON file not found at {json_path}", file=sys.stderr)
        sys.exit(1)
        
    with open(json_path, 'r') as f:
        products_to_load = json.load(f)

    conn = get_db_connection()
    try:
        load_products(conn, products_to_load)
    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == '__main__':
    main()

```

# tailwind.config.ts
```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class', "[data-theme='night']"],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // New "Graphite & Sage" Palette
        stone: {
          '50': '#fafaf9',
          '100': '#f5f5f4',
          '200': '#e7e5e4',
          '300': '#d6d3d1',
          '400': '#a8a29e',
          '500': '#78716c',
          '600': '#57534e',
          '700': '#44403c',
          '800': '#292524',
          '900': '#1c1917',
          '950': '#0c0a09',
        },
        sage: {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d',
          '950': '#052e16',
        },
        
        // Semantic color mapping to CSS variables
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
        heading: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config

```

# tests/e2e/auth.spec.ts
```ts
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

const uniqueEmail = `testuser_${Date.now()}@example.com`

test.describe('Authentication Flow', () => {
  test('User can register for a new account', async ({ page }) => {
    await page.goto('/register')

    // Verify UI elements
    await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible()
    const createAccountTab = page.getByRole('tab', { name: 'Create Account' })
    await expect(createAccountTab).toHaveAttribute('data-state', 'active')

    // Fill out the registration form
    await page.getByLabel('First Name').fill('Test')
    await page.getByLabel('Last Name').fill('User')
    await page.getByLabel('Email').nth(1).fill(uniqueEmail) // Use nth(1) to distinguish from login email
    await page.getByLabel('Password').nth(1).fill('password123')
    await page.getByRole('button', { name: 'Create Account' }).click()

    // After successful registration, user should be on the login tab
    await expect(page.getByRole('tab', { name: 'Sign In' })).toHaveAttribute('data-state', 'active')
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible()
  });

  test('User can log in with newly created account', async ({ page }) => {
    // This test depends on the registration test having run, or a seeded user
    // For a standalone test, you would programmatically create a user first.
    await page.goto('/login')
    
    // Fill out the login form
    await page.getByLabel('Email').first().fill(uniqueEmail)
    await page.getByLabel('Password').first().fill('password123')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify successful login by checking for redirection
    // to a protected route like the account profile page.
    await expect(page).toHaveURL(/.*\/account\/profile/)
  });

  test('User sees an error for incorrect password', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').first().fill(uniqueEmail)
    await page.getByLabel('Password').first().fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify error message is displayed
    await expect(page.getByText('Invalid email or password.')).toBeVisible()
  });
});

```

# tests/e2e/account.spec.ts
```ts
// tests/e2e/account.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Account Flow', () => {
  test('unauthenticated user is redirected from account page to login', async ({ page }) => {
    await page.goto('/account/profile')
    // Should be redirected to the login page by the middleware
    await expect(page).toHaveURL(/.*\/login/)
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible()
  })

  test.describe('Authenticated User', () => {
    // Log in once for all tests in this block
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
      await page.getByLabel('Email').first().fill('test@thescent.com')
      await page.getByLabel('Password').first().fill('StrongPass123!')
      await page.getByRole('button', { name: 'Sign In' }).click()
      await expect(page).toHaveURL(/.*\/account\/profile/)
    })

    test('can view their profile information', async ({ page }) => {
      await page.goto('/account/profile')
      await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible()
      await expect(page.getByText('Test User')).toBeVisible()
      await expect(page.getByText('test@thescent.com')).toBeVisible()
    })

    test('can view their order history', async ({ page }) => {
      await page.goto('/account/orders')
      await expect(page.getByRole('heading', { name: 'Order History' })).toBeVisible()
      // In a real scenario with orders, you would assert that order items are visible.
      // For now, we check that the "no orders" message appears correctly.
      await expect(page.getByText("You haven't placed any orders yet.")).toBeVisible()
    })
    
    test('can sign out successfully', async ({ page }) => {
      await page.goto('/account/profile')
      await page.getByRole('button', { name: 'Sign Out' }).click()

      // Should be redirected to the homepage
      await expect(page).toHaveURL('/')
      
      // Verify that the account page is no longer accessible
      await page.goto('/account/profile')
      await expect(page).toHaveURL(/.*\/login/)
    })
  })
})

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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig)

```

# postcss.config.mjs
```mjs
// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

```

# docker-compose.yml
```yml
version: "3.8"

services:
  db:
    image: postgres:16
    container_name: the_scent_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: scent_user
      POSTGRES_PASSWORD: StrongPass1234
      POSTGRES_DB: scent_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

volumes:
  postgres_data:
    driver: local


```

# app/account/profile/page.tsx
```tsx
// app/account/profile/page.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { UpdateProfileForm } from '@/components/features/account/UpdateProfileForm'
import { UpdatePasswordForm } from '@/components/features/account/UpdatePasswordForm'
import { ManageAddresses } from '@/components/features/account/ManageAddresses'

export default function ProfilePage() {
  const { data: user, isLoading } = api.user.me.useQuery()

  if (isLoading) {
    return <div className="container my-12">Loading your profile...</div>
  }

  if (!user) {
    // This case should be handled by middleware, but as a fallback:
    return <div className="container my-12">Please log in to view your profile.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpdateProfileForm user={user} />
        <UpdatePasswordForm />
      </div>

      <ManageAddresses />
    </div>
  )
}

```

# app/account/layout.tsx
```tsx
// app/account/layout.tsx
import { AccountNav } from '@/components/features/account/AccountNav'

export const metadata = {
  title: 'My Account',
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <aside className="lg:col-span-1">
          <AccountNav />
        </aside>
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  )
}

```

# app/account/dashboard/page.tsx
```tsx
// app/account/dashboard/page.tsx
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import type { inferRouterOutputs } from '@trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/formatters'
import { BookOpen, Edit, ShoppingBag, ShoppingCart } from 'lucide-react'

export const metadata = {
  title: 'My Dashboard',
}

// Type definitions for our data
type DashboardData = inferRouterOutputs<AppRouter>['dashboard']['getDashboardData']
type RecentOrder = DashboardData['recentOrders'][0]
type Recommendation = DashboardData['recommendations'][0]

// --- Sub-Components for Dashboard Cards ---

function StatsCard({ stats }: { stats: DashboardData['stats'] }) {
  return (
    <Card className="md:col-span-2">
      <CardContent className="p-6 flex justify-around gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.orderCount}</p>
            <p className="text-sm text-muted-foreground">Recent Orders</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.quizResultsCount}</p>
            <p className="text-sm text-muted-foreground">Quiz Results</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RecentOrdersCard({ orders }: { orders: RecentOrder[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Orders</CardTitle>
        <Button asChild variant="link" size="sm">
          <Link href="/account/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">#{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="capitalize mb-1">{order.status}</Badge>
                  <p className="font-semibold text-sm">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No recent orders found.</p>
        )}
      </CardContent>
    </Card>
  )
}

function ScentProfileCard({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Scent Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <h4 className="font-semibold text-sm">Latest Preferences:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
            <li>Mood: Relaxation</li>
          </ul>
        </div>
        <div className="space-y-2 border-t pt-4">
          <h4 className="font-semibold text-sm">Top Recommendations:</h4>
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                 <div key={rec.id} className="flex items-center gap-3">
                   <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                     <Image src={rec.images[0]?.url || ''} alt={rec.name} fill className="object-cover"/>
                   </div>
                   <div className="flex-grow">
                     <p className="text-sm font-medium leading-tight">{rec.name}</p>
                     <p className="text-xs text-muted-foreground">{formatPrice(rec.price)}</p>
                   </div>
                   <Button asChild size="sm" variant="ghost">
                     <Link href={`/products/${rec.slug}`}>View</Link>
                   </Button>
                 </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">No recommendations yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActionsCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/account/profile" className="flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-center">
          <Edit className="h-8 w-8 text-primary mb-2"/>
          <span className="text-sm font-medium">Edit Profile</span>
        </Link>
        <Link href="/scent-finder" className="flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-center">
          <BookOpen className="h-8 w-8 text-primary mb-2"/>
          <span className="text-sm font-medium">Retake Quiz</span>
        </Link>
        <Link href="/products" className="flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-center">
          <ShoppingCart className="h-8 w-8 text-primary mb-2"/>
          <span className="text-sm font-medium">Shop Now</span>
        </Link>
      </CardContent>
    </Card>
  )
}


export default async function DashboardPage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const dashboardData = await caller.dashboard.getDashboardData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard stats={dashboardData.stats} />
        <RecentOrdersCard orders={dashboardData.recentOrders} />
        <ScentProfileCard recommendations={dashboardData.recommendations} />
        <QuickActionsCard />
      </div>
    </div>
  )
}

```

# app/account/orders/page.tsx
```tsx
// app/account/orders/page.tsx
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { OrderHistoryItem } from '@/components/features/account/OrderHistoryItem'

export const metadata = {
  title: 'Order History',
}

export default async function OrdersPage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const orders = await caller.order.all()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderHistoryItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

```

# app/layout.tsx
```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/common/Layout/Header'
import { Footer } from '@/components/common/Layout/Footer'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers/Providers'

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
        </Providers>
      </body>
    </html>
  )
}

```

# app/privacy-policy/page.tsx
```tsx
// app/privacy-policy/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our commitment to your privacy. Learn how we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 28, 2024</p>
        <p>
          The Scent ("us", "we", or "our") operates the https://thescent.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2>Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your email address, name, shipping address, and payment information.
        </p>
        
        <h2>Use of Data</h2>
        <p>
          The Scent uses the collected data for various purposes:
        </p>
        <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To process your orders and manage your account</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
        </ul>

        <h2>Security of Data</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    </div>
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

# app/contact/page.tsx
```tsx
// app/contact/page.tsx
import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Scent team. We are here to help with any questions or inquiries.',
}

export default function ContactPage() {
  return (
    <div className="container my-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We would love to hear from you. Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Mail className="h-10 w-10 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-muted-foreground mb-4">The quickest way to get a response.</p>
          <a href="mailto:hello@thescent.com" className="font-semibold text-primary hover:underline">
            hello@thescent.com
          </a>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Phone className="h-10 w-10 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-muted-foreground mb-4">Mon-Fri, 9am - 5pm EST.</p>
          <a href="tel:+15551234567" className="font-semibold text-primary hover:underline">
            +1 (555) 123-4567
          </a>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <MapPin className="h-10 w-10 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
          <p className="text-muted-foreground">
            123 Aromatherapy Lane,
            <br />
            Wellness City, WB 12345
          </p>
        </div>
      </div>
    </div>
  )
}

```

# app/shipping-returns/page.tsx
```tsx
// app/shipping-returns/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Information about our shipping policies, rates, and our return process.',
}

export default function ShippingReturnsPage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1>Shipping & Returns</h1>

        <h2>Shipping Policy</h2>
        <p>
          We are delighted to offer shipping across the United States. All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
        </p>
        <h3>Shipping Rates & Delivery Estimates</h3>
        <ul>
          <li><strong>Standard Shipping (5-7 business days):</strong> $5.99. Free for orders over $50.</li>
          <li><strong>Expedited Shipping (2-3 business days):</strong> $15.99.</li>
        </ul>
        <p>
          Delivery delays can occasionally occur. You will receive a shipment confirmation email once your order has shipped, containing your tracking number(s).
        </p>

        <h2>Returns Policy</h2>
        <p>
          Your satisfaction is our priority. If you are not completely satisfied with your purchase, we are here to help.
        </p>
        <p>
          You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.
        </p>
        <h3>Refunds</h3>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions on how to return your item to us, please <a href="/contact">contact us</a>.
        </p>
      </div>
    </div>
  )
}

```

# app/terms-of-service/page.tsx
```tsx
// app/terms-of-service/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Please read our terms and conditions carefully before using our service.',
}

export default function TermsOfServicePage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        <p>Last updated: June 28, 2024</p>
        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://thescent.com website (the "Service") operated by The Scent ("us", "we", or "our").
        </p>

        <h2>Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        
        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of The Scent and its licensors.
        </p>

        <h2>Links To Other Web Sites</h2>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by The Scent. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  )
}

```

# app/page.tsx
```tsx
// app/page.tsx
import { FeaturedProducts } from '@/components/features/home/FeaturedProducts'
import { HeroSection } from '@/components/features/home/HeroSection'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  // Ensure we fetch 4 products for the new dynamic layout
  const featuredProducts = await caller.product.getFeatured({ limit: 4 })

  return (
    <div>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
    </div>
  )
}

```

# app/(shop)/checkout/page.tsx
```tsx
// app/(shop)/checkout/page.tsx
'use client'

import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils/formatters'
import { CheckoutForm } from '@/components/features/checkout/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api/trpc'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

// Read the public key once and validate it.
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : null

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const {
    mutate: createPaymentIntent,
    isPending,
    isError: isPaymentIntentError,
  } = api.checkout.createPaymentIntent.useMutation({
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
    },
    onError: (error) => {
      console.error('Failed to create payment intent:', error)
      // The state will reflect this error, and the UI will update.
    },
  })

  useEffect(() => {
    // Only create an intent if there are items in the cart.
    if (items.length > 0) {
      createPaymentIntent({
        // The API now expects a structured array, not a JSON string.
        cartItems: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        userId: session?.user?.id,
      })
    }
  }, [items, session, createPaymentIntent])

  // 1. Render an error if the public key is missing in the environment.
  if (!stripePromise) {
    return (
      <div className="container my-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
        <p className="text-muted-foreground mt-2">
          The payment gateway is not configured correctly. Please contact support.
        </p>
      </div>
    )
  }

  const appearance = { theme: 'stripe' as const }
  const options = clientSecret ? { clientSecret, appearance } : undefined

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          {/* 2. Handle the three possible states: loading, error, or success */}
          {isPending && (
            <div className="text-center p-8 border rounded-lg flex flex-col items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Preparing your secure payment session...</p>
            </div>
          )}

          {isPaymentIntentError && (
            <div className="text-center p-8 border rounded-lg border-destructive/50 bg-destructive/10 text-destructive flex flex-col items-center">
              <AlertTriangle className="h-8 w-8 mb-4" />
              <p className="font-semibold">Could not initiate payment.</p>
              <p className="text-sm text-destructive/80 mb-6">There was an issue connecting to our payment provider.</p>
              <Button asChild variant="destructive">
                <Link href="/cart">Return to Cart</Link>
              </Button>
            </div>
          )}

          {options && !isPending && !isPaymentIntentError && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>

        <aside className="bg-stone-100 dark:bg-stone-900/50 p-8 rounded-lg lg:py-8 order-first lg:order-last">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                  <Image src={item.image.url} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p>{formatPrice(Number(item.variant.price) * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

```

# app/(shop)/cart/page.tsx
```tsx
// app/(shop)/cart/page.tsx
'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { CartItem } from '@/components/features/cart/CartItem'
import { formatPrice } from '@/lib/utils/formatters'

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

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
                <Button asChild size="lg" className="w-full mt-4">
                  <Link href="/checkout">Proceed to Checkout</Link>
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

```

# app/(shop)/order-confirmation/page.tsx
```tsx
// app/(shop)/order-confirmation/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStripe } from '@stripe/react-stripe-js'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  const stripe = useStripe()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('Processing your order...')

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret')
    if (!clientSecret || !stripe) {
      setStatus('failed')
      setMessage('Could not process payment details. Please contact support.')
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setStatus('success')
          setMessage('Your payment was successful.')
          clearCart() // Clear the cart on successful payment
          break
        case 'processing':
          setStatus('loading')
          setMessage('Your payment is processing. We will notify you upon confirmation.')
          break
        default:
          setStatus('failed')
          setMessage('Payment failed. Please try again or contact support.')
          break
      }
    })
  }, [stripe, searchParams, clearCart])

  return (
    <div className="container my-16 text-center">
      <div className="max-w-2xl mx-auto border rounded-lg p-8">
        {status === 'loading' && <p>{message}</p>}
        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-sage mb-4" />
            <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
            <p className="text-muted mb-6">A confirmation email has been sent. We will notify you once your order has shipped.</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
        {status === 'failed' && (
           <div className="flex flex-col items-center">
             <h1 className="text-3xl font-bold text-terracotta mb-2">Payment Failed</h1>
             <p className="text-muted mb-6">{message}</p>
             <Button asChild>
              <Link href="/checkout">Try Again</Link>
            </Button>
           </div>
        )}
      </div>
    </div>
  )
}

```

# app/(shop)/products/[slug]/page.tsx
```tsx
// app/(shop)/products/[slug]/page.tsx
'use client'

import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProductInfo } from '@/components/features/product/ProductInfo'
import { api } from '@/lib/api/trpc'
import { RelatedProducts } from '@/components/features/product/RelatedProducts'
import { Product3DViewer } from '@/components/features/product/Product3DViewer'

export default function ProductPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const { data: product, isLoading, error } = api.product.bySlug.useQuery(
    { slug },
    { enabled: !!slug },
  )

  if (isLoading) {
    return <div className="container my-12 text-center">Loading Product...</div>
  }

  if (error || !product) {
    notFound()
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image / 3D Viewer Section */}
        <div className="relative aspect-square">
          {product.modelUrl ? (
            <Product3DViewer modelUrl={product.modelUrl} />
          ) : (
            <motion.div layoutId={`product-image-${product.id}`} className="relative h-full w-full">
              {product.images?.[0]?.url && (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              )}
            </motion.div>
          )}
        </div>

        {/* Product Information Section */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
      
      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  )
}

```

# app/(shop)/products/page.tsx
```tsx
// app/(shop)/products/page.tsx
import { FiltersSidebar } from '@/components/features/shop/FiltersSidebar'
import { CategoryFilterBar } from '@/components/features/shop/CategoryFilterBar'
import { SortDropdown } from '@/components/features/shop/SortDropdown'
import { ProductList } from '@/components/features/shop/ProductList'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'
import type { SerializableProduct } from '@/types'

export const metadata = {
  title: 'All Products',
  description: 'Explore our full collection of premium, natural aromatherapy products.',
}

export default async function ProductsPage() {
  // Fetch initial data on the server for fast loads and SEO
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const initialProductData = await caller.product.list({ limit: 12 })
  
  // The tRPC router already serializes the data, so it's safe to pass
  const initialProducts: SerializableProduct[] = initialProductData.items

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <aside className="lg:col-span-1">
          <FiltersSidebar />
        </aside>

        <main className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              Discover scents that soothe, uplift, and transform.
            </p>
          </header>
          
          <div className="border-b pb-4 mb-6">
            <CategoryFilterBar />
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {initialProducts.length} products
            </p>
            <SortDropdown />
          </div>
          
          {/* Pass initial data to the client component */}
          <ProductList initialProducts={initialProducts} />
        </main>
      </div>
    </div>
  )
}

```

# app/api/webhooks/stripe/route.ts
```ts
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db/client'
import { stripe } from '@/lib/payments/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const session = event.data.object as Stripe.PaymentIntent
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = session

    // Check if order already exists to ensure idempotency
    const existingOrder = await prisma.order.findUnique({
      where: { stripePaymentIntentId: paymentIntent.id },
    })

    if (existingOrder) {
      console.log(`Order already exists for Payment Intent: ${paymentIntent.id}`)
      return NextResponse.json({ received: true, message: 'Order already processed.' })
    }

    try {
      // Create the order in our database
      const orderData = paymentIntent.metadata
      const shippingDetails = paymentIntent.shipping
      
      // A more robust implementation would fetch user by email or use userId from metadata
      const user = orderData.userId ? await prisma.user.findUnique({ where: { id: orderData.userId } }) : null

      const createdOrder = await prisma.order.create({
        data: {
          orderNumber: `SCENT-${paymentIntent.id.slice(-8).toUpperCase()}`,
          total: paymentIntent.amount / 100,
          stripePaymentIntentId: paymentIntent.id,
          paymentStatus: 'paid',
          userId: user?.id, // Can be null for guest checkouts
          shippingAddress: shippingDetails ? JSON.stringify(shippingDetails) : undefined,
          items: {
            create: JSON.parse(orderData.cartDetails).map((item: any) => ({
              quantity: item.quantity,
              price: item.variant.price,
              productId: item.product.id,
              variantId: item.variant.id,
              productName: item.product.name,
              variantName: item.variant.name,
              productImage: item.image.url,
            })),
          },
        },
      })
      console.log(`Successfully created order ${createdOrder.orderNumber}`)
    } catch (dbError) {
      console.error('Database error while creating order:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  } else {
    console.log(`Unhandled event type ${event.type}`)
  }

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

# app/sitemap.ts
```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)

  // Fetch products
  const products = await caller.product.list({ limit: 100 }) // Adjust limit as needed

  const productUrls = products.items.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static pages
  const staticUrls = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  return [...staticUrls, ...productUrls]
}

```

# app/about/page.tsx
```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

// This tells Next.js to render this page to static HTML at build time.
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the story and passion behind The Scent.',
}

export default function AboutPage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">About The Scent</h1>
        <p className="lead">
          We believe in the power of nature to restore balance and elevate the human experience.
        </p>
        <p>
          Founded in 2024, The Scent was born from a passion for pure, authentic aromatherapy and a
          desire to create a digital sanctuary where customers could explore the world of fragrance
          in a meaningful way. Our mission is to source the finest natural ingredients from around
          the globe, crafting them into exquisite products that nurture both the body and the mind.
        </p>
        <p>
          Every product in our collection is a testament to our commitment to quality,
          sustainability, and craftsmanship. We partner with ethical growers and distillers, ensuring
          that from the soil to your home, our products are a force for good.
        </p>
        <h2 className="text-2xl font-bold mt-8">Our Philosophy</h2>
        <p>
          Our philosophy is simple: what you put on your body and bring into your home matters. We
          are dedicated to transparency, providing you with the full story behind every scent, from
          its botanical origins to its therapeutic benefits. We invite you to explore our
          collections and find your own moment of calm.
        </p>
      </div>
    </div>
  )
}

```

# app/faq/page.tsx
```tsx
// app/faq/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our products, shipping, returns, and more.',
}

const faqs = [
  {
    question: 'What are essential oils?',
    answer: 'Essential oils are concentrated plant extracts that retain the natural smell and flavor, or "essence," of their source. They are obtained through distillation (via steam and/or water) or mechanical methods, such as cold pressing.',
  },
  {
    question: 'Are your products 100% natural?',
    answer: 'Yes, absolutely. We are committed to sourcing the purest ingredients. All our products are 100% natural, free from synthetic fragrances, parabens, and sulfates.',
  },
  {
    question: 'How do I use essential oils?',
    answer: 'Essential oils can be used in several ways. The most common methods are aromatic diffusion using a diffuser, topical application on the skin (usually diluted with a carrier oil), and inhalation. Please refer to each product page for specific usage instructions.',
  },
  {
    question: 'What is your shipping policy?',
    answer: 'We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days) within the United States. Orders over $50 qualify for free standard shipping. Please see our Shipping & Returns page for more details.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We want you to be completely satisfied with your purchase. If you are not, you may return unopened products within 30 days of purchase for a full refund. Please visit our Shipping & Returns page to initiate a return.',
  },
]

export default function FAQPage() {
  return (
    <div className="container my-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      </header>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

```

# app/(auth)/layout.tsx
```tsx
// app/(auth)/layout.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full">
      <div className="container relative grid flex-1 grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-stone-900" />
          <Image
            src="/images/auth-background.jpg"
            alt="Aesthetic arrangement of aromatherapy bottles and natural elements"
            fill
            className="object-cover opacity-20"
            priority
          />
          <Link href="/" className="relative z-20 flex items-center text-lg font-medium text-stone-50">
            The Scent
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-stone-200">
                &ldquo;This platform is a true sanctuary for the senses. The attention to detail is unmatched.&rdquo;
              </p>
              <footer className="text-sm text-stone-400">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8 flex items-center justify-center py-12">
          {children}
        </div>
      </div>
    </div>
  )
}

```

# app/(auth)/login/page.tsx
```tsx
// app/(auth)/login/page.tsx
import { AuthForm } from '@/components/features/auth/AuthForm'

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your The Scent account.',
}

export default function LoginPage() {
  return <AuthForm defaultTab="login" />
}

```

# app/(auth)/register/page.tsx
```tsx
// app/(auth)/register/page.tsx
import { AuthForm } from '@/components/features/auth/AuthForm'

export const metadata = {
  title: 'Create Account',
  description: 'Create a new account with The Scent.',
}

export default function RegisterPage() {
  return <AuthForm defaultTab="register" />
}

```

# app/robots.ts
```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/cart', '/checkout'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

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

# app/journal/[slug]/page.tsx
```tsx
// app/journal/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { PostBody } from '@/components/features/journal/PostBody'

interface JournalPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: JournalPostPageProps) {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  try {
    const post = await caller.journal.postBySlug({ slug: params.slug })
    return { title: post.title, description: post.excerpt }
  } catch (error) {
    return { title: 'Post Not Found' }
  }
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  
  try {
    const post = await caller.journal.postBySlug({ slug: params.slug })

    return (
      <article className="container my-12 max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="text-muted-foreground mt-4">
            By {post.authorName} on{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image src={post.mainImage} alt={post.title} fill className="object-cover" />
        </div>
        <PostBody content={post.body} />
      </article>
    )
  } catch (error) {
    notFound()
  }
}

```

# app/journal/page.tsx
```tsx
// app/journal/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { Card, CardContent, CardHeader } from '@/components/common/Card'

export const metadata = {
  title: 'The Journal',
  description: 'Explore insights, stories, and guides on aromatherapy and holistic wellness.',
}

export default async function JournalPage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const posts = await caller.journal.listPosts()

  return (
    <div className="container my-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">The Journal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, stories, and guides on aromatherapy and holistic wellness.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link href={`/journal/${post.slug}`} key={post._id} className="group">
            <Card className="h-full overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={post.mainImage || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-foreground/80">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
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

@layer base {
  :root {
    /* Day Theme - "Graphite & Sage" Light */
    --background: 240 10% 98%;      /* stone-50 */
    --foreground: 20 14.3% 9.5%;   /* stone-900 */
    
    --card: 240 10% 98%;
    --card-foreground: 20 14.3% 9.5%;
    
    --primary: 142 71% 40%;        /* sage-600 */
    --primary-foreground: 142 71% 97%; /* sage-50 */
    
    --secondary: 240 5% 96%;        /* stone-100 */
    --secondary-foreground: 20 14.3% 9.5%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --muted: 240 5% 90%;          /* stone-200 */
    --muted-foreground: 20 6% 40%;  /* stone-600 */
    
    --accent: 240 5% 96%;           /* stone-100 */
    --accent-foreground: 20 14.3% 9.5%;
    
    --border: 240 6% 89%;          /* stone-200 */
    --input: 240 6% 89%;
    --ring: 142 71% 40%;
    
    --radius: 0.5rem;
  }

  [data-theme='night'] {
    /* Night Theme - "Graphite & Sage" Dark */
    --background: 20 14.3% 4.5%;   /* stone-950 */
    --foreground: 0 0% 90.2%;      /* stone-200 */
    
    --card: 20 14.3% 4.5%;
    --card-foreground: 0 0% 90.2%;
    
    --primary: 142 71% 40%;        /* sage-600 */
    --primary-foreground: 142 71% 97%;
    
    --secondary: 20 14.3% 9.5%;      /* stone-900 */
    --secondary-foreground: 0 0% 90.2%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --muted: 20 14.3% 15.1%;        /* stone-800 */
    --muted-foreground: 0 0% 63.9%;  /* stone-400 */
    
    --accent: 20 14.3% 9.5%;         /* stone-900 */
    --accent-foreground: 0 0% 98%;

    --border: 20 14.3% 15.1%;      /* stone-800 */
    --input: 20 14.3% 15.1%;
    --ring: 142 71% 40%;
  }
}

@layer base {
  body {
    @apply bg-background text-foreground;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

/* Centralized Form Input Styles */
@layer components {
  .input-style {
    @apply flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
  }

  .error-text {
    @apply text-sm font-medium text-destructive mt-1;
  }
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
  yOffset?: number
}

export function FadeIn({ children, duration = 0.6, delay = 0, className, yOffset = 20 }: FadeInProps) {
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: 'easeOut' }}
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

# components/providers/Providers.tsx
```tsx
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

```

# components/features/account/UpdatePasswordForm.tsx
```tsx
// components/features/account/UpdatePasswordForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema, TPasswordChangeSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useState } from 'react'

export function UpdatePasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TPasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
  })

  const updatePassword = api.user.updatePassword.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message)
      reset()
    },
    onError: (error) => {
      setError('root', { message: error.message || 'An unexpected error occurred.' })
    },
  })

  const onSubmit = (data: TPasswordChangeSchema) => {
    setSuccessMessage(null) // Clear previous messages
    updatePassword.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Choose a strong, new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="currentPassword">Current Password</label>
            <Input id="currentPassword" type="password" {...register('currentPassword')} />
            {errors.currentPassword && <p className="error-text">{errors.currentPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="newPassword">New Password</label>
            <Input id="newPassword" type="password" {...register('newPassword')} />
            {errors.newPassword && <p className="error-text">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          {successMessage && <p className="text-sm font-medium text-primary">{successMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

```

# components/features/account/ManageAddresses.tsx
```tsx
// components/features/account/ManageAddresses.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { AddressFormDialog } from './AddressFormDialog' // Import the new dialog

export function ManageAddresses() {
  const utils = api.useUtils()
  const { data: addresses, isLoading } = api.address.list.useQuery()

  const deleteAddress = api.address.delete.useMutation({
    onSuccess: () => {
      utils.address.list.invalidate()
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress.mutate({ id })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Shipping Addresses</CardTitle>
          <CardDescription>Manage your saved addresses.</CardDescription>
        </div>
        {/* "Add New" button now triggers the dialog in create mode */}
        <AddressFormDialog
          trigger={
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-muted-foreground text-center py-4">Loading addresses...</p>}
        <div className="space-y-4">
          {addresses?.map((address) => (
            <div key={address.id} className="p-4 border rounded-md flex justify-between items-start gap-4">
              <div className="flex-grow">
                <p className="font-semibold">{address.firstName} {address.lastName}</p>
                <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
                <p className="text-sm text-muted-foreground">{address.city}, {address.stateProvince} {address.postalCode}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                {address.isDefault && <Badge variant="secondary">Default</Badge>}
                <div className="flex gap-1">
                  {/* "Edit" button now triggers the dialog in edit mode */}
                  <AddressFormDialog
                    initialData={address}
                    trigger={
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {addresses?.length === 0 && !isLoading && (
            <p className="text-sm text-muted-foreground text-center py-4">You have no saved addresses.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

```

# components/features/account/AddressFormDialog.tsx
```tsx
// components/features/account/AddressFormDialog.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, TAddressSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/common/Dialog'
import type { Address } from '@prisma/client'
import { useState } from 'react'

interface AddressFormDialogProps {
  initialData?: Address | null
  trigger: React.ReactNode
  onSuccess?: () => void
}

export function AddressFormDialog({ initialData, trigger, onSuccess }: AddressFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const utils = api.useUtils()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      addressLine1: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      countryCode: 'US',
    },
  })

  const upsertAddress = api.address.upsert.useMutation({
    onSuccess: () => {
      utils.address.list.invalidate() // Refetch the address list
      setIsOpen(false) // Close the dialog
      reset() // Reset form state
      onSuccess?.()
    },
    onError: (error) => {
      // In a real app, you might set a form error here
      console.error('Failed to save address:', error)
    },
  })

  const onSubmit = (data: TAddressSchema) => {
    upsertAddress.mutate({
      ...data,
      id: initialData?.id,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName">First Name</label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="addressLine1">Address</label>
            <Input id="addressLine1" {...register('addressLine1')} />
            {errors.addressLine1 && <p className="error-text">{errors.addressLine1.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="city">City</label>
            <Input id="city" {...register('city')} />
            {errors.city && <p className="error-text">{errors.city.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="stateProvince">State/Province</label>
              <Input id="stateProvince" {...register('stateProvince')} />
              {errors.stateProvince && <p className="error-text">{errors.stateProvince.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="postalCode">Postal Code</label>
              <Input id="postalCode" {...register('postalCode')} />
              {errors.postalCode && <p className="error-text">{errors.postalCode.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

```

# components/features/account/UpdateProfileForm.tsx
```tsx
// components/features/account/UpdateProfileForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, TProfileSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import type { User } from '@prisma/client'

interface UpdateProfileFormProps {
  user: Pick<User, 'firstName' | 'lastName'>
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const utils = api.useUtils()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
  })

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      // Invalidate the 'me' query to refetch fresh data
      utils.user.me.invalidate()
      // Ideally, show a success toast here
    },
    onError: (error) => {
      setError('root', { message: error.message || 'An unexpected error occurred.' })
    },
  })

  const onSubmit = (data: TProfileSchema) => {
    updateProfile.mutate(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your name and personal details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName">First Name</label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
          </div>
          {errors.root && <p className="error-text">{errors.root.message}</p>}
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

```

# components/features/account/AccountNav.tsx
```tsx
// components/features/account/AccountNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/common/Button'

// Updated navigation items to include Dashboard as the primary link
const navItems = [
  { href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/account/profile', label: 'Profile Settings', icon: User },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            // Use startsWith for dashboard to handle potential sub-pages in the future
            pathname === item.href || (item.href === '/account/dashboard' && pathname.startsWith('/account'))
              ? 'bg-stone-200 text-foreground dark:bg-stone-800'
              : 'text-muted-foreground hover:bg-stone-200/50 hover:text-foreground dark:hover:bg-stone-800/50',
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </Button>
    </nav>
  )
}

```

# components/features/account/OrderHistoryItem.tsx
```tsx
// components/features/account/OrderHistoryItem.tsx
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'
import { formatPrice } from '@/lib/utils/formatters'
import { Badge } from '@/components/common/Badge' // We will create this component

type Order = inferRouterOutputs<AppRouter>['order']['all'][number]

interface OrderHistoryItemProps {
  order: Order
}

export function OrderHistoryItem({ order }: OrderHistoryItemProps) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="border rounded-lg p-4 transition-colors hover:bg-stone-100/50 dark:hover:bg-stone-900/50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-semibold">Order #{order.orderNumber}</p>
          <p className="text-sm text-muted-foreground">Date: {orderDate}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatPrice(order.total)}</p>
          <Badge
            variant={order.status === 'delivered' ? 'default' : 'secondary'}
            className="mt-1 capitalize"
          >
            {order.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}

```

# components/features/checkout/CheckoutForm.tsx
```tsx
// components/features/checkout/CheckoutForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shippingAddressSchema, TShippingAddressSchema } from '@/lib/validation/schemas'
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input' // Import new component

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
  })

  const processSubmit = async (data: TShippingAddressSchema) => {
    if (!stripe || !elements) return
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        shipping: {
          name: `${data.firstName} ${data.lastName}`,
          address: {
            line1: data.addressLine1,
            line2: data.addressLine2,
            city: data.city,
            state: data.stateProvince,
            postal_code: data.postalCode,
            country: data.countryCode,
          },
        },
      },
    })
    
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message || 'An unexpected error occurred.')
    } else {
      setErrorMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div>
                <label htmlFor="firstName">First name</label>
                <Input type="text" id="firstName" {...register('firstName')} className="mt-1"/>
                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last name</label>
                <Input type="text" id="lastName" {...register('lastName')} className="mt-1"/>
                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="addressLine1">Address</label>
                <Input type="text" id="addressLine1" {...register('addressLine1')} className="mt-1"/>
                {errors.addressLine1 && <p className="error-text">{errors.addressLine1.message}</p>}
            </div>
             <div className="sm:col-span-2">
                <label htmlFor="addressLine2">Apartment, suite, etc. (Optional)</label>
                <Input type="text" id="addressLine2" {...register('addressLine2')} className="mt-1"/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <Input type="text" id="city" {...register('city')} className="mt-1"/>
                {errors.city && <p className="error-text">{errors.city.message}</p>}
            </div>
             <div>
                <label htmlFor="stateProvince">State / Province</label>
                <Input type="text" id="stateProvince" {...register('stateProvince')} className="mt-1"/>
                {errors.stateProvince && <p className="error-text">{errors.stateProvince.message}</p>}
            </div>
            <div>
                <label htmlFor="postalCode">Postal code</label>
                <Input type="text" id="postalCode" {...register('postalCode')} className="mt-1"/>
                {errors.postalCode && <p className="error-text">{errors.postalCode.message}</p>}
            </div>
            <div>
                <label htmlFor="countryCode">Country</label>
                <Input type="text" id="countryCode" {...register('countryCode')} className="mt-1" defaultValue="US"/>
                {errors.countryCode && <p className="error-text">{errors.countryCode.message}</p>}
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="mt-4">
          <PaymentElement />
        </div>
      </div>

      {errorMessage && <div className="error-text text-center">{errorMessage}</div>}

      <Button type="submit" disabled={isLoading || !stripe || !elements} className="w-full" size="lg">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}

```

# components/features/cart/CartItem.tsx
```tsx
// components/features/cart/CartItem.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { formatPrice } from '@/lib/utils/formatters'
import { Minus, Plus, X } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity)
  }

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.image.url}
          alt={item.image.altText || item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3>
              <Link href={`/products/${item.product.slug}`}>{item.product.name}</Link>
            </h3>
            <p className="ml-4">{formatPrice(Number(item.variant.price) * item.quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-muted">{item.variant.name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex">
            <Button variant="ghost" type="button" onClick={() => removeItem(item.id)}>
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# components/features/cart/CartDrawer.tsx
```tsx
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

```

# components/features/product/ProductCard.tsx
```tsx
// components/features/product/ProductCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'
import type { ProductCardType } from '@/types'
import { formatPrice } from '@/lib/utils/formatters'

interface ProductCardProps {
  product: ProductCardType
  className?: string
  aspectRatio?: string
  priority?: boolean
}

export function ProductCard({
  product,
  className,
  aspectRatio = 'aspect-[4/5]',
  priority = false,
}: ProductCardProps) {
  const { addItem } = useCart()
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]
  const displayPrice = primaryVariant?.price ?? product.price

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // CRITICAL FIX: Ensure event propagation is stopped to prevent the parent Link from firing.
    e.preventDefault()
    e.stopPropagation()

    if (!primaryVariant) {
      console.error('No variant found for product:', product.name)
      return
    }

    addItem({
      id: primaryVariant.id,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
      },
      variant: {
        id: primaryVariant.id,
        name: primaryVariant.name,
        price: displayPrice,
      },
      image: {
        url: primaryImage?.url || '/placeholder.jpg',
        altText: primaryImage?.altText,
      },
    })
  }

  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
      <Link href={`/products/${product.slug}`} className="group block h-full">
        <Card className={cn('overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full flex flex-col', className)}>
          <CardHeader className="p-0">
            <div className={cn('relative overflow-hidden', aspectRatio)}>
              {primaryImage?.url ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText || product.name}
                  fill
                  priority={priority}
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="h-full w-full bg-secondary" />
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-medium truncate">{product.name}</CardTitle>
            <p className="mt-2 text-xl font-semibold">{formatPrice(displayPrice, { notation: 'standard' })}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            {/* The onClick handler is correctly passed here */}
            <Button variant="secondary" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

```

# components/features/product/Product3DViewer.tsx
```tsx
// components/features/product/Product3DViewer.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

interface Product3DViewerProps {
  modelUrl: string
}

export function Product3DViewer({ modelUrl }: Product3DViewerProps) {
  return (
    <div className="relative aspect-square h-full w-full">
      <Canvas camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
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
import { useCart } from '@/hooks/use-cart'
import { Minus, Plus } from 'lucide-react'
import type { ProductBySlugOutput } from '@/types'

interface ProductInfoProps {
  product: NonNullable<ProductBySlugOutput>
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, setDrawerOpen } = useCart()
  const [quantity, setQuantity] = useState(1)

  const primaryVariant = product.variants?.[0]
  const primaryImage = product.images?.[0]

  const handleAddToCart = () => {
    if (!primaryVariant) {
      console.error('No variant selected for product:', product.name)
      return
    }

    addItem(
      {
        id: primaryVariant.id,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
        },
        variant: {
          id: primaryVariant.id,
          name: primaryVariant.name,
          price: primaryVariant.price,
        },
        image: {
          url: primaryImage?.url || '/placeholder.jpg',
          altText: primaryImage?.altText,
        },
      },
      quantity,
    )
    setDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-4xl font-bold tracking-tight">{product.name}</h1>
      <p className="text-3xl">${product.price.toString()}</p>
      <p className="text-base text-muted dark:text-dark-muted">{product.shortDescription}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button size="lg" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <div className="prose prose-sm mt-4 text-muted dark:text-dark-muted max-w-none">
          {product.description}
        </div>
      </div>
    </div>
  )
}

```

# components/features/product/RelatedProducts.tsx
```tsx
// components/features/product/RelatedProducts.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { ProductCard } from './ProductCard'

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { data: relatedProducts, isLoading } = api.product.getRelated.useQuery({
    categoryId,
    currentProductId,
  })

  if (isLoading) {
    // Optional: Add skeleton loaders for a better UX
    return <div>Loading recommendations...</div>
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null // Don't render the section if there are no related products
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-center mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

```

# components/features/auth/AuthForm.tsx
```tsx
// components/features/auth/AuthForm.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TLoginSchema, TRegisterSchema, loginSchema, registerSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
// Import the new, dedicated AuthTabs components
import { AuthTabs, AuthTabsContent, AuthTabsList, AuthTabsTrigger } from '@/components/features/auth/AuthTabs'
import { Input } from '@/components/common/Input'
import { Chrome } from 'lucide-react'

interface AuthFormProps {
  defaultTab: 'login' | 'register'
}

export function AuthForm({ defaultTab }: AuthFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(defaultTab)

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    setError: setLoginError,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) })

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegisterForm,
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) })

  const registerUser = api.user.register.useMutation({
    onSuccess: () => {
      setActiveTab('login')
      resetRegisterForm()
    },
    onError: (error) => {
      console.error('Registration failed:', error.message)
    },
  })

  const onLoginSubmit = async (data: TLoginSchema) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (result?.error) {
      setLoginError('root', { message: 'Invalid email or password.' })
    } else {
      router.push('/account/dashboard') // Go to dashboard on successful login
      router.refresh()
    }
  }

  const onRegisterSubmit = (data: TRegisterSchema) => {
    registerUser.mutate(data)
  }

  return (
    <AuthTabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full max-w-md">
      <AuthTabsList>
        <AuthTabsTrigger value="login">Sign In</AuthTabsTrigger>
        <AuthTabsTrigger value="register">Create Account</AuthTabsTrigger>
      </AuthTabsList>

      <AuthTabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your journey with The Scent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email">Email</label>
                <Input id="login-email" type="email" {...registerLogin('email')} />
                {loginErrors.email && <p className="error-text">{loginErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="login-password">Password</label>
                <Input id="login-password" type="password" {...registerLogin('password')} />
                {loginErrors.password && <p className="error-text">{loginErrors.password.message}</p>}
              </div>
              {loginErrors.root && <p className="error-text text-center">{loginErrors.root.message}</p>}
              <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
                {isLoginSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => signIn('google')}>
              <Chrome className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </AuthTabsContent>

      <AuthTabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Begin your journey with us today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName">First Name</label>
                  <Input id="firstName" {...registerRegister('firstName')} />
                  {registerErrors.firstName && <p className="error-text">{registerErrors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName">Last Name</label>
                  <Input id="lastName" {...registerRegister('lastName')} />
                  {registerErrors.lastName && <p className="error-text">{registerErrors.lastName.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="register-email">Email</label>
                <Input id="register-email" type="email" {...registerRegister('email')} />
                {registerErrors.email && <p className="error-text">{registerErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="register-password">Password</label>
                <Input id="register-password" type="password" {...registerRegister('password')} />
                {registerErrors.password && <p className="error-text">{registerErrors.password.message}</p>}
              </div>
              {registerUser.isError && <p className="error-text">{registerUser.error.message}</p>}
              <Button type="submit" className="w-full" disabled={isRegisterSubmitting}>
                {isRegisterSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </AuthTabsContent>
    </AuthTabs>
  )
}

```

# components/features/auth/AuthTabs.tsx
```tsx
// components/features/auth/AuthTabs.tsx
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

// A new, dedicated set of Tab components specifically for the Auth forms.
// This decouples its specific styling from the generic Tabs component.

const AuthTabs = TabsPrimitive.Root

const AuthTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'grid w-full grid-cols-2 items-center justify-center rounded-lg border p-1',
      className,
    )}
    {...props}
  />
))
AuthTabsList.displayName = TabsPrimitive.List.displayName

const AuthTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md',
      className,
    )}
    {...props}
  />
))
AuthTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const AuthTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
AuthTabsContent.displayName = TabsPrimitive.Content.displayName

export { AuthTabs, AuthTabsList, AuthTabsTrigger, AuthTabsContent }

```

# components/features/newsletter/NewsletterForm.tsx
```tsx
// components/features/newsletter/NewsletterForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, TNewsletterSchema } from '@/lib/validation/schemas'
import { api } from '@/lib/api/trpc'
import { Button } from '@/components/common/Button'
import { useState } from 'react'
import { Input } from '@/components/common/Input' // Import new component

export function NewsletterForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
  })

  const subscribe = api.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message)
      reset()
    },
    onError: (error) => {
      console.error('Subscription failed:', error)
      setSuccessMessage('Something went wrong. Please try again.')
    },
  })

  const onSubmit = (data: TNewsletterSchema) => {
    setSuccessMessage(null)
    subscribe.mutate(data)
  }

  if (successMessage) {
    return (
      <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-md">
        <p className="font-semibold text-primary">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          // This input needs a specific style for its context in the dark footer
          className="flex-1 bg-stone-900/50 border-stone-700 placeholder:text-stone-400 focus:ring-primary"
        />
        <Button type="submit" variant="primary" size="sm" disabled={subscribe.isPending}>
          {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {errors.email && <p className="error-text">{errors.email.message}</p>}
    </form>
  )
}

```

# components/features/shop/SortDropdown.tsx
```tsx
// components/features/shop/SortDropdown.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SORT_OPTIONS } from '@/lib/config/shop'

export function SortDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || SORT_OPTIONS.LATEST

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-muted-foreground">Sort by:</label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="input-style text-sm py-1"
      >
        <option value={SORT_OPTIONS.LATEST}>Latest</option>
        <option value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</option>
        <option value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</option>
      </select>
    </div>
  )
}

```

# components/features/shop/CategoryFilterBar.tsx
```tsx
// components/features/shop/CategoryFilterBar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { cn } from '@/lib/utils'

export function CategoryFilterBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const { data: categories, isLoading } = api.product.getCategoryList.useQuery() // We'll need to create this procedure

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    return params.toString()
  }

  if (isLoading || !categories) {
    return <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-md animate-pulse" />
  }

  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-2 items-center">
      <Link
        href={pathname}
        className={cn('px-3 py-1 text-sm rounded-full transition-colors',
          !currentCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
        )}
      >
        All Products
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`${pathname}?${createQueryString('category', cat.slug)}`}
          className={cn('px-3 py-1 text-sm rounded-full transition-colors',
            currentCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
          )}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}

```

# components/features/shop/FiltersSidebar.tsx
```tsx
// components/features/shop/FiltersSidebar.tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { Search } from 'lucide-react'
import { Input } from '@/components/common/Input' // Using the new Input component

export function FiltersSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleApplyFilters = (formData: FormData) => {
    const params = new URLSearchParams(searchParams)
    const minPrice = formData.get('minPrice') as string
    const maxPrice = formData.get('maxPrice') as string
    const searchQuery = formData.get('q') as string // Changed from 'searchQuery' to 'q'

    if (minPrice) params.set('minPrice', minPrice)
    else params.delete('minPrice')
    if (maxPrice) params.set('maxPrice', maxPrice)
    else params.delete('maxPrice')
    if (searchQuery) params.set('q', searchQuery)
    else params.delete('q')

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form action={handleApplyFilters} className="space-y-6 sticky top-24">
      <div>
        <h3 className="font-semibold mb-2">Search Products</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="q" // Changed from 'searchQuery' to 'q'
            type="search"
            defaultValue={searchParams.get('q') || ''}
            placeholder="Search..."
            className="pl-9 w-full"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            name="minPrice"
            type="number"
            defaultValue={searchParams.get('minPrice') || ''}
            placeholder="Min"
          />
          <span>-</span>
          <Input
            name="maxPrice"
            type="number"
            defaultValue={searchParams.get('maxPrice') || ''}
            placeholder="Max"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  )
}

```

# components/features/shop/ProductList.tsx
```tsx
// components/features/shop/ProductList.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'
import { GenericError, ProductCardSkeleton } from '@/components/common/Skeletons'
import type { SerializableProduct } from '@/types'

// This component receives the initial data from the server,
// but then handles all subsequent client-side fetching for filters/sorting.
interface ProductListProps {
  initialProducts: SerializableProduct[]
  initialCategoryName?: string
}

export function ProductList({ initialProducts, initialCategoryName }: ProductListProps) {
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || 'createdAt_desc'
  const q = searchParams.get('q') || undefined
  const minPrice = searchParams.get('minPrice') || undefined
  const maxPrice = searchParams.get('maxPrice') || undefined

  const [sortBy, sortOrder] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc']

  const { data, isLoading, isError, refetch } = api.product.list.useQuery(
    {
      limit: 12,
      category,
      sortBy,
      sortOrder,
      q,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    },
    {
      initialData: { items: initialProducts, nextCursor: null }, // Use server-fetched data initially
      enabled: !!(category || q || minPrice || maxPrice || sort !== 'createdAt_desc'), // Only refetch on client if filters are applied
    },
  )

  const products = data?.items || initialProducts

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    )
  }

  if (isError) {
    return <GenericError onRetry={() => refetch()} />
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold">No Products Found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

```

# components/features/home/FeaturedProducts.tsx
```tsx
// components/features/home/FeaturedProducts.tsx
import { ProductCard } from '@/components/features/product/ProductCard'
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Link from 'next/link'
import type { ProductCardType } from '@/types'

interface FeaturedProductsProps {
  products: ProductCardType[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length < 3) {
    return null
  }

  const [heroProduct, ...otherProducts] = products

  return (
    <section className="py-20 bg-stone-100 dark:bg-stone-900/50" id="featured-products">
      <div className="container mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured Collections
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Handpicked for you, these are the scents our community is currently loving.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Hero Product - Left Column */}
          <FadeIn yOffset={40}>
            <ProductCard
              product={heroProduct}
              aspectRatio="aspect-square md:aspect-[4/5]"
              className="h-full"
              priority
            />
          </FadeIn>

          {/* Stacked Side Products - Right Column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {otherProducts.slice(0, 2).map((product, index) => (
              <FadeIn key={product.id} yOffset={40} delay={(index + 1) * 0.1}>
                <ProductCard product={product} aspectRatio="aspect-video sm:aspect-[2/1] lg:aspect-[16/7]" />
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn className="mt-12 text-center" yOffset={40}>
          <Button asChild size="lg">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}

```

# components/features/home/HeroSection.tsx
```tsx
// components/features/home/HeroSection.tsx
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

export function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="container relative z-20 flex flex-col items-center justify-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-heading"
        >
          A Digital Sanctuary for the Senses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 max-w-xl text-lg text-white/80"
        >
          Explore our collection of premium, natural aromatherapy products designed to
          transform your space and elevate your well-being.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="px-8 py-6 text-base">
            <Link href="/products">Explore The Collection</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-base bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link href="/journal">Read Our Journal</Link>
          </Button>
        </motion.div>
      </div>

      <button
        onClick={toggleMute}
        className="absolute top-24 right-4 md:right-8 z-20 p-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </section>
  )
}

```

# components/features/journal/PostBody.tsx
```tsx
// components/features/journal/PostBody.tsx
'use client'

import { PortableText, type PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/cms/image'

const ptComponents = {
  types: {
    image: ({ value }: { value: PortableTextBlock & { asset?: any } }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative my-6 aspect-video">
          <Image
            src={urlForImage(value).fit('max').auto('format').url()}
            alt={value.alt || ' '}
            fill
            className="object-contain"
            loading="lazy"
          />
        </div>
      )
    },
  },
}

export function PostBody({ content }: { content: PortableTextBlock[] }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <PortableText value={content} components={ptComponents} />
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
        'rounded-lg border border-border bg-limestone text-charcoal shadow-sm dark:border-dark-border dark:bg-midnight dark:text-pearl',
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
  <p ref={ref} className={cn('text-sm text-muted dark:text-dark-muted', className)} {...props} />
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

# components/common/Input.tsx
```tsx
// components/common/Input.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }

```

# components/common/Layout/Header.tsx
```tsx
// components/common/Layout/Header.tsx
'use client'

import Link from 'next/link'
import { LayoutDashboard, Moon, Search, ShoppingBag, Sun, User } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { CartDrawer } from '@/components/features/cart/CartDrawer'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()
  const { theme, toggleTheme } = useUIStore()
  const { getTotalItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border bg-background/80 backdrop-blur-lg'
            : 'bg-transparent',
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex flex-col items-start leading-none">
            <span className="font-heading text-3xl font-bold tracking-wider uppercase text-foreground">
              The Scent
            </span>
            <span className="text-xs font-light tracking-[0.2em] text-primary -mt-1">
              AROMATHERAPY
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">Shop</Link>
            <Link href="/journal" className="text-foreground hover:text-primary transition-colors">Journal</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link href={session ? "/account/dashboard" : "/login"} passHref>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {/* The cart icon is now a link to the cart page */}
            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>
      {/* The CartDrawer remains to be opened programmatically when an item is added */}
      <CartDrawer />
    </>
  )
}

```

# components/common/Layout/Footer.tsx
```tsx
// components/common/Layout/Footer.tsx
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { NewsletterForm } from '@/components/features/newsletter/NewsletterForm'

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const shopLinks = [
    { href: '/products?category=essential-oils', label: 'Essential Oils' },
    { href: '/products?category=natural-soaps', label: 'Natural Soaps' },
    { href: '/products?category=gift-sets', label: 'Gift Sets' },
    { href: '/products?category=new-arrivals', label: 'New Arrivals' },
    { href: '/products?category=bestsellers', label: 'Bestsellers' },
  ]

  const helpLinks = [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQs' },
    { href: '/shipping-returns', label: 'Shipping & Returns' },
    { href: '/account/orders', label: 'Track Your Order' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ]

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-stone-50">The Scent</h3>
            <p className="text-sm text-stone-400">
              Creating premium aromatherapy products to enhance mental and physical well-being
              through the power of nature.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-stone-400 hover:text-stone-50 transition-colors">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-stone-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-stone-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-stone-50">Stay Connected</h3>
            <p className="text-sm text-stone-400">
              Join our newsletter for exclusive offers, new products, and wellness tips.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p className="text-stone-500">&copy; {new Date().getFullYear()} The Scent. All Rights Reserved.</p>
          <div className="flex items-center gap-3 text-stone-500">
            <span>Accepted Payments:</span>
            <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-6 opacity-60" />
            <img src="/payment-icons/paypal.svg" alt="PayPal" className="h-5 opacity-60" />
            <img src="/payment-icons/amex.svg" alt="American Express" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  )
}

```

# components/common/Dialog.tsx
```tsx
// components/common/Dialog.tsx
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
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
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // Re-imagined secondary variant for high contrast on any background
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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

# components/common/Sheet.tsx
```tsx
// components/common/Sheet.tsx
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-limestone dark:bg-charcoal p-6 shadow-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# components/common/Tabs.tsx
```tsx
// components/common/Tabs.tsx
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-stone-200 p-1 text-muted dark:bg-charcoal dark:text-dark-muted',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-limestone data-[state=active]:text-charcoal data-[state=active]:shadow-sm dark:data-[state=active]:bg-dark-border dark:data-[state=active]:text-pearl',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

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

# components/common/Skeletons.tsx
```tsx
// components/common/Skeletons.tsx
import { Card, CardContent, CardFooter, CardHeader } from '@/components/common/Card'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

/**
 * A skeleton component that mimics the layout of a ProductCard.
 * Used to provide a better loading state UI on the products page.
 */
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-6 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
        <div className="mt-3 h-7 w-1/3 rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardFooter>
    </Card>
  )
}

/**
 * A generic error component to display when tRPC queries fail.
 */
export function GenericError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 text-destructive">
      <AlertTriangle className="h-12 w-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Something Went Wrong</h3>
      <p className="text-muted-foreground mb-6">We couldn't load the requested data. Please try again.</p>
      <Button onClick={onRetry} variant="destructive">
        Try Again
      </Button>
    </div>
  )
}

```

# components/common/Badge.tsx
```tsx
// components/common/Badge.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

```

# hooks/use-cart.ts
```ts
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

# lib/cms/sanity.ts
```ts
// lib/cms/sanity.ts
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

// Improved validation to provide a clear error message
if (!projectId || projectId === 'REPLACE_WITH_YOUR_SANITY_PROJECT_ID') {
  throw new Error(
    'Sanity project ID is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env file.',
  )
}
if (!dataset) {
  throw new Error(
    'Sanity dataset is not configured. Please set NEXT_PUBLIC_SANITY_DATASET in your .env file.',
  )
}
if (!apiVersion) {
  throw new Error(
    'Sanity API version is not configured. Please set NEXT_PUBLIC_SANITY_API_VERSION in your .env file.',
  )
}


export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
})

```

# lib/cms/image.ts
```ts
// lib/cms/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: any) {
  return builder.image(source)
}

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

# lib/utils/formatters.ts
```ts
// lib/utils/formatters.ts

export function formatPrice(
  price: number | string | undefined | null,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP'
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price ?? 0

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

```

# lib/validation/schemas.ts
```ts
// lib/validation/schemas.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
})

// Combined schema for profile updates
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
})

// Schema for changing password
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required.' }),
    newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

// Reusable address schema
export const addressSchema = z.object({
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  stateProvince: z.string().min(1, 'State / Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  countryCode: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
})

export const shippingAddressSchema = addressSchema // Shipping can reuse the base address schema

export const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
})

export type TLoginSchema = z.infer<typeof loginSchema>
export type TRegisterSchema = z.infer<typeof registerSchema>
export type TProfileSchema = z.infer<typeof profileSchema>
export type TPasswordChangeSchema = z.infer<typeof passwordChangeSchema>
export type TAddressSchema = z.infer<typeof addressSchema>
export type TShippingAddressSchema = z.infer<typeof shippingAddressSchema>
export type TNewsletterSchema = z.infer<typeof newsletterSchema>

```

# lib/auth/config.ts
```ts
// lib/auth/config.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db/client'
import { compare } from 'bcryptjs'
import { loginSchema } from '@/lib/validation/schemas'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
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
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        if (!user || !user.passwordHash) return null

        const isValid = await compare(parsed.data.password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.firstName,
          image: user.avatarUrl,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login page on error
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

/**
 * A set of typesafe hooks for consuming your tRPC API from Client Components.
 */
export const api = createTRPCReact<AppRouter>()

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

# lib/config/shop.ts
```ts
// lib/config/shop.ts

/**
 * Defines the available sorting options for the product list.
 * Using a constant object ensures type safety and prevents typos,
 * as these values are shared between the client (SortDropdown) and the server (tRPC router).
 */
export const SORT_OPTIONS = {
  LATEST: 'createdAt_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
} as const

// We can infer the type directly from the object for use in other parts of the app
export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

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
  previewFeatures = []
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
  name              String?
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
  modelUrl          String? // New field for the 3D model path
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
}

model Order {
  id                    String      @id @default(uuid())
  orderNumber           String      @unique
  status                OrderStatus @default(pending)
  total                 Decimal     @db.Decimal(10, 2)
  notes                 String?
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  userId                String?
  user                  User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  shippingAddress       Json?
  billingAddress        Json?
  items                 OrderItem[]
  stripePaymentIntentId String?     @unique
  paymentStatus         String      @default("pending")
}

model OrderItem {
  id           String         @id @default(uuid())
  quantity     Int
  price        Decimal        @db.Decimal(10, 2) // Price per item at time of purchase
  orderId      String
  order        Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variantId    String
  variant      ProductVariant @relation(fields: [variantId], references: [id], onDelete: NoAction)
  productId    String
  product      Product        @relation(fields: [productId], references: [id], onDelete: NoAction)
  // Denormalized data for historical accuracy
  productName  String
  variantName  String
  productImage String?
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

# prisma/migrations/20250626145128_imageurl/migration.sql
```sql
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "modelUrl" TEXT;

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

# prisma/migrations/20250626094647_update_order_model/migration.sql
```sql
/*
  Warnings:

  - You are about to drop the column `appliedCoupons` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripePaymentIntentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropIndex
DROP INDEX "Order_userId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "appliedCoupons",
DROP COLUMN "billingAddressId",
DROP COLUMN "shippingAddressId",
ADD COLUMN     "billingAddress" JSONB,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "shippingAddress" JSONB,
ADD COLUMN     "stripePaymentIntentId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productImage" TEXT,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "variantName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripePaymentIntentId_key" ON "Order"("stripePaymentIntentId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# prisma/seed.ts
```ts
// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

type TransactionClient = Prisma.TransactionClient

async function main() {
  await prisma.$transaction(async (tx: TransactionClient) => {
    console.log('🌱 Starting unified seed process...')

    console.log('   - Deleting existing data in correct order...')
    await tx.orderItem.deleteMany({})
    await tx.order.deleteMany({})
    await tx.address.deleteMany({})
    await tx.review.deleteMany({})
    await tx.cartItem.deleteMany({})
    await tx.cart.deleteMany({})
    await tx.wishlist.deleteMany({})
    await tx.productImage.deleteMany({})
    await tx.productVariant.deleteMany({})
    await tx.product.deleteMany({})
    await tx.category.deleteMany({})
    await tx.brand.deleteMany({})
    await tx.emailSubscription.deleteMany({})
    await tx.userPreference.deleteMany({})
    await tx.session.deleteMany({})
    await tx.user.deleteMany({})
    console.log('   ✓ All existing data cleared successfully.')

    const hashedPassword = await hash('StrongPass123!', 12)
    const user = await tx.user.create({
      data: {
        email: 'test@thescent.com',
        firstName: 'Test',
        lastName: 'User',
        passwordHash: hashedPassword,
        role: 'customer',
        emailVerified: new Date(),
      },
    })
    console.log(`   ✓ Created user: ${user.email}`)

    const oilsCategory = await tx.category.create({
      data: { name: 'Essential Oils', slug: 'essential-oils' },
    })
    const soapsCategory = await tx.category.create({
      data: { name: 'Natural Soaps', slug: 'natural-soaps' },
    })
    console.log('   ✓ Created categories.')

    console.log('   - Seeding all 6 products...')
    
    await tx.product.create({
      data: {
        name: 'Lavender Dreams Oil',
        slug: 'lavender-dreams-oil',
        sku: 'EO-LAV-01',
        description: 'Our Lavender Dreams essential oil is sourced from the high-altitude fields of Provence, France, known for producing the most fragrant and therapeutically potent lavender. Its soothing aroma is perfect for calming the mind, relieving stress, and promoting a peaceful night\'s sleep. Ideal for diffusion, massage, or adding to a warm bath.',
        shortDescription: 'Pure, calming lavender oil from Provence.',
        price: 29.99,
        isFeatured: true,
        isActive: true,
        modelUrl: '/models/bottle.glb',
        categoryId: oilsCategory.id,
        variants: { create: { sku: 'EO-LAV-01-15ML', name: '15ml Bottle', price: 29.99, inventoryQuantity: 100 } },
        images: { create: { url: '/images/products/prod_1.jpg', altText: 'A glass bottle of Lavender Dreams essential oil.', isPrimary: true } },
      },
    })
    
    await tx.product.create({
      data: {
        name: 'Citrus Burst Oil',
        slug: 'citrus-burst-oil',
        sku: 'EO-CIT-02',
        description: 'An uplifting blend of sweet orange, lemon, and grapefruit essential oils designed to energize your space and boost your mood. Its bright, zesty aroma is a perfect pick-me-up for any time of day.',
        shortDescription: 'Energizing blend of citrus oils.',
        price: 24.99,
        isFeatured: true,
        isActive: true,
        categoryId: oilsCategory.id,
        variants: { create: { sku: 'EO-CIT-02-15ML', name: '15ml Bottle', price: 24.99, inventoryQuantity: 80 } },
        images: { create: { url: '/images/products/prod_2.jpg', altText: 'A bottle of citrus oil.', isPrimary: true } },
      },
    })
    
    await tx.product.create({
      data: {
        name: 'Rose Petal Soap',
        slug: 'rose-petal-soap',
        sku: 'SOAP-ROS-01',
        description: 'A luxurious, handcrafted soap infused with real rose petals and moisturizing shea butter. Its gentle formula cleanses without stripping moisture, leaving skin soft, supple, and delicately scented.',
        shortDescription: 'Hydrating soap with real rose petals.',
        price: 12.50,
        isFeatured: true,
        isActive: true,
        categoryId: soapsCategory.id,
        variants: { create: { sku: 'SOAP-ROS-01-BAR', name: '120g Bar', price: 12.50, inventoryQuantity: 150 } },
        images: { create: { url: '/images/products/prod_3.jpg', altText: 'A bar of pink soap.', isPrimary: true } },
      },
    })
    
    await tx.product.create({
      data: {
        name: 'Eucalyptus Clarity Oil',
        slug: 'eucalyptus-clarity-oil',
        sku: 'EO-EUC-03',
        description: 'A sharp, camphoraceous aroma of pure Eucalyptus oil to promote clear breathing and a focused mind. Excellent for use in a steam inhalation or diffused in your workspace.',
        shortDescription: 'Refreshing and clarifying eucalyptus oil.',
        price: 19.99,
        isFeatured: true,
        isActive: true,
        categoryId: oilsCategory.id,
        variants: { create: { sku: 'EO-EUC-03-15ML', name: '15ml Bottle', price: 19.99, inventoryQuantity: 120 } },
        images: { create: { url: '/images/products/prod_4.jpg', altText: 'A bottle of eucalyptus oil.', isPrimary: true } },
      },
    })
    
    await tx.product.create({
      data: {
        name: 'Oat & Honey Soap',
        slug: 'oat-and-honey-soap',
        sku: 'SOAP-OAT-02',
        description: 'A gentle, exfoliating soap bar made with colloidal oatmeal and raw honey. Perfect for soothing sensitive or irritated skin while providing a rich, comforting lather.',
        shortDescription: 'Soothing and exfoliating oatmeal soap.',
        price: 13.50,
        isFeatured: false,
        isActive: true,
        categoryId: soapsCategory.id,
        variants: { create: { sku: 'SOAP-OAT-02-BAR', name: '120g Bar', price: 13.50, inventoryQuantity: 200 } },
        images: { create: { url: '/images/products/prod_5.jpg', altText: 'A handcrafted bar of oat and honey soap.', isPrimary: true } },
      }
    })
    
    await tx.product.create({
      data: {
        name: 'Peaceful Night Blend',
        slug: 'peaceful-night-blend',
        sku: 'EO-SLEEP-04',
        description: 'A serene blend of Lavender, Chamomile, and Sandalwood essential oils, expertly crafted to promote deep relaxation and a restful night\'s sleep. Ideal for evening diffusion.',
        shortDescription: 'A calming blend for restful sleep.',
        price: 32.00,
        isFeatured: false,
        isActive: true,
        categoryId: oilsCategory.id,
        variants: { create: { sku: 'EO-SLEEP-04-15ML', name: '15ml Bottle', price: 32.00, inventoryQuantity: 75 } },
        images: { create: { url: '/images/products/prod_6.jpg', altText: 'A dark glass bottle of Peaceful Night blend.', isPrimary: true } },
      }
    })

    console.log(`   ✓ Seeded 6 total products.`)
  });
  console.log('✅ Unified seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
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

# public/payment-icons/paypal.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-labelledby="paypal-title">
  <title id="paypal-title">PayPal</title>      
  <path d="M8.2 6.3c.3-1.1 1.2-2.1 2.3-2.1h5c3.2 0 5.2 1.8 4.5 5.2-.6 2.8-2.6 4.3-5.2 4.3h-1.3c-.6 0-1.1.4-1.2 1l-.8 4.5c-.1.4-.4.6-.8.6H6.6c-.5 0-.8-.4-.7-1l2.3-12.2zm4.3 6.2c1.7 0 2.9-1 3.3-3.2.3-1.7-.6-2.5-2-2.5h-2.1L11 12.5h1.5z"/>
</svg>

```

# public/payment-icons/amex.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-labelledby="amex-title">
  <title id="amex-title">American Express</title>
  <path d="M21.1 3H2.9C2.4 3 2 3.4 2 3.9v16.2c0 .5.4.9.9.9h18.2c.5 0 .9-.4.9-.9V3.9c0-.5-.4-.9-.9-.9zM9.4 16.5H6.8l-.8-2.4h-2v2.4H2.5V7.5h4.2c2.1 0 3.5 1.1 3.5 3.1 0 1.4-.7 2.4-1.8 2.8l2 3.1zm-4.3-4.5h1.7c.9 0 1.5-.4 1.5-1.2s-.6-1.1-1.5-1.1H5.1v2.3zm16.4 4.5h-4.2l-2.4-3.7-2.4 3.7h-4.2L13.1 12 8.3 7.5h4.2l2.4 3.7 2.4-3.7h4.2L18.4 12l2.5 4.5z"/>
</svg>

```

# public/payment-icons/mastercard.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-labelledby="mastercard-title">
  <title id="mastercard-title">Mastercard</title>
  <path d="M12 6.1c-3.2 0-6.1 1.5-8.1 4a9.2 9.2 0 0 0-.2 9.8c2 2.5 5 4 8.2 4s6.2-1.5 8.2-4a9.2 9.2 0 0 0-.1-9.8c-2-2.5-5-4-8.1-4zm4.4 7.2c-.3 1-.8 1.9-1.5 2.6-.5.5-1.1.9-1.8 1.2h2.5c.4 0 .8.2 1 .5.3.3.4.7.4 1.1 0 .4-.2.8-.5 1-.3.3-.7.5-1.1.5h-7c-.4 0-.8-.2-1-.5-.3-.3-.5-.7-.5-1.1 0-.4.2-.8.5-1.1.3-.2.6-.4 1-.4h.2c2.4 0 4.6-1.1 6-2.9.2-.3.3-.6.4-.9h-5.2c-.4 0-.8-.2-1-.5-.3-.3-.5-.7-.5-1.1 0-.4.2-.8.5-1.1.3-.2.6-.4 1-.4h6.2c.2 0 .4.2.5.4.1.3.2.6.2.9z"/>
  <path d="M12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 5.4 4.4 9.8 9.8 9.8s9.8-4.4 9.8-9.8c0-5.4-4.4-9.8-9.8-9.8zm0 18c-4.5 0-8.2-3.7-8.2-8.2S7.5 3.8 12 3.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"/>
</svg>

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

# server/routers/journal.ts
```ts
// server/routers/journal.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { sanityClient } from '@/lib/cms/sanity'
import { TRPCError } from '@trpc/server'

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  "authorName": author->name,
  publishedAt,
  excerpt,
`

export const journalRouter = router({
  listPosts: publicProcedure.query(async () => {
    const query = `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`
    const posts = await sanityClient.fetch(query)
    return posts
  }),

  postBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        ${POST_FIELDS}
        body
      }`
      const post = await sanityClient.fetch(query, { slug: input.slug })

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Post with slug "${input.slug}" not found.`,
        })
      }
      return post
    }),
})

```

# server/routers/checkout.ts
```ts
// server/routers/checkout.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { stripe } from '@/lib/payments/stripe'
import { TRPCError } from '@trpc/server'
import { prisma } from '@/lib/db/client'

export const checkoutRouter = router({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        // The input is now a structured array, providing better type safety.
        cartItems: z.array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1),
          }),
        ),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { cartItems, userId } = input

        // Fetch product details from the database to ensure prices are accurate and not manipulated on the client.
        const variantIds = cartItems.map((item) => item.id)
        const variants = await prisma.productVariant.findMany({
          where: { id: { in: variantIds } },
          select: { id: true, price: true },
        })

        const amount = cartItems.reduce((total, cartItem) => {
          const variant = variants.find((v) => v.id === cartItem.id)
          if (!variant) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: `Invalid item in cart: Variant with ID ${cartItem.id} not found.`,
            })
          }
          const priceInNumber = variant.price.toNumber()
          return total + priceInNumber * cartItem.quantity
        }, 0)

        // Prevent creating a payment intent for a zero-value cart
        if (amount <= 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot process an empty or zero-value cart.',
          })
        }

        // The metadata needs to be a flat object of strings.
        // We'll stringify the cart details for the webhook.
        const metadataForStripe = {
          cartDetails: JSON.stringify(cartItems),
          userId: userId || 'guest',
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Stripe expects the amount in cents
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: metadataForStripe,
        })

        if (!paymentIntent.client_secret) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create payment intent.',
          })
        }

        return {
          clientSecret: paymentIntent.client_secret,
        }
      } catch (error) {
        console.error('Stripe Payment Intent Error:', error)
        // Propagate specific TRPC errors or a generic one
        if (error instanceof TRPCError) throw error
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not create a payment session.',
        })
      }
    }),
})

```

# server/routers/newsletter.ts
```ts
// server/routers/newsletter.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { newsletterSchema } from '@/lib/validation/schemas'
import { TRPCError } from '@trpc/server'

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(newsletterSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input

      const existingSubscription = await ctx.prisma.emailSubscription.findUnique({
        where: { email },
      })

      if (existingSubscription) {
        if (existingSubscription.isActive) {
          // You can choose to throw an error or just return a success message
          return { message: 'You are already subscribed!' }
        }
        // If they were inactive, re-activate them
        await ctx.prisma.emailSubscription.update({
          where: { email },
          data: { isActive: true },
        })
        return { message: 'Welcome back! You have been re-subscribed.' }
      }

      // Create new subscription
      await ctx.prisma.emailSubscription.create({
        data: {
          email,
          isActive: true,
        },
      })

      return { message: 'Thank you for subscribing!' }
    }),
})

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

# server/routers/dashboard.ts
```ts
// server/routers/dashboard.ts
import { router, protectedProcedure } from '../trpc'

// Helper function to serialize order data
const serializeOrder = (order: any) => ({
  ...order,
  total: order.total.toNumber(),
})

// Helper to serialize recommendation products
const serializeProduct = (product: any) => ({
  ...product,
  price: product.price.toNumber(),
})

export const dashboardRouter = router({
  getDashboardData: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx

    const [orderCount, recentOrders, recommendations] = await Promise.all([
      // 1. Get total order count
      prisma.order.count({
        where: { userId: session.user.id },
      }),
      // 2. Get the 5 most recent orders
      prisma.order.findMany({
        where: { userId: session.user.id },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      // 3. Get placeholder recommendations (e.g., featured products)
      prisma.product.findMany({
        where: { isFeatured: true, isActive: true },
        take: 2,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
        },
      }),
    ])

    return {
      stats: {
        orderCount,
        // Placeholder for future logic
        quizResultsCount: 4, 
      },
      recentOrders: recentOrders.map(serializeOrder),
      recommendations: recommendations.map(serializeProduct),
    }
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
// server/routers/product.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { Prisma } from '@prisma/client'

const serializeProduct = (product: any) => ({
  ...product,
  price: product.price.toNumber(),
  variants: product.variants.map((variant: any) => ({
    ...variant,
    price: variant.price.toNumber(),
  })),
})

export const productRouter = router({
  // ... (list, bySlug, etc. procedures remain unchanged)
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        cursor: z.string().nullish(),
        category: z.string().optional(),
        sortBy: z.enum(['createdAt', 'price']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
        minPrice: z.coerce.number().optional(),
        maxPrice: z.coerce.number().optional(),
        q: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, category, sortBy, sortOrder, minPrice, maxPrice, q } = input
      const whereClause: Prisma.ProductWhereInput = { isActive: true }

      if (category) whereClause.category = { slug: category }

      if (minPrice !== undefined || maxPrice !== undefined) {
        whereClause.price = {}
        if (minPrice !== undefined) whereClause.price.gte = minPrice
        if (maxPrice !== undefined) whereClause.price.lte = maxPrice
      }

      if (q) {
        whereClause.OR = [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { category: { name: { contains: q, mode: 'insensitive' } } },
        ]
      }

      const products = await ctx.prisma.product.findMany({
        take: limit + 1,
        where: whereClause,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: { select: { name: true, slug: true } },
          variants: { orderBy: { price: 'asc' }, take: 1 },
          images: { where: { isPrimary: true }, take: 1 },
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (products.length > limit) {
        const nextItem = products.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: products.map(serializeProduct),
        nextCursor,
      }
    }),

  getFeatured: publicProcedure
    .input(
      z.object({
        // Updated limit for the new 1 + 2 layout
        limit: z.number().min(1).max(12).default(3),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: input.limit,
        where: {
          isActive: true,
          isFeatured: true,
        },
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { name: true, slug: true } },
          variants: { orderBy: { price: 'asc' }, take: 1 },
          images: { where: { isPrimary: true }, take: 1 },
        },
      })
      return products.map(serializeProduct)
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: { slug: input.slug, isActive: true },
        include: {
          variants: true,
          images: true,
          reviews: { include: { user: { select: { firstName: true, avatarUrl: true } } } },
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

      return serializeProduct(product)
    }),

  getRelated: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
        currentProductId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: 4,
        where: {
          isActive: true,
          categoryId: input.categoryId,
          id: { not: input.currentProductId },
        },
        include: {
          variants: { orderBy: { price: 'asc' }, take: 1 },
          images: { where: { isPrimary: true }, take: 1 },
        },
      })
      return products.map(serializeProduct)
    }),

  getCategoryList: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        slug: z.string().min(3),
        sku: z.string().min(3),
        description: z.string().optional(),
        price: z.number(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.session.user
      if (role !== 'admin' && role !== 'staff') {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }

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
});

```

# server/routers/user.ts
```ts
// server/routers/user.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { hash, compare } from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { registerSchema, profileSchema, passwordChangeSchema } from '@/lib/validation/schemas'

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    // Fetch the full user object for the profile page
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    })
  }),

  register: publicProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const { firstName, lastName, email, password } = input

    const existingUser = await ctx.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'A user with this email already exists.',
      })
    }

    const hashedPassword = await hash(password, 12)

    const newUser = await ctx.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      },
    })

    const { passwordHash, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }),

  updateProfile: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName } = input
      const userId = ctx.session.user.id

      const updatedUser = await ctx.prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName },
      })

      return updatedUser
    }),

  updatePassword: protectedProcedure
    .input(passwordChangeSchema)
    .mutation(async ({ ctx, input }) => {
      const { currentPassword, newPassword } = input
      const userId = ctx.session.user.id

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user || !user.passwordHash) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' })
      }

      const isPasswordValid = await compare(currentPassword, user.passwordHash)

      if (!isPasswordValid) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Incorrect current password.' })
      }

      const newHashedPassword = await hash(newPassword, 12)

      await ctx.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newHashedPassword },
      })

      return { success: true, message: 'Password updated successfully.' }
    }),
})

```

# server/routers/index.ts
```ts
// server/routers/index.ts
import { productRouter } from './product'
import { cartRouter } from './cart'
import { orderRouter } from './order'
import { userRouter } from './user'
import { checkoutRouter } from './checkout'
import { journalRouter } from './journal'
import { newsletterRouter } from './newsletter'
import { addressRouter } from './address'
import { dashboardRouter } from './dashboard' // New import
import { router } from '../trpc'

export const appRouter = router({
  product: productRouter,
  cart: cartRouter,
  order: orderRouter,
  user: userRouter,
  checkout: checkoutRouter,
  journal: journalRouter,
  newsletter: newsletterRouter,
  address: addressRouter,
  dashboard: dashboardRouter, // New router registered
})

export type AppRouter = typeof appRouter

```

# server/routers/address.ts
```ts
// server/routers/address.ts
import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { addressSchema } from '@/lib/validation/schemas' // We'll create this schema

export const addressRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx
    return prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { isDefault: 'desc' },
    })
  }),

  upsert: protectedProcedure
    .input(addressSchema) // Use a Zod schema for validation
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx
      const { id, isDefault, ...data } = input

      // If this address is being set as default, ensure no others are.
      if (isDefault) {
        await prisma.address.updateMany({
          where: { userId: session.user.id, isDefault: true },
          data: { isDefault: false },
        })
      }

      return prisma.address.upsert({
        where: { id: id || '' }, // `upsert` needs a unique where, if id is missing it will fail and go to create
        create: {
          ...data,
          isDefault: isDefault || false,
          user: { connect: { id: session.user.id } },
        },
        update: {
          ...data,
          isDefault: isDefault || false,
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx
      const addressToDelete = await prisma.address.findFirst({
        where: { id: input.id, userId: session.user.id },
      })

      if (!addressToDelete) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Address not found.' })
      }

      await prisma.address.delete({ where: { id: input.id } })
      return { success: true }
    }),
})

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

# store/cart.store.ts
```ts
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

```

# types/index.d.ts
```ts
// types/index.d.ts
import type { Product as PrismaProduct, ProductImage, ProductVariant as PrismaProductVariant } from '@prisma/client'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'

// Generic type for all tRPC router outputs
type RouterOutputs = inferRouterOutputs<AppRouter>

// Base types inferred from the router
export type ProductListOutput = RouterOutputs['product']['list']
export type ProductBySlugOutput = RouterOutputs['product']['bySlug']

// Serializable types for Client Components
// These override the Decimal type with number for props
export type SerializableProductVariant = Omit<PrismaProductVariant, 'price'> & {
  price: number
}
export type SerializableProduct = Omit<PrismaProduct, 'price'> & {
  price: number
  variants: SerializableProductVariant[]
  images: Pick<ProductImage, 'url' | 'altText'>[]
}
export type ProductCardType = SerializableProduct


// This type remains useful for the cart store, which constructs its own objects
export interface CartItem {
  id: string // This will be the variant ID
  product: Pick<PrismaProduct, 'id' | 'name' | 'slug'>
  variant: {
    id: string
    name: string
    price: number
  }
  image: {
    url: string
    altText?: string | null
  }
  quantity: number
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

# scripts/database/bulk_load_products.py
```py
# File: scripts/database/bulk_load_products.py
# pip install psycopg2-binary python-dotenv
import os
import json
import psycopg2
import sys
from decimal import Decimal
from dotenv import load_dotenv
from urllib.parse import urlparse

# Get the project root directory
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
# Load environment variables from .env file at the project root
load_dotenv(os.path.join(project_root, '.env'))

def parse_db_url(url):
    """Parses a database URL into a dictionary of connection parameters."""
    result = urlparse(url)
    return {
        'dbname': result.path[1:],
        'user': result.username,
        'password': result.password,
        'host': result.hostname,
        'port': result.port
    }

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        db_url = os.getenv('DATABASE_URL')
        if not db_url:
            raise ValueError("DATABASE_URL environment variable not set.")
        
        conn_params = parse_db_url(db_url)
        conn = psycopg2.connect(**conn_params)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}", file=sys.stderr)
        sys.exit(1)

def load_products(conn, products_data):
    """Loads a list of products into the database transactionally."""
    with conn.cursor() as cur:
        for product in products_data:
            try:
                print(f"Processing product: {product['name']}...")

                # First, ensure the category exists and get its ID
                cur.execute(
                    """
                    INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt", "isActive")
                    VALUES (gen_random_uuid(), %s, %s, NOW(), NOW(), TRUE)
                    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
                    RETURNING id;
                    """,
                    (product['category']['name'], product['category']['slug'])
                )
                category_id = cur.fetchone()[0]
                print(f"  ✓ Upserted category '{product['category']['name']}' with ID: {category_id}")

                # Delete existing product with the same SKU for clean import
                cur.execute('DELETE FROM "Product" WHERE sku = %s;', (product['sku'],))

                # Insert the main product record
                cur.execute(
                    """
                    INSERT INTO "Product" (id, sku, name, slug, description, "shortDescription", price, "isActive", "isFeatured", "categoryId", "createdAt", "updatedAt")
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                    RETURNING id;
                    """,
                    (
                        product['id'], product['sku'], product['name'], product['slug'],
                        product.get('description', ''), product.get('shortDescription', ''),
                        Decimal(product['price']), product.get('isActive', True),
                        product.get('isFeatured', False), category_id
                    )
                )
                product_id = cur.fetchone()[0]
                print(f"  ✓ Inserted product with ID: {product_id}")

                # Insert variants
                for variant in product.get('variants', []):
                    cur.execute(
                        """
                        INSERT INTO "ProductVariant" ("id", "productId", sku, name, price, "inventoryQuantity", "createdAt", "updatedAt")
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, NOW(), NOW());
                        """,
                        (
                            product_id, variant['sku'], variant['name'],
                            Decimal(variant['price']), variant['inventoryQuantity']
                        )
                    )
                print(f"  ✓ Inserted {len(product.get('variants', []))} variant(s).")

                # Insert images
                for image in product.get('images', []):
                    cur.execute(
                        """
                        INSERT INTO "ProductImage" ("id", "productId", url, "altText", "isPrimary", "createdAt")
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, NOW());
                        """,
                        (
                            product_id, image['url'], image.get('altText', ''),
                            image.get('isPrimary', False)
                        )
                    )
                print(f"  ✓ Inserted {len(product.get('images', []))} image(s).")
                
                # Commit the transaction for this product
                conn.commit()
                print(f"✅ Successfully loaded {product['name']}.\n")

            except Exception as e:
                print(f"❌ Error loading product '{product.get('name', 'N/A')}': {e}", file=sys.stderr)
                conn.rollback() # Rollback the transaction for the failed product

def main():
    """Main function to run the script."""
    json_path = os.path.join(project_root, 'bulk_load_products.json')
    
    if not os.path.exists(json_path):
        print(f"Error: JSON file not found at {json_path}", file=sys.stderr)
        sys.exit(1)
        
    with open(json_path, 'r') as f:
        products_to_load = json.load(f)

    conn = get_db_connection()
    try:
        load_products(conn, products_to_load)
    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == '__main__':
    main()

```

# tests/e2e/auth.spec.ts
```ts
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

const uniqueEmail = `testuser_${Date.now()}@example.com`

test.describe('Authentication Flow', () => {
  test('User can register for a new account', async ({ page }) => {
    await page.goto('/register')

    // Verify UI elements
    await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible()
    const createAccountTab = page.getByRole('tab', { name: 'Create Account' })
    await expect(createAccountTab).toHaveAttribute('data-state', 'active')

    // Fill out the registration form
    await page.getByLabel('First Name').fill('Test')
    await page.getByLabel('Last Name').fill('User')
    await page.getByLabel('Email').nth(1).fill(uniqueEmail) // Use nth(1) to distinguish from login email
    await page.getByLabel('Password').nth(1).fill('password123')
    await page.getByRole('button', { name: 'Create Account' }).click()

    // After successful registration, user should be on the login tab
    await expect(page.getByRole('tab', { name: 'Sign In' })).toHaveAttribute('data-state', 'active')
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible()
  });

  test('User can log in with newly created account', async ({ page }) => {
    // This test depends on the registration test having run, or a seeded user
    // For a standalone test, you would programmatically create a user first.
    await page.goto('/login')
    
    // Fill out the login form
    await page.getByLabel('Email').first().fill(uniqueEmail)
    await page.getByLabel('Password').first().fill('password123')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify successful login by checking for redirection
    // to a protected route like the account profile page.
    await expect(page).toHaveURL(/.*\/account\/profile/)
  });

  test('User sees an error for incorrect password', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').first().fill(uniqueEmail)
    await page.getByLabel('Password').first().fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify error message is displayed
    await expect(page.getByText('Invalid email or password.')).toBeVisible()
  });
});

```

# tests/e2e/account.spec.ts
```ts
// tests/e2e/account.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Account Flow', () => {
  test('unauthenticated user is redirected from account page to login', async ({ page }) => {
    await page.goto('/account/profile')
    // Should be redirected to the login page by the middleware
    await expect(page).toHaveURL(/.*\/login/)
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible()
  })

  test.describe('Authenticated User', () => {
    // Log in once for all tests in this block
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
      await page.getByLabel('Email').first().fill('test@thescent.com')
      await page.getByLabel('Password').first().fill('StrongPass123!')
      await page.getByRole('button', { name: 'Sign In' }).click()
      await expect(page).toHaveURL(/.*\/account\/profile/)
    })

    test('can view their profile information', async ({ page }) => {
      await page.goto('/account/profile')
      await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible()
      await expect(page.getByText('Test User')).toBeVisible()
      await expect(page.getByText('test@thescent.com')).toBeVisible()
    })

    test('can view their order history', async ({ page }) => {
      await page.goto('/account/orders')
      await expect(page.getByRole('heading', { name: 'Order History' })).toBeVisible()
      // In a real scenario with orders, you would assert that order items are visible.
      // For now, we check that the "no orders" message appears correctly.
      await expect(page.getByText("You haven't placed any orders yet.")).toBeVisible()
    })
    
    test('can sign out successfully', async ({ page }) => {
      await page.goto('/account/profile')
      await page.getByRole('button', { name: 'Sign Out' }).click()

      // Should be redirected to the homepage
      await expect(page).toHaveURL('/')
      
      // Verify that the account page is no longer accessible
      await page.goto('/account/profile')
      await expect(page).toHaveURL(/.*\/login/)
    })
  })
})

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
Of course. I will now generate a complete, comprehensive, and updated `README.md` file for the project. This document will serve as the definitive entry point for any developer, stakeholder, or user interacting with "The Scent" application. It will be meticulously crafted to be accurate, detailed, and representative of the high-quality codebase we have built together.

Here is the complete replacement for `README.md`.

---

````markdown
# The Scent: A Modern Luxury E-Commerce Platform

<p align="center">
  <a href="#">
    <img src="https://raw.githubusercontent.com/nordeim/Scent-Beautiful-Website/main/docs/assets/homepage.png" alt="The Scent - Homepage" width="800"/>
  </a>
</p>

<p align="center">
  <strong>A feature-complete, open-source e-commerce platform, engineered to deliver a world-class "digital sanctuary" experience for luxury and wellness brands.</strong>
</p>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/Status-Stable-brightgreen" alt="Project Status">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14+-000000.svg" alt="Next.js 14+">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-18+-61DAFB.svg" alt="React 18+">
  </a>
    <a href="https://trpc.io/">
    <img src="https://img.shields.io/badge/tRPC-v11-2596BE.svg" alt="tRPC v11">
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/Database-PostgreSQL-336791.svg" alt="PostgreSQL">
  </a>
    <a href="https://www.sanity.io/">
    <img src="https://img.shields.io/badge/CMS-Sanity.io-F03E2F.svg" alt="Sanity.io">
  </a>
</p>

---

## 📖 Table of Contents

*   [1. Introduction: What is The Scent?](#1-introduction-what-is-the-scent)
*   [2. Live Demo & Features](#2-live-demo--features)
*   [3. Architectural Deep Dive](#3-architectural-deep-dive)
    *   [3.1 Core Principles](#31-core-principles)
    *   [3.2 System Interaction Flowchart](#32-system-interaction-flowchart)
*   [4. Codebase Deep Dive](#4-codebase-deep-dive)
    *   [4.1 Project File Hierarchy](#41-project-file-hierarchy)
    *   [4.2 Key File & Directory Descriptions](#42-key-file--directory-descriptions)
*   [5. Technology Stack](#5-technology-stack)
*   [6. Developer Setup & Deployment Guide](#6-developer-setup--deployment-guide)
    *   [6.1 Prerequisites](#61-prerequisites)
    *   [6.2 Step 1: Clone & Configure](#62-step-1-clone--configure)
    *   [6.3 Step 2: Database Setup with Docker](#63-step-2-database-setup-with-docker)
    *   [6.4 Step 3: Run the Application](#64-step-3-run-the-application)
    *   [6.5 Deployment to Production](#65-deployment-to-production)
*   [7. User Guide: Running the Application](#7-user-guide-running-the-application)
*   [8. Running the Test Suite](#8-running-the-test-suite)
*   [9. Project Roadmap & Future Enhancements](#9-project-roadmap--future-enhancements)
    *   [9.1 Recently Implemented Features](#91-recently-implemented-features)
    *   [9.2 Immediate Next Steps (v1.1+)](#92-immediate-next-steps-v11)
    *   [9.3 Long-Term Vision (v2.0+)](#93-long-term-vision-v20)
*   [10. How to Contribute](#10-how-to-contribute)
*   [11. License](#11-license)

---

## **1. Introduction: What is The Scent?**

**The Scent** is a free and open-source e-commerce platform, engineered from the ground up to provide the digital foundation for modern luxury and wellness brands. It aims to deliver the polish, performance, and immersive experience of top-tier online retailers in an accessible, maintainable, and highly extensible package.

This project is built with an obsessive focus on quality, both in the user experience and in the engineering. It serves not only as a functional, feature-complete store but also as a reference implementation for professional-grade web application architecture. It features a high-performance frontend built with Next.js and React, a type-safe, modular backend powered by tRPC, and a robust data layer using Prisma and PostgreSQL.

The platform's design philosophy is centered on creating a "digital sanctuary"—an online space where customers don't just purchase products but embark on a sensory journey that begins the moment they arrive. This is achieved through a clean, high-contrast UI, fluid animations, and a focus on intuitive, non-disruptive user flows.

---

## **2. Live Demo & Features**

*(Note: A live demo URL would be placed here in a real-world project.)*

The application is in a **stable, feature-complete** state for a Version 1.0 launch. The architecture is robust, and the core user journeys are fully implemented and tested.

| Feature Area                      | Status                     | Notes                                                                                                                             |
| --------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Featured Product Showcase**     | ✅ **Implemented**         | The homepage dynamically displays a curated list of "featured" products, driving engagement.                                    |
| **Dynamic Theming**               | ✅ **Implemented**         | A high-contrast, "Graphite" theme with full Day/Night mode support, managed globally via Zustand.                                 |
| **User Authentication**           | ✅ **Implemented**         | Secure login, registration, and session management (NextAuth.js). Protected routes enforced by Edge middleware.                  |
| **Product Catalog & Filtering**   | ✅ **Implemented**         | Dynamic product listing (PLP) and detail (PDP) pages with client-side filtering by category, search, price, and sorting.          |
| **3D Product Viewer**             | ✅ **Implemented**         | Interactive 3D models on product pages for an immersive experience, built with React Three Fiber.                               |
| **Product Recommendations**       | ✅ **Implemented**         | A "You Might Also Like" section on product pages, driven by heuristic-based logic on the backend.                               |
| **Shopping Cart & Drawer**        | ✅ **Implemented**         | A dedicated cart page and a slide-out drawer for "add to cart" confirmations. State is persisted via `localStorage`.             |
| **Checkout & Payments**           | ✅ **Implemented**         | A secure, multi-step checkout form integrated with Stripe Elements for PCI-compliant payment processing.                          |
| **Order Persistence**             | ✅ **Implemented**         | A reliable, webhook-driven process for creating database records of successful orders.                                          |
| **User Account Dashboard**        | ✅ **Implemented**         | A protected, comprehensive dashboard for users to view their profile, recent orders, and manage addresses.                       |
| **Headless CMS (Journal)**        | ✅ **Implemented**         | A full-featured blog/journal with content managed via Sanity.io, rendered seamlessly within the Next.js app.                      |
| **SEO & Performance**             | ✅ **Implemented**         | Dynamic `sitemap.xml` and `robots.txt`, advanced caching (ISR/SSG), and bundle analysis configured.                           |
| **Automated Testing**             | ✅ **Foundational**        | A suite of End-to-End tests (Playwright) covering authentication, cart, and account flows, plus unit tests for key components.    |

---

## **3. Architectural Deep Dive**

The Scent is built on robust architectural principles designed for performance, maintainability, and scalability.

### **3.1 Core Principles**

1.  **Type Safety, End-to-End:** From the PostgreSQL schema defined in Prisma, through the tRPC API layer, and into the React components, types flow seamlessly. This eliminates entire classes of bugs and makes development faster and safer.
2.  **Clear Separation of Concerns:** The codebase is strictly organized into layers. The `app/` and `components/` directories handle presentation, `server/` handles API/business logic, `lib/` contains shared utilities and service integrations, and `prisma/` manages data persistence. This makes the system easy to reason about.
3.  **Server-First Rendering:** We leverage Next.js Server Components to do as much work on the server as possible—fetching data, rendering static content—to send a minimal amount of JavaScript to the client. Client Components are used only where interactivity is essential.
4.  **Developer Experience (DX) as a Priority:** The project is pre-configured with TypeScript, ESLint, Prettier, and Husky pre-commit hooks to enforce code quality and consistency from the very first line of code.

### **3.2 System Interaction Flowchart**

This diagram illustrates how a user request flows through the various parts of our system, from the client to the database and external services.

```mermaid
sequenceDiagram
    participant User
    participant Client (Next.js/React)
    participant Server (tRPC API)
    participant Database (Prisma/Postgres)
    participant Stripe API
    participant Sanity API

    User->>+Client: Navigates to `/products`
    Client->>+Server: tRPC Query: `product.list`
    Server->>+Database: Prisma: `db.product.findMany(...)`
    Database-->>-Server: Returns product data
    Server-->>-Client: Returns serialized JSON data
    Client-->>-User: Renders product grid

    User->>+Client: Clicks "Add to Cart"
    Client->>Client: Updates cart state (Zustand)
    Client-->>-User: Opens cart drawer with new item

    User->>+Client: Navigates to `/checkout`
    Client->>+Server: tRPC Mutation: `checkout.createPaymentIntent`
    Server->>+Stripe API: `stripe.paymentIntents.create(...)`
    Stripe API-->>-Server: Returns `clientSecret`
    Server-->>-Client: Returns `clientSecret`
    Client-->>User: Renders secure Stripe payment form

    User->>+Client: Submits Payment
    Client-->>+Stripe API: Securely sends card details
    Stripe API-->>Stripe API: Processes Payment

    alt Payment Success
        Stripe API->>+Server: Webhook: `payment_intent.succeeded`
        Server->>+Database: Prisma: `db.order.create(...)`
        Database-->>-Server: Order confirmed
        Server-->>-Stripe API: 200 OK
    end
```

---

## **4. Codebase Deep Dive**

A clear and predictable file structure is essential for project maintainability. The Scent follows a domain-driven and feature-based organization.

### **4.1 Project File Hierarchy**

This diagram provides a high-level map of the most important directories in the project.

```
the-scent/
│
├── ─ 📄 .env.local             # Local secrets and environment variables
├── ─ 📄 next.config.js          # Next.js framework configuration
├── ─ 📄 tailwind.config.ts      # Tailwind CSS theme and configuration
├── ─ 📄 tsconfig.json            # TypeScript compiler options
├── ─ 📄 package.json             # Project scripts and dependencies
│
├── 📁 app/                     # Next.js App Router: All pages and layouts
│   ├── ─ 📁 (shop)/              # Route group for e-commerce pages (products, cart, etc.)
│   ├── ─ 📁 account/             # Protected user dashboard pages
│   ├── ─ 📁 api/                  # Server-side API routes (tRPC, webhooks)
│   ├── ─ 📄 layout.tsx           # The root layout for the entire application
│   └── ─ 📄 page.tsx             # The homepage component
│
├── 📁 components/              # All React components
│   ├── ─ 📁 common/              # Reusable design system (Button, Card, Dialog)
│   ├── ─ 📁 features/           # Components for specific features (product, cart, auth)
│   └── ─ 📁 providers/          # Global client-side context providers
│
├── 📁 lib/                      # Shared utilities, services, and configurations
│   ├── ─ 📁 auth/               # NextAuth.js configuration
│   ├── ─ 📁 cms/                # Sanity.io client setup
│   ├── ─ 📁 db/                 # Prisma client singleton
│   ├── ─ 📁 payments/           # Stripe client setup
│   └── ─ 📁 validation/         # Zod validation schemas
│
├── 📁 server/                   # The tRPC backend API layer
│   ├── ─ 📁 routers/            # Individual tRPC routers for each domain
│   ├── ─ 📄 context.ts           # tRPC request context creation
│   └── ─ 📄 trpc.ts              # tRPC initialization and middleware
│
├── 📁 prisma/                   # Database schema, migrations, and seeding
│   ├── ─ 📄 schema.prisma        # The single source of truth for the database schema
│   └── ─ 📄 seed.ts              # Script to populate the dev database
│
├── 📁 store/                    # Global client-side state (Zustand)
│   ├── ─ 📄 cart.store.ts         # Manages the shopping cart state
│   └── ─ 📄 ui.store.ts           # Manages UI state like the theme
│
└── 📁 public/                   # Static assets (images, icons, 3D models)
```

### **4.2 Key File & Directory Descriptions**

This section details the purpose of each key area and how they interact.

| Path                          | Purpose & Key Interactions                                                                                                                                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`              | **Root Server Layout.** Establishes the HTML shell, loads fonts, sets global metadata, and renders the central `<Providers>` component which wraps the entire application in necessary client-side contexts.                                                                   |
| `app/api/trpc/[trpc]/route.ts` | **tRPC API Entrypoint.** This is the single endpoint that handles all incoming API requests from the client. It uses `fetchRequestHandler` to route these requests to the appropriate procedure defined in our `appRouter`.                                                   |
| `app/api/webhooks/stripe/route.ts` | **Stripe Webhook Handler.** A critical, asynchronous endpoint that listens for events from Stripe (like `payment_intent.succeeded`). It verifies the webhook's signature for security and is responsible for creating the final `Order` record in the database upon successful payment. |
| `components/providers/Providers.tsx` | **Central Client Provider.** A key client component (`'use client'`) that composes all other necessary providers (`TrpcProvider`, `AuthProvider`, `ThemeProvider`, `LazyMotion`) in one place. This is rendered once in the root layout. |
| `components/common/`          | **The Design System.** This directory contains the building blocks of our UI. Components like `Button.tsx`, `Card.tsx`, `Input.tsx`, and `Dialog.tsx` are generic, reusable, and styled with `class-variance-authority` for maximum flexibility. |
| `components/features/`        | **Feature-Specific Components.** These components are built for a specific business domain. For example, `features/product/ProductCard.tsx` knows how to render a `product` object, and `features/account/UpdatePasswordForm.tsx` contains the logic for the password change form. |
| `hooks/use-cart.ts`           | **Hydration-Safe Store Access.** A custom hook that acts as a safe bridge to the Zustand cart store. It uses a mount-check (`useEffect`) to ensure that client components only access the `localStorage`-persisted state after hydration, preventing server-client mismatches. |
| `lib/auth/config.ts`          | **Authentication Brain.** Contains the master configuration object for NextAuth.js. It defines all authentication providers (Credentials, Google), sets up the Prisma adapter for database persistence, and configures JWT/session callbacks to include custom user data like roles. |
| `lib/validation/schemas.ts`   | **Validation Source of Truth.** This file uses Zod to define schemas for all user inputs (login, registration, address forms, etc.). These schemas are used by `react-hook-form` on the client for instant validation and by tRPC on the server for security. |
| `prisma/schema.prisma`        | **Database Blueprint.** The definitive schema for our PostgreSQL database. Every model, field, and relation is defined here. It is the input that `prisma migrate` and `prisma generate` use to create database migrations and the type-safe Prisma Client. |
| `server/trpc.ts`              | **tRPC Backend Initialization.** This file sets up the tRPC instance, configures `superjson` for data serialization, and defines our `publicProcedure` and `protectedProcedure` helpers. The `protectedProcedure` contains the middleware that enforces authentication on sensitive API endpoints. |
| `server/routers/index.ts`     | **API Root Router.** This file imports all the individual routers (e.g., `productRouter`, `userRouter`, `dashboardRouter`) and merges them into a single `appRouter`, creating the unified, fully-typed API that the client interacts with. |
| `store/cart.store.ts`         | **Global Cart State.** Manages the shopping cart's state using Zustand. It includes actions for adding, removing, and updating items. Critically, it uses the `persist` middleware to save the cart to `localStorage`, so a user's cart is not lost if they refresh the page or close the browser. |

---

## **5. Technology Stack**

| Category                   | Technology                                                                                                  | Rationale & Purpose                                                                                                                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework & UI**         | [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) | A high-performance stack for building fast, SEO-friendly, and interactive user interfaces with fluid animations.                                                              |
| **API & Type Safety**      | [tRPC](https://trpc.io/), [Zod](https://zod.dev/)                                                            | Provides an unparalleled developer experience with full end-to-end type safety between the client and server, eliminating the need for manual API contract management or code generation. |
| **Database & ORM**         | [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/)                                    | A robust, relational database combined with a next-generation ORM that provides a fully type-safe data access layer.                                                              |
| **Authentication**         | [NextAuth.js](https://next-auth.js.org/)                                                                      | A complete, secure, and extensible authentication solution for Next.js, handling everything from sessions to OAuth providers.                                                             |
| **Payments**               | [Stripe](https://stripe.com/)                                                                                 | The industry standard for secure and reliable online payments, integrated via Stripe Elements on the client and webhooks on the server.                                                   |
| **Headless CMS**           | [Sanity.io](https://www.sanity.io/)                                                                           | A flexible headless CMS for managing dynamic content like the "Journal" section, decoupling content creation from the main application codebase.                                       |
| **3D Graphics**            | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei) | Enables the rendering of interactive 3D models directly in the browser, providing an immersive product viewing experience.                                                             |
| **State Management**       | [Zustand](https://zustand-demo.pmnd.rs/)                                                                        | A simple, fast, and scalable state management solution for global client-side state, used here for the cart and UI theme.                                                                 |
| **Testing**                | [Playwright](https://playwright.dev/) & [Jest](https://jestjs.io/)                                              | A dual strategy using Playwright for comprehensive End-to-End testing of user flows and Jest for fast, focused unit testing of individual components and utilities.                        |

---

## **6. Developer Setup & Deployment Guide**

### **6.1 Prerequisites**

*   **Node.js:** v20.x or later.
*   **pnpm:** v9.x or later. (Install with `npm install -g pnpm`).
*   **Docker & Docker Compose:** Required for running the PostgreSQL database locally.
*   **A Stripe Account:** For payment processing keys.
*   **A Sanity.io Account:** For the headless CMS.

### **6.2 Step 1: Clone & Configure**

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/nordeim/Scent-Beautiful-Website.git
    cd Scent-Beautiful-Website
    ```
2.  **Install Dependencies**
    ```bash
    pnpm install
    ```
3.  **Set Up Environment Variables**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    *   Open the newly created `.env.local` file and fill in all the placeholder values (`REPLACE_WITH...`). You will need to get keys from your Stripe, Sanity, and any OAuth provider (e.g., Google) dashboards.

### **6.3 Step 2: Database Setup with Docker**

This project uses Docker to ensure a consistent and isolated PostgreSQL database environment.

1.  **Start the Database Container**
    *   Run the following command from the project root. This will download the `postgres:16` image and start a container named `scent-db` in the background.
    ```bash
    docker run --name scent-db -e POSTGRES_USER=scent_user -e POSTGRES_PASSWORD=StrongPass1234 -e POSTGRES_DB=scent_db -p 5432:5432 -d postgres:16
    ```
    *(Note: The credentials here match the default `DATABASE_URL` in your `.env.local` file.)*

2.  **Apply Migrations and Seed the Database**
    *   This single command will connect to the new database, drop any existing tables (for a clean slate), apply all schema migrations from the `prisma/migrations` folder, and then run the `prisma/seed.ts` script to populate it with sample data.
    ```bash
    pnpm prisma migrate reset
    ```
    *   You will be prompted to confirm; type `y` and press Enter.

### **6.4 Step 3: Run the Application**

With the database running and dependencies installed, you can now start the Next.js development server.

```bash
pnpm dev
```

The application will be available at **http://localhost:3000**.

### **6.5 Deployment to Production**

This application is optimized for deployment on platforms like Vercel or other Node.js hosting services.

1.  **Git Push:** Push your repository to a Git provider (GitHub, GitLab, etc.).
2.  **Import Project:** Import your Git repository into your hosting provider (e.g., Vercel).
3.  **Configure Environment Variables:** In your hosting provider's project settings, add all the environment variables from your `.env.local` file. **Ensure you use your production keys** for services like Stripe.
4.  **Set Build Command:** The standard build command is `pnpm build`.
5.  **Deploy:** The hosting platform will automatically build and deploy your application. Prisma is configured to work correctly in serverless environments.

---

## **7. User Guide: Running the Application**

Once the application is running locally, you can explore its features:

*   **Browse Products:** Navigate to `/products` to see the product list. Use the category and sort filters.
*   **View a Product:** Click on any product card to go to its detail page.
*   **Add to Cart:** Use the "Add to Cart" buttons. The cart icon in the header will update, and a drawer will appear confirming the addition.
*   **View Cart:** Click the cart icon in the header to navigate to the `/cart` page.
*   **Register & Login:** Use the `/register` and `/login` pages. A seeded test user is available:
    *   **Email:** `test@thescent.com`
    *   **Password:** `StrongPass123!`
*   **Manage Account:** Once logged in, navigate to `/account/dashboard` to see the new dashboard and manage your profile settings and addresses.

---

## **8. Running the Test Suite**

-   **End-to-End Tests (requires dev server to be running):**
    ```bash
    pnpm test:e2e
    ```
-   **Unit Tests:**
    ```bash
    pnpm test
    ```
-   **Analyze JavaScript Bundle Size:**
    ```bash
    pnpm analyze
    ```

---

## **9. Project Roadmap & Future Enhancements**

### **9.1 Recently Implemented Features**

*   **Featured Products Section:** The homepage now dynamically showcases a curated selection of products.
*   **Account Dashboard:** A new central dashboard for logged-in users provides an overview of recent orders and recommendations.
*   **Full Profile Management:** The profile settings page now includes fully functional forms for updating personal information, changing passwords, and managing shipping addresses.
*   **Dedicated Cart Page:** The cart icon now navigates to a full `/cart` page for a more focused shopping experience.

### **9.2 Immediate Next Steps (v1.1+)**

-   [ ] **Advanced Product Filtering:** Expand the `/products` page sidebar to include multi-faceted filtering by scent family, price range, and stock status.
-   [ ] **Database-Backed Wishlist:** Convert the wishlist concept into a full-featured, database-backed feature for logged-in users.
-   [ ] **Global Toast/Notification System:** Add a non-intrusive notification system (e.g., using `react-hot-toast`) for actions like "Item added to cart" or "Profile updated."
-   [ ] **Expand Test Coverage:** Increase unit test coverage for tRPC routers and critical utility functions.

### **9.3 Long-Term Vision (v2.0+)**

-   [ ] **Subscription Service:** A "Scent of the Month" subscription box feature with recurring payments via Stripe Billing.
-   [ ] **Personalized Scent Quiz:** An interactive quiz to guide new users to their perfect products based on their preferences and desired moods.
-   [ ] **Internationalization (i18n):** Full support for multiple languages and currencies.
-   [ ] **Mobile Companion App:** A React Native application for a truly mobile-native experience.

---

## **10. How to Contribute**

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request for review. Adherence to the existing code style and architectural patterns is required. All commits must pass the linting checks enforced by the Husky pre-commit hook.

---

## **11. License**

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
````


```

