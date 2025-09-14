import React from "react";

export interface JonathanLandingProps {
  articles: {
    uid: string;
    title: string;
    excerpt: string;
    detailUrl: string;
  }[];
  press: {
    uid: string;
    title: string;
    excerpt: string;
    detailUrl: string;
  }[];
}

const JonathanLanding: React.FC<JonathanLandingProps> = ({ articles, press }) => (
  <div>
    <section>
      <h2 className="text-xl font-bold mb-4">Derniers articles propriétaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <div key={a.uid} className="border rounded p-4">
            <h3 className="font-semibold mb-2">{a.title}</h3>
            <div className="mb-2">{a.excerpt}</div>
            <a href={a.detailUrl} className="text-blue-600 underline">Lire l’article</a>
          </div>
        ))}
      </div>
    </section>
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Dans la presse</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {press.map((p) => (
          <div key={p.uid} className="border rounded p-4">
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <div className="mb-2">{p.excerpt}</div>
            <a href={p.detailUrl} className="text-blue-600 underline">Lire la fiche</a>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default JonathanLanding;
