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

interface SectorStats {
  tri: string;
  assets: string;
  units: string;
}

const SECTOR_STATS: Record<SectorKey, SectorStats> = {
  residentiel: {
    tri: '16%',
    assets: '5 immeubles',
    units: '62 appartements'
  },
  hotels: {
    tri: '17%',
    assets: '4 hôtels',
    units: '74 unités'
  },
  logistique: {
    tri: '40%',
    assets: '2 unités',
    units: '1300m²'
  },
  bureaux: {
    tri: '19%',
    assets: '4 immeubles',
    units: '1000m²'
  }
};

const SECTORS: SectorConfig[] = [
  {
    key: 'residentiel',
    title: 'Résidentiel',
    subtitle: "Identifier des belles endormies en centre-ville, révéler leur potentiel par un repositionnement soigné et les adresser à la clientèle qui en valorise le mieux l'usage.",
    image: '/images/Secteurs/Résidentiel.jpg',
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
    image: '/images/Buildings/Logistics.jpg',
  },
  {
    key: 'bureaux',
    title: 'Bureaux',
    subtitle: "Transformer des immeubles centraux dépassés en actifs de premier plan, via travaux lourds et conversions, puis louer à des entreprises de référence.",
    image: '/images/Buildings/Truchet.jpg',
  },
];

export default function SectorTabsSection() {
  const [activeKey, setActiveKey] = useState<SectorKey>('residentiel');
  const activeStats = SECTOR_STATS[activeKey];

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-32 mt-20 pb-8">
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
            <div className="relative w-full max-w-[500px] h-[360px] sm:h-[420px] lg:h-[500px]">
              <div className="relative rounded-xl overflow-hidden w-full h-full" style={{ background: '#F6F4F0' }}>
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

              {/* Composant blanc avec chiffres clés - positionné en haut à gauche */}
              <div className="absolute top-4 sm:top-6 left-3 sm:left-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] w-[180px] sm:w-[200px]">
                <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-2 font-medium">
                  PERFORMANCE SECTEUR
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-lg font-bold text-black mb-0.5">{activeStats.tri}</div>
                    <div className="text-[11px] text-gray-600 leading-tight">TRI moyen avant levier</div>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div>
                    <div className="text-sm font-bold text-black mb-0.5">{activeStats.assets}</div>
                    <div className="text-[11px] text-gray-600 leading-tight">En portefeuille</div>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div>
                    <div className="text-sm font-bold text-black mb-0.5">{activeStats.units}</div>
                    <div className="text-[11px] text-gray-600 leading-tight">
                      {activeKey === 'residentiel' ? 'Appartements' : 
                       activeKey === 'hotels' ? "Unités d'hébergement" :
                       activeKey === 'logistique' || activeKey === 'bureaux' ? 'Surfaces louées' : 'Unités'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton noir "Découvrir nos opportunités" - positionné en bas à gauche */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.65,0.3,0.9)]">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-black/90 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full shadow-lg transition-all duration-300 hover:bg-black hover:scale-105 hover:shadow-xl group"
                  type="button"
                >
                  Découvrir nos opportunités
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
