'use client';

import { useEffect } from 'react';

interface LocalSEOProps {
  businessName: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website: string;
  description: string;
  services: string[];
  founder?: {
    name: string;
    title: string;
  };
}

export default function LocalSEO({
  businessName,
  address,
  city,
  country,
  postalCode,
  phone,
  email,
  website,
  description,
  services,
  founder
}: LocalSEOProps) {
  useEffect(() => {
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": businessName,
      "description": description,
      "url": website,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address,
        "addressLocality": city,
        "addressCountry": country,
        ...(postalCode && { "postalCode": postalCode })
      },
      "areaServed": {
        "@type": "Country",
        "name": country
      },
      "serviceArea": {
        "@type": "Country",
        "name": country
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services d'Investissement Immobilier",
        "itemListElement": services.map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service
          }
        }))
      },
      ...(phone && { "telephone": phone }),
      ...(email && { "email": email }),
      ...(founder && {
        "founder": {
          "@type": "Person",
          "name": founder.name,
          "jobTitle": founder.title
        }
      })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessData);
    script.id = 'local-business-structured-data';
    
    // Remove existing script
    const existingScript = document.getElementById('local-business-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById('local-business-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [businessName, address, city, country, postalCode, phone, email, website, description, services, founder]);

  return null;
}

// Configuration par défaut pour Offstone
export const offstoneLocalSEO = {
  businessName: "Offstone",
  address: "France",
  city: "Paris",
  country: "France",
  website: "https://offstone.fr",
  description: "Offstone est un club de deals immobiliers exclusif fondé par Jonathan Anguelov, expert en investissement immobilier professionnel.",
  services: [
    "Club de Deals Immobiliers",
    "Accompagnement Investissement Immobilier",
    "Conseil en Diversification Patrimoniale",
    "Sélection d'Opérations Immobilières",
    "Formation Investissement Immobilier"
  ],
  founder: {
    name: "Jonathan Anguelov",
    title: "Fondateur & Investisseur Immobilier"
  }
};
