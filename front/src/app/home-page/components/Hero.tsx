'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Parallax ratio (0.5 = 2x plus lent que le scroll)
      const ratio = 0.5;

      // Trouver la section PeopleDoSection pour déterminer quand cacher la vidéo
      const peopleDoSection = document.querySelector('.PeopleDoSection') as HTMLElement;
      let shouldHideVideo = false;

      if (peopleDoSection) {
        const peopleDoRect = peopleDoSection.getBoundingClientRect();
        // Cacher la vidéo dès que PeopleDoSection commence à sortir du viewport (plus restrictif)
        shouldHideVideo = peopleDoRect.bottom <= windowH * 0.1; // Disparaît quand il reste 10% de PeopleDoSection visible
      } else {
        // Fallback: cacher quand Hero sort du viewport
        shouldHideVideo = rect.bottom <= 0;
      }

      if (shouldHideVideo || rect.bottom <= windowH * 0.1) {
        // Cacher complètement la vidéo
        video.style.opacity = '0';
        video.style.visibility = 'hidden';
        return;
      }

      // Si la section Hero est dans le viewport ou partiellement visible
      if (rect.top < windowH && rect.bottom > 0) {
        // Montrer la vidéo
        video.style.opacity = '1';
        video.style.visibility = 'visible';

        // Distance parcourue dans la section
        const scrollInSection = Math.min(Math.max(windowH - rect.top, 0), rect.height + windowH);
        // Parallax effect : translateY négatif pour ralentir la montée de la vidéo
        const parallax = -scrollInSection * ratio;

        // Figer la vidéo quand la section atteint le haut du viewport
        let translateY = parallax;
        if (rect.top <= 0 && rect.bottom >= windowH) {
          // Section occupe tout le viewport : vidéo figée
          translateY = -rect.top * ratio;
        }
        // Si la section sort par le haut, on ne translate plus
        if (rect.bottom <= windowH) {
          translateY = -(rect.height - windowH) * ratio;
        }

        video.style.transform = `translateY(${translateY}px)`;
      } else if (rect.bottom <= 0) {
        // Hero est sorti mais PeopleDoSection peut encore être visible
        // Garder la vidéo visible mais figée
        video.style.opacity = '1';
        video.style.visibility = 'visible';
        // Figer la vidéo à sa dernière position
        const finalTranslateY = -(rect.height - windowH) * ratio;
        video.style.transform = `translateY(${finalTranslateY}px)`;
      } else {
        // Section pas encore visible
        video.style.opacity = '0';
        video.style.visibility = 'hidden';
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
    <div ref={sectionRef} className="Hero relative min-h-screen w-full flex justify-center overflow-hidden">
      {/* Fixed Video Background with parallax effect */}
      <div 
        ref={videoRef}
        className="fixed inset-0 z-0 w-full h-screen"
        style={{ top: 0, left: 0 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) contrast(1.1)' }}
        >
          <source src="/videos/Aguesseau Vidéo officielle.mp4" type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-6xl mx-auto flex flex-col items-center min-h-[calc(100vh-96px)] mt-20 sm:mt-24"
        >
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-[36px] sm:text-4xl md:text-6xl lg:text-[82px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-white text-center mx-auto px-4 sm:px-6">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="block mb-2"
              >
                Investissez dans l’immobilier,<br />
                aux côtés de ceux qui l’opèrent.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-base sm:text-lg md:text-2xl text-white/90 text-center mt-6 font-light tracking-wide mx-auto px-4 sm:px-6 whitespace-normal"
            >
              Nous investissons dans chaque opération que nous structurons.<br/>
              Accédez-y désormais, à nos côtés.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-10 mx-auto items-center justify-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
className="w-[280px] sm:w-auto px-8 py-3 bg-white text-black text-base md:text-lg font-normal rounded-full border shadow-sm transition hover:bg-[#f3f4f6] flex items-center justify-center gap-2"
              >
                Nous Contacter
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a
                href="#expertise"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[280px] sm:w-auto px-8 py-3 bg-transparent text-white text-base md:text-lg font-normal rounded-full border border-white shadow-sm transition hover:bg-white/10 text-center"
              >
                Notre Expertise
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
