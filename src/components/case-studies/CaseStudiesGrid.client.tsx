"use client";

import React from "react";
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Typologie</label>
          <select
            value={assetClass}
            onChange={(e) => onChangeAsset(e.target.value)}
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm font-normal text-gray-900 focus:ring-2 focus:ring-[#F7B096] focus:border-[#F7B096] transition-colors min-w-[140px]"
          >
            <option value="">Toutes les typologies</option>
            {assetOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Ville</label>
          <select
            value={city}
            onChange={(e) => onChangeCity(e.target.value)}
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm font-normal text-gray-900 focus:ring-2 focus:ring-[#F7B096] focus:border-[#F7B096] transition-colors min-w-[140px]"
          >
            <option value="">Toutes les villes</option>
            {cityOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="h-11 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
            Effacer les filtres
          </button>
        )}
        
        <div className="text-sm text-gray-600 ml-auto flex items-center gap-2">
          <span className="font-medium">{filtered.length}</span>
          <span>sur</span>
          <span className="font-medium">{studies.length}</span>
          <span>résultats</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <CaseStudyCard key={s.id} study={s} />
        ))}
      </div>
    </div>
  );
}
