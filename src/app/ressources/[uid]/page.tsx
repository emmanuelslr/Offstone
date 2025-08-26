import { notFound } from "next/navigation";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import type { Metadata } from "next";
import Navbar from "../../../components/shared/Navbar";
import ProCTAFooter from "../../home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
// Types will be inferred from Prismic client

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ uid: string }> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const doc = await client.getByUID("article", uid).catch(() => null);
  if (!doc) return {};

  const title = doc.data.title || "Ressources";
  const description = doc.data.excerpt || "";
  const canonical = toCanonical(`/ressources/${uid}`);
  const ogImage = "/logos/x-bleu.svg";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { 
      title, 
      description, 
      images: [{ url: ogImage }],
      type: "article"
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
  const doc = await client.getByUID("article", uid).catch(() => null);
  if (!doc) return notFound();

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <article>
          {/* Breadcrumb */}
          <nav className="text-sm mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <Link href="/ressources" className="hover:text-blue-600">Ressources</Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900">{(doc.data.title as string) || "Article"}</span>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
                                    <h1 className="text-4xl font-bold mb-4 text-gray-900">{doc.data.title || "Article"}</h1>

                        {doc.data.excerpt ? (
                          <p className="text-xl text-gray-600 mb-6 leading-relaxed">{doc.data.excerpt}</p>
                        ) : null}

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                          {doc.data.published_at ? (
                            <time dateTime={doc.data.published_at}>
                              {new Date(doc.data.published_at).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })}
                            </time>
                          ) : null}
                        </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-gray max-w-none">
            <PrismicRichText field={doc.data.body} />
          </div>
        </article>

        {/* JSON-LD BlogPosting + BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
                                    __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "BlogPosting",
                          headline: doc.data.title || "Article",
                          description: doc.data.excerpt || "",
                          datePublished: doc.data.published_at,
                          dateModified: doc.data.published_at,
                          mainEntityOfPage: toCanonical(`/ressources/${uid}`),
                          author: {
                            "@type": "Organization",
                            name: "Offstone"
                          },
                          publisher: {
                            "@type": "Organization",
                            name: "Offstone",
                            logo: {
                              "@type": "ImageObject",
                              url: toCanonical("/logos/x-bleu.svg")
                            }
                          },
                          image: toCanonical("/logos/x-bleu.svg")
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
                  "name": "Ressources", 
                  "item": toCanonical("/ressources") 
                },
                { 
                  "@type": "ListItem", 
                  "position": 2, 
                  "name": doc.data.title || "Article", 
                  "item": toCanonical(`/ressources/${uid}`) 
                }
              ]
            }),
          }}
        />
      </main>
      
      <ProCTAFooter />
    </>
  );
}
