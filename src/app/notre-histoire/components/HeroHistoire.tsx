import React from "react";
/* eslint-disable react/no-unescaped-entities */

const HeroHistoire: React.FC = () => {
  return (
    <section
      className="relative w-full h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/confiance/hero-nos-solutions.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 text-center">
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 text-black inline-block px-6 py-2"
          style={{ fontFamily: "AllianceNo1-Bold, Arial, sans-serif" }}
        >
          <span className="text-white">Nos Solutions</span><br /><span className="bg-[#F7B096] px-2 rounded">d'investissements.</span>
        </h1>
        {/* Ajoutez ici un sous-titre ou du contenu si besoin */}
      </div>
    </section>
  );
};

export default HeroHistoire;
