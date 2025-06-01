'use client';
import Link from 'next/link';

export default function CTAFooter() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF3EC] via-[#FFE4D3] to-[#FFD4BE] opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F5F7FF]/30 via-[#EDF0FF]/20 to-[#E6E9FF]/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#FFE8D6]/40 via-[#FFF3EC]/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFE4D3]/30 via-[#EEE6FF]/20 to-[#FFE8D6]/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FFF3EC]/40 via-[#F5F7FF]/10 to-transparent"></div>
      <div className="relative py-24">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-[38px] lg:text-[46px] font-normal leading-[1.15] tracking-[-0.02em] mb-9 text-gray-900">
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
