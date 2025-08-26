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
<section className="PeopleDoSection relative pt-[120px] pb-[80px] bg-white z-50 overflow-hidden">
<div ref={sectionRef} className="container-responsive">
    <div className="flex flex-col lg:flex-row items-center justify-start -mb-6">
      <motion.div
        className="lg:w-1/2 lg:pl-12 lg:pr-12 lg:mb-0"
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
        <p className="text-[15px] md:text-[17px] text-gray-600 mb-8 max-w-xl">
          Chaque projet à accès réservé,<br />
          issu d&apos;un sourcing propriétaire, structuré<br />
          par notre méthode et co-investi à vos côtés.
        </p>
        <button
className="h-11 flex items-center justify-center bg-[#F7B096] text-black font-normal rounded-full px-6 text-base shadow-sm border border-[#F7B096] transition hover:bg-[#222222] hover:text-white mt-8 group"
          style={{
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          }}
        >
          Parler à un expert
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="ml-2 w-5 h-5 text-black group-hover:text-white transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L7 17M7 7h10v10"
            />
          </svg>
        </button>
      </motion.div>
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col -mb-4">
              <motion.div
                className="w-full h-[600px] relative mt-16 rounded-[10px] overflow-hidden"
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageVariants}
              >
                <Image
                  src="/images/Team/Team_Photo_Cropped.jpg"
                  alt="Team_Photo"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="w-full text-xs text-gray-500 text-center mt-4">
                L&apos;équipe d&apos;Offstone
              </div>
            </div>
            <div className="flex flex-col -mb-4">
              <motion.div
                className="w-full h-[600px] relative rounded-[10px] overflow-hidden"
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageVariants}
              >
                <Image
                  src="/images/personnalites/JONATHAN_ANGUELOV_0048bd2_fcf52cbd2a.jpg"
                  alt="Image 1"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="w-full text-xs text-gray-500 text-center mt-4">
                Jonathan Anguelov d&apos;Offstone
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleDoSection;
