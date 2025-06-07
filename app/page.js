
import Header from "./components/header";
import { auth } from "./components/auth";
import ProductCard from "./components/ProductCard";
import CategorySelector from "./components/CategorySelector";
import { getCategories } from "./components/getCategories";
import ProductSortSelector from "./components/Sort";
import { getProductsBySort } from "./components/getProductsBySort";
import Footer from "./components/Footer";
import { headers } from 'next/headers'

export default async function Home() {
  const headersList = await headers();
  const referer = headersList.get('referer');
  const fullUrl = referer || 'http://localhost:3000';
  const url = new URL(fullUrl);
  const sort = url.searchParams.get('sort') || 'newest';
  const userAuth = await auth();
  const products = await getProductsBySort(sort);
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <Header userAuth={userAuth} />

      <main className="flex-grow">
        <CategorySelector categories={categories} />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <ProductSortSelector />
          <h1 className="text-3xl font-bold mb-6">Усі товари</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, key) => (
              <ProductCard key={key} product={product} userAuth={userAuth} />
            ))}
          </div>
        </div>
      </main>

      <Footer userAuth={userAuth} />
    </div>
  );
}
