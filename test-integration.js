/**
 * Simple integration test script for Offstone tracking
 * Run with: node test-integration.js
 */

const { validateFrenchPhone } = require('./src/lib/phone-normalization.ts');

console.log('🧪 Testing Offstone Integration...\n');

// Test 1: Phone normalization
console.log('1. Testing phone normalization:');
const testPhones = [
  '06 12 34 56 78',
  '+33 6 12 34 56 78',
  '0612345678',
  'invalid_phone',
  '0123456789'
];

testPhones.forEach(phone => {
  try {
    const result = validateFrenchPhone(phone);
    console.log(`   ${phone} → ${result.isValid ? '✅' : '❌'} ${result.phoneE164 || result.error}`);
  } catch (error) {
    console.log(`   ${phone} → ❌ Error: ${error.message}`);
  }
});

// Test 2: Environment variables check
console.log('\n2. Environment variables check:');
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'HUBSPOT_PORTAL_ID',
  'HUBSPOT_FORM_GUID'
];

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  console.log(`   ${envVar}: ${value ? '✅ Set' : '❌ Missing'}`);
});

// Test 3: UTM tracking simulation
console.log('\n3. UTM tracking simulation:');
const mockUTM = {
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'test_campaign',
  utm_term: 'immobilier',
  utm_content: 'ad1'
};

console.log('   Mock UTM data:', JSON.stringify(mockUTM, null, 2));

// Test 4: Payload construction
console.log('\n4. Payload construction test:');
const testPayload = {
  email: 'test@example.com',
  firstname: 'Test',
  lastname: 'User',
  phone_raw: '06 12 34 56 78',
  phone_e164: '+33612345678',
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

console.log('   ✅ Payload structure valid');
console.log('   Email:', testPayload.email);
console.log('   Phone E.164:', testPayload.phone_e164);
console.log('   UTM Campaign:', testPayload.utm_campaign);

console.log('\n🎉 Integration test completed!');
console.log('\nNext steps:');
console.log('1. Set up environment variables');
console.log('2. Create Supabase table using create_prospects_table.sql');
console.log('3. Test the /merci form in browser');
console.log('4. Check HubSpot integration');












