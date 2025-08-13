'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '@/components/archives/SectionTitle';

export default function ClubDealsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
<section className="w-full bg-white pt-12 pb-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
<motion.div 
          style={{ scale, opacity }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          viewport={{ once: true, amount: 0.5 }}
className="bg-white rounded-none overflow-hidden"
        >
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Video Section */}
<div className="w-full md:w-1/2 h-full relative bg-[#f3f1f0]">
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

            {/* Content Section */}
<div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-[#f3f1f0]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
<SectionTitle
                  title="Nos Club Deals"
                  subtitle="Accédez à des opportunités d'investissement exclusives dans l'immobilier premium. Nos Club Deals vous permettent de participer à des projets soigneusement sélectionnés avec un potentiel de rendement attractif."
                  align="left"
                  textColor="dark"
                  fontWeight="normal"
fontSize="text-3xl md:text-4xl"
                />
                <ul className="space-y-4 mt-2">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#F7B096] flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Investissement minimum maîtrisé</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#F7B096] flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Due diligence approfondie</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#F7B096] flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Reporting régulier et transparent</p>
                  </li>
                </ul>
                <button
                  className="mt-8 px-6 py-3 bg-[#F7B096] text-white font-semibold rounded-full flex items-center gap-2 hover:bg-[#e89a7d] transition-colors duration-200"
                >
                  Investir à nos côtés
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
