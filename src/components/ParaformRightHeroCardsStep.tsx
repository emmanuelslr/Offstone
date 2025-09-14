"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export type CardData = { id: string; image: string };

type Props = {
  cards?: CardData[];
  size?: number;         // carré: largeur = hauteur
  gap?: number;          // gouttière entre slots
  intervalMs?: number;   // durée totale par carte
  cropPx?: number;       // base de crop (amplifiée ci-dessous)
  pauseOnHover?: boolean;
  className?: string;
};

export default function ParaformRightHeroCardsStep({
  cards,
  size = 720,
  gap = 6,               // espace global entre slots — réduit au minimum
  intervalMs = 2600,
  cropPx = 96,
  className,
}: Props) {
  // Ordre fixe
  const base = useMemo<CardData[]>(
    () =>
      (cards && cards.length
        ? cards
        : [
            { id: "2barbes", image: "/images/Buildings/2barbes.PNG" },
            { id: "truchet", image: "/images/Buildings/Truchet.jpg" },
            { id: "ienaa", image: "/images/Buildings/Ienaa.jpg" },
          ]).slice(0, 3),
    [cards]
  );
  const N = base.length;

  // Track avec sentinelles
  const track = useMemo(() => {
    const cloneLast: CardData = { ...base[N - 1], id: base[N - 1].id + "-cloneLast" };
    const cloneFirst: CardData = { ...base[0], id: base[0].id + "-cloneFirst" };
    return [cloneLast, ...base, cloneFirst];
  }, [base, N]);

  // États
  const [active, setActive] = useState(0);  // index logique [0..N-1]
  const [pos, setPos] = useState(1);        // index physique [0..N+1]
  const [animateTrack, setAnimateTrack] = useState(true);

  // GROUPE overlay (cadre + glass)
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);          // affiche le groupe
  const [overlayLeavingIndex, setOverlayLeavingIndex] = useState<number | null>(null); // zoom de sortie

  const [revealedIndex, setRevealedIndex] = useState<number | null>(null); // image full reveal
  const [cropStrokeIndex, setCropStrokeIndex] = useState<number | null>(0);// cadre de crop au début

  // Voile gris : qui est **désactivé** (opacity 0) ?
  const [grayOffIndex, setGrayOffIndex] = useState<number | null>(null);

  // Refs planif
  const activeRef = useRef(0);
  const posRef = useRef(1);
  const hoverRef = useRef(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  // Pause when global waitlist modal is open
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    const onOpened = () => setPaused(true);
    const onClosed = () => setPaused(false);
    try {
      window.addEventListener('waitlist:opened', onOpened);
      window.addEventListener('waitlist:closed', onClosed);
    } catch {}
    return () => {
      try {
        window.removeEventListener('waitlist:opened', onOpened);
        window.removeEventListener('waitlist:closed', onClosed);
      } catch {}
    };
  }, []);

  // ---- Timings (smooth) ----
  const hopMs = Math.round(Math.min(420, Math.max(320, intervalMs * 0.15))); // ~390ms si 2600ms
  const decropStart = hopMs + 20;                 // décrop juste après le hop
  const decropEnd   = Math.round(decropStart + intervalMs * 0.20);
  const holdEnd     = Math.round(decropEnd   + intervalMs * 0.35);
  const recropEnd   = Math.round(holdEnd     + intervalMs * 0.16);

  // Voile gris — image **dégrisées tôt** & gris qui **revient plus tôt**
  const grayFadeMs     = 380;   // fade court
  const grayOutLeadMs  = 9999;  // énorme → planifié à 0ms (immédiat)
  const grayInPhase    = 0.70;  // revient plus tôt pendant le recrop

  // Durées du groupe overlay (dézoom à l’apparition, zoom à la disparition)
  const overlayEnterMs = 360;
  const overlayLeaveMs = 220;

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };
  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    return;
  };

  // Cycle principal
  useEffect(() => {
    const run = () => {
      if (hoverRef.current || pausedRef.current) { schedule(run, 120); return; }

      const idx = activeRef.current;

      // Reset phase
      setRevealedIndex(null);
      setOverlayIndex(null);
      setOverlayLeavingIndex(null);

      // Voile gris : **immédiatement** on enlève le gris de l'active (fade → 0)
      setGrayOffIndex(null);
      schedule(() => setGrayOffIndex(idx), Math.max(0, decropStart - grayOutLeadMs));

      // Cadre de crop (bref) au tout début, puis disparaît AVANT le décrop
      setCropStrokeIndex(idx);
      schedule(() => setCropStrokeIndex(null), Math.max(0, decropStart - 220));

      // Décrop → full reveal
      schedule(() => setRevealedIndex(idx), decropStart);

      // Apparition GROUPE (cadre + glass) — **dézoom** (scale > 1 → 1)
      schedule(() => {
        setOverlayLeavingIndex(null);
        setOverlayIndex(idx);
      }, decropStart + 40);

      // Début recrop : disparition GROUPE — **zoom** (1 → > 1) puis on cache
      schedule(() => {
        setOverlayLeavingIndex(idx);
        schedule(() => {
          setOverlayIndex((cur) => (cur === idx ? null : cur));
          setOverlayLeavingIndex((cur) => (cur === idx ? null : cur));
        }, overlayLeaveMs);
      }, holdEnd);

      // Fin de lecture → recrop image
      schedule(() => setRevealedIndex(null), holdEnd);

      // Le voile gris revient **tôt** pendant le recrop
      const grayInStart = Math.round(holdEnd + (recropEnd - holdEnd) * grayInPhase);
      schedule(() => setGrayOffIndex(null), grayInStart);

      // Avance
      schedule(() => {
        const nextActive = (activeRef.current + 1) % N;
        const nextPos = posRef.current + 1;

        activeRef.current = nextActive;
        setActive(nextActive);

        setAnimateTrack(true);
        posRef.current = nextPos;
        setPos(nextPos);

        if (nextPos === N + 1) {
          // wrap → 1er réel
          schedule(() => {
            setAnimateTrack(false);
            posRef.current = 1;
            setPos(1);
            requestAnimationFrame(() => setAnimateTrack(true));
          }, hopMs + 20);
        }

        // reset voile par défaut
        setGrayOffIndex(null);

        schedule(run, Math.max(0, intervalMs - recropEnd));
      }, recropEnd);
    };

    clearAll();
    run();
    return clearAll;

  }, [intervalMs, N, hopMs, decropStart, decropEnd, holdEnd, recropEnd, grayOutLeadMs, grayInPhase, overlayEnterMs, overlayLeaveMs]);

  // Hover pause
  const onEnter = () => {};
  const onLeave = () => {};

  // Peek / overlap — on affiche davantage les voisines
  const peekPx  = Math.min(Math.round(size * 0.22), Math.floor(size / 2 - 24));
  const slotW   = Math.max(1, size - 2 * peekPx);     // fenêtre visible par carte
  const step    = slotW + gap;

  // CENTRAGE : centre le slot actif (symétrie L/R)
  const centerOffset = (size - slotW) / 2;
  const xRaw = centerOffset - (pos * step);
  const x = Math.round(xRaw);

  // ===== Crop rectangulaire — adapté à la taille pour éviter la superposition sur mobile =====
  const maxInset = Math.floor(size / 2 - 8);
  let sideCrop: number;
  let vertCrop: number;
  if (size < 480) {
    // Mobile: fenêtre plus large pour laisser respirer badge + glass
    sideCrop = Math.min(maxInset, Math.round(size * 0.18));
    vertCrop = Math.min(maxInset, Math.round(size * 0.12));
  } else if (size < 680) {
    // Tablette petite
    sideCrop = Math.min(maxInset, Math.round(size * 0.22));
    vertCrop = Math.min(maxInset, Math.round(size * 0.14));
  } else {
    // Desktop: comportement initial préservé
    sideCrop = Math.min(maxInset, Math.round(cropPx * 3.45));
    vertCrop = Math.min(maxInset, Math.round(cropPx * 1.22));
  }
  // Padding interne du cadre blanc pour le rendre moins large que la zone clippée
  // Accentué sur mobile pour un cadre encore plus étroit
  const framePad = size < 360 ? 26 : size < 480 ? 22 : size < 680 ? 18 : 16;

  // Rayon d’arrondi unifié
  const radius = 12;

  return (
    <div
      className={["pf-hero-carousel", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, aspectRatio: "1 / 1" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className="pf-track"
        style={{
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

          // Personnalisation de la première carte uniquement
          let glassTitle = "MAISON IENA";
          let glassSub = "Hôtel | Value-Add | Paris 16ème";
          if (logical === 0) {
            glassTitle = "MAISON BOÉTIE";
            glassSub = "Événementiel | Value-Add | Paris 8ème";
          }

          return (
            <div
              className={"pf-card" + (isActiveLogical ? " is-active" : " is-dim")}
              key={`${c.id}-${i}`}
              style={{ width: slotW, height: size }}
            >
              {/* Carte débordante centrée dans le slot → symétrie parfaite L/R */}
              <div
                className="pf-card-abs"
                style={{
                  width: size + 2 * peekPx,
                  height: size,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="pf-frame">
                  {/* Image clippée (crop/décrop) avec arrondi via 'round' */}
                  <div
                    className={"pf-reveal" + (isRevealed ? " is-revealed" : "")}
                    style={{ clipPath: clip }}
                  >
                    <Image src={c.image} alt="" fill className="pf-media" draggable={false} />

                    {/* Filtre couleur permanent */}
                    <div className="pf-tint" />

                    {/* VOILE GRIS - unique */}
                    <div className={"pf-gray" + (isGrayOff ? " is-off" : "") } />

                    {/* Cadre blanc EXACT aux insets, seulement au DÉBUT du croppé */}
                    <div
                      className={"pf-crop-stroke" + (showCropStroke ? " is-on" : "")}
                      style={{ top: vertCrop, right: sideCrop, bottom: vertCrop, left: sideCrop, borderRadius: `${radius}px` }}
                    />

                    {/* ===== GROUPE OVERLAY (cadre + glass + badge) ===== */}
                    <div
                      className={
                        "pf-overlay-group" +
                        (overlayOn ? " is-on" : "") +
                        (overlayOut ? " is-leaving" : "")
                      }
                      style={{ top: vertCrop + framePad, right: sideCrop + framePad, bottom: vertCrop + framePad, left: sideCrop + framePad, borderRadius: `${radius}px` }}
                      >
                      {/* Bloc badge + légende en haut-gauche */}
                      <div className="pf-badge-wrap">
                        <div className="pf-badge">20%</div>
                        <div className="pf-badge-caption">
                          <span>Performance</span><br />
                          <span>annuelle&nbsp;cible*</span>
                        </div>
                      </div>

                      {/* Cadre bord blanc, fond transparent */}
                      <div className="pf-stroke" />

                      {/* Glassy card */}
                      <div className="pf-glass">
                        <div className="pf-glass-inner">
                          <div className="pf-glass-title">{glassTitle}</div>
                          <div className="pf-glass-sub">{glassSub}</div>
                          <div className="pf-glass-meta">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5" stroke="#F7B096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Acquis par les Associés d'Offstone</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /pf-overlay-group */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots centrés */}
      <div className="pf-dots">
        {base.map((_, i) => (
          <div key={i} className={"pf-dot" + (i === active ? " is-active" : "")} />
        ))}
      </div>

      <style jsx>{`
        .pf-hero-carousel {
          position: relative;
          overflow: hidden;
          background: transparent;
          border-radius: 12px; /* arrondi CONTAINER */
          margin: 0 auto;
          isolation: isolate;
          user-select: none;
        }
        .pf-track {
          position: absolute; left: 0; top: 0; height: 100%;
          display: flex; align-items: center;
          padding: 0; will-change: transform;
          background: transparent;
        }

        /* SLOT visible : pas de fond */
        .pf-card {
          position: relative;
          flex: 0 0 auto;
          background: transparent !important;
          transition: filter 220ms ease;
          overflow: visible;
          z-index: 1;
        }
        .pf-card-abs { position: absolute; top: 0; }
        .pf-card.is-active { z-index: 2; }

        /* FRAME transparente : laisse voir les voisines hors du slot */
        .pf-frame {
          position: absolute; inset: 0;
          overflow: hidden; border-radius: 0; box-sizing: border-box;
          background: transparent;
        }

        /* Couche clippée : coins arrondis gérés par 'clip-path: inset(... round 12px)' */
        .pf-reveal {
          position: absolute; inset: 0;
          border-radius: 12px;
          overflow: hidden;
          will-change: clip-path;
          transition: clip-path 520ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .pf-reveal.is-revealed { transition-duration: 560ms; }

        /* Image */
        .pf-media {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: inherit;
        }

        /* Filtre couleur permanent (#282422 à 55%) */
        .pf-tint {
          position: absolute; inset: 0;
          background: #282422;
          opacity: 0.55;
          pointer-events: none;
          z-index: 1; /* sous le voile gris (z:2) */
          border-radius: inherit;
        }

        /* VOILE GRIS : unique (0 → 1 selon .is-off) — fade court */
        .pf-gray {
          position: absolute; inset: 0;
          background: #E3E5E4;
          opacity: 1;
          pointer-events: none;
          transition: opacity ${grayFadeMs}ms cubic-bezier(0.25, 1, 0.30, 1);
          z-index: 2; /* sous le groupe overlay (z:4), au-dessus de l'image/tint */
          border-radius: inherit;
        }
        .pf-gray.is-off { opacity: 0; }

        /* Cadre blanc au DÉBUT du croppé (bref) */
        .pf-crop-stroke {
          position: absolute; pointer-events: none; z-index: 3;
          border: 2px solid rgba(255,255,255,0);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 180ms ease, border-color 200ms ease;
        }
        .pf-crop-stroke.is-on {
          opacity: 1;
          border-color: rgba(255,255,255,0.96);
        }

        /* ===== GROUPE OVERLAY (cadre + glass + badge) ===== */
        .pf-overlay-group {
          position: absolute; inset: auto; /* insets via style */
          pointer-events: none;
          z-index: 4;
          opacity: 0;
          transform: scale(1.10);
          transition: transform ${overlayEnterMs}ms cubic-bezier(0.25, 1, 0.35, 1);
          will-change: transform;
          border-radius: 12px;
        }
        .pf-overlay-group.is-on {
          opacity: 1;
          transform: scale(1.00);
        }
        .pf-overlay-group.is-leaving {
          opacity: 1;
          transform: scale(1.14);
          transition-duration: ${overlayLeaveMs}ms;
        }

        /* Badge block (top-left) */
        .pf-badge-wrap {
          position: absolute;
          top: 0.8cm; left: 0.8cm;
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 6px;
          pointer-events: none;
        }
        .pf-badge {
          padding: 6px 0;
          font-size: 60px;
          line-height: 1;
          font-weight: 500;
          color: #F7B096;
          text-shadow: 0 1px 6px rgba(0,0,0,0.18);
        }
        .pf-badge-caption {
          font-size: 14px;
          line-height: 1.05;
          font-weight: 500;
          color: #FFFFFF;
          opacity: 0.95;
          letter-spacing: 0.2px;
        }

        /* Cadre bord blanc, fond transparent (même arrondi que l'image) */
        .pf-stroke {
          position: absolute; inset: 0;
          border: 2px solid rgba(255,255,255,0.95);
          border-radius: 12px;
          background: transparent;
          box-shadow: 0 8px 26px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.25) inset;
        }

        /* Glass overlay — mêmes marges (0.5cm) ; texte centré ; un peu plus haut */
        .pf-glass {
          position: absolute; inset: 0;
          display: grid; place-items: end stretch;
          padding: 0;
          border-radius: inherit;
        }
        .pf-glass-inner {
          margin: 0 0.5cm 0.5cm 0.5cm; /* 0.5 cm d’espace L/R + bas */
          min-height: 140px;           /* ++ un peu plus haute */
          border-radius: 12px;
          padding: 22px 24px;
          background: rgba(0,0,0,0.5);
          border: none;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          color: #ffffff;
          text-align: center;
        }
        .pf-glass-title { font-size: 22px; font-weight: 600; letter-spacing: 0.2px; }
        .pf-glass-sub   { font-size: 15px; opacity: 0.95; margin-top: 6px; }

        /* Ligne meta (check + texte) */
        .pf-glass-meta {
          margin-top: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          opacity: 0.92;
        }
        .pf-glass-meta svg { width: 16px; height: 16px; display: block; }

        /* Dots centrés */
        .pf-dots {
          position: absolute; left: 50%; bottom: 10px;
          transform: translateX(-50%);
          display: flex; gap: 8px; z-index: 6;
        }
        .pf-dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(0,0,0,0.25); }
        .pf-dot.is-active { background: rgba(0,0,0,0.65); transform: scale(1.1); }

        /* ===== Responsive tweaks (mobile-first) ===== */
        @media (max-width: 1280px) {
          .pf-badge { font-size: 50px; }
          .pf-badge-wrap { top: 24px; left: 24px; }
          .pf-glass-inner { margin: 0 14px 14px 14px; min-height: 120px; padding: 18px 20px; }
          .pf-glass-title { font-size: 20px; }
          .pf-glass-sub { font-size: 14px; }
          .pf-glass-meta { font-size: 12px; }
        }

        @media (max-width: 1024px) {
          .pf-badge { font-size: 46px; }
          .pf-badge-caption { font-size: 13px; }
          .pf-glass-title { font-size: 19px; }
          .pf-glass-sub { font-size: 13px; }
          .pf-glass-meta { font-size: 12px; }
        }

        @media (max-width: 768px) {
          .pf-badge { font-size: 42px; }
          .pf-badge-wrap { top: 18px; left: 18px; }
          .pf-glass-inner { margin: 0 12px 12px 12px; min-height: 110px; padding: 16px 18px; }
          .pf-glass-title { font-size: 18px; }
          .pf-glass-sub { font-size: 13px; }
          .pf-glass-meta { font-size: 11.5px; }
          .pf-glass-meta svg { width: 15px; height: 15px; }
          .pf-dots { bottom: 8px; }
        }

        @media (max-width: 640px) {
          .pf-badge { font-size: 36px; }
          .pf-badge-caption { font-size: 12px; }
          .pf-glass-inner { min-height: 100px; padding: 14px 16px; }
          .pf-glass-title { font-size: 17px; }
          .pf-glass-sub { font-size: 12.5px; }
          .pf-glass-meta { font-size: 11px; }
          .pf-glass-meta svg { width: 14px; height: 14px; }
        }

        @media (max-width: 480px) {
          .pf-badge { font-size: 32px; }
          .pf-badge-wrap { top: 14px; left: 14px; }
          .pf-badge-caption { font-size: 11px; }
          .pf-glass-inner { min-height: 92px; padding: 12px 14px; }
          .pf-glass-title { font-size: 16px; }
          .pf-glass-sub { font-size: 12px; }
          .pf-glass-meta { font-size: 10.5px; }
        }

        @media (max-width: 360px) {
          .pf-badge { font-size: 28px; }
          .pf-badge-caption { font-size: 10px; }
          .pf-glass-inner { min-height: 86px; padding: 10px 12px; }
          .pf-glass-title { font-size: 15px; }
          .pf-glass-sub { font-size: 11.5px; }
          .pf-glass-meta { font-size: 10px; }
        }
      `}
      </style>
    </div>
  );
}
