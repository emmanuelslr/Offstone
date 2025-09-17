"use client";

import React, { useState } from "react";
import Image from "next/image";

type SectorKey = "residentiel" | "hotels" | "logistique" | "bureaux";

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
  residentiel: { tri: "16%", assets: "5 immeubles", units: "62 appartements" },
  hotels: { tri: "17%", assets: "4 hôtels", units: "74 unités" },
  logistique: { tri: "14%", assets: "2 sites", units: "1300 m2" },
  bureaux: { tri: "19%", assets: "4 immeubles", units: "1000 m2" },
};

const SECTORS: SectorConfig[] = [
  {
    key: "residentiel",
    title: "R\u00e9sidentiel",
    subtitle:
      "Nous sourçons des actifs en centre-ville, révélons leur potentiel par un repositionnement soigné et les adressons aux clients qui les valorisent le mieux.",
    image: "/images/Buildings/rue-la-boetie-11-copie-scaled.jpg",
  },
  {
    key: "hotels",
    title: "H\u00f4tels",
    subtitle:
      "Nous gérons toute la chaîne de valeur, du design\n      à la tarification dynamique, pour des hôtels\n      idéalement situés, à forte identité, offrant des revenus pérennes.",
    image: "/images/Buildings/Ienaa.jpg",
  },
  {
    key: "logistique",
    title: "Logistique",
    subtitle:
      "Nous faisons l'acquisition de sites urbains, adaptons l'outil aux besoins logistiques du dernier kilomètre, optimisons les flux et sécurisons des baux de longue durée.",
    image: "/images/Buildings/Logistics.jpg",
  },
  {
    key: "bureaux",
    title: "Bureaux",
    subtitle:
      "Nous transformons des immeubles centraux en actifs de premier plan grâce à des travaux lourds et des conversions, puis les louons à des entreprises de référence.",
    image: "/images/Buildings/Truchet.jpg",
  },
];

const safeSrc = (p: string) => encodeURI(p);

export default function SectorTabsSectionFixed() {
  const [activeKey, setActiveKey] = useState<SectorKey>("residentiel");
  const activeStats = SECTOR_STATS[activeKey];

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-32 mt-16 pb-6">
        <div className="mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
          <span className="text-gray-600 text-xs tracking-[0.18em]">SECTEURS</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between">
          <div className="lg:w-3/5 lg:pr-20 w-full">
            <div className="flex flex-col gap-5">
              {SECTORS.map((sector) => {
                const isActive = sector.key === activeKey;
                const panelId = `sector-panel-${sector.key}`;
                return (
                  <div key={sector.key} className="w-full">
                    <button
                      type="button"
                      onClick={() => setActiveKey(sector.key)}
                      className="w-full text-left rounded-lg px-0 py-1"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className={`text-3xl md:text-4xl lg:text-[3rem] font-light tracking-tight transition-all duration-300 ${
                            isActive ? "text-[#111]" : "text-[#BDBDBD]"
                          }`}
                          style={{ fontFamily: "AllianceNo1-Regular, sans-serif" }}
                        >
                          {sector.title}
                        </div>
                        <span className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-[#111]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <div
                        className="hidden lg:block text-[18px] md:text-[20px] text-gray-600 mt-3 overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isActive ? "100px" : "0px", opacity: isActive ? 1 : 0 }}
                      >
                        {sector.subtitle}
                      </div>
                    </button>

                    <div
                      id={panelId}
                      className="lg:hidden overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isActive ? "800px" : "0px", opacity: isActive ? 1 : 0 }}
                    >
                      <div className="mt-3 text-[17px] text-gray-600">{sector.subtitle}</div>
                      <div className="mt-5">
                        <div className="relative w-full h-[320px] sm:h-[380px]">
                          <div className="relative rounded-xl overflow-hidden w-full h-full" style={{ background: "#F6F4F0" }}>
                            <Image src={safeSrc(sector.image)} alt={sector.title} fill className="object-cover" />
                          </div>
                          <div className="absolute top-3 left-3 bg-white/95 rounded-lg p-3 shadow-lg w-[180px]">
                            <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-2 font-medium">PERFORMANCE SECTEUR</div>
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
                                <div className="text-[11px] text-gray-600 leading-tight">{activeKey === "residentiel" ? "Appartements" : activeKey === "hotels" ? "Unités" : "Surfaces louées"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex lg:w-2/5 w-full mt-10 lg:mt-0 justify-center">
            <div className="relative w-full max-w-[500px] h-[320px] sm:h-[380px] lg:h-[450px]">
              <div className="relative rounded-xl overflow-hidden w-full h-full" style={{ background: "#F6F4F0" }}>
                {SECTORS.map((sector) => {
                  const isActive = sector.key === activeKey;
                  return (
                    <div key={sector.key} className={`absolute inset-0 transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} aria-hidden={!isActive}>
                      <Image src={safeSrc(sector.image)} alt={sector.title} fill className="object-cover" />
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-4 sm:top-6 left-3 sm:left-6 bg-white/95 rounded-lg p-3 shadow-lg w-[180px] sm:w-[200px]">
                <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-2 font-medium">PERFORMANCE SECTEUR</div>
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
                    <div className="text-[11px] text-gray-600 leading-tight">{activeKey === "residentiel" ? "Appartements" : activeKey === "hotels" ? "Unités" : "Surfaces louées"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
