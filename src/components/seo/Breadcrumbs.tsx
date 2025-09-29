'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StructuredData, { breadcrumbStructuredData } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Générer automatiquement les breadcrumbs si non fournis
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Accueil', url: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Mapper les segments aux noms lisibles
      const segmentNames: Record<string, string> = {
        'ressources': 'Ressources',
        'jonathan-anguelov': 'Jonathan Anguelov',
        'investir': 'Investir',
        'nos-realisations': 'Nos Réalisations',
        'notre-histoire': 'Notre Histoire',
        'pourquoi-offstone': 'Pourquoi Offstone',
        'etudes-de-cas': 'Études de Cas',
        'glossaire': 'Glossaire',
        'webinars-videos': 'Webinaires & Vidéos',
        'interviews': 'Interviews',
        'podcasts': 'Podcasts',
        'presse': 'Presse',
        'qui-veut-etre-mon-associe': 'Qui Veut Être Mon Associé',
        'strategie-theses': 'Stratégies & Thèses',
        'outils-modeles': 'Outils & Modèles',
        'legal': 'Mentions Légales',
        'conditions': 'Conditions Générales',
        'confidentialite': 'Confidentialité',
        'conformite': 'Conformité',
        'cookies': 'Cookies',
        'mentions-legales': 'Mentions Légales',
        'reclamations': 'Réclamations',
        'frais': 'Frais'
      };
      
      const name = segmentNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = generateBreadcrumbs();
  
  // Données structurées pour les breadcrumbs
  const structuredData = breadcrumbStructuredData(breadcrumbItems);
  
  return (
    <>
      <StructuredData data={structuredData} />
      <nav 
        aria-label="Fil d'Ariane" 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      >
        {breadcrumbItems.map((item, index) => (
          <div key={item.url} className="flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 mx-2 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url}
                className="hover:text-gray-900 transition-colors"
                title={`Aller à ${item.name}`}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
