"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/logos/bandeau-hero/Le_Monde.svg.png", alt: "Le Monde", size: "large" },
  { src: "/images/logos/bandeau-hero/business insder logo.png", alt: "Business Insider", size: "normal" },
  { src: "/images/logos/bandeau-hero/capital-logo-png-transparent.png", alt: "Capital", size: "large" },
  { src: "/images/logos/bandeau-hero/Forbes-Logo-1999-present.png", alt: "Forbes", size: "normal" },
  { src: "/images/logos/bandeau-hero/France.tv_-_logo_2022.svg.png", alt: "France TV", size: "normal" },
  { src: "/images/logos/bandeau-hero/LeFigaro_Logo_Bleu_RVB.png", alt: "Le Figaro", size: "large" },
  { src: "/images/logos/bandeau-hero/Les_echos_(logo).svg.png", alt: "Les Échos", size: "normal" },
  { src: "/images/logos/bandeau-hero/Logo_BFM_TV_(2025).png", alt: "BFM TV", size: "normal" },
  { src: "/images/logos/bandeau-hero/Logo_Challenges.png", alt: "Challenges", size: "normal" },
  { src: "/images/logos/bandeau-hero/Logo_Maddyness_Black-1000.png", alt: "Maddyness", size: "large" },
  { src: "/images/logos/bandeau-hero/TechCrunch-Logo-2011.png", alt: "TechCrunch", size: "large" },
];

export default function LogosBanner() {
  // Dupliquer les logos pour créer un effet de boucle infinie
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="w-full bg-white py-5 md:py-6 border-t border-b border-neutral-100">
      <div className="overflow-hidden">
        <motion.div
          className="flex items-center gap-8 md:gap-12 lg:gap-16"
          animate={{
            x: [0, -100 * logos.length], // Déplace de 0 à -100% de la largeur
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // 30 secondes pour un cycle complet
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => {
            const containerSize = logo.size === "large" ? { width: "135px", height: "68px" } : { width: "92px", height: "46px" };
            const imageSize = logo.size === "large" ? { width: 135, height: 68 } : { width: 92, height: 46 };
            
            return (
              <div
                key={`${logo.alt}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={containerSize}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={imageSize.width}
                  height={imageSize.height}
                  className="object-contain filter grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
