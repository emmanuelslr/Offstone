'use client';
import Navbar from '@/components/Navbar';
import SolutionsHero from '@/components/SolutionsHero';
import ClubDealsSection from '@/components/ClubDealsSection';
import FondResidentielSection from '@/components/FondResidentielSection';

export default function NosSlutions() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <SolutionsHero />
      <ClubDealsSection />
      <FondResidentielSection />
    </main>
  );
}
