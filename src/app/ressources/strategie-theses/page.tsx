import { Metadata } from "next";
import { createClient } from "@/lib/prismicio";
import { getArticles } from "@/lib/prismic-queries";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/resources/Hero";
import TaxonomyNav from "@/components/resources/TaxonomyNav";
import StickyFilters from "@/components/resources/StickyFilters";
import SectionGrid from "@/components/resources/SectionGrid";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { toCanonical } from "@/lib/seo";
import { Suspense } from "react";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Stratégies & thèses | Offstone",
    description: "Découvrez nos analyses et stratégies d'investissement immobilier. Thèses d'investissement, tendances de marché et perspectives sectorielles.",
    alternates: {
      canonical: toCanonical("/ressources/strategie-theses"),
    },
    openGraph: {
      title: "Stratégies & thèses | Offstone",
      description: "Découvrez nos analyses et stratégies d'investissement immobilier. Thèses d'investissement, tendances de marché et perspectives sectorielles.",
      url: toCanonical("/ressources/strategie-theses"),
      type: "website",
    },
  };
}

export default async function StrategieThesesPage() {
  const client = createClient();
  
  // Get featured articles for this category
  const featuredArticles = await getArticles({
    category: "strategie-theses",
    featured: true,
    limit: 3,
  });

  // Get all articles for this category
  const { results: articles, ...pagination } = await getArticles({
    category: "strategie-theses",
    limit: 12,
  });

  return (
    <>
      <Navbar forceWhiteStyle />
      
      <Hero featuredArticles={featuredArticles} />
      
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex items-end gap-3">
          <h2 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl font-normal tracking-tighter leading-[1.1] text-black">
            Tous nos articles
          </h2>
          <span className="text-sm text-gray-500 mb-1">
            {pagination.totalResults} au total
          </span>
        </div>
      </section>

      <TaxonomyNav />
      
      <Suspense fallback={null}>
        <StickyFilters 
          assetClasses={[]}
          level=""
          duration=""
          sort="published_at_desc"
        />
      </Suspense>
      
      <Suspense fallback={null}>
        <SectionGrid 
          articles={articles}
          pagination={pagination}
        />
      </Suspense>
      
      <ProCTAFooter utm_campaign="ressources" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Stratégies & thèses | Offstone",
            "description": "Découvrez nos analyses et stratégies d'investissement immobilier. Thèses d'investissement, tendances de marché et perspectives sectorielles.",
            "url": toCanonical("/ressources/strategie-theses"),
            "mainEntity": {
              "@type": "ItemList",
              "name": "Stratégies & thèses | Offstone",
              "description": "Découvrez nos analyses et stratégies d'investissement immobilier. Thèses d'investissement, tendances de marché et perspectives sectorielles.",
            },
            "publisher": {
              "@type": "Organization",
              "name": "Offstone",
              "logo": {
                "@type": "ImageObject",
                "url": toCanonical("/logos/x-bleu.svg"),
              },
            },
          }),
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": toCanonical("/"),
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Ressources",
                "item": toCanonical("/ressources"),
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Stratégies & thèses",
                "item": toCanonical("/ressources/strategie-theses"),
              },
            ],
          }),
        }}
      />
    </>
  );
}
