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

    // Mesurer les Core Web Vitals
    const measureCoreWebVitals = () => {
      // First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        const fcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
              console.log('📊 FCP:', entry.startTime, 'ms');
            }
          });
        });
        
        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP Observer non supporté');
        }
      }

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
          console.log('📊 LCP:', lastEntry.startTime, 'ms');
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP Observer non supporté');
        }
      }

      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
            console.log('📊 FID:', entry.processingStart - entry.startTime, 'ms');
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID Observer non supporté');
        }
      }

      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: clsValue }));
              console.log('📊 CLS:', clsValue);
            }
          });
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS Observer non supporté');
        }
      }

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
        console.log('📊 TTFB:', ttfb, 'ms');
      }

      // First Meaningful Paint (FMP)
      if ('PerformanceObserver' in window) {
        const fmpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-meaningful-paint') {
              setMetrics(prev => ({ ...prev, fmp: entry.startTime }));
              console.log('📊 FMP:', entry.startTime, 'ms');
            }
          });
        });
        
        try {
          fmpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FMP Observer non supporté');
        }
      }
    };

    // Mesurer les métriques de ressources
    const measureResourceMetrics = () => {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.transferSize > 0) {
              console.log(`📦 ${entry.name}: ${entry.transferSize} bytes, ${entry.duration} ms`);
            }
          });
        });
        
        try {
          resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
          console.warn('Resource Observer non supporté');
        }
      }
    };

    // Mesurer les métriques de navigation
    const measureNavigationMetrics = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        console.log('🚀 Navigation Metrics:');
        console.log('  DNS Lookup:', navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart, 'ms');
        console.log('  TCP Connect:', navigationEntry.connectEnd - navigationEntry.connectStart, 'ms');
        console.log('  Request:', navigationEntry.responseStart - navigationEntry.requestStart, 'ms');
        console.log('  Response:', navigationEntry.responseEnd - navigationEntry.responseStart, 'ms');
        console.log('  DOM Processing:', navigationEntry.domContentLoadedEventEnd - navigationEntry.responseEnd, 'ms');
        console.log('  Load Complete:', navigationEntry.loadEventEnd - navigationEntry.loadEventStart, 'ms');
      }
    };

    // Mesurer les métriques de mémoire
    const measureMemoryMetrics = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('💾 Memory Metrics:');
        console.log('  Used:', Math.round(memory.usedJSHeapSize / 1024 / 1024), 'MB');
        console.log('  Total:', Math.round(memory.totalJSHeapSize / 1024 / 1024), 'MB');
        console.log('  Limit:', Math.round(memory.jsHeapSizeLimit / 1024 / 1024), 'MB');
      }
    };

    // Exécuter les mesures
    measureCoreWebVitals();
    measureResourceMetrics();
    measureNavigationMetrics();
    measureMemoryMetrics();

    // Mesurer les métriques après le chargement complet
    window.addEventListener('load', () => {
      setTimeout(() => {
        measureMemoryMetrics();
        
        // Envoyer les métriques à un service d'analytics (optionnel)
        if (process.env.NODE_ENV === 'production') {
          sendMetricsToAnalytics(metrics);
        }
      }, 1000);
    });

  }, []);

  // Envoyer les métriques à un service d'analytics
  const sendMetricsToAnalytics = (metrics: PerformanceMetrics) => {
    // Exemple d'envoi à Google Analytics
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
        }
      });
    }

    // Exemple d'envoi à Vercel Analytics
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

  // Ne rien rendre côté serveur
  if (typeof window === 'undefined') {
    return null;
  }

  // Afficher les métriques en développement
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-4 right-4 bg-black text-white p-3 rounded-lg text-xs z-50 max-w-xs">
        <div className="font-bold mb-2">📊 Performance Metrics</div>
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

  return null;
}
