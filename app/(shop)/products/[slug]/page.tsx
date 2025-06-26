// app/(shop)/products/[slug]/page.tsx
'use client'

import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProductInfo } from '@/components/features/product/ProductInfo'
import { api } from '@/lib/api/trpc'
import { RelatedProducts } from '@/components/features/product/RelatedProducts'
import { Product3DViewer } from '@/components/features/product/Product3DViewer'

export default function ProductPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const { data: product, isLoading, error } = api.product.bySlug.useQuery(
    { slug },
    { enabled: !!slug },
  )

  if (isLoading) {
    return <div className="container my-12 text-center">Loading Product...</div>
  }

  if (error || !product) {
    notFound()
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image / 3D Viewer Section */}
        <div className="relative aspect-square">
          {product.modelUrl ? (
            <Product3DViewer modelUrl={product.modelUrl} />
          ) : (
            <motion.div layoutId={`product-image-${product.id}`} className="relative h-full w-full">
              {product.images?.[0]?.url && (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              )}
            </motion.div>
          )}
        </div>

        {/* Product Information Section */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
      
      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  )
}
