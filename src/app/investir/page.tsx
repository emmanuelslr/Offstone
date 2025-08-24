import Navbar from "@/components/shared/Navbar";
import Hero from '../home-page/components/Hero';
import ProCTAFooter from '../home-page/components/ProCTAFooter';

export default function InvestirPage() {
  return (
    <main>
      <Navbar forceWhiteStyle />
      <Hero />
      <ProCTAFooter />
    </main>
  );
}
