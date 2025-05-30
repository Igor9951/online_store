'use client'

import { useState } from 'react'
import { createUser } from '@/app/components/signInPerform'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const schema = z.object({
  name: z.string()
    .min(1, { message: 'Ім\'я повинно мати мінімум 1 символ!!!' })
    .max(80, { message: 'Ім\'я не повинно перевищувати 80 символів!!!' }),

  lastName: z.string()
    .min(1, { message: 'Прізвище повинно мати мінімум 1 символ!!!' })
    .max(80, { message: 'Прізвище не повинно перевищувати 80 символів!!!' }),

  email: z.string()
    .email('Формат пошти не правильний!!!'),

  phone: z.string()
    .min(10, { message: 'Номер телефону повинен містити щонайменше 10 цифр' })
    .max(15, { message: 'Номер телефону надто довгий' })
    .regex(/^\+?[0-9\s\-()]{10,15}$/, { message: 'Невірний формат телефону' }),

  password: z.string()
    .min(8, { message: "Пароль повинен містити мінімум 8 символів!!!" })
    .max(96, { message: "Пароль не повинен перевищувати 96 символів" })
    .regex(/[A-Z]/, 'Пароль має містити хоча б одну велику літеру')
    .regex(/[a-z]/, 'Пароль має містити хоча б одну малу літеру')
    .regex(/[0-9]/, 'Пароль має містити хоча б одну цифру')
    .regex(/[^A-Za-z0-9]/, 'Пароль має містити хоча б один спеціальний символ'),
})

export default function SignInClient() {

  const [errors, setErrors] = useState({
    name: null,
    lastName: null,
    phone: null,
    email: null,
    password: null,
    userExist: null
  })

  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const form = document.getElementById('signInForm')
    const raw = new FormData(form)

    const data = {
      name: raw.get('user_name'),
      lastName: raw.get('user_lastname'),
      phone: raw.get('user_phone'),
      email: raw.get('user_email'),
      password: raw.get('user_pass'),
      checkPassword: raw.get('user_pass_check')
    }

    if (data.password !== data.checkPassword) {
      setErrors({
        name: null,
        lastName: null,
        phone: null,
        email: null,
        password: "Паролі не співпадають",
        userExist: null
      })
      return
    }

    const validation = schema.safeParse(data)

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0] || null,
        lastName: fieldErrors.lastName?.[0] || null,
        phone: fieldErrors.phone?.[0] || null,
        email: fieldErrors.email?.[0] || null,
        password: fieldErrors.password?.[0] || null,
        userExist: null
      })
      return
    }

    const res = await createUser(data.name, data.lastName, data.email, data.phone, data.password)

    if (!res) {
      alert("Помилка сервера")
      return
    }

    if (res.status === 3) {
      setErrors({
        name: null,
        lastName: null,
        phone: null,
        email: null,
        password: null,
        userExist: "Ви вже зареєстровані!!!"
      })
      return
    }

    if (res.status === 2 || res.status === 1) {
      setErrors({
        name: null,
        lastName: null,
        phone: null,
        email: null,
        password: null,
        userExist: null
      })
      form.reset()
      redirect(`/SignIn/${data.email}`)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState(false)

  return (
     <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Реєстрація</h1>

        <form onSubmit={handleSubmit} id="signInForm" className="space-y-4">

          <div>
            <label className="block mb-1">Імʼя</label>
            <input name="user_name" type="text" className="w-full px-3 py-2 border rounded bg-gray-50" placeholder="Імʼя" />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1">Прізвище</label>
            <input name="user_lastname" type="text" className="w-full px-3 py-2 border rounded bg-gray-50" placeholder="Прізвище" />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block mb-1">Телефон</label>
            <input name="user_phone" type="text" className="w-full px-3 py-2 border rounded bg-gray-50" placeholder="Телефон" />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <label className="block mb-1">Пошта</label>
            <input name="user_email" type="email" className="w-full px-3 py-2 border rounded bg-gray-50" placeholder="example@email.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1">Пароль</label>
            <div className="relative">
              <input
                name="user_pass"
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 border rounded bg-gray-50 pr-10"
                placeholder="Пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <Image src='/EyeOff.svg' width={20}  height={20} alt='Eye'/> :<Image src='/Eye.svg' width={20} height={20} alt='EyeOff'/>}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1">Повторіть пароль</label>
            <div className="relative">
              <input
                name="user_pass_check"
                type={showPasswordCheck ? 'text' : 'password'}
                className="w-full px-3 py-2 border rounded bg-gray-50 pr-10"
                placeholder="Підтвердіть пароль"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck(prev => !prev)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              >
                {showPasswordCheck ? <Image src='/EyeOff.svg' width={20}  height={20} alt='Eye'/> :<Image src='/Eye.svg' width={20} height={20} alt='EyeOff'/>}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {errors.userExist && (
            <p className="text-sm text-red-600 text-center font-semibold">{errors.userExist}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Підтвердити
          </button>

          <button
            type="button"
            onClick={() => location.href = '/'}
            className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Назад
          </button>
        </form>
      </div>
    </div>
  )
}
