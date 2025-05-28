'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function CategorySortSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') || 'newest'

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-4">
      <select
        value={current}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      >
        <option value="newest">Нові спочатку</option>
        <option value="price-asc">Ціна: зростання</option>
        <option value="price-desc">Ціна: спадання</option>
        <option value="name-asc">Назва: A → Z</option>
        <option value="name-desc">Назва: Z → A</option>
      </select>
    </div>
  )
}