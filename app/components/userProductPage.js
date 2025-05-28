'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReviewForm from '@/app/components/ReviewForm';
import StarRating from './StarRating';
import ProductReviews from './ProductReview';

export default function UserProductPage({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (url) => setSelectedImage(url);
  const closeImage = () => setSelectedImage(null);

  return (
    
    <div className="max-w-6xl mx-auto px-4 py-10">
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div className="relative w-[90%] max-w-3xl h-[90%]">
            <Image
              src={`/uploads/${selectedImage}`}
              alt="Збільшене фото"
              fill
              className="object-contain rounded-xl"
            />
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 hover:bg-black/70 px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        <div className="flex flex-col gap-6">
        
          <div
            className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg border cursor-pointer"
            onClick={() => product.productImage?.[0] && openImage(product.productImage[0].url)}
          >
            <Image
              src={
                product.productImage?.[0]?.url
                  ? `/uploads/${product.productImage[0].url}`
                  : '/no-image.png'
              }
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

    
          {product.productImage.length > 1 && (
            <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
              {product.productImage.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border hover:scale-105 transition cursor-pointer"
                  onClick={() => openImage(img.url)}
                >
                  <Image
                    src={`/uploads/${img.url}`}
                    alt={`Фото ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <StarRating productId={product.id}></StarRating>
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="text-2xl font-semibold text-blue-600">
            {product.price} ₴
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <div>
              <span className="font-medium text-gray-600">Категорія:</span>{' '}
              {product.category.name}
            </div>
            <div>
              <span className="font-medium text-gray-600">Наявність:</span>{' '}
              {product.stock > 0 ? `${product.stock} шт.` : 'Немає в наявності'}
            </div>
          </div>

          <button
            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => console.log('Додано до кошика')}
          >
            🛒 Додати до кошика
          </button>
        </div>
      </div>
      <ReviewForm productId={product.id} />
      <ProductReviews productId={product.id}></ProductReviews>
    </div>
  );
}