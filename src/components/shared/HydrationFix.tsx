"use client";

import { useEffect, useState } from "react";

export default function HydrationFix() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
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

    // Supprimer les attributs problématiques ajoutés par les extensions
    const removeProblematicAttributes = () => {
      const elements = document.querySelectorAll('[data-new-gr-c-s-check-loaded], [data-gr-ext-installed]');
      elements.forEach(el => {
        el.removeAttribute('data-new-gr-c-s-check-loaded');
        el.removeAttribute('data-gr-ext-installed');
      });
    };

    removeProblematicAttributes();
    const intervalId = setInterval(removeProblematicAttributes, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);

  // Ne rien rendre côté serveur pour éviter les problèmes d'hydratation
  if (!isClient) {
    return null;
  }

  return null; // Ce composant ne rend rien visuellement
}
