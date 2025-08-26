import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const uid =
      body?.documents?.[0]?.slug ||
      body?.documents?.[0]?.uid ||
      body?.uid ||
      null;

    // Revalider la page index des ressources
    revalidatePath("/ressources");
    
    // Revalider l'article spécifique si on a l'uid
    if (uid) {
      revalidatePath(`/ressources/${uid}`);
    }

    return NextResponse.json({ 
      ok: true, 
      uid, 
      revalidated: ["/ressources", uid ? `/ressources/${uid}` : null].filter(Boolean),
      now: Date.now() 
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
