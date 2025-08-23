import React from "react";

// On augmente le nombre de cartes pour s'assurer que la colonne de droite
// est assez haute pour que le défilement et l'effet "sticky" soient visibles.
const cards = [
  {
    title: "Sécurité",
    description: "Investissements encadrés et sécurisés.",
  },
  {
    title: "Expertise",
    description: "Équipe expérimentée et reconnue.",
  },
  {
    title: "Accessibilité",
    description: "Plateforme simple et ouverte à tous.",
  },
  {
    title: "Transparence",
    description: "Suivi complet de vos performances.",
  },
  {
    title: "Rendement",
    description: "Potentiel de croissance attractif.",
  },
  {
    title: "Support",
    description: "Une équipe dédiée pour vous accompagner.",
  },
];

export default function InvestisseursSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        
        {/* --- Bloc de gauche (Sticky) --- */}
        {/* Les classes importantes sont : sticky, top-16, et self-start */}
        <div className="flex-1 text-left sticky top-16 self-start">
          <h2 className="text-lg font-medium text-gray-900">
            Pourquoi choisir Aguesseau ?
          </h2>
          <p className="text-base text-gray-700 mt-2">
            Découvrez nos avantages pour les investisseurs.
          </p>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg shadow">
            En savoir plus
          </button>
        </div>

        {/* --- Bloc de droite (Contenu qui défile) --- */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-start max-w-[210px] md:max-w-[220px] w-full"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}