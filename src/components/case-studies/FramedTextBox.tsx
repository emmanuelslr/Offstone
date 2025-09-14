import React from "react";
import type { RichTextField } from "@prismicio/client";

function extractFirstParagraphs(body?: RichTextField, count = 3): string[] {
  if (!Array.isArray(body)) return [];
  const texts: string[] = [];
  for (const n of body as any[]) {
    const t = typeof n?.text === "string" ? n.text.trim() : "";
    if (!t) continue;
    // skip headings (we render them elsewhere)
    if (/^##+\s+/.test(t)) continue;
    texts.push(t);
    if (texts.length >= count) break;
  }
  return texts;
}

export default function FramedTextBox({
  title,
  excerpt,
  body,
}: {
  title?: string;
  excerpt?: string;
  body?: RichTextField;
}) {
  const paras = extractFirstParagraphs(body, 3);
  const hasContent = (excerpt && excerpt.trim().length > 0) || paras.length > 0;
  if (!hasContent) return null;
  return (
    <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 md:p-8">
      {title && (
        <div className="flex items-center space-x-3 mb-4">
          {/* Icône d'information */}
          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      {excerpt && <p className="text-gray-700 leading-relaxed mb-4">{excerpt}</p>}
      {paras.map((p, i) => (
        <p key={i} className="text-gray-600 leading-relaxed mb-3 last:mb-0">
          {p}
        </p>
      ))}
    </section>
  );
}

