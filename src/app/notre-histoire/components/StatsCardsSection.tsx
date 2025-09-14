"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/app/home-page/components/TextReveal";
type Card = { value: string; label: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cards: Card[] = [
  { value: "200 M€", label: "D'actifs pilotés" },
  { value: "41+", label: "Opérations menées" },
  { value: "10k m²", label: "Surfaces restructurées" },
  { value: "15", label: "Ans d'expérience" },
];

// Cartes animées pour les compteurs
const animatedCards: { number: number; suffix?: string; prefix?: string; label: string }[] = [
  { number: 200, suffix: " M€", label: "D'actifs pilotés" },
  { number: 41, suffix: "+", label: "Opérations menées" },
  { number: 10, suffix: "k m²", label: "Surfaces restructurées" },
  { number: 15, label: "Ans d'expérience" },
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
      <span className="ml-1">{suffix}</span>
    </span>
  );
};

export default function StatsCardsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre animé en 3 lignes max */}
        <div className="max-w-5xl mx-auto">
          <TextReveal
            multiline
            backgroundColor="bg-white"
            text={"Des équipes exigeantes\nnous font confiance pour\ndélivrer des performances durables"}
            className="!text-[#111] leading-[1.06]"
          />
        </div>

        {/* CTA centré sous le titre */}
        <div className="mt-4 md:mt-6 flex justify-center">
          <a
            href="/pourquoi-offstone"
            className="flex items-center gap-3 group"
          >
            <span className="text-sm sm:text-base lg:text-lg text-gray-700">Découvrez comment ça marche pour construire votre patrimoine</span>
            <span className="flex items-center justify-center bg-[#F7B096] group-hover:bg-[#f9c3b0] transition text-black w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <polyline points="5 4 11 8 5 12" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {animatedCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className="relative rounded-2xl border border-[#252525] bg-[#252525] shadow-sm p-6 md:p-7 flex flex-col min-h-[280px] md:min-h-[320px]"
            >
              <span className="absolute left-3 top-3 inline-block h-1.5 w-1.5 rounded-full bg-gray-400/70" />
              <div className="flex-1" />
              <div className="mt-4">
                <div className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight tabular-nums">
                  <CountUp value={c.number} prefix={c.prefix} suffix={c.suffix} />
                </div>
                <div className="mt-3 text-gray-300 text-sm">{c.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
