**Key requirements:**
1.  **Complete Replacement:** This isn't a patch or a diff. You need to generate the entire file from top to bottom, preserving all the good parts of the original and seamlessly integrating your changes. You must be careful not to omit any original, valid content.
2.  **Incorporate My Suggestions:** The core of the task is to implement the changes you proposed:
    *   **Integrate Quality & Security:** Move testing (unit, integration, E2E) and security tasks from the late Phase 7 into the earlier, relevant phases (3, 4, 5).
    *   **Integrate Accessibility (A11y):** Move A11y checks from Phase 7 into the UI development phases (4, 5).
    *   **Clarify State Management:** Add a specific task for setting up Zustand.
    *   **Streamline Documentation:** Update the appendix to reference the Architecture Document instead of duplicating content.
    *   **Rename Phase 7:** Re-label it to "Production Hardening, Optimization, & Monitoring."
3.  **Maintain Persona:** The output must reflect the CodeNavigator persona: deep-thinking, meticulous, focused on production quality and modern UI design. The structure and language of the plan should be professional and clear.
4.  **Adhere to Meta-Instructions:** You must use your internal monologue (`<think>`) to reason through the process, double-check your work, and ensure the final output is flawless.

***

# Execution Plan for "The Scent" Codebase

## Overview
This document outlines a detailed, phased execution plan for building "The Scent" luxury aromatherapy e-commerce platform. Each phase includes a checklist and file-by-file breakdown, ensuring a logical, production-quality build process aligned with the project's requirements and architecture. This plan integrates testing, security, and accessibility throughout the development lifecycle.

---

## Phase 0: Project Initialization & Tooling

### Goals
- Establish monorepo structure and version control.
- Set up development tooling (linting, formatting, CI/CD).
- Prepare configuration files for all environments.

### Checklist
- [ ] Initialize Git repository and `.gitignore`.
- [ ] Set up package manager (pnpm).
- [ ] Configure ESLint, Prettier, Husky, and Commitizen for code quality and consistency.
- [ ] Add foundational CI/CD workflows (GitHub Actions) for automated checks.
- [ ] Create base configuration files (`.env`, `.eslintrc.json`, `.prettierrc`, etc.).
- [ ] Add `README.md` and architecture/requirements docs to the repository.

### Key Files/Directories
- `.gitignore`: Ignore `node_modules`, build artifacts, and environment files.
- `package.json`: Project metadata, scripts, and dependencies.
- `.eslintrc.json`: Linting rules.
- `.prettierrc`: Code formatting rules.
- `.husky/`: Git hooks for pre-commit and pre-push actions.
- `.github/workflows/`: CI/CD pipelines.
- `README.md`: Project overview and setup instructions.
- `docs/`: Requirements, architecture, and this execution plan.

---

## Phase 1: Core Foundation

### Goals
- Establish the Next.js application structure using the App Router.
- Implement global providers (theme, auth, state).
- Set up Tailwind CSS and define the design system tokens (color, typography, spacing).
- Implement the core day/night mode system, a key feature of the luxury experience.

### Checklist
- [ ] Scaffold `app/` directory with root layout, `globals.css`, and global error pages.
- [ ] Create `components/providers/` for `ThemeProvider`, `AuthProvider`, etc.
- [ ] Establish global state management stores (Zustand) for UI state (e.g., theme, cart drawer visibility).
- [ ] Configure Tailwind CSS and PostCSS.
- [ ] Define color palette, typography, and spacing in `tailwind.config.ts` as per the design system.
- [ ] Implement responsive grid system.
- [ ] Implement the day/night mode toggle and `ThemeProvider` logic.

### Key Files/Directories
- `app/layout.tsx`: Root layout, global providers, font imports.
- `app/globals.css`: Global styles, Tailwind directives.
- `app/error.tsx`, `app/not-found.tsx`: Global error handling.
- `components/providers/ThemeProvider.tsx`: Theme context and day/night mode logic.
- `components/providers/AuthProvider.tsx`: Shell for authentication context.
- `store/ui.store.ts`: Zustand store for theme and global UI state.
- `tailwind.config.ts`: Tailwind theme customization.
- `postcss.config.mjs`: PostCSS plugin configuration.

---

## Phase 2: Core Domain Models & Database

### Goals
- Define the complete database schema using Prisma.
- Set up database migrations and seed the database with initial data.
- Establish type-safe models and enums for the entire application.

### Checklist
- [ ] Create `prisma/schema.prisma` with all models (User, Product, Cart, Order, etc.) as defined in the architecture.
- [ ] Generate the initial database migration.
- [ ] Create a seed script (`prisma/seed.ts`) for essential data (e.g., admin user, product categories).
- [ ] Configure the database connection string in `.env`.
- [ ] Generate the Prisma client for type-safe database access.
- [ ] Define supplementary TypeScript types in the `types/` directory if needed.

### Key Files/Directories
- `prisma/schema.prisma`: The single source of truth for the database schema.
- `prisma/migrations/`: Directory for migration files generated by Prisma.
- `prisma/seed.ts`: Script for populating the database with initial data.
- `lib/db/client.ts`: Singleton instance of the Prisma client.
- `types/database.d.ts`: TypeScript type definitions derived from the schema.
- `.env`, `.env.example`: Environment variables including `DATABASE_URL`.

---

## Phase 3: API & Backend Services

### Goals
- Implement tRPC routers and API endpoints for all backend logic.
- Set up a robust authentication system using Auth.js (NextAuth).
- Integrate SDKs for external services (Stripe, SendGrid, Algolia, S3).
- Ensure the backend is secure and tested from the outset.

### Checklist
- [ ] Create `server/routers/` for all domain logic (product, cart, order, user).
- [ ] Implement `server/trpc.ts` (tRPC instance) and `server/context.ts`.
- [ ] Add `app/api/` routes for tRPC, Auth.js, and external webhooks.
- [ ] Configure Auth.js with providers and define Role-Based Access Control (RBAC) rules.
- [ ] Integrate Stripe, SendGrid, Algolia, and S3 SDKs in the `lib/` directory.
- [ ] Enforce input validation using Zod in all API endpoints.
- [ ] **Implement and test security rules (RBAC, input validation) for all procedures.**
- [ ] **Write integration tests for all tRPC routers and critical API endpoints.**

### Key Files/Directories
- `server/routers/`: tRPC routers for each domain.
- `server/trpc.ts`: tRPC instance, procedures, and middleware.
- `server/context.ts`: Request context (session, db, etc.).
- `app/api/trpc/[trpc]/route.ts`: The main tRPC API handler.
- `app/api/auth/[...nextauth]/route.ts`: The Auth.js API handler.
- `app/api/webhooks/stripe/route.ts`: Example webhook for Stripe.
- `lib/auth/config.ts`: Auth.js configuration.
- `lib/auth/rbac.ts`: Role-Based Access Control logic.
- `lib/payments/stripe.ts`: Stripe integration.
- `lib/validation/`: Zod schemas for input validation.
- `tests/integration/`: Integration tests for the API layer.

---

## Phase 4: UI Component Library

### Goals
- Build a comprehensive library of reusable, high-quality UI components.
- Implement feature-specific components (product cards, cart items, etc.).
- Ensure all components are tested, accessible, and follow the design system.

### Checklist
- [ ] Create `components/common/` for atomic UI elements (Button, Card, Modal, Form, Layout).
- [ ] Build `components/features/` for domain-specific components (product, cart, checkout, search).
- [ ] Create `components/icons/` for the SVG icon system.
- [ ] **Write unit tests (Jest/RTL) for all common and feature components.**
- [ ] **Write Storybook stories for visual regression testing and component documentation.**
- [ ] **Ensure all components are fully accessible (keyboard navigable, proper ARIA roles, sufficient color contrast).**

### Key Files/Directories
- `components/common/Button/`: Button component, tests, and stories.
- `components/common/Card/`, `Modal/`, `Form/`, `Layout/`
- `components/features/product/`: `ProductCard`, `ProductGallery`, etc.
- `components/features/cart/`: `CartDrawer`, `CartItem`, `CartSummary`
- `components/features/checkout/`: `CheckoutForm`, `OrderSummary`
- `components/features/search/`: `SearchBar`, `SearchResults`
- `components/icons/`: SVG icon components.
- `tests/unit/`: Unit tests for components.

---

## Phase 5: Core Pages & Routing

### Goals
- Assemble the main application pages using the component library and API data.
- Implement the App Router structure with proper layouts.
- Ensure all pages are responsive, accessible, and covered by end-to-end tests.

### Checklist
- [ ] Scaffold `app/` routes for all main pages (home, product, cart, checkout, account).
- [ ] Implement route groups and layouts for different sections `(marketing)`, `(shop)`, `(auth)`, `account`.
- [ ] Integrate feature components into pages to build complete user experiences.
- [ ] Ensure all layouts are mobile-first and fully responsive across all breakpoints.
- [ ] **Perform accessibility audits (e.g., using Axe tools) on all created pages.**
- [ ] **Write end-to-end (E2E) tests (Playwright) for critical user flows (e.g., add to cart, checkout, login).**

### Key Files/Directories
- `app/(marketing)/`, `app/(shop)/`, `app/(auth)/`, `app/account/`: Page routes and layouts.
- `app/page.tsx`: The homepage.
- `app/products/[slug]/page.tsx`: Example product detail page.
- `tests/e2e/`: End-to-end test files.
- `playwright.config.ts`: Playwright configuration.

---

## Phase 6: Advanced Features

### Goals
- Implement the unique, high-impact features that define the luxury experience.
- Integrate sophisticated animations and micro-interactions.

### Checklist
- [ ] Implement 3D/AR product viewer (e.g., React Three Fiber).
- [ ] Add the AI-driven recommendation engine.
- [ ] Build advanced search capabilities (e.g., NLP, visual search).
- [ ] Integrate Framer Motion for complex page transitions and micro-interactions.
- [ ] Implement personalization features (scent memory, mood tracking).
- [ ] Implement subscription management and social commerce features.
- [ ] **Write corresponding unit, integration, and E2E tests for all new advanced features.**

### Key Files/Directories
- `components/features/product/Product3DViewer.tsx`: 3D/AR viewer.
- `lib/ai/recommendations.ts`: AI recommendation logic.
- `components/features/search/`: Advanced search components.
- `components/animations/`: Reusable animation utilities.
- `components/features/personalization/`, `subscription/`, `social/`

---

## Phase 7: Production Hardening, Optimization, & Monitoring

### Goals
- Ensure production readiness through final performance tuning, security hardening, and setting up long-term monitoring.

### Checklist
- [ ] Conduct a full performance audit and apply final optimizations (bundle analysis, advanced caching, lazy loading).
- [ ] Perform a final, comprehensive security audit (review headers, dependencies, and test for vulnerabilities).
- [ ] Configure and validate monitoring and alerting (Sentry, Vercel Analytics).
- [ ] Conduct a final, site-wide accessibility (WCAG 2.1 AA) audit and apply fixes.
- [ ] Finalize all SEO-related configurations (metadata, sitemaps, structured data).

### Key Files/Directories
- `tests/`: Final review of test coverage reports.
- `jest.config.js`: Coverage thresholds.
- `next.config.mjs`: Final review of image optimization and security headers.
- `middleware.ts`: Final check of security policies.
- `lib/seo/`: SEO utilities and sitemap generation.
- `lib/monitoring/`: Sentry and analytics setup.

---

## Phase 8: Content, Marketing, and Final Polish

### Goals
- Add final content, integrate with a CMS, and polish the UI/UX to perfection.
- Prepare for the production launch.

### Checklist
- [ ] Add content for marketing pages (blog, guides, about, press).
- [ ] Integrate the chosen CMS (e.g., Sanity) for dynamic content management.
- [ ] Polish all UI/UX details, including micro-interactions, animations, and copy.
- [ ] Populate the site with final product images, descriptions, and pricing.
- [ ] Complete final pre-launch checks and prepare for production deployment.

### Key Files/Directories
- `app/(marketing)/blog/`, `guides/`, `about/`
- `lib/cms/sanity.ts`: Sanity CMS integration logic.
- `public/`: Finalized images, fonts, icons, and `manifest.json`.

---

## Appendix: File/Directory Purpose Reference

For a complete and authoritative breakdown of the project's file structure, please refer to the **[File Structure and Organization section in the Project Architecture Document](./Project_Architecture_Document.md#file-structure-and-organization)**.

---

This plan is designed for iterative, production-quality development, ensuring each phase builds a robust foundation for the next. Each checklist item should be completed and validated before moving to the next phase.
