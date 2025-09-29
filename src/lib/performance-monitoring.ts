// Système de monitoring des performances backend

interface PerformanceMetrics {
  endpoint: string;
  method: string;
  duration: number;
  status: number;
  timestamp: number;
  userAgent?: string;
  ip?: string;
}

// Configuration du monitoring
export const monitoringConfig = {
  // Seuil de performance (en ms)
  performanceThreshold: 1000,
  // Seuil d'erreur (en ms)
  errorThreshold: 5000,
  // Intervalle de nettoyage des métriques (en ms)
  cleanupInterval: 24 * 60 * 60 * 1000, // 24 heures
};

// Stockage des métriques (en mémoire pour la démo)
const metrics: PerformanceMetrics[] = [];

// Fonction pour enregistrer une métrique de performance
export function recordPerformanceMetric(metric: PerformanceMetrics) {
  metrics.push(metric);
  
  // Nettoyer les anciennes métriques
  const cutoff = Date.now() - monitoringConfig.cleanupInterval;
  const index = metrics.findIndex(m => m.timestamp > cutoff);
  if (index > 0) {
    metrics.splice(0, index);
  }
  
  // Log des performances lentes
  if (metric.duration > monitoringConfig.performanceThreshold) {
    console.warn(`Slow API response: ${metric.method} ${metric.endpoint} took ${metric.duration}ms`);
  }
  
  // Log des erreurs
  if (metric.duration > monitoringConfig.errorThreshold) {
    console.error(`Very slow API response: ${metric.method} ${metric.endpoint} took ${metric.duration}ms`);
  }
}

// Fonction pour obtenir les statistiques de performance
export function getPerformanceStats() {
  const now = Date.now();
  const last24h = metrics.filter(m => now - m.timestamp < 24 * 60 * 60 * 1000);
  
  if (last24h.length === 0) {
    return {
      totalRequests: 0,
      averageResponseTime: 0,
      slowRequests: 0,
      errorRate: 0,
    };
  }
  
  const totalRequests = last24h.length;
  const averageResponseTime = last24h.reduce((sum, m) => sum + m.duration, 0) / totalRequests;
  const slowRequests = last24h.filter(m => m.duration > monitoringConfig.performanceThreshold).length;
  const errorRequests = last24h.filter(m => m.status >= 400).length;
  const errorRate = (errorRequests / totalRequests) * 100;
  
  return {
    totalRequests,
    averageResponseTime: Math.round(averageResponseTime),
    slowRequests,
    errorRate: Math.round(errorRate * 100) / 100,
  };
}

// Middleware pour mesurer les performances des APIs
export function withPerformanceMonitoring<T extends any[]>(
  handler: (...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    const startTime = Date.now();
    const request = args[0] as Request;
    
    try {
      const response = await handler(...args);
      const duration = Date.now() - startTime;
      
      // Enregistrer la métrique
      recordPerformanceMetric({
        endpoint: new URL(request.url).pathname,
        method: request.method,
        duration,
        status: response.status,
        timestamp: startTime,
        userAgent: request.headers.get('user-agent') || undefined,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      });
      
      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Enregistrer l'erreur
      recordPerformanceMetric({
        endpoint: new URL(request.url).pathname,
        method: request.method,
        duration,
        status: 500,
        timestamp: startTime,
        userAgent: request.headers.get('user-agent') || undefined,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      });
      
      throw error;
    }
  };
}

// Fonction pour optimiser les requêtes Prismic
export function optimizePrismicPerformance() {
  // Configuration optimisée pour Prismic
  return {
    // Limiter le nombre de requêtes simultanées
    maxConcurrentRequests: 3,
    // Timeout pour les requêtes
    requestTimeout: 10000, // 10 secondes
    // Retry automatique
    retryAttempts: 2,
    // Cache des requêtes
    enableCache: true,
  };
}

// Fonction pour optimiser les requêtes Supabase
export function optimizeSupabasePerformance() {
  return {
    // Pool de connexions optimisé
    connectionPoolSize: 10,
    // Timeout pour les requêtes
    queryTimeout: 5000, // 5 secondes
    // Retry automatique
    retryAttempts: 3,
    // Cache des requêtes fréquentes
    enableQueryCache: true,
  };
}

// Fonction pour surveiller l'utilisation mémoire
export function monitorMemoryUsage() {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage();
    
    // Log si l'utilisation mémoire est élevée
    if (usage.heapUsed > 100 * 1024 * 1024) { // 100MB
      console.warn('High memory usage detected:', {
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + 'MB',
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + 'MB',
        external: Math.round(usage.external / 1024 / 1024) + 'MB',
      });
    }
    
    return usage;
  }
  
  return null;
}

// Fonction pour optimiser les imports dynamiques
export function createOptimizedDynamicImport<T>(
  importFn: () => Promise<T>,
  preloadDelay: number = 0
) {
  let promise: Promise<T> | null = null;
  let preloadTimeout: NodeJS.Timeout | null = null;
  
  const preload = () => {
    if (!promise) {
      promise = importFn();
    }
    return promise;
  };
  
  // Preload après un délai
  if (preloadDelay > 0) {
    preloadTimeout = setTimeout(preload, preloadDelay);
  }
  
  return {
    load: preload,
    cancel: () => {
      if (preloadTimeout) {
        clearTimeout(preloadTimeout);
      }
    },
  };
}

// Configuration pour les optimisations de build
export const buildOptimizations = {
  // Optimiser les chunks
  chunkOptimization: {
    // Taille maximale des chunks
    maxChunkSize: 244 * 1024, // 244KB
    // Nombre minimum de chunks
    minChunks: 2,
  },
  // Optimiser les assets
  assetOptimization: {
    // Compression des assets
    compression: true,
    // Minification
    minification: true,
    // Tree shaking
    treeShaking: true,
  },
};
