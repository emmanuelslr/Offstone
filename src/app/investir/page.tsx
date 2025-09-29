

import Navbar from "@/components/shared/Navbar";
import AcquisitionHero from './components/AcquisitionHero';
import { Suspense } from 'react';
import InvestirHero from './components/InvestirHero';
import ProcessusInvestissement from './components/ProcessusInvestissement';
import OpportunitesClubDeals from './components/OpportunitesClubDeals';
import PalantirAcquisitionSection from './components/PalantirAcquisitionSection';
import DigitalPlatformSection from '../home-page/components/DigitalPlatformSection';
import FAQ from '../home-page/components/FAQ';
import ProCTAFooter from '../home-page/components/ProCTAFooter';

export default function InvestirPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={null}>
        <InvestirHero />
      </Suspense>
      <Suspense fallback={null}>
        <ProcessusInvestissement />
      </Suspense>
      <Suspense fallback={null}>
        <OpportunitesClubDeals />
      </Suspense>
      <Suspense fallback={null}>
        <AcquisitionHero />
      </Suspense>
      <Suspense fallback={null}>
        <PalantirAcquisitionSection />
      </Suspense>
      <DigitalPlatformSection />
      <section className="bg-white">
        <FAQ />
      </section>
      <section className="bg-white pb-0">
        <ProCTAFooter utm_campaign="investir" />
      </section>
    </main>
  );
}
