'use client';

import React, { useState } from 'react';
import { Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

/* const benefits: string[] = [
  'Accès prioritaire aux deals',
  'Visites privées d’immeubles',
  'Sessions de travail avec Jonathan Anguelov',
  'Soirées networking sélectives',
  'Webinars',
  'Dîners privés',
]; */


function BenefitsChipsSectionInner(props: any) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const value = (email || '').trim();
      if (!value) return;
      const url = typeof window !== 'undefined' ? window.location.href : undefined;
      const entries = searchParams ? Array.from(searchParams.entries()) : [];
      const params = new URLSearchParams(entries);
      (function (d) {
        if (typeof window !== 'undefined') {
          try {
            const w: any = window as any;
            if (w.offstoneOpenWaitlist) {
              w.offstoneOpenWaitlist(d);
            } else {
              (w.__offstone_waitlist_queue ||= []).push(d);
              w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d }));
            }
          } catch {}
        }
      })({
        email: value,
        page_url: url,
        ref: typeof document !== 'undefined' ? document.referrer : undefined,
        utm_source: params.get('utm_source') || 'site',
        utm_medium: 'internal_cta',
        utm_campaign: 'investir',
        utm_content: 'investir-hero',
        utm_term: 'Investissez à nos côtés',
        cta_id: params.get('cta_id') || 'investir_ecosysteme_hero',
        asset_class: 'retail',
      });
      setSubmitted(true);
      setEmail('Inscription confirmée');
    } catch {}
  };

  return (
    <section className="relative min-h-screen w-full flex justify-center overflow-hidden pt-[56px] xs:pt-[72px] sm:pt-[96px]">
      {/* Bande image centrée avec overlay, côtés blancs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <div className="relative h-full w-full">
          <Image
            src="/images/personnalites/jonathan anguelov haussmannien.jpg"
            alt="Jonathan Anguelov"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 sm:from-black/50 sm:via-black/40 sm:to-black/70" />
        </div>
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-start justify-center min-h-[calc(100vh-56px)] xs:min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)] py-10 sm:py-12 lg:py-14"
        >
          <div className="flex flex-col items-start justify-center flex-1 px-4">
            <h1 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-white text-left max-w-6xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="block mb-2"
              >
                On investit ensemble dans l'immobilier.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-left mt-4 xs:mt-6 font-light tracking-wide whitespace-normal max-w-4xl px-2"
            >
              Rejoignez une communauté d'investisseurs actifs, des événements privés et des sessions de travail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="w-full flex justify-start mt-6 xs:mt-8 sm:mt-10 px-4"
            >
              <form
                className="flex flex-col sm:flex-row w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg bg-white/95 rounded-lg items-center px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2"
                onSubmit={onSubmit}
              >
                <div className="relative w-full sm:flex-1">
                  <span className={`absolute left-2 top-1/2 -translate-y-1/2 ${submitted ? 'text-green-600' : 'text-gray-500'}`}>
                    {submitted ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.5 8.67L12 14.25l10.5-5.58v8.58A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V8.67z"/><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v.036l-10.17 5.405a1.5 1.5 0 0 1-1.66 0L1.5 6.786V6.75z"/></svg>
                    )}
                  </span>
                  <input
                    type="email"
                    id="hero-email"
                    name="hero-email"
                    placeholder="Entrez votre adresse mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={submitted}
                    className={`w-full sm:w-auto flex-1 bg-transparent outline-none placeholder:text-gray-500 pl-9 pr-2 xs:pl-9 py-2 xs:py-2.5 text-xs xs:text-sm ${submitted ? 'text-green-600 font-medium' : 'text-black'}`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-[#F7B096] text-black border border-[#F7B096] rounded-lg font-medium transition hover:bg-[#222222] hover:text-white text-xs xs:text-sm whitespace-nowrap"
                  style={{ borderRadius: '0.5rem' }}
                >
                  Investissez à nos côtés
                </button>
              </form>
            </motion.div>

            <div className="border-t border-white/20 pt-6 sm:pt-8 md:pt-10 mt-10 sm:mt-12 md:mt-14 lg:mt-16 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 xl:gap-24 2xl:gap-28">
                <div className="text-center min-w-[240px] lg:min-w-[280px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">200M€</div>
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">d'actifs pilotés</div>
                </div>
                <div className="text-center min-w-[240px] lg:min-w-[280px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">41+</div>
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">opérations menées</div>
                </div>
                <div className="text-center min-w-[240px] lg:min-w-[280px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">10k m²</div>
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">de surface</div>
                </div>
                <div className="text-center min-w-[240px] lg:min-w-[280px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">15</div>
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">ans d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[55vh]">
          {/* Left: headline + copy + form */}
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="hidden items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
              <span className="text-gray-600 text-sm tracking-[0.15em] uppercase font-medium">
                Notre écosystème
              </span>
            </div>
            <h3 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-white text-center mx-auto max-w-6xl mb-6 md:mb-8">
              On investit ensemble dans l'immobilier.
            </h3>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-center mt-4 xs:mt-6 font-light tracking-wide mx-auto whitespace-normal max-w-4xl px-2 mb-6 md:mb-8">
              Rejoignez une communauté d’investisseurs actifs, des événements privés et des
              sessions de travail pour accélérer votre compréhension et votre réseau.
            </p>
            <form onSubmit={onSubmit} className="mt-4 sm:mt-5 md:mt-6 w-full flex justify-center">
              <div className="flex flex-col sm:flex-row w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg bg-white/95 rounded-lg items-center px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2">
                <div className="relative w-full sm:flex-1">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#F7B096]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="hero-email"
                    name="hero-email"
                    placeholder="Entrez votre adresse mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={submitted}
                    className={`w-full sm:w-auto flex-1 bg-transparent outline-none placeholder:text-gray-500 pl-9 pr-2 xs:pl-9 py-2 xs:py-2.5 text-xs xs:text-sm ${submitted ? 'text-green-600 font-medium' : 'text-black'}`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-[#F7B096] text-black border border-[#F7B096] rounded-lg font-medium transition hover:bg-[#222222] hover:text-white text-xs xs:text-sm whitespace-nowrap"
                  style={{ borderRadius: '0.5rem' }}
                >
                  Investissez à nos côtés
                  <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
            <div className="border-t border-white/20 pt-6 md:pt-8 mt-8 md:mt-10 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 xl:gap-20">
                <div className="text-center min-w-[220px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2">200M€</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">d'actifs pilotés</div>
                </div>
                <div className="text-center min-w-[220px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2">41+</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">opérations menées</div>
                </div>
                <div className="text-center min-w-[220px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2">10k m²</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">de surface</div>
                </div>
                <div className="text-center min-w-[220px]">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2">15</div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">ans d'expérience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column removed (chips) */}
        </div>
      </div>
    </section>
  );
}

export default function BenefitsChipsSection(props: any) {
  return (
    <Suspense>
      <BenefitsChipsSectionInner {...props} />
    </Suspense>
  );
}
