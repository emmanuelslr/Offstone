import { NextRequest, NextResponse } from 'next/server';
import { normalizePhoneNumber } from "@/lib/phone-normalization";
import { buildHubspotPayload, submitToHubspot } from "../submit-lead/route";

// HubSpot configuration - Using environment variables like submit-lead
function hubspotSpontaneousConfig() {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_SPONTANEOUS_APPLICATION_FORM_GUID;
  if (!portalId || !formGuid) {
    throw new Error("Missing HubSpot environment variables HUBSPOT_PORTAL_ID or HUBSPOT_SPONTANEOUS_APPLICATION_FORM_GUID");
  }
  const base = (process.env.HUBSPOT_FORMS_API || 'https://api.hsforms.com/submissions/v3/integration/submit').replace(/\/$/, "");
  return {
    endpoint: `${base}/${portalId}/${formGuid}`,
    portalId,
    formGuid
  } as const;
}

// Interface simplifiée - plus besoin de SpontaneousApplicationData complexe

function sanitize(value: unknown, max = 255): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.trim().substring(0, max) || undefined;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateLinkedInUrl(url: string): boolean {
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/;
  return linkedinRegex.test(url);
}

// Utiliser la même validation que submit-lead
function validatePhone(phone: string): { isValid: boolean; phoneE164: string | null; error?: string } {
  const normalized = normalizePhoneNumber(phone);
  return {
    isValid: normalized.isValid,
    phoneE164: normalized.phoneE164,
    error: normalized.error
  };
}

// Plus besoin de convertFileToBase64 - on n'envoie plus le CV à HubSpot

// Utiliser la même approche que submit-lead mais avec des champs spécifiques à la candidature
async function submitSpontaneousApplicationToHubSpot(data: {
  email: string;
  firstName: string;
  lastName: string;
  phoneE164: string;
  position: string;
  availability?: string;
  motivationMessage?: string;
  linkedinUrl: string;
  cvFileName: string;
  utm: Record<string, string | undefined>;
  pageUri?: string;
  hutk?: string;
  ipAddress?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Créer le payload directement pour le formulaire de candidature spontanée
    const hubspotPayload = {
      fields: [
        { name: 'email', value: data.email },
        { name: 'firstname', value: data.firstName },
        { name: 'lastname', value: data.lastName },
        { name: 'phone', value: data.phoneE164 },
        { name: 'jobtitle', value: data.position }, // Utilise la propriété standard "Job Title"
        { name: 'hs_linkedin_url', value: data.linkedinUrl }, // Propriété LinkedIn HubSpot
        { name: 'cv', value: data.cvFileName } // Propriété CV HubSpot
      ],
      context: {
        pageUri: data.pageUri || '',
        pageName: 'Spontaneous Application Form',
        ...(data.hutk && { hutk: data.hutk }),
        ...(data.ipAddress && { ipAddress: data.ipAddress })
      }
    };

    // Ajouter les champs optionnels
    if (data.availability) {
      hubspotPayload.fields.push({ name: 'start_date', value: data.availability });
    }
    if (data.motivationMessage) {
      hubspotPayload.fields.push({ name: 'motivation_message', value: data.motivationMessage });
    }

    // Ajouter les UTM si présents
    if (data.utm.utm_source) {
      hubspotPayload.fields.push({ name: 'utm_source', value: data.utm.utm_source });
    }
    if (data.utm.utm_medium) {
      hubspotPayload.fields.push({ name: 'utm_medium', value: data.utm.utm_medium });
    }
    if (data.utm.utm_campaign) {
      hubspotPayload.fields.push({ name: 'utm_campaign', value: data.utm.utm_campaign });
    }
    if (data.utm.utm_content) {
      hubspotPayload.fields.push({ name: 'utm_content', value: data.utm.utm_content });
    }
    if (data.utm.utm_term) {
      hubspotPayload.fields.push({ name: 'utm_term', value: data.utm.utm_term });
    }

    const config = hubspotSpontaneousConfig();
    console.log('🔧 HubSpot config:', config);
    console.log('📦 Payload being sent:', JSON.stringify(hubspotPayload, null, 2));
    console.log('🌐 About to fetch:', config.endpoint);
    
    console.log('🚀 Starting fetch request...');
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotPayload),
    });
    console.log('📡 Fetch completed, response received');

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HubSpot submission failed:', response.status, errorText);
      return { success: false, error: `HubSpot error: ${response.status}` };
    }

    // Log the successful response details
    const responseData = await response.text();
    console.log('✅ Successfully submitted to HubSpot');
    console.log('📋 HubSpot response:', responseData);
    console.log('📊 Response status:', response.status);
    console.log('📍 Response headers:', Object.fromEntries(response.headers.entries()));
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error submitting to HubSpot:', error);
    console.error('❌ Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: `Network error: ${error instanceof Error ? error.message : String(error)}` };
  }
}


export async function POST(request: NextRequest) {
  try {
    console.log('📝 Spontaneous application API called');
    
    // Parse form data
    const formData = await request.formData();
    console.log('📋 Form data parsed successfully');
    
    // Extract form fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const availability = formData.get('availability') as string;
    const motivationMessage = formData.get('motivationMessage') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const cv = formData.get('cv') as File;

    // Extract tracking data
    const page_url = formData.get('page_url') as string;
    const referrer = formData.get('referrer') as string;
    const utm_source = formData.get('utm_source') as string;
    const utm_medium = formData.get('utm_medium') as string;
    const utm_campaign = formData.get('utm_campaign') as string;
    const utm_content = formData.get('utm_content') as string;
    const utm_term = formData.get('utm_term') as string;
    const cta_id = formData.get('cta_id') as string;
    
    // Extract HubSpot tracking cookie and IP address
    const hutk = request.cookies.get('hubspotutk')?.value;
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('cf-connecting-ip') || 
                     undefined;

    // Validate required fields
    console.log('🔍 Validating required fields:', { firstName: !!firstName, lastName: !!lastName, email: !!email, phone: !!phone, position: !!position, linkedinUrl: !!linkedinUrl, cv: !!cv });
    
    if (!firstName || !lastName || !email || !phone || !position || !linkedinUrl || !cv) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validate LinkedIn URL
    if (!validateLinkedInUrl(linkedinUrl)) {
      return NextResponse.json(
        { error: 'URL LinkedIn invalide' },
        { status: 400 }
      );
    }

    // Validate and format phone number
    console.log('📞 Validating phone number:', phone);
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      console.log('❌ Phone validation failed:', phoneValidation.error);
      return NextResponse.json(
        { error: phoneValidation.error || 'Numéro de téléphone invalide' },
        { status: 400 }
      );
    }
    console.log('✅ Phone validation successful:', phoneValidation.phoneE164);

    // Validate file type and size
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(cv.type)) {
      return NextResponse.json(
        { error: 'Le CV doit être un fichier PDF, DOC ou DOCX' },
        { status: 400 }
      );
    }

    if (cv.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json(
        { error: 'Le CV ne doit pas dépasser 10MB' },
        { status: 400 }
      );
    }

    // Prepare UTM data
    const utm = {
      utm_source: utm_source || 'website',
      utm_medium: utm_medium || 'internal_cta',
      utm_campaign: utm_campaign || 'spontaneous_application',
      utm_content: utm_content || 'application_form',
      utm_term: utm_term || undefined
    };

    // Submit to HubSpot (without CV content, just filename)
    console.log('🚀 Submitting to HubSpot...');
    console.log('🍪 HubSpot tracking cookie (hutk):', hutk ? 'Present' : 'Not found');
    console.log('📧 Email being submitted:', email.trim().toLowerCase());
    console.log('🌐 Client IP:', ipAddress || 'Not detected');
    
    const hubspotResult = await submitSpontaneousApplicationToHubSpot({
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneE164: phoneValidation.phoneE164!,
      position: position.trim(),
      availability: availability?.trim(),
      motivationMessage: motivationMessage?.trim(),
      linkedinUrl: linkedinUrl.trim(),
      cvFileName: cv.name,
      utm,
      pageUri: page_url,
      hutk,
      ipAddress
    });

    if (!hubspotResult.success) {
      console.log('❌ HubSpot submission failed:', hubspotResult.error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de votre candidature' },
        { status: 500 }
      );
    }
    console.log('✅ Successfully submitted to HubSpot');

    return NextResponse.json({
      success: true,
      message: 'Candidature envoyée avec succès'
    });

  } catch (error) {
    console.error('Error in spontaneous application API:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    );
  }
}
