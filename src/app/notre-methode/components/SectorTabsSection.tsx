'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type SectorKey = 'residentiel' | 'hotels' | 'logistique' | 'bureaux';

interface SectorConfig {
  key: SectorKey;
  title: string;
  subtitle: string;
  image: string;
}

const SECTORS: SectorConfig[] = [
  {
    key: 'residentiel',
    title: 'Résidentiel',
    subtitle: "Identifier des belles endormies en centre-ville, révéler leur potentiel par un repositionnement soigné et les adresser à la clientèle qui en valorise le mieux l'usage.",
    image: '/images/Buildings/Maison Barbès.avif',
  },
  {
    key: 'hotels',
    title: 'Hôtels',
    subtitle: "Gérer en interne toute la chaîne de valeur, du design à la tarification dynamique, pour des hôtels centraux à forte identité et des revenus durables.",
    image: '/images/Buildings/Ienaa.jpg',
  },
  {
    key: 'logistique',
    title: 'Logistique',
    subtitle: "Acquérir des sites urbains rares, adapter l'outil au dernier kilomètre, optimiser les flux et sécuriser des baux longs avec des clients stratégiques.",
    image: '/images/Buildings/Truchet.jpg',
  },
  {
    key: 'bureaux',
    title: 'Bureaux',
    subtitle: "Transformer des immeubles centraux dépassés en actifs de premier plan, via travaux lourds et conversions, puis louer à des entreprises de référence.",
    image: '/images/Buildings/2barbes.PNG',
  },
];

export default function SectorTabsSection() {
  const [activeKey, setActiveKey] = useState<SectorKey>('residentiel');

  return (
         <section>
       <div className="container mx-auto px-20 sm:px-32 mt-20 pb-8">
         {/* Badge SECTEURS positionné plus haut */}
         <div className="mb-8 flex items-center gap-2">
           <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
           <span className="text-gray-600 text-xs tracking-[0.18em]">SECTEURS</span>
         </div>
         
         <div className="flex flex-col lg:flex-row items-start justify-between">
                       {/* Left: Tabs */}
            <div className="lg:w-3/5 lg:pr-20 w-full">
             <div className="flex flex-col gap-7">
              {SECTORS.map((sector) => {
                const isActive = sector.key === activeKey;
                return (
                  <button
                    key={sector.key}
                    type="button"
                    onClick={() => setActiveKey(sector.key)}
                                         className={`text-left transition-colors duration-200 rounded-lg px-0 py-2`}
                    aria-pressed={isActive}
                  >
                                         <div className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight transition-all duration-300 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] ${isActive ? 'text-[#111]' : 'text-[#BDBDBD]'} `} style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>
                       {sector.title}
                     </div>
                                           <div 
                        className={`text-[19px] md:text-[21px] text-gray-600 mt-4 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.65,0.3,0.9)]`}
                        style={{ 
                          maxHeight: isActive ? '120px' : '0px',
                          opacity: isActive ? 1 : 0
                        }}
                      >
                       {sector.subtitle}
                     </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:w-2/5 w-full mt-10 lg:mt-0 flex justify-center">
            <div className="relative rounded-xl overflow-hidden" style={{ width: '100%', maxWidth: '500px', height: '500px', background: '#F6F4F0' }}>
              {SECTORS.map((sector) => {
                const isActive = sector.key === activeKey;
                return (
                                     <div
                     key={sector.key}
                     className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} `}
                     aria-hidden={!isActive}
                   >
                    <Image src={sector.image} alt={sector.title} fill className="object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}