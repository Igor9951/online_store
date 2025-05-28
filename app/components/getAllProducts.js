
import { prisma } from '../lib/prisma';

export async function getAllProducts() {
  return await prisma.product.findMany({
    include:{
      productImage:true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
