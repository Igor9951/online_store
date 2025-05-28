'use server'

import { prisma } from '../lib/prisma';

export async function searchProducts(query) {

  
  if (!query.trim()) return []

  return await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 10,
    include: { productImage: true },
  })
}