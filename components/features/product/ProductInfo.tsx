// components/features/product/ProductInfo.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { serverApi } from '@/lib/api/trpc'

type Product = Awaited<ReturnType<typeof serverApi.product.bySlug.query>>

interface ProductInfoProps {
  product: NonNullable<Product>
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // In a future step, this will call a "useCart" hook with the selected variant and quantity
    console.log(`Adding ${quantity} of ${product.name} to cart.`)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <p className="text-3xl">${product.price.toString()}</p>
      <p className="text-base text-muted-foreground">{product.shortDescription}</p>

      <div className="mt-6 flex items-center gap-4">
        {/* Quantity selector can be added here */}
        <Button size="lg" onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <div className="prose prose-sm mt-4 text-muted-foreground">{product.description}</div>
      </div>
    </div>
  )
}
