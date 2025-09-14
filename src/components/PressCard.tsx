import React from "react";

export interface PressCardProps {
  press: {
    uid: string;
    source: string;
    date: string;
    title: string;
    summary: string;
    detailUrl: string;
  };
}

const PressCard: React.FC<PressCardProps> = ({ press }) => (
  <div className="border rounded p-4 mb-4">
    <div className="text-sm text-gray-500">{press.source} – {press.date}</div>
    <h3 className="font-bold text-lg mb-2">{press.title}</h3>
    <div className="mb-2">{press.summary}</div>
    <a href={press.detailUrl} className="text-blue-600 underline">Lire la fiche</a>
  </div>
);

export default PressCard;
