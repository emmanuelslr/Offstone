'use client';

import Image from 'next/image';

const logos = [
  '/Images/Confiance/logo-client-bnpparibas.svg',
  '/Images/Confiance/logo-client-ca-indosuez.svg',
  '/Images/Confiance/logo-client-cic.svg',
  '/Images/Confiance/logo-client-bpce.svg',
  '/Images/Confiance/logo-client-bred.svg',
  '/Images/Confiance/logo-client-neuflize.svg',
  '/Images/Confiance/logo-client-oddo.svg',
  '/Images/Confiance/logo-client-mb-studio.svg',
  '/Images/Confiance/logo-client-studio-amv.svg',
  '/Images/Confiance/logo-client-ca.svg',
];

export default function PartnerLogosSection() {
  return (
<section className="relative py-16 bg-white overflow-hidden mb-32">
      <div className="w-full">
<h2 className="text-4xl font-medium text-center text-gray-900 mb-16">
          Ensemble, avec des partenaires de référence.
        </h2>
<div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap">
<div className="w-full bg-[#F5F5F5] rounded-xl py-8 px-2 flex items-center">
              <div className="flex animate-scroll">
              {[...logos, ...logos, ...logos].map((logo, index, array) => (
<div
                key={index}
                className={`flex-none h-[60px] relative ${
                  index < array.length - 1 &&
                  (array[index].includes('MB Studio') && array[index + 1].includes('STUDIO AMV'))
                    ? 'mr-3'
                    : (array[index].includes('oddo') && array[index + 1].includes('MB Studio'))
                    ? 'mr-9'
                    : (array[index].includes('STUDIO AMV') && array[index + 1].includes('CA'))
                    ? 'mr-11'
                    : (array[index].includes('CA INDOSUEZ') && array[index + 1].includes('CIC'))
                    ? 'mr-28'
                    : 'mr-24'
                } ${
                  logo.includes('CIC') ? 'w-[90px]' : 
                  logo.includes('CA INDOSUEZ') ? 'w-[95px]' :
                  logo.includes('CA') ? 'w-[120px]' :
                  logo.includes('BRED') ? 'w-[140px]' :
                  logo.includes('Groupe BPCE') ? 'w-[180px]' :
                  logo.includes('STUDIO AMV') ? 'w-[175px]' :
                  logo.includes('MB Studio') ? 'w-[140px]' :
                  logo.includes('oddo') ? 'w-[150px]' : 'w-[150px]'
                }`}
              >
                <Image
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
className="object-contain object-center [filter:grayscale(1)] opacity-60"
                />
              </div>
            ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
