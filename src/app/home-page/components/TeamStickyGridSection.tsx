"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type Step = {
  title: string;
  people: string[]; // image paths
};

const steps: Step[] = [
  {
    title: "Leadership",
    people: [
      "/images/Team/Team_Photo_Cropped.webp",
      "/images/Team/Teamtest2.webp",
    ],
  },
  {
    title: "Investissement",
    people: [
      "/images/Team/Teamtest2.webp",
      "/images/Team/TeamTest.webp",
    ],
  },
  {
    title: "Opérations",
    people: [
      "/images/Team/TeamTest.webp",
      "/images/Team/Team_Photo_Cropped.webp",
    ],
  },
  {
    title: "Conseil",
    people: [
      "/images/Team/Team_Photo_Cropped.webp",
      "/images/Team/TeamTest.webp",
    ],
  },
];

export default function TeamStickyGridSection() {
  // Roles / filtres (multi-sélection)
  const roles = steps.map((s) => s.title);
  const [activeRoles, setActiveRoles] = useState<string[]>([]);
  // Compat: legacy effect below still references activeRole; define a dummy to avoid TS errors.
  // New behavior relies on activeRoles (multi-sélection).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeRole: unknown = null;
  const ParallaxImage = ({ src, isRight, children }: { src: string; isRight: boolean; children?: React.ReactNode }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // Effet plus prononcé (inspiré Creandum)
    const y = useTransform(scrollYProgress, [0, 1], isRight ? [100, -100] : [30, -30]);
    return (
      <motion.div
        ref={ref}
        style={{ y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <div className="relative rounded-lg overflow-hidden bg-gray-200 aspect-[3/4] md:aspect-[4/5] min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
          <Image src={src} alt="Team" fill className="object-cover" />
        </div>
        {children && <div className="mt-3">{children}</div>}
      </motion.div>
    );
  };
  const FilterDropdown = ({ roles, activeRole, onChange }: { roles: string[]; activeRole: string[]; onChange: (v: string[] | null) => void }) => {
    const [open, setOpen] = useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
      const onDoc = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('click', onDoc);
      return () => document.removeEventListener('click', onDoc);
    }, []);
    return (
      <div className="relative self-start" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/15 text-sm md:text-base text-gray-900 hover:bg-black/5 shadow-sm"
          aria-expanded={open}
        >
          <span className="font-medium">Filtres</span>
          <span className="text-xl leading-none">+</span>
        </button>
        {open && (
          <div className="absolute left-0 bottom-full mb-3 w-60 rounded-xl border border-black/10 bg-white shadow-xl overflow-hidden z-20">
            {/* Item utilitaire: Tous */}
            <button
              type="button"
              onClick={() => { onChange(null); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-[11px] uppercase tracking-widest ${
                (activeRole && activeRole.length === 0)
                  ? 'bg-[#252525] text-white'
                  : 'text-gray-800 hover:bg-black/5'
              }`}
            >
              <span>Tous</span>
              <span className={`h-3.5 w-3.5 rounded-[4px] border ${(activeRole && activeRole.length === 0) ? 'border-white bg-white' : 'border-gray-300 bg-transparent'}`} />
            </button>
            <div className="h-px bg-black/10" />
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  const current = activeRole ?? [];
                  const next = current.includes(r) ? current.filter((x) => x !== r) : [...current, r];
                  onChange(next);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-[11px] uppercase tracking-widest ${(activeRole ?? []).includes(r) ? 'text-black bg-black/5' : 'text-gray-800 hover:bg-black/5'}`}
              >
                <span>{r}</span>
                <span className={`h-3.5 w-3.5 rounded-[4px] border ${(activeRole ?? []).includes(r) ? 'border-black bg-black' : 'border-gray-300 bg-transparent'}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  const contentTopRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll to the top of the grid when applying filters
  useEffect(() => {
    if (activeRoles.length > 0 && contentTopRef.current) {
      const top = contentTopRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = 150; // léger offset supplémentaire pour mieux cadrer
      window.scrollTo({ top: Math.max(0, top - offset), behavior: "smooth" });
    }
  }, [activeRoles.join('|')]);

  return (
    <section className="w-full bg-[#F7F6F1] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          {/* Colonne gauche élargie et sticky */}
          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <div className="relative min-h-[70vh] flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#111] leading-[1.08]">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="mt-4 text-gray-700 text-base md:text-lg max-w-prose">
                    Notre équipe rassemble des profils complémentaires qui partagent une même exigence. Découvrez qui nous sommes et comment nous travaillons au quotidien.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center mt-6 px-4 py-2.5 rounded-full bg-[#F7B096] text-black border border-[#F7B096] hover:bg-[#e69a7a] transition"
                  >
                    Parlez à notre équipe
                  </a>
                </div>

                {/* Bouton Filtre + menu ancré en bas */}
                <FilterDropdown
                  roles={roles}
                  activeRole={activeRoles}
                  onChange={(next) => {
                    if (next === null) setActiveRoles([]); else setActiveRoles(next);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Colonne droite rétrécie avec grilles 2x2 */}
          <div className="lg:w-2/3">
            <div className="space-y-16 max-w-[740px] ml-auto" ref={contentTopRef}>
              {((activeRoles.length > 0) ? steps.filter((s) => activeRoles.includes(s.title)) : steps).map((s, i) => (
                <motion.div key={i} className="step-section" layout>
                  <motion.div className="grid grid-cols-[260px_260px] md:grid-cols-[300px_300px] lg:grid-cols-[320px_320px] gap-y-6 sm:gap-y-8 gap-x-8 md:gap-x-12 lg:gap-x-16 justify-between" layout>
                    {s.people.map((src, k) => (
                      // On alterne la colonne la plus "mobile" un bloc sur deux
                      <motion.div key={k} layout>
                        <ParallaxImage src={src} isRight={(k % 2 === 1) !== (i % 2 === 0)}>
                          <div className="text-base md:text-lg font-medium text-[#111] leading-tight">
                            Prénom Nom
                          </div>
                          <div className="text-sm md:text-base text-gray-600 leading-tight">
                            {s.title}
                          </div>
                        </ParallaxImage>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
