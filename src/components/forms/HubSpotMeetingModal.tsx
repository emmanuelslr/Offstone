'use client';

import { useEffect, useState } from 'react';
import HubSpotMeeting from './HubSpotMeeting';

type Props = {
  email?: string;
  firstname?: string;
  lastname?: string;
  isOpen: boolean;
  onClose: () => void;
};

const MOBILE_BREAKPOINT = 1024;

export default function HubSpotMeetingModal({
  email,
  firstname,
  lastname,
  isOpen,
  onClose,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!isOpen || !isMobile) {
      return;
    }

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = 'hidden';

    return () => {
      style.overflow = previousOverflow;
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  if (!isMobile) {
    return (
      <div className="w-full h-full">
        <HubSpotMeeting
          email={email}
          firstname={firstname}
          lastname={lastname}
          className="h-full"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-stretch justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0A1E42] via-[#112C63] to-[#0A1E42] text-white shadow-[0_24px_60px_rgba(3,12,29,0.55)]">
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div className="space-y-2 pr-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">Étape 3 sur 6</p>
            <h3 className="text-lg font-semibold leading-snug">
              Choisissez un créneau avec notre équipe relations investisseurs.
            </h3>
            <p className="text-sm text-white/70">
              Si vous changez d'avis, revenez à la question précédente ou poursuivez sans rendez-vous.
            </p>
          </div>
          <button
            onClick={onClose}
            className="-mr-2 -mt-2 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Fermer"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="h-full w-full rounded-2xl border border-white/10">
            <HubSpotMeeting
              email={email}
              firstname={firstname}
              lastname={lastname}
              className="h-full"
            />
          </div>
        </div>

        <div className="px-6 pb-8 pt-4">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-[#F7B096] py-3 text-base font-semibold text-[#0A1E42] shadow-lg shadow-[#F7B096]/30 transition hover:opacity-90"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
