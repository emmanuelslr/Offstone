'use client';
import Navbar from '@/components/shared/Navbar';
import SolutionsHero from './components/SolutionsHero';
import ClubDealsSection from './components/ClubDealsSection';
import FondResidentielSection from './components/FondResidentielSection';
import TextReveal from './components/TextReveal';

export default function NosSlutions() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar forceWhiteStyle />
<SolutionsHero />
      <TextReveal text="L’ensemble des fonds Jerhiko ont pour finalité de permettre la renaissance de lieux en adéquation avec les aspirations sociales et écologiques des futurs usagers." className="mt-16" />
      <ClubDealsSection />
      <FondResidentielSection />
    </main>
  );
}
