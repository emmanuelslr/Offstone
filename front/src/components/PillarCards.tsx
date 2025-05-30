'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SectionTitle from './SectionTitle';

const pillars = [
  {
    title: 'Expertise Immobilière',
    image: '/Immo.jpg',
    description: 'Excellence et innovation dans l\'investissement immobilier'
  },
  {
    title: 'Innovation Technologique',
    image: '/Tech.avif',
    description: 'Technologies de pointe pour une gestion optimisée'
  },
  {
    title: 'Engagement ESG',
    image: '/ESG.png',
    description: 'Investissement responsable et durable'
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
    <section ref={ref} className="w-full dark-section overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-20">
        <SectionTitle 
          title="Nos Piliers"
          subtitle="Les fondements de notre approche d'investissement reposent sur trois piliers essentiels qui définissent notre excellence"
          textColor="dark"
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-light text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.6 }}
                  >
                    {pillar.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 * index, duration: 0.6 }}
                  >
                    {pillar.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
