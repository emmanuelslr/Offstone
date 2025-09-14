
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD } from "@/lib/seo-jsonld";
import JonathanLanding from "@/components/JonathanLanding";
import { createClient } from "@/lib/prismicio";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Jonathan Anguelov | Offstone";
  const canonical = toCanonical("/ressources/jonathan-anguelov");
  return { title, alternates: { canonical }, robots: { index: true, follow: true } };
}


/**
 * Pour l'équipe éditoriale Prismic :
 * - Dans chaque document press_item, bien remplir le champ select "section" avec la valeur "presse".
 * - Pour les articles propriétaires, utiliser category = "jonathan-anguelov".
 * - Pour d'autres sections (interviews, etc.), ajouter la valeur correspondante dans le champ "section" ou "category".
 */

export default async function JonathanPage() {
  const client = createClient();

  // Derniers articles propriétaires (category = jonathan-anguelov)
  const articles = (await client.getAllByType("resource_article" as any, {
    filters: [
      // Champ select exact dans Prismic : "jonathan-anguelov"
      ["at", "my.resource_article.category", "jonathan-anguelov"]
    ],
    orderings: [{ field: "my.resource_article.published_at", direction: "desc" }],
    limit: 3,
  }).catch(() => [])) as any[];

  // Derniers press_item (section = presse ou par défaut tout)
  const press = (await client.getAllByType("press_item" as any, {
    filters: [
      // Si le champ "section" existe, filtrer sur "presse". Sinon, prendre tout.
      // ["at", "my.press_item.section", "presse"]
    ],
    orderings: [{ field: "my.press_item.date", direction: "desc" }],
    limit: 3,
  }).catch(() => [])) as any[];

  // Mapping pour le composant JonathanLanding
  const articlesMapped = articles.map((a) => ({
    uid: a.uid,
    title: a.data?.title || a.uid,
    excerpt: a.data?.excerpt || "",
    detailUrl: `/ressources/jonathan-anguelov/${a.uid}`,
  }));
  const pressMapped = press.map((p) => ({
    uid: p.uid,
    title: p.data?.title || p.uid,
    excerpt: p.data?.excerpt || p.data?.quote_short || "",
    detailUrl: `/ressources/jonathan-anguelov/presse/${p.uid}`,
  }));

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Jonathan Anguelov</h1>
        <p className="text-gray-700 mb-8">Entrepreneur et investisseur. Retrouvez ici ses interviews, podcasts, interventions et actualités.</p>

        <JonathanLanding articles={articlesMapped} press={pressMapped} />

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Qui veut être mon associé ?</h2>
          <p className="text-gray-600 mb-3">Suivez la participation de Jonathan à l’émission. Replays, résumés et points clés.</p>
          <a href="/ressources/jonathan-anguelov/qui-veut-etre-mon-associe" className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Voir les épisodes</a>
        </section>
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

