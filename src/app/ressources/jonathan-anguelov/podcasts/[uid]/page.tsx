import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { uid: string } }): Promise<Metadata> {
  const canonical = toCanonical(`/ressources/jonathan-anguelov/podcasts/${params.uid}`);
  return { title: "Podcast | Jonathan Anguelov", alternates: { canonical } };
}

type PressItemData = {
  section?: string;
  title?: string;
  source?: string;
  date?: string;
  summary_richtext?: any;
  quote_short?: string;
  external_url?: string;
};

export default async function PodcastDetailPage({ params }: { params: { uid: string } }) {
  const client = createClient();
  const doc = await client.getByUID("press_item" as any, params.uid).catch(() => null);
  const data = (doc?.data || {}) as PressItemData;
  if (!doc || data.section !== "podcast") return <div>Not found</div>;

  const canonical = toCanonical(`/ressources/jonathan-anguelov/podcasts/${params.uid}`);
  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Podcasts", url: toCanonical("/ressources/jonathan-anguelov/podcasts") },
    { name: data.title || doc.uid, url: canonical },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-3xl font-bold mb-4">{data.title || doc.uid}</h1>
        <div className="text-sm text-gray-500 mb-2">{data.source} {data.date ? `• ${new Date(data.date).toLocaleDateString("fr-FR")}` : ""}</div>
        <div className="mb-4">{data.summary_richtext}</div>
        {data.quote_short && <blockquote className="mt-2 text-gray-700 italic">“{data.quote_short}”</blockquote>}
        {data.external_url && <a href={data.external_url} target="_blank" rel="noopener" className="block text-blue-600 underline mt-4">Écouter le podcast original</a>}
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}
