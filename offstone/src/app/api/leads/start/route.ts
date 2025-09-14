import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabaseServer";

type StartBody = {
  email?: string;
};

const isValidEmail = (email: string) => /.+@.+\..+/.test(email);

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams;

    const { email }: StartBody = await req.json().catch(() => ({}));

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "bad_email" }, { status: 400 });
    }

    // Compute cutoff for the last 30 days
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Look for an existing OPEN lead for this email created in the last 30 days
    const { data: existing, error: findErr } = await supabaseServer
      .from("leads")
      .select("id")
      .eq("email", email)
      .eq("status", "open")
      .gte("created_at", cutoff)
      .limit(1)
      .maybeSingle();

    if (findErr) {
      return NextResponse.json({ error: findErr.message }, { status: 500 });
    }

    if (existing?.id) {
      return NextResponse.json({ ok: true, lead_id: existing.id }, { status: 200 });
    }

    // Collect UTM and context params from querystring
    const insertPayload = {
      email,
      status: "open" as const,
      page_url: search.get("page_url"),
      ref: search.get("ref"),
      utm_source: search.get("utm_source"),
      utm_medium: search.get("utm_medium"),
      utm_campaign: search.get("utm_campaign"),
      utm_content: search.get("utm_content"),
      utm_term: search.get("utm_term"),
      asset_class: search.get("asset_class"),
      article_uid: search.get("article_uid"),
    } as const;

    const { data: created, error: insertErr } = await supabaseServer
      .from("leads")
      .insert([insertPayload])
      .select("id")
      .single();

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, lead_id: created.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}
