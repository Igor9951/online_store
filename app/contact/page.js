export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Контакти</h1>
        <div className="space-y-4 text-center sm:text-left">
          <p>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:acenkoigor44@gmail.com"
              className="text-blue-600 hover:underline break-words"
            >
              acenkoigor44@gmail.com
            </a>
          </p>
          <p>
            <strong>Телефон:</strong>{' '}
            <a
              href="tel:+380967785730"
              className="text-blue-600 hover:underline"
            >
              +38 (096) 778-57-30
            </a>
          </p>
          <p>
            <strong>Графік:</strong> Пн–Пт, 09:00–18:00
          </p>
        </div>
      </div>
    </div>
  )
}