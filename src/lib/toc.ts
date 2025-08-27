// /lib/toc.ts
export type TocItem = { id: string; text: string; level: 2 | 3 };

// Slugifier un titre (accents -> ascii, espaces -> -, only a-z0-9-)
export function slugify(str: string) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Retourne la liste des H2/H3 + un générateur d'ID stable (dédoublonnage)
export function extractHeadings(rich: any[]): TocItem[] {
  const used = new Map<string, number>();
  const items: TocItem[] = [];

  for (const block of rich || []) {
    if (block?.type === "heading2" || block?.type === "heading3") {
      const txt = (block.text || "").trim();
      const base = slugify(txt) || "section";
      const n = used.get(base) || 0;
      used.set(base, n + 1);
      const id = n ? `${base}-${n}` : base;
      items.push({ id, text: txt, level: block.type === "heading2" ? 2 : 3 });
    }
  }
  return items;
}

// Serializer helper côté rendu pour injecter les mêmes IDs aux H2/H3
export function headingIdFromTextFactory() {
  const used = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text || "section");
    const n = used.get(base) || 0;
    used.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
}
