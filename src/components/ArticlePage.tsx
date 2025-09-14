import React from "react";
import ComplianceNote from "./ComplianceNote";

export interface ArticlePageProps {
  article: {
    title: string;
    date: string;
    hasComplianceNote?: boolean;
    // ...autres champs nécessaires
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => (
  <article>
    <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
    <div className="text-sm text-gray-500 mb-2">{article.date}</div>
    {/* Render body, content_sections, faq_items, etc. */}
    <div>{/* ...StructuredText rendering... */}</div>
    {/* Bloc statique si avertissement réglementaire absent */}
    {!article.hasComplianceNote && <ComplianceNote />}
  </article>
);

export default ArticlePage;
