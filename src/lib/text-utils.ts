interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens
    .trim();
}

export function generateUniqueIds(headings: { text: string; level: 2 | 3 }[]): Heading[] {
  const usedIds = new Set<string>();
  
  return headings.map(heading => {
    let baseId = slugify(heading.text);
    let finalId = baseId;
    let counter = 1;
    
    while (usedIds.has(finalId)) {
      finalId = `${baseId}-${counter}`;
      counter++;
    }
    
    usedIds.add(finalId);
    return {
      id: finalId,
      text: heading.text,
      level: heading.level
    };
  });
}
