"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ParaformRightHeroCardsStep — Pure React + CSS (no deps)
 * - Step carousel: sentinels [cloneLast, 1, 2, 3, cloneFirst], toujours en avant
 * - Effet crop → décrop → recrop via clip-path (image taille constante)
 * - Bords blancs en crop, aucun arrondi sur le container
 * - Glass card : noir 30% (rgba(0,0,0,.3)), sans bord, légèrement remontée
 * - Cadre stroke blanc (coins doux) qui apparaît avec la glass, aux dimensions du rectangle croppé
 * - Dots centrés
 * - Peek/Overlap: chaque slot visible est + étroit, la carte dépasse pour montrer les voisines
 *
 * Images (public/) :
 *   /images/Buildings/2barbes.PNG
 *   /images/Buildings/Truchet.jpg
 *   /images/Buildings/Ienaa.jpg
 */

export type CardData = { id: string; image: string };

type Props = {
  cards?: CardData[];
  /** Taille du carré (px). Largeur = Hauteur = size */
  size?: number;
  /** Espace entre cartes (px) — gouttière entre slots */
  gap?: number;
  /** Durée totale par carte (ms) */
  intervalMs?: number;
  /** Base de crop (px). Les côtés seront plus croppés que haut/bas. */
  cropPx?: number;
  /** Pause au survol */
  pauseOnHover?: boolean;
  className?: string;
};

export default function ParaformRightHeroCardsStep({
  cards,
  size = 720,                 // carré garanti
  gap = 40,                   // + large pour mieux voir les bords voisins
  intervalMs = 2600,
  cropPx = 96,                // base forte (on renforce encore via coefficients)
  pauseOnHover = true,
  className,
}: Props) {
  // Base data en ordre fixe
  const base = useMemo<CardData[]>(
    () =>
      (cards && cards.length
        ? cards
        : [
            { id: "2barbes", image: "/images/Buildings/2barbes.PNG" },
            { id: "truchet", image: "/images/Buildings/Truchet.jpg" },
            { id: "ienaa", image: "/images/Buildings/Ienaa.jpg" },
          ]
      ).slice(0, 3),
    [cards]
  );

  const N = base.length; // 3

  // Piste avec sentinelles: [cloneLast, ...base, cloneFirst]
  const track = useMemo(() => {
    const cloneLast: CardData = { ...base[N - 1], id: base[N - 1].id + "-cloneLast" };
    const cloneFirst: CardData = { ...base[0], id: base[0].id + "-cloneFirst" };
    return [cloneLast, ...base, cloneFirst];
  }, [base, N]);

  // États d’animation
  const [active, setActive] = useState(0); // index logique [0..N-1]
  const [pos, setPos] = useState(1);       // pos physique [0..N+1], démarre sur 1er réel
  const [animateTrack, setAnimateTrack] = useState(true); // false => wrap instantané
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  // Refs stables
  const activeRef = useRef(0);
  const posRef = useRef(1);
  const hoverRef = useRef(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  // Timings internes (hop un poil + long et S-curve pour smooth)
  const hopMs = Math.round(Math.min(340, Math.max(260, intervalMs * 0.12))); // ~300ms smooth
  const decropStart = hopMs;                         // quand la carte est centrée
  const decropEnd = Math.round(decropStart + intervalMs * 0.20); // ~800ms
  const holdEnd   = Math.round(decropEnd + intervalMs * 0.35);   // ~1700ms
  const recropEnd = Math.round(holdEnd   + intervalMs * 0.16);   // ~2100ms

  // Helpers de planification
  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };
  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Cycle principal
  useEffect(() => {
    const run = () => {
      if (hoverRef.current) { schedule(run, 120); return; }

      // Début de phase: crop + pas de glass
      setRevealedIndex(null);
      setOverlayIndex(null);

      // Décrop + glass sur la carte logique active
      schedule(() => setRevealedIndex(activeRef.current), decropStart);
      schedule(() => setOverlayIndex(activeRef.current), decropStart + 40);
      schedule(() => setOverlayIndex(null), Math.max(0, holdEnd - 120));
      schedule(() => setRevealedIndex(null), holdEnd);

      // Avance d’une carte + wrap si on est sur cloneFirst
      schedule(() => {
        const nextActive = (activeRef.current + 1) % N;
        const nextPos = posRef.current + 1;

        activeRef.current = nextActive;
        setActive(nextActive);

        // hop animé
        setAnimateTrack(true);
        posRef.current = nextPos;
        setPos(nextPos);

        if (nextPos === N + 1) {
          // Après le hop, wrap instantané → on revient sur le 1er réel
          schedule(() => {
            setAnimateTrack(false);
            posRef.current = 1;
            setPos(1);
            // réactive l’anim au frame suivant
            requestAnimationFrame(() => setAnimateTrack(true));
          }, hopMs + 20);
        }

        // prochaine itération
        schedule(run, Math.max(0, intervalMs - recropEnd));
      }, recropEnd);
    };

    clearAll();
    run();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, N, hopMs, decropStart, holdEnd, recropEnd]);

  // Pause au survol
  const onEnter = () => { if (pauseOnHover) hoverRef.current = true; };
  const onLeave = () => { if (pauseOnHover) hoverRef.current = false; };

  // —— Peek / Overlap logic ——
  // On voit les voisines car la carte dépasse de peekPx de chaque côté dans un slot plus étroit
  const peekPx = Math.min(Math.round(size * 0.14), Math.floor(size / 2 - 24));
  const slotW = Math.max(1, size - 2 * peekPx);   // largeur visible par item
  const step = slotW + gap;                        // le track avance de ce pas
  const x = -(pos * step);

  // —— Crop fort (L/R beaucoup + que T/B), clampé pour sécurité ——
  const maxInset = Math.floor(size / 2 - 8);
  const sideCrop = Math.min(maxInset, Math.round(cropPx * 3.6)); // L/R extrême
  const vertCrop = Math.min(maxInset, Math.round(cropPx * 2.2)); // T/B renforcé

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
          transition: animateTrack ? `transform ${hopMs}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
        }}
      >
        {track.map((c, i) => {
          const logical = i === 0 ? N - 1 : i === N + 1 ? 0 : i - 1;
          const isRevealed = revealedIndex === logical;
          const isActiveLogical = active === logical;

          return (
            <div
              className={"pf-card" + (isActiveLogical ? " is-active" : " is-dim")}
              key={`${c.id}-${i}`}
              style={{ width: slotW, height: size }}
            >
              {/* Carte qui dépasse à gauche/droite du slot pour montrer les voisines */}
              <div
                className="pf-card-abs"
                style={{ width: size + 2 * peekPx, height: size, left: -peekPx }}
              >
                {/* Cadre blanc : donne les bords blancs quand c’est croppé */}
                <div className="pf-frame">
                  {/* Couche clippée qui révèle/recroppe l’image */}
                  <div
                    className={"pf-reveal" + (isRevealed ? " is-revealed" : "")}
                    style={{ clipPath: isRevealed ? "inset(0px)" : `inset(${vertCrop}px ${sideCrop}px)` }}
                  >
                    <img src={c.image} alt="" className="pf-media" draggable={false} />

                    {/* Cadre stroke (transparent fill, white border) pendant le plein reveal */}
                    <div
                      className={"pf-stroke" + (overlayIndex === logical ? " is-on" : "")}
                      style={{ top: vertCrop, right: sideCrop, bottom: vertCrop, left: sideCrop }}
                    />

                    {/* Glass overlay (noir 30%) pendant le plein cadre */}
                    <div className={"pf-glass" + (overlayIndex === logical ? " is-on" : "")}>
                      <div className="pf-glass-inner">
                        <div className="pf-glass-title">Great fit</div>
                        <div className="pf-glass-sub">Pre-vetted match</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> // pf-card
          );
        })}
      </div>

      {/* Dots centrés */}
      <div className="pf-dots">
        {base.map((_, i) => (
          <div key={i} className={"pf-dot" + (i === active ? " is-active" : "")} />
        ))}
      </div>

      <style>{`
        .pf-hero-carousel {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-radius: 0;
          margin: 0 auto;
          isolation: isolate;
          user-select: none;
        }
        .pf-track {
          position: absolute; left: 0; top: 0; height: 100%;
          display: flex; align-items: center;
          padding: 0; will-change: transform;
          background: #ffffff;
        }

        .pf-card { position: relative; flex: 0 0 auto; background: #ffffff; transition: filter 220ms ease; overflow: visible; }
        .pf-card-abs { position: absolute; top: 0; left: 0; }
        .pf-card.is-dim .pf-media { filter: saturate(0.72) brightness(0.88); transition: filter 220ms ease; }
        .pf-card.is-active .pf-media { filter: none; }
        .pf-card.is-active { z-index: 2; }

        /* Cadre blanc (contours) */
        .pf-frame {
          position: absolute; inset: 0;
          overflow: hidden; border-radius: 0; box-sizing: border-box;
          background: #ffffff;
        }

        /* Couche clippée (crop/décrop) */
        .pf-reveal {
          position: absolute; inset: 0;
          will-change: clip-path;
          transition: clip-path 460ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .pf-reveal.is-revealed { transition-duration: 520ms; }

        /* Image plein cadre */
        .pf-media {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }

        /* Stroke (transparent) animé avec la glass */
        .pf-stroke {
          position: absolute; pointer-events: none; z-index: 4;
          top: 0; left: 0; right: 0; bottom: 0; /* inset dyn via style */
          border: 2px solid rgba(255,255,255,0); /* anim vers blanc */
          border-radius: 12px;
          background: transparent;
          opacity: 0; transform: scale(0.96);
          box-shadow: 0 0 0 0 rgba(255,255,255,0);
          transition:
            opacity 260ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 320ms ease,
            box-shadow 320ms ease;
          will-change: opacity, transform, border-color, box-shadow;
        }
        .pf-stroke.is-on {
          opacity: 1; transform: scale(1);
          border-color: rgba(255,255,255,0.95);
          box-shadow: 0 8px 26px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.25) inset;
        }

        /* Glass overlay */
        .pf-glass {
          position: absolute; inset: 0;
          display: grid; place-items: end stretch;
          padding: 0; z-index: 3;
          opacity: 0; transform: translateY(6px) scale(0.985);
          transition: opacity 220ms cubic-bezier(0.22, 1, 0.36, 1), transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-glass.is-on { opacity: 1; transform: translateY(0) scale(1); }
        .pf-glass-inner {
          width: auto;
          margin: 0 16px 24px 16px;
          border-radius: 0;
          padding: 14px 16px;
          background: rgba(0,0,0,0.3);
          border: none;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          color: #ffffff;
        }
        .pf-glass-title { font-size: 16px; font-weight: 700; }
        .pf-glass-sub   { font-size: 13px; opacity: 0.92; }

        /* Dots centrés */
        .pf-dots {
          position: absolute; left: 50%; bottom: 10px;
          transform: translateX(-50%);
          display: flex; gap: 8px; z-index: 6;
        }
        .pf-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: rgba(0,0,0,0.25);
        }
        .pf-dot.is-active { background: rgba(0,0,0,0.65); transform: scale(1.1); }
      `}</style>
    </div>
  );
}
