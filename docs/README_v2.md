# 🌿 The Scent — A Modern Luxury E-Commerce Platform

> _A world-class digital sanctuary where the art of aromatherapy meets cutting-edge web innovation.  
> This project showcases a complete, production-quality codebase with a focus on modern UI/UX, performance, and maintainability._

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Demo & Features](#live-demo--features)
3. [System Architecture](#system-architecture)
4. [Codebase Structure](#codebase-structure)
5. [Technology Stack](#technology-stack)
6. [Getting Started (Local Development)](#getting-started-local-development)
7. [Testing & Quality Assurance](#testing--quality-assurance)
8. [License](#license)

---

## Project Overview

**The Scent** represents a new standard in luxury e-commerce, blending sophisticated design, advanced personalization, and immersive product discovery. This platform has been meticulously crafted to transform the intangible essence of scent into a digital experience that is emotionally engaging, visually stunning, and technically robust.

Built on the latest web technologies, The Scent is a complete, end-to-end application featuring:
- **A Performant Frontend** using Next.js 14+, React, and Tailwind CSS with a custom, high-contrast day/night theme system.
- **A Type-Safe, Modular Backend** with tRPC, Prisma, and PostgreSQL, supporting a full suite of e-commerce logic.
- **Seamless Third-Party Integrations** for payments (Stripe), headless content (Sanity.io), and more.
- **Advanced Interactive Features** like a 3D product viewer and shared layout animations to create a truly premium user experience.
- **A Complete CI/CD & Testing Pipeline** ensuring code quality and stability.

---

## Live Demo & Features

**(Note: A link to a live Vercel deployment would go here.)**

### Core E-Commerce Features
- ✔️ **Full Authentication:** Secure sign-in, registration, and session management using NextAuth.js.
- ✔️ **Protected Routes:** Middleware to protect user-specific pages like the account section.
- ✔️ **Dynamic Product Catalog:** Server-side rendering of product listing and detail pages.
- ✔️ **Interactive Shopping Cart:** A client-side cart managed with Zustand, featuring a slide-out drawer for a seamless UX.
- ✔️ **Secure Checkout Flow:** Full checkout process with form validation and payment processing integrated via Stripe Elements.
- ✔️ **Order Persistence:** Webhook-driven order creation ensures reliability.
- ✔️ **User Account Dashboard:** Users can view their profile and order history.

### Advanced & Luxury UX Features
- ✔️ **"Graphite" Theme:** A high-contrast, professional day/night theme system.
- ✔️ **3D Product Viewer:** Interactive 3D models on product pages, built with `react-three-fiber`.
- ✔️ **Shared Layout Animations:** Fluid page transitions for product images using `framer-motion`.
- ✔️ **AI-Powered Recommendations:** "You Might Also Like" section based on product category.
- ✔️ **Headless CMS Integration:** A fully functional "Journal" section with content managed via Sanity.io.

### SEO & Performance
- ✔️ **Dynamic Sitemap & Robots.txt:** Programmatically generated `sitemap.xml` and `robots.txt` for optimal SEO.
- ✔️ **Bundle Analysis:** Configured with `@next/bundle-analyzer` for performance monitoring.
- ✔️ **Advanced Caching:** Uses Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for maximum speed.

---

## System Architecture

The Scent leverages a **modular, component-driven, and cloud-native architecture** for scalability and maintainability.

```
           ┌──────────────────────┐
           │        Users         │
           │ (Web & Mobile Browsers)
           └─────────┬────────────┘
                     │
             HTTPS Requests
                     │
           ┌─────────▼────────────┐
           │  Vercel Edge Network │
           └─────────┬────────────┘
                     │
           ┌─────────▼────────────┐
           │    Next.js App       │
           │ (SSR/ISR/SSG + API)  │
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
       │     │ Stripe, Sanity.io │   │
       └────►│  S3, SendGrid...  │◄──┘
             └──────────────────┘
```

---

## Codebase Structure

A monorepo structure for optimal separation of concerns and scalability.

```
the-scent/
├── app/
│   ├── (auth)/         # Login/Register pages
│   ├── (shop)/         # Product, Cart, Checkout pages
│   ├── account/        # Protected user dashboard (Profile, Orders)
│   ├── journal/        # CMS-driven Journal (Blog) pages
│   ├── api/            # API routes (tRPC, auth, webhooks)
│   └── sitemap.ts      # Dynamically generated sitemap
├── components/
│   ├── common/         # Design system: Button, Card, Sheet, Tabs, etc.
│   ├── features/       # Domain features: auth, product, cart, account...
│   └── providers/      # Centralized client-side providers
├── hooks/              # Custom React hooks (e.g., use-cart)
├── lib/
│   ├── auth/           # Auth.js configuration
│   ├── cms/            # Sanity.io client and helpers
│   └── db/             # Prisma client
├── middleware.ts       # Edge middleware for protecting routes
├── prisma/             # Prisma schema, migrations, and seed script
├── public/             # Static assets (images, models, icons)
├── server/             # tRPC backend (routers, context)
├── store/              # Zustand global state stores (cart, UI)
├── tests/
│   └── e2e/            # Playwright end-to-end tests
└── ...config files     # (package.json, next.config.js, etc.)
```

---

## Technology Stack

**Frontend & UI**
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/) (Client Hooks)
- [Framer Motion](https://www.framer.com/motion/) (Animation)
- [Zustand](https://zustand-demo.pmnd.rs/) (State Management)
- [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (Forms & Validation)
- [Radix UI](https://www.radix-ui.com/) (for accessible UI primitives like Tabs & Dialogs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei) (3D Graphics)

**Backend & Data**
- [Next.js](https://nextjs.org/) (Route Handlers)
- [tRPC](https://trpc.io/) (API Routers)
- [Prisma](https://www.prisma.io/) ORM with [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/) (Authentication)
- [Stripe](https://stripe.com/) (Payments)
- [Sanity.io](https://www.sanity.io/) (Headless CMS)

**DevOps & Tooling**
- [pnpm](https://pnpm.io/) (Package Manager)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/) & [Playwright](https://playwright.dev/) (Testing)
- [@next/bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer) (Performance Analysis)

---

## Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- [Docker](https://www.docker.com/) (for running PostgreSQL)

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

- Copy `.env.example` to a new `.env` file:
  ```bash
  cp .env.example .env
  ```
- Open the `.env` file and fill in your keys for:
  - `DATABASE_URL` (already configured for the Docker setup below)
  - `NEXTAUTH_SECRET` (generate one with `openssl rand -hex 32`)
  - `STRIPE_*` keys
  - `GOOGLE_*` keys for social login
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` from your Sanity.io project

### 4. Set Up the Database

- Start the PostgreSQL database using Docker:
  ```bash
  docker run --name scent-db -e POSTGRES_USER=scent_user -e POSTGRES_PASSWORD=StrongPass1234 -e POSTGRES_DB=scent_db -p 5432:5432 -d postgres:16
  ```
- **Reset the database to a clean slate**, apply all migrations, and run the seed script with one command:
  ```bash
  pnpm prisma migrate reset
  ```
  *(Confirm the prompts when asked.)*

### 5. Start the Development Server

```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Testing & Quality Assurance

- **Unit Tests:** Run with `pnpm test`.
- **End-to-End Tests:** Run with `pnpm test:e2e`. Requires a running development server.
- **Linting:** Run with `pnpm lint`.
- **Bundle Analysis:** Run `pnpm analyze` and open the generated `.html` files to inspect bundle sizes.

---

## License

This project is licensed under the [MIT License](LICENSE).
