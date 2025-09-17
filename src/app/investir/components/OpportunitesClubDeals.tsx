'use client';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

const opportunites = [
  {
    id: 1,
    status: "Acquis par les associés d'Offstone",
    statusColor: "bg-black/70 text-white backdrop-blur-sm",
    location: "Levallois-Perret",
    title: "Immeuble Jules Guesde",
    surface: "3,200 m²",
    investissement: "Confidentiel",
    rendement: "Confidentiel",
    duree: "Confidentiel",
    description: "Acquisition d'un immeuble de bureaux de 7 étages situé au 105 rue Jules Guesde à Levallois-Perret. Bien immobilier commercial dans une commune dynamique en pleine expansion.",
    image: "/images/Acquisitions/jules-guesde-levallois.webp",
    participants: "Club Deal",
    type: "Commercial",
    isBlurred: true
  },
  {
    id: 2,
    status: "Acquis par les associés d'Offstone",
    statusColor: "bg-black/70 text-white backdrop-blur-sm",
    location: "Paris 18ème",
    title: "Immeuble Simart",
    surface: "753 m²",
    investissement: "Confidentiel",
    rendement: "Confidentiel",
    duree: "Confidentiel",
    description: "Immeuble mixte indépendant de 6 étages sur 314 m² de terrain. Comprend 17 lots dont 13 appartements et 4 locaux commerciaux. Surface Carrez habitable optimisée.",
    image: "/images/réalisations images/Simart.webp",
    participants: "Club Deal",
    type: "Mixte",
    isBlurred: true
  },
  {
    id: 3,
    status: "Acquis par les associés d'Offstone",
    statusColor: "bg-black/70 text-white backdrop-blur-sm",
    location: "Paris 16ème",
    title: "Maison Iéna",
    surface: "270 m²",
    investissement: "Confidentiel",
    rendement: "Confidentiel",
    duree: "Confidentiel",
    description: "Transformation d'un magnifique hôtel particulier du 19e siècle en lieu d'exception. Chaque étage abrite un appartement spacieux et climatisé, avec des détails soigneusement conçus pour offrir une expérience unique.",
    image: "/images/réalisations images/Maison iena.webp",
    participants: "Club Deal",
    type: "Hôtellerie",
    isBlurred: true
  }
];

export default function OpportunitesClubDeals() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCountry: 'FR' as 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB',
    investmentAmount: '',
    message: ''
  });
  const [countryOpen, setCountryOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{phone?: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const searchParams = useSearchParams();

  // Close country menu on outside click
  useEffect(() => {
    if (!countryOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.country-menu-container')) {
        setCountryOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') setCountryOpen(false); 
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { 
      document.removeEventListener('mousedown', onClick); 
      document.removeEventListener('keydown', onKey); 
    };
  }, [countryOpen]);

  // Phone formatting helpers
  const formatFrPhone = (raw: string): string => {
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    if (rest.startsWith('33')) rest = rest.slice(2);
    while (rest.startsWith('0')) rest = rest.slice(1);
    if (!/^([67]\d*)?$/.test(rest)) {
      const m = rest.match(/[67].*/);
      rest = m ? m[0] : '';
    }
    rest = rest.slice(0, 9);
    if (!rest) return '+33';
    const first = rest.slice(0,1);
    const after = rest.slice(1);
    const pairs = after.match(/.{1,2}/g) || [];
    return '+33 ' + first + (pairs.length ? ' ' + pairs.join(' ') : (after ? ' ' + after : ''));
  };

  type CountryCode = 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB';
  const COUNTRIES: Array<{
    code: CountryCode;
    name: string;
    dial: string;
    flag: string;
    placeholder: string;
  }> = [
    { code: 'FR', name: 'France', dial: '+33', flag: 'FR', placeholder: '+33 6 12 34 56 78' },
    { code: 'BE', name: 'Belgique', dial: '+32', flag: 'BE', placeholder: '+32 4xx xx xx xx' },
    { code: 'CH', name: 'Suisse', dial: '+41', flag: 'CH', placeholder: '+41 7x xxx xx xx' },
    { code: 'LU', name: 'Luxembourg', dial: '+352', flag: 'LU', placeholder: '+352 621 123 456' },
    { code: 'DE', name: 'Allemagne', dial: '+49', flag: 'DE', placeholder: '+49 15x xxxx xxxx' },
    { code: 'ES', name: 'Espagne', dial: '+34', flag: 'ES', placeholder: '+34 6xx xxx xxx' },
    { code: 'IT', name: 'Italie', dial: '+39', flag: 'IT', placeholder: '+39 3xx xxx xxxx' },
    { code: 'GB', name: 'Royaume-Uni', dial: '+44', flag: 'GB', placeholder: '+44 7xxxx xxxxxx' },
  ];

  const getCountry = (code: CountryCode) => COUNTRIES.find(c => c.code === code)!;
  
  const formatPhoneByCountry = (raw: string, code: CountryCode): string => {
    if (code === 'FR') return formatFrPhone(raw);
    const country = getCountry(code);
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    const dialNoPlus = country.dial.replace('+','');
    if (rest.startsWith(dialNoPlus)) rest = rest.slice(dialNoPlus.length);
    while (rest.startsWith('0')) rest = rest.slice(1);

    const groupMap: Record<CountryCode, { groups: number[]; max: number }> = {
      FR: { groups: [1,2,2,2,2], max: 9 },
      BE: { groups: [3,2,2,2], max: 9 },
      CH: { groups: [2,3,2,2], max: 9 },
      LU: { groups: [3,3,3], max: 9 },
      DE: { groups: [3,4,4], max: 11 },
      ES: { groups: [3,3,3], max: 9 },
      IT: { groups: [3,3,4], max: 10 },
      GB: { groups: [5,6], max: 11 },
    };

    const rule = groupMap[code];
    rest = rest.slice(0, rule.max);
    if (!rest) return country.dial;

    const parts: string[] = [];
    let idx = 0;
    for (const len of rule.groups) {
      if (idx >= rest.length) break;
      parts.push(rest.slice(idx, Math.min(idx + len, rest.length)));
      idx += len;
    }
    const grouped = parts.join(' ');
    return country.dial + (grouped ? ' ' + grouped : '');
  };

  // Lightweight inline SVG flags
  function FlagSvg({ code, className = 'w-5 h-3 rounded-sm overflow-hidden shadow-sm' }: { code: CountryCode; className?: string }) {
    switch (code) {
      case 'FR':
        return (
          <svg viewBox="0 0 3 2" className={className} aria-label="France"><rect width="1" height="2" x="0" y="0" fill="#0055A4"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#EF4135"/></svg>
        );
      case 'BE':
        return (
          <svg viewBox="0 0 3 2" className={className} aria-label="Belgique"><rect width="1" height="2" x="0" y="0" fill="#000"/><rect width="1" height="2" x="1" y="0" fill="#FFD90C"/><rect width="1" height="2" x="2" y="0" fill="#EF3340"/></svg>
        );
      case 'IT':
        return (
          <svg viewBox="0 0 3 2" className={className} aria-label="Italie"><rect width="1" height="2" x="0" y="0" fill="#009246"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#CE2B37"/></svg>
        );
      case 'DE':
        return (
          <svg viewBox="0 0 3 2" className={className} aria-label="Allemagne"><rect width="3" height="2" fill="#000"/><rect width="3" height="1.333" y="0.667" fill="#DD0000"/><rect width="3" height="0.666" y="1.334" fill="#FFCE00"/></svg>
        );
      case 'ES':
        return (
          <svg viewBox="0 0 3 2" className={className} aria-label="Espagne"><rect width="3" height="2" fill="#AA151B"/><rect width="3" height="1" y="0.5" fill="#F1BF00"/></svg>
        );
      case 'GB':
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
      case 'CH':
        return (
          <svg viewBox="0 0 3 3" className={className} aria-label="Suisse"><rect width="3" height="3" fill="#D52B1E"/><rect x="1.25" y="0.5" width="0.5" height="2" fill="#fff"/><rect x="0.5" y="1.25" width="2" height="0.5" fill="#fff"/></svg>
        );
      case 'LU':
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Validation du téléphone
      const phone = formData.phone?.trim();
      const countryCode = formData.phoneCountry;
      const countryDial = getCountry(countryCode).dial;
      
      if (!phone || phone === countryDial) {
        setValidationErrors({ phone: true });
        setIsSubmitting(false);
        return;
      } else {
        // Vérifier que le numéro a au moins 8 chiffres après l'indicatif
        const digitsOnly = phone.replace(/[^\d]/g, '');
        const dialDigits = countryDial.replace(/[^\d]/g, '');
        const phoneDigits = digitsOnly.replace(dialDigits, '');
        
        if (phoneDigits.length < 8) {
          setValidationErrors({ phone: true });
          setIsSubmitting(false);
          return;
        }
      }

      // Clear phone error if valid
      setValidationErrors({});

      // Prepare form data with UTM parameters
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        phoneCountry: formData.phoneCountry,
        investmentAmount: formData.investmentAmount,
        message: formData.message,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        utm_source: searchParams?.get('utm_source') || 'website',
        utm_medium: 'internal_cta',
        utm_campaign: 'opportunities_exclusives',
        utm_content: 'contact_form',
        utm_term: 'Voir plus d\'opportunités',
        cta_id: 'opportunities_contact_form',
        asset_class: 'mixed'
      };

      // Send to API
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Le serveur a retourné une réponse invalide. Veuillez réessayer.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      // Réinitialiser le formulaire et afficher la vue de succès
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneCountry: 'FR',
        investmentAmount: '',
        message: ''
      });
      setFormSubmitted(true);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInterview = () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : undefined;
      const ref = typeof document !== 'undefined' ? document.referrer : undefined;
      const entries = searchParams ? Array.from(searchParams.entries()) : [];
      const params = new URLSearchParams(entries);

      const detail = {
        page_url: url,
        ref,
        utm_source: params.get('utm_source') || 'site',
        utm_medium: 'internal_cta',
        utm_campaign: 'investir',
        // Identify this exact CTA as the source
        utm_content: 'accès-exclusif',
        utm_term: 'Programmer un entretien',
        cta_id: params.get('cta_id') || 'investir_opportunites_entretien',
        asset_class: 'retail',
      } as any;

      const w: any = typeof window !== 'undefined' ? (window as any) : undefined;
      if (w) {
        if (w.offstoneOpenWaitlist) {
          w.offstoneOpenWaitlist(detail);
        } else {
          (w.__offstone_waitlist_queue ||= []).push(detail);
          w.dispatchEvent(new CustomEvent('waitlist:open', { detail }));
        }
      }
    } catch {}
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        {/* En-tête style Palantir */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
            <span className="text-gray-600 text-sm tracking-[0.15em] uppercase font-medium">
              Opportunités exclusives
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-normal text-black mb-8 leading-[1.1] max-w-4xl"
          >
            Investissez dans des immeubles d'exception
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl"
          >
            Accédez en exclusivité à nos club deals immobiliers : acquisitions premium, rénovations d'exception et projets à forte valeur ajoutée.
          </motion.p>
        </div>

        {/* Grille des opportunités - Hauteur corrigée pour voir les boutons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {opportunites.map((opportunite, index) => (
            <motion.div
              key={opportunite.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onMouseEnter={() => setActiveCard(opportunite.id)}
              onMouseLeave={() => setActiveCard(null)}
              className={`group relative bg-white rounded-lg overflow-hidden transition-all duration-500 h-[540px] ${
                activeCard === opportunite.id ? 'scale-105 shadow-2xl' : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Image optimisée */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={opportunite.image}
                  alt={opportunite.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    activeCard === opportunite.id ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                
                {/* Overlay léger */}
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Badge statut épuré */}
                <div className={`absolute top-3 left-3 px-3 py-1.5 rounded text-xs font-medium ${opportunite.statusColor}`}>
                  {opportunite.status}
                </div>
                
                {/* Localisation en bas à droite */}
                <div className="absolute bottom-3 right-3 text-white text-xs font-medium bg-black/40 px-2 py-1 rounded">
                  {opportunite.location}
                </div>
              </div>

              {/* Contenu avec plus d'espace pour le bouton */}
              <div className="p-6 h-[332px] flex flex-col justify-between">
                {/* Header */}
                <div>
                  <h3 className="text-lg font-medium text-black mb-3 leading-tight" style={{ 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {opportunite.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6" style={{ 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {opportunite.description}
                  </p>
                </div>

                {/* Métriques style Palantir - Bien espacées */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Surface</span>
                    <span className="text-sm font-medium text-black">{opportunite.surface}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Type</span>
                    <span className="text-sm font-semibold text-[#F7B096]">{opportunite.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Investissement</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-black blur-sm select-none">{opportunite.investissement}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Rendement</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#F7B096] blur-sm select-none">{opportunite.rendement}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* CTA parfaitement visible */}
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 bg-black text-white hover:bg-[#F7B096] hover:text-black flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Accéder aux détails
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA global épuré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-normal text-black mb-4">
            Découvrez toutes nos opportunités
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Accédez au deal flow complet de nos investissements immobiliers exclusifs et rejoignez notre communauté d'investisseurs avertis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowContactForm(true)}
              className="inline-block bg-[#F7B096] text-black px-8 py-4 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Voir plus d'opportunités
            </button>
            
            <button onClick={openInterview} className="border border-gray-400 text-gray-700 px-8 py-4 rounded-full font-medium hover:border-black hover:text-black transition-all duration-300">
              Programmer un entretien
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal de formulaire de contact */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {!formSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Accéder aux opportunités exclusives</h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>


            {/* Compliance AMF */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Important :</strong> Ce formulaire ne constitue ni une offre au public ni une communication promotionnelle sur un instrument financier. 
                L'accès aux opportunités se fait par candidature et adhésion à un cercle restreint d'investisseurs. 
                Les performances passées ne préjugent pas des performances futures.
              </p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all"
                    placeholder="Votre prénom"
                  />
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="grid grid-cols-[140px_1fr] gap-3 items-center">
                    <div className="relative w-[140px] country-menu-container">
                      <button
                        type="button"
                        className="relative w-full bg-white text-gray-700 border border-gray-300 rounded-lg pl-2 pr-6 py-3 text-sm text-left hover:bg-gray-50 outline-none focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all flex items-center gap-1 whitespace-nowrap"
                        onClick={(e) => { e.preventDefault(); setCountryOpen(v => !v); }}
                      >
                        <span className="mr-1"><FlagSvg code={formData.phoneCountry} /></span>
                        <span className="mr-1 font-semibold">{formData.phoneCountry}</span>
                        <span className="font-medium">{getCountry(formData.phoneCountry).dial}</span>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                          <ArrowDown />
                        </span>
                      </button>
                      <div className={`${countryOpen ? '' : 'hidden'} absolute left-0 right-0 mt-1 max-h-56 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg z-20`}>
                        {COUNTRIES.map(c => (
                          <button
                            type="button"
                            key={c.code}
                            className={`w-full px-3 py-2 text-sm text-left ${c.code === formData.phoneCountry ? 'bg-[#F7B096] text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => {
                              setFormData(d => ({ 
                                ...d, 
                                phoneCountry: c.code, 
                                phone: formatPhoneByCountry(d.phone ?? '', c.code) 
                              }));
                              setCountryOpen(false);
                            }}
                          >
                            <span className="mr-2"><FlagSvg code={c.code} /></span>
                            <span className="truncate">{c.code} ({c.dial})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onFocus={() => { 
                        if (!formData.phone) { 
                          const dial = getCountry(formData.phoneCountry).dial; 
                          setFormData(d => ({ ...d, phone: dial })); 
                        } 
                      }}
                      onChange={(e)=>{ 
                        setFormData(d=>({...d, phone: formatPhoneByCountry(e.target.value, formData.phoneCountry)}));
                        if (validationErrors.phone) {
                          setValidationErrors({});
                        }
                      }}
                      maxLength={24}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all ${validationErrors.phone ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder={getCountry(formData.phoneCountry).placeholder}
                    />
                  </div>
                  {validationErrors.phone && <p className="text-red-400 text-xs mt-1">Veuillez entrer un numéro de téléphone valide</p>}
                </div>
              </div>

              <div>
                <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Montant d'investissement envisagé *
                </label>
                <select
                  id="investmentAmount"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B096] focus:border-transparent transition-all"
                >
                  <option value="">Sélectionnez un montant</option>
                  <option value="lt_20k">Moins de 20 k€</option>
                  <option value="20k_50k">20 k€ – 50 k€</option>
                  <option value="50k_100k">50 k€ – 100 k€</option>
                  <option value="100k_500k">100 k€ – 500 k€</option>
                  <option value="500k_1m">500 k€ – 1 M€</option>
                  <option value="gt_1m">Plus de 1 M€</option>
                </select>
              </div>


              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-[#F7B096] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Accéder aux opportunités
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
                >
                  Annuler
                </button>
              </div>
            </form>
              </>
            ) : (
              <>
                {/* Vue de succès */}
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Demande envoyée avec succès !
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Merci pour votre intérêt pour nos opportunités d'investissement exclusives. 
                    Notre équipe vous recontactera dans les plus brefs délais pour discuter de votre profil d'investisseur.
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">
                      <strong>Prochaines étapes :</strong>
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1 text-left">
                      <li>• Vérification de votre profil d'investisseur</li>
                      <li>• Envoi de la documentation complète</li>
                      <li>• Planification d'un entretien personnalisé</li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => {
                        setShowContactForm(false);
                        setFormSubmitted(false);
                      }}
                      className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-[#F7B096] hover:text-black transition-all duration-300"
                    >
                      Fermer
                    </button>
                    
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setShowContactForm(false);
                        openInterview();
                      }}
                      className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-black hover:text-black transition-all duration-300"
                    >
                      Programmer un entretien
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}


