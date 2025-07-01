'use client';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const images = [
  '/Images/MONTANA_SHOOT_1_52.webp',
  '/Images/sasha-yudaev-5t3SBRsdouQ-unsplash.jpg',
  '/Images/photo lit.PNG',
  '/Images/gepacHmDQ2wBJaynQNnD9Q.jpg'
];

// Gris plus marqué, inspiré de Sequoia
const separator = 'rgba(120, 120, 120, 0.55)';

export default function FourSquaresSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">
      <SectionTitle
        title={
          <>
            Investissez demain<br />
            comme nous l’avons fait hier.
          </>
        }
        subtitle="Nous sommes une équipe d'investisseurs et d'opérateurs avec plus de 15 ans d'expérience dans la transformation immobilière."
        align="center"
        textColor="dark"
      />
      <div className="grid grid-cols-3 grid-rows-2 gap-7 h-[630px] w-full relative">
        {/* Top left squares */}
        <div className="col-span-1 row-span-1 relative">
          <Image
            src={images[0]}
            alt="Immeuble 1"
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src={images[1]}
            alt="Immeuble 2"
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Big right square (spans 2 rows) */}
        <div className="col-span-1 row-span-2 relative">
          <Image
            src={images[3]}
            alt="Immeuble 4"
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Bottom left rectangle (spans 2 columns) */}
        <div className="col-span-2 row-span-1 relative">
          <Image
            src={images[2]}
            alt="Immeuble 3"
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Separators removed */}
      </div>
    </section>
  );
}
