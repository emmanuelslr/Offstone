'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SectionBadge from './SectionBadge';
import { motion } from 'framer-motion';

export default function FAQ() {
  return (
    <section className="w-full bg-[#F7F6F1] py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Section gauche - Titre et description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-5/12 lg:sticky lg:top-8"
          >
            <div className="mb-6">
              <SectionBadge colorClass="text-gray-600" text="FAQ" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px] font-normal tracking-tighter leading-tight text-[#111] mb-6 lg:mb-8"
            >
              L'essentiel <span style={{ color: '#9D9F9E' }}>à savoir.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-xl leading-relaxed"
            >
              Trouvez les réponses aux questions<br />
              les plus fréquentes sur nos<br />
              investissements immobiliers.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              href="/faq"
              className="inline-flex items-center justify-center h-11 bg-transparent text-black font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-black hover:text-white hover:border-black group"
            >
              Plus de questions
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.1}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </motion.a>
          </motion.div>
          {/* Section droite - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-7/12"
          >
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="faq-1" className="group hover:bg-[#EDE9E4] border border-[#DEDCD9] rounded-lg px-4 sm:px-6 overflow-hidden">
                <AccordionTrigger data-item="faq-1" className="w-full text-left py-4 sm:py-5 hover:no-underline">
                  <div className="font-normal text-base sm:text-lg md:text-xl lg:text-[22px] text-[#111] pr-4" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>
                    Comment fonctionne le co-investissement ?
                  </div>
                </AccordionTrigger>
                <AccordionContent data-item="faq-1" className="pb-4 sm:pb-5">
                  <div className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    Nous investissons notre capital dans les mêmes opérations et aux mêmes conditions que vous pour un alignement total.
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="group hover:bg-[#EDE9E4] border border-[#DEDCD9] rounded-lg px-4 sm:px-6 overflow-hidden">
                <AccordionTrigger data-item="faq-2" className="w-full text-left py-4 sm:py-5 hover:no-underline">
                  <div className="font-normal text-base sm:text-lg md:text-xl lg:text-[22px] text-[#111] pr-4" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>
                    Qui peut investir ?
                  </div>
                </AccordionTrigger>
                <AccordionContent data-item="faq-2" className="pb-4 sm:pb-5">
                  <div className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    Particuliers avertis et investisseurs professionnels, en direct ou via votre société, selon éligibilité pour chaque dossier.
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="group hover:bg-[#EDE9E4] border border-[#DEDCD9] rounded-lg px-4 sm:px-6 overflow-hidden">
                <AccordionTrigger data-item="faq-3" className="w-full text-left py-4 sm:py-5 hover:no-underline">
                  <div className="font-normal text-base sm:text-lg md:text-xl lg:text-[22px] text-[#111] pr-4" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>
                    Comment sélectionnez-vous les opportunités ?
                  </div>
                </AccordionTrigger>
                <AccordionContent data-item="faq-3" className="pb-4 sm:pb-5">
                  <div className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    Sourcing direct, analyse complète et entrée uniquement si le prix offre une marge de sécurité avec un plan de création de valeur documenté.
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" className="group hover:bg-[#EDE9E4] border border-[#DEDCD9] rounded-lg px-4 sm:px-6 overflow-hidden">
                <AccordionTrigger data-item="faq-4" className="w-full text-left py-4 sm:py-5 hover:no-underline">
                  <div className="font-normal text-base sm:text-lg md:text-xl lg:text-[22px] text-[#111] pr-4" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>
                    Quels rendements viser et quelle durée d&apos;investissement ?
                  </div>
                </AccordionTrigger>
                <AccordionContent data-item="faq-4" className="pb-4 sm:pb-5">
                  <div className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    Objectifs indicatifs: Taux de rendement interne (TRI) net 8 à 14 %, durée 2 à 5 ans selon l&apos;actif. Performance non garantie.
                    <br /><br />
                    <span className="text-xs text-gray-500">
                      Les performances passées ne préjugent pas des résultats futurs. Investir comporte des risques de perte en capital. Les investissements sont illiquides et ne sont pas garantis.
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5" className="group hover:bg-[#EDE9E4] border border-[#DEDCD9] rounded-lg px-4 sm:px-6 overflow-hidden">
                <AccordionTrigger data-item="faq-5" className="w-full text-left py-4 sm:py-5 hover:no-underline">
                  <div className="font-normal text-base sm:text-lg md:text-xl lg:text-[22px] text-[#111] pr-4" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>
                    Quelle liquidité et quel calendrier de distributions ?
                  </div>
                </AccordionTrigger>
                <AccordionContent data-item="faq-5" className="pb-4 sm:pb-5">
                  <div className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                    Liquidité limitée avant la sortie. Quand pertinent, objectif de revenu courant 2 à 4 % par an, versé trimestriellement ou semestriellement.
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// Suppression du bloc dupliqué, la structure correcte est déjà présente plus haut dans le fichier.


