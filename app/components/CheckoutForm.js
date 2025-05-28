'use client'

import { useState, useEffect } from 'react'

export default function CheckoutForm() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    // Отримати поточного користувача (наприклад, через сесію)
    const fetchUser = async () => {
      const res = await fetch('/api/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        setFormData({
          firstName: data.name?.split(' ')[0] || '',
          lastName: data.name?.split(' ')[1] || '',
          phone: data.phone || '',
          email: data.email || '',
        })
      }
    }
    fetchUser()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Тут можна надіслати замовлення
    console.log('Submitting order with:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {!user && (
        <>
          <div>
            <label>Імʼя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label>Прізвище</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        </>
      )}

      {user && (
        <div className="p-4 bg-gray-100 rounded">
          <p><strong>Користувач:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.phone && <p><strong>Телефон:</strong> {user.phone}</p>}
          {user.lastName && <p><strong>Прізвище:</strong> {user.lastName}</p>}
        </div>
      )}

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Оформити замовлення
      </button>
    </form>
  )
}