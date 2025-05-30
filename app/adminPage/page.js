import { prisma } from '../lib/prisma';
import AdminPageClient from '../components/adminPageClient';
import CategoryManager from '../components/CategoryManager';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  return <div>
    <AdminPageClient categories={categories} />
    <CategoryManager categories={categories} />
  </div>
}