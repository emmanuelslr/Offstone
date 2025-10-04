'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerManager() {
  const [swStatus, setSwStatus] = useState<'loading' | 'registered' | 'error' | 'unsupported'>('loading');
  const [cacheSize, setCacheSize] = useState<number>(0);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    } else {
      setSwStatus('unsupported');
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('✅ Service Worker enregistré:', registration);

      // Écouter les mises à jour
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nouvelle version disponible
              console.log('🔄 Nouvelle version du Service Worker disponible');
              // Optionnel: notifier l'utilisateur
            }
          });
        }
      });

      setSwStatus('registered');

      // Obtenir la taille du cache
      if (registration.active) {
        getCacheSize();
      }

    } catch (error) {
      console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
      setSwStatus('error');
    }
  };

  const getCacheSize = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_SIZE') {
          setCacheSize(event.data.size);
        }
      };

      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_SIZE' },
        [messageChannel.port2]
      );
    }
  };

  const cleanCache = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAN_CACHE' });
      setTimeout(() => getCacheSize(), 1000);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Ne rien rendre côté serveur
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="service-worker-manager">
      {/* Debug info en développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>SW: {swStatus}</div>
          {cacheSize > 0 && (
            <div>Cache: {formatBytes(cacheSize)}</div>
          )}
          {swStatus === 'registered' && (
            <button 
              onClick={cleanCache}
              className="mt-1 px-2 py-1 bg-red-600 rounded text-xs"
            >
              Nettoyer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
