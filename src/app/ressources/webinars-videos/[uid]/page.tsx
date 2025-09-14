import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("webinar" as any, uid).catch(() => null);
  if (!doc) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const title = data.seo?.[0]?.meta_title || data.title || "Webinar";
  const description = data.seo?.[0]?.meta_description || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/webinars-videos/${uid}`);
  const noindex = data.seo?.[0]?.noindex === true;
  return { title, description, alternates: { canonical }, robots: noindex ? { index: false, follow: true } : { index: true, follow: true } };
}

export default async function WebinarPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("webinar" as any, uid).catch(() => null);
  if (!doc) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Webinars & vidéos", url: toCanonical("/ressources/webinars-videos") },
    { name: data.title || uid, url: toCanonical(`/ressources/webinars-videos/${uid}`) },
  ]);

  // Basic VideoObject JSON-LD
  const videoLD = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: data.title || "Webinar",
    description: data.seo?.[0]?.meta_description || "",
    uploadDate: data.event_date,
    embedUrl: data.embed_video?.embed_url,
    thumbnailUrl: data.seo?.[0]?.og_image?.url ? [data.seo[0].og_image.url] : undefined,
  };

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{data.title || "Webinar"}</h1>
        {data.embed_video?.html && (
          <div className="aspect-video mb-8" dangerouslySetInnerHTML={{ __html: data.embed_video.html }} />
        )}
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
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLD) }} />
    </>
  );
}

