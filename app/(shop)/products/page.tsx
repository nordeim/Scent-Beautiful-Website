// app/(shop)/products/page.tsx
import { ProductCard } from '@/components/features/product/ProductCard'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

export const metadata = {
  title: 'All Products',
  description: 'Explore our full collection of premium, natural aromatherapy products.',
}

export default async function ProductsPage() {
  // Create a server-side caller for tRPC
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)

  // Fetch data on the server using the caller
  const productListData = await caller.product.list({ limit: 12 })

  return (
    <div className="container py-10">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover scents that soothe, uplift, and transform. Each product is crafted with the
          purest ingredients to elevate your daily rituals.
        </p>
      </section>

      {productListData.items.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found. Please check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
          {productListData.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {/* Pagination can be added here later */}
    </div>
  )
}
