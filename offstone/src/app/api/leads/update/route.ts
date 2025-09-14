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
  const raw = typeof v === "number" ? String(v) : (v as string | null | undefined);
  if (!raw) return null;
  const s = raw.toString().toLowerCase().replace(/\s/g, "");
  if (s.includes("100") || s.includes("100k") || s.includes("100000")) return "100k+";
  if (s.includes("50") || s.includes("50k") || s.includes("50000")) return "50k";
  if (s.includes("20") || s.includes("20k") || s.includes("20000")) return "20k";
  if (s.includes("10") || s.includes("10k") || s.includes("<10")) return "<10k";
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
      .from("leads")
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
