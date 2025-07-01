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
    <section className="pt-10 pb-0 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center -mb-10">
          <motion.div
            className="lg:w-1/2 lg:pl-12 lg:pr-12 lg:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#383843] mb-9">
              La valeur vient des bâtisseurs.
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-xl">
              Chaque projet est structuré, porté, et co-investi par Jonathan Anguelov, ses associés et son équipe.
            </p>
            <span
              className="block text-xl md:text-2xl text-gray-600 mt-32 pb-1 group"
              style={{
                borderBottom: "1px solid #bdbdbd",
                display: "inline-block",
                paddingBottom: "0.15em",
                marginTop: "0.2em",
                width: "fit-content",
                color: "#00A36D",
              }}
            >
              <span className="relative z-10" style={{ color: "#00D481" }}>
                Investissez à nos côtés
                <svg
                  className="inline-block ml-2 w-4 h-4 text-[#00D481] align-baseline transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </span>
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
                  src="/JONATHAN_ANGUELOV_0048bd2_fcf52cbd2a.jpg"
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
