'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';

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

export default function SwiperCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={2.2}
      spaceBetween={32}
      loop
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      speed={1200}
      className="w-full"
      style={{ padding: 0, margin: 0 }}
      breakpoints={{
        640: { slidesPerView: 2.2, spaceBetween: 32 },
        1024: { slidesPerView: 3.2, spaceBetween: 40 },
        1440: { slidesPerView: 4, spaceBetween: 48 },
      }}
    >
      {teamMembers.map((member) => (
        <SwiperSlide key={member.name}>
          <div className="flex flex-col h-full w-full">
            <div className="relative w-full aspect-square bg-black min-h-[320px] md:min-h-[420px] lg:min-h-[520px]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                priority
              />
            </div>
            <div className="text-left px-0 pt-3">
              <h3 className="text-sm md:text-base font-normal text-gray-800 tracking-wide">{member.name}</h3>
              <p className="text-xs md:text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
