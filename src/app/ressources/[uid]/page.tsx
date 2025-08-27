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

// Custom components for PrismicRichText with IDs
const richTextComponents = (headings: { id: string; text: string; level: 2 | 3 }[]) => ({
  heading2: ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === 'string' ? children : '';
    const heading = headings.find(h => h.text === text && h.level === 2);
    return <h2 id={heading?.id} className="text-2xl font-bold mt-12 mb-6 text-gray-900">{children}</h2>;
  },
  heading3: ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === 'string' ? children : '';
    const heading = headings.find(h => h.text === text && h.level === 3);
    return <h3 id={heading?.id} className="text-xl font-semibold mt-8 mb-4 text-gray-800">{children}</h3>;
  },
});

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

  const breadcrumbLD = breadcrumbLD([
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
      
      <main className="mx-auto max-w-3xl px-4 py-16 relative">
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
          <header className="mb-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {data.title || "Article"}
            </h1>

            {/* Meta Line */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ⏱ {readingTime} min
              </span>
              
              {data.published_at && (
                <span>
                  MAJ {new Date(data.published_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long", 
                    day: "numeric"
                  })}
                </span>
              )}
              
              <span>Par Équipe Offstone</span>
            </div>

            {/* Hero Image */}
            {data.hero_image?.url && (
              <div className="aspect-video relative overflow-hidden rounded-xl mb-8 bg-gray-100">
                <Image
                  src={data.hero_image.url}
                  alt={data.hero_image.alt || data.title || ""}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {/* Excerpt */}
            {data.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <p className="italic">{data.excerpt}</p>
              </div>
            )}
          </header>

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* Article Body */}
          <div className="prose prose-lg prose-neutral max-w-none leading-relaxed">
            <PrismicRichText 
              field={data.body} 
              components={richTextComponents(headings)}
            />
          </div>

          {/* Co-Invest CTA - After content */}
          <CoInvestCTA />

          {/* FAQ Section */}
          {faqItems.length > 0 && (
            <FaqBlock items={faqItems} maxItems={3} />
          )}

          {/* Disclaimers */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border">
            <div className="text-xs text-gray-600 space-y-2">
              <p>
                <strong>Avertissement :</strong> Les informations contenues dans cet article sont données à titre informatif et ne constituent pas des conseils en investissement. Tout investissement comporte des risques.
              </p>
              <p>
                <strong>Performance :</strong> Les performances passées ne préjugent pas des performances futures. Le capital investi peut fluctuer à la hausse comme à la baisse.
              </p>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <RelatedGrid articles={relatedArticles} />

        {/* JSON-LD Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
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