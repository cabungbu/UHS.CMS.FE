import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const refresh_token = req.cookies.get("refresh_token");
  const access_token = req.cookies.get("access_token");

  const publicPaths = ["/login", "/callback", "/api"];

  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  if (!refresh_token || !access_token) {
    try {
      const baseUrl = req.nextUrl.origin;
      await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout Keycloak error:", e);
    }

    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
