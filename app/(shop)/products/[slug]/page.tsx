// app/(shop)/products/[slug]/page.tsx
'use client'

import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProductInfo } from '@/components/features/product/ProductInfo'
import { api } from '@/lib/api/trpc'

// Note: We cannot generate dynamic metadata in a Client Component.
// This would need to be handled in a parent layout if dynamic SEO is critical.

export default function ProductPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const { data: product, isLoading, error } = api.product.bySlug.useQuery(
    { slug },
    { enabled: !!slug }, // Only run query if slug is available
  )

  if (isLoading) {
    return <div className="container my-12 text-center">Loading...</div>
  }

  if (error || !product) {
    // If the query returns a NOT_FOUND error, use Next.js's notFound utility
    notFound()
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image Gallery Section */}
        <motion.div
          layoutId={`product-image-${product.id}`}
          className="relative aspect-square"
        >
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

        {/* Product Information Section */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}
