'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import SectionTitle from './SectionTitle';

interface KeyFigure {
  number: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const keyFigures: KeyFigure[] = [
  { number: 150, prefix: '€', suffix: 'M', label: "Montant investi" },
  { number: 42, label: "Actifs détenus" },
  { number: 15, label: "Années d'expertise" },
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
      {prefix}{displayValue}{suffix}
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
      className="w-full pt-8 pb-16 container-custom"
    >
      <SectionTitle 
        title="Nos chiffres clés"
        subtitle="Un acteur majeur de l'investissement en France"
        textColor="dark"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-16 md:space-y-0 md:space-x-32 xl:space-x-40">
          {keyFigures.map((figure, index) => (
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
              className="w-64 text-center"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-6xl sm:text-7xl md:text-8xl font-light text-[#383843] mb-6 whitespace-nowrap tracking-wider">
                  <CountUp 
                    value={figure.number}
                    prefix={figure.prefix}
                    suffix={figure.suffix}
                  />
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 tracking-wide">{figure.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
