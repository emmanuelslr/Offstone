"use client";

import Link from "next/link";
import Image from "next/image";
import SearchInput from "../shared/SearchInput";

interface FeaturedArticle {
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
    level: string;
    reading_time: number;
    published_at: string;
  };
}

interface HeroProps {
  featuredArticles: FeaturedArticle[];
}

export default function Hero({ featuredArticles }: HeroProps) {

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "découverte": return "bg-green-100 text-green-800";
      case "intermédiaire": return "bg-blue-100 text-blue-800";
      case "avancé": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-10 leading-[0.9] tracking-tight">
            Ressources
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            Guides, études et analyses pour investir à nos côtés
          </p>
          <p className="text-xl text-gray-500 mb-16 leading-relaxed">
            Horizon 4–7 ans · tickets dès 20 k€ (sweet-spot 50–100 k€)
          </p>
          
          {/* Search Bar XL */}
          <div className="max-w-3xl mx-auto mb-8">
            <SearchInput 
              placeholder="Rechercher un article, un thème..."
              size="lg"
            />
          </div>

          {/* Trust signals */}
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            💎 Qualité institutionnelle accessible · 🎯 Sourcing propriétaire · 🤝 Co-investi par l&apos;équipe
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              À la une
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredArticles.map((article) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = article.data as any;
                return (
                  <Link
                    key={article.id}
                    href={`/ressources/${article.uid}`}
                    className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Image - Plus haute pour variant featured */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      {data.hero_image?.url ? (
                        <Image
                          src={data.hero_image.url}
                          alt={data.hero_image.alt || data.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content - Plus généreux pour featured */}
                    <div className="p-8">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(data.asset_class || []).slice(0, 2).map((asset: string) => (
                          <span
                            key={asset}
                            className="chip chip-small chip-primary"
                          >
                            {asset}
                          </span>
                        ))}
                        {data.level && (
                          <span className="chip chip-small chip-primary">
                            {data.level}
                          </span>
                        )}
                      </div>

                      {/* Title - Plus gros pour featured */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight">
                        {data.title}
                      </h3>

                      {/* Excerpt - Toujours visible pour featured */}
                      <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">
                        {data.excerpt || "Découvrez cet article et approfondissez vos connaissances en investissement immobilier."}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="font-medium">⏱ {data.reading_time || 5} min</span>
                        <span>{new Date(data.published_at).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
