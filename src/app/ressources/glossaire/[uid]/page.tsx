import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "@/app/home-page/components/ProCTAFooter";
import { createClient } from "@/lib/prismicio";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD, faqPageLD } from "@/lib/seo-jsonld";
import { PrismicRichText } from "@prismicio/react";

export const revalidate = 300;

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("glossary_term" as any, uid).catch(() => null);
  if (!doc) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;
  const title = data.seo?.[0]?.meta_title || data.term || "Glossaire";
  const description = data.seo?.[0]?.meta_description || "";
  const canonical = data.seo?.[0]?.canonical_url?.url || toCanonical(`/ressources/glossaire/${uid}`);
  const noindex = data.seo?.[0]?.noindex === true;
  return { title, description, alternates: { canonical }, robots: noindex ? { index: false, follow: true } : { index: true, follow: true } };
}

export default async function GlossaryTermPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await client.getByUID("glossary_term" as any, uid).catch(() => null);
  if (!doc) return notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = doc.data as any;

  const faq = faqPageLD([
    { question: data.term || "Terme", answerHTML: (Array.isArray(data.definition_richtext) ? data.definition_richtext : []).map((b: any) => b.text || "").join("\n") }
  ]);
  const breadcrumbData = breadcrumbLD([
    { name: "Accueil", url: toCanonical("/") },
    { name: "Ressources", url: toCanonical("/ressources") },
    { name: "Glossaire", url: toCanonical("/ressources/glossaire") },
    { name: data.term || uid, url: toCanonical(`/ressources/glossaire/${uid}`) },
  ]);

  return (
    <>
      <Navbar forceWhiteStyle />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{data.term || "Glossaire"}</h1>
        <div className="prose prose-neutral mb-8">
          <PrismicRichText field={data.definition_richtext} />
        </div>
        {Array.isArray(data.example_richtext) && (
          <section className="prose prose-neutral mb-6">
            <h2>Exemple chiffré</h2>
            <PrismicRichText field={data.example_richtext} />
          </section>
        )}
        {Array.isArray(data.mistakes_richtext) && (
          <section className="prose prose-neutral">
            <h2>Erreurs fréquentes</h2>
            <PrismicRichText field={data.mistakes_richtext} />
          </section>
        )}
      </main>
      <ProCTAFooter utm_campaign="ressources" />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

