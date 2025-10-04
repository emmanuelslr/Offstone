'use client';

import { useEffect } from 'react';

export default function AccessibilityOptimizer() {
  useEffect(() => {
    // Améliorer l'accessibilité des images
    const optimizeImageAccessibility = () => {
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img) => {
        const src = img.getAttribute('src') || '';
        const filename = src.split('/').pop()?.split('.')[0] || '';
        
        // Générer un alt text basé sur le nom du fichier
        const altText = filename
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        
        img.setAttribute('alt', altText);
      });

      // Améliorer les images avec des alt text redondants
      const imagesWithRedundantAlt = document.querySelectorAll('img[alt*="image"], img[alt*="Image"], img[alt*="photo"], img[alt*="Photo"]');
      imagesWithRedundantAlt.forEach((img) => {
        const currentAlt = img.getAttribute('alt') || '';
        const improvedAlt = currentAlt
          .replace(/\b(image|Image|photo|Photo|picture|Picture)\b/g, '')
          .trim();
        
        if (improvedAlt) {
          img.setAttribute('alt', improvedAlt);
        }
      });
    };

    // Améliorer l'accessibilité des liens
    const optimizeLinkAccessibility = () => {
      const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
      links.forEach((link) => {
        const text = link.textContent?.trim();
        const href = link.getAttribute('href');
        
        // Ajouter des labels pour les liens sans texte descriptif
        if (!text || text.length < 3) {
          if (href?.startsWith('mailto:')) {
            link.setAttribute('aria-label', `Envoyer un email à ${href.replace('mailto:', '')}`);
          } else if (href?.startsWith('tel:')) {
            link.setAttribute('aria-label', `Appeler ${href.replace('tel:', '')}`);
          } else if (href?.startsWith('#')) {
            link.setAttribute('aria-label', `Aller à la section ${href.replace('#', '')}`);
          }
        }
      });
    };

    // Améliorer l'accessibilité des boutons
    const optimizeButtonAccessibility = () => {
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach((button) => {
        const text = button.textContent?.trim();
        
        // Ajouter des labels pour les boutons sans texte descriptif
        if (!text || text.length < 2) {
          const icon = button.querySelector('svg, i, [class*="icon"]');
          if (icon) {
            button.setAttribute('aria-label', 'Bouton d\'action');
          }
        }
      });
    };

    // Améliorer le contraste des couleurs
    const optimizeColorContrast = () => {
      // Ajouter des classes CSS pour améliorer le contraste
      const style = document.createElement('style');
      style.textContent = `
        /* Améliorer le contraste pour l'accessibilité */
        .text-gray-600 {
          color: #374151 !important; /* Améliorer le contraste */
        }
        .text-gray-500 {
          color: #4b5563 !important; /* Améliorer le contraste */
        }
        .bg-gray-100 {
          background-color: #f3f4f6 !important; /* Améliorer le contraste */
        }
        
        /* Focus visible pour l'accessibilité */
        *:focus-visible {
          outline: 2px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }
        
        /* Améliorer la lisibilité */
        .text-sm {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Améliorer la navigation au clavier
    const optimizeKeyboardNavigation = () => {
      // Ajouter des attributs tabindex pour les éléments interactifs
      const interactiveElements = document.querySelectorAll('[role="button"], [role="link"], [role="tab"]');
      interactiveElements.forEach((element) => {
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }
      });

      // Améliorer la navigation des modales
      const modals = document.querySelectorAll('[role="dialog"], [role="modal"]');
      modals.forEach((modal) => {
        if (!modal.hasAttribute('aria-modal')) {
          modal.setAttribute('aria-modal', 'true');
        }
      });
    };

    // Améliorer les formulaires
    const optimizeFormAccessibility = () => {
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      inputs.forEach((input) => {
        const placeholder = input.getAttribute('placeholder');
        const type = input.getAttribute('type');
        
        if (placeholder && !input.hasAttribute('aria-label')) {
          input.setAttribute('aria-label', placeholder);
        }
        
        // Ajouter des descriptions pour les champs obligatoires
        if (input.hasAttribute('required') && !input.hasAttribute('aria-describedby')) {
          const id = `desc-${Math.random().toString(36).substr(2, 9)}`;
          input.setAttribute('aria-describedby', id);
          
          const description = document.createElement('span');
          description.id = id;
          description.className = 'sr-only';
          description.textContent = 'Ce champ est obligatoire';
          input.parentNode?.appendChild(description);
        }
      });
    };

    // Exécuter toutes les optimisations
    optimizeImageAccessibility();
    optimizeLinkAccessibility();
    optimizeButtonAccessibility();
    optimizeColorContrast();
    optimizeKeyboardNavigation();
    optimizeFormAccessibility();

    // Observer les changements du DOM pour appliquer les optimisations aux nouveaux éléments
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Optimiser les nouvelles images
              const newImages = element.querySelectorAll('img:not([alt])');
              newImages.forEach((img) => {
                const src = img.getAttribute('src') || '';
                const filename = src.split('/').pop()?.split('.')[0] || '';
                const altText = filename
                  .replace(/[-_]/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());
                img.setAttribute('alt', altText);
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
