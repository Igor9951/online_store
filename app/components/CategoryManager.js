'use client'

import { useActionState, useEffect, useState, useTransition } from 'react'
import Image from 'next/image'

// Server Actions
import { createCategoryWithImage, deleteCategoryWithImage, getAllCategories } from './categoryActions'
import CategoryEditForm from './CategoryEditForm'

export default function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(createCategoryWithImage, { success: false, message: '' })

  // Завантаження категорій
  useEffect(() => {
    refreshCategories()
  }, [])

  const refreshCategories = () => {
    getAllCategories().then(setCategories)
  }

  // Видалення категорії
  const handleDelete = (id) => {
    if (confirm('Видалити категорію?')) {
      startTransition(async () => {
        await deleteCategoryWithImage(id)
        refreshCategories()
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Керування категоріями</h1>

      {/* Форма додавання */}
      <form action={async (formData) => {
        const res = await createCategoryWithImage(formData)
        refreshCategories()
        return res
      }} className="space-y-3 border p-4 rounded bg-gray-50">
        <input
          type="text"
          name="name"
          placeholder="Назва категорії"
          required
          className="border px-3 py-2 rounded w-full"
        />
        <input type="file" name="image" accept="image/*" className="block" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Створити
        </button>
        {state.message && (
          <p className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}
      </form>

      {/* Список категорій */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat,id) => (
          <div key={id}><div>
            <CategoryEditForm key={id} category={cat} />
          </div>
          <div key={cat.id} className="border rounded p-3 flex items-center gap-4 bg-white">
            {cat.image ? (
              <Image
                src={`/${cat.image}`}
                alt={cat.name}
                width={50}
                height={50}
                className="object-cover rounded"
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-gray-200 rounded" />
            )}
            <span className="flex-1">{cat.name}</span>
           <button
  onClick={() => {
    if (confirm('⚠️ Усі продукти цієї категорії будуть видалені. Ви впевнені?')) {
      startTransition(async () => {
        await deleteCategoryWithImage(cat.id)
        refreshCategories()
      })
    }
  }}
  disabled={isPending}
  className="text-sm text-red-600 hover:underline"
>
  🗑 Видалити
</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}