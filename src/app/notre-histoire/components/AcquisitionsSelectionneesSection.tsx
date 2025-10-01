"use client";
import React from "react";
import { motion } from "framer-motion";

type Deal = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

const DEALS: Deal[] = [
  { id: "truchet", title: "TRUCHET", subtitle: "Bureaux · Paris", image: "/images/Buildings/Truchet.webp" },
  { id: "ienaa", title: "Ienaa", subtitle: "Hôtel · Paris", image: "/images/Buildings/Ienaa.webp" },
  { id: "boetie", title: "La Boetie", subtitle: "Bureaux · Paris", image: "/images/Buildings/rue-la-boetie-11-copie-scaled.webp" },
];

export default function AcquisitionsSelectionneesSection() {
  return (
    <section className="relative py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 xs:px-8 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
            <span className="text-gray-600 text-xs tracking-[0.18em] uppercase">Acquisitions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] font-normal tracking-tight text-[#111] leading-[1.15]">Acquisitions sélectionnées.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {DEALS.map((d, i) => (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className="group relative rounded-xl overflow-hidden border border-[#E1D8D1] bg-white"
            >
              <div className="relative w-full aspect-[4/5]">
                <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-3 rounded-lg ring-1 ring-black/10" />
                </div>
                <div className="absolute left-4 top-4 rounded-md bg-black/55 text-white backdrop-blur px-3 py-2">
                  <div className="text-sm font-semibold leading-tight">{d.title}</div>
                  {d.subtitle && (
                    <div className="text-[11px] leading-tight text-white/85">{d.subtitle}</div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/55 to-black/0">
                    <div className="text-xs text-white/85">Opération sélectionnée</div>
                    <svg className="w-5 h-5 text-white/90 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

