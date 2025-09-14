'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const solutions = [
  {
    id: 1,
    status: "Fermé à la souscription",
    statusColor: "bg-black text-white",
    types: "Bureau, résidentiel",
    title: "Offstone Value-Add I",
    subtitle: "Exposition diversifiée",
    description: "Opération entre 1 M€ et 15 M€",
         fiscalite: "Fonds fiscal",
    equity: "20 M€ d'equity",
    minimum: "Accessible à partir de 25 k€",
    image: "/images/Buildings/rue-la-boetie-11-copie-scaled.jpg",
    cta: "Fermé à la souscription"
  },
  {
    id: 2,
    status: "En cours de collecte",
    statusColor: "bg-[#F7B096] text-black",
    types: "Bureau, résidentiel, hôtellerie",
    title: "Offstone Value-Add II",
    subtitle: "Exposition diversifiée",
    description: "Opérations entre 1 M€ et 50 M€",
         fiscalite: "Fiscalité avantageuse : 150-O-B ter / Hors IFI",
    equity: "50 M€ d'equity",
    minimum: "Accessible à partir de 100 k€",
    image: "/images/Buildings/Orange buildings.jpg",
    cta: "Découvrir ce fonds"
  },
  {
    id: 3,
    status: "En cours de collecte",
    statusColor: "bg-[#F7B096] text-black",
    types: "Hôtels et bureaux à rénover",
    title: "Offstone Hospitality",
    subtitle: "Investissez dans le développement de smart hôtels",
    description: "Actifs situés dans les quartiers centraux de grandes villes françaises",
         fiscalite: "",
    equity: "\nTaille cible de 200 M€",
  minimum: "Accessible à partir de 20k€",
    image: "/images/Buildings/Ienaa.jpg",
    cta: "Découvrir ce fonds"
  }
];

export default function SolutionsInvestissement() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-sm font-medium text-gray-600 mb-2">Private equity immobilier</p>
          <p className="text-lg text-gray-700 max-w-4xl">
            Conçus individuellement dans le cadre d'une stratégie dédiée, les véhicules ont pour objectif commun d'ouvrir l'accès à une catégorie d'investissements immobiliers à forte valeur ajoutée.
          </p>
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-400 mb-3 tracking-tight">
            01.
          </h2>
          <h3 className="text-2xl lg:text-3xl font-medium text-gray-900 tracking-tight">
            Solutions d'investissement :
          </h3>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
                             {/* Image */}
               <div className="relative overflow-hidden h-56">
                 <Image
                   src={solution.image}
                   alt={solution.title}
                   fill
                   className="object-cover transition-transform duration-300 hover:scale-105"
                   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 />
                 
                                                     {/* Mini titre du fonds */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <p 
                      className="text-2xl lg:text-3xl text-white tracking-tight text-center px-4"
                      style={{
                        fontFamily: "'Alliance No.1', Arial, sans-serif",
                        fontWeight: 500,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {solution.title}
                    </p>
                  </div>
                  
                  {/* Bandeau de statut - par-dessus le filtre noir */}
                  <div className={`absolute top-0 left-0 right-0 px-3 py-2 z-10 ${
                    solution.status === "En cours de collecte" 
                      ? "bg-[#F7B096] text-black" 
                      : "bg-black/80 text-white"
                  }`}>
                    <p className="text-xs font-medium tracking-wide uppercase">
                      {solution.status}
                    </p>
                  </div>
               </div>

                             {/* Content */}
               <div className="p-6">
                                 {/* Types */}
                 <div className="mb-4">
                   <p className="text-sm text-gray-600 font-medium">{solution.types}</p>
                 </div>

                {/* Title and Subtitle */}
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">{solution.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{solution.subtitle}</p>
                </div>

                                                  {/* Details */}
                 <div className="space-y-3 mb-8">
                   <p className="text-sm text-gray-700 leading-relaxed">{solution.description}</p>
                   <p className="text-sm text-gray-600 leading-relaxed">{solution.fiscalite}</p>
                   
                   {/* Case grise fusionnée - Equity + Minimum */}
                   <div className="bg-gray-200 px-4 py-3 rounded-lg">
                     <p className="text-lg font-semibold text-gray-900 mb-1">{solution.equity}</p>
                     {solution.minimum && (
                       <p className="text-sm font-medium text-gray-700">{solution.minimum}</p>
                     )}
                   </div>
                   
                   
                 </div>

                                 {/* CTA */}
                 <button className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${
                   solution.id === 1 
                     ? 'bg-gray-800 text-white cursor-not-allowed opacity-75' 
                     : 'bg-[#F7B096] hover:bg-[#e69a7a] text-black hover:shadow-sm'
                 }`}>
                   {solution.cta}
                 </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Solutions sur mesure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-24"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-400 mb-3 tracking-tight">
            02.
          </h2>
          <h3 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-4 tracking-tight">
            Solutions sur mesure :
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-4xl leading-relaxed">
            Nous construisons des fonds dédiés avec des institutionnels en définissant ensemble une thèse d'investissement adaptées à leurs attentes.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-transparent border border-[#F7B096] text-[#F7B096] hover:bg-[#F7B096] hover:text-black font-medium rounded-lg transition-all duration-200 hover:shadow-sm">
            <span className="mr-2 text-lg">+</span>
            Échanger sur votre stratégie cible
          </button>
        </motion.div>
      </div>
    </section>
  );
}
