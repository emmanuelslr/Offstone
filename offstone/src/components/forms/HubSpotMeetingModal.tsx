'use client';

import { useState, useEffect } from 'react';
import HubSpotMeeting from './HubSpotMeeting';

type Props = {
  email?: string;
  firstname?: string;
  lastname?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function HubSpotMeetingModal({ 
  email, 
  firstname, 
  lastname, 
  isOpen, 
  onClose 
}: Props) {
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

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Sur desktop, afficher inline (pas de modal)
  if (!isMobile) {
    return (
      <div className="w-full">
        <HubSpotMeeting
          email={email}
          firstname={firstname}
          lastname={lastname}
          className="w-full"
        />
      </div>
    );
  }

  // Sur mobile, afficher le modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full h-full max-h-screen bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">
            Choisissez un créneau
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <svg 
              className="w-5 h-5 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <div className="h-full w-full">
            <HubSpotMeeting
              email={email}
              firstname={firstname}
              lastname={lastname}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continuer sans rendez-vous
          </button>
        </div>
      </div>
    </div>
  );
}
