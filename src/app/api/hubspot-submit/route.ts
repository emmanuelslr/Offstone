import { NextRequest, NextResponse } from 'next/server';

// HubSpot configuration
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID!;
const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID!;
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
  console.error('❌ Missing HubSpot environment variables');
}

export interface HubSpotSubmissionData {
  email: string;
  firstname: string;
  lastname: string;
  phone_e164: string;
  capacite_investissement: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  hutk?: string;
  consentement_marketing?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: HubSpotSubmissionData = await request.json();
    
    // Validate required fields
    const requiredFields = ['email', 'firstname', 'lastname', 'phone_e164', 'capacite_investissement'];
    const missingFields = requiredFields.filter(field => !body[field as keyof HubSpotSubmissionData]);
    
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

    // Prepare HubSpot form submission
    const hubspotPayload = {
      fields: [
        { name: 'email', value: body.email.toLowerCase().trim() },
        { name: 'firstname', value: body.firstname.trim() },
        { name: 'lastname', value: body.lastname.trim() },
        { name: 'phone', value: body.phone_e164 },
        { name: 'capacite_investissement', value: body.capacite_investissement }
      ],
      context: {
        hutk: body.hutk || null,
        pageUri: 'https://offstone.fr/merci',
        pageName: 'Merci - Compléter mon profil'
      }
    };

    // Add UTM parameters if present
    if (body.utm_source) {
      hubspotPayload.fields.push({ name: 'utm_source', value: body.utm_source });
    }
    if (body.utm_medium) {
      hubspotPayload.fields.push({ name: 'utm_medium', value: body.utm_medium });
    }
    if (body.utm_campaign) {
      hubspotPayload.fields.push({ name: 'utm_campaign', value: body.utm_campaign });
    }
    if (body.utm_term) {
      hubspotPayload.fields.push({ name: 'utm_term', value: body.utm_term });
    }
    if (body.utm_content) {
      hubspotPayload.fields.push({ name: 'utm_content', value: body.utm_content });
    }

    // Add marketing consent if present
    if (body.consentement_marketing !== undefined) {
      hubspotPayload.fields.push({ 
        name: 'consentement_marketing', 
        value: body.consentement_marketing ? 'true' : 'false' 
      });
    }

    console.log('📤 Sending to HubSpot:', JSON.stringify(hubspotPayload, null, 2));

    // Submit to HubSpot Forms API
    const hubspotResponse = await fetch(HUBSPOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotPayload)
    });

    const hubspotData = await hubspotResponse.json();

    if (!hubspotResponse.ok) {
      console.error('❌ HubSpot API error:', hubspotResponse.status, hubspotData);
      
      // Log error but don't block the user experience
      return NextResponse.json({
        success: false,
        error: 'HubSpot submission failed',
        details: hubspotData,
        status: hubspotResponse.status
      }, { status: 200 }); // Return 200 to not block UX
    }

    console.log('✅ HubSpot submission successful:', hubspotData);

    return NextResponse.json({
      success: true,
      data: hubspotData,
      message: 'HubSpot submission successful'
    });

  } catch (error) {
    console.error('❌ HubSpot API error:', error);
    
    // Log error but don't block the user experience
    return NextResponse.json({
      success: false,
      error: 'HubSpot submission failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 }); // Return 200 to not block UX
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















