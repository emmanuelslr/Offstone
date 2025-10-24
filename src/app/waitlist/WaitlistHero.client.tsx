'use client';

import { motion } from '@/components/shared/OptimizedMotion';

export default function WaitlistHero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Container using requested image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/personnalites/jonathan anguelov haussmannien.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.55) contrast(1.1)',
          }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 xs:from-black/60 xs:via-black/50 xs:to-black/80 sm:from-black/40 sm:via-black/30 sm:to-black/70"
          style={{ mixBlendMode: 'multiply', zIndex: 2 }}
        />
      </div>

  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col items-center text-center py-24 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white/80 backdrop-blur px-3 py-1 text-[11px] tracking-wide uppercase border border-white/15">
            Lancement janvier 2026
          </span>
          <h1 className="mt-4 text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal tracking-tight leading-[1.05] text-white max-w-5xl">
            Quelque chose de grand se prépare.
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 mt-4 xs:mt-6 font-light tracking-wide max-w-3xl">
            Rejoignez la liste d’attente pour être prévenu en premier de ma nouvelle aventure.
          </p>

          {/* Inline fallback form mirrors hero style; opens modal on submit */}
          <div className="mt-7 xs:mt-9 sm:mt-10 w-full max-w-sm sm:max-w-lg">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_25px_80px_-35px_rgba(15,15,20,0.85)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/5 opacity-80" aria-hidden="true" />
              <div className="absolute -top-20 -right-12 h-40 w-40 bg-white/50 blur-3xl opacity-70" aria-hidden="true" />
              <form
                className="relative flex flex-col sm:flex-row w-full gap-2 sm:gap-2 px-3 xs:px-4 sm:px-4 py-3 xs:py-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  try {
                    const form = e.currentTarget as HTMLFormElement;
                    const input = form.querySelector('#waitlist-email') as HTMLInputElement | null;
                    const email = (input?.value || '').trim();
                    if (!email) return;
                    const url = typeof window !== 'undefined' ? window.location.href : undefined;
                    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                    const detail = {
                      email,
                      page_url: url,
                      ref: typeof document !== 'undefined' ? document.referrer : undefined,
                      utm_source: params.get('utm_source') || 'site',
                      utm_medium: params.get('utm_medium') || 'cta',
                      utm_campaign: params.get('utm_campaign') || 'waitlist-launch',
                      utm_content: params.get('utm_content') || 'cta:waitlist-inline',
                      utm_term: params.get('utm_term') || 'waitlist',
                      cta_id: params.get('cta_id') || 'waitlist_inline',
                      asset_class: 'retail',
                    } as const;
                    const w: any = window as any;
                    if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(detail); } else { (w.__offstone_waitlist_queue ||= []).push(detail); w.dispatchEvent(new CustomEvent('waitlist:open', { detail })); }
                  } catch {}
                }}
              >
                <div className="relative w-full sm:flex-1 sm:max-w-md border border-white/50 rounded-xl bg-white/90 shadow-sm">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#F7B096]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.5 8.67L12 14.25l10.5-5.58v8.58A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V8.67z"/><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v.036l-10.17 5.405a1.5 1.5 0 0 1-1.66 0L1.5 6.786V6.75z"/></svg>
                  </span>
                  <input
                    type="email"
                    id="waitlist-email"
                    name="waitlist-email"
                    placeholder="Entrez votre adresse mail"
                    className="w-full bg-transparent outline-none placeholder:text-gray-500 pl-8 pr-2 xs:pl-9 py-2.5 xs:py-3 text-xs xs:text-sm border-0 focus:ring-0 text-black"
                    required
                    autoComplete="email"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-4 xs:px-5 py-2.5 xs:py-3 bg-[#F7B096] text-black border border-[#F7B096] rounded-xl font-medium transition hover:bg-black hover:text-white hover:border-black text-xs xs:text-sm whitespace-nowrap group"
                >
                  Rejoindre la liste d’attente
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth={1.1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" /></svg>
                </button>
              </form>
            </div>
          </div>

          <p className="text-[11px] text-white/70 mt-4 max-w-md">
            Priorité d’accès, pas de spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
