import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isGateEnabled, verifyGateCookie } from "@/lib/keystatic-gate";

export const config = {
  matcher: ["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"],
};

export async function proxy(req: NextRequest) {
  if (!isGateEnabled()) return NextResponse.next();

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (await verifyGateCookie(cookie)) return NextResponse.next();

  const loginUrl = new URL("/keystatic-login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}
