// components/features/shop/SortDropdown.tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SORT_OPTIONS } from '@/lib/config/shop'

export function SortDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || SORT_OPTIONS.LATEST

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
        <option value={SORT_OPTIONS.LATEST}>Latest</option>
        <option value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</option>
        <option value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</option>
      </select>
    </div>
  )
}
