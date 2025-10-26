'use client';

import { useEffect } from 'react';

const PRECONNECT_DOMAINS = [
  'https://images.prismic.io',
  'https://static.cdn.prismic.io',
  'https://js-eu1.hs-scripts.com',
  'https://www.clarity.ms',
];

const CRITICAL_IMAGES = ['/images/og-image.webp', '/favicon.webp'];

const addPreconnects = () => {
  PRECONNECT_DOMAINS.forEach((domain) => {
    if (document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

const preloadImages = () => {
  CRITICAL_IMAGES.forEach((src) => {
    if (document.querySelector(`link[rel="preload"][as="image"][href="${src}"]`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

const deferThirdPartyScripts = () => {
  const scripts = document.querySelectorAll<HTMLScriptElement>('script[src*="clarity"], script[src*="hubspot"]');
  scripts.forEach((script) => {
    if (!script.hasAttribute('defer')) {
      script.setAttribute('defer', '');
    }
  });
};

const enhanceImages = () => {
  const images = document.querySelectorAll<HTMLImageElement>('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"]');
  images.forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
};

const setupScrollScheduler = () => {
  let ticking = false;

  const requestScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  return () => {
    window.removeEventListener('scroll', requestScrollUpdate);
  };
};

export default function PerformanceOptimizer() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    addPreconnects();
    preloadImages();
    deferThirdPartyScripts();
    enhanceImages();

    return setupScrollScheduler();
  }, []);

  return null;
}
