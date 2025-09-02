"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Données alignées avec "Notre histoire"
const animatedCards = [
  { number: 200, suffix: "M€", label: "D'actifs pilotés" },
  { number: 41, suffix: "+", label: "Opérations menées" },
  { number: 10, suffix: "k m²", label: "Surfaces restructurées" },
  { number: 15, suffix: "", label: "Ans d'expérience" },
];

const CountUp = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
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
      {prefix}
      {displayValue}
      <span>{suffix}</span>
    </span>
  );
};

export default function KeyFiguresLiteSection() {
  return (
    <section className="w-full bg-white pt-3 md:pt-4 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec méthode */}
        <div className="flex justify-center mb-12 md:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 font-normal text-center sm:text-left">
              Découvrez notre méthode pour construire votre patrimoine
            </span>
            <button
              className="flex items-center justify-center bg-[#F7B096] hover:bg-[#f9c3b0] transition text-black w-6 h-6 sm:w-5 sm:h-5 rounded-[4px] shadow-sm flex-shrink-0"
              aria-label="Découvrir la méthode"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                style={{ transform: "rotate(-180deg)" }}
              >
                <polyline points="11 4 5 8 11 12" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grille des cartes chiffres clés (style Notre histoire, en clair) */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {animatedCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className="relative rounded-2xl border border-[#F7B096] bg-[#F9FAFB] shadow-sm p-5 md:p-6 flex flex-col items-center min-h-[240px] md:min-h-[280px]"
            >
              <span className="absolute left-3 top-3 inline-block h-1.5 w-1.5 rounded-full bg-[#F7B096]" />
              <div className="flex-1" />
              <div className="mt-4 w-full">
                <div className="w-full text-center text-gray-900 whitespace-nowrap leading-none text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight tabular-nums">
                  <CountUp value={c.number} suffix={c.suffix} />
                </div>
                <div className="mt-3 text-gray-600 text-sm text-center">{c.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
