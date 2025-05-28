'use server'

import { prisma } from '../lib/prisma';
import { auth } from './auth'

export async function getUserOrders() {
  const session = await auth()

  if (!session?.id) throw new Error('Користувач не авторизований')

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'desc' },
    include: {
      delivery: true,
      orderitem: { include: { product: true } }
    }
  })

  return orders
}