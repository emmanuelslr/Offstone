"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
      } else {
        params.delete("q");
      }
      params.delete("page"); // Reset page on search
      
      const newUrl = params.toString() ? `?${params.toString()}` : "/ressources";
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, router, searchParams]);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "découverte": return "bg-green-100 text-green-800";
      case "intermédiaire": return "bg-blue-100 text-blue-800";
      case "avancé": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ressources – guides, études et analyses pour investir à nos côtés
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Horizon 4–7 ans · tickets dès 20 k€ (sweet-spot 50–100 k€)
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un article, un thème..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <p className="text-sm text-gray-500">
            Qualité institutionnelle accessible · Sourcing propriétaire · Co-investi par l&apos;équipe
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Articles mis en avant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/ressources/${article.uid}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(article.data as any).hero_image?.url ? (
                      <Image
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        src={(article.data as any).hero_image.url}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        alt={(article.data as any).hero_image.alt || (article.data as any).title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {((article.data as any).asset_class || []).slice(0, 2).map((asset: string) => (
                        <span
                          key={asset}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {asset}
                        </span>
                      ))}
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(article.data as any).level && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeColor((article.data as any).level)}`}>
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(article.data as any).level}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(article.data as any).title}
                    </h3>

                    {/* Excerpt */}
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(article.data as any).excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(article.data as any).excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <span>⏱ {(article.data as any).reading_time || 5} min</span>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <span>{new Date((article.data as any).published_at).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
