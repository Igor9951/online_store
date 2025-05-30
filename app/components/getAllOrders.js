'use server'

import { prisma } from '../lib/prisma';
import { auth } from './auth'


export async function getAllOrders() {
  const session = await auth()
  if (session?.role !== 'admin') {
    throw new Error('Доступ заборонено')
  }

  const orders = await prisma.orders.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      delivery: true,
      orderitem: {
        include: { product: true }
      }
    }
  })

  return orders
}