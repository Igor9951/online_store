import { auth } from "@/app/components/auth"

export async function GET(req) {
  const session = await auth()

  if (!session) {
    return new Response(JSON.stringify(null), { status: 200 })
  }

  return new Response(JSON.stringify(session), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
