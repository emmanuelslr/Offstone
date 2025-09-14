import React from "react";
import type { KPI } from "@/lib/prismic/caseStudiesCore";
import { pickCardKPIs } from "@/lib/prismic/caseStudiesCore";

export default function PrimaryStatsRow({ kpis }: { kpis: KPI[] }) {
  const list = pickCardKPIs(kpis || [], 4);
  if (!list.length) return null;
  return (
    <div className="mt-4 mb-6 flex flex-wrap gap-2">
      {list.map((k, i) => (
        <div key={i} className="inline-flex items-baseline gap-2 rounded-full border border-separator bg-white px-3 py-1.5">
          <span className="text-gray-500 text-xs">{k.label}</span>
          <span className="text-gray-900 font-semibold text-sm">{k.value}</span>
        </div>
      ))}
    </div>
  );
}

