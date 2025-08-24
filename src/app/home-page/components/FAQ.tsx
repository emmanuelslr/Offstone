'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SectionBadge from './SectionBadge';

export default function FAQ() {
  return (
    <section>
      <div className="container mx-auto px-20 sm:px-32" style={{ background: "#f7f6f1", paddingTop: "2rem", paddingBottom: "1.5rem" }}>
        <div className="w-full flex flex-col justify-start" style={{ minHeight: 480 }}>
          <div className="flex flex-col lg:flex-row items-start justify-between min-h-[400px]">
            <div className="lg:w-5/12 lg:pr-12 lg:mb-0 mt-0 flex flex-col justify-start h-full">
              <div className="mb-5 flex justify-start">
                <SectionBadge colorClass="text-gray-600" text="FAQ" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[54px] lg:text-[70px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-6">
                L’essentiel<br />
                <span style={{ color: '#9D9F9E' }}>à savoir.</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-gray-600 mb-6 max-w-xl mt-4">
                Une plateforme digitale claire<br />
                pour investir et suivre vos<br />
                investissements immobiliers.
              </p>
              <button
                className="h-11 flex items-center justify-center bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-white hover:text-black hover:border-black mt-6 group"
                style={{
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                  width: 'fit-content',
                  minWidth: '180px'
                }}
                type="button"
              >
                Parler à un expert
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="ml-2 w-5 h-5 text-white group-hover:text-black transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 7L7 17M7 7h10v10"
                  />
                </svg>
              </button>
            </div>
            {/* Colonne droite: Accordion sans titre/sous-titre */}
            <div className="lg:w-7/12 lg:pl-12 w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1" className="group hover:bg-[#EDE9E4] border-b" style={{ borderColor: '#DEDCD9' }}>
                  <AccordionTrigger data-item="faq-1" className="w-full text-left">
                    <div className="font-normal text-[19px] md:text-[20px] lg:text-[22px] text-[#111]" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>What is a FAQ?</div>
                  </AccordionTrigger>
                  <AccordionContent data-item="faq-1" className="pl-3 pr-4 pb-3">
                    <div className="text-gray-600 text-[16px] md:text-[17px] lg:text-[18px]">A FAQ is a list of frequently asked questions and answers on a particular topic.</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2" className="group hover:bg-[#EDE9E4] border-b" style={{ borderColor: '#DEDCD9' }}>
                  <AccordionTrigger data-item="faq-2" className="w-full text-left">
                    <div className="font-normal text-[19px] md:text-[20px] lg:text-[22px] text-[#111]" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>What is the purpose of a FAQ?</div>
                  </AccordionTrigger>
                  <AccordionContent data-item="faq-2" className="pl-3 pr-4 pb-3">
                    <div className="text-gray-600 text-[16px] md:text-[17px] lg:text-[18px]">The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3" className="group hover:bg-[#EDE9E4] border-b" style={{ borderColor: '#DEDCD9' }}>
                  <AccordionTrigger data-item="faq-3" className="w-full text-left">
                    <div className="font-normal text-[19px] md:text-[20px] lg:text-[22px] text-[#111]" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>How do I create a FAQ?</div>
                  </AccordionTrigger>
                  <AccordionContent data-item="faq-3" className="pl-3 pr-4 pb-3">
                    <div className="text-gray-600 text-[16px] md:text-[17px] lg:text-[18px]">To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4" className="group hover:bg-[#EDE9E4] border-b" style={{ borderColor: '#DEDCD9' }}>
                  <AccordionTrigger data-item="faq-4" className="w-full text-left">
                    <div className="font-normal text-[19px] md:text-[20px] lg:text-[22px] text-[#111]" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>What are the benefits of a FAQ?</div>
                  </AccordionTrigger>
                  <AccordionContent data-item="faq-4" className="pl-3 pr-4 pb-3">
                    <div className="text-gray-600 text-[16px] md:text-[17px] lg:text-[18px]">The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-5" className="group hover:bg-[#EDE9E4] border-b" style={{ borderColor: '#DEDCD9' }}>
                  <AccordionTrigger data-item="faq-5" className="w-full text-left">
                    <div className="font-normal text-[19px] md:text-[20px] lg:text-[22px] text-[#111]" style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}>How should I organize my FAQ?</div>
                  </AccordionTrigger>
                  <AccordionContent data-item="faq-5" className="pl-3 pr-4 pb-3">
                    <div className="text-gray-600 text-[16px] md:text-[17px] lg:text-[18px]">Group related questions together and order them from basics to advanced topics for clarity.</div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


