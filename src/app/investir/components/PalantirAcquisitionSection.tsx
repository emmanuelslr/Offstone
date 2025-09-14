
'use client';





import React, { useRef, useEffect, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Sourcing off‑market',
    description: 'Sourcing via notre réseau (notaires, marchands, family offices) pour capter des dossiers qualifiés.'
  },
  {
    number: '02',
    title: 'Comité d’investissement',
    description: 'Analyse rendement/risques, scénarios et sorties. Chaque deal passe un filtre chiffré et documenté.'
  },
  {
    number: '03',
    title: 'Sélection finale Offstone',
    description: 'Pilotage par Jonathan Anguelov : gouvernance, alignement des intérêts et exigence d’exécution.'
  },
  {
    number: '04',
    title: 'Vous investissez, on gère',
    description: 'Candidature simple. Suivi en ligne. Reporting clair. Offstone pilote jusqu’à la sortie.'
  },
];

export default function PalantirAcquisitionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let found = 0;
      stepRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) {
            found = idx;
          }
        }
      });
      setActiveStep(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#F3F4F6' }}>
  <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="mb-12 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#96D5F7' }} />
            <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">PROCESSUS D'ACQUISITION</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-[#111]">Notre méthode d'acquisition</h2>
        </div>
        <div className="relative flex flex-col items-start pl-6 sm:pl-10">
          {/* Ligne verticale */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" style={{ zIndex: 0 }} />
          <div className="w-full flex flex-col gap-10 z-10">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                ref={el => { stepRefs.current[idx] = el; }}
                className="relative flex flex-row items-center w-full"
              >
                {/* Pastille numérotée animée alignée sur la ligne avec padding */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)', transition: 'border-color 0.3s' }}>
                  <span
                    className={`text-[28px] font-medium ${activeStep === idx ? (idx % 2 === 0 ? 'text-[#F7B096]' : 'text-black') : 'text-gray-400'}`}
                    style={{
                      fontFamily: 'AllianceNo1-Regular,sans-serif',
                      letterSpacing: '0.01em',
                      transition: 'color 0.3s, transform 0.3s, opacity 0.3s',
                      transform: activeStep === idx ? 'scale(1.12)' : 'scale(1)',
                      opacity: activeStep === idx ? 1 : 0.7,
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-10 py-8 sm:py-10 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-1.5 transition-colors duration-300 ${activeStep === idx ? (idx % 2 === 0 ? 'text-[#F7B096]' : 'text-black') : 'text-gray-400'}`}
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
