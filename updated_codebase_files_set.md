# components/common/Layout/Footer.tsx
```tsx
// components/common/Layout/Footer.tsx
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import {
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

export function Footer() {
  // The non-existent 'Pinterest' icon has been removed from this array.
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const shopLinks = ['Essential Oils', 'Natural Soaps', 'Gift Sets', 'New Arrivals', 'Bestsellers'];
  const helpLinks = ['Contact Us', 'FAQs', 'Shipping & Returns', 'Track Your Order', 'Privacy Policy'];

  return (
    <footer className="bg-charcoal text-pearl border-t border-dark-border">
      <div className="container py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold">The Scent</h3>
            <p className="text-sm text-dark-muted">
              Creating premium aromatherapy products to enhance mental and physical well-being
              through the power of nature.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-dark-muted hover:text-pearl transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link}>
                  <Link href="/products" className="text-sm text-dark-muted hover:text-pearl transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-dark-muted hover:text-pearl transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>123 Aromatherapy Lane, Wellness City, WB 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@thescent.com</span>
              </li>
            </ul>
            <form className="flex w-full max-w-sm items-center space-x-2 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-midnight border border-dark-border px-3 py-2 text-sm rounded-md focus:ring-2 focus:ring-sage focus:outline-none"
              />
              <Button type="submit" variant="primary" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-dark-border/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p className="text-dark-muted">&copy; {new Date().getFullYear()} The Scent. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-dark-muted">
            <span>Accepted Payments:</span>
            <CreditCard className="h-6 w-6" />
            <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/payment-icons/paypal.svg" alt="PayPal" className="h-5" />
            <img src="/payment-icons/amex.svg" alt="American Express" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}

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
    "tailwindcss": "^3.4.17",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.3"
  }
}

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

# tailwind.config.ts
```ts
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

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
        // ShadCN/UI style theme colors using CSS variables
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
        heading: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

```

