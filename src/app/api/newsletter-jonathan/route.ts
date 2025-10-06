import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { submitToHubspot, buildHubspotPayload } from '../submit-lead/route';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Newsletter Jonathan API called');
    
    // Check if Supabase is configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Supabase configuration missing');
      return NextResponse.json(
        { error: 'Configuration du serveur manquante. Veuillez contacter le support.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('📝 Received newsletter data:', { 
      email: body.email,
      utm_source: body.utm_source,
      utm_campaign: body.utm_campaign
    });
    
    // Validate required fields
    if (!body.email || body.email.trim() === '') {
      return NextResponse.json(
        { error: 'L\'email est requis' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Get UTM parameters and context from request
    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source') || body.utm_source || 'jonathananguelov';
    const utmMedium = url.searchParams.get('utm_medium') || body.utm_medium || 'newsletter';
    const utmCampaign = url.searchParams.get('utm_campaign') || body.utm_campaign || 'newsletter_jonathan';
    const utmContent = url.searchParams.get('utm_content') || body.utm_content || 'newsletter_signup';
    const utmTerm = url.searchParams.get('utm_term') || body.utm_term || '';

    // Get page context
    const pageUrl = body.page_url || request.headers.get('referer') || 'https://jonathananguelov.com';
    const referrer = body.referrer || request.headers.get('referer') || '';
    const ctaId = body.cta_id || 'newsletter_jonathan_signup';
    const vercelEnv = process.env.VERCEL_ENV || 'development';

    // Prepare data for insertion
    const newsletterData = {
      email: body.email.toLowerCase().trim(),
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      page_url: pageUrl,
      referrer: referrer,
      cta_id: ctaId,
      vercel_env: vercelEnv
    };

    // Check if we're in development mode without Supabase
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasSupabaseConfig = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (isDevelopment && !hasSupabaseConfig) {
      // Development mode: just log the data and return success
      console.log('🚀 Development mode - Newsletter submission:', {
        ...newsletterData,
        id: 'dev-' + Date.now()
      });
      
      return NextResponse.json({
        success: true,
        message: 'Votre inscription à la newsletter a été enregistrée (mode développement)',
        id: 'dev-' + Date.now()
      });
    }

    // Insert into database
    console.log('💾 Inserting into newsletter_jonathan:', newsletterData);
    const { data, error } = await supabase
      .from('newsletter_jonathan')
      .insert([newsletterData])
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de votre inscription' },
        { status: 500 }
      );
    }

    // Log successful submission (for debugging)
    console.log('Newsletter submission successful:', {
      id: data.id,
      email: data.email,
      utm_campaign: data.utm_campaign
    });

    // Submit directly to HubSpot (bypassing internal API call)
    try {
      const hubspotPayload = {
        fields: [
          { name: "email", value: data.email },
          { name: "utm_source", value: data.utm_source },
          { name: "utm_medium", value: data.utm_medium },
          { name: "utm_campaign", value: data.utm_campaign },
          { name: "utm_content", value: data.utm_content },
          { name: "utm_term", value: data.utm_term },
          { name: "consentement_marketing", value: "true" },
          { name: "source_formulaire", value: "newsletter_jonathan" }
        ],
        context: {
          pageUri: data.page_url,
          pageName: "Newsletter Jonathan"
        }
      };

      console.log('newsletter.hubspot_payload', { email: data.email, payload: hubspotPayload });
      
      const hubspotResponse = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/146846899/0cb0b552-7e58-4e7c-a6e1-b06c9d6843b1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotPayload)
      });
      
      if (hubspotResponse.ok) {
        console.log('newsletter.hubspot_success', { email: data.email });
      } else {
        const errorText = await hubspotResponse.text();
        console.error('newsletter.hubspot_error', { 
          email: data.email, 
          status: hubspotResponse.status,
          error: errorText
        });
      }
    } catch (hubspotError) {
      console.error('newsletter.hubspot_error', hubspotError);
      // Continue even if HubSpot fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Votre inscription à la newsletter a été enregistrée avec succès',
      id: data.id
    });

  } catch (error) {
    console.error('API error:', error);
    
    // Ensure we always return valid JSON
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('JSON')) {
        errorMessage = 'Erreur de format de données. Veuillez vérifier vos informations.';
      } else if (error.message.includes('fetch') || error.message.includes('network')) {
        errorMessage = 'Erreur de connexion. Veuillez vérifier votre connexion internet.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}


