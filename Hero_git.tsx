'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Preload the poster image for instant display
  useEffect(() => {
    const img = new Image();
    img.src = '/images/Backgrounds/ImageHero.png';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Parallax ratio (0.8 = effet plus marqué)
      const ratio = 0.8;

      // Nouvelle logique : la vidéo reste visible tant que Hero est dans le viewport
      if (rect.bottom > 0 && rect.top < windowH) {
        video.style.opacity = '1';
        video.style.visibility = 'visible';

        // Parallax effect
        const scrollInSection = Math.min(Math.max(windowH - rect.top, 0), rect.height + windowH);
        const parallax = -scrollInSection * ratio;

        // Figer la vidéo quand la section atteint le haut du viewport
        let translateY = parallax;
        if (rect.top <= 0 && rect.bottom >= windowH) {
          translateY = -rect.top * ratio;
        }
        if (rect.bottom <= windowH) {
          translateY = -(rect.height - windowH) * ratio;
        }

        video.style.transform = `translateY(${translateY}px)`;
      } else {
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
    <div ref={sectionRef} className="Hero relative min-h-screen w-full flex justify-center overflow-hidden z-10">
      {/* Absolute Video Background with parallax effect */}
             <div 
         ref={videoRef}
         className="absolute inset-0 z-0 w-full h-[120vh]"
         style={{ 
           top: 0, 
           left: 0,
           backgroundImage: 'url(/images/Backgrounds/ImageHero.png)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}
       >
                 <video
           autoPlay
           muted
           loop
           playsInline
           poster="/images/Backgrounds/ImageHero.png"
           className="absolute w-full h-full object-cover transition-opacity duration-300"
           style={{ filter: 'brightness(0.55) contrast(1.1)' }}
           onLoadStart={() => {
             // Ensure poster is visible immediately
             const video = document.querySelector('video');
             if (video) video.style.opacity = '1';
           }}
           onCanPlay={() => {
             // Smooth transition when video is ready
             const video = document.querySelector('video');
             if (video) {
               video.style.opacity = '1';
               video.style.transition = 'opacity 0.5s ease-in-out';
             }
           }}
         >
          <source src="/videos/Official Hero Video.mp4" type="video/mp4" />
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
              className="w-full flex justify-center mt-8 sm:mt-10"
            >
              <form
                className="flex w-full max-w-md bg-white/90 shadow-lg sm:rounded-lg rounded-lg items-center px-2 py-1 sm:py-1.5 sm:px-3"
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Entrez votre adresse mail"
                  className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-500 px-3 py-1.5 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-1.5 bg-[#F7B096] text-black border border-[#F7B096] rounded-lg font-medium transition hover:bg-[#222222] hover:text-white text-sm"
                  style={{ borderRadius: '0.5rem' }}
                >
                  Investissez à nos côtés
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
