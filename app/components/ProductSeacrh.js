'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.trim()) {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
        setShowModal(true)
      } else {
        setShowModal(false)
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className="relative w-1/3 h-[25px] rounded-[11px] bg-white self-center flex ml-4">
      <Image
        src="dandruff.svg"
        width={20}
        height={20}
        alt="dandruff"
        className="pl-0.5 self-center"
      />
      <input
        type="text"
        placeholder="Пошук товарів..."
        className="ml-1 self-center text-xs bg-transparent outline-none w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showModal && (
        <div className="absolute top-7 left-0 z-10 bg-white border shadow-md rounded-md w-full max-h-60 overflow-auto">
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <CldImage
                  src={product.productImage?.[0]?.url || 'no-image.png'}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                  crop="fill"
                  gravity="auto"
                />
                <span className="text-sm">{product.name}</span>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">🔍 Не знайдено товарів</div>
          )}
        </div>
      )}
    </div>
  )
}