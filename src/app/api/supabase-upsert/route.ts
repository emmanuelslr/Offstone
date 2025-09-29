import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export interface ProspectData {
  email: string;
  firstname: string;
  lastname: string;
  phone_raw: string;
  phone_e164: string;
  capacite_investissement: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  submitted_at: string;
  ip: string;
  user_agent: string;
  consentement_marketing?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ProspectData = await request.json();
    
    // Validate required fields
    const requiredFields = ['email', 'firstname', 'lastname'];
    const missingFields = requiredFields.filter(field => !body[field as keyof ProspectData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare data for UPSERT
    const prospectData = {
      email: body.email.toLowerCase().trim(),
      first_name: body.firstname.trim(),
      last_name: body.lastname.trim(),
      phone: body.phone_e164,
      consent: body.consentement_marketing || false,
      status: 'open',
      asset_class: body.capacite_investissement === 'retail' ? 'retail' : 'other',
      page_url: body.page_url || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      updated_at: new Date().toISOString()
    };

    // Perform INSERT operation (no upsert since no unique constraint on email)
    const { data, error } = await supabase
      .from('leads_candidature')
      .insert(prospectData)
      .select();

    if (error) {
      console.error('❌ Supabase UPSERT error:', error);
      return NextResponse.json(
        { error: 'Database operation failed', details: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Supabase UPSERT successful:', data);

    return NextResponse.json({
      success: true,
      data: data?.[0] || prospectData,
      message: 'Prospect data saved successfully'
    });

  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}




