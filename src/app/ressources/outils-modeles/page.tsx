import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Outils & modèles | Offstone";
  const description = "Modèles et outils pour investir: checklists, fichiers et guides.";
  const canonical = toCanonical("/ressources/outils-modeles");
  return { title, description, alternates: { canonical } };
}

export default async function ToolsIndexPage() {
  const client = createClient();
  // On liste d'abord les resource_article ayant un fichier à télécharger
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resourceArticles = (await client.getAllByType("resource_article" as any, {
    orderings: [{ field: "my.resource_article.published_at", direction: "desc" }],
  }).catch(() => [])) as any[];
  const items = resourceArticles.filter((it: any) => it?.data?.download_file?.url);

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Outils & modèles", url: toCanonical("/ressources/outils-modeles") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/outils-modeles"), name: "Outils & modèles", description: "Modèles et outils Offstone" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Outils & modèles</h1>
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
              <Link href={`/ressources/${it.data?.category || 'guides'}/${it.uid}`} className="text-lg font-semibold text-blue-700 hover:underline">
                {it.data?.title || it.uid}
              </Link>
              {it.data?.download_file?.url && (
                <a href={it.data.download_file.url} target="_blank" rel="noopener" className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
                  Télécharger
                </a>
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
