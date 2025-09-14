import React from "react";

export default function HeadlinePillsRow({ values }: { values: string[] }) {
  const list = (values || []).filter(Boolean).slice(0, 4);
  if (!list.length) return null;

  // Définir l'icône et les textes pour chaque type d'information
  const getCardData = (value: string) => {
    if (value.includes('m²') || value.includes('m2')) {
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
        title: '',
        description: 'Superficie totale du bien'
      };
    }
    if (value.includes('chambre') || value.includes('appartement') || value.includes('lot') || value.includes('meublé') || value.includes('poste')) {
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
        ),
        title: '',
        description: 'Nombre de logements disponibles'
      };
    }
    if (value.includes('étoile') || value.includes('niveau') || value.includes('étage') || value.includes('commercial') || value.includes('activité') || value.includes('prime') || value.includes('rooftop') || value.includes('jardin') || value.includes('terrasse') || value.includes('flex') || value.includes('personne') || value.includes('parking') || value.includes('box') || value.includes('créé') || value.includes('complète')) {
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ),
        title: '',
        description: 'Caractéristiques du bien'
      };
    }
    if (value.includes('20') && value.length === 4) {
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        title: '',
        description: 'Année d\'acquisition'
      };
    }
    return {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '',
      description: 'Information du bien'
    };
  };

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {list.map((v, i) => {
        const cardData = getCardData(v);
        return (
          <div
            key={i}
            className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {/* Icône circulaire - alignée en haut */}
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full border border-gray-300 flex items-center justify-center text-gray-600 mt-1">
                {cardData.icon}
              </div>
              
              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <span className="text-xl md:text-2xl font-medium text-black leading-tight break-words">{v}</span>
                </div>
                {cardData.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cardData.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

