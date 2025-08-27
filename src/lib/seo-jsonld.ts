import { toCanonical } from "./seo";

export interface CollectionPageData {
  url: string;
  name: string;
  description: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answerHTML: string;
}

export interface BlogPostingData {
  url: string;
  headline: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  description?: string;
}

export function collectionPageLD(data: CollectionPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "mainEntity": {
      "@type": "ItemList",
      "name": data.name,
      "description": data.description
    },
    "publisher": {
      "@type": "Organization",
      "name": "Offstone",
      "logo": {
        "@type": "ImageObject",
        "url": toCanonical("/logos/x-bleu.svg")
      }
    }
  };
}

export function breadcrumbLD(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function faqPageLD(items: FAQItem[]) {
  if (!items.length) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answerHTML
      }
    }))
  };
}

export function blogPostingLD(data: BlogPostingData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.headline,
    "description": data.description || "",
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "mainEntityOfPage": data.url,
    "url": data.url,
    "author": {
      "@type": "Organization",
      "name": data.author || "Équipe Offstone"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Offstone",
      "logo": {
        "@type": "ImageObject",
        "url": toCanonical("/logos/x-bleu.svg")
      }
    },
    "image": data.image || toCanonical("/logos/x-bleu.svg"),
    "wordCount": data.description ? data.description.split(' ').length * 20 : 1000 // Estimation
  };
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}
