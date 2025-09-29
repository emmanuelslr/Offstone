'use client';

import { useState, useEffect } from 'react';
import { UTMTracker } from '@/lib/utm-tracking';
import { validateFrenchPhone, PhoneValidationResult } from '@/lib/phone-normalization';

interface FormData {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  capacite_investissement: string;
  consentement_marketing: boolean;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export default function MerciPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    capacite_investissement: '100_500k',
    consentement_marketing: false
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const [phoneValidation, setPhoneValidation] = useState<PhoneValidationResult | null>(null);
  const [hutk, setHutk] = useState<string | null>(null);

  // Initialize UTM tracking and get hubspotutk cookie
  useEffect(() => {
    // Get UTM parameters from localStorage
    const utmParams = UTMTracker.getUTMForSubmission();
    console.log('📊 UTM parameters for submission:', utmParams);

    // Get hubspotutk cookie
    const getHubSpotCookie = () => {
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';');
        const hubspotCookie = cookies.find(cookie => 
          cookie.trim().startsWith('hubspotutk=')
        );
        if (hubspotCookie) {
          const hutkValue = hubspotCookie.split('=')[1];
          setHutk(hutkValue);
          console.log('🍪 HubSpot cookie found:', hutkValue);
        } else {
          console.log('⚠️ HubSpot cookie not found');
        }
      }
    };

    getHubSpotCookie();
  }, []);

  // Validate phone number in real-time
  useEffect(() => {
    if (formData.phone.trim()) {
      const validation = validateFrenchPhone(formData.phone);
      console.log('📱 Phone validation:', { phone: formData.phone, validation });
      setPhoneValidation(validation);
    } else {
      console.log('📱 Phone empty, validation null');
      setPhoneValidation(null);
    }
  }, [formData.phone]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log('🔍 Form submit triggered', { phoneValidation, formData });
  
  if (!phoneValidation?.isValid) {
    console.log('❌ Phone validation failed', phoneValidation);
    setSubmissionState(prev => ({
      ...prev,
      error: phoneValidation?.error || 'Veuillez v�rifier votre num�ro de t�l�phone'
    }));
    return;
  }

  setSubmissionState({
    isSubmitting: true,
    isSuccess: false,
    error: null
  });

  try {
    const utmParams = UTMTracker.getUTMForSubmission();

    const submissionPayload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      capacite_investissement: formData.capacite_investissement,
      consentement_marketing: formData.consentement_marketing,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_term: utmParams.utm_term,
      utm_content: utmParams.utm_content,
      hutk,
      pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
      pageName: typeof document !== 'undefined' ? document.title : undefined
    };

    console.log('🚀 SUBMIT-LEAD PAYLOAD:', submissionPayload);
    console.log('🚀 API ENDPOINT: /api/submit-lead');

    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionPayload)
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const fallbackMessage = response.status === 502
        ? 'HubSpot est indisponible. Merci de r�essayer dans quelques minutes.'
        : 'Une erreur est survenue. Merci de r�essayer.';
      const message = (result && typeof result.error === 'string' && result.error.trim())
        ? result.error
        : fallbackMessage;
      throw new Error(message);
    }

    if (typeof window !== 'undefined' && (window as any)._hsq) {
      (window as any)._hsq.push(['identify', {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname
      }]);
    }

    setSubmissionState({
      isSubmitting: false,
      isSuccess: true,
      error: null
    });
  } catch (error) {
    console.error('submit-lead ui error', error);
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: error instanceof Error
        ? error.message
        : 'Une erreur est survenue. Merci de r�essayer.'
    });
  }
};


  if (submissionState.isSuccess) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-green-800 mb-2">Merci !</h1>
          <p className="text-lg text-gray-600 mb-4">
            Votre profil a été enregistré avec succès.
          </p>
          <p className="text-gray-500">
            Vous recevrez nos prochaines opportunités d'investissement (horizon 4–7 ans).
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-2">Complétez votre profil</h1>
        <p className="text-gray-600">
          Aidez-nous à mieux vous connaître pour vous proposer les meilleures opportunités.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {submissionState.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{submissionState.error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="06 12 34 56 78"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
              phoneValidation?.isValid === false 
                ? 'border-red-300 focus:ring-red-500' 
                : phoneValidation?.isValid === true 
                ? 'border-green-300 focus:ring-green-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {phoneValidation && (
            <p className={`text-sm mt-1 ${
              phoneValidation.isValid ? 'text-green-600' : 'text-red-600'
            }`}>
              {phoneValidation.isValid 
                ? `✅ ${phoneValidation.phoneE164}` 
                : `❌ ${phoneValidation.error}`
              }
            </p>
          )}
        </div>

        <div>
          <label htmlFor="capacite_investissement" className="block text-sm font-medium text-gray-700 mb-1">
            Capacité d'investissement *
          </label>
          <select
            id="capacite_investissement"
            name="capacite_investissement"
            value={formData.capacite_investissement}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="lt_20k">Moins de 20 k�</option>
            <option value="20_50k">20 k� - 50 k�</option>
            <option value="50_100k">50 k� - 100 k�</option>
            <option value="100_500k">100 k� - 500 k�</option>
            <option value="500k_1m">500 k� - 1 M�</option>
            <option value="gt_1m">Plus de 1 M�</option>
          </select>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consentement_marketing"
            name="consentement_marketing"
            checked={formData.consentement_marketing}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consentement_marketing" className="ml-2 text-sm text-gray-700">
            J'accepte de recevoir des informations sur les opportunités d'investissement par email
          </label>
        </div>

        <button
          type="submit"
          disabled={submissionState.isSubmitting || !phoneValidation?.isValid}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            submissionState.isSubmitting || !phoneValidation?.isValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {submissionState.isSubmitting ? 'Enregistrement...' : 'Enregistrer mon profil'}
        </button>
      </form>

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>HubSpot Cookie (hutk): {hutk || 'Not found'}</p>
          <p>UTM Source: {UTMTracker.getStoredUTM().utm_source || 'None'}</p>
          <p>Phone Validation: {JSON.stringify(phoneValidation)}</p>
        </div>
      )}
    </main>
  );
}







