// Stub API newsletter (POST, validation, consent)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, consent } = await req.json();
    if (!email || !consent || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    // TODO: brancher HubSpot/Sendgrid ici
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
