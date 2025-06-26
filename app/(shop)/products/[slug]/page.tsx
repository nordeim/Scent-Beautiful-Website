// app/(shop)/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { ProductInfo } from '@/components/features/product/ProductInfo'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/context'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const product = await caller.product.bySlug({ slug: params.slug })

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.shortDescription || product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const product = await caller.product.bySlug({ slug: params.slug })

  if (!product) {
    notFound()
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image Gallery Section */}
        <div className="relative aspect-square">
          {product.images?.[0]?.url && (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          )}
        </div>

        {/* Product Information Section */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}
