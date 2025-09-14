import type { RichTextField } from "@prismicio/client";

export type KPI = { label: string; value: string };
export type TimelineItem = { date?: string; event?: string };

export type CaseStudyDoc = {
  id: string;
  uid: string;
  url: string;
  title: string;
  excerpt?: string;
  city?: string;
  year?: number;
  heroImage?: { url: string; alt: string; width?: number; height?: number };
  kpis: KPI[];
  timeline: TimelineItem[];
  body?: RichTextField;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    og_image?: { url?: string };
    canonical_url?: { url?: string };
    noindex?: boolean;
  };
  assetClass?: string;
  headlineData?: string[];
  portfolioImages?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
};

export function pickCardKPIs(kpis: KPI[], max = 3): KPI[] {
  if (!Array.isArray(kpis)) return [];
  const priority = [
    /surface/i,
    /prix.*acquisition|acquisition.*prix/i,
    /cap\s*ex|capex/i,
    /occupation/i,
    /livraison|cession/i,
  ];
  const chosen: KPI[] = [];
  for (const rx of priority) {
    const found = kpis.find((k) => rx.test(k.label));
    if (found && !chosen.includes(found)) chosen.push(found);
    if (chosen.length >= max) break;
  }
  if (chosen.length < max) {
    for (const k of kpis) {
      if (chosen.length >= max) break;
      if (!priority.some((rx) => rx.test(k.label))) chosen.push(k);
    }
  }
  return chosen.slice(0, max);
}

export function uniqueSorted<T>(arr: (T | undefined | null)[]): T[] {
  return Array.from(new Set(arr.filter(Boolean) as T[])).sort((a: any, b: any) => ("" + a).localeCompare("" + b));
}

