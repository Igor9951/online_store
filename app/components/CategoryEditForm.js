'use client'

import { useState, useTransition } from 'react'
import { updateCategory } from './categoryActions'


export default function CategoryEditForm({ category }) {
  const [name, setName] = useState(category?.name || '')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(category)
    const formData = new FormData()
    formData.append('id', category.id)
    formData.append('name', name)
    if (image) formData.append('image', image)

    startTransition(() => {
      updateCategory(formData).then((res) => {
        if (res.success) {
          setMessage('✅ Категорію оновлено успішно')
        } else {
          setMessage('❌ Помилка: ' + res.message)
        }
      })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded max-w-md">
      <label className="block text-sm font-medium">Назва</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border px-2 py-1 rounded"
      />

      <label className="block text-sm font-medium mt-2">Фото (оновити)</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full border px-2 py-1 rounded"
      />

      <button
        type="submit"
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'Збереження...' : '💾 Зберегти'}
      </button>

      {message && (
        <p className="text-sm mt-2 font-medium text-center text-green-600">
          {message}
        </p>
      )}
    </form>
  )
}