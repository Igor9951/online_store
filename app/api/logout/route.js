import { cookies } from 'next/headers';

export async function GET(req) {
  const cookieStore = cookies();

  cookieStore.delete('sessionToken', {
    path: '/',
  });

  return new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}