import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value
 
  if (currentUser && !request.nextUrl.pathname.startsWith('/warmup')) {
    return Response.redirect(new URL('/warmup', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/authentication')) {
    return Response.redirect(new URL('/authentication/sign-in', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}