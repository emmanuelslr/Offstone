import { NextResponse } from "next/server";
import { supabaseUpdateLeadById } from "@/lib/supabaseAdmin";
import { isTrustedOrigin, applyRateLimitCookie, verifyLeadToken, truncate, throttleOnFailure } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeText(v: unknown) {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // CSRF/basic origin protection (strict in production)
    if (!isTrustedOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 });
    }
    // Require per-lead token in header
    const token = req.headers.get('x-lead-token');
    
    // Mode développement : accepter le token de test
    const isDevMode = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'development';
    const isTestToken = id === 'test-lead-id' && token === 'test-token';
    
    if (!verifyLeadToken(id, token) && !(isDevMode && isTestToken)) {
      // Rate limit pour supporter 50k requêtes/heure (25000 échecs/30min)
      const fl = throttleOnFailure(req, 'leads_patch_unauth', 25000, 30 * 60_000);
      const resp = NextResponse.json({ error: "Unauthorized" }, { status: fl.allowed ? 401 : 429 });
      applyRateLimitCookie(resp, fl);
      return resp;
    }
    const body = await req.json().catch(() => ({}));

    const fields: Record<string, any> = {};

    const set = (k: string, v: any) => {
      if (v !== undefined) fields[k] = v;
    };

    set("ticket_target", truncate(sanitizeText(body?.ticket_target), 255));
    set("discovery", truncate(sanitizeText(body?.discovery), 4000));
    set("wants_call", body?.wants_call === true || body?.wants_call === false ? body?.wants_call : undefined);
    set("first_name", truncate(sanitizeText(body?.first_name), 128));
    set("last_name", truncate(sanitizeText(body?.last_name), 128));
    set("phone", truncate(sanitizeText(body?.phone), 64));
    set("consent", body?.consent === true ? true : body?.consent === false ? false : undefined);
    set("asset_class", truncate(sanitizeText(body?.asset_class), 64));
    set("article_uid", truncate(sanitizeText(body?.article_uid), 128));
    set("page_url", truncate(sanitizeText(body?.page_url), 2048));
    set("ref", truncate(sanitizeText(body?.ref), 255));
    set("utm_source", truncate(sanitizeText(body?.utm_source), 255));
    set("utm_medium", truncate(sanitizeText(body?.utm_medium), 255));
    set("utm_campaign", truncate(sanitizeText(body?.utm_campaign), 255));
    set("utm_content", truncate(sanitizeText(body?.utm_content), 255));
    set("utm_term", truncate(sanitizeText(body?.utm_term), 255));

    if (Object.keys(fields).length === 0) {
      return NextResponse.json({ error: "Aucun champ fourni" }, { status: 400 });
    }

    fields.updated_at = new Date().toISOString();

    // Mode développement : ne pas mettre à jour Supabase avec l'ID de test
    if (isDevMode && isTestToken) {
      return NextResponse.json({ id: id, lead: { id, ...fields } });
    }

    const row = await supabaseUpdateLeadById(id, fields);

    return NextResponse.json({ id: row?.id, lead: row });
  } catch (err: any) {
    console.error("PATCH /api/leads/[id] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

