#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Load env from repo root .env.local for local runs (Codex MCP usually injects env itself)
try {
  const { default: dotenv } = await import('dotenv');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
} catch {}

const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const server = spawn('node', ['dist/server.js'], {
  cwd,
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    // allow running locally without MCP mapping
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    PGHOST: process.env.PGHOST,
    PGPORT: process.env.PGPORT,
    PGDATABASE: process.env.PGDATABASE,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PGSSLMODE: process.env.PGSSLMODE || 'require',
  },
});

const steps = [
  { tool: 'health' },
  { tool: 'create_table_if_not_exists', input: { name: 'leads' } },
  { tool: 'table_exists', input: { name: 'leads' } },
  { tool: 'upsert_lead', input: { payload: { email: 'debug+mcp@offstone.fr', status: 'open', utm_source: 'mcp_init' } } },
  { tool: 'list_recent', input: { limit: 5 } },
];

let ready = false;
let stepIdx = 0;

server.stdout.on('data', (buf) => {
  const text = buf.toString().trim();
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    try {
      const msg = JSON.parse(line);
      if (!ready && msg && msg.ready) {
        ready = true;
        server.stdin.write(JSON.stringify(steps[0]) + '\n');
        return;
      }
      // Print each response plainly
      console.log(msg);
      stepIdx++;
      if (stepIdx < steps.length) {
        server.stdin.write(JSON.stringify(steps[stepIdx]) + '\n');
      } else {
        server.stdin.end();
      }
    } catch {
      // passthrough non-JSON lines if any
      console.log(line);
    }
  }
});

server.stderr.on('data', (buf) => {
  process.stderr.write(buf);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error('MCP server exited with code', code);
    console.error('Ensure .env.local contains SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and PG* (public host).');
  }
});

