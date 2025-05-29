'use client'

import { useState, useEffect, useTransition } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import {
  createCategoryWithImage,
  deleteCategoryWithImage,
  getAllCategories,
} from './categoryActions'
import CategoryEditForm from './CategoryEditForm'

export default function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [isPending, startTransition] = useTransition()
  const [imageData, setImageData] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    refreshCategories()
  }, [])

  const refreshCategories = () => {
    getAllCategories().then(setCategories)
  }

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
      <form
        action={async (formData) => {
          if (imageData?.public_id) {
            formData.set('image', imageData.public_id)
          }
          const res = await createCategoryWithImage(formData)
          setImageData(null)
          refreshCategories()
          setMessage(res.message)
          return res
        }}
        className="space-y-3 border p-4 rounded bg-gray-50"
      >
        <input
          type="text"
          name="name"
          placeholder="Назва категорії"
          required
          className="border px-3 py-2 rounded w-full"
        />

        <CldUploadButton
          uploadPreset="Category_preset"
          onSuccess={(result) => setImageData(result.info)}
          options={{ multiple: false, resource_type: 'image' }}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Завантажити зображення
        </CldUploadButton>

        {imageData && (
          <div className="mt-2">
            <CldImage
              src={imageData.public_id}
              width={50}
              height={50}
              alt="Превʼю"
              className="rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Створити
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id}>
            <CategoryEditForm category={cat} refreshCategories={refreshCategories} />

            <div className="border rounded p-3 flex items-center gap-4 bg-white mt-2">
              {cat.image ? (
                <CldImage
                  src={cat.image}
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
                  if (
                    confirm(
                      '⚠️ Усі продукти цієї категорії будуть видалені. Ви впевнені?'
                    )
                  ) {
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