"use client";
// TypeScript React
import React, { useRef, useEffect, useState } from "react";

const cards = [
  {
    image: "/videos/Images immeubles/00000017-PHOTO-2023-12-13-18-35-56.jpg.webp",
    title: "Coastal Harmony Home",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
  },
  {
    image: "/videos/Images immeubles/58226-rue-la-boetie-13-copie-scaled.jpg.webp",
    title: "Montana Modern",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
  },
  {
    image: "/videos/Images immeubles/60348-Rue-du-Moulin-Vert-39CB-scaled.jpg.webp",
    title: "Urban Oasis",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
  },
  {
    image: "/videos/Images immeubles/AGUESSEAU-GESTION-11-scaled.jpg.webp",
    title: "Team Spirit",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis quam velit eu sem.",
  },
];

export default function StackedCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Empilement step-by-step
      const stepHeight = sectionHeight / cards.length;
      let index = 0;
      if (sectionTop < windowHeight && sectionTop > windowHeight - sectionHeight) {
        index = Math.floor((windowHeight - sectionTop) / stepHeight);
      }
      setActiveIndex(Math.max(0, Math.min(index, cards.length - 1)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

return (
    <section
      ref={sectionRef}
className="relative min-h-[120vh]"
    >
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen w-full">
        <h2 className="text-3xl font-bold mb-12 text-center">Projets</h2>
        <div className="relative w-full max-w-7xl h-[500px]">
          {cards.map((card, i) => {
            const isActive = i <= activeIndex;
            return (
              <div
                key={card.title}
                className={`absolute left-0 right-0 mx-auto transition-all duration-500 ease-in-out`}
                style={{
                  top: 0,
                  zIndex: isActive ? 10 + i : 0,
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? `scale(1) translateY(${10 * (activeIndex - i)}px)`
                    : "scale(1) translateY(0px)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
<div className="bg-[#f3f1f0] w-full h-[520px] overflow-hidden border border-gray-200 flex flex-row">
                  <div className="w-2/3 h-full flex flex-col items-center justify-center p-8">
                    <div className="w-full flex flex-row items-center mb-4">
<div className="bg-[#181818] px-3 py-1 text-xl font-medium text-white inline-block mr-4">Résidentiel</div>
                    </div>
<div className="bg-white shadow-lg overflow-hidden border border-gray-200 w-full h-[440px] flex items-center justify-center mt-2">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-1/3 h-full flex flex-col items-start p-8 mt-24">
<h3 className="text-4xl font-medium text-black mb-4">{card.title}</h3>
<p className="text-lg text-gray-700 mb-6">{card.text}</p>
<a href="#investir" className="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium tracking-[-0.01em] shadow-sm rounded-full bg-[#F7B096] text-black border border-[#F7B096] hover:bg-white hover:text-[#F7B096] transition-all">
  Investir à nos côtés
</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
