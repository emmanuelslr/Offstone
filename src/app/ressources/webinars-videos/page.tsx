import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";
import AnalyticsLink from "@/components/AnalyticsLink";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Webinars & vidéos | Offstone";
  const description = "Webinars et conférences Offstone: replays et slides.";
  const canonical = toCanonical("/ressources/webinars-videos");
  return { title, description, alternates: { canonical } };
}

export default async function WebinarsIndexPage() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (await client.getAllByType("webinar" as any, { orderings: [{ field: "my.webinar.event_date", direction: "desc" }] }).catch(() => [])) as any[];

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Webinars & vidéos", url: toCanonical("/ressources/webinars-videos") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/webinars-videos"), name: "Webinars & vidéos", description: "Replays Offstone" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Webinars & vidéos</h1>
        <ul className="space-y-4">
          {items.map((it) => (
            <li key={it.id} className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
              <div>
                <Link href={`/ressources/webinars-videos/${it.uid}`} className="text-lg font-semibold text-blue-700 hover:underline">
                  {it.data?.title || it.uid}
                </Link>
                {it.data?.event_date && (
                  <div className="text-sm text-gray-500">
                    {new Date(it.data.event_date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                  </div>
                )}
              </div>
              {it.data?.slides_download?.url && (
                <AnalyticsLink
                  href={it.data.slides_download.url}
                  target="_blank"
                  rel="noopener"
                  className="px-3 py-1 rounded bg-gray-900 text-white text-sm"
                  event="resource_download"
                  eventParams={{ type: "slides", uid: it.uid }}
                >
                  Slides
                </AnalyticsLink>
              )}
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
