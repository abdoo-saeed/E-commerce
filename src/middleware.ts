import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // مهم عشان يبقى متوافق مع السيرفر
  })
  const { pathname } = request.nextUrl

  // اطبع في اللوج بتاع Vercel
  console.log("🔑 Middleware token:", token)
  console.log("📍 Pathname:", pathname)

  // لو عامل login وعايز يروح للـ login أو register → رجعه للهوم
  if (
    token &&
    (pathname.startsWith("/Auth/login") || pathname.startsWith("/Auth/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // لو مش عامل login وبيحاول يروح للـ cart → رجعه للـ login
  if (!token && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/Auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/cart", "/Auth/login", "/Auth/register"],
}
