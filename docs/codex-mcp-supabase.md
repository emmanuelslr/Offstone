Codex GPT + Supabase MCP (local server)

Overview
- This repo includes a tiny MCP-compatible server at `tools/supabase-mcp/` to operate your Supabase project from Codex GPT.
- It uses your local env vars (from `.env.local` at the repo root):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

Postgres (pg) mode
- To enable table creation and controlled SQL execution, also provide Postgres connection env vars (Supabase → Project Settings → Database → Connection info):
  - `PGHOST=aws-xxx.supabase.internal`
  - `PGPORT=6543`
  - `PGDATABASE=postgres`
  - `PGUSER=postgres`
  - `PGPASSWORD=********`
  - `PGSSLMODE=require`
- Security: These creds are sensitive. Do not log them. Keep `PGSSLMODE=require`.

1) Prepare env
- Create `.env.local` at the repo root:
```
SUPABASE_URL=https://<YOUR-REF>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

2) Build the MCP server
```
cd tools/supabase-mcp
npm i
npm run build
```

3) Configure Codex GPT (VS Code)
- Open the Codex GPT extension settings JSON.
- Add this MCP server config:
```
{
  "mcpServers": {
    "supabase-local": {
      "command": "node",
      "args": ["dist/server.js"],
      "cwd": "tools/supabase-mcp",
      "env": {
        "SUPABASE_URL": "${env:SUPABASE_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${env:SUPABASE_SERVICE_ROLE_KEY}"
      },
      "autoStart": true
    }
  }
}
```
- Restart Codex GPT. You should see `supabase-local` as a tool.

4) Use the tool (examples)
- Check table existence:
```
{"tool":"table_exists"}
{"tool":"table_exists","input":{"name":"leads"}}
```
- List tables:
```
{"tool":"list_tables"}
```
- Start a lead (dedupe open <30 days by email):
```
{"tool":"start_lead","input":{"email":"debug+codex@offstone.fr","context":{"utm_source":"codex_mcp"}}}
```
- Insert a lead directly:
```
{"tool":"insert_lead","input":{"email":"debug+codex@offstone.fr","values":{"status":"open"}}}
```
- Update a lead:
```
{"tool":"update_lead","input":{"id":"<LEAD_ID>","patch":{"ticket_target":"50k","discovery":"tv","wants_call":true}}}
```

- Create leads table (idempotent):
```
{"tool":"create_table_leads"}
```

- Run SQL (guarded, 15s timeout):
```
{"tool":"run_sql","input":{"sql":"select count(*) from public.leads"}}
```
Dangerous example (for demonstration only; avoid in practice):
```
{"tool":"run_sql","input":{"sql":"drop table public.leads","allowDangerous":true}}
```

Notes
- If pg env is not configured, create the `public.leads` table once in the Supabase SQL Editor (see the SQL in `offstone/README.md`). After that, the MCP can insert/update freely.
- The MCP server standardizes `ticket_target` ("<10k" | "20k" | "50k" | "100k+").
- Service Role key is server-only. Do not expose it in client code.
 - With pg mode configured, the MCP can create tables and run arbitrary SQL with a safety guard (blocks drop/alter/etc. unless `allowDangerous=true`).
