'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionBadge from './SectionBadge';

const RecognitionSection: React.FC = () => {
  const recognitions = [
    {
      id: 1,
      image: '/images/personnalites/ja-visuel-2-page-1.jpg',
      title: 'COUVERTURE FORBES'
    },
    {
      id: 2,
      image: '/images/personnalites/remisedutrophe couverture et distinction.webp',
      title: 'TROPHÉE ENTREPRENEUR DE L\'ANNÉE 2024'
    },
    {
      id: 3,
      image: '/images/personnalites/couvertures et distinction 2.webp',
      title: 'COUVERTURE D\'ECORÉSEAU'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionBadge colorClass="text-gray-600" text="RECONNAISSANCE" />
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter leading-tight text-[#111] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Voyez par vous-même<br />ce que <span style={{ color: '#9D9F9E' }}>la presse dit de nous</span>
          </motion.h2>
        </motion.div>

        {/* Grid - Images avec titres en bas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {recognitions.map((recognition, index) => (
            <motion.div
              key={recognition.id}
              variants={itemVariants}
              className="group"
            >
              {/* Image Container - Pleine largeur avec bords arrondis */}
              <div className="relative w-full h-80 lg:h-[420px] overflow-hidden rounded-lg mb-4 max-w-md mx-auto">
                <Image
                  src={recognition.image}
                  alt={recognition.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                
                {/* Logo Forbes pour la première image */}
                {recognition.id === 1 && (
                  <div className="absolute top-4 right-4">
                    <Image
                      src="/images/logos/Forbes-Logo-white.png"
                      alt="Forbes Logo"
                      width={75}
                      height={30}
                      className="opacity-90"
                    />
                  </div>
                )}
              </div>
              
              {/* Titre en bas de l'image */}
              <div className="text-center">
                <h3 className="text-[#111] text-lg lg:text-xl font-semibold leading-tight">
                  {recognition.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionSection;
