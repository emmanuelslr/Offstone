'use client';

import { useEffect } from 'react';

const markFontsLoaded = () => {
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
    return;
  }

  window.setTimeout(() => {
    document.documentElement.classList.add('fonts-loaded');
  }, 100);
};

export default function FontOptimizer() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    markFontsLoaded();
  }, []);

  return null;
}
