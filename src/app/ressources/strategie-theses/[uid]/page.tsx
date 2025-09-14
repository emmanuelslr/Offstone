import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { getRelatedArticles } from "@/lib/prismic-queries";
import { toCanonical } from "@/lib/seo";
import { blogPostingLD, breadcrumbLD, estimateReadingTime, faqPageLD } from "@/lib/seo-jsonld";
import RichTextWithAnchors from "@/components/article/RichTextWithAnchors";
import StickyTOC from "@/components/article/StickyTOC";
import MobileTOC from "@/components/article/MobileTOC";
import { extractHeadings } from "@/lib/toc";
import ArticleSliceZone from "@/components/article/SliceZoneRenderer";
import FaqBlock from "@/components/article/FaqBlock";
import RelatedGrid from "@/components/article/RelatedGrid";
import ReadingProgress from "@/components/article/ReadingProgress";
import CoInvestCTA from "@/components/article/CoInvestCTA";
import ContentSections from "@/components/article/ContentSections";

export const revalidate = 300;

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("resource_article" as any, uid).catch(() => null);
  if (!doc) return {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const catUid = (data?.category as string | undefined);

  const title = data.seo?.[0]?.meta_title || data.title || "Ressources";
  const description = data.seo?.[0]?.meta_description || data.excerpt || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/strategie-theses/${uid}`);
  const ogImage = data.seo?.[0]?.og_image?.url || data.hero_image?.url || toCanonical("/logos/x-bleu.svg");
  const noindex = data.seo?.[0]?.noindex === true;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      type: "article",
      publishedTime: data.published_at,
      authors: ["Équipe Offstone"],
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticleInCategoryPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("resource_article" as any, uid).catch(() => null);
  if (!doc) return notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const catUid = (data?.category as string | undefined);

  // Enforce canonical nested URL if category exists
  if (catUid && catUid !== "strategie-theses") {
    redirect(`/ressources/${catUid}/${uid}`);
  }

  // Prepare content sections data
  const contentSections = Array.isArray(data.content_sections) ? data.content_sections : [];

  // Extract headings (body + sections)
  const body = data.body || [];
  const bodyHeadings = extractHeadings(body);
  const sectionHeadings = contentSections
    .map((section: any, index: number) => ({ id: `section-${index + 1}`, text: section.section_title || `Section ${index + 1}`, level: 2 as const }))
    .filter((h: any) => h.text);
  const headings = [...bodyHeadings, ...sectionHeadings];
  const slices = Array.isArray((data as any).slices) ? (data as any).slices : [];
  const hasTOCSlice = slices.some((s: any) => s.slice_type === 'table_of_contents');
  const showTOC = (slices.length === 0 ? headings.length >= 2 : (hasTOCSlice && headings.length >= 2));
  const hasRelatedSlice = slices.some((s: any) => s.slice_type === 'related_content');

  // Calculate reading time
  const bodyText = Array.isArray(data.body) ? data.body.map((block: any) => block.text || "").join(" ") : "";
  const estimatedTime = estimateReadingTime(bodyText);
  const readingTime = data.reading_time || estimatedTime;

  // Related articles
  const relatedArticles = await getRelatedArticles({ uid, assetClass: data.asset_class || [], theme: data.theme || [], limit: 3 });

  // Prepare FAQ data
  const faqItems = Array.isArray(data.faq_items) ? data.faq_items.slice(0, 3) : [];
  const faqLD = faqItems.length
    ? faqPageLD(
        faqItems.map((it: any) => ({
          question: it.question || "",
          answerHTML: (it.answer || []).map((b: any) => b.text || "").join("\n"),
        }))
      )
    : null;

  // Get author name from authors array
  const authorName = Array.isArray(data.authors) && data.authors.length > 0 
    ? data.authors[0].name || "Équipe Offstone"
    : "Équipe Offstone";

  const canonicalPath = `/ressources/strategie-theses/${uid}`;
  const blogLD = blogPostingLD({
    url: toCanonical(canonicalPath),
    headline: data.title || "Article",
    description: data.excerpt || "",
    datePublished: data.published_at,
    dateModified: data.published_at,
    author: authorName,
    image: data.hero_image?.url || toCanonical("/logos/x-bleu.svg"),
  });

  const breadcrumbItems = [
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Stratégies & thèses", url: toCanonical("/ressources/strategie-theses") },
    { name: data.title || "Article", url: toCanonical(canonicalPath) },
  ];
  const breadcrumbData = breadcrumbLD(breadcrumbItems);

  return (
    <>
      <ReadingProgress />
      <Navbar forceWhiteStyle />

      <main className={`mx-auto px-4 py-20 relative ${showTOC ? "max-w-6xl" : "max-w-3xl"}`}>
        <div className={`${showTOC ? "lg:grid lg:gap-12 lg:grid-cols-[260px_minmax(0,1fr)]" : ""}`}>
          {showTOC && (
            <div className="pt-4">
              <StickyTOC items={headings} top={96} />
            </div>
          )}

          <article className="max-w-3xl">
            <nav className="text-sm mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-gray-500">
                <li>
                  <Link href="/ressources" className="hover:text-blue-600 transition-colors">Ressources</Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a 1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/ressources/strategie-theses" className="hover:text-blue-600 transition-colors">Stratégies & thèses</Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a 1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900">{data.title || "Article"}</span>
                </li>
              </ol>
            </nav>

            <header className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight tracking-tight">{data.title || "Article"}</h1>
              <div className="flex flex-wrap items-center gap-6 text-base text-gray-600 mb-12 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{readingTime} min de lecture</span>
                </div>
                {data.published_at && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(data.published_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{authorName}</span>
                </div>
              </div>

              {data.hero_image?.url && (
                <div className="image-wrapper mb-12 bg-gray-100">
                  <Image src={data.hero_image.url} alt={data.hero_image.alt || data.title || ""} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
                </div>
              )}

              {data.excerpt && (
                <div className="text-xl text-gray-700 leading-relaxed mb-12 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                  <p className="font-medium">{data.excerpt}</p>
                </div>
              )}
            </header>

            <MobileTOC items={headings} />
            <div className="prose prose-neutral prose-reading max-w-none mb-16">
              <RichTextWithAnchors field={body} />
            </div>

            {/* Optional Slices */}
            {slices.length > 0 && (
              <div className="my-10">
                <ArticleSliceZone slices={slices} />
              </div>
            )}

            <div className="my-16"><CoInvestCTA /></div>

            {contentSections.length > 0 && (
              <div className="my-20">
                <ContentSections sections={contentSections} />
              </div>
            )}

            {faqItems.length > 0 && (
              <div className="my-20">
                <FaqBlock items={faqItems} />
              </div>
            )}

            {!hasRelatedSlice && relatedArticles.length > 0 && (
              <div className="my-20">
                <h2 className="text-2xl font-semibold mb-6">À lire ensuite</h2>
                <RelatedGrid articles={relatedArticles} />
              </div>
            )}
          </article>
        </div>
      </main>

      <ProCTAFooter utm_campaign="ressources" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {faqLD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />}
    </>
  );
}
