// app/test/page.tsx

import Image from "next/image";

const articles = [
  {
    title: "Interview croisée : Christophe Barre & Manuel Darcemont",
    description:
      "Retour sur le parcours et la vision des fondateurs d’Hexa dans le monde de la tech.",
    image: "/images/articles/article-christophe-barre.webp",
    link: "#",
    source: "TechCrunch",
    date: "Avril 2024",
  },
  {
    title: "Hexa lève 20M€ pour accélérer la création de startups",
    description:
      "Hexa annonce une levée de fonds de 20 millions d’euros pour soutenir l’innovation et la croissance des startups.",
    image: "/images/shared/photohumain2.webp",
    link: "#",
    source: "Les Echos",
    date: "Juin 2024",
  },
  {
    title: "Hexa : le startup studio qui révolutionne l’entrepreneuriat",
    description:
      "Découvrez comment Hexa accompagne les entrepreneurs dans la création de startups à succès.",
    image: "/images/shared/photohumain3.webp",
    link: "#",
    source: "Le Figaro",
    date: "Mai 2024",
  }
];


// On crée un composant de page de test
export default function TestPage() {
  return (
    // On englobe dans un main pour un contexte de page propre
    <main className="p-8">
      
      {/* Ici, on place le code de la section qui doit fonctionner */}
      <section className="w-full bg-white py-20">
<div className="max-w-7xl mx-auto px-1">
<h2 className="text-[5.5rem] text-black mb-12" style={{ fontWeight: 375 }}>Ils parlent de nous.</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-center items-start">
{articles.map((article, idx) => (
<a
                href={article.link}
                key={idx}
                className="group block overflow-hidden"
              >
<div className="pl-0 pb-0 pr-6">
<div className="flex items-center gap-2 mb-4">
<span className="text-sm font-semibold text-gray-500 uppercase">
                      {article.source}
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{article.date}</span>
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 33vw"
                  />
                </div>
<div className="pl-0 pt-6 pr-6">
<h3 className="text-xl font-normal font-sans text-black mb-6 group-hover:text-[#F7B096] transition-colors duration-300">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
