'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function addProduct(data) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseInt(data.price,10),
        stock: parseInt(data.stock,10),
        categoryId: parseInt(data.categoryId,10),
        productImage: {
          create: data.imageUrls.map((publicId) => ({ url: publicId })),
        },
      },
      include: {
        productImage: true,
      },
    });

    revalidatePath('/'); 
    return { success: true, product };
  } catch (error) {
    console.error('❌ Помилка при додаванні продукту:', error);
    return { success: false, message: 'Не вдалося додати товар.' };
  }
}