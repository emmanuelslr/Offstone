"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Normalisation minimale: encode les espaces et caractères spéciaux
const fixLocalSrc = (p: string) => (typeof p === 'string' ? encodeURI(p) : p);

// Import dynamique de TextReveal pour Ã©viter les problÃ¨mes de chunks
const TextReveal = dynamic(() => import("../../home-page/components/TextReveal"), {
  ssr: false,
  loading: () => (
    <div className="text-3xl md:text-4xl lg:text-[2.85rem] max-w-[900px] text-black">
      Associez-vous avec Jonathan Anguelov et faites l&apos;acquisition d&apos;immeubles exclusifs.
    </div>
  )
});

export default function StickySidebarSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.3 });
  const counter = 17;

  // VÃ©rification cÃ´tÃ© client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = [
    {
      title: "Projets exclusifs",
      description: "Accédez à un portefeuille de projets immobiliers premium : opérations de rénovation haut de gamme, développements résidentiels et acquisitions stratégiques en France et Europe.",
      image: "/images/Acquisitions/Paris - Resi.webp",
      number: "01"
    },
    {
      title: "Expertise Jonathan Anguelov",
      description: "Bénéficiez de 15 ans d'expérience en investissement immobilier et d'un réseau professionnel établi. Notre équipe co-investit ses propres fonds sur chaque projet.",
      image: "/images/personnalites/JoPublic.JPG",
      number: "02"
    },
    {
      title: "Un réseau qui crée la valeur",
      description: "Sessions de travail exclusives, soirées investisseurs, visites d'immeubles : nous organisons des rencontres privilégiées qui renforcent l'écosystème. Le réseau immobilier de Jonathan Anguelov ouvre des opportunités inaccessibles au grand public.",
      image: "/images/personnalites/DSC03067.JPG",
      number: "03"
    },
    {
      title: "Investir en toute sérénité",
      description: "Plateforme sécurisée, documentation complète, suivi en temps réel. Gérez vos participations immobilières depuis un tableau de bord unifié et transparent.",
      image: "/images/Backgrounds/Mokup ecran tabouret.jpeg",
      number: "04"
    }
  ];

  useEffect(() => {
    // VÃ©rification que nous sommes cÃ´tÃ© client
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('.step-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Plus d'animation, compteur statique Ã  17%

  // Ã‰viter le rendu cÃ´tÃ© serveur pour Ã©viter l'hydratation
  if (!isClient) {
    return (
      <section style={{ backgroundColor: '#F7F5F2', paddingTop: '0px', paddingBottom: '120px' }}>
        <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-32">
          <div className="pt-24 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
            <span className="text-gray-600 text-xs tracking-[0.18em]">COMMENT ÇA MARCHE</span>
          </div>
          <div className="pt-0 pb-2 mb-16 -mt-8" style={{ backgroundColor: '#F7F5F2' }}>
            <div className="text-3xl md:text-4xl lg:text-[2.85rem] max-w-[900px] text-black">
              Associez-vous avec Jonathan Anguelov et faites l&apos;acquisition d&apos;immeubles exclusifs.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: '#F7F5F2', paddingTop: '0px', paddingBottom: '120px' }}>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-32">
        {/* Badge COMMENT Ã‡A MARCHE */}
        <div className="pt-24 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
          <span className="text-gray-600 text-xs tracking-[0.18em]">COMMENT ÇA MARCHE</span>
        </div>

        {/* TextReveal Section */}
        <div className="pt-0 pb-1 mb-8 sm:mb-12 md:mb-16 mt-2 sm:mt-3 md:-mt-8" style={{ backgroundColor: '#F7F5F2' }}>
          <TextReveal
            text="Associez-vous avec Jonathan Anguelov et faites l&apos;acquisition d&apos;immeubles exclusifs."
            multiline={true}
            backgroundColor="bg-[#F7F5F2]"
            className="text-3xl md:text-4xl lg:text-[2.85rem] max-w-[900px] text-black"
          />
        </div>

  <div className="flex flex-col lg:flex-row gap-0">
          {/* Sticky Sidebar Ã  gauche avec barre de progression */}
          <div className="hidden lg:block lg:w-1/4">
            <div
              style={{
                position: 'sticky',
                top: '24rem',
                height: 'fit-content'
              }}
            >
              {/* Barre de progression Ã  gauche */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300">
                  <div
                    className="w-1 bg-black transition-all duration-500 ease-out"
                    style={{
                      height: `${((activeStep + 1) / steps.length) * 100}%`
                    }}
                  />
                </div>

                {/* Navigation des Ã©tapes */}
                <div className="space-y-10 pl-8 pr-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 transition-all duration-300 ${
                        index === activeStep ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      <span className={`text-base font-medium transition-all duration-300 leading-tight ${
                        index === activeStep ? 'text-black' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section centrale et droite combinÃ©es pour l'alignement */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-10 sm:space-y-14 lg:space-y-24">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="step-section flex flex-col lg:flex-row items-start gap-6 sm:gap-10 lg:gap-20"
                >
                  {/* Image ou carte animÃ©e pour l'Ã©tape 3 */}
                  <div className="w-full lg:w-1/2 flex justify-center ml-0 lg:-ml-8 order-2 lg:order-1 mt-4 sm:mt-6 lg:mt-0">
                    {index === 2 ? (
                      <div
                        className="relative rounded-lg h-60 xs:h-72 sm:h-80 md:h-96 lg:h-[520px] w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: '#EFEAE7',
                          backgroundImage: `url("${fixLocalSrc(step.image)}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Image de fond */}
                        <Image
                          src={fixLocalSrc(step.image)}
                          alt={`Phase ${index + 1} - ${step.title}`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover rounded-lg"
                          priority={index === 0}
                        />
                        {/* Overlay carte animÃ©e */}
                        <motion.div
                          ref={cardRef}
                          className="absolute flex flex-col items-center justify-between top-6 md:top-14 left-4 right-4 md:left-[57px] md:right-[57px] h-[180px] md:h-[220px]"
                          style={{
                            borderRadius: '18px',
                            backgroundColor: 'rgba(0,0,0,0.32)',
                            zIndex: 20
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={cardInView && activeStep === 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 120, damping: 15 }}
                        >
                          <div className="rounded-lg w-full h-full flex flex-col justify-between px-4 py-3 md:px-5 md:py-4">
                            {/* Texte avec badge */}
                            <div className="flex items-center justify-center text-white text-base font-medium">
                              <div
                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3"
                                style={{ borderColor: '#96F7B5' }}
                              >
                                <svg className="w-2.5 h-2.5" fill="#96F7B5" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              Structure robuste & performance
                            </div>
                            {/* Carte blanche en bas */}
                            <div
                              className="rounded-lg flex items-center justify-center relative w-[calc(100%-40px)] h-[120px] md:h-[140px]"
                              style={{ backgroundColor: '#EFEAE7', alignSelf: 'center' }}
                            >
                              {/* CarrÃ© noir avec compteur animÃ© */}
                              <div className="absolute left-4 h-full flex flex-col justify-center">
                                <div
                                  className="bg-black text-white rounded w-12 h-12 flex items-center justify-center text-lg font-normal"
                                  style={{ marginTop: '12px' }}
                                >
                                  {counter}%
                                </div>
                                <div
                                  className="bg-black text-white rounded w-12 h-12 flex items-center justify-center text-sm font-normal"
                                  style={{ marginTop: '14px' }}
                                >
                                  3-5
                                </div>
                              </div>
                              {/* Trait horizontal */}
                              <div className="absolute left-24 right-4 top-1/2 h-[2px] bg-gray-200" />
                              {/* LibellÃ©s Ã  droite */}
                              <div className="absolute right-6 top-4 bottom-4 flex flex-col justify-between text-gray-800">
                                <div className="text-sm">Prime sÃ©curitÃ©</div>
                                <div className="text-sm">AnnÃ©es</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div
                        className="rounded-lg h-60 xs:h-72 sm:h-80 md:h-96 lg:h-[520px] w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl flex items-center justify-center overflow-hidden relative"
                        style={{
                          backgroundColor: '#EFEAE7',
                          backgroundImage: `url("${fixLocalSrc(step.image)}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <Image
                          src={fixLocalSrc(step.image)}
                          alt={`Phase ${index + 1} - ${step.title}`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover rounded-lg"
                          priority={index === 0}
                        />
                      </div>
                    )}
                  </div>

                  {/* Bloc de contenu Ã  droite */}
                  <div className="w-full lg:w-1/2 lg:ml-12 order-1 lg:order-2">
                    <div className="pt-2 sm:pt-4 lg:pt-12 max-w-none lg:max-w-xs">
                      <div className="text-sm lg:text-base text-gray-500 mb-2">{step.number}</div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111] mb-6 lg:mb-40">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      {index === 0 ? (
                        <a href="/nos-realisations" className={`h-9 flex items-center justify-center font-normal rounded-full px-5 text-sm shadow-sm border border-black transition group w-fit ${
                          index === 1 || index === 3
                            ? 'bg-transparent text-black hover:bg-transparent hover:text-black'
                            : 'bg-black text-white hover:bg-transparent hover:text-black'
                        }`}>
                          Nos réalisations
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                              index === 1 || index === 3
                                ? 'text-black group-hover:text-black'
                                : 'text-white group-hover:text-black'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7L7 17M7 7h10v10"
                            />
                          </svg>
                        </a>
                      ) : index === 1 ? (
                        <a href="/notre-histoire" className={`h-9 flex items-center justify-center font-normal rounded-full px-5 text-sm shadow-sm border border-black transition group w-fit ${
                          index === 1 || index === 3
                            ? 'bg-transparent text-black hover:bg-black hover:text-white'
                            : 'bg-black text-white hover:bg-white hover:text-black'
                        }`}>
                          Notre histoire
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                              index === 1 || index === 3
                                ? 'text-black group-hover:text-white'
                                : 'text-white group-hover:text-white'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7L7 17M7 7h10v10"
                            />
                          </svg>
                        </a>
                      ) : index === 2 ? (
                        <a href="/#offdeal-advantage-like" className={`h-9 flex items-center justify-center font-normal rounded-full px-5 text-sm shadow-sm border border-black transition group w-fit ${
                          index === 1 || index === 3
                            ? 'bg-transparent text-black hover:bg-[#f7b096] hover:text-white hover:border-[#f7b096]'
                            : 'bg-black text-white hover:bg-[#f7b096] hover:text-white hover:border-[#f7b096]'
                        }`}>
                          Nos avantages
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                              index === 1 || index === 3
                                ? 'text-black group-hover:text-white'
                                : 'text-white group-hover:text-white'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7L7 17M7 7h10v10"
                            />
                          </svg>
                        </a>
                      ) : index === 3 ? (
                        <button 
                          type="button"
                          onClick={() => {
                            try {
                              const url = typeof window !== 'undefined' ? window.location.href : undefined;
                              const detail = {
                                page_url: url,
                                ref: typeof document !== 'undefined' ? document.referrer : undefined,
                                utm_source: 'site',
                                utm_medium: 'internal_cta',
                                utm_campaign: 'pourquoi-offstone',
                                utm_content: 'cta:comment-ca-marche',
                                utm_term: 'candidater',
                                cta_id: 'pourquoi_offstone_comment_ca_marche_candidater',
                                asset_class: 'retail'
                              } as any;
                              (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })(detail);
                            } catch {}
                          }}
                          className={`h-9 flex items-center justify-center font-normal rounded-full px-5 text-sm shadow-sm border border-black transition group w-fit ${
                            index === 1 || index === 3
                              ? 'bg-transparent text-black hover:bg-black hover:text-white'
                              : 'bg-black text-white hover:bg-black hover:text-white'
                          }`}
                        >
                          Candidater
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                              index === 1 || index === 3
                                ? 'text-black group-hover:text-white'
                                : 'text-white group-hover:text-white'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7L7 17M7 7h10v10"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button className={`h-9 flex items-center justify-center font-normal rounded-full px-5 text-sm shadow-sm border border-black transition group w-fit ${
                          index === 1 || index === 3
                            ? 'bg-transparent text-black hover:bg-black hover:text-white'
                            : 'bg-black text-white hover:bg-white hover:text-black'
                        }`}>
                          En savoir plus
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`ml-2 w-4 h-4 transition-transform ${
                              index === 1 || index === 3
                                ? 'text-black group-hover:text-black'
                                : 'text-white group-hover:text-black'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7L7 17M7 7h10v10"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


