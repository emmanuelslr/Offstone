import React from "react";
import type { TimelineItem } from "@/lib/prismic/caseStudies";

export default function CaseStudyTimeline({ items }: { items: TimelineItem[] }) {
  const list = (items || []).filter((x) => x?.date || x?.event);
  if (!list.length) return null;
  return (
    <section aria-label="Timeline du projet" className="mt-6">
      <div className="border-t border-separator" />
      <ul className="divide-y divide-separator">
        {list.map((it, i) => (
          <li key={i} className="grid grid-cols-1 md:grid-cols-5 items-start py-3">
            <div className="md:col-span-2 text-sm text-gray-600">{it.date}</div>
            <div className="md:col-span-3 text-gray-900">{it.event}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

