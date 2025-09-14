import React from "react";
import type { KPI } from "@/lib/prismic/caseStudiesCore";

export default function CaseStudyKPIs({ items }: { items: KPI[] }) {
  const list = Array.isArray(items) ? items.slice(0, 6) : [];
  return (
    <section aria-label="Indicateurs clés" className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {list.map((k, i) => (
        <div key={i} className="rounded-xl border border-separator bg-white p-4">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">{k.label}</div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1 leading-tight">{k.value}</div>
        </div>
      ))}
    </section>
  );
}

