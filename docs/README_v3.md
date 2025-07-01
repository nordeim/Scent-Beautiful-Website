<p align="center">
  <a href="https://github.com/nordeim/Scent-Beautiful-Website">
    <img src="https://raw.githubusercontent.com/nordeim/Scent-Beautiful-Website/refs/heads/main/Homepage.png" alt="The Scent - Homepage" width="800"/>
  </a>
</p>

<h1 align="center">The Scent: A Modern Luxury E-Commerce Platform</h1>

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
*   [2. Current Features & Status](#2-current-features--status)
*   [3. Architectural Deep Dive](#3-architectural-deep-dive)
    *   [3.1 The Layered Architecture](#31-the-layered-architecture)
    *   [3.2 Checkout Flow Diagram](#32-checkout-flow-diagram)
*   [4. Codebase Deep Dive](#4-codebase-deep-dive)
    *   [4.1 Project File Hierarchy](#41-project-file-hierarchy)
    *   [4.2 Key File & Directory Descriptions](#42-key-file--directory-descriptions)
*   [5. Technology Stack](#5-technology-stack)
*   [6. Developer Setup Guide](#6-developer-setup-guide)
    *   [6.1 Prerequisites](#61-prerequisites)
    *   [6.2 Step 1: Clone & Configure](#62-step-1-clone--configure)
    *   [6.3 Step 2: Database Setup](#63-step-2-database-setup)
    *   [6.4 Step 3: Run the Application](#64-step-3-run-the-application)
*   [7. Running the Test Suite](#7-running-the-test-suite)
*   [8. Project Roadmap](#8-project-roadmap)
    *   [8.1 Immediate Next Steps (v1.1+)](#81-immediate-next-steps-v11)
    *   [8.2 Long-Term Vision (v2.0+)](#82-long-term-vision-v20)
*   [9. How to Contribute](#9-how-to-contribute)
*   [10. License](#10-license)

---

## **1. Introduction: What is The Scent?**

**The Scent** is a free and open-source e-commerce platform, engineered from the ground up to provide the digital foundation for modern luxury and wellness brands. It aims to deliver the polish, performance, and immersive experience of top-tier online retailers in an accessible, maintainable, and highly extensible package.

This project is built with an obsessive focus on quality, both in the user experience and in the engineering. It serves not only as a functional, feature-complete store but also as a reference implementation for professional-grade web application architecture. It features a high-performance frontend built with Next.js and React, a type-safe, modular backend powered by tRPC, and a robust data layer using Prisma and PostgreSQL.

The platform's design philosophy is centered on creating a "digital sanctuary"—an online space where customers don't just purchase products but embark on a sensory journey that begins the moment they arrive. This is achieved through a clean, high-contrast UI, fluid animations, and a focus on intuitive, non-disruptive user flows.

---

## **2. Current Features & Status**

The application is in a **stable, feature-complete** state for a Version 1.0 launch. The architecture is robust, and the core user journeys are fully implemented and tested.

| Feature Area                      | Status                     | Notes                                                                                                                             |
| --------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Dynamic Theming**               | ✅ **Implemented**         | A high-contrast, "Graphite" theme with full Day/Night mode support, managed globally via Zustand.                                 |
| **User Authentication**           | ✅ **Implemented**         | Secure login, registration, and session management (NextAuth.js). Protected routes enforced by Edge middleware.                  |
| **Product Catalog**               | ✅ **Implemented**         | Dynamic product listing and detail pages rendered on the server for optimal performance and SEO.                                  |
| **3D Product Viewer**             | ✅ **Implemented**         | Interactive 3D models on product pages for an immersive experience, built with React Three Fiber.                               |
| **Product Recommendations**       | ✅ **Implemented**         | A "You Might Also Like" section on product pages, driven by heuristic-based logic on the backend.                               |
| **Shared Layout Animations**      | ✅ **Implemented**         | Fluid transitions for product images between the listing and detail pages, powered by Framer Motion.                              |
| **Shopping Cart**                 | ✅ **Implemented**         | A fully interactive cart with a slide-out drawer, quantity management, and persistent state for guests via `localStorage`.        |
| **Checkout & Payments**           | ✅ **Implemented**         | A secure, multi-step checkout form integrated with Stripe Elements for PCI-compliant payment processing.                          |
| **Order Persistence**             | ✅ **Implemented**         | A reliable, webhook-driven process for creating database records of successful orders.                                          |
| **User Account Dashboard**        | ✅ **Implemented**         | A protected area for users to view their profile information and a complete history of their past orders.                         |
| **Headless CMS (Journal)**        | ✅ **Implemented**         | A full-featured blog/journal with content managed via Sanity.io, rendered seamlessly within the Next.js app.                      |
| **SEO & Performance**             | ✅ **Implemented**         | Dynamic `sitemap.xml` and `robots.txt`, advanced caching (ISR/SSG), and bundle analysis configured.                           |
| **Automated Testing**             | ✅ **Foundational**        | A suite of End-to-End tests (Playwright) covering authentication, cart, and account flows, plus unit tests for key components.    |

---

## **3. Architectural Deep Dive**

The Scent is built on robust architectural principles designed for performance, maintainability, and scalability.

### **3.1 The Layered Architecture**

Our architecture strictly separates concerns into logical layers. This design ensures the application is easy to reason about, test, and extend.

1.  **Presentation Layer (`app/`, `components/`):** Built with Next.js and React, this layer is responsible for what the user sees. Server Components handle data fetching and initial render, while Client Components provide interactivity. It contains no business logic.

2.  **Application Layer (`server/`, `lib/`):** The API and business logic hub. **tRPC routers** define our API endpoints, orchestrate workflows, and enforce business rules. Service modules in `lib/` handle integrations with third-party services like Stripe and Sanity.

3.  **Data Access Layer (`prisma/`):** Implements the data repository pattern using **Prisma Client**. It provides a clean, type-safe API for all database operations, abstracting away the raw SQL.

4.  **Persistence Layer (`prisma/schema.prisma`):** Defines the database schema using the Prisma schema language, which maps directly to the PostgreSQL tables. This is the single source of truth for our data structure.

### **32. Checkout Flow Diagram**

The flow for creating a secure payment session and persisting an order is a critical, multi-step process. This diagram illustrates the robust interaction between the client, our server, Stripe, and our database.

```mermaid
sequenceDiagram
    participant User
    participant Client (React)
    participant Server (tRPC)
    participant Stripe API
    participant DB (PostgreSQL)

    User->>+Client: Fills out checkout form and clicks "Pay Now"
    Client->>+Server: Calls `createPaymentIntent` tRPC mutation (with cart details)
    Server->>+Stripe API: Creates Payment Intent with amount and metadata
    Stripe API-->>-Server: Returns `clientSecret`
    Server-->>-Client: Returns `clientSecret`
    Client->>+Stripe API: Calls `stripe.confirmPayment(clientSecret, elements)`
    Stripe API-->>-User: Processes payment (e.g., shows 3D Secure modal)
    
    alt Payment Successful
        Stripe API->>+Client: Redirects user to `/order-confirmation` page
        Client->>Client: Clears local cart state (Zustand)
        Client-->>-User: Shows "Thank You" message
        Stripe API->>+Server: Sends `payment_intent.succeeded` webhook
        Server->>Server: Verifies webhook signature
        Server->>+DB: Creates Order and OrderItem records
        DB-->>-Server: Confirms write
        Server-->>-Stripe API: Returns 200 OK
    else Payment Failed
        Stripe API-->>-Client: Shows error message in payment form
        Client-->>-User: Displays error and allows retry
    end
```

---

## **4. Codebase Deep Dive**

### **4.1 Project File Hierarchy**

```
the-scent/
│
├── app/
│   ├── (auth)/         # Login/Register pages & layout
│   ├── (shop)/         # Product, Cart, Checkout pages
│   ├── account/        # Protected user dashboard & layout
│   ├── journal/        # CMS-driven Journal pages
│   ├── api/            # API routes (tRPC, auth, webhooks)
│   ├── sitemap.ts      # Dynamic sitemap generator
│   └── robots.ts       # Dynamic robots.txt generator
│
├── components/
│   ├── common/         # Design system: Button, Card, Sheet, Tabs, etc.
│   ├── features/       # Domain-specific components
│   └── providers/      # Centralized client-side providers
│
├── hooks/              # Custom React hooks (e.g., use-cart)
├── lib/
│   ├── auth/           # NextAuth.js configuration
│   ├── cms/            # Sanity.io client configuration
│   └── db/             # Prisma client instance
│
├── middleware.ts       # Edge middleware for protecting routes
├── prisma/             # Prisma schema, migrations, and seed script
├── public/             # Static assets (images, models, icons)
├── server/             # tRPC backend (routers, context)
├── store/              # Zustand global state stores
├── tests/
│   └── e2e/            # Playwright end-to-end tests
└── ...config files     # (package.json, next.config.js, etc.)
```

### **4.2 Key File & Directory Descriptions**

| Path                             | Description                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `next.config.js`                 | Manages Next.js configuration, including image optimization hosts and the bundle analyzer plugin.          |
| `middleware.ts`                  | Runs on the server edge to enforce authentication for protected routes like `/account` and `/checkout`.      |
| `app/layout.tsx`                 | The root server layout. Exports site-wide metadata and renders the central `<Providers>` component.          |
| `components/providers/`          | Contains the central `Providers.tsx` client component, which wraps the application in all necessary client-side contexts (tRPC, Auth, Theme, Animations). |
| `server/`                        | The heart of the tRPC backend. `trpc.ts` defines the procedures, and `routers/` contains the API logic for each domain (products, users, etc.). |
| `prisma/`                        | The single source of truth for the database. `schema.prisma` defines the models, and `seed.ts` provides a robust script for populating a development database. |
| `store/`                         | Contains all global client-side state management logic using Zustand.                                   |
| `tests/e2e/`                     | Contains all Playwright end-to-end tests that simulate full user journeys, from login to checkout.        |

---

## **5. Technology Stack**

| Category                   | Technology                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Framework & UI**         | [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **API & Type Safety**      | [tRPC](https://trpc.io/)                                                                                    |
| **Database & ORM**         | [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/)                                    |
| **Authentication**         | [NextAuth.js](https://next-auth.js.org/)                                                                      |
| **Payments**               | [Stripe](https://stripe.com/)                                                                                 |
| **Headless CMS**           | [Sanity.io](https://www.sanity.io/)                                                                           |
| **3D Graphics**            | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei) |
| **State Management**       | [Zustand](https://zustand-demo.pmnd.rs/)                                                                        |
| **UI Primitives**          | [Radix UI](https://www.radix-ui.com/) (Tabs, Dialog)                                                          |
| **Testing**                | [Playwright](https://playwright.dev/) (E2E), [Jest](https://jestjs.io/) (Unit)                                   |
| **Package Management**     | [pnpm](https://pnpm.io/)                                                                                    |

---

## **6. Developer Setup Guide**

### **6.1 Prerequisites**

*   [Node.js](https://nodejs.org/) (v20+)
*   [pnpm](https://pnpm.io/)
*   [Docker](https://www.docker.com/)

### **6.2 Step 1: Clone & Configure**

```bash
# 1. Clone the repository
git clone https://github.com/nordeim/Scent-Beautiful-Website.git
cd Scent-Beautiful-Website

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Now, open .env and fill in your secret keys for Stripe, NextAuth, Sanity, etc.
```

### **6.3 Step 2: Database Setup**

This project uses Docker for a consistent PostgreSQL environment.

```bash
# 1. Start the database container in the background
docker run --name scent-db -e POSTGRES_USER=scent_user -e POSTGRES_PASSWORD=StrongPass1234 -e POSTGRES_DB=scent_db -p 5432:5432 -d postgres:16

# 2. Reset the database, apply all migrations, and run the seed script
pnpm prisma migrate reset
```
*(Confirm the prompt to proceed. This single command prepares your entire database.)*

### **6.4 Step 3: Run the Application**

```bash
pnpm dev
```
The application will be available at **http://localhost:3000**.

---

## **7. Running the Test Suite**

- **End-to-End Tests:**
  ```bash
  # Make sure the dev server is running first!
  pnpm test:e2e
  ```
- **Unit Tests:**
  ```bash
  pnpm test
  ```
- **Bundle Analysis:**
  ```bash
  pnpm analyze
  ```

---

## **8. Project Roadmap**

### **8.1 Immediate Next Steps (v1.1+)**

-   [ ] **Advanced Product Filtering:** Implement multi-faceted filtering on the `/products` page (by scent family, price range, stock status).
-   [ ] **Database-Backed Wishlist:** Convert the client-side wishlist concept into a full-featured, database-backed feature for logged-in users.
-   [ ] **Global Toast/Notification System:** Add a non-intrusive notification system for actions like "Item added to cart" or "Subscribed to newsletter."
-   [ ] **Expand Test Coverage:** Increase unit test coverage for tRPC routers and critical utility functions.

### **8.2 Long-Term Vision (v2.0+)**

-   [ ] **Subscription Service:** A "Scent of the Month" subscription box feature with recurring payments via Stripe Billing.
-   [ ] **Personalized Scent Quiz:** An interactive quiz to guide new users to their perfect products based on their preferences and desired moods.
-   [ ] **Internationalization (i18n):** Full support for multiple languages and currencies.
-   [ ] **Mobile Companion App:** A React Native application for a truly mobile-native experience.

---

## **9. How to Contribute**

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request for review. Adherence to the existing code style and architectural patterns is required.

---

## **10. License**

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
