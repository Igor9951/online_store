'use client'

import { useState, useEffect } from 'react'

export default function DeliveryForm({ onChange }) {
  const [deliveryType, setDeliveryType] = useState('nova_poshta')
  const [city, setCity] = useState('')
  const [citySuggestions, setCitySuggestions] = useState([])
  const [selectedCityRef, setSelectedCityRef] = useState(null)
  const [warehouses, setWarehouses] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState('')

  useEffect(() => {
    // Автозаповнення міст
    const timeout = setTimeout(async () => {
      if (city.length > 2 && deliveryType === 'nova_poshta') {
        const res = await fetch(`/api/nova-poshta/cities?search=${city}`)
        const data = await res.json()
        setCitySuggestions(data)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [city, deliveryType])

  useEffect(() => {
    // Отримання відділень по місту
    if (selectedCityRef && deliveryType === 'nova_poshta') {
      fetch(`/api/nova-poshta/warehouses?cityRef=${selectedCityRef}`)
        .then(res => res.json())
        .then(setWarehouses)
    }
  }, [selectedCityRef, deliveryType])

  useEffect(() => {
    if (typeof onChange === 'function') {
    onChange({
      type: deliveryType,
      city: city,
      cityRef: selectedCityRef,
      warehouse: selectedWarehouse,
    })
  }
  }, [deliveryType, city, selectedCityRef, selectedWarehouse,onChange])

  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold">Служба доставки:</label>
        <select
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="nova_poshta">Нова Пошта</option>
        </select>
      </div>

      <div>
        <label className="font-semibold">Місто:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        {citySuggestions.length > 0 && (
          <ul className="border bg-white max-h-40 overflow-y-auto mt-1">
            {citySuggestions.map((c, index) => (
              <li
                key={index}
                className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  setCity(c.Present)
                  setSelectedCityRef(c.DeliveryCity)
                  setCitySuggestions([])
                }}
              >
                {c.Present}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="font-semibold">Відділення:</label>
        <select
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Оберіть відділення</option>
          {warehouses.map((w) => (
            <option key={w.Ref} value={w.Description}>
              {w.Description}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}