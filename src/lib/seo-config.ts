// Configuration SEO centralisée pour Offstone

export const seoConfig = {
  // Informations de base
  siteName: 'Offstone',
  siteUrl: 'https://offstone.fr',
  siteDescription: 'Investissez dans l\'immobilier professionnel avec Jonathan Anguelov et Offstone. Accédez à des opérations sélectionnées et à un accompagnement expert.',
  
  // Personne clé
  founder: {
    name: 'Jonathan Anguelov',
    title: 'Fondateur & Investisseur Immobilier',
    description: 'Expert en investissement immobilier professionnel et fondateur d\'Offstone',
    image: '/images/personnalites/jonathan-anguelov.webp'
  },
  
  // Mots-clés principaux
  keywords: {
    primary: ['Jonathan Anguelov', 'Offstone', 'investissement immobilier'],
    secondary: [
      'club de deals immobiliers',
      'immobilier professionnel',
      'diversification patrimoine',
      'accompagnement investissement',
      'deals immobiliers exclusifs',
      'investissement immobilier France',
      'Jonathan Anguelov investisseur',
      'Offstone immobilier',
      'club investisseurs',
      'immobilier professionnel France'
    ],
    longTail: [
      'investir avec Jonathan Anguelov',
      'club de deals Offstone',
      'investissement immobilier professionnel France',
      'accompagnement investisseur immobilier',
      'diversification patrimoine immobilier'
    ]
  },
  
  // Images Open Graph
  images: {
    default: '/images/og-image.webp',
    home: '/images/og-home.webp',
    jonathan: '/images/og-jonathan.webp',
    deals: '/images/og-deals.webp'
  },
  
  // Réseaux sociaux
  social: {
    twitter: '@offstone_fr',
    linkedin: 'https://linkedin.com/company/offstone',
    facebook: 'https://facebook.com/offstone'
  },
  
  // Contact
  contact: {
    email: 'contact@offstone.fr',
    phone: '+33 1 XX XX XX XX',
    address: 'France'
  },
  
  // Services
  services: [
    {
      name: 'Club de Deals Immobiliers',
      description: 'Accès à des opérations immobilières sélectionnées par Jonathan Anguelov',
      url: '/investir'
    },
    {
      name: 'Accompagnement Investissement',
      description: 'Conseil et accompagnement pour vos investissements immobiliers',
      url: '/pourquoi-offstone'
    },
    {
      name: 'Ressources & Formation',
      description: 'Articles, études de cas et webinaires sur l\'investissement immobilier',
      url: '/ressources'
    }
  ],
  
  // Pages importantes
  importantPages: [
    { name: 'Accueil', url: '/' },
    { name: 'Investir', url: '/investir' },
    { name: 'Jonathan Anguelov', url: '/ressources/jonathan-anguelov' },
    { name: 'Nos Réalisations', url: '/nos-realisations' },
    { name: 'Pourquoi Offstone', url: '/pourquoi-offstone' },
    { name: 'Ressources', url: '/ressources' }
  ]
};

// Fonction utilitaire pour générer des métadonnées
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website'
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}) {
  const fullTitle = title.includes('Offstone') ? title : `${title} | Offstone - Jonathan Anguelov`;
  const fullDescription = description.includes('Jonathan Anguelov') ? description : `${description} - Avec Jonathan Anguelov et Offstone`;
  const fullKeywords = [...seoConfig.keywords.primary, ...keywords];
  
  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: url || seoConfig.siteUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: image || seoConfig.images.default,
          width: 1200,
          height: 630,
          alt: `${fullTitle} - ${seoConfig.founder.name}`
        }
      ],
      locale: 'fr_FR',
      type
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image || seoConfig.images.default],
      creator: seoConfig.social.twitter
    },
    alternates: {
      canonical: url || seoConfig.siteUrl
    }
  };
}

// Fonction pour générer des données structurées
export function generateStructuredData(type: string, data: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return baseData;
}
