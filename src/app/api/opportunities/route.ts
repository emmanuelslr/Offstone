import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Supabase configuration missing');
      return NextResponse.json(
        { error: 'Configuration du serveur manquante. Veuillez contacter le support.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'investmentAmount'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validate investment amount
    const validInvestmentAmounts = ['lt_20k', '20k_50k', '50k_100k', '100k_500k', '500k_1m', 'gt_1m'];
    if (!validInvestmentAmounts.includes(body.investmentAmount)) {
      return NextResponse.json(
        { error: 'Montant d\'investissement invalide' },
        { status: 400 }
      );
    }

    // Get UTM parameters and context from request
    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source') || body.utm_source || 'website';
    const utmMedium = url.searchParams.get('utm_medium') || body.utm_medium || 'form';
    const utmCampaign = url.searchParams.get('utm_campaign') || body.utm_campaign || 'opportunities_exclusives';
    const utmContent = url.searchParams.get('utm_content') || body.utm_content || 'contact_form';
    const utmTerm = url.searchParams.get('utm_term') || body.utm_term || '';

    // Get page context
    const pageUrl = body.page_url || request.headers.get('referer') || '';
    const referrer = body.referrer || request.headers.get('referer') || '';
    const ctaId = body.cta_id || 'opportunities_contact_form';
    const assetClass = body.asset_class || 'mixed';

    // Get environment
    const vercelEnv = process.env.VERCEL_ENV || 'development';

    // Prepare data for insertion
    const opportunityData = {
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      investment_amount: body.investmentAmount,
      message: body.message?.trim() || null,
      status: 'new',
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      page_url: pageUrl,
      referrer: referrer,
      cta_id: ctaId,
      asset_class: assetClass,
      vercel_env: vercelEnv
    };

    // Check if we're in development mode without Supabase
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasSupabaseConfig = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (isDevelopment && !hasSupabaseConfig) {
      // Development mode: just log the data and return success
      console.log('🚀 Development mode - Opportunity submission:', {
        ...opportunityData,
        id: 'dev-' + Date.now()
      });
      
      return NextResponse.json({
        success: true,
        message: 'Votre demande a été envoyée avec succès (mode développement)',
        id: 'dev-' + Date.now()
      });
    }

    // Insert into database
    const { data, error } = await supabase
      .from('opportunities_exclusives')
      .insert([opportunityData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de votre demande' },
        { status: 500 }
      );
    }

    // Log successful submission (for debugging)
    console.log('Opportunity submission successful:', {
      id: data.id,
      email: data.email,
      investment_amount: data.investment_amount,
      utm_campaign: data.utm_campaign
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès',
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
