'use client';

import Script from 'next/script';
import { useMemo, useEffect, useState } from 'react';

type Props = {
  email?: string;
  firstname?: string;
  lastname?: string;
  className?: string;
};

export default function HubSpotMeeting({ email, firstname, lastname, className = '' }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const src = useMemo(() => {
    const p = new URLSearchParams({ embed: 'true' });
    if (email) p.set('email', email);
    if (firstname) p.set('firstname', firstname);
    if (lastname) p.set('lastname', lastname);
    
    // Paramètres pour améliorer l'affichage mobile
    if (isMobile) {
      p.set('embed', 'true');
      p.set('hideEventTypeDetails', 'true');
      p.set('hideLandingPageDetails', 'true');
    }

    return `https://meetings-eu1.hubspot.com/emmanuel-schmidt-le-roi/prospect-formulaire-website?${p.toString()}`;
  }, [email, firstname, lastname, isMobile]);

  // Gérer le chargement du script HubSpot
  useEffect(() => {
    const handleScriptLoad = () => {
      setIsLoaded(true);
    };

    // Vérifier si le script est déjà chargé
    if (typeof window !== 'undefined' && (window as any).HubSpotConversations) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${isMobile ? 'h-80' : 'h-[680px]'} ${className}`}>
          <div className="text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-xs text-gray-600">Chargement du calendrier...</p>
          </div>
        </div>
      )}

      {/* HubSpot container */}
      <div
        className={`meetings-iframe-container ${isLoaded ? 'block' : 'hidden'} ${className}`}
        data-src={src}
        style={{ 
          minHeight: isMobile ? 350 : 680, 
          width: '100%',
          margin: 0,
          padding: 0,
          // Améliorer l'affichage mobile
          ...(isMobile && {
            minHeight: 350,
            maxHeight: '50vh',
            overflow: 'hidden',
            margin: 0,
            padding: 0
          })
        }}
      />
      
      {/* CSS personnalisé pour HubSpot mobile */}
      {isMobile && (
        <style jsx>{`
          .meetings-iframe-container iframe {
            height: 350px !important;
            max-height: 50vh !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .meetings-iframe-container .hs-form {
            padding: 0px !important;
            margin: 0 !important;
          }
          .meetings-iframe-container .hs-form .hs-form-field {
            margin-bottom: 2px !important;
          }
          .meetings-iframe-container .calendar-container {
            height: 280px !important;
            overflow-y: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `}</style>
      )}
    </>
  );
}


