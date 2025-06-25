// app/(shop)/products/page.tsx
import { serverApi } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'

export const metadata = {
  title: 'All Products',
  description: 'Explore our full collection of premium, natural aromatherapy products.',
}

export default async function ProductsPage() {
  // Fetch data on the server using our tRPC server client
  const productListData = await serverApi.product.list.query({ limit: 12 })

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
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productListData.items.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
      {/* Pagination can be added here later */}
    </div>
  )
}
