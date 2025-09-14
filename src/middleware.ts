import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname.startsWith("/ressources")) {
    const p = url.searchParams;
    const hasAnyParam = [
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
    ]
      .some((k) => p.has(k));
    if (hasAnyParam) {
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, follow");
      return res;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/ressources/:path*"],
};
