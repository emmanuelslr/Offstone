"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleHeadings = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0% -35% 0%", // Trigger when heading is in the middle third
        threshold: 0
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky headers
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false); // Close mobile menu
  };

  return (
    <>
      {/* Desktop TOC - Sticky Sidebar */}
      <div className="hidden xl:block fixed left-8 top-1/2 transform -translate-y-1/2 w-64 max-h-96 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg border p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sommaire</h3>
          <nav>
            <ul className="space-y-2">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToHeading(id)}
                    className={`block w-full text-left text-sm transition-colors hover:text-blue-600 ${
                      level === 3 ? "pl-3" : ""
                    } ${
                      activeId === id
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile TOC - Collapsible */}
      <div className="xl:hidden mb-8">
        <details 
          className="bg-gray-50 rounded-lg border"
          open={isOpen}
          onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer select-none flex items-center justify-between">
            <span>📖 Sommaire de l&apos;article</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-4 pb-4">
            <nav>
              <ul className="space-y-2">
                {headings.map(({ id, text, level }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToHeading(id)}
                      className={`block w-full text-left text-sm py-1 transition-colors hover:text-blue-600 ${
                        level === 3 ? "pl-4" : ""
                      } ${
                        activeId === id
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </details>
      </div>
    </>
  );
}
