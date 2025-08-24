'use client';

import React from 'react';

export default function ProCTAFooter() {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-20 sm:px-32 pt-24 pb-28">
        <div className="w-full rounded-[10px] bg-black relative overflow-hidden" style={{ minHeight: 480 }}>
                     <div className="absolute inset-0 flex flex-col items-start justify-end pl-14 sm:pl-24 pb-14 sm:pb-24 z-10">
            <h2 className="text-3xl sm:text-[38px] md:text-[44px] font-normal tracking-tighter leading-[1.1] text-white">
              Accédez à l&apos;immobilier<br />
              professionnel avec Offstone.
            </h2>
            <div className="mt-12">
                             <form
                 className="flex bg-white/90 shadow-lg sm:rounded-lg rounded-lg items-center px-2 py-1 sm:py-1.5 sm:px-3"
                 style={{ width: '420px' }}
                 onSubmit={e => e.preventDefault()}
               >
                <input
                  type="email"
                  placeholder="Entrez votre adresse mail"
                  className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-500 px-3 py-1.5 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-1.5 bg-[#F7B096] text-black border border-[#F7B096] rounded-lg font-medium transition hover:bg-[#222222] hover:text-white text-sm"
                  style={{ borderRadius: '0.5rem' }}
                >
                  Investissez à nos côtés
                </button>
              </form>
            </div>
          </div>
                     <video
             autoPlay
             muted
             loop
             playsInline
             className="absolute inset-0 w-full h-full object-cover"
             style={{ filter: 'brightness(0.55) contrast(1.1)' }}
           >
             <source src="/videos/Official Hero Video.mp4" type="video/mp4" />
           </video>
           <div 
             className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"
             style={{ mixBlendMode: 'multiply' }}
           />
        </div>
      </div>
    </section>
  );
}


