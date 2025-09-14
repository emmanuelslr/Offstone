import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, collectionPageLD } from "@/lib/seo-jsonld";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Qui veut être mon associé ? | Jonathan Anguelov | Offstone";
  const description = "Suivez la participation de Jonathan Anguelov à l'émission — résumés, replays et points clés.";
  const canonical = toCanonical("/ressources/jonathan-anguelov/qui-veut-etre-mon-associe");
  return { title, description, alternates: { canonical } };
}

export default async function QvemaIndexPage() {
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const episodes = (await client.getAllByType("qvema_episode" as any, {
    orderings: [
      { field: "my.qvema_episode.season_number", direction: "desc" },
      { field: "my.qvema_episode.episode_number", direction: "desc" }
    ]
  }).catch(() => [])) as any[];

  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Jonathan Anguelov", url: toCanonical("/ressources/jonathan-anguelov") },
    { name: "Qui veut être mon associé ?", url: toCanonical("/ressources/jonathan-anguelov/qui-veut-etre-mon-associe") },
  ]);
  const collectionLD = collectionPageLD({ url: toCanonical("/ressources/jonathan-anguelov/qui-veut-etre-mon-associe"), name: "Qui veut être mon associé ?", description: "Replays et résumés d'épisodes" });

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-7xl px-4 py-14">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Qui veut être mon associé ?</h1>
          <p className="text-gray-600 max-w-3xl">Retrouvez les résumés, replays et points clés des épisodes auxquels participe Jonathan Anguelov. Nous ajoutons les contenus au fil des diffusions.</p>
        </header>

        <section className="space-y-3">
          {episodes.map((ep) => (
            <Link key={ep.id} href={`/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/${ep.uid}`} className="block p-4 rounded-lg border bg-white hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{ep.data?.title || `Épisode ${ep.data?.episode_number || ''}`}</h2>
                  <div className="text-sm text-gray-500">
                    {ep.data?.season_number ? `S${ep.data.season_number}` : ''}{ep.data?.episode_number ? ` • E${ep.data.episode_number}` : ''}
                    {ep.data?.air_date ? ` • ${new Date(ep.data.air_date).toLocaleDateString('fr-FR')}` : ''}
                  </div>
                </div>
                <span className="text-sm text-blue-700">Voir le détail →</span>
              </div>
            </Link>
          ))}
          {episodes.length === 0 && (
            <div className="text-gray-500">Les épisodes seront publiés ici prochainement.</div>
          )}
        </section>
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }} />
    </>
  );
}

