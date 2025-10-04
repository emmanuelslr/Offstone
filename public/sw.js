// Service Worker pour le cache avancé
const CACHE_NAME = 'offstone-v1.0.0';
const STATIC_CACHE = 'offstone-static-v1.0.0';
const DYNAMIC_CACHE = 'offstone-dynamic-v1.0.0';

// Ressources critiques à mettre en cache
const CRITICAL_RESOURCES = [
  '/',
  '/favicon.ico',
  '/favicon.webp',
  '/manifest.json',
  '/images/og-image.webp',
  '/images/offstone-navbar-logo.svg',
  '/fonts/inter-var.woff2',
  '/fonts/inter-var.woff',
];

// Ressources statiques à mettre en cache
const STATIC_RESOURCES = [
  '/images/',
  '/fonts/',
  '/_next/static/',
  '/tarteaucitron/',
];

// Domaines externes à mettre en cache
const EXTERNAL_DOMAINS = [
  'https://images.prismic.io',
  'https://static.cdn.prismic.io',
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Mise en cache des ressources critiques');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation terminée');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Erreur lors de l\'installation', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Suppression de l\'ancien cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation terminée');
        return self.clients.claim();
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Stratégie de cache pour les ressources statiques
  if (isStaticResource(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Stratégie de cache pour les pages HTML
  if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Stratégie de cache pour les images
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Stratégie de cache pour les fonts
  if (request.destination === 'font') {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Stratégie de cache pour les scripts et styles
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // Stratégie par défaut : network first
  event.respondWith(networkFirst(request));
});

// Vérifier si c'est une ressource statique
function isStaticResource(request) {
  const url = new URL(request.url);
  
  // Ressources locales statiques
  if (url.origin === location.origin) {
    return STATIC_RESOURCES.some(resource => url.pathname.startsWith(resource));
  }
  
  // Domaines externes
  return EXTERNAL_DOMAINS.some(domain => url.href.startsWith(domain));
}

// Stratégie Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Service Worker: Erreur Cache First', error);
    return new Response('Ressource non disponible', { status: 503 });
  }
}

// Stratégie Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback pour les pages HTML
    if (request.destination === 'document') {
      return caches.match('/');
    }
    
    return new Response('Ressource non disponible', { status: 503 });
  }
}

// Stratégie Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
    });
  }
});

// Obtenir la taille du cache
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    for (const key of keys) {
      const response = await cache.match(key);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Nettoyage périodique du cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCache();
  }
});

async function cleanOldCache() {
  const cacheNames = await caches.keys();
  const currentTime = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
  
  for (const cacheName of cacheNames) {
    if (cacheName.includes('v') && !cacheName.includes('v1.0.0')) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const key of keys) {
        const response = await cache.match(key);
        if (response) {
          const dateHeader = response.headers.get('date');
          if (dateHeader) {
            const responseDate = new Date(dateHeader).getTime();
            if (currentTime - responseDate > maxAge) {
              await cache.delete(key);
            }
          }
        }
      }
    }
  }
}

console.log('🔧 Service Worker: Script chargé');
