'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContex';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  console.log(product)
  const imageUrl = product.productImage?.[0]?.url
    ? `/uploads/${product.productImage[0].url}`
    : '/no-image.png';

 const { addToCart } = useCart()


  return <div>
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/product/${product.id}`}>
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold text-lg">{product.price}₴</span>
          <span className="text-sm text-gray-500"><span><StarRating productId={product.id}></StarRating></span>На складі: {product.stock}</span>
        </div>
      </div>
      </Link>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition w-full" onClick={() => addToCart(product)} >
            🛒 Додати в кошик
          </button>
      </div>
    </div>
}