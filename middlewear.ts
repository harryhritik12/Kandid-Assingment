import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/dashboard", "/api/campaigns", "/api/leads"];
const authPaths = ["/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If NOT logged in and trying to access protected paths → redirect to /auth/login
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If logged in and trying to visit /auth/login or /auth/register → redirect to /dashboard
  if (token && authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Example role check: block non-admins from /dashboard/campaigns
  if (token) {
    if (pathname.startsWith("/dashboard/campaigns") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
