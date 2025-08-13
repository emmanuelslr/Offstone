'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PeopleDoSection: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
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
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
<section className="PeopleDoSection relative pt-[170px] pb-[80px] bg-white z-50 overflow-hidden">
<div className="container mx-auto px-4">
<div className="flex flex-col lg:flex-row items-center justify-start -mb-10">
          <motion.div
            className="lg:w-1/2 lg:pl-12 lg:pr-12 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
          >
<h2 className="text-5xl md:text-6xl font-light text-[#111] mb-9">
              La valeur vient des bâtisseurs.
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-xl">
              Chaque projet est structuré, porté, et co-investi par Jonathan Anguelov, ses associés et son équipe.
            </p>
<button
  className="h-11 flex items-center justify-center bg-[#F7B096] text-black font-normal rounded-full px-6 text-base shadow-sm border border-[#F7B096] transition hover:bg-white hover:text-[#F7B096] mt-16"
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
    className="ml-2 w-5 h-5 text-black group-hover:text-[#F7B096] transition-transform"
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
                className="w-full h-[600px] relative mt-16"
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageVariants}
              >
                <Image
                  src="/videos/Images immeubles/Team_Photo_Cropped.jpg"
                  alt="Team Photo Cropped"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
              <div className="w-full text-xs text-gray-500 text-center -mb-2">
                L&apos;équipe de Kelios
              </div>
            </div>
            <div className="flex flex-col -mb-4">
              <motion.div
                className="w-full h-[600px] relative"
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageVariants}
              >
                <Image
                  src="/Images/autres/JONATHAN_ANGUELOV_0048bd2_fcf52cbd2a.jpg"
                  alt="Image 1"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
              <div className="w-full text-xs text-gray-500 text-center -mb-2">
                Jonathan Anguelov de Kelios
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleDoSection;
