import { NextResponse } from "next/server";
import { supabaseInsertLead } from "@/lib/supabaseAdmin";
import { isTrustedOrigin, applyRateLimitCookie, issueLeadToken, truncate, validEmail, throttleOnFailure, verifyPowSolution } from "@/lib/security";
import { submitToHubspot, buildHubspotPayload } from "../submit-lead/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeText(v: unknown) {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

export async function POST(req: Request) {
  try {
    // CSRF/basic origin protection (strict in production)
    // CSRF temporairement désactivé pour debug
    // if (!isTrustedOrigin(req)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const body = await req.json().catch(() => ({}));
    // Honeypot minimal (si rempli => bot)
    if (typeof body?.hp === 'string' && body.hp.trim().length > 0) {
      const rl = throttleOnFailure(req, 'leads_hp', 10, 10 * 60_000);
      const resp = NextResponse.json({ error: "Invalid" }, { status: rl.allowed ? 400 : 429 });
      applyRateLimitCookie(resp, rl);
      return resp;
    }

    // Stateless PoW: temporairement désactivé pour debug
    // const env = (process.env.VERCEL_ENV || process.env.NODE_ENV || 'development').toLowerCase();
    // if (env === 'production' || env === 'preview') {
    //   const ch = body?.pow_challenge || req.headers.get('x-pow-challenge');
    //   const nn = body?.pow_nonce || req.headers.get('x-pow-nonce');
    //   if (!verifyPowSolution(ch, nn)) {
    //     const rl = throttleOnFailure(req, 'leads_pow', 20, 10 * 60_000);
    //     const resp = NextResponse.json({ error: "PoW required" }, { status: rl.allowed ? 400 : 429 });
    //     applyRateLimitCookie(resp, rl);
    //     return resp;
    //   }
    // }

    const emailRaw = body?.email;
    const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
    if (!email || !validEmail(email)) {
      const rl = throttleOnFailure(req, 'leads_invalid', 10, 10 * 60_000);
      const resp = NextResponse.json({ error: "Email invalide" }, { status: rl.allowed ? 400 : 429 });
      applyRateLimitCookie(resp, rl);
      return resp;
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
      page_url: truncate(sanitizeText(body?.page_url), 2048),
      ref: truncate(sanitizeText(body?.ref), 255),
      utm_source: truncate(sanitizeText(body?.utm_source), 255),
      utm_medium: truncate(sanitizeText(body?.utm_medium), 255),
      utm_campaign: truncate(sanitizeText(body?.utm_campaign), 255),
      utm_content: truncate(sanitizeText(body?.utm_content), 255),
      utm_term: truncate(sanitizeText(body?.utm_term), 255),
      asset_class: truncate(sanitizeText(body?.asset_class), 64) ?? "retail",
      created_at: now,
      updated_at: now,
      consent: body?.consent === true ? true : false
    };

    if (!hasSupabase) {
      // Degraded mode: avoid 500 in preview, do not store sensitive data
      return NextResponse.json({ accepted: true, stored: false, note: 'supabase-env-missing' }, { status: 202 });
    }

    const row = await supabaseInsertLead(record);
    
    // Submit to HubSpot as well
    try {
      const hubspotPayload = buildHubspotPayload({
        email,
        firstname: sanitizeText(body?.firstname) || null,
        lastname: sanitizeText(body?.lastname) || null,
        phoneE164: sanitizeText(body?.phone) || null,
        capacity: sanitizeText(body?.asset_class) || null,
        utm: {
          utm_source: sanitizeText(body?.utm_source),
          utm_medium: sanitizeText(body?.utm_medium),
          utm_campaign: sanitizeText(body?.utm_campaign),
          utm_term: sanitizeText(body?.utm_term),
          utm_content: sanitizeText(body?.utm_content),
        },
        consent: body?.consent === true,
        pageUri: sanitizeText(body?.page_url),
        pageName: undefined
      });
      
      console.log('leads.hubspot_payload', { email, payload: hubspotPayload });
      const hubspotResult = await submitToHubspot(hubspotPayload);
      console.log('leads.hubspot_result', hubspotResult);
    } catch (hubspotError) {
      console.error('leads.hubspot_error', hubspotError);
      // Continue even if HubSpot fails
    }
    
    const token = row?.id ? issueLeadToken(row.id) : undefined;
    return NextResponse.json({ id: row?.id, lead: row, token });
  } catch (err: any) {
    console.error("POST /api/leads error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

