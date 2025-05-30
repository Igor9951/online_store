import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SignInClient from '../components/SignInClient'

export default async function Page() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('verify_email')

  if (cookie?.value) {
    redirect(`/SignIn/${cookie.value}`)
  }

  return <SignInClient />
}