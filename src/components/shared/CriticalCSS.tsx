'use client';

import { useEffect } from 'react';

const CRITICAL_CSS = `
  /* Critical CSS - Above the fold */
  * {
    box-sizing: border-box;
  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    line-height: 1.6;
  }

  .min-h-screen {
    min-height: 100vh;
  }

  .w-full {
    width: 100%;
  }

  .bg-white {
    background-color: #ffffff;
  }

  .text-black {
    color: #000000;
  }

  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  nav {
    position: relative;
    z-index: 50;
  }

  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.2;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    .hero-section {
      min-height: 80vh;
    }
  }

  .loading {
    opacity: 0.7;
    pointer-events: none;
  }

  *:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .fonts-loading {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .fonts-loaded {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
`;

const injectCriticalStyles = () => {
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = CRITICAL_CSS;
  document.head.insertBefore(style, document.head.firstChild);
  return () => style.remove();
};

export default function CriticalCSS() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const removeCriticalStyles = injectCriticalStyles();
    return removeCriticalStyles;
  }, []);

  return null;
}
