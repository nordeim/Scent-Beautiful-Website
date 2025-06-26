// types/index.d.ts
import type { Product, ProductImage, ProductVariant } from '@prisma/client'

export type ProductCardType = Product & {
  variants: Pick<ProductVariant, 'id' | 'sku' | 'name' | 'price'>[]
  images: Pick<ProductImage, 'url' | 'altText'>[]
}

export interface CartItem {
  id: string // This will be the variant ID
  product: Pick<Product, 'id' | 'name' | 'slug'>
  variant: Pick<ProductVariant, 'id' | 'name' | 'price'>
  image: {
    url: string
    altText?: string | null
  }
  quantity: number
}
