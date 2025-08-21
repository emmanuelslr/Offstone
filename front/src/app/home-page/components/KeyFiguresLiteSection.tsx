'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    let animationFrame: number | null = null;
    let startTime: number | undefined;

    if (inView) {
      setDisplayValue(0);
      startTime = undefined;
      const duration = 1800;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 1.8);
        setDisplayValue(Math.floor(eased * value));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    } else {
      setDisplayValue(0);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      setDisplayValue(0);
    };
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}<span className="ml-1">{suffix}</span>
    </span>
  );
};

export default function KeyFiguresLiteSection() {
  return (
    <section className="w-full bg-white m-0 p-0">
      <div className="w-full max-w-7xl mx-auto m-0 p-0" style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}}>
        <div className="flex flex-row justify-center items-stretch w-full gap-12 m-0 p-0" style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}}>
          {keyFigures.map((figure, index) => (
            <div key={index} className="flex flex-row items-center">
              <motion.div
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
                <h2 className="text-[3.2rem] sm:text-[4rem] md:text-[4.8rem] font-light text-black mb-10 whitespace-nowrap tracking-wider">
                  <CountUp
                    value={figure.number}
                    prefix={figure.prefix}
                    suffix={figure.suffix}
                  />
                </h2>
                <p className={`text-[10px] md:text-[11px] tracking-widest uppercase font-medium mt-2 w-full${index === 2 ? ' whitespace-nowrap' : ''} text-gray-700`}>
                  {figure.label}
                </p>
              </motion.div>
              {index < keyFigures.length - 1 && (
                <div className="hidden md:block w-[1px] h-14 self-center bg-gray-300 mx-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    {/* CTA horizontal : texte + bouton carré */}
    <div className="w-full flex justify-center mt-24 pb-32">
      <div className="flex flex-row items-center gap-6">
        <span className="text-xl md:text-2xl text-gray-600 font-normal">
          Découvrez notre méthode pour construire ce patrimoine
        </span>
        <button
          className="flex items-center justify-center bg-[#F7B096] hover:bg-[#f9c3b0] transition text-black w-8 h-8 rounded-[4px] shadow-sm"
          aria-label="Découvrir la méthode"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: "rotate(-180deg)" }}
          >
            <polyline points="11 4 5 8 11 12" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
  );
}
