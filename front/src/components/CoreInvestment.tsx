  'use client';
import { useRef } from 'react';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const imageBase = '/videos/Images immeubles/';
const allImages = [
  'AGUESSEAU-GESTION-11-scaled.jpg.webp',
  '58226-rue-la-boetie-13-copie-scaled.jpg.webp',
  'Villa-Seurat-35-2048x1366.jpg.webp',
  '60348-Rue-du-Moulin-Vert-39CB-scaled.jpg.webp',
  'WEB_LUX_0749.jpg.webp',
  'WEB_Facade.jpg.webp',
  'Photo-Immeuble-clean-1.png.webp',
  'Facade-1.png.webp',
  'Facade-6.jpg.webp',
  'bonnet-20-1-1.jpg.webp',
  'costar.brightspotcdn-scaled.jpg.webp',
  'WEB_Rue-Abel-Truchet-47951-PictHouse.jpg.webp'
];

const investments = [
  {
    title: 'Défense',
    description: 'Solutions pour le secteur naval',
    longDescription: 'Des projets immobiliers structurés et sécurisés.',
    image: `${imageBase}${allImages[0]}`,
    logo: null
  },
  {
    title: 'Bureaux',
    description: 'Gestion des espaces de bureaux',
    longDescription: 'Des espaces de travail modernes et flexibles adaptés aux besoins des entreprises.',
    image: `${imageBase}${allImages[1]}`,
    logo: null
  },
  {
    title: 'Résidentiel',
    description: 'Solutions immobilières résidentielles',
    longDescription: 'Des projets résidentiels innovants qui répondent aux attentes des habitants modernes.',
    image: `${imageBase}${allImages[2]}`,
    logo: null
  },
  {
    title: 'Logistique',
    description: 'Gestion des espaces logistiques',
    longDescription: 'Des solutions logistiques optimisées et stratégiquement positionnées.',
    image: `${imageBase}${allImages[3]}`,
    logo: null
  },
  {
    title: 'Retail',
    description: 'Gestion des espaces commerciaux',
    longDescription: 'Des espaces retail attractifs et performants dans des emplacements premium.',
    image: `${imageBase}${allImages[4]}`,
    logo: null
  },
  {
    title: 'Industriel',
    description: 'Solutions pour l\'industrie',
    longDescription: 'Des actifs industriels adaptés aux nouvelles technologies et aux process modernes.',
    image: `${imageBase}${allImages[5]}`,
    logo: null
  },
  {
    title: 'Mixte',
    description: 'Projets multi-usage',
    longDescription: 'Des projets mixtes innovants qui créent des synergies entre différents usages.',
    image: `${imageBase}${allImages[6]}`,
    logo: null
  },
  {
    title: 'Développement',
    description: 'Nouveaux projets immobiliers',
    longDescription: 'Des projets de développement ambitieux qui façonnent la ville de demain.',
    image: `${imageBase}${allImages[7]}`,
    logo: null
  },
  {
    title: 'Premium',
    description: 'Solutions immobilières premium',
    longDescription: 'Des emplacements exceptionnels pour des projets d\'exception.',
    image: `${imageBase}${allImages[8]}`,
    logo: null
  },
  {
    title: 'Innovation',
    description: 'Projets innovants',
    longDescription: 'Des solutions novatrices pour répondre aux défis de demain.',
    image: `${imageBase}${allImages[9]}`,
    logo: null
  },
  {
    title: 'Durable',
    description: 'Développement durable',
    longDescription: 'Des projets responsables et durables pour un avenir meilleur.',
    image: `${imageBase}${allImages[10]}`,
    logo: null
  },
  {
    title: 'Capital',
    description: 'Gestion de capital',
    longDescription: 'Une expertise financière au service de l\'immobilier.',
    image: `${imageBase}${allImages[11]}`,
    logo: null
  }
];

export default function CoreInvestment() {
  const ref = useRef(null);
  const SliderRow = ({ direction = 'left', className = '' }) => (
    <div 
      className={`flex gap-3 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} ${className}`}
      style={{ width: 'fit-content' }}
    >
      {(direction === 'left' 
        ? [...investments, ...investments.slice(6), ...investments.slice(0, 6)]
        : [...investments.slice(6), ...investments, ...investments.slice(0, 6)]
      ).map((investment, index) => (
        <div
          key={`${direction}-${index}`}
          className="w-[260px] flex-shrink-0 group"
        >
          <div className="bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden relative transition-all duration-500">
            <div className="relative h-[360px] overflow-hidden">
              <Image
                src={investment.image}
                alt={investment.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
              
              {/* Content visible by default */}
              <div className="absolute bottom-8 left-6 right-6 z-10 transition-opacity duration-300 delay-100 group-hover:opacity-0 group-hover:delay-0">
                <h3 className="text-lg font-light text-white mb-3">
                  {investment.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {investment.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1E2124] origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-700" />
              
              {/* Hover content */}
              <div className="absolute inset-0 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 z-10">
                <div className="px-8">
                  <h3 className="text-xl font-light text-white mb-4">
                    {investment.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {investment.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={ref} className="bg-white pt-16 pb-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <SectionTitle 
          title="Core Investment"
          subtitle="Notre expertise couvre une large gamme de secteurs stratégiques"
          textColor="dark"
        />

        <div className="relative px-4 space-y-8">
          <SliderRow direction="left" />
          <SliderRow direction="right" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-260px * ${investments.length} - ${investments.length * 12}px)); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(calc(-260px * ${investments.length} - ${investments.length * 12}px)); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 120s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 120s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll-left,
          .animate-scroll-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
