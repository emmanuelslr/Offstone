import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WAITLIST_PATH = "/waitlist";

const robotParamKeys = [
  "q",
  "asset",
  "theme",
  "level",
  "duration",
  "sort",
  "page",
  "classe",
  "thematique",
  "niveau",
  "duree",
  "tri",
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  const shouldNoIndexRessource = pathname.startsWith("/ressources")
    && robotParamKeys.some((k) => url.searchParams.has(k));

  if (pathname === WAITLIST_PATH || pathname.startsWith(`${WAITLIST_PATH}/`)) {
    return NextResponse.next();
  }

  const redirectUrl = url.clone();
  redirectUrl.pathname = WAITLIST_PATH;
  redirectUrl.search = "";

  const response = NextResponse.redirect(redirectUrl);

  if (shouldNoIndexRessource) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
