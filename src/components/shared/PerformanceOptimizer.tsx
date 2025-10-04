'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Optimize resource hints
    const addResourceHints = () => {
      // Preconnect to external domains
      const domains = [
        'https://images.prismic.io',
        'https://static.cdn.prismic.io',
        'https://js-eu1.hs-scripts.com',
        'https://www.clarity.ms',
      ];

      domains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Optimize critical resources
    const optimizeCriticalResources = () => {
      // Preload critical CSS
      const criticalCSS = document.createElement('link');
      criticalCSS.rel = 'preload';
      criticalCSS.href = '/globals.css';
      criticalCSS.as = 'style';
      document.head.appendChild(criticalCSS);

      // Preload critical images
      const criticalImages = [
        '/images/og-image.webp',
        '/favicon.webp',
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src*="clarity"], script[src*="hubspot"]');
      scripts.forEach((script) => {
        if (!script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"]');
      images.forEach((img) => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Run optimizations
    addResourceHints();
    optimizeCriticalResources();
    optimizeThirdPartyScripts();
    optimizeImages();

    // Optimize scroll performance
    const optimizeScroll = () => {
      let ticking = false;
      
      const updateScroll = () => {
        // Add scroll optimizations here if needed
        ticking = false;
      };

      const requestScrollUpdate = () => {
        if (!ticking) {
          requestAnimationFrame(updateScroll);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestScrollUpdate, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestScrollUpdate);
      };
    };

    const cleanup = optimizeScroll();

    return cleanup;
  }, []);

  return null;
}
