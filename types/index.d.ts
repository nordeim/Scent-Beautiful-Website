// types/index.d.ts
import type { Product as PrismaProduct, ProductImage, ProductVariant } from '@prisma/client'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'

// Generic type for all tRPC router outputs
type RouterOutputs = inferRouterOutputs<AppRouter>

// Specific type for the output of the 'product.list' procedure
export type ProductListOutput = RouterOutputs['product']['list']
// Specific type for a single item within the product list
export type ProductCardType = ProductListOutput['items'][number]

// Specific type for the output of the 'product.bySlug' procedure
export type ProductBySlugOutput = RouterOutputs['product']['bySlug']


// This type remains useful for the cart store, which constructs its own objects
export interface CartItem {
  id: string // This will be the variant ID
  product: Pick<PrismaProduct, 'id' | 'name' | 'slug'>
  variant: Pick<ProductVariant, 'id' | 'name' | 'price'>
  image: {
    url: string
    altText?: string | null
  }
  quantity: number
}
