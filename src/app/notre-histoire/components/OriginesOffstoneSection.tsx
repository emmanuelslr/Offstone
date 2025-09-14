"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Step = {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
};

const STEPS: Step[] = [
  {
    id: "y2014",
    year: "2014",
    title: "Partir de rien. Construire une licorne.",
    description:
      "Cofondateur d’Aircall, Jonathan Anguelov a bâti une entreprise technologique mondiale avec une obsession: exécuter vite, bien, et durablement.",
    image: "/images/personnalites/67f78cf01d122756a6d6b632_jonathan-anguelov-s-quive-magazine.jpg",
  },
  {
    id: "y2018",
    year: "2018",
    title: "De la tech à l'immobilier professionnel.",
    description:
      "Création d'Aguesseau Capital : une foncière pour bâtir un portefeuille immobilier professionnel avec un réseau d’intermédiaires éprouvé (notaires, marchands, family offices).",
    image: "/images/Buildings/Logistics.jpg",
  },
  {
    id: "y2024",
    year: "2024",
    title: "200M€ d'acquisitions, une méthode.",
    description:
      "Près de 200 M€ d’immeubles acquis avec discipline et alignement. Sélection serrée, structure adaptée, co‑investissement personnel.",
    image: "/images/Buildings/Truchet.jpg",
  },
  {
    id: "y2025",
    year: "2025",
    title: "Offstone: ouvrir l’accès.",
    description:
      "Rendre la qualité institutionnelle et professionnelle accessible à une communauté d’investisseurs. Industrialiser le sourcing, la structuration et la gestion.",
    image: "/images/Backgrounds/Mokup ecran tabouret.jpeg",
  },
];

export default function OriginesOffstoneSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handler = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".origin-step"));
      if (!nodes.length) return;
      const viewportCenter = window.innerHeight / 2;
      let nearestIndex = 0;
      let nearestDist = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const rect = nodes[i].getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIndex = i;
        }
      }
      setActive(nearestIndex);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section className="relative" style={{ backgroundColor: "#F7F5F2" }}>
      <div className="container mx-auto px-6 sm:px-16 md:px-20 lg:px-24 xl:px-32 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left sticky: heading + scroll-spy list */}
          <aside className="lg:w-5/12">
            <div className="sticky top-28 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
                <span className="text-gray-600 text-xs tracking-[0.18em] uppercase">Notre histoire</span>
              </div>
<h2 className="text-3xl md:text-[40px] lg:text-[46px] font-normal tracking-tight text-[#111] leading-[1.16] max-w-xl">
  Investissez aux côtés d’un entrepreneur aguerri.
</h2>
<p className="mt-7 text-sm sm:text-base md:text-lg text-gray-600 max-w-md">
  Une trajectoire d’entrepreneur, une thèse, un track‑record, puis une plateforme de club-deals pour ouvrir l’accès à l'immobilier professionnel.
</p>

              {/* Scroll-spy nav (years + titles) */}
              <div className="mt-10">
                <ul className="space-y-3">
                  {STEPS.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`flex items-start gap-3 group`}
                        aria-current={i === active ? "step" : undefined}
                      >
                        <span className={`mt-1 h-2 w-2 rounded-full ${i === active ? "bg-[#111]" : "bg-gray-300 group-hover:bg-gray-400"}`} />
                        <div>
                          <div className={`text-[12px] tracking-wide ${i === active ? "text-[#111]" : "text-gray-500"}`}>{s.year}</div>
                          <div className={`text-sm ${i === active ? "text-[#111]" : "text-gray-600 group-hover:text-[#111]"}`}>{s.title}</div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <a
                  href="/investir"
                  className="h-11 w-full sm:w-auto inline-flex items-center justify-center bg-[#F7B096] text-black font-normal rounded-full px-6 text-base shadow-sm border border-[#F7B096] transition hover:bg-transparent hover:text-[#F7B096] hover:border-[#F7B096] group"
                  style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
                >
                  Investir à nos côtés
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-5 h-5 text-black group-hover:text-[#F7B096] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>

          {/* Right: sections */}
          <div className="lg:w-7/12">
            <div className="space-y-16 md:space-y-24">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <section key={step.id} id={step.id} className="origin-step scroll-mt-28">
                    <div className="rounded-xl overflow-hidden bg-[#EFEAE7]">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6 sm:p-8">
                          <h3 className="text-xl sm:text-2xl font-medium text-[#111] mb-3">{step.title}</h3>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-[60ch]">{step.description}</p>
                        </div>
                        <motion.div
                          className="relative min-h-[220px] sm:min-h-[260px]"
                          initial={{ opacity: 0.9, scale: 1 }}
                          animate={{ opacity: isActive ? 1 : 0.92, scale: isActive ? 1.02 : 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        >
                          <img src={step.image} alt={step.title} className="w-full h-full object-cover object-center" />
                          <motion.div
                            initial={{ y: -6, opacity: 0.85, scale: 1 }}
                            animate={{ y: isActive ? 0 : -2, opacity: isActive ? 1 : 0.9, scale: isActive ? 1.1 : 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className={`${isActive ? "bg-white/85 text-black ring-black/10 shadow-sm" : "bg-black/55 text-white ring-white/20"} absolute top-4 right-4 rounded-full px-4 py-2 text-sm sm:text-base md:text-lg font-medium backdrop-blur-[2px]`}
                          >
                            {step.year}
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
