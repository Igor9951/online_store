'use server'

import { prisma } from '../lib/prisma'
import cloudinary from '../lib/cloudinary'

async function deleteFromCloudinary(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (err) {
    console.error('❌ Cloudinary delete error:', err)
  }
}

export async function createCategoryWithImage(formData) {
  const name = formData.get('name')?.toString().trim()
  const publicId = formData.get('image')?.toString() || null

  if (!name) return { success: false, message: 'Назва обовʼязкова' }

  try {
    await prisma.category.create({
      data: { name, image: publicId },
    })
    return { success: true, message: '✅ Категорія створена' }
  } catch (err) {
    return { success: false, message: '🚫 Помилка: ' + err.message }
  }
}

export async function getAllCategories() {
  return await prisma.category.findMany({ orderBy: { id: 'desc' } })
}

export async function updateCategory(formData) {
  const id = parseInt(formData.get('id'))
  const name = formData.get('name')?.toString().trim()
  const newPublicId = formData.get('image')?.toString() || null

  if (!id || !name) return { success: false, message: 'Неправильні дані' }

  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) return { success: false, message: 'Категорію не знайдено' }

  // Видаляємо старе фото, якщо є нове
  if (newPublicId && category.image && newPublicId !== category.image) {
    await deleteFromCloudinary(category.image)
  }

  await prisma.category.update({
    where: { id },
    data: {
      name,
      image: newPublicId || category.image,
    },
  })

  return { success: true, message: '✅ Оновлено' }
}

// Видалення категорії з фото
export async function deleteCategoryWithImage(id) {
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) return

  if (category.image) {
    await deleteFromCloudinary(category.image)
  }

  await prisma.category.delete({ where: { id } })
}