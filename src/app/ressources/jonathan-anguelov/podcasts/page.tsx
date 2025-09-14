import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";
import * as prismic from "@prismicio/client";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Podcasts | Jonathan Anguelov | Offstone";
  const description = "Podcasts de Jonathan Anguelov.";
  const canonical = toCanonical("/ressources/jonathan-anguelov/podcasts");
  return { title, description, alternates: { canonical } };
}

export default async function PodcastsIndexPage() {
  const client = createClient();
  // On filtre les press_item avec section = "podcast"
  const items = (await client.getAllByType("press_item" as any, {
    filters: [prismic.filter.at("my.press_item.section", "podcast")],
    orderings: [{ field: "my.press_item.date", direction: "desc" }],
  }).catch(() => [])) as any[];

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Podcasts", url: toCanonical("/ressources/jonathan-anguelov/podcasts") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/jonathan-anguelov/podcasts"), name: "Podcasts", description: "Podcasts de Jonathan Anguelov" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Podcasts</h1>
        <ul className="space-y-4">
          {items.map((it) => (
            <li key={it.id} className="p-4 rounded-lg border bg-white shadow-sm">
              <a href={`/ressources/jonathan-anguelov/podcasts/${it.uid}`} className="text-lg font-semibold text-blue-700 hover:underline">
                {it.data?.title || it.uid}
              </a>
              <div className="text-sm text-gray-500 mt-1">
                {it.data?.source} {it.data?.date ? `• ${new Date(it.data.date).toLocaleDateString("fr-FR")}` : ""}
              </div>
              {it.data?.quote_short && <blockquote className="mt-2 text-gray-700 italic">“{it.data.quote_short}”</blockquote>}
            </li>
          ))}
        </ul>
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }} />
    </>
  );
}
