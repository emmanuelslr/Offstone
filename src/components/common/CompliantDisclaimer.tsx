"use client";

import React from "react";

export const LISTING_TEXT =
  "Réalisations historiques conduites par les associés d'Offstone. Informations descriptives et non contractuelles ; ceci ne constitue ni une offre au public ni une communication promotionnelle sur un instrument financier. Les performances passées ne préjugent pas des performances futures.";

export const CARD_BADGE_TEXT =
  "Acquis par les associés d'Offstone";

export const DETAIL_BANNER_TEXT =
  "Réalisation passée. Données factuelles. Aucun appel à souscription. Pour investir avec Offstone, l'accès éventuel aux offres se fait après éligibilité.";

export function CompliantBanner({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`rounded-md border border-gray-300 bg-white text-gray-800 text-sm leading-relaxed p-4 ${className}`}>
      {text}
    </div>
  );
}

export function ComplianceBadge({ className = "", text }: { className?: string; text?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-black/70 text-white text-xs px-2 py-1 backdrop-blur-sm ${className}`}
    >
      {text || CARD_BADGE_TEXT}
    </span>
  );
}

export default CompliantBanner;
