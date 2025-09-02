"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
    title: "Intéressé par ce qu’on construit ?",
    description: "Parlez à un membre de notre équipe et voyons comment on peut vous aider.",
    ctaText: "Parler à notre équipe",
    href: "/contact",
    theme: "light",
    imageSrc: "/images/Backgrounds/Mountain.jpg",
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
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white/90" />
                </>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col">
                <div className="flex-1" />
                <div className="space-y-4">
                  <h3
                    className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-tight line-clamp-2 ${
                      c.theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className={`max-w-xl text-sm md:text-base line-clamp-3 ${c.theme === "dark" ? "text-neutral-300" : "text-black/80"}`}>
                    {c.description}
                  </p>
                  <div>
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
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transform transition-transform group-hover:translate-x-0.5"
                      >
                        <polyline points="5 4 11 8 5 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
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
