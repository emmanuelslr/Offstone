import Link from "next/link";
import Navbar from "../../components/shared/Navbar";
import ProCTAFooter from "../home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import type { ArticleDocument } from "../../../prismicio-types";

export const revalidate = 300;

export default async function RessourcesPage() {
  const client = createClient();
  let docs: ArticleDocument[] = [];

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs = await client.getAllByType("article" as any, {
      orderings: [{ field: "my.article.published_at", direction: "desc" }],
      pageSize: 24,
    }) as any[];
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ressources</h1>
          <p className="text-lg text-gray-600">
            Découvrez nos analyses, études de cas et insights sur l&apos;immobilier
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docs.map((doc) => (
            <article key={doc.id}>
              {doc.uid ? (
                <Link href={`/ressources/${doc.uid}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      {doc.data.title || "Sans titre"}
                    </h2>
                    {doc.data.excerpt ? (
                      <p className="text-gray-600 mb-4 line-clamp-3">{doc.data.excerpt}</p>
                    ) : null}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        {doc.data.published_at ? new Date(doc.data.published_at).toLocaleDateString("fr-FR") : null}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                      {doc.data.title || "Sans titre"}
                    </h2>
                    {doc.data.excerpt ? (
                      <p className="text-gray-600 mb-4 line-clamp-3">{doc.data.excerpt}</p>
                    ) : null}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        {doc.data.published_at ? new Date(doc.data.published_at).toLocaleDateString("fr-FR") : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        
                {docs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article publié pour le moment.</p>
            <p className="text-sm text-gray-400 mt-2">
              Créez un article dans Prismic pour le voir apparaître ici.
            </p>
          </div>
        )}
      </main>
      
      <ProCTAFooter />
    </>
  );
}
