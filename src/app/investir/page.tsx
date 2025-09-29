
import type { Metadata } from "next";
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
import StructuredData from '@/components/seo/StructuredData';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: "Investir avec Jonathan Anguelov | Club de Deals Immobiliers Offstone",
  description: "Rejoignez le club de deals immobiliers exclusif d'Offstone avec Jonathan Anguelov. Accédez à des opérations sélectionnées, accompagnement expert et diversification patrimoniale. Investissement immobilier professionnel en France.",
  keywords: [
    "investir avec Jonathan Anguelov",
    "club de deals immobiliers",
    "investissement immobilier professionnel",
    "deals immobiliers exclusifs",
    "accompagnement investisseur immobilier",
    "diversification patrimoine immobilier",
    "investissement immobilier France",
    "Jonathan Anguelov investisseur",
    "Offstone club de deals",
    "opérations immobilières sélectionnées",
    "investissement immobilier accompagné",
    "club investisseurs immobiliers"
  ],
  openGraph: {
    title: "Investir avec Jonathan Anguelov | Club de Deals Immobiliers",
    description: "Rejoignez le club de deals immobiliers exclusif d'Offstone avec Jonathan Anguelov. Accédez à des opérations sélectionnées et à un accompagnement expert.",
    url: "https://offstone.fr/investir",
    siteName: "Offstone",
    images: [
      {
        url: "/images/og-deals.jpg",
        width: 1200,
        height: 630,
        alt: "Club de Deals Immobiliers Offstone - Jonathan Anguelov",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investir avec Jonathan Anguelov | Club de Deals Immobiliers",
    description: "Rejoignez le club de deals immobiliers exclusif d'Offstone avec Jonathan Anguelov.",
    images: ["/images/og-deals.jpg"],
  },
  alternates: {
    canonical: "https://offstone.fr/investir",
  },
};

export default function InvestirPage() {
  // Données structurées pour la page investir
  const investirStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Club de Deals Immobiliers Offstone",
    "description": "Rejoignez le club de deals immobiliers exclusif d'Offstone avec Jonathan Anguelov. Accédez à des opérations sélectionnées et à un accompagnement expert.",
    "provider": {
      "@type": "Organization",
      "name": "Offstone",
      "founder": {
        "@type": "Person",
        "name": "Jonathan Anguelov",
        "jobTitle": "Fondateur & Investisseur Immobilier"
      }
    },
    "serviceType": "Investissement Immobilier",
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "offers": {
      "@type": "Offer",
      "description": "Club de deals immobiliers exclusifs avec accompagnement expert",
      "category": "Investissement Immobilier",
      "availability": "https://schema.org/InStock"
    },
    "url": "https://offstone.fr/investir"
  };

  return (
    <main>
      {/* Données structurées SEO */}
      <StructuredData data={investirStructuredData} />
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Investir', url: '/investir' }
        ]}
        className="px-4 py-2 bg-gray-50"
      />
      
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
