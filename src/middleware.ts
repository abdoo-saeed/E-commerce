import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

 
  if (token && (pathname.startsWith("/Auth/login") || pathname.startsWith("/Auth/register"))) {
    return NextResponse.redirect(new URL("/", request.url))
  }


  if (!token && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/Auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/cart", "/Auth/login", "/Auth/register"],
}
