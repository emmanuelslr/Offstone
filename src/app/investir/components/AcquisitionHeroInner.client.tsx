"use client";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function AcquisitionHeroInner(props: any) {
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const value = (email || "").trim();
      if (!value) return;
      const url = typeof window !== "undefined" ? window.location.href : undefined;
      const entries = searchParams ? Array.from(searchParams.entries()) : [];
      const params = new URLSearchParams(entries);
      (function (d) {
        if (typeof window !== "undefined") {
          try {
            const w: any = window as any;
            if (w.offstoneOpenWaitlist) {
              w.offstoneOpenWaitlist(d);
            } else {
              (w.__offstone_waitlist_queue ||= []).push(d);
              w.dispatchEvent(new CustomEvent("waitlist:open", { detail: d }));
            }
          } catch {}
        }
      })({
        email: value,
        page_url: url,
        ref: typeof document !== "undefined" ? document.referrer : undefined,
        utm_source: params.get("utm_source") || "site",
        utm_medium: "internal_cta",
        utm_campaign: "investir",
        utm_content: "si-le-comité-valide",
        utm_term: "M'inscrire à la liste d'attente",
        cta_id: params.get("cta_id") || "investir_acquisition_hero",
        asset_class: "retail",
      });
      setEmail("");
    } catch {}
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Portrait simple, discret (zoom léger) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-5 sm:mb-6"
          >
            <div className="absolute inset-0 blur-2xl rounded-full bg-black/5 scale-110" aria-hidden />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-1 ring-black/5 shadow-sm">
              <Image
                src="/images/personnalites/JoPublic.webp"
                alt="Jonathan Anguelov"
                fill
                sizes="128px"
                className="object-cover scale-[1.15]"
                style={{ transform: 'rotate(90deg)' }}
                priority
              />
            </div>
          </motion.div>

          {/* Titre pur */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-black leading-tight"
          >
            Si le comité valide votre candidature,
            <br className="hidden sm:block" /> vous devenez membre du Club.
          </motion.h2>

          {/* Formulaire inline (ouvre le modal) */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 w-full max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#F7B096]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  aria-label="Votre adresse mail"
                  placeholder="Votre adresse mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[48px] sm:h-[52px] pl-10 pr-4 rounded-full border border-black/10 bg-white text-black placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center h-[48px] sm:h-[52px] px-5 sm:px-6 rounded-full text-[14px] sm:text-[15px] font-medium bg-black text-white border border-black hover:bg-gray-800 transition-all shadow-sm hover:shadow-lg"
              >
                M'inscrire à la liste d'attente
                <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}