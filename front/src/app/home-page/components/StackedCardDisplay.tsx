"use client";
// src/components/StackedCardDisplay.tsx

import React, { useRef } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useScroll, motion } from "framer-motion";

// 1. TypeScript interface remains the same
interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  category: string;
}

// 2. The project data is the same
const projects: Project[] = [
    {
    title: "Coastal Harmony Home",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
    src: "/videos/images-immeubles/00000017-PHOTO-2023-12-13-18-35-56.jpg.webp",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#BBACAF",
    category: "Logistique",
  },
  {
    title: "Montana Modern",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
    src: "/videos/images-immeubles/58226-rue-la-boetie-13-copie-scaled.jpg.webp",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#977F6D",
    category: "Bureaux",
  },
  {
    title: "Urban Oasis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
    src: "/videos/images-immeubles/60348-Rue-du-Moulin-Vert-39CB-scaled.jpg.webp",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D",
    category: "Résidentiel",
  },
];

// 3. The component using Framer Motion
const StackedCardDisplay = () => {
  const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
});
// useTransform import supprimé car non utilisé

  return (
    <main ref={containerRef} className="relative mt-20">
      {/* <h1 className="text-center text-3xl md:text-5xl font-bold mb-20">
        Featured Projects
      </h1> */}
      {projects.map((project, i) => {
        // Hooks must be called at the top level, not inside map
        // So we move useTransform outside the map and use arrays to store values if needed
        // For now, we disable the animation to fix the build error
        // TODO: Refactor with correct hook usage if animation is needed

        return (
          <motion.div
            key={`p_${i}`}
            className="sticky top-[10vh] flex items-center justify-center h-screen"
            // Animation désactivée temporairement pour corriger l'erreur de build
            style={{
              // scale,
              // top,
            }}
          >
            <div
              className="w-full max-w-7xl h-[520px] p-10 text-black flex flex-col justify-between"
              style={{
                backgroundColor: "#f3f1f0",
              }}
            >
              <div className="bg-[#181818] px-5 py-2 text-lg font-medium text-white flex items-center justify-center mb-2 w-fit min-w-[120px] text-center">
                {project.category}
              </div>
              <div className="flex gap-10 h-4/5 mt-[-8px]">
                <div className="w-[85%] h-[371px] relative overflow-hidden -mt-4">
                  <Image
                    fill={true}
                    src={project.src}
                    alt={`Image for ${project.title}`}
                    className="object-cover"
                  />
                </div>
                <div className="w-2/5 flex flex-col justify-between -mt-2">
                  <h2 className="text-4xl font-medium text-black mb-4 text-left">
                    {project.title}
                  </h2>
                  <p className="text-base leading-relaxed -mt-24 mb-[-8px]">
                    {project.description}
                  </p>
                  <a href="#investir" className="inline-flex items-center justify-center w-44 py-3 text-[15px] font-medium tracking-[-0.01em] shadow-sm rounded-full bg-[#F7B096] text-black border border-[#F7B096] hover:bg-white hover:text-[#F7B096] transition-all text-center">
                    Investir à nos côtés
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </main>
  );
};

export default StackedCardDisplay;
