'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const steps = [
  {
    number: "01",
    title: "Candidature",
    description: "Soumettez votre candidature en ligne avec vos informations financières et vos objectifs d\'investissement. Processus simple et sécurisé."
  },
  {
    number: "02", 
    title: "Évaluation",
    description: "Notre équipe évalue votre profil selon nos critères d\'éligibilité et votre adéquation avec nos investissements exclusifs."
  },
  {
    number: "03",
    title: "Entretien",
    description: "Rencontrez nos experts lors d\'un entretien personnalisé pour valider votre compréhension des risques et opportunités."
  },
  {
    number: "04",
    title: "Accès exclusif",
    description: "Une fois accepté, accédez à nos opportunités d\'investissement premium et rejoignez notre communauté d\'investisseurs."
  }
];


function ProcessusInvestissementInner(props: any) {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchParams = useSearchParams();
  const steps = [
    {
      number: "01",
      title: "Candidature",
      description: "Soumettez votre candidature en ligne avec vos informations financières et vos objectifs d'investissement. Processus simple et sécurisé."
    },
    {
      number: "02",
      title: "Évaluation",
      description: "Notre équipe évalue votre profil selon nos critères d'éligibilité et votre adéquation avec nos investissements exclusifs."
    },
    {
      number: "03",
      title: "Entretien",
      description: "Rencontrez nos experts lors d'un entretien personnalisé pour valider votre compréhension des risques et opportunités."
    },
    {
      number: "04",
      title: "Accès exclusif",
      description: "Une fois accepté, accédez à nos opportunités d'investissement premium et rejoignez notre communauté d'investisseurs."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      if (containerTop < viewportHeight * 0.8 && containerTop > -containerHeight * 0.5) {
        const progress = Math.max(0, Math.min(1, (viewportHeight * 0.8 - containerTop) / (containerHeight * 0.8)));
        const newActiveStep = Math.floor(progress * steps.length) - 1;
        setActiveStep(Math.max(-1, Math.min(steps.length - 1, newActiveStep)));
      } else if (containerTop >= viewportHeight * 0.8) {
        setActiveStep(-1);
      } else if (containerTop <= -containerHeight * 0.5) {
        setActiveStep(steps.length - 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="ProcessusInvestissement w-full pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-20" style={{ backgroundColor: '#F7F5F2' }}>
      <div className="container-responsive" ref={containerRef}>
        <div className="max-w-4xl mb-6 sm:mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
            <span className="text-gray-600 text-sm tracking-[0.15em] uppercase font-medium">
              ACCÈS EXCLUSIF
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-normal text-black mb-8 leading-[1.1] max-w-4xl"
          >
            De la candidature à l’accès exclusif
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl"
          >
            Rejoignez un cercle restreint d'investisseurs et accédez à des opportunités immobilières premium avec Jonathan Anguelov. Chaque candidature est étudiée individuellement.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <span
                    className={`text-5xl sm:text-6xl lg:text-7xl font-light transition-all duration-700 ease-out ${
                      activeStep >= index
                        ? (index === 0 || index === 3 ? 'text-[#F7B096] scale-110 drop-shadow-lg' : 'text-black scale-110')
                        : 'text-gray-300 scale-100'
                    }`}
                    style={{
                      transform: activeStep >= index ? 'scale(1.1)' : 'scale(1)',
                      textShadow: activeStep >= index && (index === 0 || index === 3) ? '0 0 20px rgba(247, 176, 150, 0.3)' : 'none'
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                <div className="pt-0 sm:pt-2">
                  <h3 className={`text-lg sm:text-2xl font-normal mb-2 sm:mb-4 md:mb-6 transition-all duration-500 ${
                    activeStep >= index ? (index === 0 || index === 3 ? 'text-[#F7B096]' : 'text-black') : 'text-black'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-lg text-gray-600 leading-relaxed mb-3 sm:mb-5 md:mb-6 max-w-md">
                    {step.description}
                  </p>
                  <div
                    className={`h-px transition-all duration-700 ease-out ${
                      activeStep >= index
                        ? (index === 0 || index === 3 ? 'w-24 bg-[#F7B096] shadow-sm' : 'w-24 bg-black shadow-sm')
                        : 'w-16 bg-gray-200'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 sm:mt-12 md:mt-24 max-w-2xl"
        >
          <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8">
            Prêt à rejoindre nos investissements exclusifs ? Commencez votre candidature dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                try {
                  const url = typeof window !== 'undefined' ? window.location.href : undefined;
                  const entries = searchParams ? Array.from(searchParams.entries()) : [];
                  const params = new URLSearchParams(entries);
                  const detail = {
                    page_url: url,
                    ref: typeof document !== 'undefined' ? document.referrer : undefined,
                    utm_source: params.get('utm_source') || 'site',
                    utm_medium: 'internal_cta',
                    utm_campaign: 'investir',
                    utm_content: 'investir-hero',
                    utm_term: 'Investissez à nos côtés',
                    cta_id: params.get('cta_id') || 'investir_processus_candidature',
                    asset_class: 'retail'
                  } as any;
                  (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })(detail);
                } catch {}
              }}
              className="bg-black text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-lg text-base"
            >
              Commencer ma candidature
            </button>
            <button className="border border-black text-black px-4 sm:px-8 py-2 sm:py-4 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 text-base">
              Télécharger la brochure
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function ProcessusInvestissement(props: any) {
  return (
    <Suspense>
      <ProcessusInvestissementInner {...props} />
    </Suspense>
  );
}





