'use server'

import { prisma } from '../lib/prisma';
import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { writeFile } from 'fs/promises'
import { redirect } from 'next/navigation'


export async function updateProductField(id, field, value) {
  const data = { [field]: field === 'price' || field === 'stock' ? parseInt(value,10) : parseInt(value,10)}
  const _id=parseInt(id,10)
  await prisma.product.update({ where: { id:_id }, data })
  revalidatePath('/')
}

export async function deleteProduct(id) {
  const images = await prisma.productImage.findMany({ where: { productId: id } })
  for (const img of images) {
    await fs.unlink(path.join(process.cwd(), 'public', 'uploads', img.url)).catch(() => {})
  }

  await prisma.productImage.deleteMany({ where: { productId: id } })
  await prisma.product.delete({ where: { id } })
  redirect('/')
}


export async function addProductImage(formData) {
  const file = formData.get('image')
  const productId = Number(formData.get('productId'))

  if (!file || !file.name || !productId) {
    throw new Error('Неправильні дані')
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}_${file.name}`
  const filePath = path.join(process.cwd(), 'public/uploads', fileName)

  await writeFile(filePath, buffer)

  await prisma.productImage.create({
    data: {
      url: fileName,
      product: { connect: { id: productId } },
    },
  })

  revalidatePath(`/product/${formData.get('productId')}`)
}

export async function deleteProductImage(formData) {
  const imageId = parseInt(formData.get('imageId'),10)

  if (!imageId) throw new Error('Image ID не вказано')

  await db.productImage.delete({
    where: { id: imageId },
  })

  revalidatePath(`/product/${formData.get('productId')}`)
}