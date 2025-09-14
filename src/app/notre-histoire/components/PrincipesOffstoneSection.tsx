"use client";
import React from "react";
import { motion } from "framer-motion";

type Principle = {
  id: string;
  title: string;
  text: string;
  tags: string[];
};

const PRINCIPLES: Principle[] = [
  {
    id: "discipline",
    title: "Discipline de sélection",
    text: "Peu d’opérations, pour les bonnes raisons. On documente autant ce qu’on retient que ce qu’on écarte.",
    tags: ["sélection", "contre‑arguments", "données"],
  },
  {
    id: "risque",
    title: "Protection du capital",
    text: "On protège d’abord le capital. Structures adaptées, marges de sécurité et scénarios de sortie pensés dès le départ.",
    tags: ["sécurité", "structure", "sortie"],
  },
  {
    id: "alignement",
    title: "Alignement réel",
    text: "Co‑investissement personnel de Jonathan. Une rémunération pensée pour l’alignement et la durée.",
    tags: ["co‑investissement", "alignement"],
  },
  {
    id: "transparence",
    title: "Transparence complète",
    text: "Documentation, métriques et suivi complet de vos investissements immobiliers à nos côtés, grâce à notre plateforme digitale propriétaire.",
    tags: ["reporting", "plateforme", "documentation"],
  },
];

export default function PrincipesOffstoneSection() {
  return (
    <section className="relative py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 xs:px-8 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
            <span className="text-gray-600 text-xs tracking-[0.18em] uppercase">Méthode d’investissement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] font-normal tracking-tight text-[#111] leading-[1.15]">Nos principes d’investissement.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PRINCIPLES.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              className="rounded-xl border border-gray-200 bg-white px-5 py-6 sm:px-6 sm:py-7"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
                <div>
                  <h3 className="text-lg sm:text-xl text-[#111] mb-2 font-medium relative after:content-[''] after:block after:mt-2 after:h-[1px] after:w-8 after:bg-black/10">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">{p.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-700 bg-gray-50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
