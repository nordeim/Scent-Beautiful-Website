// components/features/shop/ProductList.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'
import { GenericError, ProductCardSkeleton } from '@/components/common/Skeletons'
import type { SerializableProduct } from '@/types'

// This component receives the initial data from the server,
// but then handles all subsequent client-side fetching for filters/sorting.
interface ProductListProps {
  initialProducts: SerializableProduct[]
  initialCategoryName?: string
}

export function ProductList({ initialProducts, initialCategoryName }: ProductListProps) {
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || 'createdAt_desc'
  const q = searchParams.get('q') || undefined
  const minPrice = searchParams.get('minPrice') || undefined
  const maxPrice = searchParams.get('maxPrice') || undefined

  const [sortBy, sortOrder] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc']

  const { data, isLoading, isError, refetch } = api.product.list.useQuery(
    {
      limit: 12,
      category,
      sortBy,
      sortOrder,
      q,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    },
    {
      initialData: { items: initialProducts, nextCursor: null }, // Use server-fetched data initially
      enabled: !!(category || q || minPrice || maxPrice || sort !== 'createdAt_desc'), // Only refetch on client if filters are applied
    },
  )

  const products = data?.items || initialProducts

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    )
  }

  if (isError) {
    return <GenericError onRetry={() => refetch()} />
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold">No Products Found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
