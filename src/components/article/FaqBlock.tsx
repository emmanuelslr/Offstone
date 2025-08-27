"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

interface FaqItem {
  question: string;
  answer: any; // RichTextField from Prismic
}

interface FaqBlockProps {
  items: FaqItem[];
  maxItems?: number;
}

export function buildFaqLD(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": extractTextFromRichText(item.answer)
      }
    }))
  };
}

function extractTextFromRichText(richText: any): string {
  if (!richText || !Array.isArray(richText)) return "";
  
  return richText
    .map((block: any) => {
      if (block.type === "paragraph" && block.text) {
        return block.text;
      }
      return "";
    })
    .join(" ")
    .trim();
}

export default function FaqBlock({ items, maxItems = 3 }: FaqBlockProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First item open by default
  
  if (!items || items.length === 0) return null;

  const displayedItems = items.slice(0, maxItems);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="my-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ❓ Questions fréquentes
          </h2>
          <p className="text-gray-600">
            Les réponses aux questions les plus posées sur ce sujet
          </p>
        </div>

        <div className="space-y-4">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openItems.has(index) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed pt-4">
                    <PrismicRichText field={item.answer} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {items.length > maxItems && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {items.length - maxItems} autre{items.length - maxItems > 1 ? "s" : ""} question{items.length - maxItems > 1 ? "s" : ""} disponible{items.length - maxItems > 1 ? "s" : ""} dans la section complète
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
