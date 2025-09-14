// /components/article/StickyTOC.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/toc";

export default function StickyTOC({
  items,
  top = 96,           // offset depuis le haut (px)
  showProgress = true, // rail de progression à gauche
}: { items: TocItem[]; top?: number; showProgress?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ids = useMemo(() => items.map(i => i.id), [items]);

  // Observer pour l'item actif
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: `-${top + 8}px 0px -60% 0px`, threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids, top]);

  // Listener pour la progression du scroll dans l'article
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!items.length) {
        // console.log('🚀 No items for scroll progress');
        return;
      }

      // Approche simplifiée basée sur le scroll global de la page
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (documentHeight <= 0) {
        // console.log('🚀 Document too short for scroll progress');
        return;
      }
      
      const progress = Math.max(0, Math.min(100, (scrollY / documentHeight) * 100));
      
      // console.log('🚀 Scroll Progress (simple):', { scrollY, documentHeight, progress });
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Calcul initial
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [items]);

  if (!items?.length) return null;

  // console.log('🎯 TOC Render:', { scrollProgress, showProgress, itemCount: items.length });

  return (
    <aside className="hidden lg:block sticky" style={{ top }}>
      <nav aria-label="Sommaire de l'article" className="relative pr-4">
        {showProgress && (
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-200">
            <div className="w-[2px] bg-gray-900 transition-all duration-300" style={{ height: `${scrollProgress}%` }} />
          </div>
        )}
        <div className="pl-4 text-sm">
          <div className="mb-3 font-medium text-gray-800">Sommaire</div>
          <ul className="space-y-2 mb-8">
            {items.map(i => (
              <li key={i.id} className={i.level === 3 ? "ml-4" : ""}>
                <a
                  href={`#${i.id}`}
                  className={`block rounded px-3 py-2 hover:text-gray-900 transition-colors leading-relaxed ${
                    active === i.id 
                      ? "bg-gray-100 font-medium text-gray-900" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  aria-current={active === i.id ? "true" : undefined}
                >
                  {i.text}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Call-to-Action Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Investir avec Offstone
              </h4>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Découvrez nos opportunités d'investissement immobilier avec des tickets dès 20k€.
              </p>
              <a 
                href="/investir" 
                className="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Découvrir nos projets
              </a>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
