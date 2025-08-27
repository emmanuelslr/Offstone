import Link from "next/link";
import Image from "next/image";

interface RelatedArticle {
  id: string;
  uid: string;
  data: {
    title: string;
    excerpt?: string;
    hero_image?: {
      url: string;
      alt?: string;
    };
    asset_class: string[];
    published_at: string;
  };
}

interface RelatedGridProps {
  articles: RelatedArticle[];
}

export default function RelatedGrid({ articles }: RelatedGridProps) {
  if (!articles || articles.length === 0) return null;

  const getAssetClassColor = (asset: string) => {
    switch (asset) {
      case "résidentiel": return "bg-emerald-100 text-emerald-800";
      case "bureaux": return "bg-blue-100 text-blue-800";
      case "hôtellerie": return "bg-amber-100 text-amber-800";
      case "logistique": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="my-12 py-8 bg-gray-50 rounded-xl">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📚 Voir aussi
          </h2>
          <p className="text-gray-600">
            Articles connexes qui pourraient vous intéresser
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/ressources/${article.uid}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Compact Image */}
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                {article.data.hero_image?.url ? (
                  <Image
                    src={article.data.hero_image.url}
                    alt={article.data.hero_image.alt || article.data.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Compact Content */}
              <div className="p-4">
                {/* Asset Class Badge */}
                {article.data.asset_class?.[0] && (
                  <div className="mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAssetClassColor(article.data.asset_class[0])}`}>
                      {article.data.asset_class[0]}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(article.data as any).title || "Sans titre"}
                </h3>

                {/* Excerpt - shorter for compact view */}
                {article.data.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(article.data as any).excerpt}
                  </p>
                )}

                {/* Date */}
                <div className="text-xs text-gray-500">
                  {article.data.published_at && (
                    <time dateTime={article.data.published_at}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {new Date((article.data as any).published_at).toLocaleDateString("fr-FR")}
                    </time>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
