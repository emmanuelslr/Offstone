"use client";
import React from "react";
import { motion } from "framer-motion";

type Tile = { id: string; title: string; subtitle: string; image: string };

const TILES: Tile[] = [
  { id: "acces", title: "Accès qualifié", subtitle: "Dealflow sélectionné", image: "/images/Buildings/Truchet.webp" },
  { id: "alignement", title: "Alignement", subtitle: "Co‑investissement", image: "/images/notre-histoire/Jonathan Anguelov Balcon.webp" },
  { id: "communaute", title: "Communauté", subtitle: "Entrepreneurs & épargnants", image: "/images/notre-histoire/Jonathan Anguelov Communauté.webp" },
  { id: "plateforme", title: "Plateforme", subtitle: "Documentation & suivi", image: "/images/Platform/mockup telephon platform.webp" },
];

export default function ImpactOffstoneSection() {
  return (
    <section className="relative py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 xs:px-8 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Narrative gauche */}
          <div className="lg:sticky lg:top-28 lg:pr-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
              <span className="text-gray-600 text-xs tracking-[0.18em] uppercase">Ce que ça change</span>
            </div>
            <div className="pl-6 md:pl-8 border-l border-gray-200 max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] lg:text-[46px] font-normal tracking-tight text-[#111] leading-[1.18]">
                Concret, utile, exigeant.
              </h2>
              <p className="mt-6 text-sm sm:text-base text-gray-700">
                Offstone n’est pas une promesse marketing. C’est une façon de faire: sélective, alignée, et lisible.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="/pourquoi-offstone"
                className="h-10 inline-flex items-center justify-center bg-black text-white font-normal rounded-full px-5 text-sm shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black group"
              >
                Découvrir la méthode
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-4 h-4 text-white group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mosaïque droite */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {TILES.map((t, i) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
                viewport={{ once: true, margin: "-15% 0px" }}
                className="group relative rounded-xl overflow-hidden border border-[#E1D8D1] bg-white"
              >
                <div className="relative w-full aspect-[4/5]">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-90" />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
                    <span className="text-[11px] sm:text-xs text-white/90">{t.subtitle}</span>
                  </div>
                  <figcaption className="absolute left-3 bottom-3 right-3">
                    <div className="inline-block rounded-md bg-white/85 backdrop-blur px-2.5 py-1.5 shadow-sm">
                      <div className="text-[13px] sm:text-sm text-black font-medium leading-tight">{t.title}</div>
                    </div>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
