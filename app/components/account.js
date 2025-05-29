
"use client"

import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Account({ userAuth }) {
  const [authorise, setAuthorise] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (userAuth) {
      setAuthorise({
        name: userAuth.name,
        email: userAuth.email
      });
      if (userAuth.role === "admin") {
        setAdmin(true);
      }
    } else {
      setAuthorise(false);
    }
  }, [userAuth]);



  async function handleLogout() {
  await fetch('/api/logout');
  window.location.href = '/';
}

  return (
    <div className="w-1/6 h-[69px] bg-gray-800 flex items-center p-2 rounded">
      {/* Ліва частина: зображення */}
      <div className="flex-shrink-0">
        <Image
          src="/person.svg"
          width={32}
          height={32}
          alt="person"
          className="bg-amber-50 rounded-full"
        />
      </div>

      {/* Права частина: текст та кнопка */}
      <div className="flex flex-col justify-between ml-3 flex-grow h-full">
        {authorise ? (
          <>
            <div>
              <p className="text-white text-center text-[10px] font-semibold leading-tight">{authorise.name}</p>
              <p className="text-white text-center text-[9px] leading-tight">{authorise.email}</p>
              {admin && (
                <p className="text-yellow-400 text-[8px] font-bold leading-tight text-center">ADMIN</p>
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
  );
}
