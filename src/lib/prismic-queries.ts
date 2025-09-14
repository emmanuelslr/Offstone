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
  categoryKey?: string; // Select key (guides, strategie-theses, ...)
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
    let articles = await client.getAllByType("resource_article" as any, {
      filters: [prismic.filter.at("my.resource_article.featured", true)],
      orderings: [{ field: "my.resource_article.published_at", direction: "desc" }],
      limit,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any[];
    
    return articles;
  } catch (error) {
    console.warn("Featured field not available yet, falling back to latest articles:", error);
    
    // Fallback : récupérer les articles les plus récents
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const articles = await client.getAllByType("resource_article" as any, {
        orderings: [{ field: "my.resource_article.published_at", direction: "desc" }],
        limit,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any[];
      
      console.log(`✅ Fallback: Found ${articles.length} articles for featured`);
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
    sort = "published_at_desc",
    categoryKey,
  } = filters;

  try {
    // Construire les filtres Prismic
    const prismicFilters: any[] = [];

    // Mappings slug → labels (Prismic select values)
    const assetMap: Record<string, string> = {
      residentiel: "résidentiel",
      bureaux: "bureaux",
      hotellerie: "hôtellerie",
      logistique: "logistique",
    };
    const themeMap: Record<string, string> = {
      methode: "méthode",
      fiscalite: "fiscalité",
      etudes_de_cas: "études_de_cas",
      marches: "marchés",
    };
    const levelMap: Record<string, string> = {
      debutant: "découverte",
      intermediaire: "intermédiaire",
      avance: "avancé",
    };

    // Full-text search
    if (q && q.trim()) {
      prismicFilters.push(prismic.filter.fulltext("document", q.trim()));
    }

    // Asset classes (multi-select) - Only add if fields exist in Prismic
    if (assetClasses.length > 0) {
      try {
        const values = assetClasses.map((s) => assetMap[s] || s);
        prismicFilters.push(prismic.filter.any("my.resource_article.asset_class", values));
      } catch (error) {
        console.warn("asset_class field not available yet:", error);
      }
    }

    // Themes (multi-select) - Only add if fields exist in Prismic
    if (themes.length > 0) {
      try {
        const values = themes.map((s) => themeMap[s] || s);
        prismicFilters.push(prismic.filter.any("my.resource_article.theme", values));
      } catch (error) {
        console.warn("theme field not available yet:", error);
      }
    }

    // Level (single select) - Only add if fields exist in Prismic
    if (level) {
      try {
        const value = levelMap[level] || level;
        prismicFilters.push(prismic.filter.at("my.resource_article.level", value));
      } catch (error) {
        console.warn("level field not available yet:", error);
      }
    }

    // Category filter (Select key)
    if (categoryKey) {
      try {
        prismicFilters.push(prismic.filter.at("my.resource_article.category", categoryKey));
      } catch (error) {
        console.warn("category (select) filter not available yet:", error);
      }
    }

    // Reading time duration - Only add if fields exist in Prismic
    if (duration) {
      try {
        switch (duration) {
          case "short": // ≤4 min
            prismicFilters.push(prismic.filter.numberLessThan("my.resource_article.reading_time", 5));
            break;
          case "medium": // 5-8 min
            prismicFilters.push(prismic.filter.numberGreaterThan("my.resource_article.reading_time", 4));
            prismicFilters.push(prismic.filter.numberLessThan("my.resource_article.reading_time", 9));
            break;
          case "long": // 9-15 min
            prismicFilters.push(prismic.filter.numberGreaterThan("my.resource_article.reading_time", 8));
            prismicFilters.push(prismic.filter.numberLessThan("my.resource_article.reading_time", 16));
            break;
        }
      } catch (error) {
        console.warn("reading_time field not available yet:", error);
      }
    }

    // Tri
    let orderings: Array<{ field: string; direction: "asc" | "desc" }>;
    switch (sort) {
      case "published_at_asc":
        orderings = [{ field: "my.resource_article.published_at", direction: "asc" }];
        break;
      case "reading_time_asc":
        try {
          orderings = [{ field: "my.resource_article.reading_time", direction: "asc" }];
        } catch (error) {
          console.warn("reading_time sorting not available yet, fallback to published_at");
          orderings = [{ field: "my.resource_article.published_at", direction: "desc" }];
        }
        break;
      case "reading_time_desc":
        try {
          orderings = [{ field: "my.resource_article.reading_time", direction: "desc" }];
        } catch (error) {
          console.warn("reading_time sorting not available yet, fallback to published_at");
          orderings = [{ field: "my.resource_article.published_at", direction: "desc" }];
        }
        break;
      default: // published_at_desc
        orderings = [{ field: "my.resource_article.published_at", direction: "desc" }];
    }

    // Requête paginée
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await client.getByType("resource_article" as any, {
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
      prismic.filter.not("my.resource_article.uid", uid) // Exclure l'article actuel
    ];

    // Priorité aux articles de même classe d'actifs
    if (Array.isArray(assetClass) && assetClass.length > 0) {
      try {
        // Prendre la première asset class pour simplifier
        filters.push(prismic.filter.at("my.resource_article.asset_class", assetClass[0]));
      } catch (error) {
        console.warn("asset_class field not available for related articles:", error);
      }
    } else if (Array.isArray(theme) && theme.length > 0) {
      try {
        // Fallback sur même thématique
        filters.push(prismic.filter.at("my.resource_article.theme", theme[0]));
      } catch (error) {
        console.warn("theme field not available for related articles:", error);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles = await client.getAllByType("resource_article" as any, {
      filters,
      orderings: [{ field: "my.resource_article.published_at", direction: "desc" }],
      limit,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any[];

    return articles;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}


