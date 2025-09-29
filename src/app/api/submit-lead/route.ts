import { NextResponse } from "next/server";
import { normalizePhoneNumber } from "@/lib/phone-normalization";
import {
  applyRateLimitCookie,
  getIP,
  rateLimitByCookie,
  rlEnabled,
  truncate,
  validEmail,
} from "@/lib/security";
import { supabaseUpsertProspect } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAPACITY_VALUES = new Set([
  "lt_20k",
  "20_50k",
  "50_100k",
  "100_500k",
  "500k_1m",
  "gt_1m",
]);

const HUBSPOT_DEFAULT_BASE = "https://api.hsforms.com/submissions/v3/integration/submit";

interface SubmitLeadBody {
  firstname?: unknown;
  lastname?: unknown;
  email?: unknown;
  phone?: unknown;
  capacite_investissement?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_term?: unknown;
  utm_content?: unknown;
  hutk?: unknown;
  pageUri?: unknown;
  pageName?: unknown;
  consentement_marketing?: unknown;
  form_priority?: unknown; // 'waitinglist' | 'opportunities' | 'newsletter'
  asset_class?: unknown; // 'retail' | 'mixed' | 'newsletter' | 'other'
}

type HubspotField = { name: string; value: string };
type HubspotPayload = {
  fields: HubspotField[];
  context: Record<string, string | undefined>;
};

type SupabaseRecord = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  consent: boolean;
  status: string;
  asset_class: string | null;
  page_url: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
};

function sanitize(value: unknown, max = 255): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function hubspotConfig() {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  if (!portalId || !formGuid) {
    throw new Error("Missing HubSpot environment variables HUBSPOT_PORTAL_ID or HUBSPOT_FORM_GUID");
  }
  const base = (process.env.HUBSPOT_FORMS_API || HUBSPOT_DEFAULT_BASE).replace(/\/$/, "");
  return {
    endpoint: `${base}/${portalId}/${formGuid}`,
  } as const;
}

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    return url.origin.toLowerCase();
  } catch {
    return null;
  }
}

const ALLOWED_ORIGINS = (() => {
  const values = new Set<string>();
  const add = (input?: string | null) => {
    if (!input) return;
    String(input)
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .forEach((item) => {
        const normalized = normalizeOrigin(item.endsWith("/") ? item.slice(0, -1) : item);
        if (normalized) values.add(normalized);
      });
  };

  add("https://offstone.fr");
  add("https://www.offstone.fr");
  add(process.env.SITE_URL);
  add(process.env.NEXT_PUBLIC_SITE_URL);
  add(process.env.TRUSTED_ORIGINS);
  add(process.env.SUBMIT_LEAD_ALLOWED_ORIGINS);

  if (process.env.NODE_ENV !== "production") {
    add("http://localhost:3000");
    add("http://localhost:3001");
    add("http://127.0.0.1:3000");
    add("http://127.0.0.1:3001");
  }

  const vercelPreview = process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
  add(vercelPreview);

  return values;
})();

function ensureAllowedOrigin(req: Request): { allowed: boolean; originHeader: string | null } {
  const origin = req.headers.get("origin");
  if (!origin) {
    return { allowed: true, originHeader: null };
  }
  const normalized = normalizeOrigin(origin);
  if (!normalized || !ALLOWED_ORIGINS.has(normalized)) {
    return { allowed: false, originHeader: origin };
  }
  return { allowed: true, originHeader: origin };
}

function applyCorsHeaders(req: Request, res: NextResponse) {
  const origin = req.headers.get("origin");
  if (!origin) {
    res.headers.append("Vary", "Origin");
    return;
  }
  const normalized = normalizeOrigin(origin);
  if (normalized && ALLOWED_ORIGINS.has(normalized)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  res.headers.append("Vary", "Origin");
}

function createSupabaseRecord(params: {
  payload: SubmitLeadBody;
  email: string;
  firstname: string | null;
  lastname: string | null;
  phoneRaw: string | null;
  phoneE164: string | null;
  capacity: string | null;
  utm: Record<string, string | undefined>;
  submittedAt: string;
  ip: string | null;
  userAgent: string | null;
}): SupabaseRecord {
  return {
    email: params.email,
    first_name: params.firstname,
    last_name: params.lastname,
    phone: params.phoneE164, // Use E164 format for phone
    consent: params.payload.consentement_marketing === true,
    status: 'open', // Default status
    asset_class: params.capacity === 'retail' ? 'retail' : 'other', // Map capacity to asset_class
    page_url: params.payload.pageUri || null,
    utm_source: params.utm.utm_source ?? null,
    utm_medium: params.utm.utm_medium ?? null,
    utm_campaign: params.utm.utm_campaign ?? null,
    utm_content: params.utm.utm_content ?? null,
  };
}

export function buildHubspotPayload(input: {
  email: string;
  firstname: string | null;
  lastname: string | null;
  phoneE164: string | null;
  capacity: string | null;
  utm: Record<string, string | undefined>;
  consent?: boolean;
  hutk?: string;
  pageUri?: string;
  pageName?: string;
  ipAddress?: string | null;
}): HubspotPayload {
  const fields: HubspotField[] = [
    { name: "email", value: input.email },
  ];

  if (input.firstname) {
    fields.push({ name: "firstname", value: input.firstname });
  }
  if (input.lastname) {
    fields.push({ name: "lastname", value: input.lastname });
  }
  if (input.phoneE164) {
    fields.push({ name: "phone", value: input.phoneE164 });
    fields.push({ name: "mobilephone", value: input.phoneE164 });
  }
  if (input.capacity) {
    fields.push({ name: "capacite_investissement", value: input.capacity });
  }

  // Consent field removed - not needed for HubSpot form

  // Add all 5 UTM fields
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = input.utm[key];
    if (value) {
      fields.push({ name: key, value });
    }
  }

  const context: Record<string, string | undefined> = {};
  if (input.hutk) context.hutk = input.hutk;
  if (input.pageUri) context.pageUri = input.pageUri;
  if (input.pageName) context.pageName = input.pageName;
  if (input.ipAddress) context.ipAddress = input.ipAddress;

  return { fields, context };
}

export async function submitToHubspot(payload: HubspotPayload) {
  const { endpoint } = hubspotConfig();
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  };
  const response = await fetch(endpoint, requestInit);
  const raw = await response.text();
  let data: unknown = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }
  return { response, data } as const;
}

export async function OPTIONS(req: Request) {
  const originCheck = ensureAllowedOrigin(req);
  if (!originCheck.allowed) {
    const res = new NextResponse(null, { status: 403 });
    applyCorsHeaders(req, res);
    return res;
  }
  const res = new NextResponse(null, { status: 204 });
  applyCorsHeaders(req, res);
  res.headers.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.headers.set("Access-Control-Max-Age", "86400");
  return res;
}

export async function POST(req: Request) {
  const originCheck = ensureAllowedOrigin(req);
  if (!originCheck.allowed) {
    const res = NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
    applyCorsHeaders(req, res);
    return res;
  }

  const rateLimiter = rlEnabled() ? rateLimitByCookie(req, "submit_lead", 2000, 60_000) : null;
  if (rateLimiter && !rateLimiter.allowed) {
    const res = NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    applyCorsHeaders(req, res);
    applyRateLimitCookie(res, rateLimiter);
    return res;
  }

  let body: SubmitLeadBody;
  try {
    body = (await req.json()) as SubmitLeadBody;
  } catch {
    const res = NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    applyCorsHeaders(req, res);
    if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
    return res;
  }

  const email = sanitize(body.email)?.toLowerCase();
  if (!email || !validEmail(email)) {
    const res = NextResponse.json({ error: "Invalid email" }, { status: 400 });
    applyCorsHeaders(req, res);
    if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
    return res;
  }

  const firstname = sanitize(body.firstname, 128) ?? null;
  const lastname = sanitize(body.lastname, 128) ?? null;

  const phoneRaw = sanitize(body.phone, 64) ?? null;
  let phoneE164: string | null = null;
  if (phoneRaw) {
    const normalized = normalizePhoneNumber(phoneRaw);
    if (!normalized.isValid || !normalized.phoneE164) {
      const res = NextResponse.json({ error: normalized.error || "Invalid phone" }, { status: 400 });
      applyCorsHeaders(req, res);
      if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
      return res;
    }
    phoneE164 = normalized.phoneE164;
  }

  const capacityRaw = sanitize(body.capacite_investissement);
  let capacity: string | null = null;
  if (capacityRaw) {
    if (!CAPACITY_VALUES.has(capacityRaw)) {
      const res = NextResponse.json({ error: "Invalid capacite_investissement" }, { status: 400 });
      applyCorsHeaders(req, res);
      if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
      return res;
    }
    capacity = capacityRaw;
  }

  const assetClass = sanitize(body.asset_class) || 'retail';

  const utm = {
    utm_source: sanitize(body.utm_source),
    utm_medium: sanitize(body.utm_medium),
    utm_campaign: sanitize(body.utm_campaign),
    utm_term: sanitize(body.utm_term),
    utm_content: sanitize(body.utm_content),
  };

  const submittedAt = new Date().toISOString();
  const ip = (() => {
    const value = getIP(req);
    return !value || value === "unknown" ? null : value;
  })();
  const userAgent = sanitize(req.headers.get("user-agent"), 1024) ?? null;

  // Determine form priority
  const formPriority = sanitize(body.form_priority) || 'waitinglist'; // Default to highest priority
  const priorityLevels = { 'waitinglist': 3, 'opportunities': 2, 'newsletter': 1 };
  const currentPriority = priorityLevels[formPriority as keyof typeof priorityLevels] || 1;

  // Check if contact already exists with higher priority
  let shouldUpdate = true;
  try {
    const { data: existingContact } = await supabaseUpsertProspect({
      email,
      first_name: firstname,
      last_name: lastname,
      phone: phoneE164,
      consent: body.consentement_marketing === true,
      status: 'open',
      asset_class: assetClass,
      page_url: body.pageUri || null,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
    });
    
    // If contact exists, check priority
    if (existingContact) {
      const existingPriority = existingContact.form_priority ? 
        priorityLevels[existingContact.form_priority as keyof typeof priorityLevels] || 1 : 1;
      
      if (existingPriority > currentPriority) {
        console.info("submit_lead.priority_skip", { 
          email, 
          currentPriority, 
          existingPriority, 
          formPriority 
        });
        shouldUpdate = false;
      }
    }
  } catch (error) {
    console.warn("submit_lead.priority_check_failed", { email, error });
    // Continue with update if priority check fails
  }

  const supabaseRecord = createSupabaseRecord({
    payload: body,
    email,
    firstname,
    lastname,
    phoneRaw,
    phoneE164,
    capacity,
    utm,
    submittedAt,
    ip,
    userAgent,
  });

  // Add form priority to record
  (supabaseRecord as any).form_priority = formPriority;

  let supabaseStored = false;
  if (shouldUpdate) {
    try {
      const stored = await supabaseUpsertProspect(supabaseRecord);
      supabaseStored = Boolean(stored);
      console.info("submit_lead.supabase_upsert_ok", { email, stored: supabaseStored, formPriority });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("submit_lead.supabase_upsert_failed", { email, error: message });
      const res = NextResponse.json({ error: "Supabase upsert failed" }, { status: 500 });
      applyCorsHeaders(req, res);
      if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
      return res;
    }
  } else {
    console.info("submit_lead.priority_skip_update", { email, formPriority });
    supabaseStored = true; // Consider it "stored" even if we skipped
  }

  // Only include hutk if it's a valid HubSpot tracking cookie
  const hutkValue = sanitize(body.hutk, 256);
  const isValidHubspotCookie = hutkValue && hutkValue.length > 10 && /^[a-f0-9-]+$/i.test(hutkValue);
  
  const hubspotPayload = buildHubspotPayload({
    email,
    firstname,
    lastname,
    phoneE164,
    capacity,
    utm,
    consent: body.consentement_marketing === true,
    hutk: isValidHubspotCookie ? hutkValue : undefined,
    pageUri: truncate(body.pageUri, 2048),
    pageName: truncate(body.pageName, 512),
    ipAddress: ip,
  });

  console.info("submit_lead.hubspot_payload", { email, payload: hubspotPayload });
  
  let hubspotOutcome: Awaited<ReturnType<typeof submitToHubspot>>;
  try {
    hubspotOutcome = await submitToHubspot(hubspotPayload);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("submit_lead.hubspot_request_failed", { email, error: message });
    const res = NextResponse.json({ error: "HubSpot request failed", supabaseStored }, { status: 502 });
    applyCorsHeaders(req, res);
    if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
    return res;
  }

  if (!hubspotOutcome.response.ok) {
    console.error("submit_lead.hubspot_error", {
      email,
      status: hubspotOutcome.response.status,
      body: hubspotOutcome.data,
    });
    const res = NextResponse.json({
      error: "HubSpot rejected the submission",
      status: hubspotOutcome.response.status,
      body: hubspotOutcome.data,
      supabaseStored,
    }, { status: 502 });
    applyCorsHeaders(req, res);
    if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
    return res;
  }

  console.info("submit_lead.hubspot_success", {
    email,
    status: hubspotOutcome.response.status,
  });

  const res = NextResponse.json({
    status: hubspotOutcome.response.status,
    hubspot: hubspotOutcome.data,
    supabaseStored,
    phone: {
      raw: phoneRaw,
      e164: phoneE164,
    },
  });
  applyCorsHeaders(req, res);
  if (rateLimiter) applyRateLimitCookie(res, rateLimiter);
  return res;
}
