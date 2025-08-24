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
      videoRef.current.playbackRate = 2.25;
    }
  }, []);

  return (
    <section>
<div ref={sectionRef} className="w-full" style={{ backgroundColor: '#F7F6F1', paddingTop: '6rem', paddingBottom: '5rem' }}>
        {badgeVisible && (
<div className="flex justify-center mt-0 mb-3 transition-opacity duration-700 opacity-100">
            <SectionBadge colorClass="text-gray-600" text="IMMEUBLES EXCLUSIFS" />
          </div>
        )}
        <div
          ref={titleRef}
          className={`mt-0 mb-0 text-5xl md:text-[2.75rem] lg:text-[3.5rem] text-center font-light text-[#111] transition-all duration-[1800ms] ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'AllianceNo1-Regular, sans-serif', display: 'inline-block', width: '100%' }}
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
<div className="flex justify-center mt-8 mb-0">
          <button
            className="h-11 flex items-center justify-center bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-[#F7B096] hover:text-black hover:border-[#F7B096] group"
            style={{
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            }}
            type="button"
          >
            Investir
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="ml-2 w-5 h-5 text-white group-hover:text-black transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 7L7 17M7 7h10v10"
              />
            </svg>
          </button>
        </div>
<div className="flex justify-center mt-8">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              minHeight: 260,
              width: 1550,
              height: 500,
              overflow: 'hidden',
              background: '#F6F4F0'
            }}
          >
            <video
              ref={videoRef}
              className="max-w-full max-h-full object-contain"
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
      <div className="container mx-auto px-20 sm:px-32 mt-32">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Section gauche - Texte */}
          <div className="lg:w-1/2 lg:pr-12 lg:mb-0 mt-36">
            <div className="mb-5">
              <SectionBadge colorClass="text-gray-600" text="SOURCING UNIQUE" />
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-8 transition-all duration-[1200ms] ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Accédez à des opportunités <span style={{ color: '#9D9F9E' }}>exclusives.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] text-gray-600 mb-8 max-w-xl mt-16">
              Chaque projet à accès réservé,<br />
              issu d&apos;un sourcing propriétaire, structuré<br />
              par notre méthode et co-investi à vos côtés.
            </p>
            <button
              className="h-11 flex items-center justify-center bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black mt-8 group"
              style={{
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                width: "auto",
                minWidth: "unset",
                maxWidth: "unset"
              }}
              type="button"
            >
              Parler à un expert
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 w-5 h-5 text-white group-hover:text-black transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 7L7 17M7 7h10v10"
                />
              </svg>
            </button>
          </div>

          {/* Section droite - Composant Paraform */}
          <div className="lg:w-1/2 lg:pl-12 flex justify-center lg:justify-end">
            <div>
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

      {/* Section symétrique - Image à gauche, Texte à droite */}
      <div className="container mx-auto px-20 sm:px-32 mt-48">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Section gauche - Image */}
          <div className="lg:w-2/5 lg:pr-20 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-full h-auto relative rounded-lg overflow-hidden" style={{ width: '600px', height: '650px' }}>
                <Image
                  src="/images/Buildings/Orange buildings.jpg"
                  alt="Orange Buildings"
                  fill
                  className="object-cover"
                />
                
                {/* Carte noire avec opacité et animation zoom globale */}
                <motion.div 
                  ref={cardRef}
                  className="absolute flex flex-col items-center justify-between" 
                  style={{ top: '60px', left: '57px', right: '57px', height: '220px' }}
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
                  <div 
                    className="rounded-lg w-full h-full flex flex-col justify-between px-5 py-4"
                    style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {/* Texte avec icône dans la partie haute */}
                    <div className="flex items-center justify-center text-white text-base font-medium">
                      <div 
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3"
                        style={{ borderColor: '#96F7B5' }}
                      >
                        <svg className="w-2.5 h-2.5" fill="#96F7B5" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Visez une performance de premier plan
                    </div>

                    {/* Carte blanche en bas */}
                    <div 
                      className="bg-white rounded-lg flex items-center justify-center relative"
                      style={{ 
                        width: 'calc(100% - 40px)', 
                        height: '140px',
                        alignSelf: 'center'
                      }}
                    >
                      {/* Carrés noirs à gauche avec compteurs animés */}
                      <div className="absolute left-4 h-full flex flex-col justify-center">
                        {/* Carré du haut - 17% animé - centré entre le haut de la carte et la ligne grise */}
                        <div 
                          className="bg-black text-white rounded w-12 h-12 flex items-center justify-center text-lg font-normal" 
                          style={{ marginTop: '12px' }}
                        >
                          {counter17}%
                        </div>
                        {/* Carré du bas - 3-5 statique - centré entre la ligne grise et le bas de la carte */}
                        <div 
                          className="bg-black text-white rounded w-12 h-12 flex items-center justify-center text-sm font-normal" 
                          style={{ marginTop: '14px' }}
                        >
                          3-5
                        </div>
                      </div>

                      {/* Trait horizontal */}
                      <div 
                        className="absolute"
                        style={{
                          width: 'calc(100% - 80px)',
                          height: '1px',
                          backgroundColor: '#F4F2F2'
                        }}
                      ></div>

                      {/* Textes à droite des carrés, alignés au centre vertical des carrés */}
                      <div className="absolute left-20 h-full flex flex-col justify-center">
                        {/* Texte du haut - aligné avec le carré du haut */}
                        <div className="text-gray-700 text-xs font-normal leading-tight flex items-center h-12" style={{ marginTop: '-7px' }}>
                          Objectif de TRI net annuel
                        </div>
                        {/* Texte du bas - aligné avec le carré du bas */}
                        <div className="text-gray-700 text-xs font-normal leading-tight flex items-center h-12" style={{ marginTop: '14px' }}>
                          Horizon d&apos;investissement moyen
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Section droite - Texte */}
          <div className="lg:w-3/5 lg:pl-20 lg:mb-0 flex items-center justify-center min-h-[650px]">
            <div className="text-left">
          <div className="mb-5 flex justify-start">
            <SectionBadge colorClass="text-gray-600" text="EXPERTISE LOCALE" />
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-8 transition-all duration-[1200ms] ease-out ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Développons<br />
            un patrimoine<br />
            <span style={{ color: '#9D9F9E' }}>ensemble</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-gray-600 mb-8 max-w-xl mt-16">
            Chaque investissement bénéficie<br />
            de notre expertise terrain<br />
            et de notre réseau privilégié.
          </p>
          <button
            className="h-11 flex items-center justify-center bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black mt-8 group"
            style={{
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            }}
          >
            Découvrir nos projets
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="ml-2 w-5 h-5 text-white group-hover:text-black transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 7L7 17M7 7h10v10"
              />
            </svg>
          </button>
            </div>
          </div>
        </div>
      </div>
      {/* DUPLICATE START */}
      <div className="container relative mx-auto px-20 sm:px-32 mt-32" style={{ background: "#f7f6f1", paddingTop: "8rem", paddingBottom: "8rem" }}>
        {/* Badge sorti au-dessus de la carte, sans affecter le flux */}
        <div className="absolute top-20 sm:top-24 left-20 sm:left-32">
          <SectionBadge colorClass="text-gray-600" text="UNE SOLUTION DIGITALE" />
        </div>
        <div className="w-full rounded-[10px] bg-[#EBE5DF] flex flex-col justify-center pl-12" style={{ minHeight: 560 }}>
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[400px] mt-0">
          {/* Section gauche - Texte (DUPE) */}
          <div className="lg:w-1/2 lg:pr-6 pl-12 lg:mb-0 mt-0 flex flex-col justify-center h-full">
            <h2
              className={`text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-4 transition-all duration-[1200ms] ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Investissez<br />
              sereinement<br />
              avec <span style={{ color: '#9D9F9E' }}>Offstone.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] text-gray-600 mb-6 max-w-xl mt-4">
              Une plateforme digitale claire<br />
              pour investir et suivre vos<br />
              investissements immobiliers.
            </p>
            <button
              className="h-11 flex items-center justify-center bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black mt-6 group"
              style={{
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                width: "fit-content",
                minWidth: "180px"
              }}
              type="button"
            >
              Parler à un expert
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 w-5 h-5 text-white group-hover:text-black transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 7L7 17M7 7h10v10"
                />
              </svg>
            </button>
          </div>

          {/* Section droite - Image Plateforme (DUPE) */}
          <div className="lg:w-1/2 lg:pl-12 flex items-center justify-center">
            <div className="relative w-[620px] h-[480px] overflow-hidden">
              <Image
                src={PlatformDigitale}
                alt="Plateforme digitale"
                fill
                className="object-contain object-left"
                sizes="(max-width: 1024px) 100vw, 620px"
                priority
              />
            </div>
          </div>
        </div>
        </div>
      </div>
      {/* DUPLICATE END */}
    </section>
  );
}
