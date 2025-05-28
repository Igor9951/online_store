import Link from 'next/link';

export default function DesktopNav({userAuth}) {
  return (
    <nav className="hidden md:flex gap-6 items-center text-white">
      <Link href="/">Головна</Link>
      <Link href="/about">Про нас</Link>
      <Link href="/contact">Контакти</Link>
      {userAuth && userAuth.role=="admin" && <Link href="/adminPage">Адмінка</Link>}
       {userAuth && userAuth.role=="admin" && <Link href="/orders">Замовлення</Link>}
       {userAuth  && <Link href="/userOrders">Мої замовлення</Link>}
    </nav>
  );
}