MCP Supabase — Usage

Overview
- Local MCP server to operate Supabase from Codex GPT.
- Supports REST (via @supabase/supabase-js) and direct Postgres (pg) for DDL and controlled SQL.

Env (repo root .env.local)
- SUPABASE_URL=https://<YOUR-REF>.supabase.co
- SUPABASE_SERVICE_ROLE_KEY=...
- (pg mode for DDL/SQL)
  - PGHOST=aws-xxx.supabase.internal
  - PGPORT=6543
  - PGDATABASE=postgres
  - PGUSER=postgres
  - PGPASSWORD=********
  - PGSSLMODE=require

Install & build
```
cd tools/supabase-mcp
npm i
npm run build
```

Run (from Codex GPT)
- Configure MCP:
```
{
  "mcpServers": {
    "supabase-local": {
      "command": "node",
      "args": ["dist/server.js"],
      "cwd": "tools/supabase-mcp",
      "env": {
        "SUPABASE_URL": "${env:SUPABASE_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${env:SUPABASE_SERVICE_ROLE_KEY}",
        "PGHOST": "${env:PGHOST}",
        "PGPORT": "${env:PGPORT}",
        "PGDATABASE": "${env:PGDATABASE}",
        "PGUSER": "${env:PGUSER}",
        "PGPASSWORD": "${env:PGPASSWORD}",
        "PGSSLMODE": "${env:PGSSLMODE}"
      },
      "autoStart": true
    }
  }
}
```

Available tools (examples)
- Health:
  - `{ "tool":"health" }` → `{ ok:true, db:"connected", time:"<ISO>" }`
- List tables:
  - `{ "tool":"list_tables" }` → `{ ok:true, tables:[...] }`
- Table exists:
  - `{ "tool":"table_exists", "input": { "name":"leads" } }` → `{ ok:true, exists:true|false }`
- Create table (idempotent):
  - `{ "tool":"create_table_leads" }` or `{ "tool":"create_table_if_not_exists", "input": {"name":"leads"} }` → `{ ok:true }`
- Run SQL (guarded):
  - `{ "tool":"run_sql", "input": { "sql":"select count(*) from public.leads" } }`
- Start lead (dedupe <30j):
  - `{ "tool":"start_lead", "input": { "email":"user@example.com", "context": {"utm_source":"mcp"} } }`
- Upsert lead (minimal payload):
  - `{ "tool":"upsert_lead", "input": { "payload": { "email":"user@example.com", "status":"open" } } }`
- Insert lead (raw):
  - `{ "tool":"insert_lead", "input": { "email":"user@example.com", "values": {"status":"open"} } }`
- Update lead:
  - `{ "tool":"update_lead", "input": { "id":"<UUID>", "patch": {"ticket_target":"50k","discovery":"tv"} } }`
- Get lead by id:
  - `{ "tool":"get_lead", "input": { "id":"<UUID>" } }` → `{ ok:true, lead:{...} }`
- List recent leads:
  - `{ "tool":"list_recent", "input": { "limit": 5 } }` → `{ ok:true, rows:[...] }`

Security guards
- No secrets are logged or returned.
- SQL guard blocks drop/alter/truncate/grant/revoke unless `allowDangerous=true`.
- 15s timeout for SQL operations.
- Basic input validation (UUID/email/limit 1..100).

Playbook (Init + QA)
1) Ensure pg env is set (for DDL).
2) Create table if missing:
   - `{ "tool":"create_table_if_not_exists", "input": { "name":"leads" } }` → `{ ok:true }`
3) Verify existence:
   - `{ "tool":"table_exists", "input": { "name":"leads" } }` → `{ ok:true, exists:true }`
4) Upsert a minimal lead:
   - `{ "tool":"upsert_lead", "input": { "payload": { "email":"debug+mcp@offstone.fr", "status":"open", "utm_source":"mcp_init" } } }`
   - Expected: `{ ok:true, id:"<uuid>", status:"open" }`
5) Get the lead:
   - `{ "tool":"get_lead", "input": { "id":"<uuid>" } }` → returns the row
6) List recent:
   - `{ "tool":"list_recent", "input": { "limit": 5 } }` → row appears first

QA results (fill after running)
- create_table_if_not_exists: OK/KO
- table_exists (leads): OK/KO (exists:true)
- upsert_lead: OK/KO (id=...)
- get_lead: OK/KO (row returned)
- list_recent: OK/KO (row at top)

