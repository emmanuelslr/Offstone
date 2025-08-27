import { notFound } from "next/navigation";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../../../components/shared/Navbar";
import ProCTAFooter from "../../home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { getRelatedArticles } from "@/lib/prismic-queries";
import { toCanonical } from "@/lib/seo";
import { blogPostingLD, breadcrumbLD, estimateReadingTime } from "@/lib/seo-jsonld";
import TableOfContents from "@/components/article/TableOfContents";
import { generateUniqueIds } from "@/lib/text-utils";
import FaqBlock, { buildFaqLD } from "@/components/article/FaqBlock";
import RelatedGrid from "@/components/article/RelatedGrid";
import ReadingProgress from "@/components/article/ReadingProgress";
import CoInvestCTA from "@/components/article/CoInvestCTA";

export const revalidate = 300;

// Extract headings from Prismic RichText
function extractHeadings(body: any[]): { text: string; level: 2 | 3 }[] {
  if (!Array.isArray(body)) return [];
  
  return body
    .filter(block => block.type === "heading2" || block.type === "heading3")
    .map(block => ({
      text: block.text || "",
      level: block.type === "heading2" ? 2 : 3
    }))
    .filter(heading => heading.text.trim().length > 0);
}

// Custom components for PrismicRichText with IDs et CTA après 2ème H2
const richTextComponents = (headings: { id: string; text: string; level: 2 | 3 }[], showCTA: boolean, CTAComponent: React.ComponentType) => {
  let h2Count = 0;
  
  return {
    heading2: ({ children }: { children: React.ReactNode }) => {
      h2Count++;
      const text = typeof children === 'string' ? children : '';
      const heading = headings.find(h => h.text === text && h.level === 2);
      
      return (
        <>
          <h2 id={heading?.id} className="text-2xl font-bold mt-16 mb-6 text-gray-900 leading-tight">{children}</h2>
          {/* CTA discret après le 2ème H2 */}
          {h2Count === 2 && showCTA && (
            <div className="my-12 not-prose">
              <CTAComponent />
            </div>
          )}
        </>
      );
    },
    heading3: ({ children }: { children: React.ReactNode }) => {
      const text = typeof children === 'string' ? children : '';
      const heading = headings.find(h => h.text === text && h.level === 3);
      return <h3 id={heading?.id} className="text-xl font-semibold mt-12 mb-4 text-gray-800 leading-tight">{children}</h3>;
    },
  };
};

export async function generateMetadata({ params }: { params: Promise<{ uid: string }> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("article" as any, uid).catch(() => null);
  if (!doc) return {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  
  // Check for SEO fields first, fallback to content fields
  const title = data.seo?.[0]?.meta_title || data.title || "Ressources";
  const description = data.seo?.[0]?.meta_description || data.excerpt || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/${uid}`);
  const ogImage = data.seo?.[0]?.og_image?.url || data.hero_image?.url || toCanonical("/logos/x-bleu.svg");

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      type: "article",
      publishedTime: data.published_at,
      authors: ["Équipe Offstone"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("article" as any, uid).catch(() => null);
  if (!doc) return notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  // Extract headings and generate unique IDs
  const rawHeadings = extractHeadings(data.body || []);
  const headings = generateUniqueIds(rawHeadings);

  // Calculate reading time
  const bodyText = Array.isArray(data.body) 
    ? data.body.map((block: any) => block.text || "").join(" ")
    : "";
  const estimatedTime = estimateReadingTime(bodyText);
  const readingTime = data.reading_time || estimatedTime;

  // Get related articles
  const relatedArticles = await getRelatedArticles({
    uid,
    assetClass: data.asset_class || [],
    theme: data.theme || [],
    limit: 3
  });

  // Prepare FAQ data
  const faqItems = Array.isArray(data.faq_items) ? data.faq_items.slice(0, 3) : [];

  // JSON-LD data
  const blogLD = blogPostingLD({
    url: toCanonical(`/ressources/${uid}`),
    headline: data.title || "Article",
    description: data.excerpt || "",
    datePublished: data.published_at,
    dateModified: data.published_at,
    author: "Équipe Offstone",
    image: data.hero_image?.url || toCanonical("/logos/x-bleu.svg")
  });

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: data.title || "Article", url: toCanonical(`/ressources/${uid}`) }
  ]);

  const faqLD = faqItems.length > 0 ? buildFaqLD(faqItems) : null;

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      <Navbar forceWhiteStyle />
      
      <main className="mx-auto max-w-3xl px-4 py-20 relative">
        <article>
          {/* Breadcrumb */}
          <nav className="text-sm mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <Link href="/ressources" className="hover:text-blue-600 transition-colors">Ressources</Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900">{data.title || "Article"}</span>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-16">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight tracking-tight">
              {data.title || "Article"}
            </h1>

            {/* Meta Line - Style Substack */}
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
                  <span>
                    {new Date(data.published_at).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long", 
                      day: "numeric"
                    })}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Équipe Offstone</span>
              </div>
            </div>

            {/* Hero Image - 16:9 sans CLS */}
            {data.hero_image?.url && (
              <div className="image-wrapper mb-12 bg-gray-100">
                <Image
                  src={data.hero_image.url}
                  alt={data.hero_image.alt || data.title || ""}
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {/* Excerpt - Style Substack */}
            {data.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-12 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="font-medium">{data.excerpt}</p>
              </div>
            )}
          </header>

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* Article Body - Style Substack avec espacements RRW */}
          <div className="prose prose-neutral prose-reading max-w-none mb-16">
            <PrismicRichText 
              field={data.body} 
              components={richTextComponents(headings, true, CoInvestCTA)}
            />
          </div>

          {/* FAQ Section */}
          {faqItems.length > 0 && (
            <div className="my-20">
              <FaqBlock items={faqItems} maxItems={3} />
            </div>
          )}

          {/* Disclaimers */}
          <div className="mt-20 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
              <p>
                <strong>Avertissement :</strong> Les informations contenues dans cet article sont données à titre informatif et ne constituent pas des conseils en investissement. Tout investissement comporte des risques.
              </p>
              <p>
                <strong>Performance :</strong> Les performances passées ne préjugent pas des performances futures. Le capital investi peut fluctuer à la hausse comme à la baisse.
              </p>
            </div>
          </div>
        </article>

        {/* Related Articles - Spacing généreux */}
        <div className="mt-24">
          <RelatedGrid articles={relatedArticles} />
        </div>

        {/* JSON-LD Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        {faqLD && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
          />
        )}
      </main>

      {/* Table of Contents - Desktop Sidebar */}
      <div className="hidden xl:block">
        {/* This is handled inside TableOfContents component */}
      </div>

      <ProCTAFooter />
    </>
  );
}