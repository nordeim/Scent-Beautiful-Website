# app/(shop)/products/page.tsx
```tsx
// app/(shop)/products/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { ProductCard } from '@/components/features/product/ProductCard'
import { FiltersSidebar } from '@/components/features/shop/FiltersSidebar'
import { CategoryFilterBar } from '@/components/features/shop/CategoryFilterBar'
import { SortDropdown } from '@/components/features/shop/SortDropdown'

export default function ProductsPage() {
  const searchParams = useSearchParams()

  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || 'createdAt_desc'
  const [sortBy, sortOrder] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc']
  
  const { data, isLoading, isError } = api.product.list.useQuery({
    limit: 12,
    category,
    sortBy,
    sortOrder,
  })

  // The data is already serializable, so we can use it directly.
  const products = data?.items || []
  const categoryName = products[0]?.category.name || 'Products'

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <aside className="lg:col-span-1">
          <FiltersSidebar />
        </aside>

        <main className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {category ? categoryName : 'All Products'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover scents that soothe, uplift, and transform.
            </p>
          </header>
          
          <div className="border-b pb-4 mb-6">
            <CategoryFilterBar />
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
            <SortDropdown />
          </div>

          {isLoading && <p>Loading products...</p>}
          {isError && <p>Could not load products. Please try again later.</p>}
          
          {!isLoading && !isError && products.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No Products Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

```

# components/features/shop/SortDropdown.tsx
```tsx
// components/features/shop/SortDropdown.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function SortDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'createdAt_desc'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-muted-foreground">Sort by:</label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="input-style text-sm py-1"
      >
        <option value="createdAt_desc">Latest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  )
}

```

# components/features/shop/CategoryFilterBar.tsx
```tsx
// components/features/shop/CategoryFilterBar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { api } from '@/lib/api/trpc'
import { cn } from '@/lib/utils'

export function CategoryFilterBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const { data: categories, isLoading } = api.product.getCategoryList.useQuery() // We'll need to create this procedure

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    return params.toString()
  }

  if (isLoading || !categories) {
    return <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-md animate-pulse" />
  }

  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-2 items-center">
      <Link
        href={pathname}
        className={cn('px-3 py-1 text-sm rounded-full transition-colors',
          !currentCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
        )}
      >
        All Products
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`${pathname}?${createQueryString('category', cat.slug)}`}
          className={cn('px-3 py-1 text-sm rounded-full transition-colors',
            currentCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
          )}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}

```

# components/features/shop/FiltersSidebar.tsx
```tsx
// components/features/shop/FiltersSidebar.tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { Search } from 'lucide-react'

export function FiltersSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleApplyFilters = (formData: FormData) => {
    const params = new URLSearchParams(searchParams)
    const minPrice = formData.get('minPrice') as string
    const maxPrice = formData.get('maxPrice') as string
    const searchQuery = formData.get('searchQuery') as string

    if (minPrice) params.set('minPrice', minPrice)
    else params.delete('minPrice')
    if (maxPrice) params.set('maxPrice', maxPrice)
    else params.delete('maxPrice')
    if (searchQuery) params.set('q', searchQuery)
    else params.delete('q')

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form action={handleApplyFilters} className="space-y-6 sticky top-24">
      <div>
        <h3 className="font-semibold mb-2">Search Products</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            name="searchQuery"
            type="search"
            defaultValue={searchParams.get('q') || ''}
            placeholder="Search..."
            className="input-style pl-9 w-full"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            name="minPrice"
            type="number"
            defaultValue={searchParams.get('minPrice') || ''}
            placeholder="Min"
            className="input-style w-full"
          />
          <span>-</span>
          <input
            name="maxPrice"
            type="number"
            defaultValue={searchParams.get('maxPrice') || ''}
            placeholder="Max"
            className="input-style w-full"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  )
}

```

# server/routers/product.ts
```ts
// server/routers/product.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

// Helper function to serialize product data, converting Decimal to number
const serializeProduct = (product: any) => ({
  ...product,
  price: product.price.toNumber(),
  variants: product.variants.map((variant: any) => ({
    ...variant,
    price: variant.price.toNumber(),
  })),
});

export const productRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        cursor: z.string().nullish(),
        category: z.string().optional(),
        sortBy: z.enum(['createdAt', 'price']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        searchQuery: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, category, sortBy, sortOrder, minPrice, maxPrice, searchQuery } = input
      
      const whereClause: any = { isActive: true };
      if (category) whereClause.category = { slug: category };
      if (minPrice !== undefined || maxPrice !== undefined) {
        whereClause.price = {};
        if (minPrice !== undefined) whereClause.price.gte = minPrice;
        if (maxPrice !== undefined) whereClause.price.lte = maxPrice;
      }
      if (searchQuery) {
        whereClause.OR = [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ];
      }
      
      const products = await ctx.prisma.product.findMany({
        take: limit + 1,
        where: whereClause,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: { select: { name: true, slug: true } },
          variants: { orderBy: { price: 'asc' }, take: 1 },
          images: { where: { isPrimary: true }, take: 1 },
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (products.length > limit) {
        const nextItem = products.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: products.map(serializeProduct),
        nextCursor,
      }
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: { slug: input.slug, isActive: true },
        include: {
          variants: true,
          images: true,
          reviews: { include: { user: { select: { firstName: true, avatarUrl: true } } } },
          category: true,
          brand: true,
        },
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with slug "${input.slug}" not found.`,
        })
      }

      return serializeProduct(product);
    }),

  getRelated: publicProcedure
    .input(z.object({
      categoryId: z.string(),
      currentProductId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: 4,
        where: {
          isActive: true,
          categoryId: input.categoryId,
          id: { not: input.currentProductId },
        },
        include: {
          variants: { orderBy: { price: 'asc' }, take: 1 },
          images: { where: { isPrimary: true }, take: 1 },
        },
      });
      return products.map(serializeProduct);
    }),
  
  getCategoryList: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
      })
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        slug: z.string().min(3),
        sku: z.string().min(3),
        description: z.string().optional(),
        price: z.number(),
        categoryId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.session.user
      if (role !== 'admin' && role !== 'staff') {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          slug: input.slug,
          sku: input.sku,
          description: input.description,
          price: input.price,
          categoryId: input.categoryId,
        },
      })
      return product
    }),
});

```

