import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";

export const metadata: Metadata = {
  title: "FAQ — Offstone",
  description:
    "Les réponses à toutes vos questions : investir avec Offstone, actifs & performances, réglementation & fiscalité, structuration & opérations.",
  openGraph: {
    title: "FAQ — Offstone",
    description:
      "Les réponses à toutes vos questions : investir avec Offstone, actifs & performances, réglementation & fiscalité, structuration & opérations.",
    type: "article",
    url: "/faq",
  },
  alternates: { canonical: "/faq" },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary",
    title: "FAQ — Offstone",
    description:
      "Investir avec Offstone, actifs & performances, réglementation & fiscalité, structuration & opérations.",
  },
};

type QA = { q: string; a: string };
type Section = { id: string; title: string; items: QA[] };

const sections: Section[] = [
  {
    id: "investir-avec-offstone",
    title: "Investir avec Offstone",
    items: [
      {
        q: "Qu’est-ce qu’Offstone ?",
        a:
          "Plateforme de co-investissement immobilier portée par Jonathan Anguelov : nous sélectionnons, structurons et co-investissons dans chaque opération.",
      },
      {
        q: "Qui peut investir et quel est le ticket d’entrée ?",
        a:
          "Investisseurs professionnels et particuliers (avertis ou non, selon l’opération) via personne physique ou société/holding. Ticket indicatif : ≥ 20 k€, précisé dossier par dossier, sous réserve d’éligibilité (KYC/KYB, adéquation, capacités financières).",
      },
      {
        q: "En quoi Offstone diffère du crowdfunding ?",
        a:
          "Nous ne faisons pas de financement participatif. Opérations privées (club deals/co-investissement) via PSI en RTO, réservées à des investisseurs éligibles.",
      },
      {
        q: "Quel est le processus pour investir ?",
        a: "Candidature → évaluation KYC/KYB → entretien → accès data-rooms → souscription électronique → closing.",
      },
      {
        q: "Puis-je investir via ma société/holding ?",
        a: "Oui (SAS, SARL, SCI, holding IS). PEA/assurance-vie : en général non éligibles.",
      },
      {
        q: "Y a-t-il des appels de fonds échelonnés ?",
        a:
          "Selon le dossier : 100 % au closing ou appels par tranches (acquisition, CAPEX). Calendrier indiqué dans la documentation.",
      },
      {
        q: "Comment sont conservés les fonds et les titres ?",
        a:
          "Fonds ségrégués via le PSI ; titres au porteur nominatif ou chez le teneur de registre désigné.",
      },
      {
        q: "Quels sont les frais ?",
        a:
          "Transparents et détaillés par dossier. Frais d’adhésion à l’accès plateforme : 1 200 € TTC. Selon les opérations : frais de structuration, frais de gestion/asset management, frais de transaction, éventuel promote conditionné à la performance. Aucun frais caché.",
      },
      {
        q: "Délais de traitement d’une candidature ?",
        a:
          "Délais variables, dépendants de la liste d’attente et de la complétude KYC/KYB. Nous ne nous engageons pas sur un délai ferme.",
      },
    ],
  },
  {
    id: "actifs-performances",
    title: "Actifs & performances",
    items: [
      {
        q: "Quels types d’actifs ciblez-vous ?",
        a:
          "Résidentiel à repositionner, hôtels sélectionnés, logistique urbaine, bureaux à potentiel (approche sélective en France, Europe opportuniste).",
      },
      {
        q: "Quels rendements viser et quelle durée ?",
        a:
          "Objectifs indicatifs (non garantis) : TRI net 8–12 % ; durée 4–6 ans selon l’actif et le plan de valeur.",
      },
      {
        q: "Quelle liquidité avant la sortie ?",
        a:
          "Limitée. Cession de gré à gré parfois possible (agrément/préemption), sans garantie de contrepartie ni de prix. Pas de marché secondaire assuré.",
      },
      {
        q: "Y a-t-il des distributions courantes ?",
        a:
          "Quand pertinent : objectif 2–4 %/an, versement trimestriel ou semestriel ; dépend du cash-flow. Non garanti.",
      },
      {
        q: "Utilisez-vous l’effet de levier ?",
        a: "Oui, de façon mesurée au niveau actif/véhicule ; le levier amplifie gains et pertes.",
      },
    ],
  },
  {
    id: "reglementation-fiscalite",
    title: "Réglementation & fiscalité",
    items: [
      {
        q: "Quel est votre statut réglementaire ?",
        a:
          "Offstone agit en qualité d’agent lié pour la réception-transmission d’ordres (RTO) et la commercialisation au nom de Tylia, entreprise d’investissement (PSI) agréée par l’ACPR — Autorité de contrôle prudentiel et de résolution. Les services d’investissement sont fournis par Tylia ; Offstone opère sous sa responsabilité pour les activités déléguées.",
      },
      { q: "Pourquoi un KYC/KYB est-il requis ?", a: "Conformité LCB-FT et connaissance client/bénéficiaire effectif (réglementations UE/FR)." },
      {
        q: "Qui est éligible (catégorisation client) ?",
        a:
          "Clients professionnels et non professionnels (particuliers), avertis ou non selon l’opération, sous réserve d’adéquation : situation, objectifs, connaissances/expérience, capacité financière.",
      },
      {
        q: "Y a-t-il des avantages fiscaux ?",
        a:
          "Dépend de votre situation (IR/IS, nature des titres/flux). Au cas par cas : la majorité des opérations sont structurées pour être éligibles au dispositif 150-0-B ter (apport-cession) et hors assiette IFI ; cela dépend de la structuration juridique et de votre cas personnel. Nous ne fournissons pas de conseil fiscal personnalisé — rapprochez-vous de votre conseil.",
      },
      { q: "Non-résidents / US persons ?", a: "Au cas par cas, selon KYC/LCB-FT, contraintes fiscales et structuration des véhicules." },
    ],
  },
  {
    id: "structuration-operations",
    title: "Structuration & opérations",
    items: [
      {
        q: "Comment sélectionnez-vous les opportunités ?",
        a:
          "Sourcing direct/off-market → underwriting chiffré (scénarios, stress tests) → comité d’investissement → entrée uniquement si marge de sécurité documentée.",
      },
      {
        q: "Quel véhicule d’investissement est utilisé ?",
        a:
          "Un SPV dédié par opération (statuts + pacte). Il détient l’actif/participation et organise la gouvernance.",
      },
      {
        q: "Quels sont mes droits en tant qu’investisseur ?",
        a:
          "Droits économiques et d’information définis par le pacte (reporting, décisions majeures, clauses d’agrément/préemption).",
      },
      {
        q: "Comment fonctionne la distribution (“waterfall”) ?",
        a:
          "Priorités contractuelles : remboursement du capital, rémunération préférentielle si prévue, puis partage des surperformances incluant éventuellement un promote.",
      },
      {
        q: "Quels documents fournis avant d’investir ?",
        a:
          "Teaser/factsheet, Investment Memo, data-room (audits, baux, CAPEX, modélisation), documentation juridique et calendrier.",
      },
      {
        q: "Quel reporting après investissement ?",
        a:
          "Trimestriel (avancement, KPIs locatifs/chantier, budget vs réalisé), lettres d’information et assemblées si prévu.",
      },
      {
        q: "Que se passe-t-il si la collecte n’aboutit pas ?",
        a:
          "Le dossier est annulé ; les fonds (le cas échéant) sont restitués selon les modalités contractuelles.",
      },
      {
        q: "Et en cas de sursouscription ?",
        a:
          "Allocations proratisées ou priorité selon critères annoncés (ex. historique, rapidité, tickets cibles).",
      },
      {
        q: "Quels sont les principaux risques ?",
        a:
          "Perte en capital, illiquidité, risques de marché, exécution (planning/CAPEX), juridique/fiscal, locatif, et levier. Les performances passées ne préjugent pas des performances futures.",
      },
    ],
  },
];

function FAQJsonLd() {
  const mainEntity = sections.flatMap((s) =>
    s.items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    }))
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(0,0,0,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative isolate rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md">
          <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(to_bottom,black,transparent)] bg-gradient-to-b from-black/[0.03] to-transparent" />
          <div className="relative px-6 sm:px-10 py-14 sm:py-18">
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold leading-[1.1] text-black">
              Les réponses à toutes vos questions
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-7 text-black/70">
              Un centre de ressources clair et structuré pour comprendre notre plateforme, nos opérations et votre parcours d’investissement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TOC() {
  return (
    <nav aria-label="Sommaire" className="hidden lg:block">
      <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur-md p-4">
        <p className="text-xs uppercase tracking-wide text-black/50 mb-2">Sommaire</p>
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="block text-sm text-black/80 hover:text-black">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function SectionBlock({ section, index }: { section: Section; index: number }) {
  const dotClass = index % 2 === 0 ? 'bg-[#F7B096]' : 'bg-black';
  return (
    <section id={section.id} className="scroll-mt-28">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-6 flex items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotClass}`} />
        {section.title}
      </h2>
      <div className="divide-y divide-black/10 rounded-xl border border-black/10 bg-white/70 backdrop-blur-md">
        {section.items.map((item, idx) => (
          <details key={idx} className="group">
            <summary className="list-none cursor-pointer select-none px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 hover:bg-[#F7B096]/5">
              <h3 className="text-[15px] sm:text-[16px] leading-6 font-medium text-black/90">
                {item.q}
              </h3>
              <span
                aria-hidden
                className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-black/15 text-black/60 transition-all group-open:rotate-45 group-open:bg-[#F7B096]/15"
                title="Ouvrir / Fermer"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[14px] sm:text-[15px] leading-7 text-black/75">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <main className="scroll-smooth pt-20 sm:pt-24">
      <Navbar forceWhiteStyle={true} />
      <Hero />
      <FAQJsonLd />
      {/* Bind click on elements with data-open-waitlist to open the modal */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => {
            function openWaitlist(ctaId){
              try {
                const w = window;
                let detail = {
                  utm_source: 'site',
                  utm_medium: 'internal_cta',
                  utm_campaign: 'faq',
                  cta_id: ctaId,
                  asset_class: 'retail'
                };
                
                // Set specific utm_content and utm_term based on cta_id
                if (ctaId === 'faq_cta_mobile' || ctaId === 'faq_cta_side') {
                  detail.utm_content = 'plus-de-questions';
                  detail.utm_term = 'prendre-rendez-vous';
                } else if (ctaId === 'faq_cta_bottom') {
                  detail.utm_content = 'encore-une-question';
                  detail.utm_term = 'prendre-rendez-vous';
                }
                
                if (w.offstoneOpenWaitlist) {
                  w.offstoneOpenWaitlist(detail);
                } else {
                  (w.__offstone_waitlist_queue ||= []).push(detail);
                  w.dispatchEvent(new CustomEvent('waitlist:open', { detail }));
                }
              } catch(e) {}
            }
            document.addEventListener('click', function(ev){
              let node = ev.target;
              while (node && node !== document) {
                if (node.getAttribute && node.hasAttribute('data-open-waitlist')) {
                  ev.preventDefault();
                  const id = node.getAttribute('data-cta-id') || 'faq_rendez_vous';
                  openWaitlist(id);
                  break;
                }
                node = node.parentNode;
              }
            }, { passive: false });
          })();`,
        }}
      />

      {/* TOC (mobile) */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 lg:hidden -mt-6">
        <div className="mb-8 rounded-xl border border-black/10 bg-white/70 backdrop-blur-md p-4">
          <p className="text-xs uppercase tracking-wide text-black/50 mb-2">Sommaire</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/80 hover:text-black hover:bg-black/[0.03]"
              >
                {s.title}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-black/60">Plus de questions ?</span>
            <a
              href="/rendez-vous"
              data-open-waitlist
              data-cta-id="faq_cta_mobile"
              className="inline-flex items-center justify-center rounded-full border border-[#F7B096] bg-[#F7B096] px-3 py-1.5 text-xs font-medium text-black hover:shadow-md hover:shadow-[#F7B096]/30 transition"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8 lg:gap-12">
          <div className="space-y-4">
            <TOC />
            <div className="hidden lg:block sticky top-32">
              <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur-md p-4">
                <p className="text-xs text-black/60">Plus de questions ?</p>
                <a
                  href="#"
                  data-open-waitlist
                  data-cta-id="faq_cta_side"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#F7B096] bg-[#F7B096] px-3 py-2 text-[13px] font-medium text-black hover:shadow-md hover:shadow-[#F7B096]/30 transition"
                >
                  Prendre rendez-vous
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-12">
            {sections.map((s, idx) => (
              <SectionBlock key={s.id} section={s} index={idx} />
            ))}
            {/* Closing CTA */}
            <section className="mt-6">
              <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md px-6 sm:px-8 py-8">
                <h2 className="text-lg sm:text-xl font-semibold text-black">Encore une question ?</h2>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-7 text-black/70 max-w-2xl">
                  Si vous n’avez pas trouvé la réponse, parlons-en. Notre équipe peut étudier votre situation et vous orienter vers la bonne opération.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="#"
                    data-open-waitlist
                    data-cta-id="faq_cta_bottom"
                    className="inline-flex items-center justify-center rounded-full border border-black bg-black px-4 py-2.5 text-[13px] font-medium text-white hover:bg-white hover:text-black transition"
                  >
                    Prendre rendez-vous
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                  <a href="/candidatez" className="inline-flex items-center justify-center rounded-full border border-black px-4 py-2.5 text-[13px] font-medium text-black hover:bg-black hover:text-white transition">Candidatez</a>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </div>
      <ProCTAFooter utm_campaign="faq" />
    </main>
  );
}
