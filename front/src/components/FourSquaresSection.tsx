'use client';
import SectionTitle from './SectionTitle';

const squares = [
  {
    label: 'RÉSIDENTIEL',
    description: 'Là où le manque de logements crée la valeur.',
  },
  {
    label: 'LOGISTIQUE URBAINE',
    description: 'Captons le foncier rare au cœur des usages.',
  },
  {
    label: 'BUREAUX',
    description: "Transformons l'obsolète en actif stratégique.",
  },
  {
    label: 'HOTELS',
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
      <div className="mb-2">
        <SectionTitle
          title={
            <>
              Captons les cycles.<br />
              Créons l'opportunité.
            </>
          }
          subtitle="Chaque marché a son moment. Nous concevons les stratégies qui les transforment en opportunités."
          align="center"
          textColor="dark"
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[340px] w-full relative">
        {/* Top left square - Résidentiel */}
        <div className="col-span-1 row-span-1 relative group">
          <div className="absolute inset-0 bg-[#F4E9D0]" />
          <div className="absolute inset-4 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-black text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[0].label}</span>
            </div>
            <p className="text-black text-xl md:text-2xl font-normal mt-auto leading-tight text-center">{squares[0].description.replace(/'/g, "'")}</p>
          </div>
        </div>
        {/* Top middle square - Logistique */}
        <div className="col-span-1 row-span-1 relative group">
          <div className="absolute inset-0 bg-[#B7D5F2]" />
          <div className="absolute inset-4 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-black text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[1].label}</span>
            </div>
            <p className="text-black text-xl md:text-2xl font-light mt-auto leading-tight text-center">{squares[1].description.replace(/'/g, "'")}</p>
          </div>
        </div>
        {/* Right square (spans 2 rows) - Hotels */}
        <div className="col-span-1 row-span-2 relative group">
          <div className="absolute inset-0 bg-[#F1DFDF]" />
          <div className="absolute inset-4 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-black text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[3].label}</span>
            </div>
            <p className="text-black text-xl md:text-2xl font-bold mt-auto leading-tight">{squares[3].description.replace(/'/g, "'")}</p>
          </div>
        </div>
        {/* Bottom rectangle (spans 2 columns) - Bureaux */}
        <div className="col-span-2 row-span-1 relative group">
          <div className="absolute inset-0 bg-[#00D481]" />
          <div className="absolute inset-4 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-black text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[2].label}</span>
            </div>
            <p className="text-black text-xl md:text-2xl font-semibold mt-auto leading-tight">{squares[2].description.replace(/'/g, "'")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
