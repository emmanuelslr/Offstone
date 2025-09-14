// /components/article/RichTextWithAnchors.tsx
import { PrismicRichText, JSXMapSerializer } from "@prismicio/react";
import { headingIdFromTextFactory } from "@/lib/toc";

// Server component : pas de "use client" ici
export default function RichTextWithAnchors({ field }: { field: any[] }) {
  const idFor = headingIdFromTextFactory();

  const components: JSXMapSerializer = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heading1: ({ children }: any) => {
      // Demote H1 to H2 in body (H1 reserved for title)
      const text = typeof children === 'string' ? children : Array.isArray(children) ? children.join(' ') : children?.toString() || "";
      const id = idFor(text);
      return <h2 id={id} className="scroll-mt-28 text-2xl font-bold mt-16 mb-6 text-gray-900 leading-tight">{children}</h2>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heading2: ({ children }: any) => {
      // Extraire le texte des children pour générer l'ID
      const text = typeof children === 'string' ? children : 
                   Array.isArray(children) ? children.join(' ') : 
                   children?.toString() || "";
      const id = idFor(text);
      return <h2 id={id} className="scroll-mt-28 text-2xl font-bold mt-16 mb-6 text-gray-900 leading-tight">{children}</h2>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heading3: ({ children }: any) => {
      // Extraire le texte des children pour générer l'ID
      const text = typeof children === 'string' ? children : 
                   Array.isArray(children) ? children.join(' ') : 
                   children?.toString() || "";
      const id = idFor(text);
      return <h3 id={id} className="scroll-mt-28 text-xl font-semibold mt-12 mb-4 text-gray-800 leading-tight">{children}</h3>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hyperlink: ({ node, children }: any) => {
      const url = (node as any).data?.url || (node as any).data?.link_type === 'Web' ? (node as any).data?.url : undefined;
      const isExternal = url ? /^https?:\/\//i.test(url) : false;
      const rel = isExternal ? 'noopener' : undefined;
      const target = isExternal ? '_blank' : undefined;
      return (
        <a href={url} rel={rel} target={target} className="text-blue-700 hover:underline">
          {children}
        </a>
      );
    },
  };

  return <PrismicRichText field={field as any} components={components} />;
}
