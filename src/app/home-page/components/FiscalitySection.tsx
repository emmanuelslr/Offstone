"use client";

import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";

type Highlight = {
  id: string;
  metric: string;
  title: string;
  description: string;
  noteId?: number;
};

const highlights: Highlight[] = [
  {
    id: "150bter",
    metric: "150-0 B ter",
    title: "Report d'imposition",
    description:
      "Le reinvestissement d'une plus-value dans un club deal eligible permet de beneficier du remploi prevu par l'article 150-0 B ter.",
    noteId: 1,
  },
  {
    id: "ifi",
    metric: "IFI",
    title: "Exonere d'IFI",
    description:
      "Nos club deals peuvent etre structures pour rester hors assiette IFI selon la configuration retenue par l'investisseur.",
    noteId: 2,
  },
  {
    id: "mere-fille",
    metric: "Regime mere-fille",
    title: "Holding IS des 5 %",
    description:
      "En investissant au moins 5 % du montant leve via votre holding soumise a l'IS, vous beneficiez du regime mere-fille (quote-part 5 %).",
    noteId: 3,
  },
];

const notes = [
  {
    id: 1,
    text:
      "Nos club deals eligibles au 150-0 B ter permettent de reporter l'impot sur la plus-value reinvestie.",
  },
  {
    id: 2,
    text:
      "L'impact IFI doit etre apprecie au cas par cas avec vos conseils : certaines structurations d'achat-revente peuvent permettre une exclusion de l'assiette.",
  },
  {
    id: 3,
    text:
      "Regime mere-fille : seule la quote-part de 5 % reste imposable si votre holding detient au moins 5 % des titres pendant 2 ans.",
  },
];

function openWaitlist(detail: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const w: any = window as any;
    if (w.offstoneOpenWaitlist) {
      w.offstoneOpenWaitlist(detail);
    } else {
      (w.__offstone_waitlist_queue ||= []).push(detail);
      w.dispatchEvent(new CustomEvent("waitlist:open", { detail }));
    }
  } catch (error) {}
}

export default function FiscalitySection() {
  return (
    <section className="w-full bg-[#F6F8FB] py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <SectionBadge text="FISCALITE" colorClass="text-gray-600 text-[10px] sm:text-xs tracking-[0.18em]" />
            <div className="mt-8 flex flex-col gap-7 md:gap-8 lg:gap-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-[#0E1116] leading-tight">
                Optimisez votre fiscalite immobiliere grace a Offstone
              </h2>
              <p className="text-sm sm:text-base text-[#3F4450] leading-relaxed max-w-md">
                <span className="block">Nos club deals concilient rendement</span>
                <span className="block">immobilier et dispositifs fiscaux</span>
                <span className="block">adaptes pour structurer</span>
                <span className="block">votre patrimoine.</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  try {
                    const url = typeof window !== "undefined" ? window.location.href : undefined;
                    const params =
                      typeof window !== "undefined"
                        ? new URLSearchParams(window.location.search)
                        : new URLSearchParams();
                    const detail = {
                      page_url: url,
                      ref: typeof document !== "undefined" ? document.referrer : undefined,
                      utm_source: params.get("utm_source") || "internal_cta",
                      utm_medium: params.get("utm_medium") || "cta",
                      utm_campaign: params.get("utm_campaign") || "home-page",
                      utm_content: "section_fiscalite",
                      utm_term: "fiscalite_club_deals",
                      cta_id: params.get("cta_id") || "home_fiscalite_candidatez",
                      asset_class: "retail",
                    };
                    openWaitlist(detail);
                  } catch (error) {}
                }}
                className="inline-flex w-fit self-start items-center justify-center px-5 py-2.5 text-sm font-medium text-black bg-[#F7B096] border border-[#F7B096] rounded-full transition hover:bg-black hover:border-black hover:text-white"
              >
                Candidatez
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.3}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 lg:max-w-[520px] lg:ml-auto grid gap-4 sm:gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-white border border-white shadow-[0_15px_45px_rgba(12,17,29,0.05)] px-6 py-6 sm:px-7 sm:py-7"
              >
                <div className="text-sm font-medium tracking-[0.08em] text-[#7A8190] uppercase">
                  {item.metric}
                </div>
                <div className="mt-2 text-xl sm:text-2xl font-medium text-[#111519]">
                  {item.title}
                </div>
                <p className="mt-3 text-sm sm:text-base text-[#3F4450] leading-relaxed">
                  {item.description}
                  {typeof item.noteId === "number" && (
                    <span className="ml-1 text-xs text-[#7A8190] align-super">({item.noteId})</span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-[#D9DEE7] pt-6 space-y-3">
          {notes.map((note) => (
            <p key={note.id} className="text-xs text-[#7A8190] leading-relaxed">
              ({note.id}) {note.text}
            </p>
          ))}
          <p className="text-xs text-[#7A8190] leading-relaxed italic">
            Les informations ci-dessus sont fournies a titre indicatif et ne constituent pas un conseil fiscal ou juridique personnalise.
          </p>
        </div>
      </div>
    </section>
  );
}

