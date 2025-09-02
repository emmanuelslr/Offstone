'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ParaformRightHeroCardsStep from '@/components/ParaformRightHeroCardsStep';
import SectionBadge from './SectionBadge';
import PlatformDigitale from '../../../../public/images/Platform/Plateforme digitale.png';

export default function AdvantageOffstoneSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [reveal, setReveal] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(false);
  
  // États pour les compteurs animés
  const [counter17, setCounter17] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // Hook pour détecter la visibilité de la carte
  const cardInView = useInView(cardRef, { 
    once: false, // Se réactive à chaque fois qu'on revoit la section
    amount: 0.3 
  });

  useEffect(() => {
    if (titleVisible) {
      const timeout = setTimeout(() => setBadgeVisible(true), 600);
      return () => clearTimeout(timeout);
    } else {
      setBadgeVisible(false);
    }
  }, [titleVisible]);

  // Effect pour les animations des compteurs
  useEffect(() => {
    if (cardInView && !animationStarted) {
      setAnimationStarted(true);
      
      // Délai pour commencer après l'apparition de la carte (0.7s)
      setTimeout(() => {
        // Animation du compteur 17%
        let current17 = 0;
        const timer17 = setInterval(() => {
          current17 += 1;
          setCounter17(current17);
          if (current17 >= 17) {
            clearInterval(timer17);
          }
        }, 80); // 80ms par étape pour une animation plus visible

      }, 700); // Délai pour attendre l'animation de zoom de la carte

    } else if (!cardInView) {
      // Reset quand on sort de la vue
      setAnimationStarted(false);
      setCounter17(0);
    }
  }, [cardInView, animationStarted]);

  useEffect(() => {
    // Déclenche l'animation du titre quand la section entre dans le viewport (une seule fois)
    const handleScroll = () => {
      if (titleVisible) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 20) {
        setTitleVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [titleVisible]);

  // Animation reveal progress for the title (scroll-based, like TextReveal)
  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const revealStart = rect.top - windowHeight * 0.7;
      const revealEnd = rect.bottom - windowHeight * 0.3;
      let p = 0;
      if (revealEnd <= 0) {
        p = 1;
      } else if (revealStart >= 0) {
        p = 0;
      } else {
        p = 1 - revealEnd / (rect.height + windowHeight * 0.4);
        p = Math.max(0, Math.min(1, p));
      }
      setReveal(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utilise IntersectionObserver pour détecter la visibilité de la vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let observer: IntersectionObserver | null = null;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(video);
    return () => {
      if (observer && video) observer.unobserve(video);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 6.5;
    }
  }, []);

  return (
    <section>
      {/* Première section - Titre et Vidéo */}
      <div ref={sectionRef} className="w-full bg-[#F7F6F1] py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {badgeVisible && (
            <div className="flex justify-center mb-6 md:mb-8 transition-opacity duration-700 opacity-100">
              <SectionBadge colorClass="text-gray-600" text="IMMEUBLES EXCLUSIFS" />
            </div>
          )}
        <div
          ref={titleRef}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[3.5rem] text-center font-light text-[#111] transition-all duration-[1800ms] ease-out mb-8 md:mb-12 lg:mb-16 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
          id="advantage-title"
        >
          {(() => {
            // Two lines, keep <br />
            const text = ["L'avantage d'investir", "avec Offstone."];
            const allLetters = text.join('');
            const totalLetters = allLetters.length;
            const revealedCount = Math.floor(reveal * totalLetters);
            let letterIndex = 0;
            return text.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {line.split('').map((char, i) => {
                  const isRevealed = letterIndex < revealedCount;
                  const span = (
                    <span
                      key={i}
                      style={{
                        color: isRevealed ? '#111' : '#928D80',
                        transition: 'color 0.3s cubic-bezier(.77,0,.18,1)',
                        willChange: 'color',
                      }}
                    >
                      {char}
                    </span>
                  );
                  letterIndex++;
                  return span;
                })}
                {lineIdx === 0 && <br />}
              </React.Fragment>
            ));
          })()}
        </div>
        <div className="flex justify-center mb-8 md:mb-12 lg:mb-16">
          <button
            className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-[#F7B096] hover:text-black hover:border-[#F7B096] group"
            type="button"
          >
            Investir
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>
        </div>
        {/* Container vidéo responsive */}
        <div className="flex justify-center">
          <div className="w-full mx-auto max-w-[1400px] md:max-w-[1500px] xl:max-w-[1600px] 2xl:max-w-[1680px] aspect-[16/9] bg-[#F6F4F0] rounded-lg lg:rounded-xl overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src="/videos/TEST3_Component AdvantageOffStone.mp4"
              muted
              playsInline
              controls={false}
              style={{ background: '#F7F6F1' }}
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = videoRef.current.duration - 0.1;
                  videoRef.current.pause();
                }
              }}
            />
          </div>
        </div>
        </div>
      </div>
      
      {/* Deuxième section - Sourcing Unique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Section gauche - Texte */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 lg:min-h-[600px] flex items-center">
            <div className="w-full">
              <div className="mb-6">
                <SectionBadge colorClass="text-gray-600" text="SOURCING UNIQUE" />
              </div>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[66px] font-normal tracking-tighter leading-tight text-[#111] mb-6 lg:mb-8 transition-all duration-[1200ms] ease-out ${
                  titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Accédez à des opportunités <span style={{ color: '#9D9F9E' }}>exclusives.</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-xl leading-relaxed">
                Chaque projet à accès réservé,<br />
                issu d&apos;un sourcing propriétaire, structuré<br />
                par notre méthode et co-investi à vos côtés.
              </p>
              <button
                className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black group"
                type="button"
              >
                Parler à un expert
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.1}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Section droite - Composant Paraform responsive */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:min-h-[600px] flex items-center justify-center">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full">
              <ParaformRightHeroCardsStep
                size={700}
                gap={18}
                intervalMs={2600}
                cards={[
                  { id: "2barbes", image: "/images/Buildings/rue-la-boetie-11-copie-scaled.jpg" },
                  { id: "truchet", image: "/images/Buildings/Truchet.jpg" },
                  { id: "ienaa",  image: "/images/Buildings/Ienaa.jpg" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Troisième section - Expertise Locale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Section gauche - Image */}
          <div className="w-full lg:w-1/2 order-1">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <div className="w-full h-auto relative rounded-lg overflow-hidden" style={{ width: '600px', height: '500px' }}>
                <Image
                  src="/images/Buildings/Orange buildings.jpg"
                  alt="Orange Buildings"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                
                {/* Carte de performance avec animation */}
                <motion.div 
                  ref={cardRef}
                  className="absolute top-8 sm:top-12 left-4 sm:left-8 right-4 sm:right-8 h-32 sm:h-40 md:h-48 lg:h-56"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <div className="rounded-lg w-full h-full flex flex-col justify-between px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-black/30">
                    {/* Texte avec icône dans la partie haute */}
                    <div className="flex items-center justify-center text-white text-xs sm:text-sm md:text-base font-medium">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mr-2 sm:mr-3 border-[#96F7B5]">
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" fill="#96F7B5" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-center leading-tight">Visez une performance de premier plan</span>
                    </div>

                    {/* Carte blanche en bas */}
                    <div className="bg-white rounded-lg flex-1 flex items-center justify-center relative mx-2 sm:mx-4 md:mx-5">
                      {/* Contenu de la carte responsive */}
                      <div className="w-full h-full flex items-center justify-between p-2 sm:p-3 md:p-4">
                        {/* Gauche - Compteurs */}
                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                          <div className="bg-black text-white rounded w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-xs sm:text-sm md:text-lg font-normal">
                            {counter17}%
                          </div>
                          <div className="bg-black text-white rounded w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-xs sm:text-sm md:text-sm font-normal">
                            3-5
                          </div>
                        </div>
                        
                        {/* Séparateur vertical */}
                        <div className="w-px h-full bg-gray-200 mx-2 sm:mx-3 md:mx-4"></div>
                        
                        {/* Droite - Labels */}
                        <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4 text-gray-700">
                          <div className="text-[10px] sm:text-xs md:text-xs font-normal leading-tight h-8 sm:h-10 md:h-12 flex items-center">
                            Objectif de TRI net annuel
                          </div>
                          <div className="text-[10px] sm:text-xs md:text-xs font-normal leading-tight h-8 sm:h-10 md:h-12 flex items-center">
                            Horizon d&apos;investissement moyen
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Section droite - Texte */}
          <div className="w-full lg:w-1/2 order-2 flex items-start lg:pt-16">
            <div className="w-full">
              <div className="mb-6">
                <SectionBadge colorClass="text-gray-600" text="EXPERTISE LOCALE" />
              </div>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[66px] font-normal tracking-tighter leading-tight text-[#111] mb-6 lg:mb-8 transition-all duration-[1200ms] ease-out ${
                  titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Développons un patrimoine <span style={{ color: '#9D9F9E' }}>ensemble</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-xl leading-relaxed">
                Chaque investissement bénéficie<br />
                de notre expertise terrain<br />
                et de notre réseau privilégié.
              </p>
              <button
                className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black group"
              >
                Découvrir nos projets
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.1}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Quatrième section - Solution Digitale */}
      <div className="w-full bg-[#F7F6F1] py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge au-dessus */}
          <div className="flex justify-center lg:justify-start mb-6 md:mb-8">
            <SectionBadge colorClass="text-gray-600" text="UNE SOLUTION DIGITALE" />
          </div>
          
          {/* Carte principale avec texte à gauche et image à droite */}
          <div className="bg-[#EBE5DF] rounded-lg lg:rounded-xl relative overflow-hidden min-h-[400px] lg:min-h-[500px]">
            <div className="flex flex-col lg:flex-row">
              {/* Section gauche - Texte avec padding */}
              <div className="w-full lg:w-3/5 order-2 lg:order-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 relative z-10">
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[66px] font-normal tracking-tighter leading-tight text-[#111] mb-6 lg:mb-8 transition-all duration-[1200ms] ease-out ${
                    titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  Investissez sereinement avec <span style={{ color: '#9D9F9E' }}>Offstone.</span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-xl leading-relaxed">
                  Une plateforme digitale claire<br />
                  pour investir et suivre vos<br />
                  investissements immobiliers.
                </p>
                <button
                  className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black group"
                  type="button"
                >
                  Parler à un expert
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.1}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </div>

              {/* Image Plateforme - Collée au bord droit absolu */}
              <div className="w-full lg:w-2/5 order-1 lg:order-2 p-6 sm:p-8 md:p-10 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-0 lg:p-0 lg:w-[420px] xl:w-[480px]">
                <div className="relative w-full aspect-[4/3] lg:translate-x-0">
                  <Image
                    src={PlatformDigitale}
                    alt="Plateforme digitale"
                    fill
                    className="object-contain object-right"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
