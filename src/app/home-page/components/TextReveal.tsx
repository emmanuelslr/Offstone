"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  text?: string;
  className?: string;
  multiline?: boolean;
  backgroundColor?: string;
  containerPaddingClass?: string;
  containerExtraClass?: string;
};

export default function TextReveal({
  text = "Notre méthode a fait ses preuves, elle est maintenant à votre portée.",
  className = "",
  multiline = false,
  backgroundColor = "bg-white",
  containerPaddingClass = "py-8 md:py-12 lg:py-16",
  containerExtraClass = "",
}: Props) {
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
      if (revealEnd <= 0) p = 1;
      else if (revealStart >= 0) p = 0;
      else {
        p = 1 - revealEnd / (rect.height + windowHeight * 0.4);
        p = Math.max(0, Math.min(1, p));
      }
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letters = text.split("");
  const revealedCount = Math.floor(progress * letters.length);

  if (multiline) {
    const lines = text.split("\n");
    return (
      <section className={`w-full ${backgroundColor} z-30 ${containerExtraClass}`}>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${containerPaddingClass}`}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] text-center font-light tracking-tight leading-tight ${className}`}
            style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
          >
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="mb-4 sm:mb-6 last:mb-0 block w-full">
                {line.split("").map((char, i) => {
                  const globalIndex = lines.slice(0, lineIndex).join("").length + i;
                  return (
                    <span
                      key={`${lineIndex}-${i}`}
                      style={{
                        color: globalIndex < revealedCount ? "#222" : "#bdbdbd",
                        transition: "color 0.3s cubic-bezier(.77,0,.18,1)",
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
    <section className={`w-full ${backgroundColor} z-30 ${containerExtraClass}`}>
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${containerPaddingClass}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] text-center font-light tracking-tight leading-tight ${className}`}
          style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              style={{
                color: i < revealedCount ? "#222" : "#bdbdbd",
                transition: "color 0.3s cubic-bezier(.77,0,.18,1)",
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>

        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/nos-realisations" className="flex items-center gap-3 sm:gap-4 group" style={{ textDecoration: 'none' }}>
              <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 font-normal text-center transition-colors duration-200 group-hover:text-[#F7B096]" style={{ textDecoration: 'none' }}>
                Parcourez l'ensemble des investissements immobiliers réalisés par nos associés
              </span>
              <span className="flex items-center justify-center bg-[#F7B096] hover:bg-[#f9c3b0] transition text-black w-6 h-6 sm:w-5 sm:h-5 rounded-[6px] shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(-180deg)" }}>
                  <polyline points="11 4 5 8 11 12" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
