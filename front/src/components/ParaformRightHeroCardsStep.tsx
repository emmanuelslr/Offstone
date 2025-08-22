"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from './ParaformRightHeroCardsStep.module.css';

export type CardData = { id: string; image: string };

type Props = {
  cards?: CardData[];
  size?: number;         // carré: largeur = hauteur
  gap?: number;          // gouttière entre slots
  intervalMs?: number;   // durée totale par carte
  className?: string;
};

// Cards par défaut (la liste des images actuelle)
const CARDS: CardData[] = [
  { id: 'c1', image: '/images/rue-la-boetie-11-copie-scaled.jpg' },
  { id: 'c2', image: '/images/saint-honore-114-scaled.jpg' },
  { id: 'c3', image: '/images/passy-scaled.jpg' },
  { id: 'c4', image: '/images/passy-scaled.jpg' },
];

export default function ParaformRightHeroCardsStep({
  cards = CARDS,
  size = 490,
  gap = 12,
  intervalMs = 3500,
  className = "",
}: Props) {
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [active, setActive] = useState(0);

  // N = cards.length
  const base = cards;
  const N = base.length;

  // Tableau sans duplication pour éviter un track trop large : [card0, card1, ..., cardN-1]
  const track = base;

  // Position temporelle lisse entre 0 et N-1
  const [pos, setPos] = useState(0);

  // Marqueurs d'effets par index logique
  const [revealedIndex, setRevealedIndex] = useState<number>(-1);
  const [grayOffIndex, setGrayOffIndex] = useState<number>(-1);
  const [cropStrokeIndex, setCropStrokeIndex] = useState<number>(-1);
  const [overlayIndex, setOverlayIndex] = useState<number>(-1);
  const [overlayLeavingIndex, setOverlayLeavingIndex] = useState<number>(-1);

  // Timings : révélation crop + overlay + gray off
  const [revealMs] = useState(420);   // durée expand crop
  const [overlayStartMs] = useState(280); // quand démarre overlay (pendant crop)
  const [grayOffMs] = useState(350);   // quand retirer gray pour le slot actif

  // Hop configuration
  const [cropPx] = useState(18);
  const [animateTrack] = useState(true);
  const [hopMs] = useState(480);

  // Démarrer l'auto-play avec overlapping
  useEffect(() => {
    if (timeRef.current) clearTimeout(timeRef.current);

    const advance = () => {
      const nextIndex = (active + 1) % N;

      // 1. Démarrer révélation du prochain
      setRevealedIndex(nextIndex);
      setCropStrokeIndex(active);

      // 2. Overlay après overlayStartMs
      setTimeout(() => setOverlayIndex(nextIndex), overlayStartMs);

      // 3. Retirer gray de l'actuel après grayOffMs
      setTimeout(() => setGrayOffIndex(active), grayOffMs);

      // 4. Changer d'active card
      setTimeout(() => {
        setActive(nextIndex);
        setPos(nextIndex);
        
        // Reset états
        setTimeout(() => {
          setRevealedIndex(-1);
          setGrayOffIndex(-1);
          setCropStrokeIndex(-1);
          setOverlayLeavingIndex(overlayIndex);
          setOverlayIndex(-1);
          
          setTimeout(() => setOverlayLeavingIndex(-1), 200);
        }, 200);
      }, revealMs);

      timeRef.current = setTimeout(advance, intervalMs);
    };

    timeRef.current = setTimeout(advance, intervalMs);
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, [active, N, intervalMs, revealMs, overlayStartMs, grayOffMs, overlayIndex]);

  // Hover handlers
  const onEnter = () => { 
    if (timeRef.current) {
      clearTimeout(timeRef.current); 
    }
  };
  const onLeave = () => { };

  // Peek / overlap
  const peekPx = Math.min(Math.round(size * 0.14), Math.floor(size / 2 - 24));
  const slotW  = Math.max(1, size - 2 * peekPx);     // fenêtre visible par carte
  const step   = slotW + gap;

  // CENTRAGE : centre le slot actif (symétrie L/R)
  const centerOffset = (size - slotW) / 2;
  const xRaw = centerOffset - (pos * step);
  const x = Math.round(xRaw);

  // Crop rectangulaire
  const maxInset = Math.floor(size / 2 - 8);
  const sideCrop = Math.min(maxInset, Math.round(cropPx * 5.1));
  const vertCrop = Math.min(maxInset, Math.round(cropPx * 1.5));

  // Rayon d'arrondi unifié
  const radius = 12;

  return (
    <div
      className={[styles['hero-carousel'], className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, aspectRatio: "1 / 1" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={styles.track}
        style={{
          width: `calc(490px * ${track.length})`,
          gap: `${gap}px`,
          transform: `translate3d(${x}px, 0, 0)`,
          transition: animateTrack ? `transform ${hopMs}ms cubic-bezier(0.33, 1, 0.68, 1)` : "none",
        }}
      >
        {track.map((c, i) => {
          const logical = i === 0 ? N - 1 : i === N + 1 ? 0 : i - 1;
          const isRevealed = revealedIndex === logical;
          const isActiveLogical = active === logical;
          const showCropStroke = cropStrokeIndex === logical && !isRevealed;

          // Voile unique : 0 seulement pour la carte active dans la fenêtre "off", sinon 1
          const isGrayOff = grayOffIndex === logical && isActiveLogical;

          // Flags overlay group (cadre+glass)
          const overlayOn  = overlayIndex === logical;
          const overlayOut = overlayLeavingIndex === logical;

          // clip-path avec coins ARRONDIS
          const clip = isRevealed
            ? `inset(0px round ${radius}px)`
            : `inset(${vertCrop}px ${sideCrop}px round ${radius}px)`;

          return (
            <div
              className={`${styles.card}${isActiveLogical ? " is-active" : " is-dim"}`}
              key={`${c.id}-${i}`}
              style={{ width: slotW, height: size }}
            >
              {/* Carte débordante centrée dans le slot → symétrie parfaite L/R */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: size + 2 * peekPx,
                  height: size,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {/* Background révélation */}
                <div className={styles.reveal} style={{ clipPath: clip }}>
                  {/* Media principale */}
                  <div className={styles.media}>
                    <img src={c.image} alt="" loading="lazy" />
                    <div className={styles.tint} />
                    <div className={`${styles.tint} ${isGrayOff ? '' : 'pf-gray'}`} />
                  </div>

                  {/* Cadre blanc EXACT aux insets, seulement au DÉBUT du croppé */}
                  <div
                    className={`${styles['crop-stroke']}${showCropStroke ? " is-on" : ""}`}
                    style={{ 
                      top: vertCrop, 
                      right: sideCrop, 
                      bottom: vertCrop, 
                      left: sideCrop, 
                      borderRadius: `${radius}px`,
                      position: 'absolute'
                    }}
                  />

                  {/* GROUPE OVERLAY (cadre + glass + badge) */}
                  <div
                    className={`${styles['overlay-group']}${overlayOn ? " is-on" : ""}${overlayOut ? " is-leaving" : ""}`}
                    style={{ 
                      top: vertCrop, 
                      right: sideCrop, 
                      bottom: vertCrop, 
                      left: sideCrop, 
                      borderRadius: `${radius}px`,
                      position: 'absolute'
                    }}
                  >
                    {/* Bloc badge + légende en haut-gauche */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <div style={{
                        padding: '4px 8px',
                        background: 'rgba(255,255,255,0.92)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#333'
                      }}>20%</div>
                      <div style={{
                        marginTop: '4px',
                        fontSize: '11px',
                        color: '#ffffff',
                        opacity: 0.92
                      }}>
                        Rendement annuel
                      </div>
                    </div>

                    {/* Cadre bord blanc complet */}
                    <div className={styles.stroke} />

                    {/* Glass overlay bas */}
                    <div className={styles.glass}>
                      <div className={styles['glass-inner']}>
                        <div className={styles['glass-title']}>Bureaux parisiens</div>
                        <div className={styles['glass-sub']}>Investissement locatif premium</div>
                        <div className={styles['glass-meta']}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                          </svg>
                          <span>Sélection Aguesseau</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className={styles.dots}>
        {base.map((_, i) => (
          <div key={i} className={`${styles.dot}${i === active ? " is-active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
