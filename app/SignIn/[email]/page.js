'use client'

import { use, useState } from "react";
import { checkCode } from "@/app/components/checkCode";
import { redirect, useParams } from "next/navigation";
import { resend } from "@/app/components/resend";


export default function Verification(){
  

  const params=useParams()
 
  const [info,setInfo]=useState(null);

  async function handler(e){
    e.preventDefault();

    const email=params.email.toString().replace('%40','@')
    const code=e.target.verificationCode.value;
    console.log(code)
    const res= await checkCode(code,email)

     if(res.success==false && res.codeExpires==false){
      setInfo("Код протерміновано, надішліть код повторно!!!")
      return
    }

    if(!res.success){
      setInfo("Код неправильний!!!")
      return
    }

    setInfo("Успіх!!!")
    redirect('/LogIn')
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
  <div className="w-full max-w-md bg-orange-300 rounded-2xl shadow-xl p-6 sm:p-8 z-50">
    <h2 className="text-xl font-bold text-center text-orange-900 mb-4">
      Введіть код підтвердження
    </h2>

    <form onSubmit={handler} className="space-y-4">
      <p className="text-sm text-orange-900">
        Уведіть код, який було відправлено на вашу пошту
      </p>
      <input
        type="text"
        name="verificationCode"
        placeholder="Код підтвердження"
        className="w-full px-3 py-2 bg-white border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
      >
        Підтвердити
      </button>

      {info && <p className="text-red-500 text-sm text-center">{info}</p>}
    </form>

    <button
      onClick={async () => {
        const res = await resend(params.email.toString().replace('%40', '@'))
        if (res === false) {
          setInfo("Не можливо відправити код, статус 1")
          return
        }
        setInfo("Код успішно відправлений на вашу пошту")
      }}
      className="mt-4 w-full text-sm text-orange-800 hover:text-orange-950 underline text-center"
    >
      Відправити новий код
    </button>
  </div>
</div>
  )
}