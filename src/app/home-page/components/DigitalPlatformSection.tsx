'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionBadge from './SectionBadge';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DigitalPlatformSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation scroll (optionnel, conservé pour compatibilité mais non utilisé dans le rendu)
  // const [titleVisible, setTitleVisible] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (titleVisible) return;
  //     if (!sectionRef.current) return;
  //     const rect = sectionRef.current.getBoundingClientRect();
  //     const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  //     if (rect.top < windowHeight - 20) {
  //       setTitleVisible(true);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   handleScroll();
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [titleVisible]);

  return (
    <section ref={sectionRef} className="w-full bg-[#F7F6F1] py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge au-dessus */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start mb-6 md:mb-8"
        >
          <SectionBadge colorClass="text-gray-600" text="UNE SOLUTION DIGITALE" />
        </motion.div>

        {/* Carte principale avec texte à gauche et image à droite */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#EBE5DF] rounded-lg lg:rounded-xl relative overflow-hidden min-h-[400px] lg:min-h-[500px]"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Section gauche - Texte avec padding */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-3/5 order-2 lg:order-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 relative z-10"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[66px] font-normal tracking-tighter leading-tight text-[#111] mb-6 lg:mb-8`}
              >
                Investissez sereinement avec <span style={{ color: '#9D9F9E' }}>Offstone.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-xl leading-relaxed"
              >
                Retrouvez nos clubs deals et<br />
                opportunités de co-investissement sur<br />
                notre plateforme digitale.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/investir"
                  className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-transparent hover:text-black hover:border-black group"
                >
                  En savoir plus sur le fonctionnement
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.1}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Plateforme - Alignée aux bords droit et bas de la carte */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-2/5 order-1 lg:order-2 pl-6 sm:pl-8 md:pl-10 pr-0 pb-0 pt-6 sm:pt-8 md:pt-10 lg:absolute lg:bottom-0 lg:right-0 lg:p-0 lg:w-[420px] xl:w-[480px]"
            >
              <div className="relative w-full aspect-[4/3] lg:translate-x-0">
                <Image
                  src="/images/Platform/New%20offstone%20platform.png"
                  alt="New offstone platform"
                  fill
                  className="object-contain object-right-bottom"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
