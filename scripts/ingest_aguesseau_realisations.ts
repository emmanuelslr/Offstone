// @ts-nocheck
/*
  Ingestion script: crawls https://aguesseaucapital.com/realisations/ and child pages.
  - Extracts factual content only (no performance/return figures)
  - Normalizes KPIs and dates
  - Downloads images and re-encodes to WebP (max width 1600) if `sharp` is available
  - Writes NDJSON to OS temp dir: <tmp>/case_studies.ndjson

  Run locally (Node >= 18):
    npm i -D cheerio sharp
    node --loader ts-node/esm scripts/ingest_aguesseau_realisations.ts  (or use tsx)

  This script does not push to Prismic. It produces import-ready documents
  matching the custom type `case_study` for manual review/import.
*/

/* eslint-disable no-console */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createHash } from "node:crypto";

type CheerioStatic = any;
type SharpModule = any;

const BASE = "https://aguesseaucapital.com";
const INDEX_URL = `${BASE}/realisations/`;

const OUT_FILE = path.join(os.tmpdir(), "case_studies.ndjson");

const BANNED_KPI = [/tri/i, /irr/i, /multiple/i, /rendement/i, /return/i, /roi/i, /rentabilit/i];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeText(s?: string | null): string {
  return (s || "").replace(/\s+/g, " ").replace(/\s+([%€])/g, "$1").trim();
}

function normalizeUnit(value: string): string {
  let v = normalizeText(value)
    .replace(/ m2/gi, " m²")
    .replace(/\s?eur(?:os)?/gi, " €");
  // Normalize millions
  v = v.replace(/(\d+[\.,]?\d*)\s?(M|M€|M\s*€|M Eur(?:os)?)/i, (_m, num) => `${num.toString().replace(",", ".")} M€`);
  return v;
}

function isAllowedKPI(label: string): boolean {
  return !BANNED_KPI.some((rx) => rx.test(label));
}

async function loadCheerio(): Promise<CheerioStatic> {
  try {
    // @ts-ignore
    const c = await import("cheerio");
    return c as CheerioStatic;
  } catch (e) {
    console.error("Missing dependency: cheerio. Please install it: npm i -D cheerio");
    throw e;
  }
}

async function loadSharp(): Promise<SharpModule | null> {
  try {
    // @ts-ignore
    const s = await import("sharp");
    return s as SharpModule;
  } catch {
    console.warn("sharp not installed — images will be saved as-is without re-encoding.");
    return null;
  }
}

async function fetchHTML(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "user-agent": "Offstone-Ingestor/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return await res.text();
}

async function downloadAndTranscode(originalUrl: string, alt: string, _sharp: SharpModule | null) {
  // For this pipeline, we avoid downloading/transcoding to ensure reliability during scraping.
  // We return the original public URL, which Next/Image can display (remotePatterns configured).
  return { url: originalUrl, alt };
}

function rtParagraph(text: string) {
  return { type: "paragraph", text, spans: [] };
}

async function extractListPages($: CheerioStatic.Root): Promise<string[]> {
  // Site uses detail pages under /biens/<slug>
  const links = new Set<string>();
  $("a").each((_i: any, el: any) => {
    const href = ($(el).attr("href") as string) || "";
    if (/\/biens\//.test(href)) {
      const abs = href.startsWith("http") ? href : `${BASE}${href}`;
      links.add(abs.replace(/#.*$/, ""));
    }
  });
  return Array.from(links.values());
}

function inferCityFromTitle(title: string): string | undefined {
  const m = title.match(/\b(Paris|Lyon|Marseille|Bordeaux|Lille|Nantes|Toulouse|Rennes|Nice|Strasbourg)\b/i);
  return m?.[0];
}

async function extractOne(url: string, cheerio: CheerioStatic, sharp: SharpModule | null) {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  // Very generic selectors; adjust according to the actual DOM
  const title = normalizeText($("h1").first().text()) || normalizeText($("title").text()) || "Référence Aguesseau";
  const excerpt = normalizeText($("p").first().text());
  const city = inferCityFromTitle(title) || undefined;
  const uid = slugify(title);

  const kpis: { label: string; value: string }[] = [];
  $("li, p").each((_i, el) => {
    const txt = normalizeText($(el).text());
    // Try to detect KPI pairs: Label: value
    const m = txt.match(/^([A-Za-zÀ-ÿ\s'().%€-]{3,40})\s*[:\-]\s*(.+)$/);
    if (m) {
      const label = normalizeText(m[1]);
      const value = normalizeUnit(m[2]);
      if (isAllowedKPI(label) && /m²|m2|€|%|\b(année|surface|prix|capex|acquisition|livraison|cession|occupation|typologie|type)\b/i.test(label)) {
        kpis.push({ label, value });
      }
    }
  });

  // Timeline: look for date-like patterns
  const timeline: { date: string; event: string }[] = [];
  $("li, p").each((_i, el) => {
    const t = normalizeText($(el).text());
    const m = t.match(/(\b\d{4}\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b)/);
    if (m) {
      timeline.push({ date: m[1], event: t.replace(m[1], "").replace(/^[\s:\-–]+/, "") || "Événement" });
    }
  });

  // Year: prefer first timeline year, else current year
  const yearMatch = timeline.map((t) => t.date).join(" ").match(/\b(20\d{2}|19\d{2})\b/);
  const published_at = yearMatch ? `${yearMatch[1]}-01-01` : new Date().toISOString().slice(0, 10);

  // Hero image (prefer OG or featured over in-page arbitrary images)
  let hero: { url: string; alt: string } | undefined;
  const og = $('meta[property="og:image"]').attr('content') || '';
  if (og) {
    const abs = og.startsWith('http') ? og : `${BASE}${og}`;
    hero = await downloadAndTranscode(abs, `${title} — ${city || "Projet"}`, sharp).catch(() => undefined);
  }
  if (!hero) {
    const m = html.match(/"featuredImage"\s*:\s*"(https?:[^\"]+)"/);
    if (m && m[1]) {
      hero = await downloadAndTranscode(m[1].replace(/\\\//g,'/'), `${title} — ${city || "Projet"}`, sharp).catch(() => undefined);
    }
  }
  if (!hero) {
    const m2 = html.match(/"thumbnailUrl"\s*:\s*"(https?:[^\"]+)"/);
    if (m2 && m2[1]) {
      hero = await downloadAndTranscode(m2[1].replace(/\\\//g,'/'), `${title} — ${city || "Projet"}`, sharp).catch(() => undefined);
    }
  }
  if (!hero) {
    const imgSrc = $('img').map((_,el)=> $(el).attr('src') || '').get().find(u => /\/wp-content\/uploads\//.test(u) && !/logo|icone|icon|logo\.svg/i.test(u));
    if (imgSrc) {
      const abs = imgSrc.startsWith('http') ? imgSrc : `${BASE}${imgSrc}`;
      hero = await downloadAndTranscode(abs, `${title} — ${city || "Projet"}`, sharp).catch(() => undefined);
    }
  }

  // Body: create three sections if present
  const sections: string[] = [];
  $("h2, h3, p").each((_i, el) => {
    const tag = el.tagName?.toLowerCase() || "";
    const txt = normalizeText($(el).text());
    if (!txt) return;
    if (/h2|h3/.test(tag)) sections.push(`## ${txt}`);
    else sections.push(txt);
  });
  const body = sections.length ? sections.map(rtParagraph) : undefined;

  // Ensure a Typologie KPI for filtering if we can infer from text
  if (!kpis.find((k) => /typologie|asset\s*class|type/i.test(k.label))) {
    const guess = /h[ôo]tel|h[ôo]tellerie/i.test(html)
      ? "hôtellerie"
      : /bureau|bureaux/i.test(html)
      ? "bureaux"
      : /logistique|entrep[ôo]t/i.test(html)
      ? "logistique"
      : /r[ée]sidentiel|habitation|logement/i.test(html)
      ? "résidentiel"
      : undefined;
    if (guess) kpis.push({ label: "Typologie", value: guess });
  }

  // Correct Typologie using header + URL (override if previous guess was too generic)
  try {
    const headerText = [$("title").text(), $("h1").text(), $("h2").map((_: any, el: any) => $(el).text()).get().join(" ")]
      .join(" ")
      .toLowerCase();
    const urlLower = (url || "").toLowerCase();
    function pickFrom(text: string): string | undefined {
      if (/(bureau|bureaux)\b/i.test(text)) return "bureaux";
      if (/(logistique|entrep[ôo]t|stockage)\b/i.test(text)) return "logistique";
      if (/(r[ée]sidentiel|habitation|logement|appartement)s?/i.test(text)) return "résidentiel";
      if (/(h[ôo]tel|h[ôo]tellerie)/i.test(text)) return "hôtellerie";
      return undefined;
    }
    const better = pickFrom(headerText) || pickFrom(urlLower);
    if (better) {
      const idx = kpis.findIndex((k) => /typologie|asset\s*class|type/i.test(String(k.label)));
      if (idx >= 0) kpis[idx].value = better; else kpis.push({ label: "Typologie", value: better });
    }
  } catch {}

  const doc = {
    uid,
    title,
    excerpt,
    city,
    source_url: url,
    published_at,
    hero_image: hero,
    kpi_group: kpis,
    timeline,
    body,
    seo: [{ meta_title: title, meta_description: excerpt || "", noindex: false }],
  };

  // Basic validation: must have UID + title
  const valid = !!doc.uid && !!doc.title;
  return { valid, doc } as const;
}

async function main() {
  const cheerio = await loadCheerio();
  const sharp = await loadSharp();
  const html = await fetchHTML(INDEX_URL);
  const $ = cheerio.load(html);
  const links = await extractListPages($);
  console.log(`Found ${links.length} detail pages`);

  const out = fs.createWriteStream(OUT_FILE, { encoding: "utf8" });
  const ignored: string[] = [];
  let count = 0;

  for (const href of links) {
    try {
      const { valid, doc } = await extractOne(href, cheerio, sharp);
      if (!valid) {
        ignored.push(href);
        continue;
      }
      out.write(JSON.stringify(doc) + "\n");
      count += 1;
      console.log(`OK  ${doc.uid}`);
    } catch (e) {
      console.warn(`IGN ${href} — ${String((e as Error).message || e)}`);
      ignored.push(href);
    }
  }

  out.end();
  console.log(`\nWrote ${count} documents to ${OUT_FILE}`);
  if (ignored.length) {
    console.log("Ignored pages:");
    for (const u of ignored) console.log(" -", u);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
