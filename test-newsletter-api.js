// Test script for newsletter API
const fetch = require('node-fetch');

async function testNewsletterAPI() {
  const testData = {
    email: 'test.newsletter@example.com',
    utm_source: 'jonathananguelov',
    utm_medium: 'newsletter',
    utm_campaign: 'newsletter_jonathan',
    utm_content: 'newsletter_signup',
    utm_term: 'test',
    page_url: 'https://jonathananguelov.com',
    referrer: 'https://google.com',
    cta_id: 'newsletter_jonathan_signup'
  };

  try {
    console.log('🧪 Testing Newsletter API...');
    console.log('📝 Test data:', testData);

    const response = await fetch('http://localhost:3001/api/newsletter-jonathan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Response Status:', response.status);
    
    const result = await response.json();
    console.log('📋 Response Body:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('✅ Newsletter API test successful!');
    } else {
      console.log('❌ Newsletter API test failed');
    }

  } catch (error) {
    console.error('💥 Newsletter API test error:', error.message);
  }
}

testNewsletterAPI();





