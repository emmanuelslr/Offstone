"use client";

import Link from "next/link";
import Image from "next/image";
import { CaseStudyDoc, pickCardKPIs } from "@/lib/prismic/caseStudiesCore";
import { ComplianceBadge } from "@/components/common/CompliantDisclaimer";
import { track } from "@/lib/analytics";

export default function CaseStudyCard({ study, priority = false }: { study: CaseStudyDoc; priority?: boolean }) {
  // Utiliser headlineData si disponible, sinon fallback sur les KPIs
  const displayData = study.headlineData && study.headlineData.length > 0 
    ? study.headlineData.slice(0, 3) 
    : pickCardKPIs(study.kpis, 3).map(k => k.value);

  return (
    <Link
      href={study.url}
      className="group block rounded-lg border border-gray-200 overflow-hidden transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 hover:shadow-lg hover:border-gray-300 case-study-card"
      style={{ backgroundColor: '#EFEAE7' }}
      onClick={() => track('case_card_click', { uid: study.uid, title: study.title, action: 'card' })}
    >
      {/* Media: slightly taller than 16:9 but not too tall */}
      <div className="relative aspect-[7/6] md:aspect-[6/5] overflow-hidden">
        {study.heroImage?.url ? (
          <Image
            src={study.heroImage.url}
            alt={study.heroImage.alt || study.title}
            fill
            className="object-cover transition-transform duration-150 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={(e) => {
              // Fallback en cas d'erreur de chargement d'image
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center"><span class="text-gray-400 text-sm">Image non disponible</span></div>';
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
        <div className="absolute left-3 top-3">
          <ComplianceBadge text="Acquis par les associés d’Offstone" />
        </div>
      </div>
      <div className="p-2 md:p-3 pt-1 pb-3 md:pb-4">
        {(study.city || study.assetClass) && (
          <div className="mb-3 flex items-center gap-2">
            {study.city && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                {study.city}
              </span>
            )}
            {study.assetClass && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-black text-white">
                {study.assetClass}
              </span>
            )}
          </div>
        )}

        <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-1 line-clamp-2">{study.title}</h3>

        {displayData.length > 0 && (
          <div className="text-sm text-gray-700 mb-1.5">
            {displayData.map((data, i) => (
              <span key={i}>
                {data}
                {i < displayData.length - 1 && <span className="mx-1" aria-hidden>·</span>}
              </span>
            ))}
          </div>
        )}

        {study.excerpt && (
          <p className="text-gray-600 line-clamp-2 leading-snug mt-2">
            {study.excerpt}
          </p>
        )}

        <span
          className="mt-3 inline-flex items-center justify-center h-9 rounded-lg px-4 text-sm font-medium border border-[#F7B096] bg-[#F7B096] text-black transition-all group-hover:bg-black group-hover:text-white group-hover:border-black"
          aria-hidden
        >
          Découvrir
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 ml-2">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.19l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
