import Link from 'next/link';

export default function Footer({ userAuth }) {
  return (
    <footer className="w-full bg-orange-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Навігація */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Навігація</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">Головна</Link></li>
            <li><Link href="/about" className="hover:underline">Про нас</Link></li>
            {userAuth?.role === "admin" && (
              <>
                <li><Link href="/adminPage" className="hover:underline">Адмінка</Link></li>
                <li><Link href="/orders" className="hover:underline">Замовлення</Link></li>
              </>
            )}
            {userAuth && (
              <li><Link href="/userOrders" className="hover:underline">Мої замовлення</Link></li>
            )}
          </ul>
        </div>

        {/* Контакти продавця */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Контакти продавця</h3>
          <p className="text-sm">Email: <a href="mailto:acenkoigor44@gmail.com" className="underline">acenkoigor44@gmail.com</a></p>
          <p className="text-sm">Телефон: <a href="tel:+380967785730" className="underline">+38 (096) 778-57-30</a></p>
          <p className="text-sm mt-2">Графік: Пн–Пт, 09:00–18:00</p>
        </div>

        {/* Додаткова інформація */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Інформація</h3>
          <ul className="space-y-1 text-sm">
            <li><span>Доставка по всій Україні</span></li>
            <li><span>Оплата при отриманні</span></li>
            <li><span>Повернення протягом 14 днів</span></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-orange-200 mt-6 px-4">
        &copy; {new Date().getFullYear()} Усі права захищено.
      </div>
    </footer>
  );
}