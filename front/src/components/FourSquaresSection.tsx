'use client';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const squares = [
  {
    image: '/Images/MONTANA_SHOOT_1_52.webp',
    label: 'RÉSIDENTIEL',
    description: 'Là où le manque de logements crée la valeur.',
    alt: 'Immeuble résidentiel'
  },
  {
    image: '/Images/sasha-yudaev-5t3SBRsdouQ-unsplash.jpg',
    label: 'LOGISTIQUE URBAINE',
    description: 'Captons le foncier rare au cœur des usages.',
    alt: 'Logistique urbaine'
  },
  {
    image: '/Images/photo lit.PNG',
    label: 'BUREAUX',
    description: "Transformons l'obsolète en actif stratégique.",
    alt: 'Bureaux'
  },
  {
    image: '/Images/gepacHmDQ2wBJaynQNnD9Q.jpg',
    label: 'HOTELS',
    description: "Donnons du sens à l'accueil. Réinventons l'hospitalité.",
    alt: 'Hotels'
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
    <section className="w-full max-w-7xl mx-auto px-4 pt-20 pb-16">
      <div className="mb-[-2rem]">
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
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[580px] w-full relative">
        {/* Top left square - Résidentiel */}
        <div className="col-span-1 row-span-1 relative group">
          <Image
            src={squares[0].image}
            alt={squares[0].alt}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-8 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-white text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[0].label}</span>
            </div>
<p className="text-white text-xl md:text-2xl font-normal mt-auto leading-tight text-center">{squares[0].description.replace(/'/g, "'")}</p>
          </div>
        </div>
        {/* Top middle square - Logistique */}
        <div className="col-span-1 row-span-1 relative group">
          <Image
            src={squares[1].image}
            alt={squares[1].alt}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-8 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-white text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[1].label}</span>
            </div>
<p className="text-white text-xl md:text-2xl font-light mt-auto leading-tight text-center">{squares[1].description.replace(/'/g, "'")}</p>
          </div>
        </div>
        {/* Right square (spans 2 rows) - Hotels */}
        <div className="col-span-1 row-span-2 relative group">
          <Image
            src={squares[3].image}
            alt={squares[3].alt}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-8 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-white text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[3].label}</span>
            </div>
<p className="text-white text-3xl md:text-4xl font-bold mt-auto leading-tight">{squares[3].description.replace(/'/g, "'")}</p>
          </div>
        </div>
        {/* Bottom rectangle (spans 2 columns) - Bureaux */}
        <div className="col-span-2 row-span-1 relative group">
          <Image
            src={squares[2].image}
            alt={squares[2].alt}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-8 flex flex-col">
            <div className="flex items-center gap-3">
              {renderDot()}
              <span className="text-white text-xs md:text-sm tracking-wider font-light" style={{fontSize: '0.93rem'}}>{squares[2].label}</span>
            </div>
<p className="text-white text-2xl md:text-3xl font-semibold mt-auto leading-tight">{squares[2].description.replace(/'/g, "'")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
