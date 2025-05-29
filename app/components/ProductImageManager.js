'use client'

import { CldImage, CldUploadButton } from 'next-cloudinary'
import { deleteProductImage, addProductImage } from './ProductAction'
import { useTransition } from 'react'

export default function ProductImageManager({ product }) {
  const [isPending, startTransition] = useTransition()

  const handleUpload = (result) => {
  const formData = new FormData()
  formData.set('productId', product.id)
  formData.set('image', result.info.public_id) 

  startTransition(() => {
    addProductImage(formData)
      .then(() => {
       window.location.reload();
      })
      .catch(console.error)
  })
}

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-lg font-semibold">Фото</h2>

      <div className="flex gap-4 flex-wrap">
        {product.productImage.map((img) => (
          <div key={img.id} className="relative w-24 h-24">
            <CldImage
              src={img.url} 
              alt="Фото"
              width={100}
              height={100}
              crop="fill"
              className="object-cover rounded"
            />
            <form action={deleteProductImage}>
              <input type="hidden" name="imageId" value={img.id} />
              <input type="hidden" name="productId" value={product.id} />
              <button
                type="submit"
                className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl"
              >
                🗑
              </button>
            </form>
          </div>
        ))}
      </div>

      <CldUploadButton
        uploadPreset="Product_photo"
        onSuccess={handleUpload}
        options={{ folder: 'products' }}
        className="bg-blue-600 text-white px-3 py-1 rounded inline-block cursor-pointer"
      >
        ➕ Додати фото
      </CldUploadButton>
    </div>
  )
}