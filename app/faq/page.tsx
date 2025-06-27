// app/faq/page.tsx
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our products, shipping, returns, and more.',
}

const faqs = [
  {
    question: 'What are essential oils?',
    answer: 'Essential oils are concentrated plant extracts that retain the natural smell and flavor, or "essence," of their source. They are obtained through distillation (via steam and/or water) or mechanical methods, such as cold pressing.',
  },
  {
    question: 'Are your products 100% natural?',
    answer: 'Yes, absolutely. We are committed to sourcing the purest ingredients. All our products are 100% natural, free from synthetic fragrances, parabens, and sulfates.',
  },
  {
    question: 'How do I use essential oils?',
    answer: 'Essential oils can be used in several ways. The most common methods are aromatic diffusion using a diffuser, topical application on the skin (usually diluted with a carrier oil), and inhalation. Please refer to each product page for specific usage instructions.',
  },
  {
    question: 'What is your shipping policy?',
    answer: 'We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days) within the United States. Orders over $50 qualify for free standard shipping. Please see our Shipping & Returns page for more details.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We want you to be completely satisfied with your purchase. If you are not, you may return unopened products within 30 days of purchase for a full refund. Please visit our Shipping & Returns page to initiate a return.',
  },
]

export default function FAQPage() {
  return (
    <div className="container my-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      </header>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
