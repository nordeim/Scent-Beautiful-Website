// Custom types for The Scent database models (extend as needed)
import type {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  ProductVariant,
  ProductImage,
  Wishlist,
  Coupon,
  Address,
  EmailSubscription,
} from '@prisma/client'

export type { User, Product, Category, Cart, CartItem, Order, OrderItem, Review, ProductVariant, ProductImage, Wishlist, Coupon, Address, EmailSubscription }

// Example: Extended type for product with variants and images
export interface ProductWithVariantsAndImages extends Product {
  variants: ProductVariant[]
  images: ProductImage[]
}
