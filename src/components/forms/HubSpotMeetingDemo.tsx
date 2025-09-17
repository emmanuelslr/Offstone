'use client';

import { useState } from 'react';
import HubSpotMeetingModal from './HubSpotMeetingModal';

export default function HubSpotMeetingDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Test du Modal HubSpot</h2>
      <p className="text-gray-600 mb-6">
        Cliquez sur le bouton ci-dessous pour tester le modal HubSpot sur mobile.
      </p>
      
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Ouvrir le calendrier
      </button>

      <HubSpotMeetingModal
        email="test@example.com"
        firstname="Test"
        lastname="User"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
