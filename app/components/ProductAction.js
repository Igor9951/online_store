'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import cloudinary from '../lib/cloudinary'

export async function updateProductField(id, field, value) {
  const data = {
    [field]: ['price', 'stock'].includes(field)
      ? parseInt(value, 10)
      : value.toString(),
  }

  const _id = parseInt(id, 10)
  await prisma.product.update({ where: { id: _id }, data })
  revalidatePath('/')
}

export async function deleteProduct(id) {
  const images = await prisma.productimage.findMany({ where: { productId: id } })

  for (const img of images) {
    await cloudinary.uploader.destroy(img.url).catch(() => {})
  }

  await prisma.productimage.deleteMany({ where: { productId: id } })
  await prisma.product.delete({ where: { id } })

  redirect('/')
}

export async function addProductImage(formData) {
  const publicId = formData.get('image')  
  const productId = Number(formData.get('productId'))

  if (!publicId || !productId) {
    throw new Error('Неправильні дані')
  }

  await prisma.productimage.create({
    data: {
      url: publicId,  
      product: { connect: { id: productId } },
    },
  })
}

export async function deleteProductImage(formData) {
  const imageId = parseInt(formData.get('imageId'), 10)
  const productId = parseInt(formData.get('productId'), 10)

  if (!imageId || !productId) throw new Error('Невірні дані')

  const image = await prisma.productimage.findUnique({
    where: { id: imageId },
  })

  if (image?.url) {
    await cloudinary.uploader.destroy(image.url).catch(() => {})
  }

  await prisma.productimage.delete({ where: { id: imageId } })
  revalidatePath(`/product/${productId}`)
}