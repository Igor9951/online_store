import { NextResponse } from 'next/server';

export async function GET(req) {
  const response = NextResponse.json({ message: 'Cookies cleared' });

  response.cookies.set('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0), 
    path: '/',
  });

  return response;
}