// app/(shop)/products/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'
import { FiltersSidebar } from '@/components/features/shop/FiltersSidebar'
import { CategoryFilterBar } from '@/components/features/shop/CategoryFilterBar'
import { SortDropdown } from '@/components/features/shop/SortDropdown'
import { GenericError, ProductCardSkeleton } from '@/components/common/Skeletons'

export default function ProductsPage() {
  const searchParams = useSearchParams()

  // Read filters from URL
  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || 'createdAt_desc'
  const q = searchParams.get('q') || undefined
  const minPrice = searchParams.get('minPrice') || undefined
  const maxPrice = searchParams.get('maxPrice') || undefined

  const [sortBy, sortOrder] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc']

  const { data, isLoading, isError, refetch } = api.product.list.useQuery({
    limit: 12,
    category,
    sortBy,
    sortOrder,
    q,
    // The backend now coerces these, so we can pass them as is.
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  })

  const products = data?.items || []
  const categoryName = products[0]?.category.name || 'Products'

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
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

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <aside className="lg:col-span-1">
          <FiltersSidebar />
        </aside>

        <main className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {category ? categoryName : 'All Products'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover scents that soothe, uplift, and transform.
            </p>
          </header>

          <div className="border-b pb-4 mb-6">
            <CategoryFilterBar />
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : `Showing ${products.length} products`}
            </p>
            <SortDropdown />
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  )
}
