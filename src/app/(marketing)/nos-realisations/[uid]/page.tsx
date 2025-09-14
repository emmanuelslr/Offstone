import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { toCanonical } from "@/lib/seo";
import { getCaseStudyByUID, getCaseStudies } from "@/lib/prismic/caseStudies.server";
import { ComplianceBadge, CompliantBanner, DETAIL_BANNER_TEXT } from "@/components/common/CompliantDisclaimer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CaseStudyBodyDarwin from "@/components/case-studies/CaseStudyBodyDarwin";
import FactsTable from "@/components/case-studies/FactsTable";
import HeadlinePillsRow from "@/components/case-studies/HeadlinePillsRow";
import FramedTextBox from "@/components/case-studies/FramedTextBox";
import LocationCard from "@/components/case-studies/LocationCard";
import PortfolioGallery from "@/components/case-studies/PortfolioGallery";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";

export const revalidate = 3600;

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const doc = await getCaseStudyByUID(uid);
  if (!doc) return {};
  const title = doc.seo?.meta_title || doc.title;
  const description = doc.seo?.meta_description || doc.excerpt || "";
  const canonical = doc.seo?.canonical_url?.url || toCanonical(`/nos-realisations/${uid}`);
  const ogImage = doc.seo?.og_image?.url || doc.heroImage?.url;
  const noindex = doc.seo?.noindex === true;
  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url: canonical, images: ogImage ? [{ url: ogImage }] : undefined },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const doc = await getCaseStudyByUID(uid);
  if (!doc) return notFound();
  const others = (await getCaseStudies()).filter((d) => d.uid !== uid).slice(0, 4);
  const kpis = doc.kpis || [];
  // Utiliser les données spécifiques si disponibles, sinon fallback sur l'ancienne logique
  const headline = doc.headlineData || [
    doc.year ? String(doc.year) : undefined,
    kpis.find((k) => /surface/i.test(k.label))?.value,
    kpis.find((k) => /(lots?|unit|logement|appartement|meubl)/i.test(k.label))?.value,
    doc.assetClass
  ].filter(Boolean) as string[];

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-[1320px] px-3 md:px-6 xl:px-8 py-16 md:py-20">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Nos réalisations", href: "/nos-realisations" }, { name: doc.title, href: `/nos-realisations/${doc.uid}` }]} className="mb-6" />

        {/* Image left (taller), content right */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-8">
            <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] md:aspect-[3/2]">
              {doc.heroImage?.url && (
                <Image src={doc.heroImage.url} alt={doc.heroImage.alt || doc.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" />
              )}
              <div className="absolute left-3 top-3 z-10"><ComplianceBadge text="Acquis par les associes d'Offstone" /></div>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            {(doc.city || doc.assetClass) && (
              <div className="mb-4 flex items-center gap-3">
                {doc.city && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                    {doc.city}
                  </span>
                )}
                {doc.assetClass && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-black text-white">
                    {doc.assetClass}
                  </span>
                )}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">{doc.title}</h1>
            {/* Résumé paragraphé (même taille que bas) */}
            {doc.excerpt && (
              <div className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
                {doc.excerpt.split(/\n\n|(?<=[\.!?])\s+(?=[A-ZÉÈÎÏÔÀÂÙÊÇ])/).slice(0,2).map((p, i) => (
                  <p key={i} className={i ? "mt-2" : undefined}>{p}</p>
                ))}
              </div>
            )}
            {/* Horizontal headline pills like Aguesseau */}
            
            {doc.kpis?.length ? (
              <div className="mt-5">
                <FactsTable items={doc.kpis} />
              </div>
            ) : null}
          </div>
        </section>

        {headline.length ? (
          <section className="mb-10">
            <HeadlinePillsRow values={headline} />
          </section>
        ) : null}

        <CompliantBanner text={DETAIL_BANNER_TEXT} className="mb-10" />

        {/* Body + timeline */}
        <section className="space-y-8">
          {/* Encadré design avec le texte complet en bas */}
          {(doc.excerpt || doc.body) && (
            <FramedTextBox title={"Détails de l'opération"} excerpt={doc.excerpt} body={doc.body as any} />
          )}

          {/* Carte de localisation */}
          <LocationCard city={doc.city} />
        
        {/* Portefeuille photos */}
        {doc.portfolioImages && doc.portfolioImages.length > 0 && (
          <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#F5F7FA' }}>
            <PortfolioGallery images={doc.portfolioImages} />
          </div>
        )}

          {/* Nos dernières opérations - identiques aux cartes du listing */}
          {others.length > 0 && (
            <section className="mt-12 -mx-3 md:-mx-6 xl:-mx-8 px-3 md:px-6 xl:px-8 py-12" style={{ backgroundColor: '#F7F5F2' }}>
              <div className="mx-auto max-w-[1320px]">
                <h2 className="text-2xl font-semibold mb-6">Nos dernières opérations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {others.slice(0,5).map((s) => (
                    <CaseStudyCard key={s.id} study={s} />
                  ))}
                  <div className="rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-start justify-between" style={{ backgroundColor: '#EFEAE7' }}>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Devenez membre pour investir</h3>
                      <p className="mt-2 text-sm text-gray-600">Rejoignez Offstone et accédez aux futures opérations après éligibilité.</p>
                    </div>
                    <Link href="/candidatez" className="mt-4 inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90">Candidatez</Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          <footer className="hidden mt-10 flex flex-wrap gap-3">
            <Link href="/nos-realisations" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
              ← Retour aux réalisations
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90">
              Parler à un expert
            </Link>
          </footer>
        </section>
        <section className="mt-12 rounded-2xl px-4 md:px-6 py-8" style={{ backgroundColor: '#F5F7FA' }}>
          <div className="flex flex-wrap gap-3 mb-6">
            <Link href="/nos-realisations" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">← Retour aux réalisations</Link>
            <Link href="/contact" className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90">Parler à un expert</Link>
          </div>
          <ProCTAFooter />
        </section>
      </main>
    </>
  );
}
