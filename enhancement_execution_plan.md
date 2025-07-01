This is a major feature enhancement request. The user wants to bridge the gap between the current application and a more conventional, feature-rich e-commerce experience, using the provided HTML/CSS files and screenshots as a design reference. I must be incredibly thorough and systematic.

My core responsibility is to translate the *design and behavior* from the sample files into the existing, modern React/Next.js/tRPC architecture. This is not a simple copy-paste task; it's an architectural integration task.

### **Deconstruction of the Request & Gap Analysis**

First, I need to break down the user's request into concrete, actionable items and compare them to the current codebase (`currect_project_file_structure.txt`).

**1. Featured Products on Homepage:**
*   **Request:** Add a "Featured Products" section to the main landing page.
*   **Reference:** `sample_homepage.html`, `sample_homepage_featured_products.png`. The design shows a grid of product cards with a title above it.
*   **Current State:** `app/page.tsx` is a simple hero section. It does not display any products.
*   **Gap:** Need to fetch a list of "featured" products and render them on the homepage using the existing `ProductCard` component.

**2. User Account Dashboard:**
*   **Request:** Implement a user dashboard that looks like `user_dashboard_after_login.png`.
*   **Reference:** The design shows a multi-column layout with:
    *   A left sidebar with user info and navigation.
    *   A main content area with "Quick Stats" (Recent Orders, Quiz Results), a "Recent Orders" list, a "Scent Profile" / "Recommendations" card, and "Quick Actions".
*   **Current State:**
    *   `app/account/layout.tsx`: Already provides a two-column layout with `AccountNav` on the left. This is a good starting point.
    *   `app/account/profile/page.tsx`: A simple page showing user details. This is not a dashboard.
    *   `app/account/orders/page.tsx`: A dedicated page for listing all orders.
*   **Gap:** A new "Dashboard" page is needed. I'll need a new route, likely `app/account/dashboard/page.tsx`. This page will need to make multiple data requests (user info, recent orders, recommendations). The existing `AccountNav` also needs a "Dashboard" link added.

**3. Shopping Cart Page:**
*   **Request:** The "Cart" icon should lead to a dedicated shopping cart page, as seen in `shopping-cart_button_pressed.html`.
*   **Reference:** The design shows a two-column layout with a list of cart items on the left (with quantity controls) and an order summary on the right.
*   **Current State:** `app/(shop)/cart/page.tsx` already exists and implements this exact two-column layout. The `CartDrawer` in `components/features/cart/CartDrawer.tsx` provides the slide-out functionality. The header icon in `components/common/Layout/Header.tsx` currently opens this drawer (`onClick={toggleDrawer}`).
*   **Gap:** The behavior of the cart icon needs to change. Instead of toggling a drawer, it should navigate the user to the `/cart` page. This is a simple change in `Header.tsx`.

**4. Checkout Flow:**
*   **Request:** The "Proceed to Checkout" button on the cart page should lead to the checkout page (`proceed_to_checkout_button_pressed.html`).
*   **Reference:** The design shows a shipping details form and an order summary.
*   **Current State:** `app/(shop)/cart/page.tsx` already has a button that links to `/checkout`. The `app/(shop)/checkout/page.tsx` file implements this form.
*   **Gap:** This feature seems to be already implemented correctly. No major changes are needed here, but I will review the flow to ensure it matches the user's expectation perfectly.

**5. User Profile Settings Page:**
*   **Request:** A settings page as seen in `user_profile_settings.html`.
*   **Reference:** The design shows a complex layout with separate cards for "Personal Information", "Change Password", "Shipping Address", and "Communication Preferences".
*   **Current State:** `app/account/profile/page.tsx` is very basic, just displaying user info. There is no functionality to update information, change passwords, or manage addresses.
*   **Gap:** This requires a significant overhaul of the profile page. I'll need to create multiple forms, corresponding tRPC mutations for updating user data, and potentially new database models or fields (e.g., for addresses, if not already present). The prisma schema already has an `Address` model linked to the `User`, so the foundation is there.

### **Systematic & Phased Implementation Plan**

This is a large request. I will structure the plan into logical phases, starting with backend changes (API endpoints) and then moving to frontend implementation. This ensures the UI has the data it needs when it's built.

---

### **Phase 1: Backend API Enhancements (tRPC & Prisma)**

First, I'll build all the new API procedures required to support the new features.

**1.1. Featured Products Endpoint:**
*   **File:** `server/routers/product.ts`
*   **Action:** Add a new `getFeatured` procedure to the `productRouter`.
*   **Logic:** This procedure will query the database for products where `isFeatured` is `true`. It will be a `publicProcedure`. I will need to add the `isFeatured` flag to the `list` procedure as well for completeness, but the new one is more direct. I'll create a dedicated `getFeatured` procedure.
*   **Checklist:**
    *   [ ] Create new `getFeatured` public procedure.
    *   [ ] Query `Product` model where `isFeatured: true`.
    *   [ ] Include necessary relations (images, variants).
    *   [ ] Serialize the result to convert Decimals to numbers.
    *   [ ] Add the new procedure to the `productRouter`.

**1.2. User Dashboard Data Endpoint:**
*   **File:** `server/routers/user.ts` (or a new `dashboard.ts` router). A new router is cleaner. I'll create `server/routers/dashboard.ts`.
*   **Action:** Create a new `getDashboardData` protected procedure.
*   **Logic:** This single procedure will efficiently fetch all data needed for the dashboard in parallel to minimize waterfalls.
    *   Fetch recent orders (e.g., `take: 5, orderBy: { createdAt: 'desc' }`).
    *   Fetch user's scent profile/recommendations (This logic doesn't exist. I will simulate it by fetching the top 2 featured products for now, as a placeholder for future "quiz result" logic).
    *   Fetch quick stats (Order count).
    *   Combine results into a single object.
*   **Checklist:**
    *   [ ] Create new file `server/routers/dashboard.ts`.
    *   [ ] Create `dashboardRouter` with a `getDashboardData` protected procedure.
    *   [ ] Use `Promise.all` to fetch order count and recent orders from the `order` table.
    *   [ ] Fetch placeholder recommendations.
    *   [ ] Return a structured object with all dashboard data.
    *   [ ] Add `dashboardRouter` to the main `appRouter` in `server/routers/index.ts`.

**1.3. User Profile Management Endpoints:**
*   **File:** `server/routers/user.ts`
*   **Action:** Add new mutations for updating user profile data.
    *   `updateProfile`: To update `firstName` and `lastName`.
    *   `updatePassword`: A secure procedure that takes `currentPassword` and `newPassword`, verifies the old one, hashes the new one, and saves it.
    *   `listAddresses` and `updateAddress`: To manage user shipping addresses. I see the `Address` model exists but there's no API for it. I'll create a new `address.ts` router for this.
*   **Checklist:**
    *   [ ] In `user.ts`, create `updateProfile` mutation (`protectedProcedure`). It will take `firstName` and `lastName`, and update the user record.
    *   [ ] In `user.ts`, create `updatePassword` mutation. It must fetch the user, compare the `currentPassword` with `passwordHash` using `bcryptjs.compare`, and if valid, hash the `newPassword` and update the record.
    *   [ ] Create new file `server/routers/address.ts`.
    *   [ ] In `address.ts`, create `list` query to get all addresses for the logged-in user.
    *   [ ] In `address.ts`, create `upsert` mutation to create or update an address. It will need the full address details.
    *   [ ] Add the new `addressRouter` to the `appRouter`.

---

### **Phase 2: Core Behavior and Layout Changes**

With the backend ready, I'll modify core navigation and layout components.

**2.1. Change Cart Icon Behavior:**
*   **File:** `components/common/Layout/Header.tsx`
*   **Action:** Change the cart button from an `onClick` handler to a Next.js `<Link>`.
*   **Logic:** The button that currently calls `toggleDrawer` will be changed to `<Link href="/cart">`. The `CartDrawer` will remain but will now only be used for a "mini-cart" preview, or I can remove it if the user wants to fully commit to a dedicated cart page. The user's request implies a full page navigation. I will change the cart icon to be a link to `/cart`. The `CartDrawer` can still be used for "item added" confirmation pop-ups. I'll leave the `CartDrawer` component in the header for now, but decouple its `open` state from the header button. The `useCart` store can expose a method to open it programmatically.
*   **Checklist:**
    *   [ ] In `Header.tsx`, locate the `ShoppingBag` button.
    *   [ ] Remove the `onClick={toggleDrawer}` handler.
    *   [ ] Wrap the `Button` with a Next.js `<Link href="/cart">`. Ensure `asChild` prop is used on the `Button` for correct rendering.
    *   [ ] `useCart` hook and `CartDrawer` component itself don't need changes for this step.

**2.2. Update Account Navigation:**
*   **File:** `components/features/account/AccountNav.tsx`
*   **Action:** Add a "Dashboard" link and re-organize the navigation to match the sample design.
*   **Logic:** The sample `user_dashboard_after_login.html` has Dashboard, My Orders, Profile Settings, Quiz History, and Logout. I'll add these to the `navItems` array.
*   **Checklist:**
    *   [ ] Open `AccountNav.tsx`.
    *   [ ] Add a new entry for `{ href: '/account/dashboard', label: 'Dashboard', icon: ... }` at the top of the `navItems` array. I'll use an appropriate icon like `LayoutDashboard` from `lucide-react`.
    *   [ ] Ensure the path for profile settings is `/account/profile`. It currently is.
    *   [ ] The current `AccountNav.tsx` will be renamed to reflect its new purpose in the new dashboard layout. Wait, no, the existing `AccountNav` is fine, it's just the *content* of the account pages that needs to change.

---

### **Phase 3: Building New Pages and Features**

This is the largest phase, where I'll build the new UIs.

**3.1. Implement "Featured Products" on Homepage:**
*   **File:** `app/page.tsx`
*   **Action:** Convert the page to an `async` component to fetch data, then render the featured products.
*   **Logic:**
    1.  Make the `Home` component `async`.
    2.  Create a tRPC caller on the server-side within the component.
    3.  Call the new `product.getFeatured` procedure.
    4.  Create a new `<FeaturedProducts>` server component to encapsulate the rendering logic.
    5.  Pass the fetched products to this new component.
    6.  The `<FeaturedProducts>` component will contain the "Featured Collections" title and map over the products, rendering a `<ProductCard>` for each.
*   **Checklist:**
    *   [ ] Create new file `components/features/home/FeaturedProducts.tsx`.
    *   [ ] The new component will accept `products` as a prop.
    *   [ ] It will render the section title and a grid of `ProductCard` components.
    *   [ ] Modify `app/page.tsx` to be `async`.
    *   [ ] Fetch data using a server-side tRPC caller.
    *   [ ] Render the `<FeaturedProducts>` component with the fetched data.

**3.2. Build the Account Dashboard Page:**
*   **File:** Create new file `app/account/dashboard/page.tsx`.
*   **Action:** Build the complete dashboard UI as a server component.
*   **Logic:**
    1.  This will be an `async` server component.
    2.  Use a server-side tRPC caller to invoke the new `dashboard.getDashboardData` procedure.
    3.  Structure the JSX using a grid layout to create the cards seen in the design: Quick Stats, Recent Orders, Scent Profile, Quick Actions.
    4.  Create smaller sub-components within the file for each card to keep the code clean (e.g., `RecentOrdersCard`, `QuickActionsCard`).
*   **Checklist:**
    *   [ ] Create `app/account/dashboard/page.tsx`.
    *   [ ] Fetch all necessary data with a single call to `dashboard.getDashboardData`.
    *   [ ] Build the UI to match the screenshot, using existing `Card` components.
    *   [ ] Link the "View All" and "Quick Actions" buttons to the correct pages (`/account/orders`, `/account/profile`, etc.).

**3.3. Overhaul the Profile Settings Page:**
*   **File:** `app/account/profile/page.tsx`
*   **Action:** Rebuild this page completely to include multiple forms for managing user data.
*   **Logic:**
    1.  This will need to be a **Client Component** (`'use client'`) because it contains multiple interactive forms.
    2.  It will fetch the initial user and address data using tRPC hooks (`api.user.me.useQuery`, `api.address.list.useQuery`).
    3.  I will create separate form components for each section to manage complexity: `UpdateProfileForm`, `UpdatePasswordForm`, `ManageAddressForm`.
    4.  Each form component will use `react-hook-form` and `zodResolver` for validation.
    5.  Each form will call its corresponding tRPC mutation on submit (`user.updateProfile`, `user.updatePassword`, `address.upsert`).
    6.  I'll use the `isPending` state from the mutations to show loading indicators on the buttons.
*   **Checklist:**
    *   [ ] Convert `app/account/profile/page.tsx` to a client component.
    *   [ ] Create `components/features/account/UpdateProfileForm.tsx`.
    *   [ ] Create `components/features/account/UpdatePasswordForm.tsx`.
    *   [ ] Create `components/features/account/ManageAddressForm.tsx`.
    *   [ ] Implement all forms with `react-hook-form` and Zod schemas.
    *   [ ] Wire up the `onSubmit` handlers to the new tRPC mutations.
    *   [ ] Add loading and success/error feedback to the forms.
    *   [ ] Compose these new form components inside `app/account/profile/page.tsx`.

### **5. Final Review & Validation**

After implementing all phases, I will conduct a final review:

*   **Diff Check:** I will perform a mental line-by-line diff for every modified file against its original version to ensure no existing logic was accidentally removed.
*   **Behavioral Check:** I will trace the user flows mentally:
    *   Does the homepage now show featured products?
    *   Does the cart icon go to `/cart`?
    *   Does `/account/dashboard` show the new dashboard?
    *   Does `/account/profile` show the new settings forms?
    *   Does all *old* functionality (e.g., adding to cart, the checkout process itself) still work?
*   **Code Quality:** I will ensure all new code adheres to the project's existing high standards (type safety, component structure, etc.).

This detailed, phased plan addresses every aspect of the user's request while prioritizing stability and maintainability. It breaks a large, complex task into smaller, manageable, and verifiable steps. I am ready to present this plan.This is a fantastic and ambitious request that will elevate the project to a truly professional e-commerce standard. I will act as your dedicated architectural partner to meticulously plan and execute these significant feature enhancements.

My approach will be systematic and phased, ensuring that we build upon the stable foundation we've already established without introducing regressions.

### **Analysis of Request & Architectural Strategy**

The core of your request is to implement five key features and behaviors that are standard in modern e-commerce sites, using the provided HTML and image mockups as a design blueprint. This requires translating static designs into dynamic, data-driven React components integrated into our existing Next.js and tRPC architecture.

My strategy is to tackle this in three logical phases:

1.  **Phase 1: Backend API Expansion:** First, I will create all the necessary server-side tRPC endpoints (queries and mutations) that the new frontend features will require. This ensures the data layer is ready before we build the UI.
2.  **Phase 2: Core Layout and Behavior Modifications:** Next, I will update core navigational components and layouts (like the header and account sidebar) to reflect the new user flows.
3.  **Phase 3: New Feature and Page Implementation:** Finally, with the backend and navigation in place, I will build the new pages and components for the Featured Products section, the Account Dashboard, and the enhanced Profile Settings page.

This phased approach ensures a logical dependency flow and allows for iterative validation.

---

### **Detailed Execution Plan**

Here is the step-by-step execution plan. Each step includes a description of the changes and an integrated checklist for validation.

#### **Phase 1: Backend API Expansion (tRPC Routers)**

**Checklist for Phase 1:**
*   [ ] All new procedures are added to their respective routers.
*   [ ] All new routers are correctly registered in the main `appRouter`.
*   [ ] All database queries are type-safe and use the Prisma client.
*   [ ] All data returned to the client (especially `Decimal` types) is properly serialized.
*   [ ] All protected procedures correctly enforce user authentication.

**Step 1.1: Create "Featured Products" Endpoint**
*   **File to Modify:** `server/routers/product.ts`
*   **Changes:**
    *   A new `getFeatured` procedure will be added to fetch products where the `isFeatured` flag is `true`. This will power the new homepage section.
*   **Checklist:**
    *   [ ] Add `getFeatured: publicProcedure` to the `productRouter`.
    *   [ ] Implement `ctx.prisma.product.findMany` with `where: { isFeatured: true, isActive: true }`.
    *   [ ] Include necessary relations (`images`, `variants`) and limit the results (e.g., to 6).
    *   [ ] Use the existing `serializeProduct` helper on the results.

**Step 1.2: Create Endpoints for Profile Settings Management**
*   **Files to Modify:** `server/routers/user.ts`, `server/routers/index.ts`
*   **Files to Add:** `server/routers/address.ts`
*   **Changes:** We need mutations to allow users to update their information.
    1.  **`user.ts`:**
        *   Add an `updateProfile` mutation to change `firstName` and `lastName`.
        *   Add a `updatePassword` mutation that securely validates the current password before updating to a new, hashed password.
    2.  **`address.ts` (New File):**
        *   Create a new router for address management.
        *   Add a `list` query to fetch all of a user's addresses.
        *   Add an `upsert` mutation to create a new address or update an existing one.
        *   Add a `delete` mutation to remove an address.
    3.  **`index.ts`:**
        *   Import and register the new `addressRouter`.
*   **Checklist:**
    *   [ ] `updateProfile` mutation created and working.
    *   [ ] `updatePassword` mutation created with `bcryptjs.compare` validation.
    *   [ ] New `address.ts` router created.
    *   [ ] `address.list`, `address.upsert`, `address.delete` procedures are implemented and protected.
    *   [ ] `addressRouter` is added to `appRouter`.

**Step 1.3: Create Endpoint for the Account Dashboard**
*   **Files to Modify:** `server/routers/index.ts`
*   **Files to Add:** `server/routers/dashboard.ts`
*   **Changes:** A dedicated endpoint to efficiently gather all data for the new dashboard page in a single API call.
    1.  **`dashboard.ts` (New File):**
        *   Create a `dashboardRouter`.
        *   Add a `getDashboardData` protected procedure.
    2.  **`index.ts`:**
        *   Import and register the new `dashboardRouter`.
*   **Checklist:**
    *   [ ] `dashboard.ts` router created.
    *   [ ] `getDashboardData` procedure uses `Promise.all` to fetch recent orders, order count, and placeholder recommendations concurrently.
    *   [ ] `dashboardRouter` added to `appRouter`.

---

#### **Phase 2: Core Layout & Behavior Modifications**

**Checklist for Phase 2:**
*   [ ] The header cart icon now navigates to the `/cart` page.
*   [ ] The account navigation sidebar includes a link to the new dashboard.

**Step 2.1: Update Header Cart Icon Behavior**
*   **File to Modify:** `components/common/Layout/Header.tsx`
*   **Changes:** The cart icon will be changed from a button that opens the drawer to a link that navigates to the full cart page.
*   **Checklist:**
    *   [ ] Locate the `ShoppingBag` button.
    *   [ ] Remove the `onClick={toggleDrawer}` prop.
    *   [ ] Wrap the `Button` component in a Next.js `<Link href="/cart">`.
    *   [ ] Add the `asChild` prop to the `Button` to ensure it renders as an `<a>` tag for proper semantics.

**Step 2.2: Update Account Sidebar Navigation**
*   **File to Modify:** `components/features/account/AccountNav.tsx`
*   **Changes:** A "Dashboard" link will be added to the navigation, and the list will be reordered to match the new design.
*   **Checklist:**
    *   [ ] Add `LayoutDashboard` to the `lucide-react` import.
    *   [ ] Add `{ href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard }` as the first item in the `navItems` array.
    *   [ ] Reorder other items to match the user dashboard screenshot's hierarchy.

---

#### **Phase 3: New Feature and Page Implementation**

**Checklist for Phase 3:**
*   [ ] All new pages and components are created in the correct directories.
*   [ ] New pages fetch data using the newly created tRPC endpoints.
*   [ ] The UI of all new components closely matches the provided mockups.
*   [ ] All forms are implemented with `react-hook-form` and Zod validation.
*   **Crucially:** All existing functionality (e.g., adding to cart, checkout process) remains intact and unaffected.

**Step 3.1: Add "Featured Products" to Homepage**
*   **Files to Modify:** `app/page.tsx`
*   **Files to Add:** `components/features/home/FeaturedProducts.tsx`
*   **Changes:** The homepage will be converted to an `async` Server Component to fetch and display a list of featured products.
*   **Checklist:**
    *   [ ] Create the new `FeaturedProducts.tsx` component. It will receive `products` as a prop and render the section title and a grid of `<ProductCard>` components.
    *   [ ] Modify `app/page.tsx` to be an `async function`.
    *   [ ] In `app/page.tsx`, create a server-side tRPC caller.
    *   [ ] Fetch data using `caller.product.getFeatured()`.
    *   [ ] Pass the fetched data as a prop to the new `<FeaturedProducts />` component.

**Step 3.2: Build the New Account Dashboard Page**
*   **Files to Add:** `app/account/dashboard/page.tsx`
*   **Changes:** This new page will serve as the main landing area for logged-in users.
*   **Checklist:**
    *   [ ] Create the new `dashboard/page.tsx` file as an `async` Server Component.
    *   [ ] Use a server-side tRPC caller to fetch all data in one call via `caller.dashboard.getDashboardData()`.
    *   [ ] Structure the UI using a CSS grid and the common `<Card>` component to match the mockup's layout (Stats, Recent Orders, Profile, Actions).
    *   [ ] Create small, self-contained server sub-components within the file for each card to keep the main component clean.
    *   [ ] Ensure all links and buttons navigate to their correct destinations.

**Step 3.3: Rebuild the Profile Settings Page**
*   **Files to Modify:** `app/account/profile/page.tsx`, `lib/validation/schemas.ts`
*   **Files to Add:** `components/features/account/UpdateProfileForm.tsx`, `components/features/account/UpdatePasswordForm.tsx`, `components/features/account/ManageAddresses.tsx`
*   **Changes:** The simple profile display page will be transformed into a comprehensive settings management center with multiple interactive forms.
*   **Checklist:**
    *   [ ] Convert `app/account/profile/page.tsx` into a client component shell (`'use client'`).
    *   [ ] Create the three new form components (`UpdateProfileForm`, `UpdatePasswordForm`, `ManageAddresses`).
    *   [ ] Each form will use `react-hook-form` with Zod schemas for validation.
    *   [ ] Add new schemas for password changes and addresses to `lib/validation/schemas.ts`.
    *   [ ] Each form's `onSubmit` handler will call the appropriate tRPC mutation (`user.updateProfile`, `user.updatePassword`, `address.upsert`).
    *   [ ] The parent `profile/page.tsx` will fetch the initial data and pass it down to the form components. It will orchestrate the layout of the different setting cards.

This comprehensive plan addresses all your requests systematically. It begins by laying the necessary backend foundation before touching the UI, ensuring a smooth and logical implementation process. Each step is designed to be a minimal, verifiable unit of work.

