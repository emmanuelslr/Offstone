import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { blogPostingLD, breadcrumbLD } from "@/lib/seo-jsonld";
import { PrismicRichText } from "@prismicio/react";

export const revalidate = 300;

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("case_study" as any, uid).catch(() => null);
  if (!doc) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const title = data.seo?.[0]?.meta_title || data.title || "Étude de cas";
  const description = data.seo?.[0]?.meta_description || data.excerpt || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/etudes-de-cas/${uid}`);
  const ogImage = data.seo?.[0]?.og_image?.url || data.hero_image?.url || toCanonical("/logos/x-bleu.svg");
  const noindex = data.seo?.[0]?.noindex === true;
  return { title, description, alternates: { canonical }, robots: noindex ? { index: false, follow: true } : { index: true, follow: true }, openGraph: { title, description, images: [{ url: ogImage }], url: canonical } };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("case_study" as any, uid).catch(() => null);
  if (!doc) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  const blogLD = blogPostingLD({ url: toCanonical(`/ressources/etudes-de-cas/${uid}`), headline: data.title || "Étude de cas", datePublished: data.published_at, author: "Équipe Offstone", image: data.hero_image?.url || toCanonical("/logos/x-bleu.svg"), description: data.excerpt || "" });
  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Études de cas", url: toCanonical("/ressources/etudes-de-cas") },
    { name: data.title || uid, url: toCanonical(`/ressources/etudes-de-cas/${uid}`) },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{data.title || "Étude de cas"}</h1>
        {data.excerpt && <p className="text-xl text-gray-700 mb-8">{data.excerpt}</p>}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {(Array.isArray(data.kpi_group) ? data.kpi_group : []).slice(0, 6).map((k: any, i: number) => (
            <div key={i} className="p-4 rounded-lg bg-gray-50">
              <div className="text-sm text-gray-500">{k.label}</div>
              <div className="text-lg font-semibold">{k.value}</div>
            </div>
          ))}
        </div>
        <article className="prose prose-neutral max-w-none">
          <PrismicRichText field={data.body} />
        </article>
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

