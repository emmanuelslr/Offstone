import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TextReveal from '@/components/TextReveal';
import ImageSlider from '@/components/ImageSlider';
import PillarCards from '@/components/PillarCards';
import Footer from '@/components/Footer';
import CTAFooter from '@/components/CTAFooter';
import CoreInvestment from '@/components/CoreInvestment';
import QuoteSection from '@/components/QuoteSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import KeyFigures from '@/components/KeyFigures';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white w-full overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="Hero w-full">
        <Hero />
      </section>

      {/* Pillar Cards Section */}
      <section className="dark-section w-full">
        <PillarCards />
      </section>

      {/* Text Reveal Section */}
      <section className="bg-white w-full">
        <TextReveal />
      </section>

      {/* Image Slider Section */}
      <section className="dark-section w-full">
        <ImageSlider />
      </section>

      {/* Key Figures Section */}
      <section className="bg-white w-full">
        <KeyFigures />
      </section>

      {/* Core Investment and Quote Sections */}
      <section className="bg-white w-full">
        <div className="w-full max-w-[100vw]">
          <CoreInvestment />
          <QuoteSection />
          <ExpertiseSection />
        </div>
      </section>
      
      <section className="w-full">
        <CTAFooter />
      </section>
      
      <section className="w-full">
        <Footer />
      </section>
    </main>
  );
}
