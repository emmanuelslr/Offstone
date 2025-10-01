"use client";

import React from "react";
import { motion } from "framer-motion";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import type { CaseStudyDoc } from "@/lib/prismic/caseStudiesCore";
import { uniqueSorted } from "@/lib/prismic/caseStudiesCore";
import { track } from "@/lib/analytics";

type Props = { studies: CaseStudyDoc[] };

export default function CaseStudiesGrid({ studies }: Props) {
  const [assetClass, setAssetClass] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");

  const assetOptions = uniqueSorted((studies || []).map((s) => s.assetClass));
  const cityOptions = uniqueSorted((studies || []).map((s) => s.city));

  const filtered = (studies || []).filter((s) => {
    return (!assetClass || s.assetClass === assetClass) && (!city || s.city === city);
  });

  function onChangeAsset(v: string) {
    setAssetClass(v);
    track('case_list_filter', { filter: 'asset_class', value: v || 'all' });
  }
  function onChangeCity(v: string) {
    setCity(v);
    track('case_list_filter', { filter: 'city', value: v || 'all' });
  }

  const clearFilters = () => {
    setAssetClass("");
    setCity("");
    track('case_list_filter', { filter: 'clear_all', value: 'all' });
  };

  const hasActiveFilters = assetClass || city;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03, delayChildren: 0.02 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  } as const;

  // Détecter si on est sur un écran mobile pour désactiver les animations
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsSmallScreen(isMobile);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="space-y-6">
      {/* Filtres */}
      {isSmallScreen ? (
        <div className="flex flex-wrap gap-4 sm:gap-6 items-end" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-900 mb-3 tracking-wide">Typologie</label>
            <div className="relative">
              <select
                value={assetClass}
                onChange={(e) => onChangeAsset(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 pr-10 text-sm font-normal text-gray-900 focus:ring-2 focus:ring-[#F7B096]/20 focus:border-[#F7B096] transition-all duration-200 hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Toutes les typologies</option>
                {assetOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-900 mb-3 tracking-wide">Ville</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => onChangeCity(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 pr-10 text-sm font-normal text-gray-900 focus:ring-2 focus:ring-[#F7B096]/20 focus:border-[#F7B096] transition-all duration-200 hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Toutes les villes</option>
                {cityOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-12 px-6 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              style={{ opacity: 1, transform: 'scale(1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              Effacer les filtres
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className="flex flex-wrap gap-4 sm:gap-6 items-end"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-900 mb-3 tracking-wide">Typologie</label>
            <div className="relative">
              <select
                value={assetClass}
                onChange={(e) => onChangeAsset(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 pr-10 text-sm font-normal text-gray-900 focus:ring-2 focus:ring-[#F7B096]/20 focus:border-[#F7B096] transition-all duration-200 hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Toutes les typologies</option>
                {assetOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-900 mb-3 tracking-wide">Ville</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => onChangeCity(e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 pr-10 text-sm font-normal text-gray-900 focus:ring-2 focus:ring-[#F7B096]/20 focus:border-[#F7B096] transition-all duration-200 hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Toutes les villes</option>
                {cityOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {hasActiveFilters && (
            <motion.button
              onClick={clearFilters}
              className="h-12 px-6 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              Effacer les filtres
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Résultats et compteur */}
      {isSmallScreen ? (
        <div className="flex items-center justify-between mb-6" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <div className="text-sm text-gray-600">
            {filtered.length === studies.length ? (
              <span>{studies.length} réalisation{studies.length > 1 ? 's' : ''}</span>
            ) : (
              <span>
                {filtered.length} réalisation{filtered.length > 1 ? 's' : ''} sur {studies.length}
                {hasActiveFilters && (
                  <span className="ml-1 text-[#F7B096] font-medium">
                    (filtrées)
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
        >
          <div className="text-sm text-gray-600">
            {filtered.length === studies.length ? (
              <span>{studies.length} réalisation{studies.length > 1 ? 's' : ''}</span>
            ) : (
              <span>
                {filtered.length} réalisation{filtered.length > 1 ? 's' : ''} sur {studies.length}
                {hasActiveFilters && (
                  <span className="ml-1 text-[#F7B096] font-medium">
                    (filtrées)
                  </span>
                )}
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Grille des études de cas */}
      {isSmallScreen ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((s, index) => (
            <div key={s.id} style={{ opacity: 1, transform: 'translateY(0)' }}>
              <CaseStudyCard study={s} priority={index < 3} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filtered.map((s, index) => (
            <motion.div key={s.id} variants={itemVariants}>
              <CaseStudyCard study={s} priority={index < 3} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}