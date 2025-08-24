import Navbar from '@/components/shared/Navbar';
import Hero from "./home-page/components/Hero";
import PeopleDoSection from "./home-page/components/PeopleDoSection";
import TextReveal from "./home-page/components/TextReveal";
/* import WorkProcessSection from "./home-page/components/WorkProcessSection"; */
/* import ImageSlider from '@/components/ImageSlider'; */
/* import PillarCards from "./home-page/components/PillarCards"; */
/* import KeyFigures from "./home-page/components/KeyFigures"; */
import KeyFiguresLiteSection from "./home-page/components/KeyFiguresLiteSection";
import AdvantageOffstoneSection from "./home-page/components/AdvantageOffstoneSection";
import FAQ from "./home-page/components/FAQ";
import ProCTAFooter from "./home-page/components/ProCTAFooter";

// import MontanaSection from '@/components/MontanaSection';
// import InvestSimplement from '@/components/shared/InvestSimplement';
/* import StackedCards from '@/components/StackedCards'; */

// const showOldSection = false;

export default function Home() {
  return (
    <main className="relative bg-white w-full">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="Hero w-full">
        <Hero />
      </section>

      {/* People Do Section */}
      <section className="bg-white w-full">
        <PeopleDoSection />
      </section>

      {/* Text Reveal Section */}
      <section className="bg-white w-full pt-16">
        <TextReveal />
      </section>

      {/* Key Figures Lite Section */}
      <section className="bg-white w-full mt-0">
        <KeyFiguresLiteSection />
      </section>
      {/* Advantage Offstone Section */}
      <section className="bg-white w-full">
        <AdvantageOffstoneSection />
      </section>

      {/* FAQ Section (same size/background as duplicate) */}
      <section className="bg-white w-full">
        <FAQ />
      </section>

      {/* Pro CTA Footer Section */}
      <section className="bg-white w-full pb-0">
        <ProCTAFooter />
      </section>

      {/* Remove extra white space band entirely */}
      <section className="hidden"></section>

      <div className="mb-32">
{/* Section "Investissez simplement" masquée */}
{/* <InvestSimplement /> */}
      </div>



      {/* Core Investment and Quote Sections */}
      <section className="bg-white w-full">
        <div className="w-full max-w-[100vw]">
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
