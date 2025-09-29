// Use built-in fetch (Node 18+)

async function testSubmitLeadAPI() {
  console.log('🧪 Testing submit-lead API...\n');
  
  const testPayload = {
    email: 'test@example.com',
    firstname: 'Test',
    lastname: 'User',
    phone: '0612345678',
    capacite_investissement: '100_500k',
    utm_source: 'test',
    utm_medium: 'manual',
    utm_campaign: 'api_test',
    consentement_marketing: true
  };

  try {
    console.log('📤 Sending request to: http://localhost:3001/api/submit-lead');
    console.log('📦 Payload:', JSON.stringify(testPayload, null, 2));
    
    const response = await fetch('http://localhost:3001/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    console.log('\n📊 Response Status:', response.status);
    console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📊 Response Body:', responseText);
    
    if (response.ok) {
      console.log('\n✅ API Test SUCCESSFUL!');
    } else {
      console.log('\n❌ API Test FAILED!');
    }
    
  } catch (error) {
    console.log('\n💥 API Test ERROR:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔍 DIAGNOSIS: Server is not running on port 3001');
      console.log('   → Run: npm run dev');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n🔍 DIAGNOSIS: Cannot connect to localhost');
    } else {
      console.log('\n🔍 DIAGNOSIS: Network or server error');
    }
  }
}

// Test environment variables
console.log('🔍 Checking environment variables...');
const envVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY', 
  'HUBSPOT_PORTAL_ID',
  'HUBSPOT_FORM_GUID'
];

envVars.forEach(envVar => {
  const value = process.env[envVar];
  console.log(`   ${envVar}: ${value ? '✅ Set' : '❌ Missing'}`);
});

console.log('\n');

// Run the test
testSubmitLeadAPI();
