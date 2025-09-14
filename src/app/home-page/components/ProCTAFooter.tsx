'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProCTAFooter({ 
  disableAnimation = false, 
  utm_campaign 
}: { 
  disableAnimation?: boolean;
  utm_campaign?: string;
}) {
  const [submitted, setSubmitted] = useState(false);


  return (
  <section id="pro-cta-footer" className="w-full py-16 md:py-20 lg:py-24 xl:py-32" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          whileInView={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={disableAnimation ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-lg lg:rounded-xl bg-black overflow-hidden min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[480px] xl:min-h-[520px]"
        >
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 z-10">
            <motion.div
              initial={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={disableAnimation ? { duration: 0 } : { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <motion.h2
                initial={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={disableAnimation ? { duration: 0 } : { duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tighter leading-tight text-white mb-8 md:mb-10 lg:mb-12"
              >
                Accédez à l'immobilier professionnel avec Offstone.
              </motion.h2>
              <motion.div
                initial={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={disableAnimation ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={disableAnimation ? { duration: 0 } : { duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg"
              >
                <form
                  className="flex flex-col sm:flex-row bg-white/95 rounded-lg px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2 gap-2 sm:gap-0"
                  onSubmit={(e) => {
                    e.preventDefault();
                    try {
                      const form = e.currentTarget as HTMLFormElement;
                      const input = form.querySelector('#pro-cta-email') as HTMLInputElement | null;
                      const email = (input?.value || '').trim();
                      if (!email) return;
                      const url = typeof window !== 'undefined' ? window.location.href : undefined;
                      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                      (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })({
                        email,
                        page_url: url,
                        ref: typeof document !== 'undefined' ? document.referrer : undefined,
                        utm_source: params.get('utm_source') || undefined,
                        utm_medium: 'internal_cta',
                        utm_campaign: utm_campaign || params.get('utm_campaign') || 'home-page',
                        utm_content: 'ProCTAFooter',
                        utm_term: 'candidatez',
                        cta_id: params.get('cta_id') || 'pro_cta_footer',
                        asset_class: 'retail'
                      });
                      setSubmitted(true);
                      if (input) { input.value = 'Inscription confirmée'; input.readOnly = true; }
                    } catch {}
                  }}
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
                      id="pro-cta-email"
                      name="pro-cta-email"
                      placeholder="Entrez votre adresse mail"
                      className={`w-full sm:w-auto flex-1 bg-transparent outline-none placeholder:text-gray-500 pl-8 pr-2 xs:pl-9 py-2 xs:py-2.5 text-xs xs:text-sm border-0 focus:ring-0 ${submitted ? 'text-green-600 font-medium' : 'text-black'}`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-[#F7B096] text-black border border-[#F7B096] rounded-lg font-medium transition hover:bg-[#222222] hover:text-white text-xs xs:text-sm whitespace-nowrap group"
                    style={{ borderRadius: '0.5rem' }}
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
            </motion.div>
          </div>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/Backgrounds/ImageHero.png)', filter: 'brightness(0.55) contrast(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
