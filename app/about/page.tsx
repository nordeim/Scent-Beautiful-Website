// app/about/page.tsx
import type { Metadata } from 'next'

// This tells Next.js to render this page to static HTML at build time.
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the story and passion behind The Scent.',
}

export default function AboutPage() {
  return (
    <div className="container my-16">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">About The Scent</h1>
        <p className="lead">
          We believe in the power of nature to restore balance and elevate the human experience.
        </p>
        <p>
          Founded in 2024, The Scent was born from a passion for pure, authentic aromatherapy and a
          desire to create a digital sanctuary where customers could explore the world of fragrance
          in a meaningful way. Our mission is to source the finest natural ingredients from around
          the globe, crafting them into exquisite products that nurture both the body and the mind.
        </p>
        <p>
          Every product in our collection is a testament to our commitment to quality,
          sustainability, and craftsmanship. We partner with ethical growers and distillers, ensuring
          that from the soil to your home, our products are a force for good.
        </p>
        <h2 className="text-2xl font-bold mt-8">Our Philosophy</h2>
        <p>
          Our philosophy is simple: what you put on your body and bring into your home matters. We
          are dedicated to transparency, providing you with the full story behind every scent, from
          its botanical origins to its therapeutic benefits. We invite you to explore our
          collections and find your own moment of calm.
        </p>
      </div>
    </div>
  )
}
