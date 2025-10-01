'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import SectionBadge from './SectionBadge';

type Feature = {
  key: string;
  title: string;
  desc?: string;
  details?: string;
  image: string;
};

const features: Feature[] = [
  {
    key: 'market',
    title: 'Understand your market value',
    desc: undefined,
    details:
      "Estimate your company’s fair market value using comparable transactions and buyer demand signals gathered across our network.",
    image: '/images/Backgrounds/Background2.webp',
  },
  {
    key: 'buyers',
    title: 'Identify motivated buyers',
    desc: undefined,
    details:
      'Surface qualified buyers that match your criteria and see who is actively engaging with your materials to prioritize outreach.',
    image: '/images/Backgrounds/Mountain.webp',
  },
  {
    key: 'onboard',
    title: 'Onboard in minutes',
    desc: undefined,
    details:
      'Set up your confidential workspace, upload documents, and invite stakeholders with granular permissions in a few clicks.',
    image: '/images/Buildings/Truchet.webp',
  },
  {
    key: 'progress',
    title: 'Track deal progress',
    desc: 'Stay up-to-date on buyer activity in real-time through our centralized deal workspace.',
    details:
      'Monitor buyer views, Q&A, and milestones in real time to maintain momentum and keep your process organized from first contact to close.',
    image: '/images/Buildings/Ienaa.webp',
  },
];

// French content overrides
const featuresFr: Feature[] = [
  {
    key: 'acces-prioritaire',
    title: 'Accès prioritaire aux deals',
    details: "Bénéficiez d’un accès en avant-première aux meilleures opportunités immobilières, avant leur ouverture au reste du marché.",
    image: '/images/Backgrounds/Background2.webp',
  },
  {
    key: 'visites-privees',
    title: 'Visites privées d’immeubles',
    details: "Découvrez nos acquisitions et projets lors de visites exclusives, en immersion totale sur le terrain.",
    image: '/images/Backgrounds/Mountain.webp',
  },
  {
    key: 'sessions-jonathan',
    title: 'Sessions de travail avec Jonathan Anguelov',
    details: "Participez à des rencontres en petit comité avec Jonathan pour échanger sur l’investissement, l’immobilier et son expérience d’entrepreneur.",
    image: '/images/Buildings/Truchet.webp',
  },
  {
    key: 'soirees-networking',
    title: 'Soirées networking sélectives',
    details: "Rejoignez une communauté d’investisseurs et d’entrepreneurs lors d’événements privés, pensés pour créer des connexions durables.",
    image: '/images/Buildings/Ienaa.webp',
  },
];

export default function OffDealAdvantageLike() {
  const [active, setActive] = useState<string>(featuresFr[0].key);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClickMode, setIsClickMode] = useState(false); // Nouvel état pour le mode clic
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const smoothedRatioRef = useRef(0);
  const boundsRef = useRef({ start: 0, end: 1 });

  const activeIndex = useMemo(() => {
    const idx = featuresFr.findIndex((f) => f.key === active);
    return idx >= 0 ? idx : 0;
  }, [active]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for entrance animation
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // On mobile ou en mode clic, disable scroll-based animation and only use click
    if (isMobile || isClickMode) {
      return;
    }

    let ticking = false;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const start = (window.scrollY || window.pageYOffset) + rect.top;
      const end = start + el.offsetHeight - (window.innerHeight || 0);
      boundsRef.current = { start, end: Math.max(end, start + 1) };
    };

    const computeAndSet = () => {
      const { start, end } = boundsRef.current;
      const y = window.scrollY || window.pageYOffset;

      const total = Math.max(end - start, 1);
      let targetRatio = 0;
      if (y <= start) targetRatio = 0;
      else if (y >= end) targetRatio = 1;
      else targetRatio = (y - start) / total;

      // Smooth to prevent skipping on fast scroll
      const alpha = 0.4;
      const prev = smoothedRatioRef.current;
      const smoothed = prev + (targetRatio - prev) * alpha;
      smoothedRatioRef.current = smoothed;

      const idx = Math.max(0, Math.min(featuresFr.length - 1, Math.floor(smoothed * featuresFr.length)));
      if (featuresFr[idx] && featuresFr[idx].key !== active) {
        setActive(featuresFr[idx].key);
      }

      if (Math.abs(targetRatio - smoothed) > 0.002) {
        window.requestAnimationFrame(computeAndSet);
        ticking = true;
      } else {
        ticking = false;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(computeAndSet);
        ticking = true;
      }
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    // Observe size changes of the wrapper (accordion open/close)
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Prime once on mount
    measure();
    computeAndSet();

    return () => {
      window.removeEventListener('scroll', onScroll as EventListener);
      window.removeEventListener('resize', onResize as EventListener);
      ro.disconnect();
    };
  }, [active, isMobile, isClickMode]);

  const current = featuresFr.find(f => f.key === active) ?? featuresFr[0];

  return (
    <section className="w-full pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={scrollerRef} className={`${isMobile ? 'relative h-auto' : 'lg:relative lg:h-[260vh]'}`}>
          <div className={`${isMobile ? 'relative h-auto py-8' : 'lg:sticky lg:top-0 lg:h-screen'} flex items-center`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left: Image stage (match 600x600 like cards above) */}
          <div className="w-full lg:col-span-6 flex justify-center lg:justify-start lg:pt-16">
            <div className={`relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:w-[510px] lg:h-[750px] lg:max-w-none rounded-xl overflow-hidden bg-gray-50 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}>
  <Image
    src="/images/personnalites/journal.webp"
    alt="Journal Offstone"
    fill
    priority
    sizes="(max-width: 1024px) 100vw, 58vw"
    className="object-cover object-center"
  />
</div>
          </div>

          {/* Right: Text + Tabs */}
          <div className="lg:col-span-6 lg:pt-12">
            <div className={`mb-8 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <SectionBadge colorClass="text-gray-600" text="L'AVANTAGE OFFSTONE" />
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#111] mb-6 leading-[1.1] mt-8"
                style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
              >
                L'avantage d'investir avec Offstone
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Nous sollicitons notre réseau que nous avons construit depuis plus d'une dizaine d'années pour sourcer les meilleurs immeubles.
              </p>
            </div>

            <div className="space-y-3">
              {featuresFr.map((f, idx) => {
                const selected = f.key === active;
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={f.key}
                    className={`group rounded-xl border-2 overflow-hidden transition-all duration-500 cursor-pointer hover:bg-gray-50 hover:shadow-md hover:border-gray-300 ${
                      selected 
                        ? (isEven 
                          ? 'border-[#F7B096] bg-white shadow-lg' 
                          : 'border-black bg-white shadow-lg')
                        : 'border-gray-200 bg-white'
                    } ${
                      isVisible 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-8'
                    }`}
                    style={{ 
                      transitionDelay: `${400 + idx * 150}ms`,
                      transition: 'all 500ms, opacity 800ms ease-out, transform 800ms ease-out'
                    }}
                    onClick={() => {
                      setActive(f.key);
                      // Activer le mode clic sur desktop
                      if (!isMobile) {
                        setIsClickMode(true);
                      }
                    }}
                  >
                    <div className="px-6 py-3.5 flex items-center justify-center">
                      <div className="flex items-center gap-4 w-full">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                          selected 
                            ? (isEven 
                              ? 'bg-[#F7B096] text-white shadow-md' 
                              : 'bg-black text-white shadow-md')
                            : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center">
                          <div className={`text-lg font-semibold leading-tight transition-colors duration-500 ${
                            selected ? 'text-[#111]' : 'text-gray-700 group-hover:text-gray-900'
                          }`}>
                            {f.title}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-6 pb-3.5 text-sm text-gray-600 transition-all duration-500 ease-out ${
                        selected ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <div className={`transition-all duration-500 ease-out ${selected ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'} ml-14`}>
                        <p className="leading-relaxed text-gray-700">
                          {f.details ?? f.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`mt-6 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`} style={{ transitionDelay: '1000ms' }}>
              <button
                className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black group"
                type="button"
                onClick={() => window.location.href = '/pourquoi-offstone'}
              >
                Pourquoi Offstone ?
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.1}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
