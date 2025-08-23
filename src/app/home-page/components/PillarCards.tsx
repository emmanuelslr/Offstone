'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';

const pillars = [
  {
    image: '/Images/Pillars Cards Image/photo 1.gif',
    label: 'Détecter l’invisible',
    desc: 'Nous ciblons des actifs mal valorisés, portés par une conviction forte de repositionnement.'
  },
  {
    image: '/Images/Pillars Cards Image/Photo 2.jpg',
    label: 'Réinventer les usages',
    desc: 'Nous adaptons chaque actif aux nouveaux besoins : design, destination, exploitation.'
  },
  {
    image: '/Images/Pillars Cards Image/Photo 3.png',
    label: 'Maximiser la valeur',
    desc: 'Nous mettons notre expertise opérationnelle en oeuvre pour révéler le plein potentiel de chaque actif.'
  }
];

export default function PillarCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0, 1]
      }
    }
  };

  return (
<section ref={ref} className="w-full dark-section overflow-hidden mb-4 bg-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 py-0 mt-16 mb-16">
        <SectionTitle 
          title="Investissez là où la valeur se construit."
          subtitle="Nous identifions des actifs sous-exploités, redéfinissons leur usage, et les transformons en opérations à fort potentiel."
          textColor="dark"
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.label}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="relative group rounded-none flex flex-col"
            >
<div className="relative h-[260px] rounded-none overflow-hidden" style={{ borderRadius: '0' }}>
                <Image
                  src={pillar.image}
                  alt={pillar.label}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '0' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-none pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
