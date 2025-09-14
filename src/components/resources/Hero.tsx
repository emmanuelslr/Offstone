"use client";


import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeaturedArticle {
  id: string;
  uid: string;
  data: {
    title: string;
    excerpt: string;
    hero_image?: {
      url: string;
      alt?: string;
    };
    asset_class: string[];
    level: string;
    reading_time: number;
    published_at: string;
  };
}

interface HeroProps {
  featuredArticles: FeaturedArticle[];
}

export default function Hero({ featuredArticles }: HeroProps) {
  return (
    <motion.section
      className="bg-[#F7F6F1] pt-32 pb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header - Style Home Page aligné à gauche */}
        <motion.div
          className="text-left mb-20 max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[24px] xs:text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[72px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-black mb-6">
            Formez-vous avec Offstone.
          </h1>
          <p className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg text-gray-700 font-light tracking-wide max-w-4xl mb-8 leading-relaxed">
            Développez votre compréhension de l&apos;investissement immobilier en explorant nos contenus sur les tendances actuelles. Avec Offstone, bâtissez vos connaissances.
          </p>
          {/* CTA Button Orange */}
          <a
            href="/pourquoi-offstone"
            className="inline-flex items-center justify-center h-9 bg-[#F7B096] text-black font-normal rounded-full px-6 text-sm shadow-sm border border-[#F7B096] transition hover:bg-[#111] hover:text-white hover:border-[#111] group"
          >
            Découvrir Offstone
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </motion.div>
        {/* Featured Articles - Style Paraform épuré */}
        <div className="mb-0">
          {/* Affichage conditionnel */}
          {featuredArticles && featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Article principal (50% gauche) */}
              {featuredArticles[0] && (
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={(() => {
                      const anyData: any = featuredArticles[0].data as any;
                      const cat = anyData?.category as string | undefined;
                      return cat ? `/ressources/${cat}/${featuredArticles[0].uid}` : `/ressources`;
                    })()}
                    className="group block transition-all duration-300"
                  >
                    {/* Image hero large */}
                    <div className="relative overflow-hidden h-[28rem] rounded-lg mb-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(featuredArticles[0].data as any).hero_image?.url ? (
                        <Image
                          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                          src={(featuredArticles[0].data as any).hero_image.url}
                          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                          alt={(featuredArticles[0].data as any).hero_image.alt || (featuredArticles[0].data as any).title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-1">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {Array.isArray((featuredArticles[0].data as any).asset_class) && (featuredArticles[0].data as any).asset_class.slice(0, 2).map((asset: string) => (
                        <span key={asset} className="chip chip-small chip-primary">{asset}</span>
                      ))}
                    </div>
                    {/* Titre */}
                    <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors leading-tight">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(featuredArticles[0].data as any).title}
                    </h3>
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-2 leading-relaxed text-xs">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(featuredArticles[0].data as any).excerpt}
                    </p>
                    {/* Meta */}
                    <div className="flex items-center text-xs text-gray-500">
                      <span>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(featuredArticles[0].data as any).reading_time} min de lecture
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {new Date((featuredArticles[0].data as any).published_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}
              {/* Articles secondaires (33% droite) */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {featuredArticles.slice(1, 3).map((article) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const data = article.data as any;
                  return (
                    <Link
                      key={article.id}
                      href={(() => {
                        const d: any = article.data as any;
                        const cat = d?.category as string | undefined;
                        return cat ? `/ressources/${cat}/${article.uid}` : `/ressources`;
                      })()}
                      className="group block transition-all duration-300"
                    >
                      {/* Image en haut */}
                      <div className="relative w-full h-64 overflow-hidden rounded-lg mb-3">
                        {data.hero_image?.url ? (
                          <Image
                            src={data.hero_image.url}
                            alt={data.hero_image.alt || data.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Contenu en dessous */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-1">
                          {Array.isArray(data.asset_class) && data.asset_class.slice(0, 1).map((asset: string) => (
                            <span key={asset} className="chip chip-small chip-primary">{asset}</span>
                          ))}
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors leading-snug">
                          {data.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-1 leading-relaxed line-clamp-2">
                          {data.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{data.reading_time} min</span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(data.published_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-gray-50 rounded-2xl p-12 max-w-lg mx-auto">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun article à la une</h3>
                <p className="text-gray-500 text-sm">Nous préparons du contenu exclusif pour vous</p>
                <p className="text-xs text-gray-400 mt-2">Featured articles: {featuredArticles?.length || 0}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
