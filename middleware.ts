import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block access to /fetchtest unless a condition is met
  if (pathname === '/fetchtest') {
    const token = request.cookies.get('auth_token')?.value;

    if (!token || token !== process.env.ACCESS_TOKEN) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}