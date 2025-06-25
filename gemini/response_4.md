<think>
### **1. Deconstruct the User's Request**

The user wants a "sidetrack execution plan." This is a micro-plan focused solely on bringing the *current, partially completed codebase* up to the standard of the *end of Phase 3* of my improved execution plan.

This means I need to create a new, standalone document that details the necessary modifications to the existing files. It's not about new features, but about **remediation and alignment**.

**Key requirements for this sidetrack plan:**
1.  **Separate & Detailed:** It must be a distinct plan, not just a list of changes. It should be structured like a mini execution plan.
2.  **Integrated Checklist:** Each step and file modification must have a corresponding checklist item `[ ]`.
3.  **Logical Ordering:** The plan should list the modifications in a logical order of dependency. For example, `package.json` changes must come before code that uses new dependencies. The database schema must be fixed before the API that queries it.
4.  **Cover All Necessary Changes:** It must address all the deficiencies I identified in my previous analysis:
    *   `package.json` updates.
    *   `tsconfig.json` path aliases.
    *   The complete overhaul of `prisma/schema.prisma`.
    *   Refactoring the tRPC handler (`app/api/trpc/[trpc]/route.ts`).
    *   Improving the NextAuth configuration (`lib/auth/config.ts`).
    *   Defining the initial scope for building out the placeholder tRPC routers.
    *   Adding the missing testing infrastructure configuration files (`jest.config.js`, etc.).
    *   Creating the `store/` directory and the initial Zustand store.
5.  **Target State:** The goal is to complete all tasks up to and including Phase 3 of the main execution plan. This means after this sidetrack plan is complete, the project will be ready to begin Phase 4 (UI Component Library) on a solid foundation.
6.  **Maintain Persona:** The output should be professional, meticulous, and clearly communicate the "what" and the "why" for each change, upholding the CodeNavigator persona.

### **2. Internal Execution Plan for Generating the Sidetrack Plan**

I will structure the sidetrack plan into logical phases that mirror the dependency flow. This isn't about features, but about foundational layers.

**Phase A: Project Configuration & Dependencies**
This phase will tackle all the root-level configuration files. You can't write code correctly without the right tooling and environment setup.
1.  **`package.json`:** Add testing and state management dependencies. Add test scripts.
2.  **`tsconfig.json`:** Add path aliases.
3.  **New Files:** Create `jest.config.js` and a `tests/setup/jest.setup.ts` file. This is crucial for making the testing infrastructure real.

**Phase B: Database & Data Modeling**
This is the absolute bedrock. Everything else depends on a correct data model.
1.  **`prisma/schema.prisma`:** This is the most critical step. I will detail that the file needs a complete replacement with the version from the architecture document. I'll break down the high-level changes required (adding models, correcting types, adding relations, etc.) to make the task clear.
2.  **Database Migration:** Detail the commands needed to create and apply a new migration (`pnpm prisma migrate dev ...` and `pnpm prisma db push` for validation, then `pnpm prisma migrate deploy` for the real thing).
3.  **`prisma/seed.ts`:** Update the seed script to align with the new, more complex schema. It can't seed `Product` without `ProductVariant`, for example.

**Phase C: Backend Services & API Layer**
With the database model in place, I can now fix the backend logic that interacts with it.
1.  **`app/api/trpc/[trpc]/route.ts`:** Refactor the tRPC handler to be App Router-compatible.
2.  **`lib/auth/config.ts`:** Fix the NextAuth callbacks.
3.  **`server/routers/*.ts`:** This is a bigger task. The plan won't be to *fully implement* them, but to bring them to a "Phase 3 complete" state. This means:
    *   Defining the correct input schemas (Zod) for the main procedures (`list`, `byId`, `create`, etc.).
    *   Implementing the basic query logic (even if filtering is a TODO).
    *   Applying the correct `publicProcedure` vs. `protectedProcedure` based on RBAC rules.
    *   I'll detail this for one router (e.g., `product.ts`) as a template for the others.
4.  **`server/routers/index.ts`:** Ensure the `appRouter` correctly merges all the individual routers. This file is simple but crucial.

**Phase D: Foundational Frontend & State Management**
This phase bridges the gap to the upcoming UI work.
1.  **Create `store/` directory:** Create the `store/` directory.
2.  **Create `store/ui.store.ts`:** Provide the initial code for the Zustand store to manage UI state like theme and modal visibility. This directly fulfills a checklist item from my improved plan.
3.  **`app/layout.tsx`:** Update the root layout to use the full metadata from the architecture doc and to wrap the application in any new providers (like a potential future CartProvider that would use Zustand). I'll also update the title and description from the placeholder "Create Next App".
4.  **`components/providers/AuthProvider.tsx`:** Update the stub `AuthProvider` to be a real, functional provider that fetches the session, as detailed in the architecture document. This is critical for any authenticated UI.

**Phase E: Final Validation & Integration Testing**
This is the quality gate for the sidetrack plan.
1.  **Create `tests/integration/` directory:** Create the directory.
2.  **Write Initial API Test:** Write a sample integration test for one of the newly structured tRPC endpoints (e.g., `product.list`) to prove that the entire stack (tRPC handler -> router -> Prisma client -> DB) is working correctly. This validates the success of the previous phases.
3.  **Full Code Lint & Format:** Run `pnpm lint --fix` and `pnpm prettier --write .` to ensure all new and modified code adheres to standards.

### **3. Content Generation & Refinement**

For each phase in the sidetrack plan, I will:
*   State a clear **Goal**.
*   Provide a **Step-by-Step Checklist**.
*   For each checklist item that involves code modification, I will:
    *   Specify the **File Path**.
    *   Provide a clear **Action** to be taken.
    *   Include a **Rationale** explaining *why* the change is necessary.
    *   Provide a **Code Snippet** (often a `diff` or a complete replacement) showing the exact change.

I'll write the introduction to frame this as a targeted remediation plan to establish a solid foundation. The conclusion will summarize what has been achieved and confirm that the project is now ready to confidently begin Phase 4.

I'll double-check everything: file paths, command syntax, code snippets. The user expects a flawless, actionable plan. This meticulous process ensures the final output meets that high standard.Excellent. I will now provide a dedicated, detailed execution plan to perform the necessary remediation and bring the current codebase up to the standards required to complete **Phase 3** of our improved main execution plan.

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

---
https://drive.google.com/file/d/16Ybng0wimQXasHf3_XUNvDjlFK2FXc7g/view?usp=sharing, https://drive.google.com/file/d/19b5dfyFXgkLEgtjOGr--kJj8A1Nc9hsh/view?usp=sharing, https://drive.google.com/file/d/1DQPI9FfHMqW_Yrdt7yqeAdif6KlzT1js/view?usp=sharing, https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221Ev8fMIM1D-lfbkvifbfwm-Im04nPJGpm%22%5D,%22action%22:%22open%22,%22userId%22:%22103961307342447084491%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing, https://drive.google.com/file/d/1OMiX8vLuiJOTNYXyICKJaccUxmxplK0l/view?usp=sharing, https://drive.google.com/file/d/1Y9ovXmpnl6_1ZqnvakDbE-r9mlzQI_er/view?usp=sharing, https://drive.google.com/file/d/1gsAevdRnHUv-EKJ8-5HqC1CefS11oSuR/view?usp=sharing

