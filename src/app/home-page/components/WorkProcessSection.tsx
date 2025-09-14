"use client";

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Step = {
  number: string;
  title: string;
  description: string;
};

function StepItem({
  step,
  index,
  isActive,
  onEnter,
}: {
  step: Step;
  index: number;
  isActive: boolean;
  onEnter: (idx: number) => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null); 
  const inView = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div
        className="border border-gray-200 rounded-lg px-5 py-6 xs:px-6 xs:py-7 sm:px-8 sm:py-8 md:px-10 md:py-10"
        style={{ backgroundColor: '#EFEAE7' }}
      >
        <div className="flex items-start gap-4 xs:gap-6 sm:gap-8">
          <span
            className={`text-4xl xs:text-5xl sm:text-6xl font-light leading-none ${
              isActive ? 'text-[#F7B096]' : 'text-black'
            }`}
          >
            {step.number}
          </span>
          <div className="flex-1 space-y-2 xs:space-y-3 sm:space-y-4">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-medium text-black leading-tight">
              {step.title}
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
        <div
          className={`mt-5 h-px ${isActive ? 'bg-[#F7B096]' : 'bg-gray-200'}`}
          aria-hidden="true"
        />
      </div>
    </motion.li>
  );
}

function WorkProcessSectionInner(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const steps: Step[] = [
    {
      number: '01',
      title: 'Candidature en ligne',
      description:
        "Formulaire rapide pour comprendre votre situation patrimoniale, vos objectifs et votre horizon d'investissement.",
    },
    {
      number: '02',
      title: 'Entretien téléphonique de qualification',
      description:
        "Échange confidentiel afin d'aligner vision, tolérance au risque, attentes de création de valeur et temporalité.",
    },
    {
      number: '03',
      title: 'Examen de la candidature',
      description:
        'Diligences réglementaires (KYC / vérifications légères) réalisées avec exigence mais sans lourdeur.',
    },
    {
      number: '04',
      title: 'Adhésion & espace privé',
      description:
        'Accès à votre espace investisseur : documentation, opérations à venir, historique et modalités d’allocation.',
    },
    {
      number: '05',
      title: 'Allocation & suivi',
      description:
        'Sélection des opportunités pertinentes, souscription digitale guidée puis reporting clair des opérations.',
    },
  ];

  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: '#F7F5F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left Side - Content */}
          <div className="w-full flex flex-col justify-center lg:pr-12 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
                <span className="text-gray-600 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium">
                  Processus d'investissement
                </span>
              </div>
              <h2 className="text-4xl xs:text-5xl md:text-6xl font-normal text-black leading-[1.1]">
                Comment
                <br />
                candidater ?
              </h2>
              <p className="text-base xs:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Rejoignez un cercle restreint d'investisseurs
                <br />
                et accédez à des opportunités immobilières
                <br />
                exclusives aux côtés de Jonathan Anguelov.
              </p>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  try {
                    const url = typeof window !== 'undefined' ? window.location.href : undefined;
                    const params =
                      typeof window !== 'undefined'
                        ? new URLSearchParams(window.location.search)
                        : new URLSearchParams();
                    const detail = {
                      page_url: url,
                      ref: typeof document !== 'undefined' ? document.referrer : undefined,
                      utm_source: 'internal_cta',
                      utm_medium: params.get('utm_medium') || 'cta',
                      utm_campaign: 'home-page',
                      utm_content: 'section_investissons-ensemble',
                      utm_term: 'commencer-ma-candidature',
                      cta_id: params.get('cta_id') || 'home_processus_candidature',
                      asset_class: 'retail',
                    } as any;
                    (function (d) {
                      if (typeof window !== 'undefined') {
                        try {
                          const w: any = window as any;
                          if (w.offstoneOpenWaitlist) {
                            w.offstoneOpenWaitlist(d);
                          } else {
                            (w.__offstone_waitlist_queue ||= []).push(d);
                            w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d }));
                          }
                        } catch (e) {}
                      }
                    })(detail);
                  } catch {}
                }}
                className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-[#F7B096] hover:text-black hover:border-[#F7B096] border border-transparent transition-all duration-300 shadow-sm hover:shadow-lg text-base inline-flex items-center justify-center group"
              >
                Commencer ma candidature
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
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="w-full">
            <ol className="space-y-4 sm:space-y-6">
              {steps.map((step, index) => (
                <StepItem
                  key={step.number}
                  step={step}
                  index={index}
                  isActive={activeIndex === index}
                  onEnter={setActiveIndex}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorkProcessSection(props: any) {
  return (
    <Suspense>
      <WorkProcessSectionInner {...props} />
    </Suspense>
  );
}
