'use client';

import { useEffect } from 'react';

export default function FontOptimizer() {
  useEffect(() => {
    // Preload critical fonts
    const preloadFonts = () => {
      const fontUrls = [
        '/fonts/inter-var.woff2',
        '/fonts/inter-var.woff',
      ];

      fontUrls.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Optimize font loading
    const optimizeFontLoading = () => {
      if ('fonts' in document) {
        // Use Font Loading API for better control
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      } else {
        // Fallback for older browsers
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
        }, 100);
      }
    };

    preloadFonts();
    optimizeFontLoading();
  }, []);

  return null;
}
