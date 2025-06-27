// app/shipping-returns/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Information about our shipping policies, rates, and our return process.',
}

export default function ShippingReturnsPage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1>Shipping & Returns</h1>

        <h2>Shipping Policy</h2>
        <p>
          We are delighted to offer shipping across the United States. All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
        </p>
        <h3>Shipping Rates & Delivery Estimates</h3>
        <ul>
          <li><strong>Standard Shipping (5-7 business days):</strong> $5.99. Free for orders over $50.</li>
          <li><strong>Expedited Shipping (2-3 business days):</strong> $15.99.</li>
        </ul>
        <p>
          Delivery delays can occasionally occur. You will receive a shipment confirmation email once your order has shipped, containing your tracking number(s).
        </p>

        <h2>Returns Policy</h2>
        <p>
          Your satisfaction is our priority. If you are not completely satisfied with your purchase, we are here to help.
        </p>
        <p>
          You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.
        </p>
        <h3>Refunds</h3>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions on how to return your item to us, please <a href="/contact">contact us</a>.
        </p>
      </div>
    </div>
  )
}
