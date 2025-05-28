'use client'

import { useEffect, useState } from 'react'
import { getAllOrders } from '../components/getAllOrders'
import { updateOrderStatus } from '../components/updateOrderStatus'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')
  const [statusChanges, setStatusChanges] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders()
        setOrders(data)
      } catch {
        setError('Помилка отримання замовлень')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleStatusChange = (orderId, newStatus) => {
    setStatusChanges((prev) => ({
      ...prev,
      [orderId]: newStatus
    }))
  }

  const saveStatus = async (orderId) => {
    const newStatus = statusChanges[orderId]
    if (!newStatus) return

    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch {
      setError('Помилка оновлення статусу')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) return <div className="p-4">Завантаження...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Усі замовлення</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">ID: {order.id}</p>
              <p>Дата: {new Date(order.createdAt).toLocaleString()}</p>
              <p>
                Статус:
                <select
                  className="ml-2 border rounded px-2 py-1"
                  value={statusChanges[order.id] ?? order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">Очікує</option>
                  <option value="processing">В обробці</option>
                  <option value="shipped">Відправлено</option>
                  <option value="completed">Завершено</option>
                  <option value="cancelled">Скасовано</option>
                </select>
              </p>
              <button
                onClick={() => saveStatus(order.id)}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                disabled={updatingId === order.id}
              >
                {updatingId === order.id ? 'Збереження...' : 'Зберегти статус'}
              </button>
            </div>
            <div>
              <p><strong>Сума:</strong> {order.totalPrice} грн</p>
              {order.user ? (
                <>
                  <p><strong>Клієнт:</strong> {order.user.name} ({order.user.email})</p>
                </>
              ) : (
                <>
                  <p><strong>Гість:</strong> {order.firstName} {order.lastName}</p>
                  <p>{order.email} | {order.phone}</p>
                </>
              )}
              <p>
                <strong>Доставка:</strong>{' '}
                {order.delivery?.type} – {order.delivery?.city}, {order.delivery?.warehouse}
              </p>
            </div>
          </div>

          <div className="mt-2">
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
