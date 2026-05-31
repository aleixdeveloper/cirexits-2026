// app/api/auth/token/route.ts
import { signIn } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  const response = await signIn('admin-token', {
    token,
    redirect: false,
    callbackUrl: '/admin' // Explicit callback
  });

  if (response?.error) {
    return NextResponse.redirect(
      new URL(`/auth/error?error=${response.error}`, url.origin)
    );
  }

  // Set cookies manually if needed
  const redirect = NextResponse.redirect(new URL('/admin', url.origin));
  // If using JWT strategy:
  redirect.cookies.set('next-auth.session-token', response?.sessionToken, {
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
  return redirect;
}
