"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ArticleCard from "./ArticleCard";

interface Article {
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
  };
}

interface PaginationData {
  page: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface SectionGridProps {
  articles: Article[];
  pagination: PaginationData;
}

export default function SectionGrid({ articles, pagination }: SectionGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const hasAnyFilter = ["q", "asset", "theme", "level", "duration", "sort", "classe", "thematique", "niveau", "duree", "tri"]
      .some((k) => params.has(k));

    if (!hasAnyFilter) {
      // Path-based pagination for SEO: /ressources/page/2, /ressources/{cat}/page/2,
      // /ressources/strategie-theses/{classe}/page/2
      const pathname = typeof window !== "undefined" ? window.location.pathname : "/ressources";
      const parts = pathname.split("/").filter(Boolean); // ["ressources", ...]
      let base = "/ressources";
      if (parts[0] === "ressources") {
        if (parts.length >= 2 && parts[1] !== "page") {
          base = `/ressources/${parts[1]}`; // e.g., /ressources/guides or /ressources/strategie-theses
        }
        if (parts.length >= 3 && parts[2] !== "page") {
          base = `${base}/${parts[2]}`; // e.g., add /residentiel
        }
      }
      const dest = page > 1 ? `${base}/page/${page}` : base;
      router.push(dest, { scroll: false });
      return;
    }

    // Filtered pages: keep query-based pagination (noindex)
    if (page > 1) params.set("page", page.toString()); else params.delete("page");
    const newUrl = params.toString() ? `?${params.toString()}` : "/ressources";
    router.push(newUrl, { scroll: false });
  };

  const getVisiblePages = () => {
    const { page, totalPages } = pagination;
    const pages = [];
    
    // Logique de pagination : toujours montrer 1, page courante ±1, et dernière page
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    
    // Première page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    
    // Pages autour de la page courante
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Dernière page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 pb-16">


      {/* Articles Grid - Spacing plus généreux */}
      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-0">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(pagination.page - 1)}
                disabled={!pagination.hasPrevPage}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  pagination.hasPrevPage
                    ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Précédent
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getVisiblePages().map((pageNum, index) => (
                  <span key={index}>
                    {pageNum === "..." ? (
                      <span className="px-3 py-2 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(pageNum as number)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          pageNum === pagination.page
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(pagination.page + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  pagination.hasNextPage
                    ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg mb-2">Aucun article ne correspond à vos critères</p>
          <p className="text-gray-400 text-sm">
            Essayez de modifier vos filtres ou votre recherche
          </p>
        </div>
      )}
    </section>
  );
}
