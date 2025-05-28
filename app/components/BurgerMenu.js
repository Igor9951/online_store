'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BurgerMenu({userAuth}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden h-1/2 mt-4.5 ml-"> {/* Показується тільки на малих екранах */}
      <button
        className={`p-2 top-4 left-4 bg-black  rounded-md shadow transition-all duration-300 z-50 ${
          open ? 'fixed' : 'static'
        }`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <Image src='burger.svg'  width={27} height={27} alt='burger'/> : <Image src='burger.svg'  width={27} height={27} alt='burger'/>}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4 justify-self-end">
          <Link href="/" onClick={() => setOpen(false)}>Головна</Link>
          <Link href="/about" onClick={() => setOpen(false)}>Про нас</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Контакти</Link>
          {userAuth && userAuth.role=="admin" && <Link href="/adminPage" onClick={() => setOpen(false)}>Адмінка</Link>}
          {userAuth && userAuth.role=="admin" && <Link href="/orders" onClick={() => setOpen(false)}>Замовлення</Link>}
          {userAuth &&  <Link href="/userOrders" onClick={() => setOpen(false)}>Мої замовлення</Link>}
        </nav>
      </div>
    </div>
  );
}