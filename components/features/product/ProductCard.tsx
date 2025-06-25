// components/features/product/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import type { ProductCardType } from '@/types'

interface ProductCardProps {
  product: ProductCardType
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // In a future step, this will call a "useCart" hook.
    console.log(`Adding ${product.name} to cart.`)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className={cn('overflow-hidden transition-shadow hover:shadow-lg', className)}>
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <Image
              src={primaryImage?.url || '/placeholder.jpg'}
              alt={primaryImage?.altText || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
          <p className="mt-2 text-xl font-semibold">
            ${primaryVariant?.price.toString() ?? product.price.toString()}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
