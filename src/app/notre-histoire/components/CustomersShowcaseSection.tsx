"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import SpontaneousApplicationModal from "@/components/forms/SpontaneousApplicationModal";

type CtaCard = {
  title: string;
  description: string;
  ctaText: string;
  href: string;
  theme: "light" | "dark";
  imageSrc?: string;
};

const ctaCards: CtaCard[] = [
  {
    title: "Une expertise reconnue",
    description: "Une équipe d'experts passionnés par l'immobilier, réunie autour de Jonathan Anguelov pour construire ensemble l'avenir de l'investissement immobilier.",
    ctaText: "",
    href: "",
    theme: "light",
    imageSrc: "/images/Backgrounds/Mountain.webp",
  },
  {
    title: "Rejoindre notre équipe",
    description: "Nous recherchons des personnes exigeantes et curieuses pour construire avec nous.",
    ctaText: "Postuler",
    href: "/contact?type=recrutement",
    theme: "dark",
  },
];

export default function CustomersShowcaseSection() {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const handlePostulerClick = () => {
    // Get current page data for tracking
    const pageData = {
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      ref: typeof document !== 'undefined' ? document.referrer : undefined,
      utm_source: 'site',
      utm_medium: 'internal_cta',
      utm_campaign: 'notre-histoire',
      utm_content: 'rejoindre-equipe',
      utm_term: 'candidature-spontanee',
      cta_id: 'notre_histoire_rejoindre_equipe'
    };

    setIsApplicationModalOpen(true);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {ctaCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08 } }}
              viewport={{ once: true, margin: "-15% 0px" }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border transition-transform duration-300 hover:-translate-y-0.5 ${
                c.theme === "dark" ? "border-neutral-800 bg-[#1b1b1b]" : "border-neutral-200 bg-white"
              } min-h-[520px] md:min-h-[600px]`}
            >
              {/* Background image for light card */}
              {c.theme === "light" && c.imageSrc && (
                <>
                  <Image
                    src={c.imageSrc}
                    alt="Section visuelle"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white/95" />
                </>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col">
                <div className="flex-1" />
                <div className={`space-y-4 ${!c.ctaText ? 'transform -translate-y-8' : ''}`}>
                  <h3
                    className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-tight line-clamp-2 ${
                      c.theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className={`max-w-xl text-sm md:text-base ${c.theme === "dark" ? "text-neutral-300" : "text-black/80"}`}>
                    {c.description}
                  </p>
                  {c.ctaText && (
                    <div>
                      {c.ctaText === "Postuler" ? (
                        <button
                          onClick={handlePostulerClick}
                          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 shadow-sm border ${
                            c.theme === "dark"
                              ? "bg-white text-black border-white/10 hover:bg-neutral-100"
                              : "bg-[#F7B096] text-black border-black/10 hover:bg-[#f9c3b0]"
                          }`}
                        >
                          {c.ctaText}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      ) : (
                        <a
                          href={c.href}
                          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 shadow-sm border ${
                            c.theme === "dark"
                              ? "bg-white text-black border-white/10 hover:bg-neutral-100"
                              : "bg-[#F7B096] text-black border-black/10 hover:bg-[#f9c3b0]"
                          }`}
                        >
                          {c.ctaText}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="transform transition-transform group-hover:translate-x-0.5"
                          >
                            <polyline points="5 4 11 8 5 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de candidature spontanée */}
      <SpontaneousApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        initialData={{
          page_url: typeof window !== 'undefined' ? window.location.href : undefined,
          ref: typeof document !== 'undefined' ? document.referrer : undefined,
          utm_source: 'site',
          utm_medium: 'internal_cta',
          utm_campaign: 'notre-histoire',
          utm_content: 'rejoindre-equipe',
          utm_term: 'candidature-spontanee',
          cta_id: 'notre_histoire_rejoindre_equipe'
        }}
      />
    </section>
  );
}
