'use client'

import { useState } from 'react'
import CartModal from './CartModal'
import { useCart } from './CartContex'
import Image from 'next/image'

export default function BasketIcon() {
  const [open, setOpen] = useState(false)
  const { totalCount, totalSum } = useCart()

  return (
    <>
      <div className="flex cursor-pointer" onClick={() => setOpen(true)}>
        <Image
          src="/busket.svg"
          width={58}
          height={48}
          alt="basket"
          className="self-center w-1/3 ml-4"
        />
        <div className="self-center w-1/3">
          <div className="w-[53px] h-[15px] rounded-[9px] bg-white mb-1 flex justify-center ml-1.5">
            <p className="self-center text-sm">{totalCount}</p>
          </div>
          <div className="w-[71px] h-[14px] rounded-[9px] bg-white flex justify-center">
            <p className="self-center text-sm">{totalSum} грн.</p>
          </div>
        </div>
      </div>

      {open && <CartModal onClose={() => setOpen(false)} />}
    </>
  )
}