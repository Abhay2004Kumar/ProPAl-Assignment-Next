import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // Expire the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // expire immediately
  });

  return response;
}
