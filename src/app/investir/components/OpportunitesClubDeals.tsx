'use client';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

const opportunites = [
  {
    id: 1,
    status: "Disponible",
    statusColor: "bg-[#F7B096] text-black",
    location: "Paris 8ème",
    title: "Hôtel particulier Faubourg Saint-Honoré",
    surface: "1,200 m²",
    investissement: "15M€",
    rendement: "12-15%",
    duree: "24 mois",
    description: "Rénovation complète d'un hôtel particulier historique en bureaux premium dans le triangle d'or parisien.",
    image: "/images/Buildings/rue-la-boetie-11-copie-scaled.jpg",
    participants: "8/12",
    type: "Value-Add"
  },
  {
    id: 2,
    status: "Prochainement",
    statusColor: "bg-gray-200 text-gray-700",
    location: "Lyon Part-Dieu",
    title: "Tour de bureaux 25 étages",
    surface: "8,500 m²",
    investissement: "45M€",
    rendement: "10-13%",
    duree: "36 mois",
    description: "Acquisition et restructuration d'une tour de bureaux dans le quartier d'affaires de Lyon.",
    image: "/images/Buildings/Orange buildings.jpg",
    participants: "Bientôt ouvert",
    type: "Core+"
  },
  {
    id: 3,
    status: "Complet",
    statusColor: "bg-black text-white",
    location: "Marseille Vieux-Port",
    title: "Complexe hôtelier 4 étoiles",
    surface: "3,200 m²",
    investissement: "22M€",
    rendement: "14-18%",
    duree: "30 mois",
    description: "Transformation d'un bâtiment historique en hôtel boutique face au Vieux-Port de Marseille.",
    image: "/images/Buildings/Ienaa.jpg",
    participants: "12/12",
    type: "Opportunistic"
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
            Accédez en exclusivité à nos club deals immobiliers : acquisitions premium, rénovations d'exception et projets à forte valeur ajoutée. <span className="text-gray-800 font-medium">Investissement minimum 100k€.</span>
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
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Investissement</span>
                    <span className="text-sm font-medium text-black">{opportunite.investissement}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Rendement</span>
                    <span className="text-sm font-semibold text-[#F7B096]">{opportunite.rendement}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Durée</span>
                    <span className="text-sm font-medium text-black">{opportunite.duree}</span>
                  </div>
                </div>

                {/* CTA parfaitement visible */}
                <button 
                  className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    opportunite.status === "Complet" 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : opportunite.status === "Prochainement"
                      ? 'border border-gray-200 text-gray-600 hover:border-[#F7B096] hover:text-[#F7B096]'
                      : 'bg-black text-white hover:bg-[#F7B096] hover:text-black'
                  }`}
                  disabled={opportunite.status === "Complet"}
                >
                  {opportunite.status === "Complet" 
                    ? "Fermé" 
                    : opportunite.status === "Prochainement"
                    ? "Être informé"
                    : "Examiner l'opportunité"
                  }
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
            <a href="/nos-realisations" className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-[#F7B096] hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl">
              Voir toutes les opportunités
            </a>
            
            <button onClick={openInterview} className="border border-gray-400 text-gray-700 px-8 py-4 rounded-full font-medium hover:border-black hover:text-black transition-all duration-300">
              Programmer un entretien
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


