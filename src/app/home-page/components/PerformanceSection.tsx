"use client";
import { useEffect, useRef, useState } from "react";

const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number | null = null;
    let start: number | undefined;
    const duration = 1500;
    const step = (t: number) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 1.8);
      setDisplayValue(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref} className="tabular-nums">
      {displayValue}
      <span>{suffix}</span>
    </div>
  );
};

export default function PerformanceSection() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-dashed border-[#F7B096] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="mb-6 md:mb-8">
            <span className="inline-block uppercase tracking-widest text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700 rounded-full px-3 py-1">
              Performance
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-[#111] leading-tight max-w-5xl">
            Investissez dans les opérations <span className="text-[#9D9F9E]">créatrices de valeur</span> pour votre patrimoine
          </h3>
          <div className="my-8 md:my-10 h-px bg-gray-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-[#1E2124] border border-gray-800 rounded-xl p-5 md:p-6 text-white">
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7B096]">
                <CountUp value={15} suffix="%" />
              </div>
              <div className="mt-2 text-white/80 text-sm md:text-base">De performance cible annuelle</div>
            </div>
            <div className="bg-[#1E2124] border border-gray-800 rounded-xl p-5 md:p-6 text-white">
              <div className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7B096]">
                <CountUp value={4} /> <span className="text-[#F7B096]">ans</span>
              </div>
              <div className="mt-2 text-white/80 text-sm md:text-base">Horizon de sortie selon les projets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

