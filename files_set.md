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
      padding: '1.5rem', // Adjusted for better spacing on various screens
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
        // Generic naming for shades of gray, useful for borders, muted text, etc.
        border: '#E0E0E0',
        'dark-border': '#3A3A3A',
        muted: '#6B7280',
        'dark-muted': '#9CA3AF',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        // Adding the heading font from the sample for luxury feel
        heading: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config

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

# app/globals.css
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Day Theme Colors */
    --background: 240 17% 96%; /* #f5f2ed - limestone */
    --foreground: 240 5% 17%;  /* #2c2c2c - charcoal */
    
    --card: 240 17% 96%;
    --card-foreground: 240 5% 17%;
    
    --primary: 125 13% 55%;        /* #7b9b7e - sage */
    --primary-foreground: 0 0% 98%; /* #f5f5f5 - pearl */

    --secondary: 125 13% 33%;      /* #4a5f4c - deep-sage */
    --secondary-foreground: 0 0% 98%;

    --destructive: 13 54% 63%;     /* #d4846f - terracotta */
    --destructive-foreground: 0 0% 98%;

    --muted: 240 5% 63%;
    --muted-foreground: 240 5% 40%;
    
    --accent: 125 13% 55%;
    --accent-foreground: 0 0% 98%;
    
    --border: 240 6% 87%;
    --input: 240 6% 87%;
    --ring: 125 13% 55%;
    
    --radius: 0.5rem;
  }

  [data-theme='night'] {
    /* Night Theme Colors */
    --background: 0 0% 10%;       /* #1a1a1a - midnight */
    --foreground: 0 0% 98%;       /* #f5f5f5 - pearl */

    --card: 0 0% 10%;
    --card-foreground: 0 0% 98%;

    --primary: 125 13% 45%;        /* A slightly brighter deep-sage for night mode */
    --primary-foreground: 0 0% 98%;

    --secondary: 125 13% 25%;
    --secondary-foreground: 0 0% 98%;

    --destructive: 6 56% 50%;      /* #8b4a47 - burgundy */
    --destructive-foreground: 0 0% 98%;

    --muted: 0 0% 20%;
    --muted-foreground: 0 0% 63%;
    
    --accent: 125 13% 45%;
    --accent-foreground: 0 0% 98%;

    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 125 13% 45%;
  }
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}

```

