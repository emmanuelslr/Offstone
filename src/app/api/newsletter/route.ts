// Stub API newsletter (POST, validation, consent)
import { NextRequest, NextResponse } from 'next/server';
import { isTrustedOrigin, applyRateLimitCookie, throttleOnFailure } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    if (!isTrustedOrigin(req as any)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    // No generic rate limit; only failure-based throttling
    const { email, consent, hp } = await req.json();
    if (typeof hp === 'string' && hp.trim().length > 0) {
      const fl = throttleOnFailure(req as any, 'newsletter_hp', 10, 10 * 60_000);
      const resp = NextResponse.json({ error: 'Invalid' }, { status: fl.allowed ? 400 : 429 });
      applyRateLimitCookie(resp, fl);
      return resp;
    }
    if (!email || !consent || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      const fl = throttleOnFailure(req as any, 'newsletter_invalid', 10, 10 * 60_000);
      const resp = NextResponse.json({ error: 'Invalid input' }, { status: fl.allowed ? 400 : 429 });
      applyRateLimitCookie(resp, fl);
      return resp;
    }
    // TODO: brancher HubSpot/Sendgrid ici
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
