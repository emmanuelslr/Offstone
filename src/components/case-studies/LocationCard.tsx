import React from "react";

interface LocationCardProps {
  city?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function LocationCard({ city, address, coordinates }: LocationCardProps) {
  if (!city && !address) return null;

  // Fonction pour extraire l'arrondissement de Paris ou retourner la ville
  const getDisplayLocation = () => {
    if (!city) return null;
    
    // Si c'est Paris avec un code postal (ex: "75018 Paris" ou "75116 Paris")
    if (city.includes('Paris') && city.match(/75\d{3,4}/)) {
      const arrondissement = city.match(/75(\d{3,4})/)?.[1];
      if (arrondissement) {
        const num = parseInt(arrondissement);
        if (num >= 1 && num <= 20) {
          return `${num}${num === 1 ? 'er' : 'e'} arrondissement`;
        }
      }
    }
    
    // Pour les autres villes, retourner la ville complète
    return city;
  };

  const displayLocation = getDisplayLocation();

  // Générer l'URL Google Maps avec les coordonnées ou l'adresse
  const getMapUrl = () => {
    if (coordinates) {
      return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    }
    if (address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    if (displayLocation) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayLocation)}`;
    }
    return null;
  };

  // Coordonnées GPS pour les principales localisations
  const getLocationCoordinates = () => {
    if (coordinates) return coordinates;
    
    if (!displayLocation) return null;
    
    // Coordonnées pour les arrondissements de Paris
    const parisCoordinates: { [key: string]: { lat: number; lng: number } } = {
      '1er arrondissement': { lat: 48.8566, lng: 2.3522 },
      '2e arrondissement': { lat: 48.8698, lng: 2.3412 },
      '3e arrondissement': { lat: 48.8647, lng: 2.3620 },
      '4e arrondissement': { lat: 48.8566, lng: 2.3522 },
      '5e arrondissement': { lat: 48.8449, lng: 2.3450 },
      '6e arrondissement': { lat: 48.8500, lng: 2.3333 },
      '7e arrondissement': { lat: 48.8566, lng: 2.3120 },
      '8e arrondissement': { lat: 48.8756, lng: 2.3117 },
      '9e arrondissement': { lat: 48.8722, lng: 2.3400 },
      '10e arrondissement': { lat: 48.8756, lng: 2.3611 },
      '11e arrondissement': { lat: 48.8575, lng: 2.3700 },
      '12e arrondissement': { lat: 48.8447, lng: 2.3750 },
      '13e arrondissement': { lat: 48.8322, lng: 2.3556 },
      '14e arrondissement': { lat: 48.8333, lng: 2.3264 },
      '15e arrondissement': { lat: 48.8417, lng: 2.3000 },
      '16e arrondissement': { lat: 48.8500, lng: 2.2667 },
      '17e arrondissement': { lat: 48.8833, lng: 2.3167 },
      '18e arrondissement': { lat: 48.8833, lng: 2.3500 },
      '19e arrondissement': { lat: 48.8833, lng: 2.3833 },
      '20e arrondissement': { lat: 48.8667, lng: 2.4000 }
    };
    
    // Coordonnées pour les autres villes
    const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
      'Chilly Mazarin': { lat: 48.7000, lng: 2.3167 },
      'Levallois-Perret': { lat: 48.8967, lng: 2.2889 },
      'Ivry-sur-Seine': { lat: 48.8167, lng: 2.3833 },
      'Vitry-sur-Seine': { lat: 48.7833, lng: 2.4000 },
      'Aubervilliers': { lat: 48.9167, lng: 2.3833 },
      'Drancy': { lat: 48.9167, lng: 2.4500 }
    };
    
    // Chercher dans les arrondissements de Paris
    if (parisCoordinates[displayLocation]) {
      return parisCoordinates[displayLocation];
    }
    
    // Chercher dans les autres villes
    for (const [city, coords] of Object.entries(cityCoordinates)) {
      if (displayLocation.includes(city)) {
        return coords;
      }
    }
    
    return null;
  };

  // Générer l'URL pour l'iframe OpenStreetMap (sans clé API)
  const getEmbedUrl = () => {
    const locationCoords = getLocationCoordinates();
    
    if (locationCoords) {
      const { lat, lng } = locationCoords;
      // Utiliser une carte avec un style plus moderne et des couleurs douces
      return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005},${lat-0.005},${lng+0.005},${lat+0.005}&layer=mapnik&marker=${lat},${lng}`;
    }
    
    if (address) {
      return `https://nominatim.openstreetmap.org/ui/search.html?q=${encodeURIComponent(address)}`;
    }
    
    if (displayLocation) {
      return `https://www.openstreetmap.org/export/embed.html?bbox=-180,-85,180,85&layer=mapnik&q=${encodeURIComponent(displayLocation)}`;
    }
    
    return null;
  };

  const mapUrl = getMapUrl();
  const embedUrl = getEmbedUrl();

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-4">
        {/* Icône de localisation */}
        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Localisation</h2>
      </div>
      
      <div className="space-y-4">
        {displayLocation && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              {displayLocation.includes('arrondissement') ? 'Arrondissement :' : 'Ville :'}
            </span>
            <span className="text-gray-900">{displayLocation}</span>
          </div>
        )}
        
        {address && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Adresse :</span>
            <span className="text-gray-900">{address}</span>
          </div>
        )}
        
        {/* Carte OpenStreetMap intégrée */}
        {embedUrl && (
          <div className="mt-4">
            <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ 
                  border: 0,
                  filter: 'brightness(1.2) contrast(0.9) saturate(0.6) hue-rotate(10deg)'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Carte de localisation - ${displayLocation || address || 'Localisation'}`}
                className="rounded-lg"
              />
            </div>
          </div>
        )}
        
        {mapUrl && (
          <div className="pt-2">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ouvrir dans Google Maps
            </a>
          </div>
        )}
      </div>
    </section>
  );
}