import Navbar from '@/components/shared/Navbar';
import BenefitsChipsSection from "./investir/components/BenefitsChipsSection";
import PeopleDoSection from "./home-page/components/PeopleDoSection";
import TextReveal from "./home-page/components/TextReveal";
import WorkProcessSection from "./home-page/components/WorkProcessSection";
import { Suspense } from "react";
import { Metadata } from "next";
/* import ImageSlider from '@/components/ImageSlider'; */
/* import PillarCards from "./home-page/components/PillarCards"; */
/* import KeyFigures from "./home-page/components/KeyFigures"; */
import KeyFiguresLiteSection from "./home-page/components/KeyFiguresLiteSection";
import AdvantageOffstoneSection from "./home-page/components/AdvantageOffstoneSection";
import DigitalPlatformSection from "./home-page/components/DigitalPlatformSection";
import FAQ from "./home-page/components/FAQ";
import RecognitionSection from "./home-page/components/RecognitionSection";
import ProCTAFooter from "./home-page/components/ProCTAFooter";
import PerformanceSection from "./home-page/components/PerformanceSection";
// import StructuredData, { homePageStructuredData, servicesStructuredData } from '@/components/seo/StructuredData';
// import HomePageFAQStructuredData from '@/components/seo/HomePageFAQStructuredData';

// import MontanaSection from '@/components/MontanaSection';
// import InvestSimplement from '@/components/shared/InvestSimplement';
import StackedCards from '@/components/StackedCards';

// const showOldSection = false;

export const metadata: Metadata = {
  title: "Offstone | Investissez aux côtés de Jonathan Anguelov - Club de Deals Immobiliers",
  description: "Rejoignez le club d'investissement immobilier d'Offstone avec Jonathan Anguelov. Accédez à des opérations sélectionnées, accompagnement expert et diversification patrimoniale. Investissement immobilier professionnel en France.",
  keywords: [
    "Jonathan Anguelov",
    "Offstone",
    "club de deals immobiliers",
    "investissement immobilier professionnel",
    "diversification patrimoine",
    "accompagnement investissement",
    "deals immobiliers exclusifs",
    "investissement immobilier France",
    "Jonathan Anguelov investisseur",
    "Offstone immobilier",
    "club investisseurs",
    "immobilier professionnel France"
  ],
  openGraph: {
    title: "Offstone | Investissez aux côtés de Jonathan Anguelov",
    description: "Rejoignez le club d'investissement immobilier d'Offstone avec Jonathan Anguelov. Accédez à des opérations sélectionnées et à un accompagnement expert.",
    url: "https://offstone.fr",
    siteName: "Offstone",
    images: [
      {
        url: "/images/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Offstone - Jonathan Anguelov - Club de Deals Immobiliers",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Offstone | Investissez aux côtés de Jonathan Anguelov",
    description: "Rejoignez le club d'investissement immobilier d'Offstone avec Jonathan Anguelov. Accédez à des opérations sélectionnées.",
    images: ["/images/og-home.webp"],
  },
  alternates: {
    canonical: "https://offstone.fr",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      {/* Données structurées SEO - Temporairement désactivées */}
      {/* <StructuredData data={homePageStructuredData} />
      <StructuredData data={servicesStructuredData} />
      <HomePageFAQStructuredData /> */}
      
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section (uses BenefitsChipsSection) */}
      <section className="Hero">
        <BenefitsChipsSection />
      </section>

      {/* People Do Section */}
      <section className="bg-white">
        <PeopleDoSection />
      </section>

      {/* Text Reveal Section */}
      <section className="bg-white pt-6 md:pt-8 pb-12 md:pb-16 lg:pb-20">
        <TextReveal className="leading-[1.06]" containerPaddingClass="pt-6 md:pt-8 lg:pt-10 pb-1 md:pb-2 lg:pb-2" />
      </section>

      {/* Key Figures Lite Section */}
      <section className="bg-white mt-0">
        <KeyFiguresLiteSection />
      </section>
      {/* Performance Section (remontée) */}
      <section className="bg-white">
        <PerformanceSection />
      </section>

      {/* Work Process Section avec cartes empilées */}
      <section className="bg-white">
        <Suspense>
          <WorkProcessSection />
        </Suspense>
      </section>

      {/* Advantage Offstone Section (sans vidéo, vidéo déplacée vers /investir) */}
      <section className="bg-white pb-12 md:pb-16 lg:pb-20">
        <AdvantageOffstoneSection showVideo={false} />
      </section>

      {/* Digital Platform Section */}
      <section className="bg-white">
        <DigitalPlatformSection />
      </section>

      {/* FAQ Section (same size/background as duplicate) */}
      <section className="bg-white">
        <FAQ />
      </section>

      {/* Recognition Section */}
      <section className="bg-white">
        <RecognitionSection />
      </section>

      {/* Pro CTA Footer Section */}
      <section className="bg-white pb-0">
        <ProCTAFooter utm_campaign="home-page" />
      </section>

      {/* Remove extra white space band entirely */}
      <section className="hidden"></section>

      <div className="mb-0">
{/* Section "Investissez simplement" masquée */}
{/* <InvestSimplement /> */}
      </div>



      {/* Core Investment and Quote Sections */}
      <section className="bg-white">
        <div>
          {/* <CoreInvestment /> */}
          {/* <QuoteSection /> */}
        </div>
      </section>


      
      {/* <section className="w-full">
        <Footer />
      </section> */}
    </main>
  );
}
