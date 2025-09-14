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
  const doc = await client.getByUID("interview_item" as any, uid).catch(() => null);
  if (!doc) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const title = data.seo?.[0]?.meta_title || data.title || "Interview";
  const description = data.seo?.[0]?.meta_description || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/jonathan-anguelov/interviews-podcasts/${uid}`);
  const noindex = data.seo?.[0]?.noindex === true;
  return { title, description, alternates: { canonical }, robots: noindex ? { index: false, follow: true } : { index: true, follow: true } };
}

export default async function InterviewItemPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("interview_item" as any, uid).catch(() => null);
  if (!doc) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Interviews & podcasts", url: toCanonical("/ressources/jonathan-anguelov/interviews-podcasts") },
    { name: data.title || uid, url: toCanonical(`/ressources/jonathan-anguelov/interviews-podcasts/${uid}`) },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">{data.title || "Interview"}</h1>
        {data.embed?.html && (
          <div className="aspect-video mb-8" dangerouslySetInnerHTML={{ __html: data.embed.html }} />
        )}
        <div className="prose prose-neutral">
          <PrismicRichText field={data.summary_richtext} />
        </div>
        {Array.isArray(data.key_takeaways) && data.key_takeaways.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">À retenir</h2>
            <ul className="list-disc pl-5 space-y-1">
              {data.key_takeaways.map((it: any, idx: number) => (
                <li key={idx}>{it.item}</li>
              ))}
            </ul>
          </section>
        )}
        {data.external_url && (
          <p className="mt-6"><a href={data.external_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">Lien source</a></p>
        )}
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

