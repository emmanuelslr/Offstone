'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@/lib/analytics';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

// Lightweight inline SVG flags (no network, harmonized size)
function FlagSvg({ code, className = 'w-5 h-3 rounded-sm overflow-hidden shadow-sm' }: { code: 'FR'|'BE'|'CH'|'LU'|'DE'|'ES'|'IT'|'GB'; className?: string }) {
  switch (code) {
    case 'FR': // Blue-White-Red vertical
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="France"><rect width="1" height="2" x="0" y="0" fill="#0055A4"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#EF4135"/></svg>
      );
    case 'BE': // Black-Yellow-Red vertical
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Belgique"><rect width="1" height="2" x="0" y="0" fill="#000"/><rect width="1" height="2" x="1" y="0" fill="#FFD90C"/><rect width="1" height="2" x="2" y="0" fill="#EF3340"/></svg>
      );
    case 'IT': // Green-White-Red vertical
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Italie"><rect width="1" height="2" x="0" y="0" fill="#009246"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#CE2B37"/></svg>
      );
    case 'DE': // Black-Red-Gold horizontal
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Allemagne"><rect width="3" height="2" fill="#000"/><rect width="3" height="1.333" y="0.667" fill="#DD0000"/><rect width="3" height="0.666" y="1.334" fill="#FFCE00"/></svg>
      );
    case 'ES': // Red-Yellow-Red horizontal (simplified)
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Espagne"><rect width="3" height="2" fill="#AA151B"/><rect width="3" height="1" y="0.5" fill="#F1BF00"/></svg>
      );
    case 'GB': // Simplified Union Jack
      return (
        <svg viewBox="0 0 60 36" className={className} aria-label="Royaume-Uni">
          <rect width="60" height="36" fill="#012169"/>
          <path d="M0,0 60,36 M60,0 0,36" stroke="#fff" strokeWidth="8"/>
          <path d="M0,0 60,36 M60,0 0,36" stroke="#C8102E" strokeWidth="4"/>
          <rect x="26" width="8" height="36" fill="#fff"/>
          <rect y="14" width="60" height="8" fill="#fff"/>
          <rect x="28" width="4" height="36" fill="#C8102E"/>
          <rect y="16" width="60" height="4" fill="#C8102E"/>
        </svg>
      );
    case 'CH': // Red with white cross
      return (
        <svg viewBox="0 0 3 3" className={className} aria-label="Suisse"><rect width="3" height="3" fill="#D52B1E"/><rect x="1.25" y="0.5" width="0.5" height="2" fill="#fff"/><rect x="0.5" y="1.25" width="2" height="0.5" fill="#fff"/></svg>
      );
    case 'LU': // Red-White-LightBlue horizontal
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Luxembourg"><rect width="3" height="2" fill="#ED2939"/><rect width="3" height="0.666" y="0.666" fill="#fff"/><rect width="3" height="0.666" y="1.334" fill="#00A1DE"/></svg>
      );
    default:
      return (<span className={`inline-flex items-center justify-center ${className} bg-white/20 text-[10px] text-white/80`}>{code}</span>);
  }
}

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  );
}

interface SpontaneousApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    email?: string;
    page_url?: string;
    ref?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    cta_id?: string;
  };
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phone_country: 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB';
  position: string;
  availability: string;
  cv: File | null;
  motivationMessage: string;
  linkedinUrl: string;
}

type CountryCode = 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB';

const COUNTRIES: Array<{
  code: CountryCode;
  name: string;
  dial: string;
  flag: string;
  placeholder: string;
}>= [
  { code: 'FR', name: 'France',      dial: '+33',  flag: 'FR', placeholder: '+33 6 12 34 56 78' },
  { code: 'BE', name: 'Belgique',    dial: '+32',  flag: 'BE', placeholder: '+32 4xx xx xx xx' },
  { code: 'CH', name: 'Suisse',      dial: '+41',  flag: 'CH', placeholder: '+41 7x xxx xx xx' },
  { code: 'LU', name: 'Luxembourg',  dial: '+352', flag: 'LU', placeholder: '+352 621 123 456' },
  { code: 'DE', name: 'Allemagne',   dial: '+49',  flag: 'DE', placeholder: '+49 15x xxxx xxxx' },
  { code: 'ES', name: 'Espagne',     dial: '+34',  flag: 'ES', placeholder: '+34 6xx xxx xxx' },
  { code: 'IT', name: 'Italie',      dial: '+39',  flag: 'IT', placeholder: '+39 3xx xxx xxxx' },
  { code: 'GB', name: 'Royaume-Uni', dial: '+44',  flag: 'GB', placeholder: '+44 7xxxx xxxxxx' },
];

export default function SpontaneousApplicationModal({ 
  isOpen, 
  onClose, 
  initialData = {} 
}: SpontaneousApplicationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: initialData.email || '',
    phone: '',
    phone_country: 'FR',
    position: '',
    availability: '',
    cv: null,
    motivationMessage: '',
    linkedinUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [countryOpen, setCountryOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const countryMenuRef = useRef<HTMLDivElement | null>(null);

  // Phone formatting helpers: FR mobile only => "+33 6 XX XX XX XX"
  const formatFrPhone = (raw: string): string => {
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    
    // Remove country code if present
    if (rest.startsWith('33')) rest = rest.slice(2);
    while (rest.startsWith('0')) rest = rest.slice(1);
    
    // If no digits, just return dial code
    if (!rest) return '+33';
    
    // For France, we want mobile numbers (6 or 7)
    // But allow any digit to be typed, just format it
    rest = rest.slice(0, 9); // Max 9 digits after +33
    
    const first = rest.slice(0, 1);
    const after = rest.slice(1);
    const pairs = after.match(/.{1,2}/g) || [];
    return '+33 ' + first + (pairs.length ? ' ' + pairs.join(' ') : (after ? ' ' + after : ''));
  };

  const getCountry = (code: CountryCode) => COUNTRIES.find(c => c.code === code)!;
  
  const formatPhoneByCountry = (raw: string, code: CountryCode): string => {
    if (code === 'FR') return formatFrPhone(raw);
    
    const country = getCountry(code);
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    
    // Remove country code if present
    const dialNoPlus = country.dial.replace('+','');
    if (rest.startsWith(dialNoPlus)) {
      rest = rest.slice(dialNoPlus.length);
    }
    
    // Remove leading zeros
    while (rest.startsWith('0')) {
      rest = rest.slice(1);
    }

    // If no digits, just return the dial code
    if (!rest) return country.dial;

    // Simple formatting: dial code + space + digits with spaces every 2-3 digits
    const maxLength = code === 'DE' || code === 'GB' ? 11 : 9;
    rest = rest.slice(0, maxLength);
    
    // Group digits by 2 or 3 for readability
    const groupSize = code === 'LU' ? 3 : 2;
    const groups = [];
    for (let i = 0; i < rest.length; i += groupSize) {
      groups.push(rest.slice(i, i + groupSize));
    }
    
    return country.dial + (groups.length ? ' ' + groups.join(' ') : '');
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        email: initialData.email || ''
      }));
      setFormSubmitted(false);
      setSubmitError(null);
      setValidationErrors({});
    }
  }, [isOpen, initialData.email]);

  // Close country menu on outside click / Escape
  useEffect(() => {
    if (!countryOpen) return;
    const onClick = (e: MouseEvent) => {
      const el = countryMenuRef.current;
      if (el && !el.contains(e.target as Node)) setCountryOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCountryOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, [countryOpen]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Veuillez entrer un email valide';
    }

    // Validation du téléphone pour tous les pays
    const phone = formData.phone?.trim();
    const countryCode = formData.phone_country;
    const countryDial = getCountry(countryCode).dial;
    
    if (!phone || phone === countryDial) {
      errors.phone = 'Le téléphone est requis';
    } else {
      // Vérifier que le numéro a au moins 8 chiffres après l'indicatif
      const digitsOnly = phone.replace(/[^\d]/g, '');
      const dialDigits = countryDial.replace(/[^\d]/g, '');
      const phoneDigits = digitsOnly.replace(dialDigits, '');
      
      if (phoneDigits.length < 8) {
        errors.phone = 'Numéro de téléphone incomplet';
      }
    }

    if (!formData.position.trim()) {
      errors.position = 'Le poste recherché est requis';
    }

    if (!formData.linkedinUrl.trim()) {
      errors.linkedinUrl = 'L\'URL LinkedIn est requise';
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(formData.linkedinUrl)) {
      errors.linkedinUrl = 'Veuillez entrer une URL LinkedIn valide (ex: https://linkedin.com/in/votre-profil)';
    }

    if (!formData.cv) {
      errors.cv = 'Le CV est requis';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Format phone number in real-time based on selected country
    if (name === 'phone') {
      processedValue = formatPhoneByCountry(value, formData.phone_country);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      cv: file
    }));

    // Clear validation error for CV
    if (validationErrors.cv) {
      setValidationErrors(prev => ({
        ...prev,
        cv: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create FormData
      const submitData = new FormData();
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('availability', formData.availability);
      submitData.append('motivationMessage', formData.motivationMessage);
      submitData.append('linkedinUrl', formData.linkedinUrl);
      
      if (formData.cv) {
        submitData.append('cv', formData.cv);
      }

      // Add tracking data
      if (initialData.page_url) submitData.append('page_url', initialData.page_url);
      if (initialData.ref) submitData.append('referrer', initialData.ref);
      if (initialData.utm_source) submitData.append('utm_source', initialData.utm_source);
      if (initialData.utm_medium) submitData.append('utm_medium', initialData.utm_medium);
      if (initialData.utm_campaign) submitData.append('utm_campaign', initialData.utm_campaign);
      if (initialData.utm_content) submitData.append('utm_content', initialData.utm_content);
      if (initialData.utm_term) submitData.append('utm_term', initialData.utm_term);
      if (initialData.cta_id) submitData.append('cta_id', initialData.cta_id);

      const response = await fetch('/api/spontaneous-application', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la soumission');
      }

      // Track successful submission
      track('spontaneous_application_submitted', {
        position: formData.position,
        page_url: initialData.page_url,
        utm_campaign: initialData.utm_campaign,
        cta_id: initialData.cta_id
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 pt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl p-6 max-w-6xl w-full max-h-[98vh] overflow-y-auto"
        >
          {!formSubmitted ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Candidature spontanée</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${
                        validationErrors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Votre prénom"
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${
                        validationErrors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Votre nom"
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${
                        validationErrors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="votre@email.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="grid grid-cols-[100px_1fr] gap-3 items-center">
                      <div className="relative w-[100px]" ref={countryMenuRef as any}>
                        <button
                          type="button"
                          className="relative w-full bg-white text-gray-700 border border-gray-300 rounded-lg pl-2 pr-6 py-3 text-sm text-left hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#F7B096] focus:border-transparent flex items-center gap-1 whitespace-nowrap transition-all"
                          onClick={(e) => { e.preventDefault(); setCountryOpen(v => !v); }}
                        >
                          <span className="mr-1"><FlagSvg code={formData.phone_country} /></span>
                          <span className="font-semibold">{formData.phone_country}</span>
                          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-400">
                            <ArrowDown />
                          </span>
                        </button>
                        <div className={`${countryOpen ? '' : 'hidden'} absolute left-0 right-0 mt-1 max-h-56 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg z-20`}>
                          {COUNTRIES.map(c => (
                            <button
                              type="button"
                              key={c.code}
                              className={`w-full px-3 py-2 text-sm text-left ${c.code === formData.phone_country ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                              onClick={() => {
                                const code = c.code as CountryCode;
                                setFormData(prev => ({ 
                                  ...prev, 
                                  phone_country: code, 
                                  phone: formatPhoneByCountry(prev.phone || '', code) 
                                }));
                                setCountryOpen(false);
                              }}
                            >
                              <span className="mr-2"><FlagSvg code={c.code as CountryCode} /></span>
                              <span className="truncate">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onFocus={() => { 
                          if (!formData.phone) { 
                            const dial = getCountry(formData.phone_country).dial;
                            setFormData(prev => ({ ...prev, phone: dial })); 
                          } 
                        }}
                        onChange={handleInputChange}
                        maxLength={24}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${
                          validationErrors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder={getCountry(formData.phone_country).placeholder}
                      />
                    </div>
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                      Poste recherché *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${
                        validationErrors.position ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Développeur Full-Stack"
                    />
                    {validationErrors.position && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.position}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                      Disponibilité
                    </label>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all"
                      placeholder="Ex: Immédiate, 1 mois, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    URL LinkedIn *
                  </label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${
                      validationErrors.linkedinUrl ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://linkedin.com/in/votre-profil"
                  />
                  {validationErrors.linkedinUrl && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.linkedinUrl}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">
                    CV *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="cv"
                      name="cv"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 bg-white"
                    >
                      {formData.cv ? formData.cv.name : 'Choisir un fichier'}
                    </button>
                    <span className="text-sm text-gray-500">
                      PDF, DOC, DOCX (max 10MB)
                    </span>
                  </div>
                  {validationErrors.cv && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.cv}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="motivationMessage" className="block text-sm font-medium text-gray-700 mb-2">
                    Message de motivation
                  </label>
                  <textarea
                    id="motivationMessage"
                    name="motivationMessage"
                    value={formData.motivationMessage}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all resize-none"
                    placeholder="Pourquoi souhaitez-vous rejoindre Offstone ?"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer ma candidature'
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Candidature envoyée !</h3>
              <p className="text-gray-600 mb-6">
                Merci pour votre candidature. Nous examinerons votre profil et vous recontacterons rapidement.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
