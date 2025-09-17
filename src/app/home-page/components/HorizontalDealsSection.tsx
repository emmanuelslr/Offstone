'use client';



// Overrides from Nos réalisations (by image path) to correct titles/descriptions while keeping images and order


import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TextReveal from './TextReveal';
import { ComplianceBadge } from '@/components/common/CompliantDisclaimer';

type Deal = {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  tags: string[];
};


const deals: Deal[] = [
  {
    id: 'rezi-hamburg',
    title: 'Rezi Hamburg - Allemagne',
    location: 'Hamburg, Kiel, Lübeck',
    image: '/images/Acquisitions/Moulin vert.webp',
    description:
      "Acquisition d’un portefeuille de 3 immeubles résidentiels situés dans la région d'Hambourg, Kiel et Lübeck en Allemagne.",
    tags: ['Core plus', 'Résidentiel', 'Kiel', 'Lübeck', 'Hamburg', 'Allemagne'],
  },
  {
    id: 'we-ef-lyon',
    title: 'WE-EF - Satolas-et-Bonce (38)',
    location: 'Lyon, France',
    image: '/images/Buildings/rue-la-boetie-11-copie-scaled.jpg',
    description:
      "Acquisition d’un actif logistique de 5 925 m² situé dans la zone logistique principale de Lyon et loué à l’un des leaders mondiaux des solutions d’éclairage.",
    tags: ['Core plus', 'Logistique', 'Auvergne-Rhône-Alpes', 'France'],
  },
  {
    id: 'exelmans-paris',
    title: 'Exelmans - Paris 16e',
    location: 'Paris, France',
    image: '/images/Buildings/Truchet.jpg',
    description:
      "Situé au sein du quartier d’Auteuil dans le 16è arrondissement de Paris, cet immeuble emblématique est l’ancien siège des sociétés de production de Claude François. Il abrite aujourd’hui le siège social de Puressentiel, entreprise de renommée internationale produisant des huiles essentielles.",
    tags: ['Core plus', 'Bureaux', 'Île-de-France', 'France'],
  },
  {
    id: 'west-monoprix',
    title: 'West Monoprix - Saint-Cloud (92), Meudon (92), Saint-Maur (94) et Saint-Ouen (93)',
    location: 'Île-de-France',
    image: '/images/Buildings/Ienaa.jpg',
    description:
      "Acquisition d’un portefeuille de Monoprix idéalement situés en région parisienne, au cœur de villes bénéficiant d’une population à fort pouvoir d’achat comme Saint-Cloud, Meudon et Saint-Germain en Laye, ou en cours de renouvellement urbain comme Saint-Ouen et Saint-Maur.",
    tags: ['Core plus', 'Commerce', 'Île-de-France', 'France'],
  },
  {
    id: 'green-oak',
    title: 'Green Oak - Arcueil (94)',
    location: 'Île-de-France',
    image: '/images/Acquisitions/hotel barbes.avif',
    description:
      "Développement d’un immeuble de bureau idéalement localisé au cœur d’un pôle majeur de la périphérie sud de Paris (quartier de la Vache Noire) bénéficiant de perspectives de croissance forte suite à l’arrivée programmée du métro ligne 4 en 2020.",
    tags: ['Valeur ajoutée', 'Bureaux', 'Île-de-France', 'France'],
  },
  {
    id: 'portefeuille-food',
    title: 'Portefeuille Food - Lyon (3 & 9), Villeurbanne',
    location: 'Auvergne-Rhône-Alpes',
    image: '/images/Acquisitions/Jules Guesde Levallois.webp',
    description:
      "Acquisition auprès d’un privé de 3 actifs de commerce alimentaire de proximité loués à des enseignes nationales de 1er plan (notamment Picard et Utile – Système U) et situés en centre-ville de Lyon et à Villeurbanne.",
    tags: ['Core plus', 'Commerce', 'Auvergne-Rhône-Alpes', 'France'],
  },
  {
    id: '360-paris',
    title: '360 Paris - Vanves (92)',
    location: 'Île-de-France',
    image: '/images/Acquisitions/Paris - Resi.webp',
    description:
      "Acquisition d’un ensemble immobilier de 25 000m² situé Porte de Brancion, face au boulevard périphérique bénéficiant d’un fort potentiel de création de valeur.",
    tags: ['Valeur ajoutée', 'Bureaux', 'Île-de-France', 'France'],
  },
];

const overridesByImage: Record<string, Partial<Deal>> = {
  '/images/Acquisitions/Moulin vert.webp': {
    id: 'maison-du-moulin-vert',
    title: 'Maison du Moulin Vert',
    location: '75014 Paris',
    description:
      'Résidence touristique issue de la restructuration de l’ex‑Hôtel de la Loire : 15 appartements meublés et jardin, rue du Moulin Vert (Paris 14e).',
    tags: ['Hôtellerie', 'Paris 14e'],
  },
  '/images/Buildings/rue-la-boetie-11-copie-scaled.jpg': {
    id: 'maison-boetie',
    title: 'Maison Boétie',
    location: '75008 Paris',
    description:
      'Transformation d’un hôtel particulier de la rue La Boétie en lieu événementiel premium au cœur du 8e arrondissement.',
    tags: ['Bureaux / Événementiel', 'Paris 8e'],
  },
  '/images/Buildings/Truchet.jpg': {
    id: 'truchet',
    title: 'Truchet',
    location: '75020 Paris',
    description:
      'Immeuble de bureaux rue Abel‑Truchet à Paris, valorisation d’un actif emblématique.',
    tags: ['Bureaux', 'Île‑de‑France'],
  },
  '/images/Buildings/Ienaa.jpg': {
    id: 'maison-iena',
    title: 'Maison Iéna',
    location: '75116 Paris',
    description:
      'Immeuble haussmannien du 16e, rénovation et repositionnement haut de gamme près de la place d’Iéna.',
    tags: ['Bureaux', 'Paris 16e'],
  },
  '/images/Acquisitions/hotel barbes.avif': {
    id: 'maison-barbes',
    title: 'Maison Barbès',
    location: '75018 Paris',
    description:
      'Développement d’un hôtel 4 étoiles dans le 18e arrondissement, rénovation complète et montée en gamme.',
    tags: ['Hôtellerie', 'Paris 18e'],
  },
  '/images/Acquisitions/Jules Guesde Levallois.webp': {
    id: 'jules-guesde',
    title: 'Jules Guesde',
    location: 'Levallois‑Perret',
    description:
      'Actif commercial à Levallois‑Perret, rue Jules‑Guesde, locataires de premier plan.',
    tags: ['Commerce', 'Hauts‑de‑Seine'],
  },
  '/images/Acquisitions/Paris - Resi.webp': {
    id: 'planchat',
    title: 'Planchat',
    location: '75020 Paris',
    description:
      "Acquisition d'un hotel de 760 m2 au 65 rue Planchat (Paris 20e) et revalorisation complete.",
    tags: ['Hotellerie', 'Paris 20e'],
  },
};

const viewDeals: Deal[] = deals.map((d) => ({ ...d, ...(overridesByImage[d.image] || {}) }));

// Replace images with local assets from "/images/réalisations images" when possible
const REALISATIONS_DIR = "/images/réalisations images";
const imageById: Record<string, string> = {
  // Align with overridesByImage outputs (ids)
  'maison-du-moulin-vert': `${REALISATIONS_DIR}/maison du moulin vert.webp`,
  'maison-boetie': `${REALISATIONS_DIR}/maison boetie.webp`,
  'truchet': `${REALISATIONS_DIR}/truchet.webp`,
  'maison-iena': `${REALISATIONS_DIR}/Maison iena.webp`,
  'maison-barbes': `${REALISATIONS_DIR}/maison barbes.webp`,
  'jules-guesde': `${REALISATIONS_DIR}/jules guesde.webp`,
  // Generic résidentiel Paris — choix d'une image proche
  'planchat': '/images/r%C3%A9alisations%20images/Planchat.webp',
};

const viewDealsWithImages: Deal[] = viewDeals.map((d) => ({
  ...d,
  image: imageById[d.id] || d.image,
}));


export default function HorizontalDealsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null); // Référence pour le TextReveal
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const basePadRef = useRef(0); // base left/right padding in px (˜ 8vw)
  const progressRef = useRef(0); // 0..1 vertical progress inside sticky
  const stickyTopRef = useRef(0); // px from viewport top where sticky pins
  const bottomPadRef = useRef(24); // px bottom gap to next section
  const headerSpaceRef = useRef(0); // px space reserved for heading inside sticky

  const cardWidth = 360; // target desktop card width (tighter, like Matacapital)
  const cardGap = 20; // px
  const speedFactor = 1.05; // slight bump: faster horizontal per vertical scroll

  const totalTrackWidth = useMemo(() => {
    // approximate width for SSR safety; replaced on client after mount
    return viewDealsWithImages.length * (cardWidth + cardGap) + 100;
  }, []);

  useEffect(() => {
    // Measure paddings and compute container height based on track width
    const recompute = () => {
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Fixed sticky offset so the text sits higher (more room for cards)
      // Increase stickyTop to reduce visible gap between heading and cards
      const stickyTop = viewportW >= 1280 ? 96 : viewportW >= 1024 ? 88 : viewportW >= 640 ? 72 : 56; // px
      stickyTopRef.current = stickyTop;

      // Align left padding with main container (max-w-7xl + responsive horizontal padding)
      const CONTAINER_MAX = 1280; // Tailwind max-w-7xl
      const containerPad = viewportW >= 1024 ? 32 : viewportW >= 640 ? 24 : 16; // px-8 / px-6 / px-4
      const containerLeft = Math.max(
        containerPad,
        Math.floor((viewportW - CONTAINER_MAX) / 2 + containerPad)
      );
      basePadRef.current = containerLeft;

      // Small, consistent bottom gap to next section
      bottomPadRef.current = Math.round(Math.max(12, Math.min(28, viewportH * 0.02)));

      // Reserve vertical space under the heading so cards never overlap it
      const textEl = textRevealRef.current as HTMLDivElement | null;
      const headingH = textEl ? Math.round(textEl.getBoundingClientRect().height) : 0;
      // Reduce gap even more between heading and carousel
      headerSpaceRef.current = Math.max(40, Math.min(220, headingH - 24));

      // Compute track width from DOM if available
      const trackEl = trackRef.current;
      const trackW = trackEl ? trackEl.scrollWidth : totalTrackWidth;

      // Height needed so that vertical scroll maps to full horizontal distance
      const horizontalDistance = Math.max(0, trackW - viewportW);
      const visibleStickyH = Math.max(0, viewportH - stickyTop);
      // total scrollable inside sticky = containerHeight - visibleStickyH
      // we want: horizontal = vertical * speedFactor =>
      // containerHeight - visibleStickyH = horizontalDistance / speedFactor
      const neededTotal = horizontalDistance / speedFactor;
      const newHeight = visibleStickyH + neededTotal; // no extra whitespace
      setContainerHeight(newHeight);
    };

    // Initial compute and after layout settles
    recompute();
    const id = window.setTimeout(recompute, 100);

    // Only recompute on resize to avoid mid-scroll height shifts
    window.addEventListener('resize', recompute);
    return () => {
      window.removeEventListener('resize', recompute);
      window.clearTimeout(id);
    };
  }, [totalTrackWidth, speedFactor]);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const stickyTop = stickyTopRef.current;

      // total vertical scroll while sticky is active
      const visibleStickyH = Math.max(0, viewportH - stickyTop);
      const total = Math.max(0, containerHeight - visibleStickyH);
      if (total <= 0) {
        progressRef.current = 0;
        targetXRef.current = 0;
        setTranslateX(0);
        return;
      }

      let progress: number;
      if (rect.top > stickyTop) {
        // before sticky starts
        progress = 0;
      } else if (rect.bottom <= viewportH) {
        // after sticky ends
        progress = 1;
      } else {
        // in sticky range
        const scrolled = Math.min(Math.max(stickyTop - rect.top, 0), total);
        progress = scrolled / total;
      }

      progressRef.current = progress;

      // compute track width accurately from DOM if available
      const trackEl = trackRef.current;
      const trackW = trackEl ? trackEl.scrollWidth : totalTrackWidth;
      const maxX = Math.max(0, trackW - window.innerWidth);

      // Map vertical progress linearly for uniform perceived speed
      targetXRef.current = -progress * maxX;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', onScroll as any);
    };
  }, [containerHeight, totalTrackWidth]);

  // Smooth animation using rAF lerp to make motion more fluid
  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const tick = () => {
      const alpha = 0.2; // slightly more smoothing for uniform motion
      let next = lerp(currentXRef.current, targetXRef.current, alpha);
      if (Math.abs(next - targetXRef.current) < 0.1) next = targetXRef.current;
      currentXRef.current = next;
      setTranslateX(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
            <section className="w-[100vw] mx-[calc(50%-50vw)] bg-white">
        <div ref={containerRef} style={{ height: containerHeight || undefined }}>
          <div
            ref={stickyRef}
            className="sticky overflow-hidden"
            style={{ top: stickyTopRef.current }}
          >
            <div
              className="relative w-[100vw] mx-[calc(50%-50vw)]"
              style={{ height: `calc(100vh - ${stickyTopRef.current}px)` }}
            >
              <div ref={textRevealRef} className="absolute top-0 left-0 right-0 z-30">
                <TextReveal
                  text="Découvrir l'ensemble du patrimoine de Jonathan Anguelov et de ses associés"
                  multiline={false}
                  backgroundColor="bg-white"
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] max-w-[1000px] text-black leading-tight"
                  containerPaddingClass="pt-6 md:pt-8 lg:pt-10 pb-0 md:pb-1 lg:pb-2"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end z-10" style={{ top: headerSpaceRef.current }}>
              <div
                ref={trackRef}
                className="flex will-change-transform"
                style={{
                  transform: `translate3d(${translateX}px, 0, 0)`,
                  gap: '20px',
                  padding: `0 ${basePadRef.current}px ${bottomPadRef.current}px ${basePadRef.current}px`,
                }}
              >
                {viewDealsWithImages.map((deal) => {
                  const href = deal?.id ? `/nos-realisations/${deal.id}` : '/nos-realisations';
                  return (
                <Link
                  key={deal.id || deal.title}
                  href={href}
                  className="group cursor-pointer shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 w-[86vw] sm:w-[72vw] md:w-[54vw] lg:w-[360px] relative"
                >
                  <div className="relative w-full aspect-[4/3] bg-gray-200">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 880px"
                      priority={false}
                    />
                    <div className="absolute left-3 top-3">
                      <ComplianceBadge text="Acquis par les associés d'Offstone" />
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="mt-4 text-base md:text-[17px] font-medium text-[#111]">{deal.title}</h3>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {deal.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-[3px] rounded-full border border-gray-200 text-gray-700 bg-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9FAFB] bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 mobile-hover-fix">
                    <h3 className="text-base md:text-[17px] font-medium text-[#111] mb-2">{deal.title}</h3>
                    <p className="text-gray-700 text-xs md:text-sm mb-3 px-4 text-center" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {deal.description.length > 80 ? deal.description.slice(0, 80) + '...' : deal.description}
                    </p>
                    <span 
                      className="inline-flex items-center h-9 px-3 rounded-full bg-black text-white text-xs border border-black transition group-hover:bg-[#F7B096] group-hover:border-[#F7B096] group-hover:text-black"
                      aria-hidden
                    >
                      Découvrir ce bien
                      <svg
                        className="ml-2 w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.1}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </Link>
                  );
                })}
              {/* trailing spacer removed; right padding handles spacing */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}





