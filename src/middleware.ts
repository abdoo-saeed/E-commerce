import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req:request})
    const { pathname } = request.nextUrl
   
    if (token && pathname.startsWith("/Auth/login")||token && pathname.startsWith("/Auth/register")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  
  if (!token && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/Auth/login", request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/cart","/Auth/login","/Auth/register"]
}