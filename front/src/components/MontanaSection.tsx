'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function MontanaSection({
  image = "/Images/gepacHmDQ2wBJaynQNnD9Q.jpg",
  text = "Découvrez comment investir simplement.",
  subtitle = "Fonds ou club deals, accédez à nos opérations selon vos objectifs."
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Animation d'apparition
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Parallax ratio (0.5 = 2x plus lent que le scroll)
      const ratio = 0.5;

      // Si la section est dans le viewport
      if (rect.top < windowH && rect.bottom > 0) {
        // Distance parcourue dans la section
        const scrollInSection = Math.min(Math.max(windowH - rect.top, 0), rect.height + windowH);
        // Parallax effect : translateY négatif pour ralentir la montée de l'image
        const parallax = -scrollInSection * ratio;

        // Figer l'image quand la section atteint le haut du viewport (comme sur Jerikho)
        let translateY = parallax;
        if (rect.top <= 0 && rect.bottom >= windowH) {
          // Section occupe tout le viewport : image figée
          translateY = -rect.top * ratio;
        }
        // Si la section sort par le haut, on ne translate plus
        if (rect.bottom <= windowH) {
          translateY = -(rect.height - windowH) * ratio;
        }

        bg.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[90vh] md:min-h-[110vh] flex items-center justify-center overflow-hidden pb-8 md:pb-12">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center bottom',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/75" />
      </div>
      {/* Centered text and buttons */}
      <div ref={inViewRef} className="relative z-10 flex flex-col items-center justify-center w-full max-w-[2100px] mx-auto px-4">
        <motion.h2
          className="text-white text-5xl md:text-6xl font-light tracking-tight drop-shadow-lg mb-2 mt-[-1rem] text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {text}
        </motion.h2>
        {/* Cartes blanches */}
        <motion.div
          className="flex flex-col gap-6 mb-36 items-end justify-end w-full pr-40 md:pr-56 lg:pr-80 mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-white rounded-none shadow-lg flex flex-col items-center justify-center w-64 h-40 md:w-80 md:h-44">
            <span className="text-3xl md:text-4xl font-semibold text-[#23272f]">9 à 13%</span>
            <span className="text-gray-500 text-xs mt-2 uppercase tracking-wider font-medium">TRI Cible annuelle</span>
          </div>
          <div className="bg-white rounded-none shadow-lg flex flex-col items-center justify-center w-64 h-40 md:w-80 md:h-44">
            <span className="text-3xl md:text-4xl font-semibold text-[#23272f]">2 à 5 ans</span>
            <span className="text-gray-500 text-xs mt-2 uppercase tracking-wider font-medium">Durée cible</span>
          </div>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-end pr-40 md:pr-56 lg:pr-80 mt-[-5rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-white text-sm md:text-base font-light mb-4 text-right w-full">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end items-center w-full">
            <button
              className="bg-[#00D481] text-white font-normal rounded-full px-8 py-3 text-base md:text-lg shadow-sm border border-[#00D481] transition hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
              style={{
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              }}
            >
              Nos club deals
            </button>
            <button
              className="bg-[#00D481] text-white font-normal rounded-full px-8 py-3 text-base md:text-lg shadow-sm border border-[#00D481] transition hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
              style={{
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              }}
            >
              Nos Fonds
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
