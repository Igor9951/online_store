'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductSortSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') || 'newest'

  const handleChange = (e) => {
    const sort = e.target.value
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="mb-4">
      <select
        value={current}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      >
        <option value="newest">Сортувати: Нові спочатку</option>
        <option value="price-asc">Ціна: зростання</option>
        <option value="price-desc">Ціна: спадання</option>
        <option value="name-asc">Назва: A → Z</option>
        <option value="name-desc">Назва: Z → A</option>
      </select>
    </div>
  )
}
