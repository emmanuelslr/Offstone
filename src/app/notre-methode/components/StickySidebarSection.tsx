"use client";

import React, { useState, useEffect, useRef } from "react";
import TextReveal from "../../home-page/components/TextReveal";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function StickySidebarSection() {
  const [activeStep, setActiveStep] = useState(0);
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.3 });
  const counter = 17;

  const steps = [
    {
      title: "Co-investir ensemble",
      description: "Notre capital aux côtés du vôtre sur chaque opération. Intérêts pleinement alignés.",
      image: "/images/Backgrounds/Mountain.jpg",
      number: "01"
    },
    {
      title: "Sourcing propriétaire",
      description: "Accès direct aux vendeurs et opérateurs, sélection sans compromis, tickets adaptés.",
      image: "/images/Buildings/Ienaa.jpg",
      number: "02"
    },
    {
      title: "Structure robuste",
      description: "Acheter sous coût de remplacement lorsque la marge de sécurité est quantifiée. Structure robuste.",
      image: "/images/Buildings/Orange buildings.jpg",
      number: "03"
    },
    {
      title: "Suivi digital",
      description: "Repositionner l'actif, piloter l'exploitation et tout suivre sur une plateforme claire et sécurisée.",
      image: "/images/Backgrounds/Background2.jpg",
      number: "04"
    }
  ];

  useEffect(() => {
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

  // Plus d'animation, compteur statique à 17%

  return (
    <section style={{ backgroundColor: '#F7F6F1', paddingTop: '0px', paddingBottom: '120px' }}>
      <div className="px-20 sm:px-32">
        {/* Badge COMMENT ÇA MARCHE */}
        <div className="pt-24 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
          <span className="text-gray-600 text-xs tracking-[0.18em]">COMMENT ÇA MARCHE</span>
        </div>
        
        {/* TextReveal Section */}
        <div className="pt-0 pb-2 mb-16 -mt-8" style={{ backgroundColor: '#F7F6F1' }}>
          <TextReveal 
            text="Co-investissez avec Jonathan et l&apos;équipe dans des immeubles exclusifs, grâce à une méthode éprouvée." 
            multiline={true}
            backgroundColor="bg-[#F7F6F1]"
            className="text-3xl md:text-4xl lg:text-[2.85rem] max-w-[900px] text-black"
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Sticky Sidebar à gauche avec barre de progression */}
          <div className="lg:w-1/4">
            <div 
              style={{ 
                position: 'sticky', 
                top: '24rem',
                height: 'fit-content'
              }}
            >
              {/* Barre de progression à gauche */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300">
                  <div 
                    className="w-1 bg-black transition-all duration-500 ease-out"
                    style={{ 
                      height: `${((activeStep + 1) / steps.length) * 100}%`
                    }}
                  />
                </div>
                
                {/* Navigation des étapes */}
                <div className="space-y-10 pl-8">
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-4 transition-all duration-300 ${
                        index === activeStep ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      <span className={`text-base font-medium transition-all duration-300 ${
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
          
          {/* Section centrale et droite combinées pour l'alignement */}
          <div className="lg:w-3/4">
            <div className="space-y-24">
{steps.map((step, index) => (
                <div 
                  key={index}
                  className="step-section flex flex-col lg:flex-row items-start gap-20"
                >
                  {/* Image ou carte animée pour l'étape 3 */}
                  <div className="lg:w-1/2 flex justify-center -ml-8">
                    {index === 2 ? (
                      <div className="relative bg-gray-100 rounded-lg h-[520px] w-full max-w-3xl flex items-center justify-center overflow-hidden">
                        {/* Image de fond */}
                        <Image 
                          src={step.image}
                          alt={`Phase ${index + 1} - ${step.title}`}
                          fill
                          className="object-cover rounded-lg relative z-10"
                        />
                        {/* Overlay carte animée */}
                        <motion.div
                          ref={cardRef}
                          className="absolute flex flex-col items-center justify-between"
                          style={{ 
                            top: '60px', left: '57px', right: '57px', height: '220px',
                            borderRadius: '18px',
                            backgroundColor: 'rgba(0,0,0,0.32)',
                            zIndex: 20
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={cardInView && activeStep === 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 120, damping: 15 }}
                        >
                          <div className="rounded-lg w-full h-full flex flex-col justify-between px-5 py-4">
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
                              className="bg-white rounded-lg flex items-center justify-center relative"
                              style={{ 
                                width: 'calc(100% - 40px)', 
                                height: '140px',
                                alignSelf: 'center'
                              }}
                            >
                              {/* Carré noir avec compteur animé */}
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
                              <div 
                                className="absolute"
                                style={{
                                  width: 'calc(100% - 80px)',
                                  height: '1px',
                                  backgroundColor: '#F4F2F2'
                                }}
                              ></div>
                              {/* Textes à droite des carrés */}
                              <div className="absolute left-20 h-full flex flex-col justify-center">
                                <div className="text-gray-700 text-xs font-normal leading-tight flex items-center h-12" style={{ marginTop: '-7px' }}>
                                  Objectif de TRI net annuel
                                </div>
                                <div className="text-gray-700 text-xs font-normal leading-tight flex items-center h-12" style={{ marginTop: '14px' }}>
                                  Horizon d&apos;investissement moyen
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ) : index === 3 ? (
                      <div className="relative bg-gray-100 rounded-lg h-[520px] w-full max-w-3xl flex items-center justify-center overflow-hidden">
                        {/* Image de fond */}
                        <Image 
                          src={step.image}
                          alt={`Phase ${index + 1} - ${step.title}`}
                          fill
                          className="object-cover rounded-lg relative z-10"
                        />
                        {/* Superposition de l'image Plateforme */}
                        <Image
                          src="/images/Platform/Plateforme%20digitale.png"
                          alt="Plateforme digitale"
                          width={300}
                          height={200}
                          className="absolute z-20"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '80%',
                            maxHeight: '80%',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded-lg h-[520px] w-full max-w-3xl flex items-center justify-center overflow-hidden relative">
                        <Image 
                          src={step.image}
                          alt={`Phase ${index + 1} - ${step.title}`}
                          fill
                          className="object-cover rounded-lg relative z-10"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Bloc de contenu à droite */}
                  <div className="lg:w-1/2 lg:ml-12">
                    <div className="pt-12 max-w-xs">
                      <div className="text-base text-gray-500 mb-2">{step.number}</div>
                      <h3 className="text-3xl font-medium text-[#111] mb-40">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <button className="h-9 flex items-center justify-center bg-black text-white font-normal rounded-full px-4 text-sm shadow-sm border border-black transition hover:bg-white hover:text-black group">
                        En savoir plus
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="ml-2 w-4 h-4 text-white group-hover:text-black transition-transform"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
