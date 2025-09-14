import React from "react";
import type { KPI } from "@/lib/prismic/caseStudiesCore";
import { pickCardKPIs } from "@/lib/prismic/caseStudiesCore";

export default function StatsCardsRow({ kpis, max = 3 }: { kpis: KPI[]; max?: number }) {
  const items = pickCardKPIs(Array.isArray(kpis) ? kpis : [], max);
  if (!items.length) return null;
  return (
    <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
      {items.map((k, i) => (
        <div key={i} className="min-w-[180px] rounded-xl border border-separator bg-white px-4 py-3">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">{k.label}</div>
          <div className="text-2xl font-semibold text-gray-900 leading-tight">{k.value}</div>
        </div>
      ))}
    </div>
  );
}

