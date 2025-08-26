"use client";

import { useEffect } from "react";

export default function HydrationFix() {
  useEffect(() => {
    // Nettoyer l'attribut cz-shortcut-listen ajouté par les extensions de navigateur
    const cleanAttribute = () => {
      const body = document.body;
      if (body && body.hasAttribute('cz-shortcut-listen')) {
        body.removeAttribute('cz-shortcut-listen');
        console.log('HydrationFix: cz-shortcut-listen attribute removed');
      }
    };

    // Nettoyer immédiatement
    cleanAttribute();

    // Nettoyer après un délai pour s'assurer que l'extension a eu le temps d'ajouter l'attribut
    const timeoutId = setTimeout(cleanAttribute, 100);

    // Observer les changements d'attributs sur le body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'cz-shortcut-listen') {
          cleanAttribute();
        }
      });
    });

    // Observer le body pour les changements d'attributs
    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['cz-shortcut-listen']
      });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
}
