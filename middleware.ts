import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Portal Protection
  if (pathname.startsWith("/admin")) {
    const session = await getSessionFromRequest(request);

    // If accessing the login page
    if (pathname === "/admin/login") {
      if (session) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return addSecurityHeaders(NextResponse.next());
    }

    // Root /admin redirects to /admin/dashboard
    if (pathname === "/admin") {
      if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // All other /admin/* pages require authenticated session
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Admin API Protection (except login)
  if (pathname.startsWith("/api/admin")) {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Authentication session required." },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
