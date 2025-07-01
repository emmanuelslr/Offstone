'use client';
import Image from 'next/image';

export default function CTAFooter() {
  return (
    <>
      <section className="w-full bg-transparent pt-10 pb-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch min-h-[270px] shadow-lg">
          {/* Bloc gauche : texte + bouton */}
        <div className="flex flex-col justify-center items-start flex-1 px-12 py-12 lg:py-0 bg-[#B5D4F0]">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] mb-4 leading-tight">
                Accédez à des opérations exclusives.
              </h2>
              <p className="text-base md:text-lg text-[#1A1A1A] mb-8 opacity-80">
                Fonds ou club deals, accédez à nos opérations selon vos objectifs.
              </p>
              <button
                className="bg-white text-[#1A1A1A] font-normal rounded-full px-8 py-3 text-base md:text-lg shadow-sm hover:bg-[#f3b8c9] transition"
                style={{
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                  border: 'none',
                }}
              >
                Je m&apos;inscris
              </button>
            </div>
          </div>
          {/* Bloc droit : image */}
          <div className="flex-1 relative min-h-[270px]">
            <Image
              src="/Images/Notion x Included.jpg"
              alt="Notion x Included"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="w-full h-full"
              priority
            />
          </div>
        </div>
      </section>
      <div className="w-full bg-white" style={{ height: '40px' }}></div>
    </>
  );
}
