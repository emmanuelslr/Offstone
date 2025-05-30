import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TextReveal from '@/components/TextReveal';
import ImageSlider from '@/components/ImageSlider';
import PillarCards from '@/components/PillarCards';
import Footer from '@/components/Footer';
import CoreInvestment from '@/components/CoreInvestment';
import QuoteSection from '@/components/QuoteSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import KeyFigures from '@/components/KeyFigures';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="Hero">
        <Hero />
      </div>

      {/* Pillar Cards Section */}
      <div className="dark-section">
        <PillarCards />
      </div>

      {/* Text Reveal Section */}
      <div className="bg-white">
        <TextReveal />
      </div>

      {/* Image Slider Section */}
      <div className="dark-section">
        <ImageSlider />
      </div>

      {/* Key Figures Section */}
      <div className="bg-white">
        <KeyFigures />
      </div>

      {/* Core Investment and Quote Sections */}
      <div className="bg-white">
        <CoreInvestment />
        <QuoteSection />
        <ExpertiseSection />
      </div>
      
      <Footer />
    </main>
  );
}
