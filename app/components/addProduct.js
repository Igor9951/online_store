'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function addProduct(data) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        productImage: {
          create: data.imageUrls.map((url) => ({ url })),
        },
      },
      include: {
        productImage: true,
      },
    });

    revalidatePath('/'); // оновлення кешу (якщо треба)
    return { success: true, product };
  } catch (error) {
    console.error('❌ Помилка при додаванні продукту:', error);
    return { success: false, message: 'Не вдалося додати товар.' };
  }
}