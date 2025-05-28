import { addProductImage, deleteProductImage } from './ProductAction'
import Image from 'next/image'

export default function ProductImageManager({ product }) {
  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-lg font-semibold">Фото</h2>

      <div className="flex gap-4 flex-wrap">
        {product.productImage.map((img) => (
          <div key={img.id} className="relative w-24 h-24">
            <Image
              src={`/uploads/${img.url}`}
              alt="Фото"
              fill
              className="object-cover rounded"
            />
            <form action={deleteProductImage}>
              <input type="hidden" name="imageId" value={img.id} />
              <button className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl">🗑</button>
            </form>
          </div>
        ))}
      </div>

      <form action={addProductImage}  className="flex gap-2 items-center">
        <input type="file" name="image" required className="border rounded px-2 py-1" />
        <input type="hidden" name="productId" value={product.id} />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">➕ Додати фото</button>
      </form>
    </div>
  )
}