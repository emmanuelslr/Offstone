import { NextResponse } from "next/server";
import { issuePowChallenge, isTrustedOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const challenge = issuePowChallenge();
    return NextResponse.json({ challenge });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

