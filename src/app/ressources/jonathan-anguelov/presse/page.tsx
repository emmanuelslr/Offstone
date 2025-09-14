import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Presse | Jonathan Anguelov | Offstone";
  const description = "Sélection d'articles de presse autour de Jonathan Anguelov.";
  const canonical = toCanonical("/ressources/jonathan-anguelov/presse");
  return { title, description, alternates: { canonical } };
}

export default async function PressIndexPage() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (await client.getAllByType("press_item" as any, { orderings: [{ field: "my.press_item.date", direction: "desc" }] }).catch(() => [])) as any[];

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Presse", url: toCanonical("/ressources/jonathan-anguelov/presse") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/jonathan-anguelov/presse"), name: "Presse", description: "Sélection d'articles de presse" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Presse</h1>
        <ul className="space-y-4">
          {items.map((it) => (
            <li key={it.id} className="p-4 rounded-lg border bg-white shadow-sm">
              <Link href={`/ressources/jonathan-anguelov/presse/${it.uid}`} className="text-lg font-semibold text-blue-700 hover:underline">
                {it.data?.title || it.uid}
              </Link>
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

