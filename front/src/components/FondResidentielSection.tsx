'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FondResidentielSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <section className="w-full bg-white py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          style={{ scale, opacity }}
          className="bg-[#f7f7f7] rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="flex flex-col-reverse md:flex-row h-[600px]">
            {/* Content Section */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-black">
                  Notre Fond Résidentiel
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Investissez dans le secteur résidentiel avec une approche innovante et durable. Notre fonds se concentre sur des actifs à fort potentiel de valorisation dans des zones dynamiques.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#00D481] flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
<p className="text-gray-700">Stratégie d'investissement éprouvée</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#00D481] flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Gestion active des actifs</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#00D481] flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Performance durable</p>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Video Section */}
            <div className="w-full md:w-1/2 h-full relative bg-gray-100">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/hero-background.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
