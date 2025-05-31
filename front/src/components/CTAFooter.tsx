'use client';
import Link from 'next/link';

export default function CTAFooter() {
  return (
    <section className="bg-gradient-to-br from-[#FFF3EC] via-[#FFE4D3] to-[#FFD4BE]">
      <div className="py-24">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-[40px] lg:text-[48px] font-normal leading-[1.15] tracking-[-0.02em] mb-9 text-gray-900">
            Prêt à investir à nos côtés dans l&apos;immobilier ?
          </h2>
          <p className="text-[18px] lg:text-[17px] text-gray-600 mb-10 leading-[1.5]">
            Accédez aux meilleures opérations, habituellement réservées aux professionnels.
          </p>
          <div className="flex items-center justify-center gap-5">
            <Link href="#" className="inline-flex items-center justify-center w-[200px] py-3.5 text-[15px] font-normal tracking-[-0.01em] text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
              Parler à un expert
            </Link>
            <Link href="#" className="inline-flex items-center justify-center w-[200px] py-3.5 text-[15px] font-normal tracking-[-0.01em] text-gray-900 border border-gray-900 rounded-lg bg-transparent hover:bg-gray-50 transition-all">
              Souscrire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
