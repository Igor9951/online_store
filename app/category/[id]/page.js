
import ProductCard from "@/app/components/ProductCard"
import { getProductsByCategory } from "@/app/components/getProductsByCategory"
import CategorySortSelector from "@/app/components/CategorySortSelector"

export default async function CategoryPage({searchParams,params}) {

  const sort = searchParams?.sort || 'newest'
  const param=await params
  const categoryId = parseInt(param.id, 10)
  const products =await getProductsByCategory(categoryId,sort)


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Товари категорії</h1>
      <CategorySortSelector />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product,key) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <ProductCard key={key} product={product}></ProductCard>
          </div>
        ))}
      </div>
    </div>
  )
}