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
  if (products.length === 0) {
    return null // Don't render the section if there are no featured products
  }

  return (
    <section className="py-20" id="featured-products">
      <div className="container mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-12">
            Featured Collections
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.1}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="mt-12">
            <Button asChild size="lg">
              <Link href="/products">Shop All Products</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
