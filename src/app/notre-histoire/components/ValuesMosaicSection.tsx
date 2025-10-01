"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type ValueTile = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  colSpan?: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

const IconBuilding = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="7" height="18" rx="1.5" />
    <rect x="14" y="8" width="7" height="13" rx="1.5" />
    <path d="M6.5 7.5h0.01M6.5 11.5h0.01M6.5 15.5h0.01M17.5 11h0.01M17.5 14.5h0.01M17.5 18h0.01" strokeLinecap="round" />
  </svg>
);

const IconHandshake = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M12 12l-2.5-2.5a2.1 2.1 0 0 0-3 0L4 12m8 0 2.5-2.5a2.1 2.1 0 0 1 3 0L20 12" />
    <path d="M4 12l-1.5 1.5a2.5 2.5 0 0 0 0 3.5L4.5 19m15-7 1.5 1.5a2.5 2.5 0 0 1 0 3.5L19.5 19M9.5 12.5l2 2a2 2 0 0 0 2.8 0l0.7-.7" />
  </svg>
);

const IconShield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
    <path d="M9.5 12.5l2 2 4-4" strokeLinecap="round" />
  </svg>
);

const IconTrend = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" />
    <path d="M21 7v6h-6" />
  </svg>
);

const IconUsers = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="9" cy="9" r="3.5" />
    <path d="M2.5 20c.6-3.1 3.3-5 6.5-5s5.9 1.9 6.5 5" />
    <circle cx="17.5" cy="8.5" r="2.5" />
    <path d="M14.5 20c.4-1.8 1.7-3.1 3.5-3.7" />
  </svg>
);

const tiles: ValueTile[] = [
  {
    title: "Accès institutionnel",
    description: "Participer à des opérations de grande taille, habituellement réservées aux fonds.",
    imageSrc: "/images/Backgrounds/Mountain.webp",
    imageAlt: "Immeuble moderne avec verrière",
    Icon: IconBuilding,
  },
  {
    title: "Sourcing propriétaire",
    description: "Dossiers réservés issus de relations directes avec vendeurs et opérateurs.",
    imageSrc: "/images/Buildings/Orange buildings.webp",
    imageAlt: "Briques orangées et verrière",
    Icon: IconHandshake,
  },
  {
    title: "Prix d’entrée discipliné",
    description: "Entrer sous coût de remplacement avec une marge de sécurité claire.",
    imageSrc: "/images/Backgrounds/Mountain.webp",
    imageAlt: "Façade urbaine",
    Icon: IconShield,
    colSpan: 2,
  },
  {
    title: "Création de valeur intégrée",
    description: "Repositionnement précis et optimisation d’exploitation pour élever revenus et qualité.",
    imageSrc: "/images/Buildings/Orange buildings.webp",
    imageAlt: "Façade urbaine en briques",
    Icon: IconTrend,
  },
  {
    title: "Co‑investissement de l’équipe",
    description: "Nous investissons dans les mêmes opérations.",
    imageSrc: "/images/Backgrounds/Mountain.webp",
    imageAlt: "Paysage côtier",
    Icon: IconUsers,
  },
];

export default function ValuesMosaicSection() {
  return (
    <section className="w-full bg-white py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-[#111]">
            Nos valeurs qui guident chaque opération
          </h2>
        </div>

        <div className="mt-5 md:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.05 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className={`${tile.colSpan === 2 ? "lg:col-span-2" : ""} ${i % 2 === 1 ? "lg:-translate-y-1" : ""}`}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-sm min-h-[180px] md:min-h-[210px] lg:min-h-[240px]">
                <Image
                  src={tile.imageSrc}
                  alt={tile.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />

                <div className="absolute left-4 right-4 bottom-4 md:left-5 md:right-auto md:bottom-5 w-auto max-w-[64%] md:max-w-[50%]">
                  <div className="rounded-xl border border-white/60 bg-white/95 backdrop-blur-[2px] shadow-lg p-3.5 md:p-4">
                    <div className="flex items-start gap-2.5">
                      <tile.Icon className="w-5 h-5 text-black/80" />
                      <h3 className="text-lg md:text-xl font-light tracking-tight text-black">
                        {tile.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-gray-800 text-xs md:text-sm leading-relaxed line-clamp-2">
                      {tile.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA supprimé pour une fin plus légère et compacte */}
      </div>
    </section>
  );
}
