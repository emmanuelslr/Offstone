#!/usr/bin/env node
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

// Try to load env from repo root .env.local as well
try {
  const { default: dotenv } = await import('dotenv');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // ../.env.local relative to offstone/scripts/
  dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
  dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
} catch {}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, { db: { schema: 'public' } });

function parseArgs(argv) {
  const args = {};
  let i = 0;
  while (i < argv.length) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[k] = v;
    } else if (!args._) {
      args._ = [a];
    } else {
      args._.push(a);
    }
    i++;
  }
  return args;
}

async function checkTable() {
  const { data, error, status } = await supabase.from('leads').select('id').limit(1);
  if (error) {
    console.log(JSON.stringify({ ok: true, exists: false, status, error: error.message }));
    return;
  }
  console.log(JSON.stringify({ ok: true, exists: true, sample: (data && data[0]) || null }));
}

async function insertLead({ email, page_url, ref, utm_source, utm_medium, utm_campaign, utm_content, utm_term, asset_class, article_uid }) {
  if (!email) {
    console.error('Usage: insert --email someone@example.com [--asset_class general] [--article_uid uid]');
    process.exit(1);
  }
  const payload = {
    email,
    status: 'open',
    page_url,
    ref,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    asset_class,
    article_uid,
  };
  const { data, error } = await supabase.from('leads').insert(payload).select('id').single();
  if (error) {
    console.log(JSON.stringify({ ok: false, error: error.message }));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, id: data?.id }));
}

async function updateLead({ id, patch }) {
  if (!id) {
    console.error('Usage: update --id <uuid> --patch "{\"status\":\"completed\"}"');
    process.exit(1);
  }
  let body = {};
  if (patch) {
    try { body = JSON.parse(patch); } catch { console.error('Invalid JSON for --patch'); process.exit(1); }
  }
  body.updated_at = new Date().toISOString();
  const { error } = await supabase.from('leads').update(body).eq('id', id);
  if (error) {
    console.log(JSON.stringify({ ok: false, error: error.message }));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true }));
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);
  switch (cmd) {
    case 'check':
    case 'check-table':
      await checkTable();
      break;
    case 'insert':
      await insertLead(args);
      break;
    case 'update':
      await updateLead(args);
      break;
    default:
      console.log('Usage:\n  node scripts/supabase-admin.mjs check\n  node scripts/supabase-admin.mjs insert --email someone@example.com [--asset_class general] [--article_uid uid]\n  node scripts/supabase-admin.mjs update --id <uuid> --patch "{\\"status\\":\\"completed\\"}"');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

