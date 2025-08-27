"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface StickyFiltersProps {
  assetClasses: string[];
  themes: string[];
  level: string;
  duration: string;
  sort: string;
}

const ASSET_CLASS_OPTIONS = ["résidentiel", "bureaux", "hôtellerie", "logistique"];
const THEME_OPTIONS = ["méthode", "fiscalité", "études_de_cas", "marchés"];
const LEVEL_OPTIONS = [
  { value: "", label: "Tous niveaux" },
  { value: "découverte", label: "Découverte" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" }
];
const DURATION_OPTIONS = [
  { value: "", label: "Toutes durées" },
  { value: "short", label: "≤4 min" },
  { value: "medium", label: "5–8 min" },
  { value: "long", label: "9–15 min" }
];
const SORT_OPTIONS = [
  { value: "published_at_desc", label: "Plus récents" },
  { value: "published_at_asc", label: "Plus anciens" },
  { value: "reading_time_asc", label: "Plus courts" },
  { value: "reading_time_desc", label: "Plus longs" }
];

export default function StickyFilters({
  assetClasses,
  themes,
  level,
  duration,
  sort
}: StickyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const updateFilters = (updates: Record<string, string | string[]>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Mettre à jour les paramètres
    Object.entries(updates).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.delete(key);
        value.forEach(v => params.append(key, v));
      } else {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
    });

    // Reset page
    params.delete("page");
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/ressources";
    router.push(newUrl, { scroll: false });
  };

  const toggleAssetClass = (asset: string) => {
    const newAssetClasses = assetClasses.includes(asset)
      ? assetClasses.filter(a => a !== asset)
      : [...assetClasses, asset];
    updateFilters({ asset: newAssetClasses });
  };

  const toggleTheme = (theme: string) => {
    const newThemes = themes.includes(theme)
      ? themes.filter(t => t !== theme)
      : [...themes, theme];
    updateFilters({ theme: newThemes });
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/ressources";
    router.push(newUrl, { scroll: false });
  };

  const hasActiveFilters = assetClasses.length > 0 || themes.length > 0 || level || duration || sort !== "published_at_desc";

  return (
    <>
      {/* Desktop Sticky Filters */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="hidden lg:flex items-center gap-6 flex-wrap">
            {/* Asset Classes */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Classe d&apos;actifs:</span>
              <div className="flex gap-1">
                {ASSET_CLASS_OPTIONS.map(asset => (
                  <button
                    key={asset}
                    onClick={() => toggleAssetClass(asset)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                      assetClasses.includes(asset)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {asset}
                  </button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Thématique:</span>
              <div className="flex gap-1">
                {THEME_OPTIONS.map(theme => (
                  <button
                    key={theme}
                    onClick={() => toggleTheme(theme)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                      themes.includes(theme)
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Niveau:</span>
              <select
                value={level}
                onChange={(e) => updateFilters({ level: e.target.value })}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {LEVEL_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Durée:</span>
              <div className="flex gap-1">
                {DURATION_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => updateFilters({ duration: option.value })}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                      duration === option.value
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Tri:</span>
              <select
                value={sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors whitespace-nowrap"
              >
                Effacer filtres
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Filtres {hasActiveFilters && `(${assetClasses.length + themes.length + (level ? 1 : 0) + (duration ? 1 : 0)})`}
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filtres</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Filter Content */}
              <div className="space-y-6">
                {/* Asset Classes */}
                <div>
                  <h4 className="font-medium mb-3">Classe d&apos;actifs</h4>
                  <div className="space-y-2">
                    {ASSET_CLASS_OPTIONS.map(asset => (
                      <label key={asset} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={assetClasses.includes(asset)}
                          onChange={() => toggleAssetClass(asset)}
                          className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{asset}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Themes */}
                <div>
                  <h4 className="font-medium mb-3">Thématique</h4>
                  <div className="space-y-2">
                    {THEME_OPTIONS.map(theme => (
                      <label key={theme} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={themes.includes(theme)}
                          onChange={() => toggleTheme(theme)}
                          className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <h4 className="font-medium mb-3">Niveau</h4>
                  <select
                    value={level}
                    onChange={(e) => updateFilters({ level: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {LEVEL_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="font-medium mb-3">Durée de lecture</h4>
                  <div className="space-y-2">
                    {DURATION_OPTIONS.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="duration"
                          value={option.value}
                          checked={duration === option.value}
                          onChange={(e) => updateFilters({ duration: e.target.value })}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-medium mb-3">Tri</h4>
                  <select
                    value={sort}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Button */}
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      resetFilters();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                  >
                    Effacer tous les filtres
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
