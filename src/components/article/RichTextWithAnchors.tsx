// /components/article/RichTextWithAnchors.tsx
import { PrismicRichText, JSXMapSerializer } from "@prismicio/react";
import { headingIdFromTextFactory } from "@/lib/toc";

// Server component : pas de "use client" ici
export default function RichTextWithAnchors({ field }: { field: any[] }) {
  const idFor = headingIdFromTextFactory();

  const components: JSXMapSerializer = {
    heading2: ({ children, node }) => {
      const text = (node as any)?.text || "";
      const id = idFor(text);
      return <h2 id={id} className="scroll-mt-28 text-2xl font-bold mt-16 mb-6 text-gray-900 leading-tight">{children}</h2>;
    },
    heading3: ({ children, node }) => {
      const text = (node as any)?.text || "";
      const id = idFor(text);
      return <h3 id={id} className="scroll-mt-28 text-xl font-semibold mt-12 mb-4 text-gray-800 leading-tight">{children}</h3>;
    },
  };

  return <PrismicRichText field={field} components={components} />;
}
