'use server'

import { prisma } from '../lib/prisma';

export async function getProductsByCategory(categoryId, sort= 'newest') {
  let orderBy= { createdAt: 'desc' }

  if (sort === 'price-asc') orderBy = { price: 'asc' }
  if (sort === 'price-desc') orderBy = { price: 'desc' }
  if (sort === 'name-asc') orderBy = { name: 'asc' }
  if (sort === 'name-desc') orderBy = { name: 'desc' }

  const products = await prisma.product.findMany({
    where: { categoryId },
    orderBy,
    include: { productImage: true, category: true },
  })

  return products
}