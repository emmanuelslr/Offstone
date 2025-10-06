import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// HubSpot configuration
const HS_PORTAL_ID = '146846899';
const HS_PRIVATE_APP_TOKEN = process.env.HS_PRIVATE_APP_TOKEN;

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Lead Source API called');
    
    const body = await request.json();
    const { email, source_formulaire } = body;
    
    // Validate required fields
    if (!email || !source_formulaire) {
      return NextResponse.json(
        { error: 'Email and source_formulaire are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate source_formulaire values
    const validSourceForms = ['candidature_investisseur_offstone', 'newsletter_jonathan', 'rejoindre_equipe'];
    if (!validSourceForms.includes(source_formulaire)) {
      return NextResponse.json(
        { error: 'Invalid source_formulaire value' },
        { status: 400 }
      );
    }

    console.log('📝 Processing lead source:', { email, source_formulaire });

    // Upsert contact in HubSpot via Contacts API (idempotent)
    if (HS_PRIVATE_APP_TOKEN) {
      try {
        const hubspotResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HS_PRIVATE_APP_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: {
              source_formulaire: source_formulaire
            }
          })
        });

        if (hubspotResponse.ok) {
          console.log('✅ HubSpot contact updated:', { email, source_formulaire });
        } else {
          const errorText = await hubspotResponse.text();
          console.error('❌ HubSpot update failed:', { 
            email, 
            source_formulaire,
            status: hubspotResponse.status,
            error: errorText
          });
        }
      } catch (hubspotError) {
        console.error('❌ HubSpot API error:', hubspotError);
        // Continue even if HubSpot fails
      }
    }

    // Also store in Supabase for tracking
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { data, error } = await supabase
          .from('leads_candidature')
          .upsert({
            email: email.toLowerCase().trim(),
            source_formulaire: source_formulaire,
            status: 'open',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'email',
            ignoreDuplicates: false
          })
          .select();

        if (error) {
          console.error('❌ Supabase upsert error:', error);
        } else {
          console.log('✅ Supabase lead source recorded:', { email, source_formulaire });
        }
      } catch (supabaseError) {
        console.error('❌ Supabase error:', supabaseError);
        // Continue even if Supabase fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead source recorded successfully',
      email,
      source_formulaire
    });

  } catch (error) {
    console.error('❌ Lead Source API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
