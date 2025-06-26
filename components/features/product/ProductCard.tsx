// components/features/product/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'
import { serverApi } from '@/lib/api/trpc'
import { useCart } from '@/hooks/use-cart'

type ProductListOutput = Awaited<ReturnType<typeof serverApi.product.list.query>>
export type ProductCardType = ProductListOutput['items'][number]

interface ProductCardProps {
  product: ProductCardType
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, setDrawerOpen } = useCart()
  const primaryImage = product.images?.[0]
  const primaryVariant = product.variants?.[0]
  const displayPrice = primaryVariant?.price ?? product.price

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!primaryVariant) {
      // Handle case where product might not have variants properly
      console.error('No variant found for product:', product.name)
      return
    }

    addItem({
      id: primaryVariant.id,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
      },
      variant: {
        id: primaryVariant.id,
        name: primaryVariant.name,
        price: displayPrice,
      },
      image: {
        url: primaryImage?.url || '/placeholder.jpg',
        altText: primaryImage?.altText,
      },
    })
    setDrawerOpen(true)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className={cn('overflow-hidden transition-shadow duration-300 hover:shadow-xl', className)}>
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={primaryImage?.url || '/placeholder.jpg'}
              alt={primaryImage?.altText || product.name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-medium truncate">{product.name}</CardTitle>
          <p className="mt-2 text-xl font-semibold">${displayPrice.toString()}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="secondary" className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
