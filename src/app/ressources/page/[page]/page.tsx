import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { getFeaturedArticles, getArticles } from "@/lib/prismic-queries";
import { toCanonical } from "@/lib/seo";
import { collectionPageLD, breadcrumbLD } from "@/lib/seo-jsonld";
import Hero from "@/components/resources/Hero";
import StickyFilters from "@/components/resources/StickyFilters";
import SectionGrid from "@/components/resources/SectionGrid";

export const revalidate = 300;

type Params = { page: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page } = await params;
  if (page === "1") return {};
  const title = `Ressources | Page ${page} | Offstone`;
  const description = "Guides, études et analyses pour investir dans l'immobilier.";
  const canonical = toCanonical(`/ressources/page/${page}`);
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, type: "website", images: [{ url: toCanonical("/logos/x-bleu.svg") }] },
    twitter: { card: "summary_large_image", title, description, images: [toCanonical("/logos/x-bleu.svg")] },
  };
}

export default async function RessourcesPagePagination({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  if (page === "1") redirect("/ressources");
  const pageNum = parseInt(page || "1");

  const [featuredArticles, articlesData] = await Promise.all([
    getFeaturedArticles(3),
    getArticles({ page: pageNum, pageSize: 12 }),
  ]);

  const collectionLD = collectionPageLD({
    url: toCanonical(`/ressources/page/${pageNum}`),
    name: `Ressources Offstone — Page ${pageNum}`,
    description: "Guides, études et analyses pour investir dans l'immobilier",
  });
  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: `Page ${pageNum}`, url: toCanonical(`/ressources/page/${pageNum}`) },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <Hero featuredArticles={featuredArticles} />
      <StickyFilters assetClasses={[]} level="" duration="" sort="published_at_desc" />
      <SectionGrid articles={articlesData.results} pagination={articlesData} />
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

