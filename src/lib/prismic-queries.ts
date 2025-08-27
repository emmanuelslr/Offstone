import { createClient } from "./prismicio";
import * as prismic from "@prismicio/client";

export interface ArticleFilters {
  page?: number;
  pageSize?: number;
  q?: string;
  assetClasses?: string[];
  themes?: string[];
  level?: string;
  duration?: string;
  sort?: string;
}

export interface PaginatedArticles {
  results: any[];
  page: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function getFeaturedArticles(limit = 3) {
  const client = createClient();
  
  try {
    // Tenter d'abord avec le filtre featured (si le champ existe)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let articles = await client.getAllByType("article" as any, {
      filters: [prismic.filter.at("my.article.featured", true)],
      orderings: [{ field: "my.article.published_at", direction: "desc" }],
      limit,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any[];
    
    return articles;
  } catch (error) {
    console.warn("Featured field not available yet, falling back to latest articles:", error);
    
    // Fallback : récupérer les articles les plus récents
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const articles = await client.getAllByType("article" as any, {
        orderings: [{ field: "my.article.published_at", direction: "desc" }],
        limit,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any[];
      
      return articles;
    } catch (fallbackError) {
      console.error("Error fetching latest articles:", fallbackError);
      return [];
    }
  }
}

export async function getArticles(filters: ArticleFilters = {}): Promise<PaginatedArticles> {
  const client = createClient();
  const {
    page = 1,
    pageSize = 12,
    q,
    assetClasses = [],
    themes = [],
    level,
    duration,
    sort = "published_at_desc"
  } = filters;

  try {
    // Construire les filtres Prismic
    const prismicFilters: any[] = [];

    // Full-text search
    if (q && q.trim()) {
      prismicFilters.push(prismic.filter.fulltext("document", q.trim()));
    }

    // Asset classes (multi-select) - Only add if fields exist in Prismic
    if (assetClasses.length > 0) {
      try {
        prismicFilters.push(prismic.filter.any("my.article.asset_class", assetClasses));
      } catch (error) {
        console.warn("asset_class field not available yet:", error);
      }
    }

    // Themes (multi-select) - Only add if fields exist in Prismic
    if (themes.length > 0) {
      try {
        prismicFilters.push(prismic.filter.any("my.article.theme", themes));
      } catch (error) {
        console.warn("theme field not available yet:", error);
      }
    }

    // Level (single select) - Only add if fields exist in Prismic
    if (level) {
      try {
        prismicFilters.push(prismic.filter.at("my.article.level", level));
      } catch (error) {
        console.warn("level field not available yet:", error);
      }
    }

    // Reading time duration - Only add if fields exist in Prismic
    if (duration) {
      try {
        switch (duration) {
          case "short": // ≤4 min
            prismicFilters.push(prismic.filter.numberLessThan("my.article.reading_time", 5));
            break;
          case "medium": // 5-8 min
            prismicFilters.push(prismic.filter.numberGreaterThan("my.article.reading_time", 4));
            prismicFilters.push(prismic.filter.numberLessThan("my.article.reading_time", 9));
            break;
          case "long": // 9-15 min
            prismicFilters.push(prismic.filter.numberGreaterThan("my.article.reading_time", 8));
            prismicFilters.push(prismic.filter.numberLessThan("my.article.reading_time", 16));
            break;
        }
      } catch (error) {
        console.warn("reading_time field not available yet:", error);
      }
    }

    // Tri
    let orderings;
    switch (sort) {
      case "published_at_asc":
        orderings = [{ field: "my.article.published_at", direction: "asc" }];
        break;
      case "reading_time_asc":
        try {
          orderings = [{ field: "my.article.reading_time", direction: "asc" }];
        } catch (error) {
          console.warn("reading_time sorting not available yet, fallback to published_at");
          orderings = [{ field: "my.article.published_at", direction: "desc" }];
        }
        break;
      case "reading_time_desc":
        try {
          orderings = [{ field: "my.article.reading_time", direction: "desc" }];
        } catch (error) {
          console.warn("reading_time sorting not available yet, fallback to published_at");
          orderings = [{ field: "my.article.published_at", direction: "desc" }];
        }
        break;
      default: // published_at_desc
        orderings = [{ field: "my.article.published_at", direction: "desc" }];
    }

    // Requête paginée
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await client.getByType("article" as any, {
      filters: prismicFilters,
      orderings,
      page,
      pageSize,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    return {
      results: response.results || [],
      page: response.page || 1,
      totalPages: response.total_pages || 1,
      totalResults: response.total_results_size || 0,
      hasNextPage: (response.page || 1) < (response.total_pages || 1),
      hasPrevPage: (response.page || 1) > 1,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      results: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

export async function getRelatedArticles(params: {
  uid: string;
  assetClass?: string[];
  theme?: string[];
  limit?: number;
}) {
  const client = createClient();
  const { uid, assetClass = [], theme = [], limit = 3 } = params;

  try {
    const filters: any[] = [
      prismic.filter.not("my.article.uid", uid) // Exclure l'article actuel
    ];

    // Priorité aux articles de même classe d'actifs
    if (assetClass.length > 0) {
      try {
        filters.push(prismic.filter.any("my.article.asset_class", assetClass));
      } catch (error) {
        console.warn("asset_class field not available for related articles:", error);
      }
    } else if (theme.length > 0) {
      try {
        // Fallback sur même thématique
        filters.push(prismic.filter.any("my.article.theme", theme));
      } catch (error) {
        console.warn("theme field not available for related articles:", error);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles = await client.getAllByType("article" as any, {
      filters,
      orderings: [{ field: "my.article.published_at", direction: "desc" }],
      limit,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any[];

    return articles;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}
