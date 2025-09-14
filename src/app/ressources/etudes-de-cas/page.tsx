import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Études de cas | Offstone";
  const description = "Sélection d'études de cas Offstone avec KPIs, timeline et thèses.";
  const canonical = toCanonical("/ressources/etudes-de-cas");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [{ url: toCanonical("/logos/x-bleu.svg") }] },
    twitter: { card: "summary_large_image", title, description, images: [toCanonical("/logos/x-bleu.svg")] },
  };
}

export default async function CaseStudiesIndexPage() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (await client.getAllByType("case_study" as any, { orderings: [{ field: "my.case_study.published_at", direction: "desc" }] }).catch(() => [])) as any[];

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Études de cas", url: toCanonical("/ressources/etudes-de-cas") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/etudes-de-cas"), name: "Études de cas", description: "Sélection d'études de cas Offstone" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-7xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Études de cas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it) => (
            <Link key={it.id} href={`/ressources/etudes-de-cas/${it.uid}`} className="block rounded-xl border bg-white shadow-sm hover:shadow-md overflow-hidden">
              <div className="image-wrapper">
                {it.data?.hero_image?.url ? (
                  <Image src={it.data.hero_image.url} alt={it.data.hero_image.alt || it.data.title || ""} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{it.data?.title || "Étude de cas"}</h3>
                {it.data?.excerpt && <p className="text-gray-600 line-clamp-3">{it.data.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }} />
    </>
  );
}

