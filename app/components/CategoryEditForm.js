'use client'

import { useState, useTransition } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import { updateCategory } from './categoryActions'

export default function CategoryEditForm({ category, refreshCategories }) {
  const [name, setName] = useState(category?.name || '')
  const [imageData, setImageData] = useState(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', category.id)
    formData.append('name', name)
    if (imageData?.public_id) {
      formData.append('image', imageData.public_id)
    }

    startTransition(() => {
      updateCategory(formData).then((res) => {
        setMessage(res.message)
        if (res.success) {
          setImageData(null)
          refreshCategories()
        }
      })
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border p-4 rounded bg-gray-50"
    >
      <label className="block font-medium text-sm">Назва</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border px-2 py-1 rounded"
      />

      <label className="block font-medium text-sm mt-2">Фото (оновити)</label>

      <CldUploadButton
        uploadPreset="Category_preset"
        onSuccess={(result) => setImageData(result.info)}
        options={{ multiple: false, resource_type: 'image' }}
        className="inline-block px-3 py-1 bg-gray-300 rounded cursor-pointer"
      >
        Завантажити нове фото
      </CldUploadButton>

      {(imageData || category.image) && (
        <div className="mt-2">
          <CldImage
            src={imageData?.public_id || category.image}
            alt={name}
            width={50}
            height={50}
            className="rounded"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        {isPending ? 'Збереження...' : '💾 Зберегти'}
      </button>

      {message && (
        <p
          className={`text-sm mt-2 text-center ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
