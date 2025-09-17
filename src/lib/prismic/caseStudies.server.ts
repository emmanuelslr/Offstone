import { createClient } from "@/lib/prismicio";
import type { CaseStudyDoc, KPI, TimelineItem } from "./caseStudiesCore";
import type { RichTextField } from "@prismicio/client";

const ASSET_OVERRIDES: Record<string, string> = {
  "vitry": "résidentiel",
  "villa-seurat": "résidentiel",
  "jean-jacques-rousseau": "logistique",
  "maison-boetie": "bureaux",
  "chilly-mazarin": "logistique",
};

function toYear(dateStr?: string | null): number | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  const y = d.getUTCFullYear();
  return Number.isFinite(y) ? y : undefined;
}

function deriveAssetClass(kpis: KPI[]): string | undefined {
  const c = kpis.find((k) => /typologie|asset\s*class|type/i.test(k.label || ""));
  return c?.value?.trim() || undefined;
}

function normalizeAssetClass(v?: string): string | undefined {
  if (!v) return undefined;
  const s = v.toLowerCase();
  if (/(bureau|bureaux)\b/.test(s)) return "bureaux";
  if (/(logistique|entrep[ôo]t|stockage)\b/.test(s)) return "logistique";
  if (/(r[ée]sidentiel|habitation|logement|appartement)s?/.test(s)) return "résidentiel";
  if (/(h[ôo]tel|h[ôo]tellerie)/.test(s)) return "hôtellerie";
  return undefined;
}

function inferAssetClassFromPrismic(data: any, uid: string, kpis: KPI[]): string | undefined {
  const fromKpi = normalizeAssetClass(deriveAssetClass(kpis));
  const hay = [data?.title, data?.excerpt, data?.city, uid]
    .filter(Boolean)
    .map((x: string) => String(x))
    .join(" ")
    .toLowerCase();
  const fromText = normalizeAssetClass(hay);
  // Prefer title/uid-derived inference over KPI if KPI is generic/incorrect
  const inferred = fromText || fromKpi;
  return ASSET_OVERRIDES[uid] || inferred;
}

function mapDoc(doc: any): CaseStudyDoc {
  const data = doc?.data || {};
  const kpis: KPI[] = Array.isArray(data.kpi_group)
    ? data.kpi_group
        .map((k: any) => ({ label: String(k?.label || "").trim(), value: String(k?.value || "").trim() }))
        .filter((k: KPI) => k.label && k.value)
    : [];
  const timeline: TimelineItem[] = Array.isArray(data.timeline)
    ? data.timeline.map((t: any) => ({ date: t?.date || undefined, event: t?.event || undefined }))
    : [];

  const hero = data.hero_image || {};
  const year = toYear(data.published_at as string | undefined);
  const seo = (Array.isArray(data.seo) ? data.seo[0] : undefined) || {};

  return {
    id: doc.id,
    uid: doc.uid,
    url: `/nos-realisations/${doc.uid}`,
    title: data.title || "Étude de cas",
    excerpt: data.excerpt || undefined,
    city: data.city || undefined,
    year,
    heroImage: hero?.url ? { url: hero.url, alt: hero.alt || data.title || "", width: hero.dimensions?.width, height: hero.dimensions?.height } : undefined,
    kpis,
    timeline,
    body: data.body as RichTextField,
    seo: {
      meta_title: seo.meta_title,
      meta_description: seo.meta_description,
      og_image: seo.og_image,
      canonical_url: seo.canonical_url,
      noindex: seo.noindex === true,
    },
    assetClass: inferAssetClassFromPrismic(data, doc.uid, kpis),
        headlineData: data.headlineData,
        portfolioImages: data.portfolioImages,
  };
}

// Try to find and use local images from "public/images/réalisations images" (name-insensitive)
function applyLocalImageOverrides(studies: CaseStudyDoc[]): CaseStudyDoc[] {
  try {
    // Lazy-require to keep client bundles clean
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require("node:fs") as typeof import("node:fs");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("node:path") as typeof import("node:path");

    const imagesRoot = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(imagesRoot)) return studies;

    // Find the folder that ends with "alisations images" to be resilient to accents
    const dirEntry = fs
      .readdirSync(imagesRoot, { withFileTypes: true })
      .find((d: any) => d.isDirectory() && /alisations images$/i.test(String(d.name)));
    if (!dirEntry) return studies;

    const realDirName: string = String(dirEntry.name);
    const fullDir = path.join(imagesRoot, realDirName);

    // Build index of available files keyed by a slug (accent/space-insensitive)
    const files = fs
      .readdirSync(fullDir, { withFileTypes: true })
      .filter((f: any) => f.isFile())
      .map((f: any) => String(f.name));

    const toSlug = (s?: string) => {
      if (!s) return "";
      return String(s)
        .normalize("NFD")
        .replace(/\p{Diacritic}+/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    const fileIndex = files.map((name) => {
      const base = name.replace(/\.(webp|jpg|jpeg|png|avif)$/i, "");
      return {
        name,
        slug: toSlug(base),
        tokens: toSlug(base).split("-").filter(Boolean),
      };
    });

    function bestMatch(candidate: string): string | null {
      const candSlug = toSlug(candidate);
      const candTokens = candSlug.split("-").filter(Boolean);
      let best: { name: string; score: number } | null = null;
      for (const f of fileIndex) {
        let score = 0;
        if (!candSlug || !f.slug) continue;
        if (f.slug === candSlug) score = 100; // exact slug
        else if (f.slug.includes(candSlug) || candSlug.includes(f.slug)) score = 60; // contains
        else {
          // token intersection
          const commons = new Set(candTokens.filter((t) => f.tokens.includes(t)));
          if (commons.size > 0) score = 10 * commons.size;
        }
        if (!best || score > best.score) best = { name: f.name, score };
      }
      return best && best.score > 0 ? best.name : null;
    }

    return (studies || []).map((s) => {
      const cand = s.uid || s.title || "";
      const match = bestMatch(cand);
      if (!match) return s;
      const localUrl = `/images/${realDirName}/${match}`;
      const alt = s.heroImage?.alt || s.title || "";
      return {
        ...s,
        heroImage: { url: localUrl, alt },
      } as CaseStudyDoc;
    });
  } catch {
    return studies;
  }
}

function applyLocalImageOverride(study: CaseStudyDoc | null): CaseStudyDoc | null {
  if (!study) return null;
  const [overridden] = applyLocalImageOverrides([study]);
  return overridden || study;
}
export async function getCaseStudies(): Promise<CaseStudyDoc[]> {
  try {
    const client = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = await client
      .getAllByType("case_study" as any, {
        orderings: [{ field: "my.case_study.published_at", direction: "desc" }],
      })
      .catch(() => [] as any[]);
    const mapped = items.map(mapDoc);
    if (mapped.length > 0) return applyLocalImageOverrides(mapped);
    return applyLocalImageOverrides(readLocalNDJSON());
  } catch {
    return applyLocalImageOverrides(readLocalNDJSON());
  }
}

export async function getCaseStudyByUID(uid: string): Promise<CaseStudyDoc | null> {
  try {
    const client = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await client.getByUID("case_study" as any, uid).catch(() => null);
    if (doc) return applyLocalImageOverride(mapDoc(doc));
    const local = applyLocalImageOverrides(readLocalNDJSON());
    return local.find((d) => d.uid === uid) || null;
  } catch {
    const local = applyLocalImageOverrides(readLocalNDJSON());
    return local.find((d) => d.uid === uid) || null;
  }
}

function readLocalNDJSON(): CaseStudyDoc[] {
  try {
    // Use dynamic import to avoid bundling node:fs in client
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require("node:fs") as typeof import("node:fs");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("node:path") as typeof import("node:path");
    const p = path.join(process.cwd(), "public", "data", "case_studies.ndjson");
    if (!fs.existsSync(p)) return [];
    const lines = fs.readFileSync(p, "utf8").split(/\r?\n/).filter(Boolean);
    const items = lines.map((ln) => JSON.parse(ln));
    return items.map((raw: any) => {
      const kpis: KPI[] = Array.isArray(raw.kpi_group) ? raw.kpi_group : [];
      const timeline: TimelineItem[] = Array.isArray(raw.timeline) ? raw.timeline : [];
      const hero = raw.hero_image || {};
      const fromKpi = normalizeAssetClass(deriveAssetClass(kpis));
      const fromSrc = normalizeAssetClass(String(raw.source_url || ""));
      const fromTitle = normalizeAssetClass(String(raw.title || ""));
      const uid = String(raw.uid || "");
      let asset = fromSrc || fromTitle || fromKpi;
      if (ASSET_OVERRIDES[uid]) asset = ASSET_OVERRIDES[uid];
      return {
        id: raw.uid,
        uid: raw.uid,
        url: `/nos-realisations/${raw.uid}`,
        title: raw.title || "Étude de cas",
        excerpt: raw.excerpt,
        city: raw.city,
        year: raw.published_at ? new Date(raw.published_at).getUTCFullYear() : undefined,
        heroImage: hero?.url ? { url: hero.url, alt: hero.alt || raw.title || "" } : undefined,
        kpis,
        timeline,
        body: raw.body as RichTextField,
        seo: Array.isArray(raw.seo) ? raw.seo[0] : raw.seo,
        assetClass: asset,
        headlineData: raw.headlineData,
        portfolioImages: raw.portfolioImages,
      } as CaseStudyDoc;
    });
  } catch {
    return [];
  }
}
