'use client'

import BasketIcon from "./BasketIkon";
import { useCart } from "./CartContex"

export default function BasketSummary({ count, total }) {

  const { totalCount, totalSum } = useCart()

  return (
    <div className="flex">
      <BasketIcon></BasketIcon>
    </div>
  )
}