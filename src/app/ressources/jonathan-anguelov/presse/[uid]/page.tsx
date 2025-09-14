import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD } from "@/lib/seo-jsonld";
import { PrismicRichText } from "@prismicio/react";

export const revalidate = 300;

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("press_item" as any, uid).catch(() => null);
  if (!doc) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const title = data.seo?.[0]?.meta_title || data.title || "Presse";
  const description = data.seo?.[0]?.meta_description || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/jonathan-anguelov/presse/${uid}`);
  const noindex = data.seo?.[0]?.noindex === true;
  return { title, description, alternates: { canonical }, robots: noindex ? { index: false, follow: true } : { index: true, follow: true } };
}

export default async function PressItemPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("press_item" as any, uid).catch(() => null);
  if (!doc) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Presse", url: toCanonical("/ressources/jonathan-anguelov/presse") },
    { name: data.title || uid, url: toCanonical(`/ressources/jonathan-anguelov/presse/${uid}`) },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">{data.title || "Presse"}</h1>
        {data.source && <div className="text-gray-500 mb-4">{data.source}</div>}
        <div className="prose prose-neutral mb-6"><PrismicRichText field={data.summary_richtext} /></div>
        {data.external_url && (
          <a href={data.external_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">Consulter la source</a>
        )}
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

