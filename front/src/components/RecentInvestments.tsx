'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const investments = [
  {
    id: 1,
    company: 'Maison Boétie',
    description: 'The AI-powered legal assistant that saves you time and money.',
    image: '/videos/Images immeubles/58226-rue-la-boetie-13-copie-scaled.jpg.webp',
  },
  {
    id: 2,
    company: 'Maison Iena',
    description: 'Pioneering the future of cloud computing and data analysis.',
    image: '/videos/Images immeubles/AGUESSEAU-GESTION-11-scaled.jpg.webp',
  },
  {
    id: 3,
    company: 'Truchet',
    description: 'Revolutionizing healthcare with our innovative new platform.',
    image: '/videos/Images immeubles/WEB_Rue-Abel-Truchet-47951-PictHouse.jpg.webp',
  },
];

const RecentInvestments: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextInvestment = () => {
    setIndex((prevIndex) => (prevIndex + 1) % investments.length);
  };

  const prevInvestment = () => {
    setIndex((prevIndex) => (prevIndex - 1 + investments.length) % investments.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* New Title and Subtitle */}
        <SectionTitle
          title={
            <>
              Investissez aujourd&apos;hui
              <br />
              comme nous l&apos;avons fait hier.
            </>
          }
          subtitle="Nous sommes une équipe d&apos;investisseurs et d&apos;opérateurs avec plus de 15 ans d&apos;expérience dans la transformation immobilière."
          align="center"
          textColor="dark"
        />
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevInvestment}
            className="absolute left-[7%] z-10 flex items-center justify-center bg-transparent p-0"
            aria-label="Previous"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="80" height="80" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 80 80">
              <line x1="60" y1="40" x2="20" y2="40" stroke="#111" strokeWidth="2"/>
              <polyline points="34,24 20,40 34,56" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Carousel */}
          <div className="relative flex w-full max-w-5xl h-[500px] items-stretch justify-center">
            {/* Image */}
            <div className="w-[75%] h-full relative -ml-80">
              <Image
                src={investments[index].image}
                alt={investments[index].company}
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                priority
              />
            </div>
            {/* Description Rectangle */}
            <div
              className="absolute bg-[#ECF0F1] flex flex-col justify-center items-start p-10 z-10"
              style={{
                width: '38%',
                height: '88%',
                right: '0%',
                bottom: '0',
                top: 'auto',
                borderRadius: 0,
                boxShadow: 'none',
                minWidth: 320,
                maxWidth: 420,
              }}
            >
              <h3 className="text-3xl font-normal text-black mb-6">{investments[index].company}</h3>
              <p className="text-lg text-gray-700 mb-6">{investments[index].description}</p>
              <button
                className="bg-transparent text-black font-normal rounded-full px-8 py-3 text-base md:text-lg shadow-sm border border-[#00D481] transition hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
                style={{
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                }}
              >
                Investir
              </button>
            </div>
          </div>
          {/* Right Arrow */}
          <button
            onClick={nextInvestment}
            className="absolute right-[7%] z-10 flex items-center justify-center bg-transparent p-0"
            aria-label="Next"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="80" height="80" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 80 80">
              <line x1="20" y1="40" x2="60" y2="40" stroke="#111" strokeWidth="2"/>
              <polyline points="46,24 60,40 46,56" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        {/* Pagination Traits */}
        <div className="flex justify-center items-center mt-8 gap-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-0.5 w-10 rounded transition-all duration-200 ${
                index === i ? 'bg-black' : 'bg-[#A0A0A0]'
              }`}
              style={{
                display: 'inline-block',
                opacity: index === i ? 1 : 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentInvestments;
