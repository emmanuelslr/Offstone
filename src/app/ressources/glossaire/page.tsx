import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Glossaire | Offstone";
  const description = "Glossaire Offstone: définitions, formules et exemples chiffrés.";
  const canonical = toCanonical("/ressources/glossaire");
  return { title, description, alternates: { canonical } };
}

export default async function GlossaryIndexPage() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const terms = (await client.getAllByType("glossary_term" as any).catch(() => [])) as any[];
  // Group by first letter
  const byLetter: Record<string, any[]> = {};
  for (const t of terms) {
    const name = (t.data?.term || t.uid || "").toString();
    const letter = name.charAt(0).toUpperCase();
    byLetter[letter] = byLetter[letter] || [];
    byLetter[letter].push(t);
  }
  const letters = Object.keys(byLetter).sort();

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Glossaire", url: toCanonical("/ressources/glossaire") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/glossaire"), name: "Glossaire", description: "Glossaire Offstone" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Glossaire</h1>
        {letters.length > 0 && (
          <nav className="mb-8 flex flex-wrap gap-2 text-sm">
            {letters.map((l) => (
              <a key={l} href={`#${l}`} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{l}</a>
            ))}
          </nav>
        )}

        <div className="space-y-8">
          {letters.map((l) => (
            <section key={l} id={l}>
              <h2 className="text-2xl font-semibold mb-3">{l}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {byLetter[l]
                  .sort((a, b) => (a.data?.term || "").localeCompare(b.data?.term || ""))
                  .map((t) => (
                    <li key={t.id}>
                      <Link href={`/ressources/glossaire/${t.uid}`} className="text-blue-700 hover:underline">
                        {t.data?.term || t.uid}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }} />
    </>
  );
}

