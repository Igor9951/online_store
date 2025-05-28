'use server'

import { prisma } from '../lib/prisma';


export async function placeOrder({
  cart,
  totalPrice,
  deliveryData,
  contactData, // для гостей
  userId       // для авторизованих
}) {
  if (!cart || cart.length === 0) {
    return {message:"Ви не обрали жодного товару!!!"}
  }

  // Формуємо дані замовлення
  const orderData = {
    totalPrice,
    status: 'pending',
    orderitem: {
      create: cart.map((item) => ({
        productId: item.id,
        quantity: item.count,
        price: item.price,
      })),
    },
    delivery: {
      create: {
        type: deliveryData.type,
        city: deliveryData.city,
        warehouse: deliveryData.warehouse,
      },
    },
  }

  // Якщо авторизований — додаємо userId
  if (userId) {
    orderData.userId = userId
  }

  // Якщо гість — додаємо контактні поля в таблицю order
  if (!userId && contactData) {
    orderData.firstName = contactData.firstName
    orderData.lastName = contactData.lastName
    orderData.phone = contactData.phone
    orderData.email = contactData.email
  }

  const order = await prisma.order.create({
    data: orderData,
  })

  return { success: true, orderId: order.id }
}
