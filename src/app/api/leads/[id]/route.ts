import { NextResponse } from "next/server";
import { supabaseUpdateLeadById } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeText(v: unknown) {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 });
    }
    const body = await req.json().catch(() => ({}));

    const fields: Record<string, any> = {};

    const set = (k: string, v: any) => {
      if (v !== undefined) fields[k] = v;
    };

    set("ticket_target", sanitizeText(body?.ticket_target));
    set("discovery", sanitizeText(body?.discovery));
    set("wants_call", body?.wants_call === true || body?.wants_call === false ? body?.wants_call : undefined);
    set("first_name", sanitizeText(body?.first_name));
    set("last_name", sanitizeText(body?.last_name));
    set("phone", sanitizeText(body?.phone));
    set("consent", body?.consent === true ? true : body?.consent === false ? false : undefined);
    set("asset_class", sanitizeText(body?.asset_class));
    set("article_uid", sanitizeText(body?.article_uid));
    set("page_url", sanitizeText(body?.page_url));
    set("ref", sanitizeText(body?.ref));
    set("utm_source", sanitizeText(body?.utm_source));
    set("utm_medium", sanitizeText(body?.utm_medium));
    set("utm_campaign", sanitizeText(body?.utm_campaign));
    set("utm_content", sanitizeText(body?.utm_content));
    set("utm_term", sanitizeText(body?.utm_term));

    if (Object.keys(fields).length === 0) {
      return NextResponse.json({ error: "Aucun champ fourni" }, { status: 400 });
    }

    fields.updated_at = new Date().toISOString();

    const row = await supabaseUpdateLeadById(id, fields);

    return NextResponse.json({ id: row?.id, lead: row });
  } catch (err: any) {
    console.error("PATCH /api/leads/[id] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

