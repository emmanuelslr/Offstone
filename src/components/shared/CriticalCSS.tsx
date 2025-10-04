'use client';

import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Critical CSS pour le rendu initial
    const criticalCSS = `
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
      
      /* Critical layout styles */
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
      
      /* Critical navigation styles */
      nav {
        position: relative;
        z-index: 50;
      }
      
      /* Critical hero styles */
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Critical button styles */
      button {
        cursor: pointer;
        border: none;
        background: none;
        font: inherit;
      }
      
      /* Critical image styles */
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      
      /* Critical text styles */
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: 600;
        line-height: 1.2;
      }
      
      p {
        margin: 0;
        line-height: 1.6;
      }
      
      /* Critical responsive styles */
      @media (max-width: 768px) {
        body {
          font-size: 14px;
        }
        
        .hero-section {
          min-height: 80vh;
        }
      }
      
      /* Critical loading states */
      .loading {
        opacity: 0.7;
        pointer-events: none;
      }
      
      /* Critical focus styles */
      *:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }
      
      /* Critical font loading */
      .fonts-loading {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      .fonts-loaded {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
    `;

    // Injecter le CSS critique
    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);

    // Charger le CSS non-critique de manière asynchrone
    const loadNonCriticalCSS = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/globals.css';
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Charger après le rendu initial
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
    } else {
      loadNonCriticalCSS();
    }

    return () => {
      const criticalStyle = document.getElementById('critical-css');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
}
