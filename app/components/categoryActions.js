'use server'

import { prisma } from '../lib/prisma';
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

// Створення
export async function createCategoryWithImage(formData) {
  const name = formData.get('name')?.toString().trim()
  const file = formData.get('image')

  if (!name) return { success: false, message: 'Назва обовʼязкова' }

  let imagePath= null

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${randomUUID()}-${file.name}`
    const filepath = path.join(process.cwd(), 'public/uploads/category', filename)
    await writeFile(filepath, buffer)
    imagePath = `/uploads/category/${filename}`
  }

  try {
    await prisma.category.create({
      data: {
        name,
        image: imagePath,
      },
    })
    return { success: true, message: '✅ Категорія створена' }
  } catch (err) {
    return { success: false, message: '🚫 Помилка: ' + err.message }
  }
}

// Видалення
export async function deleteCategoryWithImage(id) {
  const db=new PrismaClient()
 const category = await prisma.category.findUnique({
    where: { id: id},
    include: {
      product: {
        include: { productImage: true },
      },
    },
  })

  if (!category) return

  // 1. Видалити всі фото продуктів
  for (const product of category.product) {
    for (const image of product.productImage) {
      const filePath = path.join(process.cwd(), 'public/uploads', image.url)
      await unlink(filePath).catch(() => {}) // ігнорувати, якщо файл не існує
    }

    // 2. Видалити записи з таблиці productImage
    await prisma.productImage.deleteMany({
      where: { productId: product.id },
    })
  }

  // 3. Видалити самі продукти
  await prisma.product.deleteMany({
    where: { categoryId:id },
  })

  // 4. Видалити зображення самої категорії (якщо є)
  if (category.image) {
    const catImagePath = path.join(process.cwd(), 'public', category.image)
    await unlink(catImagePath).catch(() => {})
  }

  // 5. Видалити категорію
  await prisma.category.delete({
    where: { id: id },
  })
}

// Отримання
export async function getAllCategories() {
  const db=new PrismaClient()
  return db.category.findMany({ orderBy: { id: 'desc' } })
}

export async function updateCategory(formData) {
  const db=new PrismaClient()
  const id = parseInt(formData.get('id'),10)
  const name = formData.get('name')?.toString().trim()
  const file = formData.get('image')

  console.log(id)

  if (!id || !name) return { success: false, message: 'Неправильні дані' }

  const category = await db.category.findUnique({ where: { id } })
  if (!category) return { success: false, message: 'Категорію не знайдено' }

  let imagePath = category.image

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name}`
    const savePath = path.join(process.cwd(), 'public/uploads/category', fileName)
    await writeFile(savePath, buffer)

    // видалити старе фото
    if (category.image) {
      const oldPath = path.join(process.cwd(), 'public/uploads/category', category.image)
      await unlink(oldPath).catch(() => {})
    }

    imagePath = `uploads/category/${fileName}`
  }

  await db.category.update({
    where: { id },
    data: {
      name,
      image: imagePath,
    },
  })

  return { success: true }
}