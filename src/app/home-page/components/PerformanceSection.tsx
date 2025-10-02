"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionBadge from "./SectionBadge";

const CountUp = ({
  value,
  suffix = "",
  durationMs = 1500,
  className = "",
  suffixClassName = "",
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
  suffixClassName?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { margin: "-15% 0px" });

  useEffect(() => {
    let raf: number | null = null;
    let start: number | undefined;
    if (isInView) {
      setDisplayValue(0);
      const step = (t: number) => {
        if (start === undefined) start = t;
        const p = Math.min(1, (t - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 1.8);
        setDisplayValue(Math.floor(eased * value));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    } else {
      setDisplayValue(0);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isInView, value, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums inline-flex items-baseline ${className}`}>
      {displayValue}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
};

export default function PerformanceSection() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-dashed border-[#F7B096] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="mb-6 md:mb-8">
            <SectionBadge colorClass="text-gray-600 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium" text="PERFORMANCE" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-[#111] leading-tight max-w-5xl">
            Valorisez votre patrimoine grâce à des <span className="text-[#9D9F9E]">opérations immobilières</span> exclusives
          </h3>
          <div className="my-8 md:my-10 h-px bg-gray-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-[#1E2124] border border-gray-800 rounded-xl p-4 md:p-5 text-white">
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7B096] whitespace-nowrap leading-none">
                <CountUp value={8} suffix="-" durationMs={800} className="text-[#F7B096]" />
                <CountUp value={14} suffix="%" durationMs={800} className="text-[#F7B096]" />
              </div>
              <div className="mt-1 text-white/80 text-sm md:text-base">De performance cible annuelle</div>
            </div>
            <div className="bg-[#1E2124] border border-gray-800 rounded-xl p-4 md:p-5 text-white">
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7B096] whitespace-nowrap leading-none">
                <CountUp value={2} suffix=" " durationMs={600} className="text-[#F7B096]" />
                <span className="text-[#F7B096]"> à </span>
                <CountUp value={5} durationMs={600} className="text-[#F7B096]" />
                <span className="text-[#F7B096]"> ans</span>
              </div>
              <div className="mt-1 text-white/80 text-sm md:text-base">Horizon de sortie selon les projets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
