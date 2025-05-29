'use client'

import { useCart } from './CartContex'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/navigation'

export default function CartModal({ onClose }) {
  const { cartItems, updateQuantity, removeFromCart, totalSum } = useCart()
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[500px] rounded-lg p-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Кошик</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center">Кошик порожній</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center gap-3">
                {item.productImage?.[0]?.url ? (
                  <CldImage
                    src={item.productImage[0].url}
                    width={50}
                    height={50}
                    alt={item.name}
                    className="object-cover rounded"
                  />
                ) : (
                  <img
                    src="/no-image.png"
                    width={50}
                    height={50}
                    alt={item.name}
                    className="object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price} грн</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.count}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value,10))}
                  className="w-14 border rounded text-center"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        )}

        <div className='flex justify-between'>
          <div className="mt-4 text-left font-semibold">
            Загальна сума: {totalSum} грн
          </div>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => router.push('confirmOrder')}
          >
            🧾 Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  )
}