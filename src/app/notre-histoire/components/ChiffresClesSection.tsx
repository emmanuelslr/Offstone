"use client";
import React from "react";
import { motion } from "framer-motion";

type Row = { id: string; label: string; value: string; note?: string; invert?: boolean };

const ROWS: Row[] = [
  { id: "aum", label: "Actifs acquis", value: "200 M€+" },
  { id: "licorne", label: "Cofondateur", value: "Aircall (licorne)" },
  { id: "coinvest", label: "Alignement", value: "Investi à vos côtés", note: "Co‑investissement" },
  { id: "plateforme", label: "Plateforme", value: "Sourcing · Structuration · Suivi" },
];

export default function ChiffresClesSection() {
  return (
    <section className="relative py-14 md:py-20" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="container mx-auto px-6 xs:px-8 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Left narrative */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#96D5F7" }} />
              <span className="text-gray-600 text-xs tracking-[0.18em] uppercase">Chiffres clés</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] font-normal tracking-tight text-[#111] leading-[1.15]">
              Quelques repères.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-xl">
              Des éléments simples qui situent notre trajectoire et notre exigence. Sans démesure, mais sans compromis.
            </p>
            <div className="mt-6">
              <button
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
                      utm_content: 'chiffres-clés',
                      utm_term: 'demander-une-invitation',
                      cta_id: 'notre_histoire_chiffres_cles_demander_invitation',
                      asset_class: 'retail'
                    } as any;
                    (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })(detail);
                  } catch {}
                }}
                className="h-9 inline-flex items-center justify-center bg-[#F7B096] text-black font-normal rounded-full px-4 text-sm shadow-sm border border-[#F7B096] transition hover:bg-transparent hover:text-[#F7B096] hover:border-[#F7B096] group"
                style={{ minHeight: '36px' }}
              >
                Demander une invitation
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-4 h-4 text-black group-hover:text-[#F7B096] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right system list */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#E6E9EF] bg-transparent">
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#E6E9EF] last:border-b-0 transition-colors ${r.invert ? "bg-[#111] text-white" : "hover:bg-[#111]/[0.02]"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${r.invert ? "bg-white/90" : "bg-[#96D5F7]"}`} />
                    <span className={`text-xs sm:text-sm ${r.invert ? "text-white/80" : "text-gray-700"}`}>{r.label}</span>
                  </div>
                  <div className="text-right">
                    <div className={`tabular-nums ${r.invert ? "text-white" : "text-[#111]"} text-base sm:text-lg md:text-xl font-medium`}
                    >
                      {r.value}
                    </div>
                    {r.note && (
                      <div className={`text-[11px] sm:text-xs ${r.invert ? "text-white/80" : "text-gray-500"}`}>{r.note}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 text-[11px] sm:text-xs text-gray-500">Chiffres indicatifs • Actualisés périodiquement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
