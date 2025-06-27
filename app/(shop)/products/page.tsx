// app/(shop)/products/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'
import { FiltersSidebar } from '@/components/features/shop/FiltersSidebar'
import { CategoryFilterBar } from '@/components/features/shop/CategoryFilterBar'
import { SortDropdown } from '@/components/features/shop/SortDropdown'

export default function ProductsPage() {
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || 'createdAt_desc'
  const [sortBy, sortOrder] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc']
  
  const { data, isLoading, isError } = api.product.list.useQuery({
    limit: 12,
    category,
    sortBy,
    sortOrder,
  })

  // The data is already serializable, so we can use it directly.
  const products = data?.items || []
  const categoryName = products[0]?.category.name || 'Products'

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
              Showing {products.length} products
            </p>
            <SortDropdown />
          </div>

          {isLoading && <p>Loading products...</p>}
          {isError && <p>Could not load products. Please try again later.</p>}
          
          {!isLoading && !isError && products.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No Products Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
