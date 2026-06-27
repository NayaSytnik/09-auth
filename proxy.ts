import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let hasValidSession = !!accessToken;

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();

      if (res?.data) {
        hasValidSession = true;

        const setCookie = res.headers['set-cookie'];

        if (setCookie) {
          setCookie.forEach((cookie) => {
            response.headers.append('set-cookie', cookie);
          });
        }
      }
    } catch {
      hasValidSession = false;
    }
  }


  if (!hasValidSession && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }


  if (hasValidSession && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};