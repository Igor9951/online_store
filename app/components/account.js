
"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Account({ userAuth }) {
  const [authorise, setAuthorise] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (userAuth) {
      setAuthorise({
        name: userAuth.name,
        email: userAuth.email,
      })
      if (userAuth.role === "admin") {
        setAdmin(true)
      }
    } else {
      setAuthorise(false)
    }
  }, [userAuth])

  async function handleLogout() {
    await fetch("/api/logout")
    window.location.href = "/"
  }

 
  function closeModal() {
    setShowModal(false)
  }

  return (
    <>
      <div
        className="
          w-1/8 h-[69px] ml-1 bg-gray-800 flex items-center p-2 rounded cursor-pointer
          sm:w-1/4 sm:min-w-[180px]
          xs:w-auto xs:min-w-auto xs:h-auto xs:p-0
          xs:justify-center
        "
        onClick={() => setShowModal(true)}
      >
        <div className="flex-shrink-0 xs:w-auto xs:flex xs:justify-center">
          <div className="relative flex items-center">
  {authorise ? (
    <span title="Авторизовано" className="text-green-400 mr-1 text-lg">✔</span>
  ) : (
    <span title="Не авторизовано" className="text-red-500 mr-1 text-lg">✖</span>
  )}
  <Image
    src="/person.svg"
    width={20}
    height={20}
    alt="person"
    className="bg-amber-50 rounded-full"
  />
</div>
        </div>

        <div className="hidden sm:flex flex-col justify-between ml-3 flex-grow h-full">
          {authorise ? (
            <>
              <div>
                <p className="text-white text-center text-[10px] font-semibold leading-tight truncate">
                  {authorise.name}
                </p>
                <p className="text-white text-center text-[9px] leading-tight truncate">
                  {authorise.email}
                </p>
                {admin && (
                  <p className="text-yellow-400 text-center text-[8px] font-bold leading-tight">
                    ADMIN
                  </p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white text-[9px] rounded py-1 hover:bg-red-700 mt-auto w-full"
                type="button"
              >
                Вийти
              </button>
            </>
          ) : (
            <div className="flex flex-col justify-center h-full">
              <p className="text-white text-[9px] underline hover:text-amber-300 cursor-pointer leading-tight">
                <Link href="/LogIn">Вхід /</Link>
              </p>
              <p className="text-white text-[9px] underline hover:text-amber-300 cursor-pointer leading-tight">
                <Link href="/SignIn">Реєстрація</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          <div className="fixed top-1/2 left-1/2 z-50 w-72 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded p-4 shadow-lg">
            {authorise ? (
              <>
                <div className="flex items-center mb-4 gap-3">
                  <Image
                    src="/person.svg"
                    width={40}
                    height={40}
                    alt="person"
                    className="bg-amber-50 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-white text-[14px] font-semibold truncate">
                      {authorise.name}
                    </p>
                    <p className="text-white text-[12px] truncate">{authorise.email}</p>
                    {admin && (
                      <p className="text-yellow-400 text-[10px] font-bold">ADMIN</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white text-[13px] rounded py-2 hover:bg-red-700 w-full"
                  type="button"
                >
                  Вийти
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 text-center">
                <Link
                  href="/LogIn"
                  onClick={closeModal}
                  className="text-white text-[13px] underline hover:text-amber-300"
                >
                  Вхід
                </Link>
                <Link
                  href="/SignIn"
                  onClick={closeModal}
                  className="text-white text-[13px] underline hover:text-amber-300"
                >
                  Реєстрація
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}


