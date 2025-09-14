import OpenLeadOverlay from "@/components/forms/OpenLeadOverlay";

export default function RessourcesHub() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Ressources</h1>
      <p className="mt-2 text-neutral-600">Contenus, analyses et études Offstone.</p>

      <div className="mt-8">
        <OpenLeadOverlay buttonLabel="Investir à nos côtés" defaultAssetClass="general" />
      </div>
    </main>
  );
}

