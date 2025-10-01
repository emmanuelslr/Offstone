"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroHistoire() {
  const [titleVisible, setTitleVisible] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-[110px] pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-6 xs:px-8 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Colonne gauche — Texte (style sobre, Palantir-like) */}
          <motion.div
            className="lg:w-1/2 lg:pr-12 lg:mb-0 mt-10 sm:mt-16 lg:mt-28 xl:mt-36"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <div className="mb-5">
              <div className="flex items-center mb-1 pl-[2px] mt-[-30px]">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
                <span className="text-gray-600 text-xs tracking-[0.18em] ml-[6px] font-medium uppercase">UNE TRAJECTOIRE D’ENTREPRENEUR</span>
              </div>
            </div>

            <h2
              className={`text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-8 transition-all duration-[1200ms] ease-out ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              De Aircall à Offstone.
            </h2>

<p className="text-[15px] md:text-[17px] text-gray-600 mb-8 max-w-xl mt-16">
  Construire un patrimoine immobilier professionnel.<br />
  Ouvrir l’accès à une communauté<br />
  d’investisseurs exigeants.
</p>

            {/* Metrics */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 min-h-[100px] flex flex-col justify-center">
                <div className="text-[20px] sm:text-[24px] lg:text-[26px] leading-tight tracking-tight text-black font-semibold">200 M€+</div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">d'actifs acquis</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 min-h-[100px] flex flex-col justify-center">
                <div className="text-[16px] sm:text-[18px] lg:text-[20px] leading-tight tracking-tight text-black font-semibold">Cofondateur d'une licorne</div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">Aircall</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 min-h-[100px] flex flex-col justify-center sm:col-span-2 lg:col-span-1">
                <div className="text-[16px] sm:text-[18px] lg:text-[20px] leading-tight tracking-tight text-black font-semibold">Investi à vos côtés</div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">Co‑investissement</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <button
                className="h-11 w-full sm:w-auto inline-flex items-center justify-center bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black group"
                style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
                type="button"
                onClick={() => {
                  try {
                    const url = typeof window !== 'undefined' ? window.location.href : undefined;
                    const detail = {
                      page_url: url,
                      ref: typeof document !== 'undefined' ? document.referrer : undefined,
                      utm_source: 'site',
                      utm_medium: 'internal_cta',
                      utm_campaign: 'notre-histoire',
                      utm_content: 'notre-histoire-hero',
                      utm_term: 'parler-a-un-expert',
                      cta_id: 'notre_histoire_hero_parler_expert',
                      asset_class: 'retail'
                    } as any;
                    (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })(detail);
                  } catch {}
                }}
              >
                Parler à un expert
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-5 h-5 text-white group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17M7 7h10v10" />
                </svg>
              </button>
<a
  href="/pourquoi-offstone"
  className="h-11 w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-black hover:text-white whitespace-nowrap"
>
  Pourquoi Offstone ?
</a>
            </div>
          </motion.div>

          {/* Colonne droite — Image */}
          <motion.div
            className="lg:w-1/2 lg:pl-12 flex justify-center mt-10 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex justify-center w-full">
              <img
                src="/images/notre-histoire/67a23312a3751_IMG_0965.webp"
                alt="Jonathan Anguelov"
                className="w-full max-w-[760px] sm:max-w-[780px] md:max-w-[800px] h-[420px] sm:h-[520px] md:h-[640px] rounded-xl md:rounded-2xl shadow-lg object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
