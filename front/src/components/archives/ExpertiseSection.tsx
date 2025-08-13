'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from './shared/SectionTitle';

const expertiseSteps = [
  {
    title: "Analyse",
    description: "Étude approfondie des opportunités d'investissement basée sur l'IA et l'expertise humaine.",
  },
  {
    title: "Stratégie",
    description: "Développement de solutions sur mesure alignées avec vos objectifs d'investissement.",
  },
  {
    title: "Exécution",
    description: "Mise en œuvre rigoureuse et suivi détaillé de chaque étape du processus.",
  },
  {
    title: "Optimisation",
    description: "Amélioration continue et adaptation aux évolutions du marché.",
  }
];

export default function ExpertiseSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-12 mt-20 mb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Notre expertise immobilière à chaque étape"
          subtitle="Une approche innovante qui allie technologie et savoir-faire humain"
          textColor="dark"
        />

        <div className="grid grid-cols-12 gap-8">
          {/* Left side - Timeline */}
          <div className="col-span-5 relative pr-12">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 w-px h-full bg-gray-200">
              <motion.div
                style={{ 
                  scaleY,
                  originY: 0
                }}
                className="w-full h-full bg-[#1E2124]"
              />
            </div>

            {/* Steps */}
            <div className="space-y-16 relative">
              {expertiseSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group pl-8"
                >
                  {/* Circle on Timeline */}
                  <div className="absolute left-[-4px] w-2 h-2">
                    <div className="w-full h-full bg-white border-2 border-gray-200 rounded-full group-hover:border-[#1E2124] group-hover:bg-[#1E2124] transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-light text-[#383843] mb-3 group-hover:text-[#1E2124] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-[#383843] transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
              className="relative h-full min-h-[450px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/femme allongée.avif"
                alt="Expertise illustration"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
