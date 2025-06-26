// components/features/product/ProductInfo.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { useCart } from '@/hooks/use-cart'
import { Minus, Plus } from 'lucide-react'
import type { ProductBySlugOutput } from '@/types'

interface ProductInfoProps {
  product: NonNullable<ProductBySlugOutput>
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, setDrawerOpen } = useCart()
  const [quantity, setQuantity] = useState(1)

  const primaryVariant = product.variants?.[0]
  const primaryImage = product.images?.[0]

  const handleAddToCart = () => {
    if (!primaryVariant) {
      console.error('No variant selected for product:', product.name)
      return
    }

    addItem(
      {
        id: primaryVariant.id,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
        },
        variant: {
          id: primaryVariant.id,
          name: primaryVariant.name,
          price: primaryVariant.price,
        },
        image: {
          url: primaryImage?.url || '/placeholder.jpg',
          altText: primaryImage?.altText,
        },
      },
      quantity,
    )
    setDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-4xl font-bold tracking-tight">{product.name}</h1>
      <p className="text-3xl">${product.price.toString()}</p>
      <p className="text-base text-muted dark:text-dark-muted">{product.shortDescription}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-11 w-11"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button size="lg" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <div className="prose prose-sm mt-4 text-muted dark:text-dark-muted max-w-none">
          {product.description}
        </div>
      </div>
    </div>
  )
}
