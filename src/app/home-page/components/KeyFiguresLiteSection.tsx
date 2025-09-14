"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type DealCard = {
  title: string;
  subtitle?: string;
  image: string;
  acquisition: string;
  revente: string;
};

// 3 cartes d'immeubles (restauration)
const deals: DealCard[] = [
  {
    title: "MOULIN VERT",
    subtitle: "Résidentiel | Paris 14e",
    image: "/videos/images-immeubles/60348-Rue-du-Moulin-Vert-39CB-scaled.jpg.webp",
    acquisition: "4,8 M€",
    revente: "6,2 M€",
  },
  {
    title: "LA BOÉTIE",
    subtitle: "Bureaux | Paris 8e",
    image: "/images/Buildings/rue-la-boetie-11-copie-scaled.jpg",
    acquisition: "12 M€",
    revente: "15,5 M€",
  },
  {
    title: "MAISON IENA",
    subtitle: "Hôtel | Value-Add | Paris 16e",
    image: "/images/Buildings/Ienaa.jpg",
    acquisition: "16 M€",
    revente: "22 M€",
  },
];

export default function KeyFiguresLiteSection() {
  return (
    <section className="w-full bg-white pt-8 md:pt-10 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grille des cartes immeubles */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {deals.map((d, i) => (
            <motion.article
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-neutral-100"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  priority={i < 2}
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                />
                {/* Contour intérieur doux */}
                <div className="pointer-events-none absolute inset-3 rounded-xl ring-2 ring-white/40" />

                {/* Titre en blurb pour lisibilité */}
                <div className="absolute left-5 top-5">
                  <div className="rounded-xl bg-black/55 backdrop-blur px-3.5 py-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                    <div className="text-white text-sm sm:text-base font-semibold leading-tight">
                      {d.title}
                    </div>
                    {d.subtitle && (
                      <div className="text-white/90 text-[11px] sm:text-xs leading-tight">
                        {d.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bandeau valeur créée */}
                <div className="absolute inset-x-3 bottom-3">
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/65 backdrop-blur px-4 py-3 shadow-lg">
                    <div className="leading-tight text-white">
                      <div className="uppercase tracking-wide text-[11px] text-white/80">Acquisition</div>
                      <div className="text-white font-semibold text-2xl sm:text-3xl">{d.acquisition}</div>
                    </div>
                    {/* Flèche pointillée */}
                    <div className="flex items-center text-[#F7B096]">
                      <svg width="40" height="22" viewBox="0 0 40 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 11H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4"/>
                        <path d="M30 7L34 11L30 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="leading-tight text-white text-right">
                      <div className="uppercase tracking-wide text-[11px] text-white/80">Revente</div>
                      <div className="text-white font-semibold text-2xl sm:text-3xl">{d.revente}</div>
                    </div>
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