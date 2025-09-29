'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Vérifier que les données existent et sont valides
    if (!data || typeof data !== 'object') {
      console.warn('StructuredData: Invalid data provided');
      return;
    }

    try {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      script.id = 'structured-data';
      
      // Remove existing structured data with same ID
      const existingScript = document.getElementById('structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        const scriptToRemove = document.getElementById('structured-data');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    } catch (error) {
      console.error('StructuredData: Error creating script:', error);
    }
  }, [data]);

  return null;
}

// Données structurées pour la page d'accueil
export const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Offstone",
  "alternateName": "Offstone Investissement",
  "url": "https://offstone.fr",
  "description": "Investissez dans l'immobilier professionnel avec Jonathan Anguelov et Offstone. Accédez à des opérations sélectionnées et à un accompagnement expert.",
  "publisher": {
    "@type": "Organization",
    "name": "Offstone",
    "founder": {
      "@type": "Person",
      "name": "Jonathan Anguelov",
      "jobTitle": "Fondateur & Investisseur Immobilier"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://offstone.fr/ressources?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Données structurées pour les services
export const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Club de Deals Immobiliers Offstone",
  "description": "Accès à des opérations immobilières sélectionnées avec accompagnement expert de Jonathan Anguelov",
  "provider": {
    "@type": "Organization",
    "name": "Offstone",
    "founder": {
      "@type": "Person",
      "name": "Jonathan Anguelov"
    }
  },
  "serviceType": "Investissement Immobilier",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "offers": {
    "@type": "Offer",
    "description": "Club de deals immobiliers exclusifs",
    "category": "Investissement Immobilier"
  }
};

// Données structurées pour les FAQ
export const faqStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Données structurées pour les breadcrumbs
export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
