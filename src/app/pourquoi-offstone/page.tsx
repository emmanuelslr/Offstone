import React, { Suspense } from "react";
import Navbar from "../../components/shared/Navbar";
import HeroPourquoiOffstone from "./components/HeroPourquoiOffstone";
import SectorTabsSection from "./components/SectorTabsSectionFixed";
import TextReveal from "../home-page/components/TextReveal";
import StickySidebarSection from "./components/StickySidebarSection";
import ProCTAFooter from "../home-page/components/ProCTAFooter";

export default function StrategiePage() {
  return (
    <>
      <Navbar forceWhiteStyle />
      {/* Comment ça marche — section d'intro */}
      <section className="w-full">
        <Suspense>
          <HeroPourquoiOffstone />
        </Suspense>
      </section>

      {/* Text Section */}
      <div className="pt-12 pb-2 px-4 sm:px-8 lg:px-20 xl:px-32">
        <TextReveal
          text="Diversifiez votre patrimoine grâce à notre expertise multi-sectorielle et contra-cyclique"
          multiline={true}
        />
      </div>

      {/* Séparateur */}
      <div className="px-4 sm:px-8 lg:px-20 xl:px-32">
        <div className="w-full h-px" style={{ backgroundColor: '#E8E9EC' }}></div>
      </div>

      <SectorTabsSection />

      {/* Séparateur après SECTEURS */}
      <div className="px-4 sm:px-8 lg:px-20 xl:px-32 pt-8">
        <div className="w-full h-px" style={{ backgroundColor: '#E8E9EC' }}></div>
      </div>

      {/* Section Analyse des investissements */}
      <section className="relative pt-[110px] pb-[100px] bg-white z-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-32">
          <div className="flex flex-col lg:flex-row items-center justify-start -mb-6">
            <div className="lg:w-full lg:mb-0">
              <div className="mb-5">
                <div className="flex items-center mb-1 pl-[2px] mt-[-30px]">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#96D5F7' }} />
                  <span className="text-gray-600 text-xs tracking-[0.18em] ml-[6px]">ANALYSE</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[50px] lg:text-[66px] font-normal tracking-tighter leading-[1.15] md:leading-[1.18] lg:leading-[1.22] text-[#111] text-left mb-10" style={{ maxWidth: '1200px' }}>
                Nous analysons des millions d&apos;euros d&apos;investissement pour vous
              </h2>
              <p className="text-[15px] md:text-[17px] text-gray-600 mb-12 max-w-4xl">
                Avant qu&apos;un investissement n&apos;atteigne votre portefeuille, notre équipe d&apos;investissement<span className="hidden sm:inline"><br /></span>
                travaille en coulisses pour vous apporter ce que nous pensons être les meilleures<span className="hidden sm:inline"><br /></span>
                opportunités possibles
              </p>

              {/* 5 carrés gris */}
              <div className="flex flex-col gap-8">
                {/* Première ligne : 3 carrés */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-80 md:w-96 h-40 rounded-lg p-6" style={{ backgroundColor: '#F4F2F2' }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <h3 className="text-base font-medium text-[#1E2124]">Accès institutionnel</h3>
                        </div>
                        <div className="w-full h-px mb-2" style={{ backgroundColor: '#E8E9EC' }}></div>
                        <p className="text-sm text-gray-600">Participer à des opérations de grande taille, habituellement réservées aux fonds.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-80 md:w-96 h-40 rounded-lg p-6" style={{ backgroundColor: '#F4F2F2' }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0l3-3m-3 3l-3-3m-6 9h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <h3 className="text-base font-medium text-[#1E2124]">Sélection rigoureuse</h3>
                        </div>
                        <div className="w-full h-px mb-2" style={{ backgroundColor: '#E8E9EC' }}></div>
                        <p className="text-sm text-gray-600">Filtrer sans compromis pour ne retenir que les meilleures opportunités.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-80 md:w-96 h-40 rounded-lg p-6" style={{ backgroundColor: '#F4F2F2' }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17a2 2 0 114 0 2 2 0 01-4 0zM7 7h10M7 11h10M7 15h10"></path>
                            </svg>
                          </div>
                          <h3 className="text-base font-medium text-[#1E2124]">Reporting transparent</h3>
                        </div>
                        <div className="w-full h-px mb-2" style={{ backgroundColor: '#E8E9EC' }}></div>
                        <p className="text-sm text-gray-600">Suivi digital clair et sécurisé sur toute la durée de vie.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deuxième ligne : 2 carrés */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-80 md:w-96 h-40 rounded-lg p-6" style={{ backgroundColor: '#F4F2F2' }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 7h12l1-7h2"></path>
                            </svg>
                          </div>
                          <h3 className="text-base font-medium text-[#1E2124]">Ticket adapté</h3>
                        </div>
                        <div className="w-full h-px mb-2" style={{ backgroundColor: '#E8E9EC' }}></div>
                        <p className="text-sm text-gray-600">Des montants d&apos;investissement ajustés à votre stratégie.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-80 md:w-96 h-40 rounded-lg p-6" style={{ backgroundColor: '#F4F2F2' }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 004 0z"></path>
                            </svg>
                          </div>
                          <h3 className="text-base font-medium text-[#1E2124]">Co-investissement de l&apos;équipe</h3>
                        </div>
                        <div className="w-full h-px mb-2" style={{ backgroundColor: '#E8E9EC' }}></div>
                        <p className="text-sm text-gray-600">Nous investissons dans les mêmes opérations, nous mettons notre capital à vos côtés.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section avec Sticky Sidebar */}
      <StickySidebarSection />

      {/* Pro CTA Footer Section */}
      <ProCTAFooter utm_campaign="pourquoi-offstone" />
    </>
  );
}




