import type { Metadata } from "next";
import Navbar from "../../components/shared/Navbar";
import ProCTAFooter from "../home-page/components/ProCTAFooter";
import { getFeaturedArticles, getArticles } from "@/lib/prismic-queries";
import { toCanonical } from "@/lib/seo";
import { collectionPageLD, breadcrumbLD } from "@/lib/seo-jsonld";
import Hero from "@/components/resources/Hero";
import StickyFilters from "@/components/resources/StickyFilters";
import SectionGrid from "@/components/resources/SectionGrid";

export const revalidate = 300;

interface SearchParams {
  q?: string;
  asset?: string | string[];
  theme?: string | string[];
  level?: string;
  duration?: string;
  sort?: string;
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
  const description = "Guides, études et analyses pour investir dans l'immobilier. Horizon 4-7 ans, tickets dès 20k€. Qualité institutionnelle accessible.";
  
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

  return {
    title,
    description,
    alternates: { canonical },
    robots: shouldNoIndex 
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
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
  const assetClasses = Array.isArray(params.asset) ? params.asset : (params.asset ? [params.asset] : []);
  const themes = Array.isArray(params.theme) ? params.theme : (params.theme ? [params.theme] : []);
  const level = params.level || "";
  const duration = params.duration || "";
  const sort = params.sort || "published_at_desc";
  const page = parseInt(params.page || "1");

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

      {/* Sticky Filters */}
      <StickyFilters
        assetClasses={assetClasses}
        themes={themes}
        level={level}
        duration={duration}
        sort={sort}
      />

      {/* Articles Grid */}
      <SectionGrid
        articles={articlesData.results}
        pagination={articlesData}
      />

      <ProCTAFooter />

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
