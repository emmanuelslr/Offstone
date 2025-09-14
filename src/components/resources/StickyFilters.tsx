"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type StickyFiltersProps = {
  assetClasses: string[];
  level: string;
  duration: string;
  sort: string;
};

export default function StickyFilters({ assetClasses, level, duration, sort }: StickyFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();

  const updateParam = useCallback((key: string, value: string) => {
    const sp = new URLSearchParams(params?.toString() || "");
    if (!value) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    const query = sp.toString();
    const url = query ? `/ressources?${query}` : "/ressources";
    router.push(url);
  }, [params, router]);

  return (
    <div className="sticky top-20 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-3">
        {/* Selected asset classes (read-only chips) */}
        {Array.isArray(assetClasses) && assetClasses.length > 0 && (
          <div className="flex flex-wrap gap-2 mr-2">
            {assetClasses.slice(0, 3).map((a) => (
              <span key={a} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">{a}</span>
            ))}
            {assetClasses.length > 3 && (
              <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-500">+{assetClasses.length - 3}</span>
            )}
          </div>
        )}

        {/* Level */}
        <label className="text-sm text-gray-600">Niveau</label>
        <select
          className="ml-2 mr-4 border rounded px-2 py-1 text-sm"
          value={level || ""}
          onChange={(e) => updateParam("niveau", e.target.value)}
        >
          <option value="">Tous</option>
          <option value="debutant">Découverte</option>
          <option value="intermediaire">Intermédiaire</option>
          <option value="avance">Avancé</option>
        </select>

        {/* Duration */}
        <label className="text-sm text-gray-600">Durée</label>
        <select
          className="ml-2 mr-4 border rounded px-2 py-1 text-sm"
          value={duration || ""}
          onChange={(e) => updateParam("duree", e.target.value)}
        >
          <option value="">Toutes</option>
          <option value="short">≤ 4 min</option>
          <option value="medium">5–8 min</option>
          <option value="long">9–15 min</option>
        </select>

        {/* Sort */}
        <label className="text-sm text-gray-600">Tri</label>
        <select
          className="ml-2 border rounded px-2 py-1 text-sm"
          value={sort || "published_at_desc"}
          onChange={(e) => updateParam("tri", e.target.value)}
        >
          <option value="published_at_desc">Plus récents</option>
          <option value="published_at_asc">Plus anciens</option>
          <option value="reading_time_asc">Lecture courte</option>
          <option value="reading_time_desc">Lecture longue</option>
        </select>
      </div>
    </div>
  );
}

