// components/features/shop/FiltersSidebar.tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { Search } from 'lucide-react'
import { Input } from '@/components/common/Input' // Using the new Input component

export function FiltersSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleApplyFilters = (formData: FormData) => {
    const params = new URLSearchParams(searchParams)
    const minPrice = formData.get('minPrice') as string
    const maxPrice = formData.get('maxPrice') as string
    const searchQuery = formData.get('q') as string // Changed from 'searchQuery' to 'q'

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
          <Input
            name="q" // Changed from 'searchQuery' to 'q'
            type="search"
            defaultValue={searchParams.get('q') || ''}
            placeholder="Search..."
            className="pl-9 w-full"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            name="minPrice"
            type="number"
            defaultValue={searchParams.get('minPrice') || ''}
            placeholder="Min"
          />
          <span>-</span>
          <Input
            name="maxPrice"
            type="number"
            defaultValue={searchParams.get('maxPrice') || ''}
            placeholder="Max"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  )
}
