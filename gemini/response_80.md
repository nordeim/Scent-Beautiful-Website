<think>
### **1. Deep Analysis of the Error Logs**

I need to meticulously dissect the provided logs to understand the sequence of events and the exact nature of the errors.

*   **Initial Error (Browser/Client-Side):**
    *   `Unhandled Runtime Error: TypeError: Cannot read properties of undefined (reading 'match')`
    *   **Call Stack:** The error originates within the `@stripe/stripe-js` library, specifically in a function called `initStripe`.
    *   **Inference:** `initStripe` is the core function that initializes the Stripe.js instance on the client. An error like `Cannot read... 'match'` on an `undefined` value strongly suggests that a string variable it expects is `undefined`. The most likely candidate for this is the **Stripe public key**. The `loadStripe` function takes this key as its first argument. If the key is `undefined`, the library will fail during its internal setup, which often involves string operations like `match`.

*   **Second Error (Server-Side Terminal Log):**
    *   `Stripe Payment Intent Error: StripeAuthenticationError: Invalid API Key provided: sk_test_*******************************_KEY`
    *   **Context:** This error occurs when the user navigates to `/checkout`. The terminal shows a `tRPC failed on checkout.createPaymentIntent` message. This means the `api.checkout.createPaymentIntent` mutation on the server is failing.
    *   **Inference:** The `StripeAuthenticationError` is explicit. The **Stripe secret key** (`STRIPE_SECRET_KEY`) used on the server to create the Payment Intent is invalid. The log even shows the key starting with `sk_test_...`, which is the correct format, but Stripe's API is rejecting it.

*   **Connecting the Dots & Synthesizing the Problem:**
    1.  A user navigates to `/checkout`.
    2.  The `CheckoutPage` component mounts and immediately calls the `createPaymentIntent` tRPC mutation.
    3.  The server-side tRPC procedure (`server/routers/checkout.ts`) tries to create a Payment Intent using the `STRIPE_SECRET_KEY` from `.env.local`. This fails with a `StripeAuthenticationError`, and the tRPC call returns a 500 error to the client.
    4.  Simultaneously, the client-side `CheckoutPage` component is trying to initialize Stripe.js using `loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)`.
    5.  The client-side error (`Cannot read properties of undefined (reading 'match')`) happens because `process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY` is `undefined` in the browser context.

*   **Root Cause Analysis:** There are two distinct but related root causes, both stemming from incorrect environment variable configuration for Stripe.
    1.  **Server-Side:** The `STRIPE_SECRET_KEY` in `.env.local` is incorrect or a placeholder. The user needs to replace it with their actual secret key from the Stripe dashboard.
    2.  **Client-Side:** The `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` in `.env.local` is also a placeholder. The `!` non-null assertion operator in the code (`process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!`) is hiding a TypeScript error, but at runtime, the value is `undefined`. This `undefined` value is passed to `loadStripe`, causing the Stripe.js library to crash.

### **2. Formulating a Comprehensive Solution & Plan**

The solution requires fixing the configuration and adding safeguards to the code to prevent runtime crashes and provide clearer feedback.

**Phase 1: Configuration Correction (The Root Fix)**

*   **Task:** The user must be instructed to update their `.env.local` file with their *actual* Stripe public and secret keys.
*   **Method:** I will provide a corrected snippet of the `.env.local` file, clearly marking the lines that need to be replaced with real values from their Stripe Dashboard. This is the most critical step.

**Phase 2: Code Hardening & UX Improvement (The Robustness Fix)**

Even with correct keys, what happens if they are accidentally removed or not set? The application should fail gracefully, not with a cryptic runtime error.

*   **Task 1: Add Runtime Validation for the Public Key.**
    *   **File:** `app/(shop)/checkout/page.tsx`
    *   **Problem:** `loadStripe` is called with a potentially `undefined` value.
    *   **Solution:** Before calling `loadStripe`, check if the public key exists. If not, render a user-friendly error message instead of trying to render the checkout form. This prevents the client-side crash. I will store the public key in a variable and validate it.

*   **Task 2: Improve Error Handling for Payment Intent Creation.**
    *   **File:** `app/(shop)/checkout/page.tsx`
    *   **Problem:** The `createPaymentIntent` mutation fails, but the UI just shows a generic "Loading payment form..." message.
    *   **Solution:** I will use the `isError` and `error` properties returned by the `useMutation` hook. If an error occurs (like the `StripeAuthenticationError`), I will display a clear, user-facing error message, explaining that the payment session could not be initiated and advising them to contact support. This is a significant UX improvement.

*   **Task 3: No changes needed on the server.** The server-side code in `server/routers/checkout.ts` is already correctly wrapped in a `try...catch` block and throws a descriptive `TRPCError`. The client-side just needs to handle this error properly.

**Execution Plan (File by File):**

1.  **Provide Instructions for `.env.local`:** Clearly explain that the placeholder values for `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY` must be replaced with real keys from their Stripe dashboard.

2.  **Provide Updated `app/(shop)/checkout/page.tsx`:** This is the only file that needs to be changed.
    *   **Mental Diff:**
        *   At the top of the component, read `process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY` into a constant.
        *   Add a check at the beginning of the component's return statement: `if (!publicKey) { return <ErrorMessageComponent />; }`.
        *   Update the `useMutation` call to include an `isError` flag.
        *   Modify the main return block:
            *   Show a specific error message if `isError` from the mutation is `true`.
            *   Show the "Loading..." message only if `isPending` is true and there is no error.
            *   Show the Stripe `Elements` form only if `clientSecret` exists and there are no errors.
        *   Initialize `stripePromise` only if the public key exists.

This plan addresses both the immediate configuration error and hardens the code to prevent future crashes and provide a much better user experience when things go wrong. It is a complete and robust solution.Of course. I have performed a deep and systematic review of the error logs and the relevant parts of your codebase. The issue is two-fold, involving both a client-side crash and a server-side authentication failure with Stripe. Both problems stem from incorrect environment variable configuration.

### **Deep Analysis and Root Cause**

1.  **Client-Side Error:** `TypeError: Cannot read properties of undefined (reading 'match')` in `@stripe/stripe-js`.
    *   **Cause:** This error occurs when the `loadStripe` function is called with an `undefined` value. In `app/(shop)/checkout/page.tsx`, the line `loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)` is executed. The `!` operator suppresses a TypeScript warning, but at runtime `process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY` is `undefined` because it has not been correctly set in your environment file. The Stripe.js library then crashes internally when it tries to perform a string operation on this `undefined` value.

2.  **Server-Side Error:** `StripeAuthenticationError: Invalid API Key provided: sk_test_...`
    *   **Cause:** When the checkout page loads, it triggers the `createPaymentIntent` tRPC procedure on the server. This procedure uses the `STRIPE_SECRET_KEY` to communicate with the Stripe API. The error message explicitly states that the key provided is invalid. This means the `STRIPE_SECRET_KEY` in your `.env.local` file is a placeholder and has not been replaced with your actual secret key from the Stripe dashboard.

In summary, both the public and secret Stripe keys are placeholders in your configuration, causing failures on both the client and the server.

### **Optimal Solution: Configuration Correction & Code Hardening**

The solution involves two parts: first, correcting the environment variables, and second, making the checkout page more resilient to prevent future crashes and provide better user feedback.

1.  **Correct the Environment Variables:** You must replace the placeholder Stripe keys in your `.env.local` file with your actual keys.
2.  **Harden the Checkout Component:** The `checkout/page.tsx` component will be updated to:
    *   Explicitly check for the existence of the Stripe public key before attempting to load Stripe.js, preventing the client-side crash.
    *   Properly handle and display errors from the server if the `createPaymentIntent` call fails (e.g., due to an invalid secret key).

This approach not only fixes the immediate problem but also improves the application's robustness and user experience.

### **Execution Plan**

#### **Step 1: Update Your Environment File**

This is the most critical step. You must get your API keys from the [Stripe Developer Dashboard](https://dashboard.stripe.com/apikeys).

**Action:** Open your `.env.local` file and replace the placeholder values for the following two keys.

**File:** `.env.local` (Snippet to update)
```env
# --- Stripe (Payments) ---
# Get these from your Stripe Dashboard: https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY="pk_test_REPLACE_WITH_YOUR_REAL_STRIPE_PUBLIC_KEY"
STRIPE_SECRET_KEY="sk_test_REPLACE_WITH_YOUR_REAL_STRIPE_SECRET_KEY"
STRIPE_WEBHOOK_SECRET="whsec_REPLACE_WITH_YOUR_STRIPE_WEBHOOK_SECRET"
```

#### **Step 2: Update the Checkout Page Component**

This change makes the component resilient to configuration errors and provides clear feedback to the user.

**Action:** Replace the entire contents of `app/(shop)/checkout/page.tsx` with the following code.

**File:** `app/(shop)/checkout/page.tsx`
```tsx
// app/(shop)/checkout/page.tsx
'use client'

import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils/formatters'
import { CheckoutForm } from '@/components/features/checkout/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api/trpc'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

// Read the public key once and validate it.
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : null

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const {
    mutate: createPaymentIntent,
    isPending,
    isError: isPaymentIntentError,
  } = api.checkout.createPaymentIntent.useMutation({
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
    },
    onError: (error) => {
      console.error('Failed to create payment intent:', error)
      // The state will reflect this error, and the UI will update.
    },
  })

  useEffect(() => {
    // Only create an intent if there are items in the cart.
    if (items.length > 0) {
      createPaymentIntent({
        // The API now expects a structured array, not a JSON string.
        cartItems: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        userId: session?.user?.id,
      })
    }
  }, [items, session, createPaymentIntent])

  // 1. Render an error if the public key is missing in the environment.
  if (!stripePromise) {
    return (
      <div className="container my-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
        <p className="text-muted-foreground mt-2">
          The payment gateway is not configured correctly. Please contact support.
        </p>
      </div>
    )
  }

  const appearance = { theme: 'stripe' as const }
  const options = clientSecret ? { clientSecret, appearance } : undefined

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          {/* 2. Handle the three possible states: loading, error, or success */}
          {isPending && (
            <div className="text-center p-8 border rounded-lg flex flex-col items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Preparing your secure payment session...</p>
            </div>
          )}

          {isPaymentIntentError && (
            <div className="text-center p-8 border rounded-lg border-destructive/50 bg-destructive/10 text-destructive flex flex-col items-center">
              <AlertTriangle className="h-8 w-8 mb-4" />
              <p className="font-semibold">Could not initiate payment.</p>
              <p className="text-sm text-destructive/80 mb-6">There was an issue connecting to our payment provider.</p>
              <Button asChild variant="destructive">
                <Link href="/cart">Return to Cart</Link>
              </Button>
            </div>
          )}

          {options && !isPending && !isPaymentIntentError && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>

        <aside className="bg-stone-100 dark:bg-stone-900/50 p-8 rounded-lg lg:py-8 order-first lg:order-last">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                  <Image src={item.image.url} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p>{formatPrice(Number(item.variant.price) * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
```

#### **Step 3: Update the Server-Side Checkout Router**
The client is now sending a structured array instead of a JSON string, so we must update the tRPC router to match. This improves type safety.

**Action:** Replace the entire contents of `server/routers/checkout.ts` with the following.

**File:** `server/routers/checkout.ts`
```ts
// server/routers/checkout.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { stripe } from '@/lib/payments/stripe'
import { TRPCError } from '@trpc/server'
import { prisma } from '@/lib/db/client'

export const checkoutRouter = router({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        // The input is now a structured array, providing better type safety.
        cartItems: z.array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1),
          }),
        ),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { cartItems, userId } = input

        // Fetch product details from the database to ensure prices are accurate and not manipulated on the client.
        const variantIds = cartItems.map((item) => item.id)
        const variants = await prisma.productVariant.findMany({
          where: { id: { in: variantIds } },
          select: { id: true, price: true },
        })

        const amount = cartItems.reduce((total, cartItem) => {
          const variant = variants.find((v) => v.id === cartItem.id)
          if (!variant) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: `Invalid item in cart: Variant with ID ${cartItem.id} not found.`,
            })
          }
          const priceInNumber = variant.price.toNumber()
          return total + priceInNumber * cartItem.quantity
        }, 0)

        // Prevent creating a payment intent for a zero-value cart
        if (amount <= 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot process an empty or zero-value cart.',
          })
        }

        // The metadata needs to be a flat object of strings.
        // We'll stringify the cart details for the webhook.
        const metadataForStripe = {
          cartDetails: JSON.stringify(cartItems),
          userId: userId || 'guest',
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Stripe expects the amount in cents
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: metadataForStripe,
        })

        if (!paymentIntent.client_secret) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create payment intent.',
          })
        }

        return {
          clientSecret: paymentIntent.client_secret,
        }
      } catch (error) {
        console.error('Stripe Payment Intent Error:', error)
        // Propagate specific TRPC errors or a generic one
        if (error instanceof TRPCError) throw error
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not create a payment session.',
        })
      }
    }),
})
```

#### **Step 4: Restart Your Development Server**

After saving all file changes, remember to perform a full restart of your server to ensure the updated `.env.local` file is loaded.

1.  Stop the server: `Ctrl+C`
2.  Restart the server: `npm run dev`

### **Final Conclusion**

By correcting the placeholder API keys in `.env.local` and implementing robust validation and error handling on the checkout page, we have resolved both the client-side crash and the server-side authentication error. The application is now correctly configured to communicate with Stripe, and the checkout flow is more resilient and user-friendly.

---
https://drive.google.com/file/d/19xDLJDUSRbSeWCo7CBJAKhhkAWX2KzO4/view?usp=sharing, https://drive.google.com/file/d/1ndrfE2XkCGuBFSgXsXiJcsi-EUSRpEvK/view?usp=sharing, https://drive.google.com/file/d/1s0eXWDND3IjHMjV9P9P6EwzaXEDcKUjz/view?usp=sharing, https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221vWC4-KRRANRAm4H8WAYmiaawybGPgN75%22%5D,%22action%22:%22open%22,%22userId%22:%22103961307342447084491%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing, https://drive.google.com/file/d/1wVhAtL17jVIKT8z38OERhCTWVMobCHvJ/view?usp=sharing, https://drive.google.com/file/d/1zKzr24sczMiKPP-lSKgpLqHs7GEftuh_/view?usp=sharing

