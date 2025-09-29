'use client';

import { useEffect } from 'react';

// Configuration des clusters de contenu pour le SEO
export const contentClusters = {
  // Cluster principal : Jonathan Anguelov
  jonathanAnguelov: {
    pillarPage: '/ressources/jonathan-anguelov',
    supportingPages: [
      '/ressources/jonathan-anguelov/interviews',
      '/ressources/jonathan-anguelov/podcasts',
      '/ressources/jonathan-anguelov/presse',
      '/ressources/jonathan-anguelov/qui-veut-etre-mon-associe'
    ],
    keywords: [
      'jonathan anguelov',
      'fondateur offstone',
      'expert investissement immobilier',
      'investisseur immobilier professionnel'
    ]
  },
  
  // Cluster : Investissement Immobilier
  investissementImmobilier: {
    pillarPage: '/investir',
    supportingPages: [
      '/pourquoi-offstone',
      '/nos-realisations',
      '/ressources/strategie-theses',
      '/ressources/etudes-de-cas'
    ],
    keywords: [
      'investissement immobilier',
      'club de deals immobiliers',
      'investissement immobilier professionnel',
      'deals immobiliers exclusifs'
    ]
  },
  
  // Cluster : Club de Deals
  clubDeals: {
    pillarPage: '/investir',
    supportingPages: [
      '/pourquoi-offstone',
      '/nos-realisations',
      '/ressources/outils-modeles'
    ],
    keywords: [
      'club de deals',
      'club investisseurs',
      'opérations immobilières sélectionnées',
      'accompagnement investissement'
    ]
  },
  
  // Cluster : Ressources & Formation
  ressources: {
    pillarPage: '/ressources',
    supportingPages: [
      '/ressources/etudes-de-cas',
      '/ressources/glossaire',
      '/ressources/webinars-videos',
      '/ressources/outils-modeles',
      '/ressources/strategie-theses'
    ],
    keywords: [
      'ressources investissement immobilier',
      'formation investissement immobilier',
      'guides investissement immobilier',
      'conseils investissement immobilier'
    ]
  }
};

interface ContentClustersProps {
  currentPage: string;
  clusterType?: keyof typeof contentClusters;
}

export default function ContentClusters({ currentPage, clusterType }: ContentClustersProps) {
  useEffect(() => {
    // Générer des données structurées pour les clusters de contenu
    const generateClusterData = () => {
      if (!clusterType) return null;
      
      const cluster = contentClusters[clusterType];
      
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Cluster de contenu - ${clusterType}`,
        "description": `Pages liées au thème ${clusterType}`,
        "numberOfItems": cluster.supportingPages.length + 1,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Page pilier",
            "item": {
              "@type": "WebPage",
              "url": `https://offstone.fr${cluster.pillarPage}`,
              "name": `Page pilier - ${clusterType}`
            }
          },
          ...cluster.supportingPages.map((page, index) => ({
            "@type": "ListItem",
            "position": index + 2,
            "name": `Page support ${index + 1}`,
            "item": {
              "@type": "WebPage",
              "url": `https://offstone.fr${page}`,
              "name": `Page support - ${page}`
            }
          }))
        ]
      };
    };
    
    const clusterData = generateClusterData();
    
    if (clusterData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(clusterData);
      script.id = 'content-cluster-structured-data';
      
      // Remove existing script
      const existingScript = document.getElementById('content-cluster-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        const scriptToRemove = document.getElementById('content-cluster-structured-data');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [currentPage, clusterType]);

  return null;
}

// Fonction pour déterminer le cluster d'une page
export function getClusterForPage(pagePath: string): keyof typeof contentClusters | null {
  if (pagePath.includes('/ressources/jonathan-anguelov')) {
    return 'jonathanAnguelov';
  }
  if (pagePath.includes('/investir') || pagePath.includes('/pourquoi-offstone') || pagePath.includes('/nos-realisations')) {
    return 'investissementImmobilier';
  }
  if (pagePath.includes('/ressources')) {
    return 'ressources';
  }
  return null;
}

// Fonction pour générer des liens internes optimisés
export function generateInternalLinks(currentPage: string, clusterType?: keyof typeof contentClusters) {
  if (!clusterType) return [];
  
  const cluster = contentClusters[clusterType];
  const allPages = [cluster.pillarPage, ...cluster.supportingPages];
  
  // Retourner les pages du cluster sauf la page actuelle
  return allPages.filter(page => page !== currentPage);
}

// Composant pour afficher les liens vers les pages du cluster
export function ClusterLinks({ currentPage, clusterType, className = '' }: {
  currentPage: string;
  clusterType?: keyof typeof contentClusters;
  className?: string;
}) {
  const links = generateInternalLinks(currentPage, clusterType);
  
  if (links.length === 0) return null;
  
  return (
    <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-2">Pages liées</h3>
      <ul className="space-y-1">
        {links.slice(0, 5).map((link, index) => (
          <li key={index}>
            <a 
              href={link}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title={`Page liée au thème ${clusterType}`}
            >
              {link.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
