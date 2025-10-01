'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroEspaceMembre: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative pt-24 md:pt-[110px] pb-10 md:pb-[32px] bg-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-32">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-10 lg:gap-0">
          {/* Section gauche - Texte */}
          <motion.div
            className="w-full lg:w-1/2 lg:pr-12 lg:mb-0 mt-8 md:mt-20 lg:mt-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={textVariants}
          >
            <div className="mb-5">
              <div className="flex items-center mb-1 pl-[2px] mt-0 md:mt-[-30px]">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
                <span className="text-gray-600 text-xs tracking-[0.18em] ml-[6px] font-medium uppercase">PLATEFORME DIGITALE</span>
              </div>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-8 transition-all duration-[1200ms] ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Notre plateforme digitale <span style={{ color: '#9D9F9E' }}>arrive bientôt.</span>
            </h1>

            <p className="text-[15px] md:text-[17px] text-gray-600 mb-8 max-w-xl mt-6 md:mt-10">
              Accédez à votre espace membre pour suivre vos investissements,<br />
              consulter vos documents et gérer votre portefeuille immobilier<br />
              en toute transparence
            </p>

            <div className="flex justify-start mt-8">
              <button
                onClick={() => {
                  try {
                    const url = typeof window !== 'undefined' ? window.location.href : undefined;
                    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                    (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })({
                      page_url: url,
                      ref: typeof document !== 'undefined' ? document.referrer : undefined,
                      utm_source: params.get('utm_source') || undefined,
                      utm_medium: 'internal_cta',
                      utm_campaign: 'espace-membre',
                      utm_content: 'HeroEspaceMembre',
                      utm_term: 'candidatez',
                      cta_id: params.get('cta_id') || 'espace_membre_hero',
                      asset_class: 'retail'
                    });
                  } catch {}
                }}
                className="inline-flex items-center justify-center h-11 bg-[#F7B096] text-black font-normal rounded-full px-6 text-base shadow-sm border border-[#F7B096] transition hover:bg-black hover:text-white hover:border-black group"
              >
                Candidatez
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
          </motion.div>

          {/* Section droite - Image */}
          <motion.div
            className="w-full lg:w-1/2 lg:pl-12 flex justify-center mt-4 lg:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
          >
            <div className="relative w-full max-w-[500px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="/images/Platform/New%20offstone%20platform.webp"
                alt="New offstone platform - Bientôt disponible"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-contain object-center"
                priority
              />
              {/* Overlay avec texte "Bientôt disponible" */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900 mb-2">Bientôt disponible</div>
                  <div className="text-sm text-gray-600">Plateforme en développement</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroEspaceMembre;
