'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Optimisations de performance
    const optimizePerformance = () => {
      // Preload des ressources critiques
      const preloadResources = [
        '/fonts/AllianceNo1-Regular.woff2',
        '/images/og-image.webp',
        '/favicon.png'
      ];
      
      preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        if (resource.endsWith('.woff2')) {
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
        } else if (resource.endsWith('.jpg') || resource.endsWith('.png')) {
          link.as = 'image';
        }
        document.head.appendChild(link);
      });
      
      // Optimiser les images lazy loading
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
              }
            }
          });
        });
        
        // Observer toutes les images avec data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
      
      // Optimiser les polices
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }
      
      // Preconnect aux domaines externes
      const preconnectDomains = [
        'https://images.prismic.io',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ];
      
      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };
    
    // Exécuter les optimisations
    optimizePerformance();
    
    // Optimiser le scroll
    let ticking = false;
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Ajouter des classes pour les animations au scroll
          const elements = document.querySelectorAll('[data-animate-on-scroll]');
          elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              element.classList.add('animate-in');
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', optimizeScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizeScroll);
    };
  }, []);

  return null;
}

// Composant pour les métriques de performance
export function PerformanceMetrics() {
  useEffect(() => {
    // Mesurer les métriques Core Web Vitals
    const measurePerformance = () => {
      // First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
            }
          });
        });
        
        try {
          observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
          // Fallback pour les navigateurs plus anciens
        }
      }
      
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Fallback
        }
      }
      
      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // Fallback
        }
      }
    };
    
    measurePerformance();
  }, []);

  return null;
}
