<think>
The user wants me to review the application startup log and then propose a detailed execution plan for three new improvements.

**Part 1: Review Startup Log**

1.  **Analyze the Log:** I'll go through the provided `pnpm dev` log line by line.
2.  **Look for Errors:** Check for any `error`, `warn`, `failed`, or non-200 status codes (except expected ones like 401 for failed login attempts).
3.  **Check for Performance Issues:** Note any unusually long compilation or response times.
4.  **Verify Database Queries:** Look at the Prisma queries to ensure they seem logical and aren't doing anything unexpected.
5.  **Summarize Findings:** Conclude whether the application startup is healthy.

*   `▲ Next.js 14.2.30`: Standard Next.js version info.
*   `✓ Starting... ✓ Ready in 3.2s`: Healthy start.
*   `✓ Compiled / in 13.3s (2679 modules)`: Initial homepage compilation. A bit long, but normal for a cold start on a large app.
*   `prisma:info Starting a postgresql pool with 9 connections.`: Prisma client successfully connected to the database.
*   `prisma:query SELECT "public"."Product" ...`: This is the server-side data fetch for the homepage (`getFeatured` products). Looks correct.
*   `GET / 200 in 14429ms`: The initial page load is slow. This is likely due to the initial cold start compilation time. Subsequent reloads should be much faster.
*   The log shows successful compilation of various pages (`/api/auth`, `/middleware`, `/login`, etc.) as they are accessed. This is the expected behavior of the Next.js dev server.
*   `GET /api/auth/session 200`: Successful session checks.
*   `POST /api/auth/callback/credentials 200 in 474ms`: A successful login attempt.
*   `GET /account/dashboard ...`: Successful navigation to the dashboard.
*   `prisma:query SELECT COUNT(*) ...`: Dashboard queries are running as expected.
*   `GET /api/trpc/user.me ...`: Successful tRPC queries.
*   `POST /api/trpc/user.updateProfile?batch=1 200 in 97ms`: Successful mutation call.
*   `POST /api/trpc/user.updatePassword?batch=1 200 in 965ms`: Successful password update. The longer time is expected due to bcrypt hashing.
*   `POST /api/trpc/checkout.createPaymentIntent?batch=1 200 in 677ms`: Successful creation of a Stripe payment intent.
*   `POST /api/auth/callback/credentials 401 in 446ms`: This shows a *failed* login attempt, which is expected behavior when wrong credentials are used. The 401 status is correct. This is not an application error.
*   The rest of the log shows more successful page loads and API calls.

**Conclusion on Log Review:** The startup log appears **healthy**. There are no unexpected errors or crashes. The initial slow compile time is normal for a cold development server start. The database queries correspond to the actions being taken (loading pages, logging in, updating profile). The 401 error is a valid part of the authentication flow.

**Part 2: Develop Detailed Execution Plan**

Now, I will put on my "deep-thinking hat" and plan the implementation for the three requested improvements.

### **Improvement 1: Global Notification System (Toasts)**

*   **Goal:** Provide non-intrusive feedback for user actions like "Item added to cart", "Profile updated", etc.
*   **Library Choice:** The user suggested `react-hot-toast`. This is an excellent choice: it's lightweight, highly customizable, and works well with Next.js.
*   **Implementation Options:**
    1.  **Manual Toast Calls:** Call `toast.success('...')` directly in every component where an action occurs (`ProductCard`, `UpdateProfileForm`, etc.).
        *   *Pros:* Simple, direct.
        *   *Cons:* Repetitive, can lead to inconsistent messages, harder to manage globally. Logic is scattered.
    2.  **Centralized Hook/Wrapper:** Create a custom hook, e.g., `useApiMutation`, that wraps `api.useMutation` from tRPC. This hook would automatically handle showing loading, success, and error toasts.
        *   *Pros:* Highly reusable (DRY principle), centralizes notification logic, enforces consistent feedback style across the app.
        *   *Cons:* Adds a layer of abstraction. Might be overkill if only a few components need toasts.
    3.  **Global Store Integration (Zustand):** Create a notification slice in a Zustand store. Components update the store, and a dedicated `NotificationManager` component listens to the store and displays toasts.
        *   *Pros:* Decouples components from the toast library itself.
        *   *Cons:* More complex than necessary. `react-hot-toast` is already a global system, so this adds an unneeded intermediary layer.

*   **Chosen Option:** A hybrid approach.
    *   For **direct user actions** like adding to cart, manual calls are fine and clear (`ProductCard.tsx`).
    *   For **form submissions via tRPC mutations**, we can add `onSuccess` handlers to call the toast notifications. This is a good middle-ground. A custom hook is powerful but might be over-engineering for the current scope. Let's stick to adding `onSuccess` handlers for clarity and minimal code change.
*   **Key Steps:**
    1.  Install `react-hot-toast`.
    2.  Add the `<Toaster />` provider to the root layout (`app/layout.tsx`) so it's available everywhere.
    3.  Modify components that perform mutations to call `toast.success()` or `toast.error()`.

### **Improvement 2: Enhanced Address Fields (Address Line 2, Country)**

*   **Goal:** Add `addressLine2` and `country` to user address management and auto-fill checkout. The platform should default to "Singapore".
*   **Implementation Options:**
    1.  **Database & UI only:** Modify `schema.prisma`, forms, and display components. This is the most direct path.
    2.  **Use a Country Library:** Integrate a library like `react-select-country-list` for a dropdown of countries.
        *   *Pros:* Better UX, less chance of user typos.
        *   *Cons:* Adds another dependency. For a single-country default, it might be overkill initially but good for future expansion.

*   **Chosen Option:** Direct implementation (Option 1) for now, with a focus on defaulting to "Singapore". We can easily swap the text input for a dropdown later if internationalization becomes a priority. The current address form image shows simple text inputs, so we will match that for now but with `addressLine2` added.
*   **Key Steps:**
    1.  Update the `Address` model in `prisma/schema.prisma` to make `addressLine2` a standard optional string. The `countryCode` field already exists, so we just need to use it.
    2.  Update the `addressSchema` in `lib/validation/schemas.ts` to include the new field.
    3.  Update the `AddressFormDialog.tsx` component to include the new input field.
    4.  Update the `ManageAddresses.tsx` component to display the new fields.
    5.  Modify the `CheckoutForm.tsx` to pre-fill address fields from the user's default saved address if they are logged in.
    6.  Update `lib/config/shop.ts` to define a default country.

### **Improvement 3: Goods and Services Tax (GST)**

*   **Goal:** Add a 9% GST for Singapore.
*   **Implementation Options:**
    1.  **Hardcode in Frontend:** Calculate and display GST only in the cart and checkout summary components on the client-side.
        *   *Pros:* Quickest to implement visually.
        *   *Cons:* **VERY BAD. Extremely insecure.** Prices and totals must *always* be calculated on the server to prevent client-side manipulation. This is not a viable option.
    2.  **Server-Side Calculation in tRPC:** Modify the `checkout.createPaymentIntent` mutation to calculate GST based on the cart total and pass the final, taxed amount to Stripe.
        *   *Pros:* Secure, single source of truth for pricing. The backend tells the frontend the final price.
        *   *Cons:* Need to update the frontend to display the tax breakdown.
    3.  **Stripe Tax:** Use Stripe's built-in tax features.
        *   *Pros:* Most robust and scalable solution. Automatically handles different tax rates for different regions if the business expands.
        *   *Cons:* Requires more complex Stripe configuration (registering tax jurisdictions). Might be overkill for a single-country, single-rate setup.

*   **Chosen Option:** Server-Side Calculation in tRPC (Option 2). This is the best balance of security, correctness, and implementation complexity for the current requirement (single 9% rate).
*   **Key Steps:**
    1.  Define the GST rate in a central config file (`lib/config/shop.ts`).
    2.  Update the `checkout.createPaymentIntent` tRPC mutation in `server/routers/checkout.ts` to calculate the subtotal, apply GST, and create the Stripe intent with the *final total*.
    3.  Update the `checkout` page (`app/(shop)/checkout/page.tsx`) to display the subtotal, GST amount, and final total. This will require fetching this breakdown from the server, so the `createPaymentIntent` mutation should return these values.
    4.  Update the `cart` page (`app/(shop)/cart/page.tsx`) to show an estimated total including tax.

---
### **Detailed Execution Plan & Validation Checklist**

I have synthesized these decisions into a phased execution plan.

**Phase 1: Setup & Global Notification System**

*   **Goal:** Install the toast library and add the provider.
*   **Step 1.1: Install Dependency**
    *   **Action:** Run `pnpm add react-hot-toast` in the terminal.
    *   **Validation:**
        *   [ ] Check that `react-hot-toast` is added to `package.json`.
*   **Step 1.2: Add Toaster Provider**
    *   **File to Modify:** `app/layout.tsx`
    *   **Changes:**
        *   Import `Toaster` from `react-hot-toast`.
        *   Place the `<Toaster />` component inside the `<Providers>` component, likely after the main content `div`.
    *   **Validation:**
        *   [ ] The application should run without errors.
        *   [ ] Inspecting the DOM should show the `react-hot-toast` container elements added to the body.

**Phase 2: Address Field Enhancements**

*   **Goal:** Add `addressLine2` and a default country ("Singapore") throughout the address management flow.
*   **Step 2.1: Update Database Schema**
    *   **File to Modify:** `prisma/schema.prisma`
    *   **Changes:** The `addressLine2` field already exists and is optional, and `countryCode` exists. No changes are needed here, but I will modify the `AddressFormDialog` to use `countryCode` correctly and set a default. *Correction*: The user image shows "Country" as a field, which `countryCode` represents. Let's make this more explicit in the UI. And `addressLine2` is already there. Perfect. My main task will be to expose these in the UI and set a default.
*   **Step 2.2: Update Zod Validation Schema**
    *   **File to Modify:** `lib/validation/schemas.ts`
    *   **Changes:** The `addressSchema` already contains `addressLine2: z.string().optional()` and `countryCode: z.string().min(2, 'Country is required')`. This is correct. No changes needed.
*   **Step 2.3: Update Address Form Dialog Component**
    *   **File to Modify:** `components/features/account/AddressFormDialog.tsx`
    *   **Changes:**
        *   Add a new `Input` field for "Address Line 2 (Optional)" right after "Address".
        *   Change the `countryCode` input to be explicitly labeled "Country" and set its `defaultValue` to "SG" (for Singapore) in the `useForm` `defaultValues`.
        *   Update the `defaultValues` in `useForm` to use the new country default and handle `addressLine2`.
    *   **Validation:**
        *   [ ] The "Add New Address" dialog must show the new "Address Line 2" field.
        *   [ ] The "Country" field should be present and default to "SG".
        *   [ ] The form should submit successfully and save the new fields.
*   **Step 2.4: Update Address Display**
    *   **File to Modify:** `components/features/account/ManageAddresses.tsx`
    *   **Changes:**
        *   Render the `address.addressLine2` if it exists.
        *   Add `address.countryCode` to the displayed address string.
    *   **Validation:**
        *   [ ] Saved addresses with a second line and country should display them correctly in the address list.
*   **Step 2.5: Update Checkout Form Logic**
    *   **File to Modify:** `app/(shop)/checkout/page.tsx`
    *   **Changes:**
        *   Fetch the user's addresses using a tRPC query (`api.address.list.useQuery`).
        *   If addresses exist, find the default one.
        *   Pass the default address data to the `CheckoutForm` component as a prop.
    *   **File to Modify:** `components/features/checkout/CheckoutForm.tsx`
    *   **Changes:**
        *   Accept an optional `initialData` prop containing a default address.
        *   Use `react-hook-form`'s `reset` function or `defaultValues` to populate the form fields if `initialData` is provided.
        *   Add the `addressLine2` field.
        *   Ensure the "Country" field is present and populated.
    *   **Validation:**
        *   [ ] When a logged-in user with a default address visits `/checkout`, the shipping form should be pre-filled.
        *   [ ] A guest user or a user without a default address should see an empty form.

**Phase 3: GST Implementation & Notification Integration**

*   **Goal:** Implement a 9% GST calculation on the server and display it correctly in the checkout flow. Integrate toast notifications for key user actions.
*   **Step 3.1: Centralize Tax Configuration**
    *   **File to Create:** `lib/config/shop.ts` (or modify if it exists).
    *   **Changes:**
        *   Export a `SHOP_CONFIG` object containing `TAX_RATE = 0.09` and `DEFAULT_COUNTRY = 'SG'`.
    *   **Validation:**
        *   [ ] The file should export the config object correctly.
*   **Step 3.2: Update Checkout Server Logic**
    *   **File to Modify:** `server/routers/checkout.ts`
    *   **Changes:**
        *   In `createPaymentIntent`, import `SHOP_CONFIG`.
        *   Calculate `subtotal`.
        *   Calculate `taxAmount = subtotal * SHOP_CONFIG.TAX_RATE`.
        *   Calculate `totalAmount = subtotal + taxAmount`.
        *   Pass the `Math.round(totalAmount * 100)` to Stripe.
        *   Return not just the `clientSecret`, but also `subtotal`, `taxAmount`, and `totalAmount` to the client.
    *   **Validation:**
        *   [ ] The amount sent to Stripe must be the final, taxed amount.
        *   [ ] The mutation response must include the price breakdown.
*   **Step 3.3: Update Checkout UI**
    *   **File to Modify:** `app/(shop)/checkout/page.tsx`
    *   **Changes:**
        *   In the `createPaymentIntent.onSuccess` callback, store the entire price breakdown (`subtotal`, `taxAmount`, `total`) in state.
        *   Update the "Order Summary" section to display three lines: Subtotal, GST (9%), and Total.
    *   **Validation:**
        *   [ ] The order summary on the checkout page must correctly display the subtotal, GST amount, and the final total.
        *   [ ] The final total must match the amount the user is asked to pay.
*   **Step 3.4: Integrate Toast Notifications**
    *   **File to Modify:** `components/features/product/ProductCard.tsx`
        *   **Change:** In `handleAddToCart`, after calling `addItem` and `setDrawerOpen`, add `toast.success('Added to cart!')`.
    *   **File to Modify:** `components/features/account/UpdateProfileForm.tsx`
        *   **Change:** In the `updateProfile.onSuccess` handler, add `toast.success('Profile updated successfully!')`.
    *   **File to Modify:** `components/features/account/UpdatePasswordForm.tsx`
        *   **Change:** In the `updatePassword.onSuccess` handler, remove the `setSuccessMessage` state and replace it with `toast.success(data.message)`.
    *   **File to Modify:** `components/features/account/AddressFormDialog.tsx`
        *   **Change:** In the `upsertAddress.onSuccess` handler, add `toast.success('Address saved!')`.
    *   **Validation:**
        *   [ ] Adding an item to cart from a product card should show a success toast.
        *   [ ] Successfully updating a profile should show a success toast.
        *   [ ] Successfully changing a password should show a success toast.
        *   [ ] Successfully saving an address should show a success toast.

This structured plan addresses all requirements, breaks the work into logical and verifiable steps, and prioritizes security and correctness (especially for tax calculations). I will await your approval before proceeding with the implementation.Excellent. I have meticulously reviewed the application startup log and your improvement requests. The log indicates a healthy application startup with no critical errors. The initial slow compile times are expected in a development environment on first load.

Based on this analysis, I have devised a comprehensive execution plan to implement the requested improvements. This plan is broken down into logical phases to ensure each change is modular, verifiable, and builds upon a stable foundation.

Here is the detailed execution plan for your approval.

### **High-Level Strategy**

1.  **Phase 1: Global Systems Setup.** We will begin by installing and configuring the global notification system (`react-hot-toast`). This provides a foundational UI element that will be used in later phases.
2.  **Phase 2: Data Model & UI for Enhanced Addresses.** Next, we will update the UI and frontend components to handle the new address structure (`addressLine2` and `country`). This involves modifying forms and display components.
3.  **Phase 3: Backend Logic & Financial Calculations.** We will then implement the server-side logic for GST calculation. This is a critical step that must be done on the backend for security and accuracy. We will also enhance the checkout process to auto-fill address information.
4.  **Phase 4: Integration and Final Polish.** Finally, we will integrate the toast notifications into the updated components, providing users with clear feedback for their actions.

This phased approach minimizes risk by isolating database, UI, and backend logic changes into distinct, testable stages.

---

### **Detailed Execution Plan & Validation Checklist**

#### **Phase 1: Setup & Global Notification System**

*   **Goal:** Install `react-hot-toast` and make it available globally.

*   **Step 1.1: Install Dependency**
    *   **Action:** Execute `pnpm add react-hot-toast` in the project's root directory.
    *   **Validation Checklist:**
        *   [ ] Verify `react-hot-toast` is successfully added to the `dependencies` section of `package.json`.

*   **Step 1.2: Add Toaster Provider to Root Layout**
    *   **File to Modify:** `app/layout.tsx`
    *   **Changes:**
        1.  Import the `Toaster` component: `import { Toaster } from 'react-hot-toast'`.
        2.  Place the `<Toaster />` component within the `<body>`, inside the main `<Providers>` wrapper, to ensure it's available on every page. This is a self-rendering component and does not need to wrap any children.
    *   **Validation Checklist:**
        *   [ ] The application starts and runs without any errors after the changes.
        *   [ ] Using browser developer tools, inspect the DOM of the rendered homepage. The container elements for `react-hot-toast` should be present at the end of the `<body>` tag.

---

#### **Phase 2: Address Field UI Enhancements**

*   **Goal:** Update the address forms and displays to include `addressLine2` and a default country ("Singapore").

*   **Step 2.1: Update Address Form Dialog Component**
    *   **File to Modify:** `components/features/account/AddressFormDialog.tsx`
    *   **Changes:**
        1.  Locate the "Address" `Input`. Immediately after its closing `</div>`, add a new `div` block for "Address Line 2 (Optional)". This field will be bound to `...register('addressLine2')`.
        2.  Find the `Input` for `postalCode`. In the `div` that contains both "State/Province" and "Postal Code", add a new full-width `div` block below it for the "Country" field.
        3.  Update the `useForm` `defaultValues` to set `countryCode: 'SG'`.
    *   **Validation Checklist:**
        *   [ ] When opening the "Add New Address" dialog, a new optional field for "Address Line 2" is visible.
        *   [ ] A new field for "Country" is visible and defaults to "SG".
        *   [ ] The form can be submitted, and the new data is saved correctly (this will be fully verified after backend changes).

*   **Step 2.2: Update Address Display Component**
    *   **File to Modify:** `components/features/account/ManageAddresses.tsx`
    *   **Changes:**
        1.  In the `addresses.map` function, add a line to conditionally render `{address.addressLine2}` if it exists.
        2.  Modify the final line of the address display to include the country code, for example: `{address.city}, {address.stateProvince} {address.postalCode}, {address.countryCode}`.
    *   **Validation Checklist:**
        *   [ ] After saving an address with all fields filled, the address card in "Manage Addresses" correctly displays all lines, including Address Line 2 and the country code.

---

#### **Phase 3: Backend Logic for Tax & Checkout**

*   **Goal:** Implement server-side GST calculation and pre-fill the checkout form with the user's default address.

*   **Step 3.1: Centralize Shop Configuration**
    *   **File to Modify:** `lib/config/shop.ts`
    *   **Changes:**
        1.  Add a new export: `export const GST_RATE = 0.09;`
        2.  Add a new export: `export const DEFAULT_COUNTRY = 'SG';`
    *   **Validation Checklist:**
        *   [ ] The file saves correctly and the constants are exportable for use in other parts of the application.

*   **Step 3.2: Implement Server-Side GST Calculation**
    *   **File to Modify:** `server/routers/checkout.ts`
    *   **Changes:**
        1.  Import `GST_RATE` from `@/lib/config/shop`.
        2.  Inside the `createPaymentIntent` mutation, after calculating the `amount` (which is the subtotal), perform the following calculations:
            *   `const taxAmount = amount * GST_RATE;`
            *   `const totalAmount = amount + taxAmount;`
        3.  Update the `stripe.paymentIntents.create` call to use `amount: Math.round(totalAmount * 100)`.
        4.  Modify the `return` statement to send a complete breakdown to the client: `return { clientSecret: paymentIntent.client_secret, subtotal: amount, taxAmount, total: totalAmount };`
    *   **Validation Checklist:**
        *   [ ] The `createPaymentIntent` mutation must return an object containing `clientSecret`, `subtotal`, `taxAmount`, and `total`.
        *   [ ] The final amount passed to Stripe must be the sum of the subtotal and the 9% tax.

*   **Step 3.3: Update Checkout Page UI and Logic**
    *   **File to Modify:** `app/(shop)/checkout/page.tsx`
    *   **Changes:**
        1.  Add a new state variable to hold the price breakdown: `const [priceDetails, setPriceDetails] = useState({ subtotal: 0, taxAmount: 0, total: 0 });`
        2.  In the `createPaymentIntent.onSuccess` callback, update this new state: `setPriceDetails({ subtotal: data.subtotal, taxAmount: data.taxAmount, total: data.total });`
        3.  In the "Order Summary" JSX, replace the hardcoded `getTotalPrice()` calls with the state values from `priceDetails`.
        4.  Add a new row between "Subtotal" and "Total" to display the calculated GST: `<span>GST (9%)</span> <span>{formatPrice(priceDetails.taxAmount)}</span>`.
        5.  **For address pre-filling:**
            *   Add a `api.address.list.useQuery()` hook to fetch the user's addresses.
            *   Find the default address from the query result.
            *   Pass this default address object as a prop to the `<CheckoutForm />` component.
    *   **File to Modify:** `components/features/checkout/CheckoutForm.tsx`
    *   **Changes:**
        1.  Accept an optional `initialData?: Address | null` prop.
        2.  In the `useForm` hook, set the `defaultValues` to be `initialData` if it's provided, otherwise an empty form structure.
    *   **Validation Checklist:**
        *   [ ] The Order Summary on the `/checkout` page must clearly show "Subtotal", "GST (9%)", and "Total".
        *   [ ] When a logged-in user with a default address visits `/checkout`, the shipping form is pre-filled with their information.
        *   [ ] Guest users or users without a default address see an empty form.

---

#### **Phase 4: Notification Integration**

*   **Goal:** Provide toast notifications for key user actions to improve user experience.

*   **Step 4.1: Integrate Toasts into User Actions**
    *   **File to Modify:** `components/features/product/ProductCard.tsx`
        *   **Change:** In the `handleAddToCart` function, add `toast.success('Added to cart!');`.
    *   **File to Modify:** `components/features/account/UpdateProfileForm.tsx`
        *   **Change:** In the `updateProfile.onSuccess` handler, add `toast.success('Profile updated successfully!');`.
    *   **File to Modify:** `components/features/account/UpdatePasswordForm.tsx`
        *   **Change:** Replace the existing `setSuccessMessage` logic with a call to `toast.success(data.message)`. Remove the now-unused `successMessage` state.
    *   **File to Modify:** `components/features/account/AddressFormDialog.tsx`
        *   **Change:** In the `upsertAddress.onSuccess` handler, add `toast.success(initialData ? 'Address updated!' : 'Address added!');`.
    *   **Validation Checklist:**
        *   [ ] Clicking "Add to Cart" on a product card triggers a success toast.
        *   [ ] Successfully updating a user's profile triggers a success toast.
        *   [ ] Successfully changing a password triggers a success toast.
        *   [ ] Successfully adding or editing an address triggers a success toast.

This detailed plan provides a clear path forward. Upon your approval, I will begin execution, starting with Phase 1.

---
https://drive.google.com/file/d/14_pOs6Fb2QSSD6G1TjZSRWIP242UPQOG/view?usp=sharing, https://drive.google.com/file/d/1Dw65W0_LggqjPrgeHpGuYlcRXTkEZNKW/view?usp=sharing, https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221FlMuHF0asV8U48qqxXboa9wNL8qqVcHM%22%5D,%22action%22:%22open%22,%22userId%22:%22103961307342447084491%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing, https://drive.google.com/file/d/1ZjSo8kx5pyQJTcPcANbBFNDWg9vVxmRw/view?usp=sharing, https://drive.google.com/file/d/1h3BpXaDO0RqzeA7Go1ir_CF85XN4pd0S/view?usp=sharing, https://drive.google.com/file/d/1sTwYy0bM5o_-IBNcuoh1kE0fmwPg-xvE/view?usp=sharing

