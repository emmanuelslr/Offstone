// eslint-disable-next-line react/no-unescaped-entities
'use client';
import SectionTitle from './SectionTitle';

const squares = [
  {
    label: 'Opportunités exclusives',
    description: 'Là où le manque de logements crée la valeur.',
  },
  {
    label: 'Investir à nos côtés',
    description: 'Captons le foncier rare au cœur des usages.',
  },
  {
    label: 'Revenus attractifs',
    description: "Transformons l'obsolète en actif stratégique.",
  },
  {
    label: 'Accès simplifié',
    description: "Donnons du sens à l'accueil. Réinventons l'hospitalité.",
  }
];

export default function FourSquaresSection() {
  const renderDot = () => (
    <div className="relative w-4 h-4">
      <div className="absolute w-4 h-4 rounded-full bg-[#00D481] transform transition-all duration-300 group-hover:translate-x-2 group-hover:bg-white"></div>
      <div className="absolute w-4 h-4 rounded-full bg-[#00D481] transform transition-all duration-300 group-hover:-translate-x-2 group-hover:bg-white"></div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-24 pb-12">
      {/* NOUVEAU conteneur flex pour créer les 2 colonnes */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">

        {/* --- COLONNE DE GAUCHE (STICKY) --- */}
        <div className="md:w-1/3 flex-shrink-0 sticky top-24 self-start">
          <SectionTitle
            title={
              <>
                Captons les cycles.<br />
                Créons l'opportunité.
              </>
            }
            subtitle="Chaque marché a son moment. Nous concevons les stratégies qui les transforment en opportunités."
            // On passe l'alignement à "left" pour la mise en page en colonne
            align="left"
            textColor="dark"
          />
          {/* Vous pouvez ajouter un bouton ici si vous le souhaitez */}
          <button className="mt-8 px-6 py-2 bg-black text-white rounded-lg shadow">
            En savoir plus
          </button>
        </div>

        {/* --- COLONNE DE DROITE (CONTENU QUI DÉFILE) --- */}
        <div className="flex-1">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[340px] w-full relative">
            {/* Top left square - Résidentiel */}
            <div className="col-span-1 row-span-1 relative group">
              <div className="absolute inset-0 bg-[#F4E9D0]" />
              <div className="absolute inset-4 flex flex-col">
                <div className="flex items-center gap-3 mb-2">{renderDot()}</div>
                <h3 className="text-black font-black text-lg md:text-xl tracking-wide mb-2 text-left">{squares[0].label}</h3>
                <p className="text-black text-xl md:text-2xl font-normal mt-auto leading-tight text-left">{squares[0].description}</p>
              </div>
            </div>
            {/* Top middle square - Logistique */}
            <div className="col-span-1 row-span-1 relative group">
              <div className="absolute inset-0 bg-[#B7D5F2]" />
              <div className="absolute inset-4 flex flex-col">
                <div className="flex items-center gap-3 mb-2">{renderDot()}</div>
                <h3 className="text-black font-black text-lg md:text-xl tracking-wide mb-2 text-left">{squares[1].label}</h3>
                <p className="text-black text-xl md:text-2xl font-light mt-auto leading-tight text-left">{squares[1].description}</p>
              </div>
            </div>
            {/* Right square (spans 2 rows) - Hotels */}
            <div className="col-span-1 row-span-2 relative group">
              <div className="absolute inset-0 bg-[#F1DFDF]" />
              <div className="absolute inset-4 flex flex-col">
                <div className="flex items-center gap-3 mb-2">{renderDot()}</div>
                <h3 className="text-black font-black text-lg md:text-xl tracking-wide mb-2 text-left">{squares[3].label}</h3>
                <p className="text-black text-xl md:text-2xl font-bold mt-auto leading-tight text-left">{squares[3].description}</p>
              </div>
            </div>
            {/* Bottom rectangle (spans 2 columns) - Bureaux */}
            <div className="col-span-1 row-span-1 relative group">
              <div className="absolute inset-0 bg-[#00D481]" />
              <div className="absolute inset-4 flex flex-col">
                <div className="flex items-center gap-3 mb-2">{renderDot()}</div>
                <h3 className="text-black font-black text-lg md:text-xl tracking-wide mb-2 text-left">{squares[2].label}</h3>
                <p className="text-black text-xl md:text-2xl font-semibold mt-auto leading-tight text-left">{squares[2].description}</p>
              </div>
            </div>
          </div>
          
          {/* ATTENTION : Pour que l'effet sticky fonctionne, il faut plus de contenu ici.
            J'ajoute un bloc vide juste pour la démonstration.
            Vous devrez le remplacer par votre vrai contenu (d'autres sections, du texte, etc.)
          */}
          <div className="h-[800px] bg-gray-100 mt-8 flex items-center justify-center">
            <p className="text-gray-400">Votre contenu supplémentaire vient ici...</p>
          </div>

        </div>
      </div>
    </section>
  );
}