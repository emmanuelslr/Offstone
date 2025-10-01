'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

export default function Hero() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="Hero relative min-h-screen w-full flex justify-center overflow-hidden z-10">
      {/* Background Container */}
      <div className="absolute inset-0 z-0 w-full h-screen">
        {/* Vidéo avec fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/Backgrounds/ImageHero.webp"
          className="absolute w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.55) contrast(1.1)'
          }}
          onError={(e) => {
            const video = e.target as HTMLVideoElement;
            if (video) {
              video.style.display = 'none';
              const fallback = document.getElementById('video-fallback');
              if (fallback) fallback.style.display = 'block';
            }
          }}
        >
          <source src="/videos/Official Hero Video.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback image */}
        <div
          id="video-fallback"
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/Backgrounds/ImageHero.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.55) contrast(1.1)',
            display: 'none'
          }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 xs:from-black/60 xs:via-black/50 xs:to-black/80 sm:from-black/40 sm:via-black/30 sm:to-black/70"
          style={{ 
            mixBlendMode: 'multiply',
            zIndex: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center min-h-[calc(100vh-140px)] xs:min-h-[calc(100vh-150px)] sm:min-h-[calc(100vh-170px)] mt-16 xs:mt-18 sm:mt-20 lg:mt-24"
        >
          <div className="flex flex-col items-center justify-center flex-1 px-4">
            <h1 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-white text-center mx-auto max-w-6xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="block mb-2"
              >
                On investit ensemble<br />
                dans l&apos;immobilier
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-center mt-4 xs:mt-6 font-light tracking-wide mx-auto whitespace-normal max-w-4xl px-2"
            >
              Nous investissons dans chaque opération que nous structurons.<br className="hidden sm:block"/>
              <span className="sm:hidden"> </span>Accédez-y désormais, à nos côtés.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="w-full flex justify-center mt-6 xs:mt-8 sm:mt-10 px-4"
            >
              <form
                className="flex flex-col sm:flex-row w-full max-w-sm sm:max-w-lg bg-white/95 rounded-lg px-2 xs:px-3 sm:px-3 py-1 xs:py-1.5 sm:py-2 gap-2 sm:gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  try {
                    const form = e.currentTarget as HTMLFormElement;
                    const input = form.querySelector('#hero-email') as HTMLInputElement | null;
                    const email = (input?.value || '').trim();
                    if (!email) return;
                    const url = typeof window !== 'undefined' ? window.location.href : undefined;
                    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                    (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })({
                      email,
                      page_url: url,
                      ref: typeof document !== 'undefined' ? document.referrer : undefined,
                      utm_source: params.get('utm_source') || 'site',
                      utm_medium: params.get('utm_medium') || 'cta',
                      utm_campaign: params.get('utm_campaign') || 'home-page',
                      utm_content: params.get('utm_content') || 'cta:home-hero',
                      utm_term: params.get('utm_term') || 'investir',
                      cta_id: params.get('cta_id') || 'home_hero_investir',
                      asset_class: 'retail'
                    });
                    setSubmitted(true);
                    if (input) { input.value = 'Inscription confirmée'; input.readOnly = true; }
                  } catch {}
                }}
              >
                <div className="relative w-full sm:flex-1 sm:max-w-md border border-gray-300 rounded-lg bg-white shadow-sm">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2">
                    {submitted ? (
                      <svg className="text-green-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    ) : (
                      <svg className="text-[#F7B096]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.5 8.67L12 14.25l10.5-5.58v8.58A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V8.67z"/><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v.036l-10.17 5.405a1.5 1.5 0 0 1-1.66 0L1.5 6.786V6.75z"/></svg>
                    )}
                  </span>
                  <input
                    type="email"
                    id="hero-email"
                    name="hero-email"
                    placeholder="Entrez votre adresse mail"
                    className={`w-full bg-transparent outline-none placeholder:text-gray-500 pl-8 pr-2 xs:pl-9 py-2.5 xs:py-3 text-xs xs:text-sm border-0 focus:ring-0 ${submitted ? 'text-green-600 font-medium' : 'text-black'}`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-4 xs:px-5 py-2.5 xs:py-3 bg-black text-white border border-black rounded-lg font-medium transition hover:bg-white hover:text-black text-xs xs:text-sm whitespace-nowrap group"
                >
                  Investissez à nos côtés
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.1}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



