// ========================================
// QVEMA EPISODE PAGE - TEMPORAIREMENT MASQUÉE
// ========================================
// Cette page est masquée temporairement mais peut être restaurée facilement
// Pour la restaurer : décommentez tout le contenu ci-dessous
// ========================================

/*
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const doc = await client.getByUID("qvema_episode" as any, uid).catch(() => null);
  if (!doc) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const title = data.seo?.[0]?.meta_title || data.title || "Épisode";
  const description = data.seo?.[0]?.meta_description || (data.summary_richtext || []).map((b: any) => b.text || "").join(" ");
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/${uid}`);
  const noindex = data.seo?.[0]?.noindex === true;
  return { title, description, alternates: { canonical }, robots: noindex ? { index: false, follow: true } : { index: true, follow: true } };
}

export default async function QvemaEpisodePage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("qvema_episode" as any, uid).catch(() => null);
  if (!doc) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Qui veut être mon associé ?", url: toCanonical("/ressources/jonathan-anguelov/qui-veut-etre-mon-associe") },
    { name: data.title || uid, url: toCanonical(`/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/${uid}`) },
  ]);

  // TVEpisode JSON-LD (basique)
  const tvEpisodeLD = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    name: data.title || "Épisode",
    episodeNumber: data.episode_number,
    partOfSeason: {
      "@type": "TVSeason",
      seasonNumber: data.season_number,
      partOfSeries: {
        "@type": "TVSeries",
        name: "Qui veut être mon associé ?"
      }
    },
    datePublished: data.air_date,
    description: (data.summary_richtext || []).map((b: any) => b.text || "").join(" ")
  };

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">{data.title || "Épisode"}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {data.season_number ? `S${data.season_number}` : ''}{data.episode_number ? ` • E${data.episode_number}` : ''}
          {data.air_date ? ` • ${new Date(data.air_date).toLocaleDateString('fr-FR')}` : ''}
          {data.project_name ? ` • Projet: ${data.project_name}` : ''}
        </div>

        {data.embed_video?.html && (
          <div className="aspect-video mb-8" dangerouslySetInnerHTML={{ __html: data.embed_video.html }} />
        )}

        {Array.isArray(data.summary_richtext) && (
          <div className="prose prose-neutral mb-8">
            <PrismicRichText field={data.summary_richtext} />
          </div>
        )}

        {Array.isArray(data.key_takeaways) && data.key_takeaways.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">À retenir</h2>
            <ul className="list-disc pl-5 space-y-1">
              {data.key_takeaways.map((it: any, idx: number) => (<li key={idx}>{it.item}</li>))}
            </ul>
          </section>
        )}
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tvEpisodeLD) }} />
    </>
  );
}
*/

// Page temporairement masquée - retourne une 404
export default function QvemaEpisodePage() {
  return null;
}

