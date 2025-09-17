import crypto from 'crypto';
import { NextResponse } from 'next/server';

function b64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function timingSafeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getSecretOrThrow(name: string, opts?: { allowDevDefault?: boolean; devDefault?: string }) {
  const v = process.env[name];
  if (!v) {
    if (process.env.NODE_ENV !== 'production' && opts?.allowDevDefault) {
      return opts.devDefault ?? 'dev-secret-unsafe';
    }
    throw new Error(`Missing required env: ${name}`);
  }
  return v;
}

export function issueLeadToken(id: string): string {
  // Temporairement utiliser une valeur par défaut pour debug
  const secret = process.env.LEAD_SIGNING_SECRET || 'dev-lead-secret-temp-2024';
  const payload = id;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest();
  return `v1.${b64url(sig)}`;
}

export function verifyLeadToken(id: string, token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  const [ver, sigPart] = token.split('.', 2);
  if (ver !== 'v1' || !sigPart) return false;
  const expected = issueLeadToken(id);
  const expectedSig = expected.split('.', 2)[1];
  return timingSafeEqual(sigPart, expectedSig);
}

export function getIP(req: Request): string {
  const h = (name: string) => req.headers.get(name) || '';
  // Common proxy headers
  const xff = h('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return h('x-real-ip') || h('cf-connecting-ip') || 'unknown';
}

function parseHost(u: string | undefined | null): string | null {
  if (!u) return null;
  try {
    const url = new URL(u);
    return url.host.toLowerCase();
  } catch {
    // Could be a bare host:port from header like "example.com:443"
    return u.toLowerCase();
  }
}

export function isTrustedOrigin(req: Request): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  
  // Si les variables d'environnement ne sont pas configurées, accepter en mode dégradé
  if (!process.env.SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL) {
    // Mode dégradé : accepter toutes les origines en production si pas de config
    return true;
  }
  
  const origin = req.headers.get('origin');
  const originHost = parseHost(origin);
  if (!originHost) return false;

  const allowed: string[] = [];
  const site = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
  // Include Vercel preview deployment host automatically when VERCEL_ENV=preview
  const vercelPreviewHost = (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL)
    ? `https://${process.env.VERCEL_URL}`
    : '';
  const toAdd = [site, process.env.TRUSTED_ORIGINS, vercelPreviewHost]
    .filter(Boolean)
    .flatMap((s) => (s ? String(s).split(',') : []))
    .map((s) => s.trim())
    .filter(Boolean);
  for (const s of toAdd) {
    const host = parseHost(s);
    if (host) allowed.push(host);
  }
  return allowed.includes(originHost);
}

type RateLimitResult = {
  allowed: boolean;
  // If a cookie should be set to persist the limiter state
  cookieName?: string;
  cookieValue?: string;
  cookieMaxAge?: number; // seconds
};

function sign(input: string, secret: string): string {
  return b64url(crypto.createHmac('sha256', secret).update(input).digest());
}

function encodeCookie(payload: object, secret: string, key: string): string {
  const data = b64url(Buffer.from(JSON.stringify(payload)));
  const mac = sign(`${data}|${key}`, secret);
  return `${data}.${mac}`;
}

function decodeCookie(value: string, secret: string, key: string): any | null {
  const [data, mac] = value.split('.', 2);
  if (!data || !mac) return null;
  const expected = sign(`${data}|${key}`, secret);
  if (!timingSafeEqual(mac, expected)) return null;
  try {
    return JSON.parse(Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

export function rateLimitByCookie(req: Request, key: string, limit: number, windowMs: number): RateLimitResult {
  const secret = getSecretOrThrow('RL_SIGNING_SECRET', { allowDevDefault: true, devDefault: 'dev-rl-secret' });
  const ip = getIP(req);
  const cookieKey = `${key}:${ip}`;
  const cookieName = `rl_${key}`;
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`${cookieName}=([^;]+)`));
  let rec = match ? decodeCookie(match[1], secret, cookieKey) : null;

  const now = Date.now();
  const windowStart = rec?.ws && typeof rec.ws === 'number' ? rec.ws : now;
  let count = rec?.c && typeof rec.c === 'number' ? rec.c : 0;

  if (now - windowStart > windowMs) {
    rec = { ws: now, c: 0 };
    count = 0;
  }
  count += 1;

  const allowed = count <= limit;
  const newPayload = { ws: windowStart, c: count };
  const cookieValue = encodeCookie(newPayload, secret, cookieKey);
  return { allowed, cookieName, cookieValue, cookieMaxAge: Math.ceil(windowMs / 1000) };
}

export function applyRateLimitCookie(res: NextResponse, result: RateLimitResult) {
  if (!result.cookieName || !result.cookieValue) return;
  res.cookies.set(result.cookieName, result.cookieValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: result.cookieMaxAge ?? 60,
  });
}

export function truncate(v: string | undefined | null, max = 1024): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  if (!s) return undefined;
  return s.length > max ? s.slice(0, max) : s;
}

export function validEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const e = email.trim();
  if (!e || e.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(e);
}

// =========================
// Stateless Proof-of-Work (PoW)
// =========================

function hmacSha256Hex(secret: string, input: string): string {
  return crypto.createHmac('sha256', secret).update(input).digest('hex');
}

function sha256(input: string): Buffer {
  return crypto.createHash('sha256').update(input).digest();
}

function leadingZeroBits(buf: Buffer): number {
  let bits = 0;
  for (let i = 0; i < buf.length; i++) {
    const v = buf[i];
    if (v === 0) { bits += 8; continue; }
    // Count leading zeros in byte
    for (let b = 7; b >= 0; b--) {
      if ((v & (1 << b)) === 0) bits++; else return bits;
    }
  }
  return bits;
}

export function issuePowChallenge(difficulty = Number(process.env.POW_DIFFICULTY || 12), ttlMs = 2 * 60_000): string {
  const secret = getSecretOrThrow('LEAD_SIGNING_SECRET', { allowDevDefault: true, devDefault: 'dev-lead-secret' });
  const now = Date.now();
  const payload = {
    v: 'v1',
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + ttlMs) / 1000),
    d: difficulty,
    s: b64url(crypto.randomBytes(16)),
  } as const;
  const data = b64url(Buffer.from(JSON.stringify(payload)));
  const mac = hmacSha256Hex(secret, data);
  return `v1.${data}.${mac}`;
}

export function verifyPowSolution(challenge: string | null | undefined, nonce: string | null | undefined): boolean {
  try {
    if (!challenge || !nonce) return false;
    const parts = challenge.split('.');
    if (parts.length !== 3) return false;
    const [ver, data, mac] = parts;
    if (ver !== 'v1' || !data || !mac) return false;
    const secret = getSecretOrThrow('LEAD_SIGNING_SECRET', { allowDevDefault: true, devDefault: 'dev-lead-secret' });
    const expected = hmacSha256Hex(secret, data);
    if (!timingSafeEqual(mac, expected)) return false;
    const json = JSON.parse(Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')) as { iat: number; exp: number; d: number; s: string };
    const nowSec = Math.floor(Date.now() / 1000);
    if (typeof json.exp !== 'number' || nowSec > json.exp) return false;
    const d = typeof json.d === 'number' ? json.d : 18;
    const h = crypto.createHash('sha256').update(`${challenge}.${nonce}`).digest();
    const lz = leadingZeroBits(h);
    return lz >= d;
  } catch {
    return false;
  }
}

export function rlEnabled(): boolean {
  return process.env.RATE_LIMIT_ENABLED !== 'false';
}

// Failure-only throttle: increments only when explicitly invoked (e.g., on validation/PoW failures)
export function throttleOnFailure(req: Request, key: string, limit: number, windowMs: number): RateLimitResult {
  const secret = getSecretOrThrow('RL_SIGNING_SECRET', { allowDevDefault: true, devDefault: 'dev-rl-secret' });
  const ip = getIP(req);
  const cookieKey = `fail:${key}:${ip}`;
  const cookieName = `fl_${key}`;
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`${cookieName}=([^;]+)`));
  let rec = match ? decodeCookie(match[1], secret, cookieKey) : null;

  const now = Date.now();
  const windowStart = rec?.ws && typeof rec.ws === 'number' ? rec.ws : now;
  let count = rec?.c && typeof rec.c === 'number' ? rec.c : 0;

  if (now - windowStart > windowMs) {
    rec = { ws: now, c: 0 };
    count = 0;
  }
  count += 1; // increment only on failure

  const allowed = count <= limit;
  const newPayload = { ws: windowStart, c: count };
  const cookieValue = encodeCookie(newPayload, secret, cookieKey);
  return { allowed, cookieName, cookieValue, cookieMaxAge: Math.ceil(windowMs / 1000) };
}
