Of course. This is an exciting and creative request that aligns perfectly with the project's vision of a "digital sanctuary." I will put on my "deep-thinking hat" and meticulously plan a set of aesthetic and functional enhancements to elevate the main landing page to a world-class standard, drawing inspiration from luxury and tech leaders like Apple.

### **Deep Analysis & Strategic Planning**

My goal is to transform the homepage from a clean, static page into a dynamic, immersive, and emotionally resonant experience. This involves three key pillars:

1.  **Immersive Hero Section:** Introduce a background video to create immediate visual impact and a sense of calm sophistication. This requires careful implementation to ensure performance and user control.
2.  **Refined Color Palette & Typography:** Overhaul the existing color scheme to one that is more "gorgeous and seductive" with better contrast, inspired by modern luxury and tech aesthetics. This involves updating both the Tailwind configuration and the global CSS variables.
3.  **Subtle, Polished Animations:** Enhance the existing animations and introduce new ones to make the user's journey through the page feel fluid, intuitive, and premium.

---

### **Exploration of Implementation Options**

#### **1. Hero Background Video**

*   **Option A: Standard HTML `<video>` Tag.** Simple, universally supported. We can use `autoPlay`, `muted`, `loop`, and `playsInline` attributes for the best behavior on all devices. A `poster` image is crucial for fast initial loads. This is the most reliable and performant option.
*   **Option B: Using a library like `react-player`.** This adds an unnecessary dependency for simple background video playback. It's overkill for this use case.
*   **Mute/Unmute Control:**
    *   A stateful React component is required. We'll use a `useState` hook to track the muted state and a `useRef` hook to directly access the `<video>` element to control its `muted` property.
    *   The icon can be conditionally rendered (`Volume2` for unmuted, `VolumeX` for muted) based on the state.
*   **Decision:** I will implement this using a standard HTML `<video>` tag within a new, dedicated **`HeroSection.tsx`** client component to manage the state for the mute toggle.

#### **2. New Color Scheme: "Graphite & Sage"**

*   **Goal:** Create a scheme that is luxurious, has excellent contrast, and feels both organic and modern. I will move away from the current generic colors and create a more opinionated palette.
*   **Inspiration:** Apple's design often uses deep, near-black charcoals instead of pure black for a softer feel, combined with a single, sophisticated accent color. I will adopt this philosophy.
*   **Proposed Palette:**
    *   **Dark Mode:** A very dark charcoal/graphite (`#1C1917`, from Tailwind's `stone-950`) for the background, with off-white text (`#E7E5E4`, `stone-200`) for high but not jarring contrast. The accent color will be a rich, organic sage green.
    *   **Light Mode:** An elegant, warm off-white/limestone background (`#FAFAF9`, `stone-50`) with dark charcoal text for crisp readability. The same sage green will be used for primary actions.
*   **Implementation:**
    *   Update the HSL CSS variables in `app/globals.css` for both `:root` (light/day mode) and `[data-theme='night']` (dark mode).
    *   Update the concrete color definitions in `tailwind.config.ts` to reflect this new palette, ensuring components that use hardcoded colors (like the footer) are also updated.
*   **Decision:** This new "Graphite & Sage" palette will be implemented across both the global CSS and the Tailwind config.

#### **3. Animation Enhancements**

*   **Goal:** Make the page feel more alive and responsive.
*   **Analysis:** The current `FadeIn` component is good, but we can make it more dynamic.
*   **Enhancements:**
    *   I will modify the `FadeIn` animation to be slightly more pronounced (`y: 20` instead of `y: 10`).
    *   I will add a subtle "stagger" effect to the hero text and buttons by applying slightly different `delay` props to each `FadeIn` component on the homepage.
    *   I will add a subtle scale and fade animation to the "Featured Products" cards on hover, using Framer Motion's `whileHover` prop.
*   **Decision:** These enhancements will be applied to `FadeIn.tsx`, `app/page.tsx`, and `components/features/product/ProductCard.tsx`.

---

### **Comprehensive Execution Plan**

This plan is structured to implement the changes from the foundational level (CSS/config) up to the component level.

#### **Phase 1: The New "Graphite & Sage" Color Palette**

**Checklist:**
*   [ ] `tailwind.config.ts` is updated with the new color definitions.
*   [ ] `app/globals.css` is updated with new HSL values for semantic variables, ensuring high contrast ratios.
*   [ ] The footer is updated to use the new color names.

**Step 1.1: Update `tailwind.config.ts`**

*   **Action:** I will replace the existing color palette with the new "Graphite & Sage" theme, which uses Tailwind's pre-defined `stone` and a custom `sage` palette for consistency.

**Step 1.2: Update `app/globals.css`**

*   **Action:** I will update the HSL values in `:root` and `[data-theme='night']` to match the new palette precisely.

**Step 1.3: Update `Footer.tsx`**

*   **Action:** The footer uses some hardcoded colors. I will update its classes to use the new `stone` palette names to match the dark theme.

---

#### **Phase 2: Animation & Hero Section Implementation**

**Checklist:**
*   [ ] The `FadeIn` animation is enhanced.
*   [ ] A new `HeroSection.tsx` client component is created to manage the video and its state.
*   [ ] The homepage (`app/page.tsx`) is refactored to use the new `HeroSection` component.
*   [ ] The product cards have a new hover animation.

**Step 2.1: Enhance Animations**

*   **Action:** I will update the `FadeIn` component for a more impactful effect and the `ProductCard` to add a hover animation.

**Step 2.2: Create the `HeroSection` Component**

*   **Action:** I will create a new client component to encapsulate the entire hero section logic.

**Step 2.3: Update the Homepage (`page.tsx`)**

*   **Action:** The homepage will be simplified to compose the new `<HeroSection />` and the existing `<FeaturedProducts />` section. I'll also adjust the `FadeIn` delays for a staggered effect.

---

I will now proceed with the meticulous, step-by-step implementation of this plan.

### **Implementation: Phase 1 - The New "Graphite & Sage" Color Palette**

#### **Step 1.1: Updating `tailwind.config.ts`**

**Action:** Replacing the color palette to establish our new design language.

**File:** `tailwind.config.ts`
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

#### **Step 1.2: Updating `app/globals.css`**

**Action:** Updating the CSS variables to apply the new color theme globally.

**File:** `app/globals.css`
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

#### **Step 1.3: Update `Footer.tsx`**

**Action:** Updating the footer to use the new semantic color palette.

**File:** `components/common/Layout/Footer.tsx`
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

---

### **Phase 2: Animation & Hero Section Implementation**

#### **Step 2.1: Enhance Animations**

**Action:** I will make subtle improvements to the `FadeIn` animation and add a hover effect to the `ProductCard`.

**File:** `components/animations/FadeIn.tsx`
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

**File:** `components/features/product/ProductCard.tsx`
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
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]
  const displayPrice = primaryVariant?.price ?? product.price

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Link href={`/products/${product.slug}`} className="group block">
        <Card className={cn('overflow-hidden transition-shadow duration-300 hover:shadow-xl', className)}>
          <CardHeader className="p-0">
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative aspect-[4/5] overflow-hidden"
            >
              {primaryImage?.url ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText || product.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="h-full w-full bg-stone-200 dark:bg-stone-800" />
              )}
            </motion.div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-medium truncate">{product.name}</CardTitle>
            <p className="mt-2 text-xl font-semibold">{formatPrice(displayPrice, { notation: 'standard' })}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
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

#### **Step 2.2 & 2.3: Create `HeroSection` and Update Homepage**

**Action:** I will create the new `HeroSection` client component and then simplify the main `app/page.tsx` to use it.

**File:** `components/features/home/HeroSection.tsx` (New File)
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

**Action:** Finally, I will update `app/page.tsx` to use this new component.

**File:** `app/page.tsx`
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
  const featuredProducts = await caller.product.getFeatured({ limit: 3 })

  return (
    // The main container no longer needs background colors as the sections handle it
    <div>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
    </div>
  )
}
```

### **Final Summary & Conclusion**

The aesthetic and functional overhaul of the homepage is complete.

1.  **New Color Palette:** The "Graphite & Sage" theme has been implemented, providing a more luxurious, high-contrast look and feel across both light and dark modes.
2.  **Immersive Hero Section:** The homepage now features a stunning background video with a functional mute/unmute control, creating an immediate and engaging first impression.
3.  **Enhanced Animations:** Animations have been refined to be more impactful and fluid, contributing to the premium user experience.
4.  **Modular & Clean Code:** The logic has been cleanly separated. The `HeroSection` is a self-contained client component, while the main page remains a fast, server-rendered component that fetches data and composes the page structure.

The application's landing page is now significantly more compelling and aligns perfectly with the visual identity of a modern luxury brand.

---
https://drive.google.com/file/d/10AgrP-bco3lnYajfIyo3mBkpxWOhC44z/view?usp=sharing, https://drive.google.com/file/d/184wcHrao5v1dNeKtVxSiZR2X1-KlDOib/view?usp=sharing, https://drive.google.com/file/d/18q1tKJXeR0pyQur5ykBFK97kvzx8YKNa/view?usp=sharing, https://drive.google.com/file/d/19xDLJDUSRbSeWCo7CBJAKhhkAWX2KzO4/view?usp=sharing, https://drive.google.com/file/d/1CIV0ONx7F8JVpLJr2hvNq6Qa_GYDvjEd/view?usp=sharing, https://drive.google.com/file/d/1RDL9CuBPHekn31CFcuLBfcw06EGWR3nQ/view?usp=sharing, https://drive.google.com/file/d/1XJr4Ny9RbhOagGL8VndROZP2pYSb_pR6/view?usp=sharing, https://drive.google.com/file/d/1YtFkfMAi5LENQCiCTsOKRdIoWYNZKXGS/view?usp=sharing, https://drive.google.com/file/d/1ciAx3uFY0fQiCwllGUqiFW186JLuECqd/view?usp=sharing, https://drive.google.com/file/d/1eCzMVjAhvEPcPrMSWxm2HzuKv8Ft53ce/view?usp=sharing, https://drive.google.com/file/d/1keFBcrioCX7f8KJpGm-qrNryDc8eMcoN/view?usp=sharing, https://drive.google.com/file/d/1ndrfE2XkCGuBFSgXsXiJcsi-EUSRpEvK/view?usp=sharing, https://drive.google.com/file/d/1s0eXWDND3IjHMjV9P9P6EwzaXEDcKUjz/view?usp=sharing, https://drive.google.com/file/d/1vEFSzABYQHu_eVypxKdRNUxb3hswVAY1/view?usp=sharing, https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221vWC4-KRRANRAm4H8WAYmiaawybGPgN75%22%5D,%22action%22:%22open%22,%22userId%22:%22103961307342447084491%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing, https://drive.google.com/file/d/1wVhAtL17jVIKT8z38OERhCTWVMobCHvJ/view?usp=sharing, https://drive.google.com/file/d/1zKzr24sczMiKPP-lSKgpLqHs7GEftuh_/view?usp=sharing

