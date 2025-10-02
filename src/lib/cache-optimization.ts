// Optimisations de cache pour améliorer les performances backend

// Configuration du cache pour les données Prismic
export const prismicCacheConfig = {
  // Cache des données Prismic pour 5 minutes
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  // Cache des métadonnées pour 1 heure
  metadataTTL: 60 * 60 * 1000, // 1 heure
  // Cache des images pour 24 heures
  imageTTL: 24 * 60 * 60 * 1000, // 24 heures
};

// Configuration du cache pour les APIs
export const apiCacheConfig = {
  // Cache des réponses API pour 2 minutes
  defaultTTL: 2 * 60 * 1000, // 2 minutes
  // Cache des données statiques pour 1 heure
  staticTTL: 60 * 60 * 1000, // 1 heure
  // Cache des données dynamiques pour 30 secondes
  dynamicTTL: 30 * 1000, // 30 secondes
};

// Fonction pour générer des clés de cache optimisées
export function generateCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${params[key]}`)
    .join('|');
  
  return `${prefix}:${sortedParams}`;
}

// Fonction pour optimiser les requêtes Prismic
export function optimizePrismicQuery(query: any) {
  return {
    ...query,
    // Optimiser les requêtes avec des paramètres de performance
    fetchLinks: query.fetchLinks || [],
    // Limiter les champs récupérés si possible
    fields: query.fields || undefined,
    // Utiliser la pagination optimisée
    pageSize: query.pageSize || 20,
  };
}

// Configuration des headers de cache pour les réponses
export const cacheHeaders = {
  // Cache public pour les assets statiques
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 an
  },
  // Cache public pour les données semi-statiques
  semiStatic: {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400', // 1 heure avec revalidation
  },
  // Cache privé pour les données utilisateur
  private: {
    'Cache-Control': 'private, max-age=300, stale-while-revalidate=600', // 5 minutes
  },
  // Pas de cache pour les données sensibles
  noCache: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  },
};

// Fonction pour déterminer le type de cache selon l'URL
export function getCacheStrategy(url: string): keyof typeof cacheHeaders {
  if (url.includes('/api/leads') || url.includes('/api/opportunities')) {
    return 'private';
  }
  if (url.includes('/api/') && !url.includes('/api/leads')) {
    return 'semiStatic';
  }
  if (url.includes('/images/') || url.includes('/fonts/')) {
    return 'static';
  }
  return 'semiStatic';
}

// Optimisations pour les images
export const imageOptimization = {
  // Formats optimisés par défaut
  formats: ['image/webp', 'image/avif'],
  // Qualité par défaut
  quality: 85,
  // Tailles optimisées
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  // Placeholder optimisé
  placeholder: 'blur',
  // Lazy loading par défaut
  loading: 'lazy' as const,
};

// Configuration pour les performances des composants
export const componentOptimization = {
  // Délai pour les animations
  animationDelay: 100,
  // Seuil pour l'intersection observer
  intersectionThreshold: 0.1,
  // Délai pour le debounce des événements
  debounceDelay: 300,
};

// Fonction pour optimiser les imports dynamiques
export function createOptimizedImport<T>(importFn: () => Promise<T>) {
  let promise: Promise<T> | null = null;
  
  return () => {
    if (!promise) {
      promise = importFn();
    }
    return promise;
  };
}

// Configuration pour le preloading des ressources critiques
export const criticalResources = [
  '/fonts/AllianceNo1-Regular.woff2',
  '/favicon.ico',
  '/favicon.webp',
  '/images/og-image.webp',
];

// Fonction pour optimiser les requêtes de base de données
export function optimizeDatabaseQuery(query: string, params: any[] = []) {
  // Logique d'optimisation des requêtes (exemple)
  return {
    query: query.trim(),
    params: params.filter(param => param !== undefined && param !== null),
    // Ajouter des index suggérés si nécessaire
    suggestedIndexes: [],
  };
}
