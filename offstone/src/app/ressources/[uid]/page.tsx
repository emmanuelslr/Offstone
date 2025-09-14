import OpenLeadOverlay from "@/components/forms/OpenLeadOverlay";

export default function ArticlePage({ params }: { params: { uid: string } }) {
  const { uid } = params;
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Article: {uid}</h1>
      <p className="mt-2 text-neutral-600">Exemple de page article avec overlay.</p>

      <div className="mt-8">
        <OpenLeadOverlay
          buttonLabel="Investir à nos côtés"
          defaultAssetClass="general"
          articleUid={uid}
        />
      </div>
    </main>
  );
}

