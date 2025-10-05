'use client';

import { useCallback, useEffect, useState } from 'react';

type ServiceWorkerStatus = 'loading' | 'registered' | 'error' | 'unsupported';

const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const enableSwDebugOverlay = process.env.NEXT_PUBLIC_SHOW_SW_DEBUG === 'true';
const isDevEnv = process.env.NODE_ENV === 'development';

export default function ServiceWorkerManager() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [swStatus, setSwStatus] = useState<ServiceWorkerStatus>('loading');
  const [cacheSize, setCacheSize] = useState(0);

  const getCacheSize = useCallback(() => {
    if (typeof navigator === 'undefined') {
      return;
    }

    const controller = navigator.serviceWorker?.controller;
    if (!controller) {
      return;
    }

    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      if (event.data?.type === 'CACHE_SIZE') {
        setCacheSize(event.data.size ?? 0);
      }
    };

    controller.postMessage({ type: 'GET_CACHE_SIZE' }, [messageChannel.port2]);
  }, []);

  const registerServiceWorker = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
      setSwStatus('unsupported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[SW] Service worker registered', registration);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) {
          return;
        }

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] New service worker available');
          }
        });
      });

      setSwStatus('registered');

      if (registration.active) {
        getCacheSize();
      }
    } catch (error) {
      console.error('[SW] Registration failed', error instanceof Error ? error.message : String(error));
      setSwStatus('error');
    }
  }, [getCacheSize]);

  const cleanCache = useCallback(() => {
    if (typeof navigator === 'undefined') {
      return;
    }

    const controller = navigator.serviceWorker?.controller;
    if (!controller) {
      return;
    }

    controller.postMessage({ type: 'CLEAN_CACHE' });
    window.setTimeout(() => getCacheSize(), 1000);
  }, [getCacheSize]);

  useEffect(() => {
    setIsHydrated(true);

    if (typeof navigator === 'undefined') {
      setSwStatus('unsupported');
      return;
    }

    if (!('serviceWorker' in navigator)) {
      setSwStatus('unsupported');
      return;
    }

    registerServiceWorker();
  }, [registerServiceWorker]);

  const shouldRenderDebug = isHydrated && enableSwDebugOverlay && isDevEnv;

  return (
    <div className="service-worker-manager">
      {shouldRenderDebug && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>SW: {swStatus}</div>
          {cacheSize > 0 && <div>Cache: {formatBytes(cacheSize)}</div>}
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