"use client";
import React from "react";

const timelineData = [
  { year: "2018", title: "Création", description: "Début de l’aventure Aguesseau." },
  { year: "2019", title: "Croissance", description: "Expansion du portefeuille et de l’équipe." },
  { year: "2021", title: "Nouveaux horizons", description: "Nouveaux marchés et partenaires." },
  { year: "2023", title: "Innovation", description: "Lancement de nouveaux produits et services." },
  { year: "2025", title: "Nouvelle étape", description: "Développement stratégique et nouveaux partenariats." },
  { year: "2027", title: "Vision future", description: "Objectifs et ambitions pour les années à venir." },
];

export default function NotreHistoireTimeline() {
  return (
    <section className="w-full bg-white py-24 flex flex-col items-center justify-center">
      <h2 className="text-black text-4xl font-light mb-16 text-center">Notre histoire</h2>
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative">
        {/* Dotted line behind circles */}
        <div className="absolute left-12 right-12 top-20 h-0 z-0">
          <div className="w-full border-t-2 border-dotted border-black" />
        </div>
        <div className="flex flex-row items-center justify-center w-full px-8 relative z-10">
          {timelineData.map((item, idx) => (
            <div key={item.year} className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center mb-2">
                <span className="text-white text-xl font-normal">{item.year}</span>
              </div>
              <div className="mt-6 text-center" style={{ minHeight: "72px" }}>
                <div className="text-black text-base font-normal">{item.title}</div>
                <div className="text-gray-500 text-base mt-2">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
