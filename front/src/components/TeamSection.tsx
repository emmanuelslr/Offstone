'use client';
import SwiperCarousel from './SwiperCarousel';

export default function TeamSection() {
  return (
    <section className="bg-white py-0">
      <div className="max-w-full mx-auto px-0.5 md:px-1">
        <h2 className="text-center text-xs md:text-sm font-light text-[#383843] max-w-xs mx-auto mt-0 mb-0 leading-tight">
          Investissez demain<br />comme nous l'avons fait hier.
        </h2>
        <p className="text-center text-[8px] md:text-[10px] text-gray-600 max-w-[180px] mx-auto mt-0 mb-0">
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
