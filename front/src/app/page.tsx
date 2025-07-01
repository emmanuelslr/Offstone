import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PeopleDoSection from '@/components/PeopleDoSection';
import TextReveal from '@/components/TextReveal';
/* import ImageSlider from '@/components/ImageSlider'; */
import PillarCards from '@/components/PillarCards';
import Footer from '@/components/Footer';
import CTAFooter from '@/components/CTAFooter';
import CoreInvestment from '@/components/CoreInvestment';
import QuoteSection from '@/components/QuoteSection';
import PartnerLogosSection from '@/components/PartnerLogosSection';
import KeyFigures from '@/components/KeyFigures';
import TeamSection from '@/components/TeamSection';
import MontanaSection from '@/components/MontanaSection';
import RecentInvestments from '@/components/RecentInvestments';
import ConversationBanner from '@/components/ConversationBanner';
import FourSquaresSection from '@/components/FourSquaresSection';

// const showOldSection = false;

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white w-full overflow-x-hidden">
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
      <section className="bg-white w-full">
        <TextReveal />
      </section>

      {/* Pillar Cards Section */}
      <section className="dark-section w-full bg-[#f3f4f6]">
        <PillarCards />
      </section>

      {/* Image Slider Section */}
      {/*
      <section className="dark-section w-full">
        <ImageSlider />
      </section>
      */}

      {/* Key Figures Section */}
      <section className="bg-white w-full">
        <KeyFigures />
      </section>

      {/* <TeamSection /> */}

      {/* Four Squares Section */}
      <FourSquaresSection />

      <MontanaSection image="/Images/gepacHmDQ2wBJaynQNnD9Q.jpg" />

      <RecentInvestments />

      {/* CTA Footer */}
      <section className="w-full">
        <CTAFooter />
      </section>

      {/* Core Investment and Quote Sections */}
      <section className="bg-white w-full">
        <div className="w-full max-w-[100vw]">
          {/* <CoreInvestment /> */}
          {/* <QuoteSection /> */}
          <PartnerLogosSection />
        </div>
      </section>

      {/* Conversation Banner */}
      <ConversationBanner />
      
      <section className="w-full">
        <Footer />
      </section>
    </main>
  );
}
