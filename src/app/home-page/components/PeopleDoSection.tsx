'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import SectionBadge from './SectionBadge';

const PeopleDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (titleVisible) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 100) {
        setTitleVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [titleVisible]);

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
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  };

  return (
    <section className="PeopleDoSection relative pt-16 md:pt-24 lg:pt-[120px] pb-12 md:pb-16 lg:pb-[80px] bg-white z-50 overflow-hidden">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          <motion.div
            className="w-full lg:w-2/5 lg:pr-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={textVariants}
          >
            <div className="mb-5">
              <SectionBadge colorClass="text-gray-600" text="INVESTISSONS ENSEMBLE" />
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-8 transition-all duration-[1200ms] ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              id="peopledo-title"
            >
              Construisons ensemble notre immobilier.
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Chaque projet, réservé à nos membres, est issu de notre sourcing propriétaire. Nous le structurons avec méthode, et vous investissez à nos côtés.
            </p>
            <a
              href="/investir"
              className="inline-flex items-center justify-center h-11 bg-[#F7B096] text-black font-normal rounded-full px-6 text-base shadow-sm border border-[#F7B096] transition hover:bg-black hover:text-white hover:border-black group"
            >
              Investir à nos côtés
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.1}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </motion.div>

          <div className="w-full lg:w-3/5">
            <motion.div
              className="w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] relative rounded-lg overflow-hidden bg-gray-100"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={imageVariants}
            >
              <Image
                src="/images/Buildings/image hausmannien buildings.webp"
                alt="Bâtiments haussmanniens Offstone"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleDoSection;
