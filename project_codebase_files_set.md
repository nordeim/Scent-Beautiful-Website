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

# package.json
```json
{
  "name": "codespaces-blank",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.835.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "@prisma/client": "^6.10.1",
    "@sendgrid/mail": "^8.1.5",
    "@trpc/client": "^11.4.2",
    "@trpc/next": "^11.4.2",
    "@trpc/react-query": "^11.4.2",
    "@trpc/server": "^11.4.2",
    "algoliasearch": "^5.29.0",
    "bcryptjs": "^3.0.2",
    "next": "15.3.4",
    "next-auth": "^4.24.11",
    "prisma": "^6.10.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "stripe": "^18.2.1",
    "superjson": "^2.2.2",
    "zod": "^3.25.67"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

# tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
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
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# components/providers/AuthProvider.tsx
```tsx
"use client"
import React, { createContext, useContext } from "react"

// Stub for future Auth context
const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

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

# next.config.ts
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# tailwind.config.ts
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class", "[data-theme='night']"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        120: '30rem',
      },
    },
  },
  plugins: [],
}

export default config

```

# postcss.config.mjs
```mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

```

# app/layout.tsx
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
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
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
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
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'
import { createNextApiHandler } from '@trpc/server/adapters/next'

export default createNextApiHandler({
  router: appRouter,
  createContext,
})

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
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

:root {
  --background: #F5F2ED;
  --foreground: #2C2C2C;
}

[data-theme='night'] {
  --background: #1A1A1A;
  --foreground: #F5F5F5;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans, Inter, Arial, sans-serif);
  transition: background 0.3s, color 0.3s;
}

/* Utility for smooth theme transitions */
html, body {
  transition: background 0.3s, color 0.3s;
}

```

# components/providers/AuthProvider.tsx
```tsx
"use client"
import React, { createContext, useContext } from "react"

// Stub for future Auth context
const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

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

export const authOptions = {
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
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        if (!user || !user.password) return null
        const valid = await compare(parsed.data.password, user.password)
        if (!valid) return null
        return user
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    session: async ({ session, user }) => {
      if (user) session.user = user
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
// This Prisma schema is based on the architecture document for The Scent.
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["jsonProtocol", "fullTextSearch", "fullTextIndex"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OrderStatus {
  pending
  refunded
}

enum UserRole {
  customer
  staff
}

enum DiscountType {
  percentage
  fixed_amount
}

model User {
  id               String    @id @default(uuid())
  email            String    @unique
  name             String?
  password         String?
  role             UserRole  @default(customer)
  stripeCustomerId String?   @unique
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  preferences      UserPreference?
  sessions         Session[]
  orders           Order[]
  reviews          Review[]
  wishlists        Wishlist[]
  emailSubscriptions EmailSubscription[]
}

model UserPreference {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  updatedAt DateTime @updatedAt
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Category {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  isActive  Boolean  @default(true)
  products  Product[]
  updatedAt DateTime @updatedAt
}

model Brand {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  products  Product[]
  updatedAt DateTime @updatedAt
}

model Product {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String?
  price       Float
  isActive    Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  brandId     String?
  brand       Brand?   @relation(fields: [brandId], references: [id])
  variants    ProductVariant[]
  images      ProductImage[]
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ProductVariant {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  sku       String   @unique
  size      String?
  price     Float?
  stock     Int      @default(0)
  images    ProductImage[]
  updatedAt DateTime @updatedAt
}

model ProductImage {
  id        String   @id @default(uuid())
  url       String
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model InventoryTransaction {
  id          String   @id @default(uuid())
  variantId   String
  variant     ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  quantity    Int
  createdById String?
  createdBy   User?    @relation(fields: [createdById], references: [id])
  createdAt   DateTime @default(now())
}

model Review {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  rating    Int
  comment   String?
  images    ReviewImage[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ReviewImage {
  id        String   @id @default(uuid())
  url       String
  reviewId  String
  review    Review   @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model Cart {
  id        String   @id @default(uuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  sessionId String?
  items     CartItem[]
  updatedAt DateTime @updatedAt
}

model CartItem {
  id        String   @id @default(uuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  quantity  Int      @default(1)
  updatedAt DateTime @updatedAt
  @@unique([cartId, variantId])
}

model Address {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  line1     String
  line2     String?
  city      String
  state     String
  postalCode String
  country   String
  updatedAt DateTime @updatedAt
  billingOrders Order[] @relation("BillingAddress")
}

model Order {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  addressId     String?
  billingAddress Address?   @relation("BillingAddress", fields: [addressId], references: [id])
  status        OrderStatus @default(pending)
  items         OrderItem[]
  orderNumber   String      @unique
  total         Float
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variantId String?
  variant   ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)
  quantity  Int      @default(1)
  price     Float
  createdAt DateTime @default(now())
}

model Coupon {
  id        String   @id @default(uuid())
  code      String   @unique
  type      DiscountType
  value     Float
  isActive  Boolean  @default(true)
  updatedAt DateTime @updatedAt
}

model Wishlist {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantId String?
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  @@unique([userId, productId, variantId])
}

model EmailSubscription {
  id        String   @id @default(uuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  email     String   @unique
  createdAt DateTime @default(now())
}

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
import { prisma } from '@/lib/db/client'
import type { inferAsyncReturnType } from '@trpc/server'
import type { Context } from '../context'

export const productRouter = router({
  all: publicProcedure.query(async () => {
    return prisma.product.findMany({ include: { variants: true, images: true } })
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input }: { input: string }) => {
    return prisma.product.findUnique({ where: { id: input }, include: { variants: true, images: true } })
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

