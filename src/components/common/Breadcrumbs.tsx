import React from "react";
import Link from "next/link";
import { toCanonical } from "@/lib/seo";
import { breadcrumbLD } from "@/lib/seo-jsonld";

type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const data = breadcrumbLD(items.map((it) => ({ name: it.name, url: toCanonical(it.href) })));
  return (
    <nav aria-label="Fil d'Ariane" className={`text-sm text-gray-600 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="inline-flex items-center gap-2">
            {i > 0 && <span aria-hidden>›</span>}
            {i < items.length - 1 ? (
              <Link href={it.href} className="hover:underline">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-gray-800">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </nav>
  );
}

