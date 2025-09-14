"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CoInvestCTA() {
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
        utm_medium: params.get("utm_medium") || "cta",
        utm_campaign: params.get("utm_campaign") || "article-cta",
        utm_content: params.get("utm_content") || "cta:article-club-membership",
        utm_term: params.get("utm_term") || "membre-club",
        cta_id: params.get("cta_id") || "article_club_membership",
        asset_class: "retail",
      });
      setEmail("");
    } catch {}
  };

  return (
    <div className="my-12 p-8 bg-white rounded-xl border border-gray-100">
      <div className="text-center max-w-2xl mx-auto">
        {/* Portrait */}
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-2xl rounded-full bg-black/5 scale-110" aria-hidden />
          <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden ring-1 ring-black/5 shadow-sm">
            <Image
              src="/images/personnalites/JoPublic.JPG"
              alt="Jonathan Anguelov"
              fill
              sizes="80px"
              className="object-cover scale-[1.15]"
            />
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
          Si le comité valide votre candidature,
          <br />vous devenez membre du Club.
        </h3>

        {/* Formulaire */}
        <form onSubmit={onSubmit} className="mt-6 w-full max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
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
                className="w-full h-12 pl-10 pr-4 rounded-full border border-black/10 bg-white text-black placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 px-6 sm:px-8 rounded-full text-sm font-medium bg-black text-white border border-black hover:bg-gray-800 transition-all shadow-sm hover:shadow-lg whitespace-nowrap"
            >
              M'inscrire à la liste d'attente
              <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
