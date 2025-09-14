import { createClient } from "@supabase/supabase-js";
import { Pool } from "pg";

// Expect env to be provided by Codex GPT mapping from your .env.local
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.log(JSON.stringify({ ok: false, error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env" }));
  process.exit(1);
}

const supabase = createClient(url, key, { db: { schema: "public" } });

// Optional direct Postgres connection for DDL and controlled SQL
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : undefined,
});

async function queryWithTimeout(sql: string, params?: any[], timeoutMs = 15000) {
  return await Promise.race([
    pool.query(sql, params),
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
  ]);
}

type Msg =
  | { tool: "ping" }
  | { tool: "table_exists"; input?: { name?: string } }
  | { tool: "list_tables" }
  | { tool: "create_table_leads" }
  | { tool: "run_sql"; input: { sql: string; allowDangerous?: boolean } }
  | { tool: "create_table_if_not_exists"; input: { name: string } }
  | { tool: "start_lead"; input: { email: string; context?: Record<string, any> } }
  | { tool: "insert_lead"; input: { email: string; values?: Record<string, any> } }
  | { tool: "update_lead"; input: { id: string; patch: Record<string, any> } }
  | { tool: "upsert_lead"; input: { payload: Record<string, any> } }
  | { tool: "get_lead"; input: { id: string } }
  | { tool: "list_recent"; input?: { limit?: number } }
  | { tool: "health" }
  | { tool: "create_table_via_rest" };

async function tableExists(name?: string) {
  if (!name) {
    // Fallback to checking leads via REST
    const { error } = await supabase.from("leads").select("id").limit(1);
    if (error) return { ok: true, exists: false };
    return { ok: true, exists: true };
  }
  try {
    const res = await queryWithTimeout(
      `select 1 from information_schema.tables where table_schema='public' and table_name=$1 limit 1`,
      [name]
    );
    return { ok: true, exists: (res as any).rowCount > 0 };
  } catch (e) {
    return { ok: false, error: "table_exists_failed" };
  }
}

async function listTables() {
  try {
    const res = (await queryWithTimeout(
      `select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE' order by table_name`
    )) as any;
    return { ok: true, tables: res.rows.map((r: any) => r.table_name) };
  } catch (e) {
    return { ok: false, error: "list_tables_failed" };
  }
}

const LEADS_DDL = `create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  status text default 'open',
  email text not null,
  ticket_target text,
  discovery text,
  wants_call boolean,
  first_name text,
  last_name text,
  phone text,
  consent boolean default false,
  asset_class text,
  article_uid text,
  page_url text,
  ref text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);`;
async function createTableLeads() {
  const createSQL = LEADS_DDL;
  try {
    await queryWithTimeout('BEGIN');
    // Split manual statements to avoid multi-statement ambiguity
    const stmts = createSQL.split(';').map(s => s.trim()).filter(Boolean);
    for (const s of stmts) {
      await queryWithTimeout(s);
    }
    await queryWithTimeout('COMMIT');
    return { ok: true, table: 'public.leads' };
  } catch (e) {
    try { await queryWithTimeout('ROLLBACK'); } catch {}
    return { ok: false, error: 'create_table_failed' };
  }
}

const dangerousRe = /(\bdrop\b|\btruncate\b|\balter\b|\bgrant\b|\brevoke\b|create\s+role|create\s+extension|create\s+user|drop\s+role|drop\s+extension|drop\s+schema|alter\s+system|\bvacuum\b|\banalyze\b|\bcluster\b)/i;

async function runSQL(sql: string, allowDangerous?: boolean) {
  if (!sql || typeof sql !== 'string') return { ok: false, error: 'missing_sql' };
  const isDanger = dangerousRe.test(sql);
  if (isDanger && !allowDangerous) return { ok: false, error: 'dangerous_sql_blocked' };
  try {
    const res = (await queryWithTimeout(sql)) as any;
    const rows = Array.isArray(res?.rows) ? res.rows.slice(0, 100) : [];
    return { ok: true, rowCount: res?.rowCount ?? 0, rows };
  } catch (e) {
    return { ok: false, error: 'run_sql_failed' };
  }
}

// Helpers
const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function createTableIfNotExists(name: string) {
  if (name !== 'leads') return { ok: false, error: 'unsupported_table' } as const;
  return createTableLeads();
}

async function upsertLead(payload: Record<string, any>) {
  const email = payload?.email as string | undefined;
  if (!email || !/.+@.+\..+/.test(email)) return { ok: false, error: 'bad_email' } as const;
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: existing, error: findErr } = await supabase
    .from('leads')
    .select('id,status')
    .eq('email', email)
    .eq('status', 'open')
    .gte('created_at', cutoff)
    .limit(1)
    .maybeSingle();
  if (findErr) return { ok: false, error: findErr.message } as const;
  if (existing?.id) return { ok: true, id: existing.id, status: existing.status } as const;
  const insertPayload = { status: 'open', ...payload };
  const { data, error } = await supabase.from('leads').insert(insertPayload).select('id,status').single();
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true, id: data?.id, status: data?.status } as const;
}

async function getLead(id: string) {
  if (!uuidRe.test(id)) return { ok: false, error: 'bad_id' } as const;
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).maybeSingle();
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true, lead: data ?? null } as const;
}

async function listRecent(limit = 10) {
  const n = Math.max(1, Math.min(100, Number(limit) || 10));
  const { data, error } = await supabase
    .from('leads')
    .select('id,created_at,status,email,ticket_target,discovery,wants_call,first_name,last_name,phone,consent')
    .order('created_at', { ascending: false })
    .limit(n);
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true, rows: data } as const;
}

async function health() {
  try {
    const res = (await queryWithTimeout('select now() as now')) as any;
    const t = res?.rows?.[0]?.now ? new Date(res.rows[0].now).toISOString() : new Date().toISOString();
    return { ok: true, db: 'connected', time: t } as const;
  } catch (e: any) {
    const msg = typeof e?.message === 'string' ? e.message.slice(0, 200) : 'connection_failed';
    return { ok: false, db: 'disconnected', error: msg } as const;
  }
}

// Fallback: attempt DDL via REST RPC if a helper function exists server-side.
// This requires a Postgres function (e.g., exec_sql(sql text)) to be deployed in your DB.
async function createTableViaRest() {
  // Guard: no dangerous statements
  if (dangerousRe.test(LEADS_DDL)) return { ok: false, error: 'dangerous_sql_blocked' } as const;
  // Try common function names
  const candidates = ['exec_sql', 'execute_sql'];
  for (const fn of candidates) {
    const { error } = await supabase.rpc(fn, { sql: LEADS_DDL } as any);
    if (!error) return { ok: true, via: 'rpc', function: fn } as const;
  }
  return { ok: false, error: 'rpc_sql_helper_missing' } as const;
}

function normalizeTicketTarget(v: unknown) {
  const raw = typeof v === "number" ? String(v) : (v as string | null | undefined);
  if (!raw) return null;
  const s = raw.toString().toLowerCase().replace(/\s/g, "");
  if (s.includes("100") || s.includes("100k") || s.includes("100000")) return "100k+";
  if (s.includes("50") || s.includes("50k") || s.includes("50000")) return "50k";
  if (s.includes("20") || s.includes("20k") || s.includes("20000")) return "20k";
  if (s.includes("10") || s.includes("10k") || s.includes("<10")) return "<10k";
  return null;
}

async function startLead(email: string, context?: Record<string, any>) {
  if (!email || !/.+@.+\..+/.test(email)) return { ok: false, error: "bad_email" } as const;
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: existing, error: findErr } = await supabase
    .from("leads")
    .select("id")
    .eq("email", email)
    .eq("status", "open")
    .gte("created_at", cutoff)
    .limit(1)
    .maybeSingle();
  if (findErr) return { ok: false, error: findErr.message } as const;
  if (existing?.id) return { ok: true, lead_id: existing.id, reused: true } as const;

  const insertPayload = {
    email,
    status: "open" as const,
    ...context,
  };
  const { data: created, error: insertErr } = await supabase
    .from("leads")
    .insert(insertPayload)
    .select("id")
    .single();
  if (insertErr) return { ok: false, error: insertErr.message } as const;
  return { ok: true, lead_id: created.id, reused: false } as const;
}

async function insertLead(email: string, values?: Record<string, any>) {
  if (!email) return { ok: false, error: "missing_email" } as const;
  const payload = { email, status: "open", ...(values || {}) };
  const { data, error } = await supabase.from("leads").insert(payload).select("id").single();
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true, id: data?.id } as const;
}

async function updateLead(id: string, patch: Record<string, any>) {
  if (!id) return { ok: false, error: "missing_id" } as const;
  const body: Record<string, any> = { ...patch, updated_at: new Date().toISOString() };
  if (Object.prototype.hasOwnProperty.call(patch, "ticket_target")) {
    body.ticket_target = normalizeTicketTarget(patch.ticket_target);
  }
  const { error } = await supabase.from("leads").update(body).eq("id", id);
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true } as const;
}

async function handle(msg: Msg) {
  switch (msg.tool) {
    case "ping":
      return { ok: true, pong: true };
    case "table_exists":
      return tableExists(msg.input?.name);
    case "list_tables":
      return listTables();
    case "create_table_leads":
      return createTableLeads();
    case "run_sql":
      return runSQL(msg.input.sql, msg.input.allowDangerous);
    case "create_table_if_not_exists":
      return createTableIfNotExists(msg.input.name);
    case "create_table_via_rest":
      return createTableViaRest();
    case "start_lead":
      return startLead(msg.input.email, msg.input.context);
    case "insert_lead":
      return insertLead(msg.input.email, msg.input.values);
    case "update_lead":
      return updateLead(msg.input.id, msg.input.patch);
    case "upsert_lead":
      return upsertLead(msg.input.payload);
    case "get_lead":
      return getLead(msg.input.id);
    case "list_recent":
      return listRecent(msg.input?.limit);
    case "health":
      return health();
    default:
      return { ok: false, error: "unknown_tool" };
  }
}

async function run() {
  process.stdin.setEncoding("utf8");
  // Signal readiness to the client
  console.log(JSON.stringify({ ready: true }));
  for await (const line of process.stdin) {
    const raw = line.trim();
    if (!raw) continue;
    try {
      const msg = JSON.parse(raw);
      const res = await handle(msg);
      console.log(JSON.stringify(res));
    } catch (e: any) {
      console.log(JSON.stringify({ ok: false, error: e?.message || "failed" }));
    }
  }
}

run();

// Graceful shutdown
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig as NodeJS.Signals, async () => {
    try { await pool.end(); } catch {}
    process.exit(0);
  });
}
