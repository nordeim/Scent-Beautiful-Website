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
  if (products.length < 3) {
    return null
  }

  const [heroProduct, ...otherProducts] = products

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Hero Product - Left Column */}
          <FadeIn yOffset={40}>
            <ProductCard
              product={heroProduct}
              aspectRatio="aspect-square md:aspect-[4/5]"
              className="h-full"
              priority
            />
          </FadeIn>

          {/* Stacked Side Products - Right Column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {otherProducts.slice(0, 2).map((product, index) => (
              <FadeIn key={product.id} yOffset={40} delay={(index + 1) * 0.1}>
                <ProductCard product={product} aspectRatio="aspect-video sm:aspect-[2/1] lg:aspect-[16/7]" />
              </FadeIn>
            ))}
          </div>
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
