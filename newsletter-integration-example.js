// Example integration code for jonathananguelov.com
// This code should be added to the Jonathan Anguelov website

// Function to submit newsletter signup to Offstone API
async function submitNewsletterToOffstone(email, utmParams = {}) {
  const apiUrl = 'https://offstone.fr/api/newsletter-jonathan'; // Production URL
  // const apiUrl = 'http://localhost:3001/api/newsletter-jonathan'; // Development URL
  
  const payload = {
    email: email,
    utm_source: utmParams.utm_source || 'jonathananguelov',
    utm_medium: utmParams.utm_medium || 'newsletter',
    utm_campaign: utmParams.utm_campaign || 'newsletter_jonathan',
    utm_content: utmParams.utm_content || 'newsletter_signup',
    utm_term: utmParams.utm_term || '',
    page_url: window.location.href,
    referrer: document.referrer,
    cta_id: 'newsletter_jonathan_signup'
  };

  try {
    console.log('📧 Submitting newsletter signup to Offstone API...', payload);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Newsletter signup successful:', result);
      return { success: true, data: result };
    } else {
      console.error('❌ Newsletter signup failed:', result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error('💥 Newsletter signup error:', error);
    return { success: false, error: error.message };
  }
}

// Example usage with HubSpot form
// This should be added to the HubSpot form's onFormSubmit callback
function onHubSpotFormSubmit(formData) {
  const email = formData.email;
  
  // Get UTM parameters from URL or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {
    utm_source: urlParams.get('utm_source') || localStorage.getItem('utm_source'),
    utm_medium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign'),
    utm_content: urlParams.get('utm_content') || localStorage.getItem('utm_content'),
    utm_term: urlParams.get('utm_term') || localStorage.getItem('utm_term')
  };

  // Submit to Offstone API (this will respect the priority hierarchy)
  submitNewsletterToOffstone(email, utmParams);
}

// Example usage with custom form
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      
      if (!email) {
        alert('Veuillez saisir votre email');
        return;
      }

      // Submit to Offstone API
      const result = await submitNewsletterToOffstone(email);
      
      if (result.success) {
        alert('Merci pour votre inscription à la newsletter !');
        newsletterForm.reset();
      } else {
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    });
  }
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { submitNewsletterToOffstone, onHubSpotFormSubmit };
}





