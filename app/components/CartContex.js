'use client'

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  
  const addToCart = (product) => {
    console.log(cartItems)
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      } else {
        return [...prev, { ...product, count: 1 }]
      }
    })
  }

  const updateQuantity = (id, count) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(1, count) } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([]) // очищення кошика
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalCount = cartItems.reduce((acc, item) => acc + item.count, 0)
  const totalSum = cartItems.reduce((acc, item) => acc + item.count * item.price, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalSum,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


export function useCart() {
  return useContext(CartContext)
}