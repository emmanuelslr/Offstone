"use client";

import React, { useRef, useEffect, useState } from "react";
import SectionBadge from '../app/home-page/components/SectionBadge';

/**
 * StackedCards (version sticky / écran figé)
 *
 * Comportement:
 * - Grande zone de défilement (wrapper) dont la hauteur = nbCartes * 100vh.
 * - À l'intérieur, un conteneur sticky (top:0) occupant tout le viewport (h-screen).
 * - Au fur et à mesure du scroll, chaque carte vient se placer au-dessus de la précédente.
 * - Sensation d'écran figé jusqu'à ce que toutes les cartes soient empilées, puis on "quitte" la section.
 *
 * Logique:
 * - progressGlobal entre 0 et 1 (0 = début wrapper, 1 = fin).
 * - Pour N cartes, chaque carte a un intervalle (i * step) → ((i+1) * step) où elle s'anime.
 * - step = 1 / N.
 * - Chaque carte apparaît (fade/translate/scale) puis reste posée (immobile) pendant l'empilement des suivantes.
 */

type Card = {
  id: string;
  title: string;
  content: string;
  accent?: string;
};

const DEFAULT_CARDS: Card[] = [
  {
    id: "candidature",
    title: "Candidature en ligne",
    content:
      "Formulaire rapide pour comprendre votre situation patrimoniale, vos objectifs et votre horizon d’investissement. Première validation qualitative.",
  },
  {
    id: "qualification",
    title: "Entretien téléphonique de qualification",
    content:
      "Échange confidentiel afin d’aligner vision, tolérance au risque, attentes de création de valeur et temporalité des engagements.",
  },
  {
    id: "conformite",
    title: "Examen de la candidature",
    content:
      "Diligences réglementaires (KYC / vérifications légères) réalisées avec exigence mais sans lourdeur, dans un cadre sécurisé.",
  },
  {
    id: "admission",
    title: "Adhésion & espace privé",
    content:
      "Accès à votre espace investisseur : documentation, opérations à venir, historique et modalités d’allocation structurées.",
  },
  {
    id: "allocation",
    title: "Allocation & suivi",
    content:
      "Sélection des opportunités pertinentes, souscription digitale guidée puis reporting clair des opérations et indicateurs clés.",
  },
];

interface StackedCardsProps {
  cards?: Card[];
  className?: string;
  /** hauteur de chaque fenêtre virtuelle (par défaut 100vh) */
  viewportUnit?: number;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const StackedCards: React.FC<StackedCardsProps> = ({
  cards = DEFAULT_CARDS,
  className = "",
  viewportUnit = 100,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight; // zone où la progression évolue
      const scrolled = -rect.top; // calcul original pour que toutes les cartes s'empilent
      const p = clamp(scrolled / totalScrollable);
      setProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [cards.length]);

  // Capture hauteur viewport pour animation "arrive du bas"
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const step = 1 / cards.length; // Revenir à la vitesse normale

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full pt-16 pb-0 ${className}`}
      style={{
        // Hauteur encore réduite pour accélérer davantage le défilement des cartes
        height: `calc(${cards.length * 0.35 + 1} * ${viewportUnit}vh)`,
      }}
    >
      {/* Conteneur sticky qui reste plein écran */}
      <div className="sticky top-[15vh] h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#F7F5F2' }}>
        {/* Contexte (optionnel) */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center pt-24 pb-2">
          <SectionBadge colorClass="text-gray-600" text="MÉTHODE" />
          <h2 className="mt-0 mb-1 text-center text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] px-1 max-w-4xl">
            Comment candidater pour investir à mes côtés ?
          </h2>
        </div>

        {/* Pile des cartes */}
        <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mt-16">
          {cards.map((card, i) => {
            // Progression spécifique pour cette carte
            // start = i * step ; end = (i+1) * step
            const localRaw = (progress - i * step) / step;
            const local = clamp(localRaw);

            // Animation différente : 
            // - La première carte (i=0) est déjà en place et ne bouge pas
            // - Les autres viennent du bas et glissent vers le haut
            let translateY = 0;
            let opacity = 1;
            let scale = 1;
            
            if (i === 0) {
              // Première carte : toujours en place, juste apparition
              opacity = progress > 0 ? 1 : 0;
            } else {
              // Cartes suivantes : viennent du bas
              const startY = vh ? vh * 0.8 : 400;
              translateY = startY * (1 - local);
              opacity = local < 0.1 ? 0 : local < 0.3 ? (local - 0.1) / 0.2 : 1;
              scale = 0.95 + local * 0.05;
            }

            // Z-index pour que la dernière carte (i élevé) soit au-dessus
            const z = 10 + i;

            // Légère ombre + ring pour séparation visuelle
            return (
              <div
                key={card.id}
                className="absolute inset-0 flex items-start justify-center"
                style={{ zIndex: z, marginTop: "-7rem" }}
              >
                <div
                  className="will-change-transform w-full max-w-[800px] mx-auto"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    transition:
                      "transform 0.5s cubic-bezier(.22,.99,.39,1), opacity 0.5s ease",
                  }}
                >
                  <div
                    className="relative rounded-lg overflow-hidden shadow-md border text-[#111] border-[#E1D8D1]"
                    style={{
                      backgroundColor: i % 2 === 0 ? '#EFEAE7' : '#E5DDD7',
                      minHeight: "42vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div className="relative px-8 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10">
                      <div className="flex items-start gap-4">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs sm:text-sm font-medium tracking-tight flex-shrink-0 ${
                          i % 2 === 0 ? "bg-[#111] text-white" : "border border-[#111] text-[#111]"
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[clamp(1.2rem,2vw,1.7rem)] font-semibold leading-[1.04] tracking-tight relative after:content-[''] after:block after:mt-3 after:h-[2px] after:w-8 after:bg-[#111]/10">
                            {card.title}
                          </h3>
                          <p className="mt-4 text-[#373938] text-sm sm:text-base md:text-[1.02rem] leading-relaxed font-light max-w-[65ch]">
                            {card.content}
                          </p>
                          {i === cards.length - 1 && (
                            <div className="mt-6">
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full text-xs sm:text-sm md:text-[0.9rem] px-6 py-2.5 bg-[#111] text-white hover:bg-[#222] transition-colors"
                              >
                                Candidater
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default StackedCards;
