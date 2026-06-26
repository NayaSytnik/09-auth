import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get('token')?.value ||
    request.cookies.get('session')?.value;

  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));


  if (!token && isPrivate) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }


  if (token && isPublic) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}