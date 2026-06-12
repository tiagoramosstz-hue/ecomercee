import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function proxy(request: NextRequest) {
  if (!process.env.APP_SECRET) {
    throw new Error('APP_SECRET environment variable is required');
  }
  const secret = new TextEncoder().encode(process.env.APP_SECRET);
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isProtectedRoute = pathname.startsWith('/api/protected') || isAdminRoute;

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('Authorization');
  let token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

  if (!token) {
    token = request.cookies.get('accessToken')?.value;
  }

  if (!token) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jose.jwtVerify(token, secret);

    if (isAdminRoute && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId as string);
    requestHeaders.set('x-user-role', payload.role as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.json({ error: 'Unauthorized / Invalid Token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/protected/:path*'],
};
