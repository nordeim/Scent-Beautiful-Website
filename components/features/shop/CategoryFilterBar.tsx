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
