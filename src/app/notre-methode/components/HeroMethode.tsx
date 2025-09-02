'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Remplace le composant dynamique par une image statique à droite

export default function HeroMethode() {
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    // Animation d'entrée du titre au chargement de la page
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-[110px] pb-[32px] bg-white">
      <div className="container mx-auto px-20 sm:px-32">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Section gauche - Texte */}
          <div className="lg:w-1/2 lg:pr-12 lg:mb-0 mt-36">
            <div className="mb-5">
              <div className="flex items-center mb-1 pl-[2px] mt-[-30px]">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
                <span className="text-gray-600 text-xs tracking-[0.18em] ml-[6px] font-medium uppercase">SOURCING UNIQUE</span>
              </div>
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

          {/* Section droite - Image statique */}
          <motion.div 
            className="lg:w-1/2 lg:pl-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex justify-center">
              <img
                src="/images/Buildings/Truchet.jpg"
                alt="Illustration de notre méthode"
                className="w-full max-w-[560px] rounded-2xl shadow-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


