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
