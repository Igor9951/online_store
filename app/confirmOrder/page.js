'use client'

import DeliveryForm from '../components/DeliveryForm'
import CheckoutButton from '../components/PlaceOrderButton'
import { useCart } from '../components/CartContex'
import { useEffect, useState,useCallback } from 'react'


export default function CheckoutPage() {
  const { cartItems, totalSum } = useCart()

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deliveryData, setDeliveryData] = useState({
    type: '',
    city: '',
    cityRef: '',
    warehouse: '',
  })
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me')
        if (res.ok) {
          const data = await res.json()
          if (data) {
            setUser(data)
          }
        }
      } catch (e) {
        console.error('Session check failed', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

 const handleDeliveryChange = useCallback((data) => {
    setDeliveryData(data)
  }, [])

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactData((prev) => ({ ...prev, [name]: value }))
  }

  if (isLoading) return <div className="text-center py-8">Завантаження...</div>

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Оформлення замовлення</h1>

      {user ? (
        <div className="p-4 bg-gray-100 rounded space-y-1">
          <p><strong>Ім’я:</strong> {user.name}</p>
          <p><strong>Прізвище:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.phone && <p><strong>Телефон:</strong> {user.phone}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Контактні дані (гостьове замовлення)</h2>
          <input
            type="text"
            name="firstName"
            placeholder="Імʼя"
            value={contactData.firstName}
            onChange={handleContactChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Прізвище"
            value={contactData.lastName}
            onChange={handleContactChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={contactData.phone}
            onChange={handleContactChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contactData.email}
            onChange={handleContactChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
      )}

      <DeliveryForm onChange={handleDeliveryChange} />

      <CheckoutButton
        cart={cartItems}
        totalPrice={totalSum}
        deliveryData={deliveryData}
        contactData={!user ? contactData : null}
        userId={user?.id || null}
      />
    </div>
  )
}