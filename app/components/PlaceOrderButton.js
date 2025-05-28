'use client'

import { placeOrder } from './placeorder'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from './CartContex'

export default function CheckoutButton({ cart, totalPrice, deliveryData, contactData, userId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { clearCart } = useCart()
  const [message,setMessage]=useState(null)

  const handleOrder = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await placeOrder({
        cart,
        totalPrice,
        deliveryData,
        contactData, // додаємо контактні дані, якщо гість
        userId,      // або ID користувача, якщо авторизований
      })
      
      if(result?.message){
         setSuccess(false)
         setMessage(result.message)
      }
      if (result.success) {
        setSuccess(true)
        clearCart()
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setError('Не вдалося оформити замовлення')
      }
    } catch (err) {
      console.error(err)
      setError('Помилка оформлення замовлення')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Оформлення...' : 'Оформити замовлення'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
       {message && <p className="text-red-600 mt-2">{message}</p>}
      {success && <p className="text-green-500 mt-2">Замовлення оформлено успішно!</p>}
    </div>
  )
}