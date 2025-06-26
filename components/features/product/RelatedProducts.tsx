// components/features/product/RelatedProducts.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { ProductCard } from './ProductCard'

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { data: relatedProducts, isLoading } = api.product.getRelated.useQuery({
    categoryId,
    currentProductId,
  })

  if (isLoading) {
    // Optional: Add skeleton loaders for a better UX
    return <div>Loading recommendations...</div>
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null // Don't render the section if there are no related products
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-center mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
