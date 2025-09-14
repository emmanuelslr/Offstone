import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  article: {
    id: string;
    uid: string;
    data: {
      title: string;
      excerpt: string;
      hero_image?: {
        url: string;
        alt?: string;
      };
      asset_class: string[];
      theme: string[];
      level: string;
      reading_time: number;
      published_at: string;
      category?: string;
      authors?: Array<{
        name: string;
        role?: string;
      }>;
    };
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Get author name from authors array
  const authorName = Array.isArray(article.data.authors) && article.data.authors.length > 0 
    ? article.data.authors[0].name || "Équipe Offstone"
    : "Équipe Offstone";
  
  // Check if we have a role to display alongside the name
  const authorRole = Array.isArray(article.data.authors) && article.data.authors.length > 0 
    ? article.data.authors[0].role 
    : null;
  
  // Format author display name
  const authorDisplayName = authorRole 
    ? `${authorName} ${authorRole}`
    : authorName;

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "découverte": return "bg-green-100 text-green-800";
      case "intermédiaire": return "bg-blue-100 text-blue-800";
      case "avancé": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAssetClassColor = (asset: string) => {
    switch (asset) {
      case "résidentiel": return "bg-emerald-100 text-emerald-800";
      case "bureaux": return "bg-blue-100 text-blue-800";
      case "hôtellerie": return "bg-amber-100 text-amber-800";
      case "logistique": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!article.uid) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden opacity-50">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Pas de slug</span>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(article.data as any).title || "Sans titre"}
          </h3>
          <p className="text-gray-500 text-sm">Article non accessible</p>
        </div>
      </div>
    );
  }

  // Generate proper link with category
  const articleLink = article.data.category 
    ? `/ressources/${article.data.category}/${article.uid}`
    : `/ressources/${article.uid}`;

  return (
    <Link
      href={articleLink}
      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer block"
    >
      {/* Hero Image */}
      <div className="image-wrapper">
        {article.data.hero_image?.url ? (
          <Image
            src={article.data.hero_image.url}
            alt={article.data.hero_image.alt || article.data.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Asset Classes */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {Array.isArray((article.data as any).asset_class) && (article.data as any).asset_class?.slice(0, 2).map((asset: string) => (
            <span
              key={asset}
              className="chip chip-small chip-primary"
            >
              {asset}
            </span>
          ))}
          
          {/* Level */}
          {article.data.level && (
            <span className="chip chip-small chip-primary">
              {article.data.level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-[#F7B096] transition-colors">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(article.data as any).title || "Sans titre"}
        </h3>

        {/* Excerpt */}
        {article.data.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(article.data as any).excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {/* Author */}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {authorDisplayName}
            </span>

            {/* Reading time */}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.data.reading_time || 5} min
            </span>

            {/* Themes (max 1) */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {Array.isArray((article.data as any).theme) && (article.data as any).theme?.[0] && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(article.data as any).theme[0]}
              </span>
            )}
          </div>

          {/* Date */}
          <div>
            {article.data.published_at && (
              <time dateTime={article.data.published_at}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {new Date((article.data as any).published_at).toLocaleDateString("fr-FR")}
              </time>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
