'use client'

import { useEffect, useState } from 'react'
import { getUserOrders } from '../components/getUserOrders'

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders()
        setOrders(data)
      } catch {
        setError('Не вдалося завантажити замовлення.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) return <div className="p-4">Завантаження...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Мої замовлення</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">У вас ще немає замовлень.</p>
      )}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p><strong>Номер замовлення:</strong> {order.id}</p>
              <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Статус:</strong> {order.status}</p>
              <p><strong>Сума:</strong> {order.totalPrice} грн</p>
              <p><strong>Доставка:</strong> {order.delivery?.type}, {order.delivery?.city}, {order.delivery?.warehouse}</p>
            </div>
            <div>
              <p className="font-semibold">Контакти продавця:</p>
              <p>Email: <a href="mailto:acenkoigor44@gmail.com" className="text-blue-600 underline">acenkoigor44@gmail.com</a></p>
              <p>Телефон: <a href="tel:+380967785730" className="text-blue-600 underline">+38 (096) 778-57-30</a></p>
            </div>
          </div>

          <div>
            <p className="font-medium">Товари:</p>
            <ul className="list-disc ml-5">
              {order.orderitem.map((item) => (
                <li key={item.id}>
                  {item.product.name} — {item.quantity} шт × {item.price} грн
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}