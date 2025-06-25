// types/index.d.ts
import type { Product, ProductImage, ProductVariant } from '@prisma/client'

export type ProductCardType = Product & {
  variants: Pick<ProductVariant, 'price'>[]
  images: Pick<ProductImage, 'url' | 'altText'>[]
}
