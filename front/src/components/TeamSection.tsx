'use client';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const teamMembers = [
  {
    name: 'Projet Haussmann',
    role: 'Paris 8ème',
    image: '/videos/Images immeubles/58226-rue-la-boetie-13-copie-scaled.jpg.webp',
  },
  {
    name: 'Rue Abel Truchet',
    role: 'Paris 17ème',
    image: '/videos/Images immeubles/WEB_Rue-Abel-Truchet-47951-PictHouse.jpg.webp',
  },
  {
    name: 'Rue du Moulin Vert',
    role: 'Paris 14ème',
    image: '/videos/Images immeubles/60348-Rue-du-Moulin-Vert-39CB-scaled.jpg.webp',
  },
  {
    name: 'Projet Lux',
    role: 'Paris 1er',
    image: '/videos/Images immeubles/WEB_LUX_0749.jpg.webp',
  },
];

import SwiperCarousel from './SwiperCarousel';

export default function TeamSection() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-full mx-auto px-2 md:px-8">
        <h2 className="text-center text-5xl md:text-6xl font-light text-[#383843] max-w-4xl mx-auto mt-0 mb-8 leading-tight">
          Investissez demain<br />comme nous l’avons fait hier.
        </h2>
        <p className="text-center text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-0 mb-8">
          Nous sommes une équipe d'investisseurs et d'opérateurs avec plus de 15 ans d'expérience dans la transformation immobilière.
        </p>
        {/* Swiper Carousel */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-0">
          {/* Swiper core CSS */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css" />
          {/* Swiper Carousel */}
          <SwiperCarousel />
        </div>
      </div>
    </section>
  );
}
