import Link from "next/link";

export default function TaxonomyNav() {
  const items = [
    { href: "/ressources/guides", label: "Guides" },
    { href: "/ressources/strategie-theses", label: "Stratégies & thèses", badge: "classes" },
    { href: "/ressources/fiscalite-immobiliere", label: "Fiscalité immobilière" },
    { href: "/ressources/structuration-reglementation", label: "Structuration & réglementation" },
    { href: "/ressources/asset-management-marche", label: "Asset management & marché" },
    { href: "/ressources/etudes-de-cas", label: "Études de cas" },
    { href: "/ressources/glossaire", label: "Glossaire" },
    { href: "/ressources/webinars-videos", label: "Webinars & vidéos" },
    { href: "/ressources/outils-modeles", label: "Outils & modèles" },
    { href: "/ressources/jonathan-anguelov", label: "Jonathan Anguelov" },
    // TEMPORAIREMENT MASQUÉ - QVEMA
    // { href: "/ressources/jonathan-anguelov/qui-veut-etre-mon-associe", label: "Qui veut être mon associé ?" },
  ];

  return (
    <nav className="mx-auto max-w-7xl px-4 pt-8 pb-2" aria-label="Navigation des ressources">
      <ul className="grid grid-cols-2 sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] lg:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="block rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors px-4 py-3 text-sm font-medium text-gray-800"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
