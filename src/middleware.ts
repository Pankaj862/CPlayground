import {NextRequest, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export {default} from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: [
    'sign-in',
    'sin-up',
    '/',
    '/dashboard/:path*'
  ]
}