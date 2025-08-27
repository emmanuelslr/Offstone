// /components/article/MobileTOC.tsx
"use client";
import type { TocItem } from "@/lib/toc";

export default function MobileTOC({ items }: { items: TocItem[] }) {
  if (!items?.length) return null;
  
  return (
    <details className="lg:hidden mt-6 rounded-lg border border-gray-200 p-5 bg-gray-50">
      <summary className="cursor-pointer font-medium text-gray-900 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Sommaire de l&apos;article
        </span>
        <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map(i => (
          <li key={i.id} className={i.level === 3 ? "ml-5" : ""}>
            <a 
              href={`#${i.id}`} 
              className="block px-3 py-2 hover:text-gray-900 transition-colors text-gray-600 rounded leading-relaxed"
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
