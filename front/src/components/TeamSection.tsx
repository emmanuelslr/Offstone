'use client';
import SwiperCarousel from './SwiperCarousel';

export default function TeamSection() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-full mx-auto px-2 md:px-8">
        <h2 className="text-center text-5xl md:text-6xl font-light text-[#383843] max-w-4xl mx-auto mt-0 mb-8 leading-tight">
          Investissez demain<br />comme nous l&apos;avons fait hier.
        </h2>
        <p className="text-center text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-0 mb-8">
          Nous sommes une équipe d&apos;investisseurs et d&apos;opérateurs avec plus de 15 ans d&apos;expérience dans la transformation immobilière.
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
