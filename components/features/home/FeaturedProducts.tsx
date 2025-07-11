// components/features/home/FeaturedProducts.tsx
import { ProductCard } from '@/components/features/product/ProductCard'
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Link from 'next/link'
import type { ProductCardType } from '@/types'

interface FeaturedProductsProps {
  products: ProductCardType[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // The layout now expects exactly 4 products for a 2x2 grid.
  if (products.length < 4) {
    // Return null or a fallback if not enough products are featured.
    return null 
  }

  return (
    <section className="py-20 bg-stone-100 dark:bg-stone-900/50" id="featured-products">
      <div className="container mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured Collections
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Handpicked for you, these are the scents our community is currently loving.
          </p>
        </FadeIn>
        
        {/* REFACTORED: A simple 2x2 grid for a symmetrical layout. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.slice(0, 4).map((product, index) => (
            <FadeIn key={product.id} yOffset={40} delay={index * 0.1}>
              <ProductCard
                product={product}
                // Use a consistent aspect ratio for a uniform grid look.
                aspectRatio="aspect-square"
                priority={index < 2} // Prioritize loading images for the first two items.
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center" yOffset={40}>
          <Button asChild size="lg">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
