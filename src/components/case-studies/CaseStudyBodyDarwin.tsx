import React from "react";
import type { RichTextField } from "@prismicio/client";

function isHeadingLine(text: string): { level: number; content: string } | null {
  const m2 = text.match(/^##\s+(.*)/);
  if (m2) return { level: 3, content: m2[1].trim() };
  const m3 = text.match(/^###\s+(.*)/);
  if (m3) return { level: 4, content: m3[1].trim() };
  return null;
}

export default function CaseStudyBodyDarwin({ body }: { body: RichTextField }) {
  if (!Array.isArray(body) || body.length === 0) return null;
  const nodes = body as any[];
  return (
    <div className="prose prose-neutral max-w-none">
      {nodes.map((n, i) => {
        const text: string = typeof n?.text === "string" ? n.text : "";
        // Drop noisy blocks coming from the source (lists, disclaimers)
        const noise = [
          /^nos dernières opérations/i,
          /^d'autres questions/i,
          /acteur engagé/i,
          /avertissement\s*:/i,
          /un investissement ne peut/i,
          /ag\s*uesseau|aguesseau\s*capital/i,
          /tous droits réservés/i,
          /remplir le formulaire d'investissement/i,
          /^timeline du projet/i,
        ];
        if (noise.some((rx) => rx.test(text))) return null;
        const h = isHeadingLine(text);
        if (h) {
          if (h.level === 3) return <h3 key={i}>{h.content}</h3>;
          if (h.level === 4) return <h4 key={i}>{h.content}</h4>;
        }
        // filter out '## 2024' style standalone metrics lines (now displayed as KPIs)
        if (/^##\s*\d{4}\s*$/.test(text)) return null;
        return <p key={i}>{text}</p>;
      })}
    </div>
  );
}
