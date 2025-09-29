'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InvestirHero() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden pt-[56px] xs:pt-[72px] sm:pt-[96px]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/Backgrounds/ImageHero.png"
          className="absolute w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.65) contrast(1.1)'
          }}
          onError={(e) => {
            // Fallback vers l'image si la vidéo échoue
            const video = e.target as HTMLVideoElement;
            if (video) {
              video.style.display = 'none';
              const fallback = document.getElementById('investir-video-fallback');
              if (fallback) fallback.style.display = 'block';
            }
          }}
        >
          <source src="/videos/Official Hero Video.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback image */}
        <div
          id="investir-video-fallback"
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/Backgrounds/ImageHero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.65) contrast(1.1)',
            display: 'none'
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-56px)] xs:min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)] flex flex-col justify-center py-8 sm:py-10 lg:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl pt-0"
        >
          {/* Main Title - Aligned Left - Same size as home page */}
          <h1 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-white text-left mb-6 md:mb-8 max-w-6xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="block mb-2"
            >
              Investissez à nos côtés dans<br />
              de l'immobilier professionnel.
            </motion.span>
          </h1>
          
          {/* Subtitle - Same size as home page */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-left mb-7 md:mb-10 font-light tracking-wide max-w-4xl leading-relaxed"
          >
            Une offre réservée à une poignée d'investisseurs
          </motion.p>
          
          {/* Email Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-10 md:mb-14"
          >
            <form
              className="flex flex-col sm:flex-row bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-2 gap-2 sm:gap-0 max-w-lg"
              onSubmit={(e) => {
                e.preventDefault();
                try {
                  const form = e.currentTarget as HTMLFormElement;
                  const input = form.querySelector('#investir-email') as HTMLInputElement | null;
                  const email = (input?.value || '').trim();
                  if (!email) return;
                  const url = typeof window !== 'undefined' ? window.location.href : undefined;
                  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                  (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })({
                    email,
                    page_url: url,
                    ref: typeof document !== 'undefined' ? document.referrer : undefined,
                    utm_source: params.get('utm_source') || 'site',
                    utm_medium: 'internal_cta',
                    utm_campaign: 'investir',
                    utm_content: 'investir-hero',
                    utm_term: 'Investissez à nos côtés',
                    cta_id: params.get('cta_id') || 'investir_hero_investir',
                    asset_class: 'retail'
                  });
                  setSubmitted(true);
                  if (input) { input.value = 'Inscription confirmée'; input.readOnly = true; }
                } catch {}
              }}
            >
              <input
                type="email"
                id="investir-email"
                name="investir-email"
                placeholder="Entrez votre adresse mail"
                className={`w-full bg-transparent outline-none text-black placeholder:text-gray-500 px-4 py-3 sm:py-2 text-base rounded-md sm:rounded-none border-0 focus:ring-0 ${submitted ? 'text-green-600 font-medium' : 'text-black'}`}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 sm:py-2 bg-[#F7B096] text-black border border-[#F7B096] rounded-md font-medium transition hover:bg-[#222222] hover:text-white hover:border-black text-base whitespace-nowrap flex items-center justify-center group"
              >
                Candidatez
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
          
          {/* Key Figures */}
          <div className="border-t border-white/20 pt-6 md:pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 xl:gap-24 2xl:gap-28">
              <div className="text-center min-w-[240px] lg:min-w-[280px]">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
                  200M€
                </div>
                <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">
                  d'actifs pilotés
                </div>
              </div>
              
              <div className="text-center min-w-[240px] lg:min-w-[280px]">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
                  41+
                </div>
                <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">
                  opérations menées
                </div>
              </div>
              
              <div className="text-center min-w-[240px] lg:min-w-[280px]">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
                  10k m²
                </div>
                <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">
                  de surface
                </div>
              </div>
              
              <div className="text-center min-w-[240px] lg:min-w-[280px]">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
                  15
                </div>
                <div className="text-sm md:text-base text-white/70 uppercase tracking-wider leading-tight">
                  ans d'expérience
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

