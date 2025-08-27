import Link from "next/link";

export default function CoInvestCTA() {
  return (
    <div className="my-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-4">
          <span className="text-3xl">🤝</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Co-investir à nos côtés
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Rejoignez notre communauté d&apos;investisseurs et accédez à nos opportunités d&apos;investissement immobilier sélectionnées. 
          Horizon 4-7 ans, tickets dès 20k€.
        </p>
        <div className="space-y-3">
          <Link
            href="/investir"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Prendre rendez-vous
          </Link>
          <div className="text-xs text-gray-500">
            Échange confidentiel · Sans engagement
          </div>
        </div>
      </div>
    </div>
  );
}
