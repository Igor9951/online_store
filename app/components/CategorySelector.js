'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CategorySelector({ categories }) {
  const router = useRouter()

  const handleClick = (categoryId) => {
    router.push(`/category/${categoryId}`)
  }

  return (
    <div className="mt-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Категорії</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border-2 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleClick(cat.id)}
          >
        
            <div className="flex flex-col items-center gap-2">
              <Image
                src={cat.image ? `/${cat.image}` : null }
                width={40}
                height={40}
                alt={cat.name}
              />
              <p className="font-semibold text-gray-700">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}