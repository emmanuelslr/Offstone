import { NextRequest, NextResponse } from 'next/server';
import { UTMTracker } from '@/lib/utm-tracking';
import { validateFrenchPhone } from '@/lib/phone-normalization';

/**
 * API endpoint for testing the tracking integration
 * This endpoint simulates the full flow without actually submitting to external services
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const testEmail = url.searchParams.get('email') || 'test@example.com';
    const testPhone = url.searchParams.get('phone') || '06 12 34 56 78';
    
    // Test UTM tracking
    const mockUTM = {
      utm_source: 'test_source',
      utm_medium: 'test_medium',
      utm_campaign: 'test_campaign',
      utm_term: 'test_term',
      utm_content: 'test_content',
      first_touch_ts: Date.now(),
      last_touch_ts: Date.now()
    };

    // Test phone normalization
    const phoneValidation = validateFrenchPhone(testPhone);
    
    // Test payload construction
    const testPayload = {
      email: testEmail,
      firstname: 'Test',
      lastname: 'User',
      phone_raw: phoneValidation.phoneRaw,
      phone_e164: phoneValidation.phoneE164 || '',
      capacite_investissement: '100_500k',
      utm_source: mockUTM.utm_source,
      utm_medium: mockUTM.utm_medium,
      utm_campaign: mockUTM.utm_campaign,
      utm_term: mockUTM.utm_term,
      utm_content: mockUTM.utm_content,
      submitted_at: new Date().toISOString(),
      ip: '127.0.0.1',
      user_agent: 'Test Agent',
      consentement_marketing: true
    };

    return NextResponse.json({
      success: true,
      message: 'Integration test completed successfully',
      data: {
        utm_tracking: mockUTM,
        phone_validation: phoneValidation,
        supabase_payload: testPayload,
        hubspot_payload: {
          ...testPayload,
          hutk: 'test_hubspot_cookie'
        },
        environment_check: {
          has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          has_supabase_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          has_hubspot_portal: !!process.env.HUBSPOT_PORTAL_ID,
          has_hubspot_form: !!process.env.HUBSPOT_FORM_GUID
        }
      }
    });

  } catch (error) {
    console.error('❌ Integration test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}












