'use client'
import { useState } from 'react';
import { loginPerform } from '@/app/components/logInPerform';
import Image from 'next/image';

export default function LogIn(){

  const [errors,setErrors]=useState(null);

  async function handleForm(e){
   e.preventDefault();
 
   const form=e.currentTarget;
   console.log(form.email.value)

   const res=await loginPerform(form.email.value,form.password.value);
   
    if (res.status==2) {
      window.location.href = '/';
      return
    } 

   if(res.status==1){
    setErrors("Неправельний логін або пароль!!!");
    return;
   }

   location.href='/';
  }


   const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(prev => !prev)

  return(
   (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <div className="w-full max-w-md bg-orange-300 rounded-2xl shadow-xl p-6 sm:p-8 z-50">
        <h2 className="text-2xl font-bold text-center text-orange-900 mb-6">Вхід до акаунту</h2>

        <form className="space-y-4" onSubmit={handleForm} method="POST">
          <div>
            <label className="block mb-1 text-sm text-orange-900">Пошта</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Введіть пошту"
              name="email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-orange-900">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                placeholder="Введіть пароль"
                name="password"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-2 top-2 text-orange-700 hover:text-orange-900"
                aria-label="Показати/сховати пароль"
              >
                {showPassword ? <Image src='/EyeOff.svg' width={20}  height={20} alt='Eye'/> :<Image src='/Eye.svg' width={20} height={20} alt='EyeOff'/>}
              </button>
            </div>
          </div>

          {errors && <p className="text-sm text-red-600 text-center">{errors}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            Увійти
          </button>
        </form>

        <button
          onClick={() => location.href = '/'}
          className="mt-4 w-full text-sm text-orange-800 hover:text-orange-950 underline text-center"
        >
          Назад
        </button>
      </div>
    </div>
  )
  )
}