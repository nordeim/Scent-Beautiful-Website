// app/(shop)/products/page.tsx
import { FiltersSidebar } from '@/components/features/shop/FiltersSidebar'
import { CategoryFilterBar } from '@/components/features/shop/CategoryFilterBar'
import { SortDropdown } from '@/components/features/shop/SortDropdown'
import { ProductList } from '@/components/features/shop/ProductList'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'
import type { SerializableProduct } from '@/types'

export const metadata = {
  title: 'All Products',
  description: 'Explore our full collection of premium, natural aromatherapy products.',
}

export default async function ProductsPage() {
  // Fetch initial data on the server for fast loads and SEO
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const initialProductData = await caller.product.list({ limit: 12 })
  
  // The tRPC router already serializes the data, so it's safe to pass
  const initialProducts: SerializableProduct[] = initialProductData.items

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <aside className="lg:col-span-1">
          <FiltersSidebar />
        </aside>

        <main className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              Discover scents that soothe, uplift, and transform.
            </p>
          </header>
          
          <div className="border-b pb-4 mb-6">
            <CategoryFilterBar />
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {initialProducts.length} products
            </p>
            <SortDropdown />
          </div>
          
          {/* Pass initial data to the client component */}
          <ProductList initialProducts={initialProducts} />
        </main>
      </div>
    </div>
  )
}
