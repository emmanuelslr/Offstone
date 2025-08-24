'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ 
  text = "Notre méthode a fait ses preuves, elle est maintenant à votre portée.", 
  className = "",
  multiline = false,
  backgroundColor = "bg-white"
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const revealStart = rect.top - windowHeight * 0.7;
      const revealEnd = rect.bottom - windowHeight * 0.3;
      let p = 0;
      if (revealEnd <= 0) {
        p = 1;
      } else if (revealStart >= 0) {
        p = 0;
      } else {
        p = 1 - revealEnd / (rect.height + windowHeight * 0.4);
        p = Math.max(0, Math.min(1, p));
      }
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation: each letter goes from #bdbdbd (gris) to #222 (noir) based on scroll progress
  const letters = text.split('');
  const revealedCount = Math.floor(progress * letters.length);

  if (multiline) {
    // Split text by line breaks and render each line separately
    const lines = text.split('\n');
    
    return (
      <section className={`w-full ${backgroundColor} z-30`}>
        <div className="max-w-[800px] mx-auto px-2 py-10 md:py-14">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className={`text-4xl md:text-5xl lg:text-[3.25rem] text-center font-light tracking-tight leading-tight ${className}`}
            style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
          >
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="mb-6 last:mb-0 block w-full">
                {line.split('').map((char, i) => {
                  const globalIndex = lines.slice(0, lineIndex).join('').length + i;
                  return (
                    <span
                      key={`${lineIndex}-${i}`}
                      style={{
                        color: globalIndex < revealedCount ? '#222' : '#bdbdbd',
                        transition: 'color 0.3s cubic-bezier(.77,0,.18,1)',
                        willChange: 'color',
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full ${backgroundColor} z-30`}>
      <div className="max-w-[1000px] mx-auto px-2 py-12 md:py-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className={`text-4xl md:text-5xl lg:text-[3.25rem] text-center font-light tracking-tight ${className}`}
          style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              style={{
                color: i < revealedCount ? '#222' : '#bdbdbd',
                transition: 'color 0.3s cubic-bezier(.77,0,.18,1)',
                willChange: 'color',
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
