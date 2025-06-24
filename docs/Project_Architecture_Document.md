# Project Architecture Document: The Scent

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture Overview](#system-architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Application Architecture](#application-architecture)
5. [File Structure and Organization](#file-structure-and-organization)
6. [Component Architecture](#component-architecture)
7. [Database Architecture](#database-architecture)
8. [API Architecture](#api-architecture)
9. [State Management Architecture](#state-management-architecture)
10. [Authentication and Authorization](#authentication-and-authorization)
11. [Performance Architecture](#performance-architecture)
12. [Security Architecture](#security-architecture)
13. [Testing Architecture](#testing-architecture)
14. [Deployment Architecture](#deployment-architecture)
15. [Monitoring and Observability](#monitoring-and-observability)

## Executive Summary

The Scent's technical architecture represents a cutting-edge implementation of modern web development practices, leveraging Next.js 15's latest features including React Server Components, Server Actions, and the App Router. The architecture prioritizes performance, scalability, and developer experience while maintaining the flexibility needed for rapid feature development.

The system follows a modular, component-based architecture with clear separation of concerns. The frontend leverages React 19's concurrent features for optimal user experience, while the backend utilizes Next.js API routes with tRPC for type-safe communication. Data persistence is handled by PostgreSQL 16 with Prisma ORM, ensuring robust data integrity and performance.

Key architectural decisions include:
- **Monorepo Structure**: Simplified deployment and shared code
- **Edge Computing**: Leveraging Vercel's edge network for global performance
- **Type Safety**: End-to-end TypeScript with strict mode
- **Component-Driven Development**: Isolated, reusable components
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-First Design**: Responsive architecture from the ground up

## System Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   Users                                      │
└─────────────────────┬───────────────────────────────────┬───────────────────┘
                      │                                   │
                      ▼                                   ▼
         ┌─────────────────────┐                ┌─────────────────────┐
         │   Web Application   │                │  Mobile Application │
         │   (Next.js SSR)     │                │    (Responsive)     │
         └──────────┬──────────┘                └──────────┬──────────┘
                    │                                       │
                    ▼                                       ▼
         ┌──────────────────────────────────────────────────────────┐
         │                    Cloudflare CDN                        │
         │                  (Edge Caching & DDoS)                   │
         └──────────────────────────┬───────────────────────────────┘
                                    │
                                    ▼
         ┌──────────────────────────────────────────────────────────┐
         │                    Vercel Edge Network                   │
         │                   (Serverless Functions)                 │
         └──────────────────────────┬───────────────────────────────┘
                                    │
         ┌──────────────────────────┴───────────────────────────────┐
         │                                                          │
         ▼                                                          ▼
┌─────────────────────┐                                  ┌─────────────────────┐
│   Next.js App       │                                  │    External APIs    │
│  - React 19 SSR     │                                  │  - Stripe Payments  │
│  - API Routes       │                                  │  - SendGrid Email   │
│  - Server Actions   │ ◄────────────────────────────► │  - Algolia Search   │
│  - tRPC Endpoints   │                                  │  - Cloudinary CDN   │
└──────────┬──────────┘                                  │  - Google Maps      │
           │                                             └─────────────────────┘
           ▼
┌─────────────────────┐
│   PostgreSQL 16     │
│   (Primary DB)      │
├─────────────────────┤
│   Redis Cache       │
│   (Session/Cache)   │
├─────────────────────┤
│   S3 Storage        │
│   (Media Files)     │
└─────────────────────┘
```

### Request Flow Architecture

```
User Request Flow:
================

1. User Action (Click/Navigate)
       │
       ▼
2. Next.js Router (App Router)
       │
       ├─── Static Route ──► Serve from CDN Cache
       │
       └─── Dynamic Route
                │
                ▼
3. React Server Component
       │
       ├─── Data Fetching (Parallel)
       │     ├── Database Query (Prisma)
       │     ├── External API Call
       │     └── Cache Check (Redis)
       │
       ▼
4. Server-Side Rendering
       │
       ▼
5. HTML + RSC Payload
       │
       ▼
6. Client Hydration
       │
       ▼
7. Interactive Application
```

## Technology Stack

### Core Technologies

#### Frontend Stack
- **Framework**: Next.js 15.0.0 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4.0.0
- **Type System**: TypeScript 5.3.0
- **State Management**: Zustand 4.5.0
- **Form Handling**: React Hook Form 7.48.0
- **Validation**: Zod 3.22.0
- **Animation**: Framer Motion 11.0.0
- **3D Graphics**: Three.js with React Three Fiber
- **Date Handling**: date-fns 3.0.0
- **HTTP Client**: Axios 1.6.0 (for external APIs)

#### Backend Stack
- **Runtime**: Node.js 20.10.0 LTS
- **API Layer**: tRPC 11.0.0
- **ORM**: Prisma 5.7.0
- **Database**: PostgreSQL 16.1
- **Caching**: Redis 7.2.0
- **File Storage**: AWS S3 via SDK v3
- **Authentication**: Auth.js 5.0.0 (NextAuth)
- **Email**: SendGrid Node.js SDK
- **Payments**: Stripe Node.js SDK
- **Search**: Algolia JavaScript API Client

#### Development Tools
- **Package Manager**: pnpm 8.12.0
- **Bundler**: Turbopack (Next.js built-in)
- **Linting**: ESLint 8.55.0
- **Formatting**: Prettier 3.1.0
- **Git Hooks**: Husky 8.0.0
- **Commit Convention**: Commitizen
- **Testing**: Jest, React Testing Library, Playwright
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, Vercel Analytics

## Application Architecture

### Architectural Patterns

#### Domain-Driven Design (DDD)
The application follows DDD principles with clear bounded contexts:

```
Bounded Contexts:
================
├── Product Catalog (Core)
│   ├── Products
│   ├── Categories
│   ├── Ingredients
│   └── Reviews
├── Shopping Cart
│   ├── Cart Management
│   ├── Price Calculation
│   └── Promotions
├── Order Management
│   ├── Checkout
│   ├── Payment Processing
│   └── Order Fulfillment
├── User Management
│   ├── Authentication
│   ├── Profiles
│   └── Preferences
└── Content Management
    ├── Blog/Articles
    ├── Pages
    └── Media
```

#### Layered Architecture

```
Presentation Layer (UI Components)
          │
          ▼
Application Layer (Business Logic)
          │
          ▼
Domain Layer (Core Business Rules)
          │
          ▼
Infrastructure Layer (External Services)
```

### Module Organization

```typescript
// Module interaction diagram
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │   Hooks     │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                 │
├───────────────────────────┼─────────────────────────────────┤
│                     Application Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Services   │  │    Store    │  │  Utilities  │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                 │
├───────────────────────────┼─────────────────────────────────┤
│                      Domain Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Models    │  │ Validators  │  │   Types     │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                 │
├───────────────────────────┼─────────────────────────────────┤
│                   Infrastructure Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Database   │  │External APIs│  │File Storage │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## File Structure and Organization

### Complete File Hierarchy

```
the-scent/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-production.yml
│   │   └── deploy-staging.yml
│   └── CODEOWNERS
├── .husky/
│   ├── pre-commit
│   └── pre-push
├── app/                                 # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (marketing)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (shop)/
│   │   ├── products/
│   │   │   ├── [category]/
│   │   │   │   └── page.tsx
│   │   │   ├── [category]/[slug]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── account/
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── trpc/
│   │   │   └── [trpc]/
│   │   │       └── route.ts
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── webhooks/
│   │   │   ├── stripe/
│   │   │   │   └── route.ts
│   │   │   └── sendgrid/
│   │   │       └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Form/
│   │   └── Layout/
│   ├── features/
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductInfo.tsx
│   │   │   └── ProductReviews.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── PaymentMethods.tsx
│   │   │   └── OrderSummary.tsx
│   │   └── search/
│   │       ├── SearchBar.tsx
│   │       ├── SearchResults.tsx
│   │       └── SearchFilters.tsx
│   ├── icons/
│   │   ├── CartIcon.tsx
│   │   ├── HeartIcon.tsx
│   │   └── index.ts
│   └── providers/
│       ├── ThemeProvider.tsx
│       ├── AuthProvider.tsx
│       └── CartProvider.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useDebounce.ts
│   ├── useIntersectionObserver.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── useProducts.ts
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── auth/
│   │   ├── config.ts
│   │   └── helpers.ts
│   ├── db/
│   │   ├── client.ts
│   │   └── migrations/
│   ├── email/
│   │   ├── templates/
│   │   └── sender.ts
│   ├── payments/
│   │   ├── stripe.ts
│   │   └── types.ts
│   ├── search/
│   │   └── algolia.ts
│   ├── storage/
│   │   └── s3.ts
│   └── utils/
│       ├── constants.ts
│       ├── formatters.ts
│       ├── validators.ts
│       └── helpers.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   └── manifest.json
├── server/
│   ├── routers/
│   │   ├── auth.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── user.ts
│   ├── context.ts
│   ├── trpc.ts
│   └── index.ts
├── store/
│   ├── auth.store.ts
│   ├── cart.store.ts
│   ├── ui.store.ts
│   └── index.ts
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── base/
│   │   └── _reset.scss
│   └── components/
├── tests/
│   ├── e2e/
│   │   ├── checkout.spec.ts
│   │   └── product.spec.ts
│   ├── integration/
│   │   └── api.test.ts
│   └── setup/
│       └── jest.setup.ts
├── types/
│   ├── api.d.ts
│   ├── database.d.ts
│   ├── global.d.ts
│   └── index.d.ts
├── .env.example
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── jest.config.js
├── next-env.d.ts
├── next.config.ts
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Key File Descriptions and Interfaces

#### Root Configuration Files

**next.config.ts**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    domains: ['cloudinary.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
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
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/hooks/*": ["hooks/*"],
      "@/types/*": ["types/*"],
      "@/store/*": ["store/*"],
      "@/server/*": ["server/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Core Application Files

**app/layout.tsx**
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/common/Layout/Header'
import { Footer } from '@/components/common/Layout/Footer'
import '@/app/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Scent - Premium Natural Aromatherapy',
    template: '%s | The Scent'
  },
  description: 'Discover premium natural aromatherapy products crafted with the finest essential oils.',
  keywords: ['aromatherapy', 'essential oils', 'natural', 'wellness', 'fragrance'],
  authors: [{ name: 'The Scent' }],
  creator: 'The Scent',
  metadataBase: new URL('https://thescent.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thescent.com',
    siteName: 'The Scent',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Scent - Premium Aromatherapy'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thescent',
    creator: '@thescent'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
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

**server/trpc.ts**
```typescript
import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'
import superjson from 'superjson'
import { ZodError } from 'zod'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
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
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
```

## Component Architecture

### Component Structure

Each component follows a consistent structure:

```typescript
// components/features/product/ProductCard.tsx
import { FC, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils/formatters'
import type { Product } from '@/types/database'

interface ProductCardProps {
  product: Product
  priority?: boolean
  onQuickView?: (product: Product) => void
}

export const ProductCard: FC<ProductCardProps> = memo(({ 
  product, 
  priority = false,
  onQuickView 
}) => {
  const { addItem } = useCart()
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || '',
      quantity: 1
    })
  }

  return (
    <motion.article
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.category.slug}/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
          
          {/* Quick Actions */}
          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 rounded-full p-0"
              onClick={(e) => {
                e.preventDefault()
                // Handle wishlist
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <p className="text-lg font-semibold">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      
      <Button
        className="mt-3 w-full"
        onClick={handleAddToCart}
        size="sm"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </motion.article>
  )
})

ProductCard.displayName = 'ProductCard'
```

### Component Communication

```
Component Communication Flow:
============================

┌─────────────────┐         ┌─────────────────┐
│   Page/Route    │────────▶│  Server Component│
└────────┬────────┘         └────────┬────────┘
         │                           │
         │ Props                     │ Data
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│ Client Component│◀────────│   Data Fetcher  │
└────────┬────────┘         └─────────────────┘
         │
         │ State/Events
         ▼
┌─────────────────┐         ┌─────────────────┐
│  Global Store   │◀───────▶│   Local State   │
└─────────────────┘         └─────────────────┘
```

## Database Architecture

### PostgreSQL 16 Schema Design

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Custom types
CREATE TYPE order_status AS ENUM (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

CREATE TYPE user_role AS ENUM (
  'customer',
  'admin',
  'staff'
);

CREATE TYPE discount_type AS ENUM (
  'percentage',
  'fixed_amount'
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified TIMESTAMP,
  password_hash VARCHAR(255),
  role user_role DEFAULT 'customer',
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  avatar_url VARCHAR(500),
  stripe_customer_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- User preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'light',
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  language VARCHAR(5) DEFAULT 'en',
  currency VARCHAR(3) DEFAULT 'USD',
  scent_profile JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Authentication sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Brands
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price DECIMAL(10, 2) CHECK (compare_at_price >= 0),
  cost DECIMAL(10, 2) CHECK (cost >= 0),
  weight_grams INTEGER,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  scent_notes JSONB DEFAULT '{}',
  ingredients TEXT[],
  usage_instructions TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT price_validation CHECK (
    compare_at_price IS NULL OR compare_at_price > price
  )
);

-- Product variants (for different sizes, etc.)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price DECIMAL(10, 2) CHECK (compare_at_price >= 0),
  inventory_quantity INTEGER DEFAULT 0 CHECK (inventory_quantity >= 0),
  weight_grams INTEGER,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  position INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventory tracking
CREATE TABLE inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'addition', 'removal', 'adjustment'
  reason VARCHAR(255),
  reference_type VARCHAR(50), -- 'order', 'return', 'manual'
  reference_id UUID,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Review images
CREATE TABLE review_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shopping cart
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_or_session CHECK (
    user_id IS NOT NULL OR session_id IS NOT NULL
  )
);

-- Cart items
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(cart_id, variant_id)
);

-- Addresses
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) DEFAULT 'shipping', -- 'shipping', 'billing'
  is_default BOOLEAN DEFAULT false,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state_province VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country_code VARCHAR(2) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  status order_status DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax_amount DECIMAL(10, 2) DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_amount DECIMAL(10, 2) DEFAULT 0 CHECK (shipping_amount >= 0),
  discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  currency VARCHAR(3) DEFAULT 'USD',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255),
  shipping_address_id UUID REFERENCES addresses(id),
  billing_address_id UUID REFERENCES addresses(id),
  notes TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  product_name VARCHAR(255) NOT NULL, -- Denormalized for history
  variant_name VARCHAR(255),
  product_sku VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupons
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type discount_type NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
  minimum_amount DECIMAL(10, 2) DEFAULT 0,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT discount_percentage_max CHECK (
    discount_type != 'percentage' OR discount_value <= 100
  )
);

-- Wishlists
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id, variant_id)
);

-- Email subscriptions
CREATE TABLE email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  source VARCHAR(50), -- 'footer', 'popup', 'checkout'
  CONSTRAINT email_format CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_carts_user ON carts(user_id);
CREATE INDEX idx_carts_session ON carts(session_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);

-- Full-text search indexes
CREATE INDEX idx_products_search ON products USING gin(
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["jsonProtocol", "fullTextSearch", "fullTextIndex"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
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
  admin
  staff
}

enum DiscountType {
  percentage
  fixed_amount
}

model User {
  id               String    @id @default(uuid())
  email            String    @unique
  emailVerified    DateTime?
  passwordHash     String?
  role             UserRole  @default(customer)
  firstName        String?
  lastName         String?
  phone            String?
  dateOfBirth      DateTime?
  avatarUrl        String?
  stripeCustomerId String?   @unique
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  deletedAt        DateTime?

  preferences      UserPreference?
  sessions         Session[]
  reviews          Review[]
  carts            Cart[]
  addresses        Address[]
  orders           Order[]
  wishlists        Wishlist[]
  emailSubscription EmailSubscription?
  inventoryTransactions InventoryTransaction[]

  @@index([email])
  @@index([stripeCustomerId])
}

model UserPreference {
  id                  String   @id @default(uuid())
  userId              String   @unique
  theme               String   @default("light")
  emailNotifications  Boolean  @default(true)
  smsNotifications    Boolean  @default(false)
  language            String   @default("en")
  currency            String   @default("USD")
  scentProfile        Json     @default("{}")
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([userId])
}

model Category {
  id              String    @id @default(uuid())
  name            String
  slug            String    @unique
  description     String?
  imageUrl        String?
  parentId        String?
  displayOrder    Int       @default(0)
  isActive        Boolean   @default(true)
  metaTitle       String?
  metaDescription String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  parent   Category?  @relation("CategoryToCategory", fields: [parentId], references: [id], onDelete: SetNull)
  children Category[] @relation("CategoryToCategory")
  products Product[]

  @@index([slug])
  @@index([isActive])
}

model Brand {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  description String?
  logoUrl     String?
  website     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  products Product[]
}

model Product {
  id                String   @id @default(uuid())
  sku               String   @unique
  name              String
  slug              String   @unique
  description       String?
  shortDescription  String?
  categoryId        String?
  brandId           String?
  price             Decimal  @db.Decimal(10, 2)
  compareAtPrice    Decimal? @db.Decimal(10, 2)
  cost              Decimal? @db.Decimal(10, 2)
  weightGrams       Int?
  isActive          Boolean  @default(true)
  isFeatured        Boolean  @default(false)
  scentNotes        Json     @default("{}")
  ingredients       String[]
  usageInstructions String?
  metaTitle         String?
  metaDescription   String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  category Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  brand    Brand?    @relation(fields: [brandId], references: [id], onDelete: SetNull)
  
  variants   ProductVariant[]
  images     ProductImage[]
  reviews    Review[]
  cartItems  CartItem[]
  orderItems OrderItem[]
  wishlists  Wishlist[]

  @@index([slug])
  @@index([categoryId])
  @@index([isActive])
  @@index([isFeatured])
}

model ProductVariant {
  id                 String   @id @default(uuid())
  productId          String
  sku                String   @unique
  name               String
  size               String?
  color              String?
  price              Decimal  @db.Decimal(10, 2)
  compareAtPrice     Decimal? @db.Decimal(10, 2)
  inventoryQuantity  Int      @default(0)
  weightGrams        Int?
  position           Int      @default(0)
  isActive           Boolean  @default(true)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  cartItems    CartItem[]
  orderItems   OrderItem[]
  wishlists    Wishlist[]
  inventoryTransactions InventoryTransaction[]

  @@index([productId])
  @@index([sku])
}

model ProductImage {
  id        String   @id @default(uuid())
  productId String
  url       String
  altText   String?
  position  Int      @default(0)
  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model InventoryTransaction {
  id            String   @id @default(uuid())
  variantId     String
  quantity      Int
  type          String   // 'addition', 'removal', 'adjustment'
  reason        String?
  referenceType String?  // 'order', 'return', 'manual'
  referenceId   String?
  createdById   String?
  createdAt     DateTime @default(now())

  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  createdBy User?          @relation(fields: [createdById], references: [id])
}

model Review {
  id                  String   @id @default(uuid())
  productId           String
  userId              String?
  rating              Int
  title               String?
  comment             String?
  isVerifiedPurchase  Boolean  @default(false)
  helpfulCount        Int      @default(0)
  isFeatured          Boolean  @default(false)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  user    User?   @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  images ReviewImage[]

  @@index([productId])
  @@index([userId])
  @@index([rating])
}

model ReviewImage {
  id        String   @id @default(uuid())
  reviewId  String
  url       String
  createdAt DateTime @default(now())

  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
}

model Cart {
  id        String    @id @default(uuid())
  userId    String?
  sessionId String?
  expiresAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  user  User?      @relation(fields: [userId], references: [id], onDelete: Cascade)
  items CartItem[]

  @@index([userId])
  @@index([sessionId])
}

model CartItem {
  id        String   @id @default(uuid())
  cartId    String
  productId String
  variantId String
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  cart    Cart           @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product Product        @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)

  @@unique([cartId, variantId])
}

model Address {
  id            String   @id @default(uuid())
  userId        String
  type          String   @default("shipping")
  isDefault     Boolean  @default(false)
  firstName     String
  lastName      String
  company       String?
  addressLine1  String
  addressLine2  String?
  city          String
  stateProvince String
  postalCode    String
  countryCode   String
  phone         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  user             User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  shippingOrders   Order[] @relation("ShippingAddress")
  billingOrders    Order[] @relation("BillingAddress")
}

model Order {
  id                    String      @id @default(uuid())
  orderNumber           String      @unique
  userId                String?
  email                 String
  status                OrderStatus @default(pending)
  subtotal              Decimal     @db.Decimal(10, 2)
  taxAmount             Decimal     @default(0) @db.Decimal(10, 2)
  shippingAmount        Decimal     @default(0) @db.Decimal(10, 2)
  discountAmount        Decimal     @default(0) @db.Decimal(10, 2)
  total                 Decimal     @db.Decimal(10, 2)
  currency              String      @default("USD")
  paymentStatus         String      @default("pending")
  paymentMethod         String?
  stripePaymentIntentId String?
  shippingAddressId     String?
  billingAddressId      String?
  notes                 String?
  shippedAt             DateTime?
  deliveredAt           DateTime?
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt

  user            User?      @relation(fields: [userId], references: [id], onDelete: SetNull)
  shippingAddress Address?   @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  billingAddress  Address?   @relation("BillingAddress", fields: [billingAddressId], references: [id])
  items           OrderItem[]

  @@index([userId])
  @@index([orderNumber])
  @@index([status])
  @@index([createdAt(sort: Desc)])
}

model OrderItem {
  id          String   @id @default(uuid())
  orderId     String
  productId   String?
  variantId   String?
  quantity    Int
  price       Decimal  @db.Decimal(10, 2)
  total       Decimal  @db.Decimal(10, 2)
  productName String
  variantName String?
  productSku  String?
  createdAt   DateTime @default(now())

  order   Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product?        @relation(fields: [productId], references: [id], onDelete: SetNull)
  variant ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)
}

model Coupon {
  id            String       @id @default(uuid())
  code          String       @unique
  description   String?
  discountType  DiscountType
  discountValue Decimal      @db.Decimal(10, 2)
  minimumAmount Decimal      @default(0) @db.Decimal(10, 2)
  usageLimit    Int?
  usageCount    Int          @default(0)
  isActive      Boolean      @default(true)
  validFrom     DateTime     @default(now())
  validUntil    DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Wishlist {
  id        String   @id @default(uuid())
  userId    String
  productId String
  variantId String
  createdAt DateTime @default(now())

  user    User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product        @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)

  @@unique([userId, productId, variantId])
  @@index([userId])
}

model EmailSubscription {
  id             String    @id @default(uuid())
  email          String    @unique
  userId         String?   @unique
  isActive       Boolean   @default(true)
  subscribedAt   DateTime  @default(now())
  unsubscribedAt DateTime?
  source         String?

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)
}
```

## API Architecture

### tRPC Router Structure

```typescript
// server/routers/product.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '@/server/trpc'
import { prisma } from '@/lib/db/client'
import { TRPCError } from '@trpc/server'

export const productRouter = router({
  // Get all products with pagination and filtering
  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        category: z.string().optional(),
        search: z.string().optional(),
        sortBy: z.enum(['price', 'name', 'createdAt']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        inStock: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      const {
        page,
        limit,
        category,
        search,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        inStock,
      } = input

      const where = {
        isActive: true,
        ...(category && {
          category: {
            slug: category,
          },
        }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(minPrice !== undefined && {
          price: { gte: minPrice },
        }),
        ...(maxPrice !== undefined && {
          price: { lte: maxPrice },
        }),
        ...(inStock && {
          variants: {
            some: {
              inventoryQuantity: { gt: 0 },
            },
          },
        }),
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: true,
            brand: true,
            images: {
              orderBy: { position: 'asc' },
              take: 1,
            },
            variants: {
              orderBy: { position: 'asc' },
              take: 1,
            },
            reviews: {
              select: {
                rating: true,
              },
            },
          },
          orderBy: { [sortBy]: sortOrder },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.product.count({ where }),
      ])

      return {
        products: products.map((product) => ({
          ...product,
          averageRating:
            product.reviews.length > 0
              ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
                product.reviews.length
              : null,
          reviewCount: product.reviews.length,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      }
    }),

  // Get single product by slug
  getBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input: slug }) => {
      const product = await prisma.product.findFirst({
        where: {
          slug,
          isActive: true,
        },
        include: {
          category: true,
          brand: true,
          images: {
            orderBy: { position: 'asc' },
          },
          variants: {
            orderBy: { position: 'asc' },
          },
          reviews: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatarUrl: true,
                },
              },
              images: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })
      }

      const stats = await prisma.review.aggregate({
        where: { productId: product.id },
        _avg: { rating: true },
        _count: true,
      })

      return {
        ...product,
        averageRating: stats._avg.rating,
        reviewCount: stats._count,
      }
    }),

  // Get related products
  getRelated: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        limit: z.number().min(1).max(20).default(4),
      })
    )
    .query(async ({ input }) => {
      const { productId, limit } = input

      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          categoryId: true,
          price: true,
          scentNotes: true,
        },
      })

      if (!product) {
        return []
      }

      const relatedProducts = await prisma.product.findMany({
        where: {
          id: { not: productId },
          isActive: true,
          OR: [
            { categoryId: product.categoryId },
            {
              price: {
                gte: product.price.toNumber() * 0.7,
                lte: product.price.toNumber() * 1.3,
              },
            },
          ],
        },
        include: {
          images: {
            orderBy: { position: 'asc' },
            take: 1,
          },
          category: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })

      return relatedProducts
    }),

  // Add product review
  addReview: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        rating: z.number().min(1).max(5),
        title: z.string().optional(),
        comment: z.string().optional(),
        images: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, rating, title, comment, images } = input
      const userId = ctx.session.user.id

      // Check if user has purchased this product
      const hasPurchased = await prisma.orderItem.findFirst({
        where: {
          productId,
          order: {
            userId,
            status: 'delivered',
          },
        },
      })

      const review = await prisma.review.create({
        data: {
          productId,
          userId,
          rating,
          title,
          comment,
          isVerifiedPurchase: !!hasPurchased,
          images: images
            ? {
                create: images.map((url) => ({ url })),
              }
            : undefined,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
          images: true,
        },
      })

      return review
    }),
})
```

### API Route Examples

```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        await prisma.order.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: {
            paymentStatus: 'completed',
            status: 'processing',
          },
        })
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        
        await prisma.order.update({
          where: { stripePaymentIntentId: failedPayment.id },
          data: {
            paymentStatus: 'failed',
            status: 'cancelled',
          },
        })
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        // Handle subscription events
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
```

## State Management Architecture

### Zustand Store Implementation

```typescript
// store/cart.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { CartItem, Product, ProductVariant } from '@/types/database'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: (open?: boolean) => void
  
  // Computed
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.variantId === variant.id
          )

          if (existingItem) {
            existingItem.quantity += quantity
          } else {
            state.items.push({
              id: `${product.id}-${variant.id}`,
              productId: product.id,
              variantId: variant.id,
              product,
              variant,
              quantity,
              price: variant.price,
            })
          }
        })
      },

      removeItem: (variantId) => {
        set((state) => {
          state.items = state.items.filter(
            (item) => item.variantId !== variantId
          )
        })
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }

        set((state) => {
          const item = state.items.find(
            (item) => item.variantId === variantId
          )
          if (item) {
            item.quantity = quantity
          }
        })
      },

      clearCart: () => {
        set((state) => {
          state.items = []
        })
      },

      toggleCart: (open) => {
        set((state) => {
          state.isOpen = open ?? !state.isOpen
        })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    })),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
```

### React Context for Server State

```typescript
// components/providers/AuthProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchSession = async () => {
    try {
      const sessionData = await getSession()
      setSession(sessionData)
    } catch (error) {
      console.error('Failed to fetch session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()

    // Listen for session changes
    const handleFocus = () => fetchSession()
    window.addEventListener('focus', handleFocus)
    
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        isLoading, 
        refetch: fetchSession 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

## Authentication and Authorization

### Auth.js Configuration

```typescript
// lib/auth/config.ts
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db/client'
import { compare } from 'bcryptjs'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/welcome',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        
        if (!parsed.success) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user || !user.passwordHash) {
          throw new Error('Invalid credentials')
        }

        const isValid = await compare(parsed.data.password, user.passwordHash)

        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          image: user.avatarUrl,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role || 'customer'
      }

      if (account) {
        token.accessToken = account.access_token
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
  events: {
    async signIn({ user, account, profile }) {
      // Log successful sign-in
      console.log(`User ${user.email} signed in via ${account?.provider}`)
    },
    async createUser({ user }) {
      // Send welcome email
      await sendWelcomeEmail(user.email!)
      
      // Create default preferences
      await prisma.userPreference.create({
        data: {
          userId: user.id,
        },
      })
    },
  },
}
```

### Role-Based Access Control

```typescript
// lib/auth/rbac.ts
import { Session } from 'next-auth'
import { UserRole } from '@prisma/client'

export const permissions = {
  // Product permissions
  'product:read': ['customer', 'staff', 'admin'],
  'product:create': ['staff', 'admin'],
  'product:update': ['staff', 'admin'],
  'product:delete': ['admin'],
  
  // Order permissions
  'order:read:own': ['customer', 'staff', 'admin'],
  'order:read:all': ['staff', 'admin'],
  'order:update': ['staff', 'admin'],
  'order:cancel:own': ['customer', 'staff', 'admin'],
  'order:cancel:all': ['admin'],
  
  // User permissions
  'user:read:own': ['customer', 'staff', 'admin'],
  'user:read:all': ['admin'],
  'user:update:own': ['customer', 'staff', 'admin'],
  'user:update:all': ['admin'],
  'user:delete': ['admin'],
  
  // Admin permissions
  'admin:access': ['admin'],
  'reports:view': ['staff', 'admin'],
  'settings:manage': ['admin'],
} as const

export type Permission = keyof typeof permissions

export function hasPermission(
  session: Session | null,
  permission: Permission
): boolean {
  if (!session?.user?.role) return false
  
  const allowedRoles = permissions[permission]
  return allowedRoles.includes(session.user.role as UserRole)
}

export function requirePermission(
  session: Session | null,
  permission: Permission
): void {
  if (!hasPermission(session, permission)) {
    throw new Error('Insufficient permissions')
  }
}

// HOC for protecting pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  permission?: Permission
) {
  return function AuthorizedComponent(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return

      if (!session) {
        router.push('/auth/login')
        return
      }

      if (permission && !hasPermission(session, permission)) {
        router.push('/403')
      }
    }, [session, status, router])

    if (status === 'loading') {
      return <LoadingSpinner />
    }

    if (!session || (permission && !hasPermission(session, permission))) {
      return null
    }

    return <Component {...props} />
  }
}
```

## Performance Architecture

### Caching Strategy

```typescript
// lib/cache/redis.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key)
      return data as T | null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  },

  async set(
    key: string,
    value: any,
    ttlSeconds: number = 3600
  ): Promise<void> {
    try {
      await redis.set(key, value, { ex: ttlSeconds })
    } catch (error) {
      console.error('Cache set error:', error)
    }
  },

  async delete(key: string): Promise<void> {
    try {
      await redis.del(key)
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  },

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error) {
      console.error('Cache invalidate error:', error)
    }
  },
}

// Cache wrapper for data fetching
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  const cached = await cache.get<T>(key)
  if (cached) return cached

  const fresh = await fetcher()
  await cache.set(key, fresh, ttlSeconds)
  return fresh
}
```

### Image Optimization

```typescript
// components/common/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  if (error) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center',
          className
        )}
      >
        <span className="text-gray-400">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes || '100vw'}
        quality={quality}
        priority={priority}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0',
          fill && 'object-cover'
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
```

### Bundle Optimization

```typescript
// next.config.ts (extended)
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const nextConfig: NextConfig = {
  // ... previous config
  
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer in development
    if (!dev && !isServer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze.html',
          openAnalyzer: false,
        })
      )
    }

    // Module federation for micro-frontends
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }

    return config
  },

  // Optimize chunks
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui',
      'date-fns',
    ],
  },

  // Compression
  compress: true,
  
  // Generate source maps only in development
  productionBrowserSourceMaps: false,
}
```

## Security Architecture

### Security Headers

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.stripe.com https://algolia.net",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    ].join('; ')
  )

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/account')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = await getToken({ req: request })
    
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Input Validation and Sanitization

```typescript
// lib/validation/sanitizers.ts
import DOMPurify from 'isomorphic-dompurify'
import { z } from 'zod'

// HTML sanitizer for rich text content
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}

// Common validation schemas
export const schemas = {
  email: z.string().email().toLowerCase().trim(),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  
  postalCode: z
    .string()
    .regex(/^[A-Z0-9]{3,10}$/i, 'Invalid postal code'),
  
  url: z.string().url(),
  
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),
}

// SQL injection prevention (using Prisma parameterized queries)
export function escapeSQLIdentifier(identifier: string): string {
  return identifier.replace(/[^a-zA-Z0-9_]/g, '')
}

// XSS prevention for user-generated content
export function escapeHTML(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }
  return str.replace(/[&<>"'/]/g, (char) => map[char])
}
```

## Testing Architecture

### Unit Testing Setup

```typescript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Integration Testing

```typescript
// tests/integration/api/product.test.ts
import { createMocks } from 'node-mocks-http'
import { prisma } from '@/lib/db/client'
import handler from '@/app/api/products/route'

// Mock Prisma
jest.mock('@/lib/db/client', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/products', () => {
    it('should return products with pagination', async () => {
      const mockProducts = [
        { id: '1', name: 'Product 1', price: 29.99 },
        { id: '2', name: 'Product 2', price: 39.99 },
      ]

      ;(prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts)
      ;(prisma.product.count as jest.Mock).mockResolvedValue(2)

      const { req, res } = createMocks({
        method: 'GET',
        query: { page: '1', limit: '10' },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      const json = JSON.parse(res._getData())
      expect(json.products).toHaveLength(2)
      expect(json.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      })
    })
  })

  describe('POST /api/products', () => {
    it('should create a new product with admin role', async () => {
      const newProduct = {
        name: 'New Product',
        price: 49.99,
        sku: 'NEW-001',
      }

      ;(prisma.product.create as jest.Mock).mockResolvedValue({
        id: '3',
        ...newProduct,
      })

      const { req, res } = createMocks({
        method: 'POST',
        body: newProduct,
        headers: {
          authorization: 'Bearer valid-admin-token',
        },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(201)
      const json = JSON.parse(res._getData())
      expect(json.name).toBe(newProduct.name)
    })

    it('should reject creation without admin role', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { name: 'Product' },
        headers: {
          authorization: 'Bearer valid-user-token',
        },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(403)
    })
  })
})
```

### E2E Testing

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('complete purchase as guest', async ({ page }) => {
    // Add product to cart
    await page.click('text=Shop Now')
    await page.click('.product-card:first-child')
    await page.click('text=Add to Cart')
    
    // Verify cart updated
    await expect(page.locator('.cart-count')).toHaveText('1')
    
    // Go to checkout
    await page.click('[aria-label="Shopping cart"]')
    await page.click('text=Checkout')
    
    // Fill customer information
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="firstName"]', 'John')
    await page.fill('input[name="lastName"]', 'Doe')
    
    // Fill shipping address
    await page.fill('input[name="address1"]', '123 Main St')
    await page.fill('input[name="city"]', 'New York')
    await page.fill('input[name="state"]', 'NY')
    await page.fill('input[name="postalCode"]', '10001')
    
    // Select shipping method
    await page.click('text=Standard Shipping')
    
    // Fill payment information (Stripe test card)
    const stripeFrame = page.frameLocator('iframe[title="Secure card payment input frame"]')
    await stripeFrame.locator('[name="cardnumber"]').fill('4242 4242 4242 4242')
    await stripeFrame.locator('[name="exp-date"]').fill('12/25')
    await stripeFrame.locator('[name="cvc"]').fill('123')
    await stripeFrame.locator('[name="postal"]').fill('10001')
    
    // Place order
    await page.click('text=Place Order')
    
    // Verify success
    await expect(page.locator('h1')).toHaveText('Order Confirmed')
    await expect(page.locator('.order-number')).toBeVisible()
  })

  test('apply discount code', async ({ page }) => {
    // Add product to cart
    await page.goto('/products/essential-oils/lavender-dreams')
    await page.click('text=Add to Cart')
    
    // Go to cart
    await page.click('[aria-label="Shopping cart"]')
    
    // Apply discount code
    await page.fill('input[name="discountCode"]', 'SAVE10')
    await page.click('text=Apply')
    
    // Verify discount applied
    await expect(page.locator('.discount-amount')).toBeVisible()
    await expect(page.locator('.discount-amount')).toContainText('-$')
  })
})
```

## Deployment Architecture

### CI/CD Pipeline

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      
      - name: Run unit tests
        run: pnpm test:unit
      
      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
        run: |
          pnpm prisma migrate deploy
          pnpm test:integration

  e2e:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      
      - name: Install Playwright
        run: pnpm playwright install --with-deps
      
      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          PLAYWRIGHT_BASE_URL: ${{ secrets.STAGING_URL }}

  deploy:
    runs-on: ubuntu-latest
    needs: [test, e2e]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Run smoke tests
        run: |
          sleep 30
          pnpm test:smoke
        env:
          SMOKE_TEST_URL: https://thescent.com

  notify:
    runs-on: ubuntu-latest
    needs: deploy
    if: always()
    
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment ${{ job.status }}'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Infrastructure as Code

```typescript
// infrastructure/vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "regions": ["iad1", "sfo1", "lhr1", "syd1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://thescent.com"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database-url",
      "STRIPE_SECRET_KEY": "@stripe-secret-key",
      "SENDGRID_API_KEY": "@sendgrid-api-key",
      "ALGOLIA_APP_ID": "@algolia-app-id",
      "ALGOLIA_API_KEY": "@algolia-api-key"
    }
  },
  "functions": {
    "app/api/webhooks/stripe/route.ts": {
      "maxDuration": 10
    },
    "app/api/trpc/[trpc]/route.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

## Monitoring and Observability

### Application Performance Monitoring

```typescript
// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs'
import { CaptureContext } from '@sentry/types'

export function initSentry() {
  const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    debug: process.env.NODE_ENV === 'development',
    
    integrations: [
      new Sentry.BrowserTracing({
        tracingOrigins: ['localhost', 'thescent.com', /^\//],
        routingInstrumentation: Sentry.nextRouterInstrumentation,
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    beforeSend(event, hint) {
      // Filter out known issues
      if (event.exception) {
        const error = hint.originalException
        
        // Ignore certain errors
        if (error && error.message && error.message.includes('ResizeObserver')) {
          return null
        }
      }
      
      return event
    },
  })
}

// Custom error boundary
export function captureException(
  error: Error,
  context?: CaptureContext
): void {
  console.error('Application error:', error)
  
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, context)
  }
}

// Performance monitoring
export function measurePerformance(
  name: string,
  fn: () => Promise<any>
): Promise<any> {
  const transaction = Sentry.getCurrentHub().getScope()?.getTransaction()
  const span = transaction?.startChild({
    op: 'function',
    description: name,
  })
  
  return fn().finally(() => {
    span?.finish()
  })
}
```

### Custom Analytics

```typescript
// lib/analytics/tracker.ts
import { analytics } from '@vercel/analytics'

interface TrackingEvent {
  name: string
  properties?: Record<string, any>
}

class AnalyticsTracker {
  private queue: TrackingEvent[] = []
  private isInitialized = false

  initialize() {
    if (this.isInitialized) return
    
    this.isInitialized = true
    this.flushQueue()
  }

  track(name: string, properties?: Record<string, any>) {
    const event: TrackingEvent = { name, properties }
    
    if (!this.isInitialized) {
      this.queue.push(event)
      return
    }
    
    this.sendEvent(event)
  }

  private flushQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) this.sendEvent(event)
    }
  }

  private sendEvent(event: TrackingEvent) {
    // Send to Vercel Analytics
    analytics.track(event.name, event.properties)
    
    // Send to custom analytics endpoint
    fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
        userId: this.getUserId(),
      }),
    }).catch(console.error)
  }

  private getSessionId(): string {
    // Implementation for session tracking
    return localStorage.getItem('sessionId') || 'anonymous'
  }

  private getUserId(): string | null {
    // Implementation for user tracking
    return localStorage.getItem('userId')
  }

  // E-commerce specific events
  viewProduct(product: any) {
    this.track('view_item', {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      currency: 'USD',
    })
  }

  addToCart(product: any, quantity: number) {
    this.track('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity,
      currency: 'USD',
    })
  }

  beginCheckout(cart: any) {
    this.track('begin_checkout', {
      value: cart.total,
      currency: 'USD',
      item_count: cart.items.length,
    })
  }

  purchase(order: any) {
    this.track('purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: 'USD',
      tax: order.tax,
      shipping: order.shipping,
      items: order.items.map((item: any) => ({
        item_id: item.productId,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }
}

export const tracker = new AnalyticsTracker()
```

## Conclusion

This Project Architecture Document provides a comprehensive blueprint for building The Scent e-commerce platform. The architecture leverages modern web technologies and best practices to create a scalable, performant, and maintainable application.

Key architectural highlights:
- **Modular Structure**: Clear separation of concerns with well-defined boundaries
- **Type Safety**: End-to-end TypeScript ensuring code reliability
- **Performance First**: Optimized for Core Web Vitals and user experience
- **Security by Design**: Multiple layers of security from infrastructure to application
- **Scalable Infrastructure**: Cloud-native architecture ready for growth
- **Developer Experience**: Well-documented, testable, and maintainable codebase

The implementation of this architecture will result in a world-class e-commerce platform that not only meets current requirements but is also prepared for future enhancements and scaling challenges.

