// types/index.d.ts
import type { Product as PrismaProduct, ProductImage, ProductVariant as PrismaProductVariant } from '@prisma/client'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'

// Generic type for all tRPC router outputs
type RouterOutputs = inferRouterOutputs<AppRouter>

// Base types inferred from the router
export type ProductListOutput = RouterOutputs['product']['list']
export type ProductBySlugOutput = RouterOutputs['product']['bySlug']

// Serializable types for Client Components
// These override the Decimal type with number for props
export type SerializableProductVariant = Omit<PrismaProductVariant, 'price'> & {
  price: number
}
export type SerializableProduct = Omit<PrismaProduct, 'price'> & {
  price: number
  variants: SerializableProductVariant[]
  images: Pick<ProductImage, 'url' | 'altText'>[]
}
export type ProductCardType = SerializableProduct


// This type remains useful for the cart store, which constructs its own objects
export interface CartItem {
  id: string // This will be the variant ID
  product: Pick<PrismaProduct, 'id' | 'name' | 'slug'>
  variant: {
    id: string
    name: string
    price: number
  }
  image: {
    url: string
    altText?: string | null
  }
  quantity: number
}
