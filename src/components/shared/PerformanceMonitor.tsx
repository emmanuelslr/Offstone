'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  fmp: number | null;
}

const enablePerformanceOverlay = process.env.NEXT_PUBLIC_SHOW_PERFORMANCE_OVERLAY === 'true';
const isDevEnv = process.env.NODE_ENV === 'development';

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fmp: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: PerformanceObserver[] = [];

    // Mesurer les Core Web Vitals
    const measureCoreWebVitals = () => {
      // First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        const fcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
            }
          });
        });

        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
          observers.push(fcpObserver);
        } catch (e) {
          // FCP observer not supported
        }
      }

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          observers.push(lcpObserver);
        } catch (e) {
          // LCP observer not supported
        }
      }

      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            setMetrics((prev) => ({ ...prev, fid: entry.processingStart - entry.startTime }));
            console.log('[Perf] FID:', entry.processingStart - entry.startTime, 'ms');
          });
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
          observers.push(fidObserver);
        } catch (e) {
          console.warn('FID observer not supported');
        }
      }

      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics((prev) => ({ ...prev, cls: clsValue }));
              console.log('[Perf] CLS:', clsValue);
            }
          });
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          observers.push(clsObserver);
        } catch (e) {
          console.warn('CLS observer not supported');
        }
      }

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setMetrics((prev) => ({ ...prev, ttfb }));
        console.log('[Perf] TTFB:', ttfb, 'ms');
      }

      // First Meaningful Paint (FMP)
      if ('PerformanceObserver' in window) {
        const fmpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-meaningful-paint') {
              setMetrics((prev) => ({ ...prev, fmp: entry.startTime }));
              console.log('[Perf] FMP:', entry.startTime, 'ms');
            }
          });
        });

        try {
          fmpObserver.observe({ entryTypes: ['paint'] });
          observers.push(fmpObserver);
        } catch (e) {
          console.warn('FMP observer not supported');
        }
      }
    };

    // Mesurer les metriques de ressources
    const measureResourceMetrics = () => {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.transferSize > 0) {
              console.log('[Perf] Resource:', entry.name, `${entry.transferSize} bytes`, `${entry.duration} ms`);
            }
          });
        });

        try {
          resourceObserver.observe({ entryTypes: ['resource'] });
          observers.push(resourceObserver);
        } catch (e) {
          console.warn('Resource observer not supported');
        }
      }
    };

    // Mesurer les metriques de navigation
    const measureNavigationMetrics = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        // Navigation metrics collected
      }
    };

    // Mesurer les metriques de memoire
    const measureMemoryMetrics = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        // Memory metrics collected
      }
    };

    // Executer les mesures
    measureCoreWebVitals();
    measureResourceMetrics();
    measureNavigationMetrics();
    measureMemoryMetrics();

    // Mesurer les metriques apres le chargement complet
    const handleLoad = () => {
      setTimeout(() => {
        measureMemoryMetrics();

        // Envoyer les metriques a un service d'analytics (optionnel)
        if (process.env.NODE_ENV === 'production') {
          // Use current metrics state instead of stale closure
          setMetrics((currentMetrics) => {
            sendMetricsToAnalytics(currentMetrics);
            return currentMetrics;
          });
        }
      }, 1000);
    };

    window.addEventListener('load', handleLoad);

    // Cleanup function
    return () => {
      // Disconnect all observers
      observers.forEach(observer => {
        try {
          observer.disconnect();
        } catch (e) {
          // Observer already disconnected
        }
      });
      
      // Remove event listener
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Envoyer les metriques a un service d'analytics
  const sendMetricsToAnalytics = (metrics: PerformanceMetrics) => {
    // Exemple d'envoi a Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: 'Core Web Vitals',
        value: Math.round(metrics.lcp || 0),
        custom_map: {
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          fid: metrics.fid,
          cls: metrics.cls,
          ttfb: metrics.ttfb,
        },
      });
    }

    // Exemple d'envoi a Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'Performance Metrics', {
        fcp: metrics.fcp,
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls,
        ttfb: metrics.ttfb,
      });
    }
  };

  // Ne rien rendre cote serveur
  if (typeof window === 'undefined') {
    return null;
  }

  const shouldRenderOverlay = enablePerformanceOverlay && isDevEnv;

  if (!shouldRenderOverlay) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-3 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">[Perf] Metrics</div>
      <div className="space-y-1">
        {metrics.fcp && <div>FCP: {Math.round(metrics.fcp)}ms</div>}
        {metrics.lcp && <div>LCP: {Math.round(metrics.lcp)}ms</div>}
        {metrics.fid && <div>FID: {Math.round(metrics.fid)}ms</div>}
        {metrics.cls !== null && <div>CLS: {metrics.cls.toFixed(3)}</div>}
        {metrics.ttfb && <div>TTFB: {Math.round(metrics.ttfb)}ms</div>}
        {metrics.fmp && <div>FMP: {Math.round(metrics.fmp)}ms</div>}
      </div>
    </div>
  );
}