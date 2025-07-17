'use client';
import SectionTitle from './SectionTitle';

export default function SolutionsHero() {
  return (
<section className="w-full bg-white pt-36 pb-0">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title={
            <>
              Nos Solutions
            </>
          }
          subtitle="Découvrez nos solutions d'investissement innovantes et performantes"
          align="center"
          textColor="dark"
        />
      </div>
    </section>
  );
}
