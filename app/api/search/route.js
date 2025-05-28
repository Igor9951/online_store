import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(req) {

  const db=new PrismaClient()
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''

  if (!query.trim()) return NextResponse.json([])

  const results = await db.product.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    take: 10,
    include: { productImage: true },
  })

  return NextResponse.json(results)
}