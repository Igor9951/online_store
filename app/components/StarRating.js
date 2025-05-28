'use client'

import { useEffect, useState } from 'react'
import { getAverageRating } from './reviewAction'

export default function StarRating({ productId }) {
  const [average, setAverage] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchRating = async () => {
      const { average, count } = await getAverageRating(productId)
      setAverage(average)
      setCount(count)
    }
    fetchRating()
  }, [productId])

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < Math.round(average) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.049 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.286-3.974z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {average.toFixed(1)} / 5 ({count})
      </span>
    </div>
  )
}