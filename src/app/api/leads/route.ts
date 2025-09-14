import { NextResponse } from "next/server";
import { supabaseInsertLead } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeText(v: unknown) {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const emailRaw = body?.email;
    const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const now = new Date().toISOString();

    // If Supabase server env is missing (Preview or misconfig), accept the lead without persisting
    const hasSupabase = Boolean(
      (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const record: Record<string, any> = {
      email,
      status: "open",
      page_url: sanitizeText(body?.page_url),
      ref: sanitizeText(body?.ref),
      utm_source: sanitizeText(body?.utm_source),
      utm_medium: sanitizeText(body?.utm_medium),
      utm_campaign: sanitizeText(body?.utm_campaign),
      utm_content: sanitizeText(body?.utm_content),
      utm_term: sanitizeText(body?.utm_term),
      asset_class: sanitizeText(body?.asset_class) ?? "retail",
      created_at: now,
      updated_at: now,
      consent: body?.consent === true ? true : false,
    };

    if (!hasSupabase) {
      // Degraded mode: avoid 500 in preview, do not store sensitive data
      return NextResponse.json({ accepted: true, stored: false, note: 'supabase-env-missing' }, { status: 202 });
    }

    const row = await supabaseInsertLead(record);
    return NextResponse.json({ id: row?.id, lead: row });
  } catch (err: any) {
    console.error("POST /api/leads error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
