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
  const ids = useMemo(() => items.map(i => i.id), [items]);

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

  if (!items?.length) return null;

  // Progress = position de l'item actif dans la liste
  const activeIndex = active ? Math.max(0, items.findIndex(i => i.id === active)) : 0;
  const progress = items.length > 1 ? ((activeIndex + 1) / items.length) * 100 : (active ? 100 : 0);

  return (
    <aside className="hidden lg:block sticky" style={{ top }}>
      <nav aria-label="Sommaire de l'article" className="relative pr-4">
        {showProgress && (
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-200">
            <div className="w-[2px] bg-gray-900 transition-all duration-300" style={{ height: `${progress}%` }} />
          </div>
        )}
        <div className="pl-4 text-sm">
          <div className="mb-3 font-medium text-gray-800">Sommaire</div>
          <ul className="space-y-2">
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
        </div>
      </nav>
    </aside>
  );
}
