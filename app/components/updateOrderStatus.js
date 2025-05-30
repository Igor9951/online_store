'use server'

import { prisma } from '../lib/prisma';
import { auth } from './auth'


export async function updateOrderStatus(orderId, status) {
  const session = await auth()
  if (session?.role !== 'admin') {
    throw new Error('Доступ заборонено')
  }

  await prisma.orders.update({
    where: { id: orderId },
    data: { status }
  })

  return { success: true }
}