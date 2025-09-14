import React from "react";
import ComplianceNote from "./ComplianceNote";

export interface PressDetailProps {
  press: {
    title: string;
    source: string;
    date: string;
    summary: string;
    quote?: string;
    keyPoints?: string[];
    externalUrl: string;
  };
  related: any[];
}

const PressDetail: React.FC<PressDetailProps> = ({ press, related }) => (
  <article>
    <h1 className="text-2xl font-bold mb-2">{press.title}</h1>
    <div className="text-sm text-gray-500 mb-2">{press.source} – {press.date}</div>
    <div className="mb-4">{press.summary}</div>
    {press.quote && <blockquote className="italic border-l-4 pl-4 my-4">“{press.quote}”</blockquote>}
    {press.keyPoints && (
      <ul className="list-disc ml-6 mb-4">
        {press.keyPoints.map((pt: string, i: number) => <li key={i}>{pt}</li>)}
      </ul>
    )}
    {/* CTA and internal links above the fold */}
    <div className="mb-6">
      {/* ...CTAs and internal links... */}
    </div>
    <a href={press.externalUrl} target="_blank" rel="noopener" className="block text-blue-600 underline mt-4">Lire l’article original</a>
    <ComplianceNote />
  </article>
);

export default PressDetail;
