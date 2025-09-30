import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envVars = {
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID ? '✅ Définie' : '❌ Manquante',
    HUBSPOT_FORM_GUID: process.env.HUBSPOT_FORM_GUID ? '✅ Définie' : '❌ Manquante',
    SUPABASE_URL: process.env.SUPABASE_URL ? '✅ Définie' : '❌ Manquante',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Définie' : '❌ Manquante',
    HUBSPOT_PORTAL_ID_VALUE: process.env.HUBSPOT_PORTAL_ID || 'non définie',
    HUBSPOT_FORM_GUID_VALUE: process.env.HUBSPOT_FORM_GUID || 'non définie',
  };

  return NextResponse.json(envVars);
}
