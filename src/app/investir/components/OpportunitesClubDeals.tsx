'use client';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const searchParams = useSearchParams();


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
                  onClick={() => {
                    try {
                      const url = typeof window !== 'undefined' ? window.location.href : undefined;
                      const entries = searchParams ? Array.from(searchParams.entries()) : [];
                      const params = new URLSearchParams(entries);
                      const detail = {
                        page_url: url,
                        ref: typeof document !== 'undefined' ? document.referrer : undefined,
                        utm_source: params.get('utm_source') || 'site',
                        utm_medium: 'internal_cta',
                        utm_campaign: 'investir',
                        utm_content: 'opportunites-exclusives',
                        utm_term: 'Accéder aux détails',
                        cta_id: params.get('cta_id') || 'investir_opportunites_details',
                        asset_class: 'retail'
                      } as any;
                      (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })(detail);
                    } catch {}
                  }}
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
              onClick={() => {
                try {
                  const url = typeof window !== 'undefined' ? window.location.href : undefined;
                  const entries = searchParams ? Array.from(searchParams.entries()) : [];
                  const params = new URLSearchParams(entries);
                  const detail = {
                    page_url: url,
                    ref: typeof document !== 'undefined' ? document.referrer : undefined,
                    utm_source: params.get('utm_source') || 'site',
                    utm_medium: 'internal_cta',
                    utm_campaign: 'investir',
                    utm_content: 'opportunites-exclusives',
                    utm_term: 'Voir plus d\'opportunités',
                    cta_id: params.get('cta_id') || 'investir_opportunites_global',
                    asset_class: 'retail'
                  } as any;
                  (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })(detail);
                } catch {}
              }}
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

    </section>
  );
}


