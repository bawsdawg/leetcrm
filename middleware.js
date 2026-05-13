import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { routes } from "@/config/routes";
import { isWorkspacePath } from "@/config/workspace-routes";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const session = request.auth;

  if (pathname.startsWith("/login")) {
    if (session) {
      return NextResponse.redirect(new URL(routes.pulse, request.nextUrl));
    }
    return NextResponse.next();
  }

  if (!isWorkspacePath(pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    const url = new URL("/login", request.nextUrl);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
