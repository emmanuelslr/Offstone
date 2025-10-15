import type { Metadata } from "next";
import Navbar from "../../components/shared/Navbar";
import ProCTAFooter from "../home-page/components/ProCTAFooter";
import { getFeaturedArticles, getArticles } from "@/lib/prismic-queries";
import { toCanonical } from "@/lib/seo";
import { collectionPageLD, breadcrumbLD } from "@/lib/seo-jsonld";
import Hero from "@/components/resources/Hero";
import StickyFilters from "@/components/resources/StickyFilters";
import SectionGrid from "@/components/resources/SectionGrid";
import TaxonomyNav from "@/components/resources/TaxonomyNav";

export const revalidate = 300;

interface SearchParams {
  q?: string;
  asset?: string | string[];
  theme?: string | string[];
  level?: string;
  duration?: string;
  sort?: string;
  classe?: string | string[];
  thematique?: string | string[];
  niveau?: string;
  duree?: string;
  tri?: string;
  page?: string;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const hasSearch = !!params.q;
  const filterCount = [
    params.asset ? (Array.isArray(params.asset) ? params.asset.length : 1) : 0,
    params.theme ? (Array.isArray(params.theme) ? params.theme.length : 1) : 0,
    params.level ? 1 : 0,
    params.duration ? 1 : 0,
    params.sort && params.sort !== "published_at_desc" ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const title = page > 1 ? `Ressources | Page ${page} | Offstone` : "Ressources | Offstone";
  const description = "Guides, études et analyses pour investir dans l'immobilier. Horizon 4-7 ans. Qualité institutionnelle accessible.";
  
  // Construire l'URL canonique avec les paramètres
  const url = new URL("/ressources", "https://offstone.fr");
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, v));
      } else {
        url.searchParams.set(key, value);
      }
    }
  });

  const canonical = url.toString();

  // Robots: noindex si recherche active ou 2+ filtres actifs
  const shouldNoIndex = hasSearch || filterCount >= 2;

  // SEO-safe canonical mapping for faceted navigation
  const hasAnyParam = Boolean(
    params.q || params.asset || params.theme || params.level || params.duration || params.sort ||
    params.classe || params.thematique || params.niveau || params.duree || params.tri || params.page
  );
  const normalize = (v: string) => v.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  let canonicalPath = "/ressources";
  const themesParam = Array.isArray(params.thematique)
    ? params.thematique
    : params.thematique
    ? [params.thematique]
    : Array.isArray(params.theme)
    ? params.theme
    : params.theme
    ? [params.theme]
    : [];
  if (themesParam.length > 0) {
    const t = normalize(String(themesParam[0]));
    if (t.includes("methode")) canonicalPath = "/ressources/guides";
    else if (t.includes("fiscalite")) canonicalPath = "/ressources/fiscalite-immobiliere";
    else if (t.includes("etudes_de_cas") || t.includes("etude") || t.includes("cas")) canonicalPath = "/ressources/etudes-de-cas";
    else if (t.includes("marche")) canonicalPath = "/ressources/asset-management-marche";
  } else {
    const assetsParam = Array.isArray(params.classe)
      ? params.classe
      : params.classe
      ? [params.classe]
      : Array.isArray(params.asset)
      ? params.asset
      : params.asset
      ? [params.asset]
      : [];
    if (assetsParam.length > 0) {
      const a = normalize(String(assetsParam[0]));
      if (a.includes("residentiel")) canonicalPath = "/ressources/strategie-theses/residentiel";
      else if (a.includes("bureaux")) canonicalPath = "/ressources/strategie-theses/bureaux";
      else if (a.includes("hotellerie") || a.includes("hotel")) canonicalPath = "/ressources/strategie-theses/hotellerie";
      else if (a.includes("logistique")) canonicalPath = "/ressources/strategie-theses/logistique";
    }
  }
  const computedCanonical = new URL(canonicalPath, "https://offstone.fr").toString();
  const robotsPolicy = hasAnyParam ? { index: false, follow: true } : { index: true, follow: true };

  return {
    title,
    description,
    alternates: { canonical: computedCanonical },
    robots: robotsPolicy,
    openGraph: {
      title,
      description,
      url: computedCanonical,
      type: "website",
      images: [{ url: toCanonical("/logos/x-bleu.svg") }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [toCanonical("/logos/x-bleu.svg")]
    }
  };
}

export default async function RessourcesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  
  // Parse des paramètres
  const q = params.q || "";
  const assetClasses = Array.isArray(params.classe)
    ? (params.classe as string[])
    : params.classe
    ? [params.classe as string]
    : Array.isArray(params.asset)
    ? (params.asset as string[])
    : params.asset
    ? [params.asset as string]
    : [];
  const level = params.niveau || params.level || "";
  const duration = params.duree || params.duration || "";
  const sort = params.tri || params.sort || "published_at_desc";
  const page = parseInt(params.page || "1");
  const themes = Array.isArray(params.thematique)
    ? (params.thematique as string[])
    : params.thematique
    ? [params.thematique as string]
    : Array.isArray(params.theme)
    ? (params.theme as string[])
    : params.theme
    ? [params.theme as string]
    : [];

  // Fetch des données
  const [featuredArticles, articlesData] = await Promise.all([
    getFeaturedArticles(3),
    getArticles({
      page,
      pageSize: 12,
      q,
      assetClasses,
      themes,
      level,
      duration,
      sort
    })
  ]);

  // JSON-LD
  const collectionLD = collectionPageLD({
    url: toCanonical("/ressources"),
    name: "Ressources Offstone",
    description: "Guides, études et analyses pour investir dans l'immobilier"
  });

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") }
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      
      {/* Hero Section */}
      <Hero featuredArticles={featuredArticles} />

      {/* Heading for the article grid */}
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex items-end gap-3">
          <h2 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl font-normal tracking-tighter leading-[1.1] text-black">
            Tous nos articles
          </h2>
          <span className="text-sm text-gray-500 mb-1">{new Intl.NumberFormat('fr-FR').format(articlesData.totalResults)} au total</span>
        </div>
      </section>

      {/* Taxonomy Navigation */}
      <TaxonomyNav />

      {/* Sticky Filters */}
      <StickyFilters assetClasses={assetClasses} level={level} duration={duration} sort={sort} />

      {/* Articles Grid */}
      <SectionGrid
        articles={articlesData.results}
        pagination={articlesData}
      />

      <ProCTAFooter utm_campaign="ressources" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
