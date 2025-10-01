"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type DealCard = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  acquisition: string;
  revente: string;
  description: string;
};

// 3 cartes d'immeubles (restauration)
const deals: DealCard[] = [
  {
    id: "maison-du-moulin-vert",
    title: "MOULIN VERT",
    subtitle: "Résidentiel | Paris 14e",
    image: "/videos/images-immeubles/60348-Rue-du-Moulin-Vert-39CB-scaled.jpg.webp",
    acquisition: "4,8 M€",
    revente: "6,2 M€",
    description: "Résidence touristique issue de la restructuration de l'ex‑Hôtel de la Loire : 15 appartements meublés et jardin, rue du Moulin Vert (Paris 14e).",
  },
  {
    id: "maison-boetie",
    title: "LA BOÉTIE",
    subtitle: "Bureaux | Paris 8e",
    image: "/images/Buildings/rue-la-boetie-11-copie-scaled.webp",
    acquisition: "12 M€",
    revente: "15,5 M€",
    description: "Transformation d'un hôtel particulier de la rue La Boétie en lieu événementiel premium au cœur du 8e arrondissement.",
  },
  {
    id: "maison-iena",
    title: "MAISON IENA",
    subtitle: "Hôtel | Value-Add | Paris 16e",
    image: "/images/Buildings/Ienaa.webp",
    acquisition: "16 M€",
    revente: "22 M€",
    description: "Immeuble haussmannien du 16e, rénovation et repositionnement haut de gamme près de la place d'Iéna.",
  },
];

export default function KeyFiguresLiteSection() {
  return (
    <section className="w-full bg-white pt-8 md:pt-10 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grille des cartes immeubles */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {deals.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
            >
              <Link
                href={`/nos-realisations/${d.id}`}
                className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-neutral-100 block"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
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

                  {/* Overlay hover avec lien vers l'étude de cas */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9FAFB] bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 mobile-hover-fix">
                    <h3 className="text-base md:text-[17px] font-medium text-[#111] mb-2">{d.title}</h3>
                    <p className="text-gray-700 text-xs md:text-sm mb-3 px-4 text-center" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {d.description.length > 80 ? d.description.slice(0, 80) + '...' : d.description}
                    </p>
                    <span 
                      className="inline-flex items-center h-9 px-3 rounded-full bg-black text-white text-xs border border-black transition group-hover:bg-[#F7B096] group-hover:border-[#F7B096] group-hover:text-black"
                      aria-hidden
                    >
                      Découvrir ce bien
                      <svg
                        className="ml-2 w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.1}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}