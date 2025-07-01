'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import SectionTitle from './SectionTitle';

interface KeyFigure {
  number: number;
  label: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const keyFigures: KeyFigure[] = [
  { number: 100, suffix: "M€", label: "D’ACTIFS PILOTÉS" },
  { number: 41, suffix: "+", label: "OPÉRATIONS MENÉES" },
  { number: 10, suffix: "k", label: "M² DE SURFACES RESTRUCTURÉES" },
  { number: 15, suffix: "", label: "ANS D’EXPÉRIENCE" },
];

const CountUp = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 1800; // 1.8 seconds duration
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Faster start with smooth end
        const eased = 1 - Math.pow(1 - progress, 1.8);
        setDisplayValue(Math.floor(eased * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value); // Ensure we hit the exact target
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}<span className="ml-1">{suffix}</span>
    </span>
  );
};

export default function KeyFigures() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create smooth floating effect on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      style={{ y: smoothY }}
      className="w-full pt-28 pb-36 bg-[#1E2124]"
    >
      <SectionTitle 
        title={
          <>
            15 ans à transformer l’immobilier.
          </>
        }
        subtitle="Une trajectoire bâtie en compte propre. Aujourd’hui ouverte aux investisseurs privés."
        textColor="light"
        fontWeight="light"
      />
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-row justify-center items-stretch w-full px-8 gap-12 ml-8">
          {keyFigures.map((figure, index) => (
            <>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }
                }}
                viewport={{ once: true, margin: "-20% 0px" }}
                className="flex flex-col items-center justify-between basis-1/4 text-center"
              >
                  <h2 className="text-[3.5rem] sm:text-[4.3rem] md:text-[5.1rem] font-normal text-white mb-6 whitespace-nowrap tracking-wider">
                  <CountUp 
                    value={figure.number}
                    prefix={figure.prefix}
                    suffix={figure.suffix}
                  />
                </h2>
                <p className={`text-[10px] md:text-[11px] tracking-widest uppercase font-medium mt-2 w-full${index === 2 ? ' whitespace-nowrap' : ''} text-gray-400`}>
                  {figure.label}
                </p>
              </motion.div>
              {index < keyFigures.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: (index + 1) * 0.1,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    }
                  }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  className="hidden md:block w-[1px] h-14 self-center bg-gray-400"
                />
              )}
            </>
          ))}
        </div>
      </div>
      {/* Call to action centré avec soulignement */}
      <div className="w-full flex justify-center mt-20">
        <span
          className="block text-xl md:text-2xl text-gray-400 pb-1 group"
          style={{
            borderBottom: "1px solid #bdbdbd",
            display: "inline-block",
            paddingBottom: "0.15em",
            marginTop: "0.2em",
            width: "fit-content",
          }}
        >
          <span className="relative z-10" style={{ color: "#00D481" }}>
            Découvrez notre approche
            <svg
              className="inline-block ml-2 w-4 h-4 text-[#00D481] align-baseline transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </span>
      </div>
    </motion.div>
  );
}
