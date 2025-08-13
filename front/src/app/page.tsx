import Navbar from '@/components/shared/Navbar';
import Hero from "./home-page/components/Hero";
import PeopleDoSection from "./home-page/components/PeopleDoSection";
import TextReveal from "./home-page/components/TextReveal";
import WorkProcessSection from "./home-page/components/WorkProcessSection";
/* import ImageSlider from '@/components/ImageSlider'; */
import PillarCards from "./home-page/components/PillarCards";
import Footer from '@/components/shared/Footer';
import PartnerLogosSection from "./home-page/components/PartnerLogosSection";
import KeyFigures from "./home-page/components/KeyFigures";
import KeyFiguresLiteSection from "./home-page/components/KeyFiguresLiteSection";
import StackedCardDisplay from "./home-page/components/StackedCardDisplay";
// import MontanaSection from '@/components/MontanaSection';
import InvestSimplement from '@/components/shared/InvestSimplement';
/* import StackedCards from '@/components/StackedCards'; */
import InvestisseursSection from "./home-page/components/InvestisseursSection";
import ConversationBanner from "./home-page/components/ConversationBanner";
import FourSquaresSection from "./home-page/components/FourSquaresSection";
import QASection, { Investisseurs2Section } from "./home-page/components/QASection";
import MediaSection from "./home-page/components/MediaSection";

// const showOldSection = false;

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white w-full">
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

      <section className="bg-white w-full min-h-screen flex flex-col !text-black">
        <StackedCardDisplay />
      </section>

      {/* Work Process Section */}
      {/* <section className="w-full">
        <WorkProcessSection />
      </section> */}

  

      {/* Image Slider Section */}
      {/*
      <section className="dark-section w-full">
        <ImageSlider />
      </section>
      */}

      {/* Key Figures Section */}
      {/* <section className="bg-white w-full">
        <KeyFigures />
      </section> */}

      {/* <TeamSection /> */}

{/* Four Squares Section */}

      {/* <StackedCards /> */}

{/* <MontanaSection image="/Images/Confiance/Iena%20Montana.jpg" /> */}

      <div className="mb-32">
<InvestSimplement />
      </div>



      {/* Core Investment and Quote Sections */}
      <section className="bg-white w-full">
        <div className="w-full max-w-[100vw]">
          {/* <CoreInvestment /> */}
          {/* <QuoteSection /> */}
        </div>
      </section>

      {/* Investisseurs2 Section */}
      <div className="mb-16">
      <section className="bg-white w-full py-16">
        <div className="container mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:grid-rows-1">
            <div className="md:col-span-6 flex flex-col">
<h2 className="text-6xl md:text-7xl font-light tracking-tight text-black mb-8">
                Pourquoi choisir Aguesseau ?
              </h2>
<p className="text-xl text-gray-600 mt-4">
                Parce que l’exception devient accessible,<br /> portée par l’exigence et le savoir-faire d’Aguesseau.
              </p>
              <div className="mt-12">
<a href="#expert" className="inline-flex items-center justify-center px-10 py-4 text-[17px] font-medium tracking-[-0.01em] shadow-sm rounded-full transition-all text-white bg-black border border-black hover:bg-white hover:text-black gap-2 group">
                  Parler à un expert
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transform transition-transform duration-200 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M7 7h10v10"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-6 -ml-12 flex flex-col items-end">
              <div className="flex flex-row gap-8 w-full justify-end">
<div className="bg-black w-1/2 h-[350px] relative group flex flex-col justify-center items-center">
<h3 className="text-white font-light text-2xl md:text-3xl tracking-wide mb-4 text-left ml-4 mt-32">Opportunités<br />exclusives</h3>
  <span className="absolute top-6 right-6 z-10">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 group-hover:bg-[#f7b096] group-hover:border-transparent transition-colors duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 17L17 7M7 7h10v10"
        />
      </svg>
    </span>
  </span>
</div>
<div className="bg-black w-1/2 h-[350px] relative group flex flex-col justify-center items-center">
<h3 className="text-white font-light text-2xl md:text-3xl tracking-wide mb-4 text-left ml-4 mt-32">Investir à nos côtés</h3>
  <span className="absolute top-6 right-6 z-10">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 group-hover:bg-[#f7b096] group-hover:border-transparent transition-colors duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 17L17 7M7 7h10v10"
        />
      </svg>
    </span>
  </span>
</div>
              </div>
              <div className="flex flex-row gap-8 w-full justify-end mt-8">
<div className="bg-black w-1/2 h-[350px] relative group flex flex-col justify-center items-center">
<h3 className="text-white font-light text-2xl md:text-3xl tracking-wide mb-4 text-left ml-4 mt-32">Revenus attractifs</h3>
  <span className="absolute top-6 right-6 z-10">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 group-hover:bg-[#f7b096] group-hover:border-transparent transition-colors duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 17L17 7M7 7h10v10"
        />
      </svg>
    </span>
  </span>
</div>
<div className="bg-black w-1/2 h-[350px] relative group flex flex-col justify-center items-center">
<h3 className="text-white font-light text-2xl md:text-3xl tracking-wide mb-4 text-left ml-4 mt-32">Accès simplifié</h3>
  <span className="absolute top-6 right-6 z-10">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300 group-hover:bg-[#f7b096] group-hover:border-transparent transition-colors duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 17L17 7M7 7h10v10"
        />
      </svg>
    </span>
  </span>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Q&A Section */}
      <section className="bg-white w-full py-16 mb-8">
        <div className="container mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:grid-rows-1">
            <div className="md:col-span-6 flex flex-col">
              <h2 className="text-7xl md:text-8xl font-light tracking-tight text-black">
                L'essentiel <br /> à savoir.
              </h2>
              <div className="mt-12">
                <a href="#expert" className="inline-flex items-center justify-center px-10 py-4 text-[17px] font-medium tracking-[-0.01em] shadow-sm rounded-full transition-all text-black bg-[#F7B096] border border-[#F7B096] hover:bg-white hover:text-[#F7B096] gap-2 group">
                  Parler à un expert
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transform transition-transform duration-200 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M7 7h10v10"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-6 -ml-12">
              <QASection />
            </div>
          </div>
        </div>
      </section>
      <MediaSection />

      {/* Conversation Banner */}
      <section className="bg-white w-full">
        <PartnerLogosSection />
      </section>
      <ConversationBanner />
      
      {/* <section className="w-full">
        <Footer />
      </section> */}
    </main>
  );
}
