import React from "react";
import type { KPI } from "@/lib/prismic/caseStudiesCore";

function reorder(items: KPI[]): KPI[] {
  const priority = [
    /surface/i,
    /prix.*acquisition|acquisition.*prix/i,
    /cap\s*ex|capex/i,
    /(ann[ée]e|date).*(acquisition|livraison)|livraison|acquisition/i,
    /occupation|taux/i,
    /typologie|asset\s*class|type/i,
    /ville|quartier|city/i,
  ];
  const rest: KPI[] = [];
  const chosen: KPI[] = [];
  for (const k of items) {
    if (priority.some((rx) => rx.test(k.label))) continue;
    rest.push(k);
  }
  for (const rx of priority) {
    const f = items.find((k) => rx.test(k.label));
    if (f && !chosen.includes(f)) chosen.push(f);
  }
  return [...chosen, ...rest];
}

export default function FactsTable({ items }: { items: KPI[] }) {
  // Filter: drop Typologie here to avoid duplicate with chip in header
  const clean = (Array.isArray(items) ? items : [])
    .filter((k) => k?.label && k?.value)
    .filter((k) => !/typologie|asset\s*class|type/i.test(k.label));
  if (!clean.length) return null;
  const list = reorder(clean);
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <dl className="divide-y divide-gray-100">
        {list.map((k, i) => (
          <div key={i} className="grid grid-cols-5 gap-3 px-4 py-4">
            <dt className="col-span-2 text-xs uppercase tracking-wide text-gray-500 font-medium">{k.label}</dt>
            <dd className="col-span-3 text-lg md:text-xl font-semibold text-gray-900 leading-tight">{k.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
