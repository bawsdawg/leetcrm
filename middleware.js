import { NextResponse } from "next/server";

/**
 * Runs for matched routes only — add session / org checks here.
 * @param {import("next/server").NextRequest} _request
 */
export function middleware(_request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
