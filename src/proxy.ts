import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("redirect", pathname + search);
  signInUrl.searchParams.set("reason", "protected");
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
