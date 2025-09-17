import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabaseServer";

type PatchBody = {
  lead_id?: string;
  patch?: {
    ticket_target?: string | number | null;
    discovery?: string | null;
    wants_call?: boolean | null;
    first_name?: string | null;
    last_name?: string | null;
    phone?: string | null;
    consent?: boolean | null;
    status?: string | null;
  };
};

const normalizeTicketTarget = (v: unknown) => {
  if (v === null || v === undefined) return null;

  // Numeric inputs are treated as an absolute amount in euros
  if (typeof v === "number" && !Number.isNaN(v)) {
    const n = v;
    if (n < 20000) return "lt_20k";
    if (n < 50000) return "20k_50k";
    if (n < 100000) return "50k_100k";
    if (n < 500000) return "100k_500k";
    if (n < 1000000) return "500k_1m";
    return "gt_1m";
  }

  const raw = String(v);
  // Normalize string for robust matching: lower-case, remove accents, spaces, currency, punctuation
  const s = raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[\s€\u202f]/g, "") // spaces, euro signs, narrow spaces
    .replace(/[.,]/g, "") // separators
    .replace(/[–—-]/g, ""); // dashes

  // Expected canonical tokens from UI
  if (/^lt_?20k$/.test(s) || /moinsde20k/.test(s) || /^<20k$/.test(s) || /^0?20k$/.test(s)) return "lt_20k";
  if (/^20k_?50k$/.test(s) || /20k50k/.test(s)) return "20k_50k";
  if (/^50k_?100k$/.test(s) || /50k100k/.test(s)) return "50k_100k";
  if (/^100k_?500k$/.test(s) || /100k500k/.test(s)) return "100k_500k";
  if (/^500k_?1m$/.test(s) || /500k1m/.test(s)) return "500k_1m";
  if (/^gt_?1m$/.test(s) || /plusde1m/.test(s) || /^>1m$/.test(s) || /1m\+/.test(raw)) return "gt_1m";

  // Legacy tokens support (mapped approximately to new buckets)
  const legacy = raw.toLowerCase().replace(/\s/g, "");
  if (legacy.includes("100k")) return "100k_500k"; // legacy "100k+" → bucket starting at 100k
  if (legacy.includes("50k")) return "50k_100k";
  if (legacy.includes("20k")) return "20k_50k";
  if (legacy.includes("<10") || legacy.includes("10k")) return "lt_20k";

  return null;
};

export async function PATCH(req: Request) {
  try {
    const { lead_id, patch }: PatchBody = await req.json().catch(() => ({}));

    if (!lead_id) {
      return NextResponse.json({ error: "Missing lead_id" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (patch) {
      if (Object.prototype.hasOwnProperty.call(patch, "ticket_target")) {
        updates.ticket_target = normalizeTicketTarget(patch.ticket_target ?? null);
      }
      if (Object.prototype.hasOwnProperty.call(patch, "discovery")) {
        updates.discovery = patch.discovery ?? null;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "wants_call")) {
        updates.wants_call = patch.wants_call ?? null;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "first_name")) {
        updates.first_name = patch.first_name ?? null;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "last_name")) {
        updates.last_name = patch.last_name ?? null;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "phone")) {
        updates.phone = patch.phone ?? null;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "consent")) {
        updates.consent = patch.consent ?? false;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "status")) {
        // allow only known statuses if provided
        const s = (patch.status ?? "").toString().toLowerCase();
        if (s === "completed" || s === "open") {
          updates.status = s;
        }
      }
    }

    if (Object.keys(updates).length <= 1) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const { error: updateErr } = await supabaseServer
      .from("leads_candidature")
      .update(updates)
      .eq("id", lead_id);

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}
