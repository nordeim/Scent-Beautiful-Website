This "Sidetrack Execution Plan" is a focused effort to build the proper foundation. It addresses all configuration, database, and backend service deficiencies I identified. Upon its completion, the project will have a robust, tested, and secure foundation, ready for the UI development outlined in Phase 4.

---

### **Sidetrack Execution Plan: Aligning the Codebase Foundation**

**Objective:** To systematically refactor and complete the foundational layers of "The Scent" codebase, aligning it with the project's architecture and the end-state of Phase 3 of the main execution plan.

---

### **Phase A: Project Configuration & Dependency Alignment**

**Goal:** Establish the correct development environment, tooling, and dependencies required for a production-quality workflow, including testing.

| Checklist | File / Action | Rationale & Details |
| :--- | :--- | :--- |
| **[ ]** | **Update `package.json`** | **Action:** Add all necessary testing and state management dependencies. Also, add scripts for running tests. <br/> **Rationale:** The current file is missing the entire toolchain for quality assurance and global state management, which is a core part of the architecture. |
| **[ ]** | **Update `tsconfig.json`** | **Action:** Add the detailed path aliases from the architecture document. <br/> **Rationale:** Enforces the project's modular structure, improves import clarity, and prevents deep relative import paths (`../../...`). |
| **[ ]** | **Create `jest.config.js`** | **Action:** Create this new file at the project root to configure the Jest testing framework. <br/> **Rationale:** This file is required to define the test environment, setup files, and coverage reporting for all unit and integration tests. |
| **[ ]** | **Create `tests/setup/jest.setup.ts`** | **Action:** Create this new file to import `jest-dom` matchers. <br/> **Rationale:** Provides Jest with extended DOM-related assertions (e.g., `.toBeInTheDocument()`), which are essential for testing React components. |
| **[ ]** | **Install New Dependencies** | **Action:** Run `pnpm install` after modifying `package.json`. <br/> **Rationale:** Fetches and installs all the newly added packages into `node_modules`. |

---

### **Phase B: Database Schema & Data Integrity**

**Goal:** Implement the complete, production-grade database schema as the single source of truth for the application's data model. This is the most critical phase of the remediation plan.

| Checklist | File / Action | Rationale & Details |
| :--- | :--- | :--- |
| **[ ]** | **Overhaul `prisma/schema.prisma`** | **Action:** **Completely replace** the contents of the existing file with the comprehensive schema defined in the `Project_Architecture_Document.md`. <br/> **Rationale:** The current schema is a non-functional stub. The full schema is required with all models, fields, relations (especially `ProductVariant`), correct data types (`Decimal` for money), indexes, and cascade rules to ensure data integrity and application functionality. |
| **[ ]** | **Update `prisma/seed.ts`** | **Action:** Update the seed script to align with the new, more complex schema. For example, creating a `Product` now requires creating associated `ProductVariant`s. <br/> **Rationale:** The existing seed script will fail against the new schema. It must be updated to create valid, interconnected data. |
| **[ ]** | **Generate New Database Migration** | **Action:** Delete the existing `prisma/migrations` directory (if any exists from development) and generate a clean initial migration. Run `pnpm prisma migrate dev --name "initial-detailed-schema"`. <br/> **Rationale:** This command creates a new, authoritative migration file based on the updated schema, ready for deployment. |
| **[ ]** | **Apply Migration to Database** | **Action:** Run `pnpm prisma migrate deploy` to apply the newly generated migration to your development database. <br/> **Rationale:** This synchronizes the database structure with the `schema.prisma` file, creating all tables and columns. |
| **[ ]** | **Seed the Database** | **Action:** Run `pnpm prisma db seed`. <br/> **Rationale:** Populates the newly structured database with the updated seed data, making the application usable for development. |

---

### **Phase C: Backend Services & API Layer Refactoring**

**Goal:** Refactor the core API and authentication handlers for compatibility and robustness, and structure the API routers to handle real business logic.

| Checklist | File / Action | Rationale & Details |
| :--- | :--- | :--- |
| **[ ]** | **Refactor `app/api/trpc/[trpc]/route.ts`** | **Action:** Update the tRPC handler to use the `fetchRequestHandler` suitable for the Next.js App Router. <br/> **Rationale:** The existing `createNextApiHandler` is for the legacy Pages Router. This change is mandatory for the API to function correctly. |
| **[ ]** | **Refactor `lib/auth/config.ts`** | **Action:** Update the `callbacks` object to use the `jwt` and `session` strategy to correctly persist custom user data (`id`, `role`) in the session token. <br/> **Rationale:** This is the standard, secure pattern for making custom user data available to both server and client components and is essential for the RBAC system. |
| **[ ]** | **Update `server/routers/product.ts`** | **Action:** Enhance the router with Zod input validation, proper procedure types (`public`, `protected`), and the basic structure for complex queries. <br/> **Rationale:** This transforms the router from a non-functional stub into a well-structured entry point for business logic, serving as a template for other routers. |
| **[ ]** | **Update Other Routers (`cart.ts`, `order.ts`, `user.ts`)** | **Action:** Apply a similar structural update to the other routers, defining their core procedures and input schemas. <br/> **Rationale:** Ensures all API modules are consistently structured and ready for full implementation. |

---

### **Phase D: Foundational Frontend & State Management Setup**

**Goal:** Establish the client-side architectural pillars, including global state and a functional authentication provider, to prepare for UI development.

| Checklist | File / Action | Rationale & Details |
| :--- | :--- | :--- |
| **[ ]** | **Create `store/ui.store.ts`** | **Action:** Create this new file and implement the initial Zustand store for managing global UI state like the theme. <br/> **Rationale:** Fulfills a key architectural decision and provides a centralized place for managing non-server state, as per the execution plan. |
| **[ ]** | **Refactor `components/providers/AuthProvider.tsx`** | **Action:** Replace the stub component with a functional `SessionProvider` from `next-auth/react`. <br/> **Rationale:** The current provider is a placeholder. Using the official `SessionProvider` is the correct way to make session data available to client components throughout the app. |
| **[ ]** | **Update `app/layout.tsx`** | **Action:** Wrap the `children` in the new, functional `AuthProvider`. Update the `<meta>` tags with the proper title and description from the PRD. <br/> **Rationale:** This makes authentication context globally available and corrects the placeholder metadata, improving SEO and brand identity. |
| **[ ]** | **Update `app/page.tsx`** | **Action:** Remove the default Next.js starter content and replace it with a simple, clean placeholder that reflects "The Scent" project, including a theme toggle button to test the `ThemeProvider`. <br/> **Rationale:** Provides a clean slate for homepage development and allows for immediate validation of the theme system. |

---

### **Phase E: Final Validation & Integration Testing**

**Goal:** Verify that all foundational layers are correctly integrated and working together by writing the first integration test.

| Checklist | File / Action | Rationale & Details |
| :--- | :--- | :--- |
| **[ ]** | **Create Initial Integration Test** | **Action:** Create a new test file, e.g., `tests/integration/product-api.test.ts`, and write a test that calls the `productRouter.list` procedure. <br/> **Rationale:** This is the ultimate validation. A passing test proves that the tRPC handler, router, Prisma client, and database connection are all functioning correctly as an integrated system. |
| **[ ]** | **Full Codebase Lint & Format** | **Action:** Run `pnpm lint --fix` and `pnpm prettier --write .`. <br/> **Rationale:** Ensures all new and modified code adheres to the project's quality standards before concluding the remediation phase. |

***

Upon completion of this sidetrack plan, the codebase will be stable, architecturally sound, and fully prepared for the commencement of **Phase 4: UI Component Library** development.
