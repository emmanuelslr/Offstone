'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function HeroSolutions2({
  image = "/Images/Confiance/ImageHeroNoSolution.jpg",
  text = "Investissez simplement.",
  subtitle = <>Fonds ou club deals, accédez à nos opérations<br />selon vos objectifs.</>
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
<section ref={sectionRef} className="relative w-full min-h-[68vh] md:min-h-[83vh] flex items-center justify-center overflow-hidden pb-4 md:pb-6">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'top center',
          backgroundSize: '120%',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      {/* Centered text and buttons */}
      <div className="relative z-10 w-full flex items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-center inline-block px-6 py-2"
          style={{ fontFamily: "AllianceNo1-Bold, Arial, sans-serif" }}
        >
          <span className="text-white">Nos Solutions</span>
          <br />
          <span className="bg-[#F7B096] px-2 rounded text-black">d'investissements.</span>
        </motion.h1>
      </div>
    </section>
  );
}
