"use client";

import React from "react";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";
import AnalyticsLink from "@/components/AnalyticsLink";

// Minimal slice renderers used in articles

function CalloutSlice({ slice }: any) {
  const variant = slice.primary?.variant || "info";
  const bg = variant === "warning" ? "bg-amber-50 border-amber-200" : variant === "danger" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200";
  return (
    <div className={`my-8 p-6 rounded-lg border ${bg}`}>
      <div className="prose prose-neutral"><PrismicRichText field={slice.primary?.content} /></div>
    </div>
  );
}

function PullQuoteSlice({ slice }: any) {
  const quote = slice.primary?.quote || "";
  const source = slice.primary?.source || "";
  return (
    <blockquote className="my-10 p-6 border-l-4 border-gray-300 italic text-gray-800">
      <p className="text-xl">“{quote}”</p>
      {source && <cite className="block mt-2 not-italic text-sm text-gray-500">— {source}</cite>}
    </blockquote>
  );
}

function ImageCaptionSlice({ slice }: any) {
  const img = slice.primary?.image;
  const caption = slice.primary?.caption;
  if (!img?.url) return null;
  return (
    <figure className="my-10">
      <div className="relative w-full aspect-[16/9] bg-gray-100">
        <Image src={img.url} alt={img.alt || caption || ""} fill className="object-cover" />
      </div>
      {caption && <figcaption className="text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  );
}

function VideoEmbedSlice({ slice }: any) {
  const html = slice.primary?.embed?.html;
  const url = slice.primary?.embed?.embed_url;
  if (!html && !url) return null;
  const onClick = () => {
    try {
      // lazy import to avoid circular dep
      import("@/lib/analytics").then(({ trackEvent }) => trackEvent({ name: "video_play", params: { url: url || "embed" } }));
    } catch {}
  };
  return <div className="my-8 aspect-video" onClick={onClick} dangerouslySetInnerHTML={{ __html: html || `<iframe src='${url}' class='w-full h-full' allowfullscreen></iframe>` }} />;
}

function KPIStatsSlice({ slice }: any) {
  const items = Array.isArray(slice.items) ? slice.items : [];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      {items.map((it: any, idx: number) => (
        <div key={idx} className="p-4 rounded-lg bg-gray-50">
          <div className="text-sm text-gray-500">{it.label}</div>
          <div className="text-lg font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function FAQBlockSlice({ slice }: any) {
  const items = Array.isArray(slice.items) ? slice.items : [];
  return (
    <div className="my-10 space-y-3">
      {items.map((it: any, idx: number) => (
        <details key={idx} className="group border rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-gray-900">{it.question}</summary>
          <div className="mt-3 prose prose-neutral">
            <PrismicRichText field={it.answer} />
          </div>
        </details>
      ))}
    </div>
  );
}

function KeyTakeawaysSlice({ slice }: any) {
  const items = Array.isArray(slice.items) ? slice.items : [];
  return (
    <ul className="my-8 list-disc pl-6 space-y-1">
      {items.map((it: any, idx: number) => (
        <li key={idx}>{it.item}</li>
      ))}
    </ul>
  );
}

function DownloadCTASlice({ slice }: any) {
  const title = slice.primary?.title || "Télécharger";
  const description = slice.primary?.description || "";
  const file = slice.primary?.file;
  if (!file?.url) return null;
  return (
    <div className="my-8 p-6 rounded-lg border bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <AnalyticsLink href={file.url} target="_blank" rel="noopener" event="resource_download" eventParams={{ type: "download", title }} className="inline-block px-4 py-2 rounded bg-blue-600 text-white">Télécharger</AnalyticsLink>
    </div>
  );
}

function CTAInlineSlice({ slice }: any) {
  const label = slice.primary?.label || "Commencer";
  const href = slice.primary?.href?.url || "/investir";
  return (
    <a href={href} className="inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">{label}</a>
  );
}

function DividerSlice() {
  return <hr className="my-10 border-gray-200" />;
}

function RichTextBodySlice({ slice }: any) {
  return <div className="prose prose-neutral max-w-none"><PrismicRichText field={slice.primary?.content} /></div>;
}

function RelatedContentSlice({ slice }: any) {
  const items = Array.isArray(slice.items) ? slice.items : [];
  if (!items.length) return null;
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-4">À lire ensuite</h2>
      <ul className="space-y-2">
        {items.map((it: any, idx: number) => {
          const link = it.article;
          if (!link) return null;
          const href = link?.uid ? `/ressources/${link.uid}` : link?.url || "#"; // legacy redirect will canonicalize
          const title = link?.data?.title || link?.uid || "Article";
          return (
            <li key={idx}>
              <Link href={href} className="text-blue-700 hover:underline">{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const components = {
  callout: CalloutSlice,
  pull_quote: PullQuoteSlice,
  image_caption: ImageCaptionSlice,
  video_embed: VideoEmbedSlice,
  kpi_stats: KPIStatsSlice,
  faq_block: FAQBlockSlice,
  key_takeaways: KeyTakeawaysSlice,
  download_cta: DownloadCTASlice,
  cta_inline: CTAInlineSlice,
  divider: DividerSlice,
  rich_text: RichTextBodySlice,
  related_content: RelatedContentSlice,
} as const;

export default function ArticleSliceZone({ slices }: { slices: any[] }) {
  if (!Array.isArray(slices) || slices.length === 0) return null;
  return <SliceZone slices={slices} components={components as any} />;
}
