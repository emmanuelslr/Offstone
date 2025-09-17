export async function supabaseInsertLead(record: Record<string, any>) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY env var");
  }

  const res = await fetch(`${url}/rest/v1/leads_candidature`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify([record]),
    // Next.js fetch caching control (server-side)
    // @ts-ignore
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('🔍 Supabase insert error:', { status: res.status, text, url: `${url}/rest/v1/leads_candidature` });
    throw new Error(`Supabase insert error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function supabaseUpdateLeadById(id: string, fields: Record<string, any>) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY env var");
  }

  const res = await fetch(`${url}/rest/v1/leads_candidature?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(fields),
    // @ts-ignore
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('🔍 Supabase update error:', { status: res.status, text, url: `${url}/rest/v1/leads_candidature?id=eq.${encodeURIComponent(id)}` });
    throw new Error(`Supabase update error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}
