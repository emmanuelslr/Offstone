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
    console.error('?? Supabase insert error:', { status: res.status, text, url: `${url}/rest/v1/leads_candidature` });
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
    console.error('?? Supabase update error:', { status: res.status, text, url: `${url}/rest/v1/leads_candidature?id=eq.${encodeURIComponent(id)}` });
    throw new Error(`Supabase update error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function supabaseGetProspectByEmail(email: string) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY env var");
  }

  const endpoint = `${url}/rest/v1/leads_candidature?email=eq.${encodeURIComponent(email)}&order=created_at.desc&limit=1`;
  const requestInit: RequestInit = {
    method: "GET",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };
  const res = await fetch(endpoint, requestInit);

  if (!res.ok) {
    const text = await res.text();
    console.error('?? Supabase leads_candidature get error:', { status: res.status, text, url: endpoint });
    throw new Error(`Supabase leads_candidature get error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

export async function supabaseUpsertProspect(record: Record<string, unknown>) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY env var");
  }

  const email = record.email as string;
  if (!email) {
    throw new Error("Email is required for upsert");
  }

  // 1. Check if email already exists
  const existing = await supabaseGetProspectByEmail(email);

  if (existing) {
    // 2. UPDATE existing record
    console.log('📝 Email exists, updating record:', email);
    const endpoint = `${url}/rest/v1/leads_candidature?email=eq.${encodeURIComponent(email)}`;
    const requestInit: RequestInit = {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(record),
      cache: "no-store",
    };
    const res = await fetch(endpoint, requestInit);

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Supabase leads_candidature update error:', { status: res.status, text, url: endpoint });
      throw new Error(`Supabase leads_candidature update error: ${res.status} ${text}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } else {
    // 3. INSERT new record
    console.log('✨ New email, inserting record:', email);
    const endpoint = `${url}/rest/v1/leads_candidature`;
    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify([record]),
      cache: "no-store",
    };
    const res = await fetch(endpoint, requestInit);

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ Supabase leads_candidature insert error:', { status: res.status, text, url: endpoint });
      throw new Error(`Supabase leads_candidature insert error: ${res.status} ${text}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  }
}





