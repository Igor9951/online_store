'use server'

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache'
import { auth } from './auth';
import { redirect } from 'next/navigation';

export async function addReview(productId, formData) {
  const session = await auth()
  if (!session) {
    redirect('/LogIn')
  }

  const comment = formData.get('comment')?.toString() || ''
  const rating = Number(formData.get('rating'))

  if (!comment || !rating) throw new Error('Invalid data')
    console.log('session')
  console.log(session)
  await prisma.review.create({
    data: {
      productId,
      userId: session.id,
      comment,
      rating,
    },
  })

  revalidatePath(`/product/${productId}`)
}

export async function getAverageRating(productId) {

  const result = await prisma.review.aggregate({
    where: { productId },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  })

  return {
    average: result._avg.rating ?? 0,
    count: result._count.rating,
  }
}

export async function getProductReviews(productId) {
  return await prisma.review.findMany({
    where: { productId },
    include: {
      user: true, // щоб показати ім'я користувача
    },
    orderBy: { createdAt: 'desc' },
  })
}