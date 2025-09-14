import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroEspaceMembre from './components/HeroEspaceMembre';
import ProCTAFooter from '../home-page/components/ProCTAFooter';
import Footer from '@/components/Footer';

export default function EspaceMembrePage() {
  return (
    <main className="relative bg-white">
      {/* Fixed Navbar */}
      <Navbar forceWhiteStyle />

      {/* Hero Section */}
      <section className="bg-white">
        <HeroEspaceMembre />
      </section>

      {/* Pro CTA Footer Section */}
      <ProCTAFooter utm_campaign="espace-membre" />

      {/* Footer */}
      <Footer />
    </main>
  );
}
