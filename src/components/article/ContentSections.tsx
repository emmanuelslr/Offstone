import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";

interface ContentSection {
  section_title: string;
  section_image?: {
    url: string;
    alt?: string;
  };
  section_content: any; // RichText field
}

interface ContentSectionsProps {
  sections: ContentSection[];
}

export default function ContentSections({ sections }: ContentSectionsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-16">
      {sections.map((section, index) => (
        <section key={index} className="space-y-8">
          {/* Section Title as H2 */}
          {section.section_title && (
            <h2 
              id={`section-${index + 1}`}
              className="text-3xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              {section.section_title}
            </h2>
          )}

          {/* Section Image - 16:9 format */}
          {section.section_image?.url && (
            <div className="image-wrapper bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={section.section_image.url}
                alt={section.section_image.alt || section.section_title || ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Section Content */}
          {section.section_content && (
            <div className="prose prose-neutral prose-reading max-w-none">
              <PrismicRichText field={section.section_content} />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}







