import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import { toCanonical } from "@/lib/seo";
import { getCaseStudies } from "@/lib/prismic/caseStudies.server";
import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid.client";
import { CompliantBanner, LISTING_TEXT } from "@/components/common/CompliantDisclaimer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import FadeInOnView from "@/components/animations/FadeInOnView.client";

export const revalidate = 3600; // ISR 1h

export async function generateMetadata(): Promise<Metadata> {
  const title = "Nos réalisations | Offstone";
  const description = "Sélection d’opérations passées — descriptif factuel.";
  const canonical = toCanonical("/nos-realisations");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function NosRealisationsPage() {
  const studies = await getCaseStudies();
  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-7xl px-4 md:px-6 pt-24 md:pt-28 pb-12 md:pb-16">
        <FadeInOnView>
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Nos réalisations", href: "/nos-realisations" }]} className="mb-6" />
        <header className="mb-8 md:mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-tight">
            Nos réalisations
          </h1>
        </header>

        <CompliantBanner text={LISTING_TEXT} className="mb-8" />

        </FadeInOnView>
        {studies.length > 0 ? (
          <FadeInOnView delay={0.05}>
            <CaseStudiesGrid studies={studies} />
          </FadeInOnView>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600">
            Aucune réalisation disponible pour le moment. Ajoutez des documents "case_study" dans Prismic ou lancez le script d'ingestion.
          </div>
        )}
      </main>
      
      {/* Pro CTA Footer Section - en dehors du main pour permettre l'extension du fond gris */}
      <section className="bg-white pb-0">
        <ProCTAFooter utm_campaign="nos-realisations" />
      </section>
    </>
  );
}
