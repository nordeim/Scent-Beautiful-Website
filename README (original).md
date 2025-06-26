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
