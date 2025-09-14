"use client";
import { useCallback, useMemo, useState } from "react";
import { getHiddenFromLocation } from "@/lib/utm";
import CalendlyPanel from "./CalendlyPanel";
import { ga } from "@/lib/ga";
import { useToast } from "@/components/ui/Toast";

type RouteResult = "rdv" | "merci";

export default function LeadMultiStep({
  defaultAssetClass = "general",
  articleUid,
  onDone,
}: {
  defaultAssetClass?: string;
  articleUid?: string;
  onDone: (route: RouteResult) => void;
}) {
  const [step, setStep] = useState(0);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wantsCall, setWantsCall] = useState<boolean | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);
  const [discovery, setDiscovery] = useState<string | null>(null);

  const hidden = useMemo(() => getHiddenFromLocation(), []);
  const { addToast } = useToast();

  const callStart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({
        ...hidden,
        asset_class: defaultAssetClass,
        ...(articleUid ? { article_uid: articleUid } : {}),
      } as Record<string, string>);

      const res = await fetch(`/api/leads/start?${qs.toString()}` , {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok || !json?.lead_id) throw new Error(json?.error || "Start failed");
      setLeadId(json.lead_id);
      ga("lead_start", { method: "overlay" });
      setStep(1);
    } catch (e: any) {
      setError(e?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, [email, hidden, defaultAssetClass, articleUid]);

  const patch = useCallback(
    async (p: Record<string, any>) => {
      if (!leadId) return;
      const doPatch = async () => {
        await fetch("/api/leads/update", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lead_id: leadId, patch: p }),
        });
      };
      try {
        await doPatch();
        ga("lead_update", { fields: Object.keys(p) });
      } catch {
        // Show non-blocking toast and retry silently once after 2s
        addToast("Sauvegarde interrompue, réessai automatique");
        setTimeout(() => {
          doPatch().catch(() => {
            // swallow final failure silently
          });
        }, 2000);
      }
    },
    [leadId, addToast]
  );

  const submitConsent = useCallback(async (consent: boolean) => {
    if (!leadId) return;
    setLoading(true);
    try {
      await fetch("/api/leads/update", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lead_id: leadId, patch: { consent, status: "completed" } }),
      });
      ga("lead_submit", {
        ticket: ticket ?? undefined,
        discovery: discovery ?? undefined,
        wantsCall: wantsCall ?? undefined,
        source: "overlay",
      });
      onDone(wantsCall ? "rdv" : "merci");
    } finally {
      setLoading(false);
    }
  }, [leadId, wantsCall, ticket, discovery, onDone]);

  return (
    <div className="mx-auto max-w-3xl">
      {step === 0 && (
        <section>
          <h2 className="text-2xl font-semibold">Entrez votre adresse mail</h2>
          <p className="mt-2 text-neutral-600">Pour recevoir nos opportunités d'investissement.</p>
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              callStart();
            }}
          >
            <input
              type="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border px-4 py-3"
            />
            <button disabled={loading} className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white">
              {loading ? "..." : "Continuer"}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </section>
      )}

      {step === 1 && (
        <section>
          <h2 className="text-2xl font-semibold">Montant de ticket visé</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["<10k", "20k", "50k", "100k+"].map((v) => (
              <button
                key={v}
                className="rounded-lg border px-4 py-3 hover:bg-black hover:text-white"
                onClick={async () => {
                  setTicket(v);
                  await patch({ ticket_target: v });
                  ga("lead_progress", { step: 2, ticket: v });
                  setStep(2);
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h2 className="text-2xl font-semibold">Comment nous avez‑vous découverts ?</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              "tv",
              "linkedin",
              "google",
              "presse",
              "bouche‑à‑oreille",
              "autre",
            ].map((v) => (
              <button
                key={v}
                className="rounded-lg border px-4 py-3 hover:bg-black hover:text-white"
                onClick={async () => {
                  setDiscovery(v);
                  await patch({ discovery: v });
                  ga("lead_progress", { step: 3, discovery: v });
                  setStep(3);
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2 className="text-2xl font-semibold">Souhaitez‑vous un appel ?</h2>
          <div className="mt-4 flex gap-3">
            <button
              className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white"
              onClick={async () => {
                setWantsCall(true);
                await patch({ wants_call: true });
                ga("lead_progress", { step: 4, wantsCall: true });
                setStep(31);
              }}
            >
              Oui, je réserve un créneau
            </button>
            <button
              className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white"
              onClick={async () => {
                setWantsCall(false);
                await patch({ wants_call: false });
                ga("lead_progress", { step: 4, wantsCall: false });
                setStep(4);
              }}
            >
              Non, pas maintenant
            </button>
          </div>
        </section>
      )}

      {step === 31 && (
        <section>
          <h2 className="text-2xl font-semibold">Réservez un créneau</h2>
          <CalendlyPanel email={email} />
          <div className="mt-4 flex justify-end">
            <button
              className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white"
              onClick={() => setStep(4)}
            >
              Continuer
            </button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section>
          <h2 className="text-2xl font-semibold">Vos coordonnées</h2>
          <form
            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              await patch({
                first_name: fd.get("first_name") || null,
                last_name: fd.get("last_name") || null,
                phone: fd.get("phone") || null,
              });
              setStep(5);
            }}
          >
            <input name="first_name" placeholder="Prénom" className="rounded-lg border px-4 py-3" />
            <input name="last_name" placeholder="Nom" className="rounded-lg border px-4 py-3" />
            <input name="phone" placeholder="Téléphone" className="rounded-lg border px-4 py-3 sm:col-span-2" />
            <div className="sm:col-span-2 flex justify-end">
              <button className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white">Continuer</button>
            </div>
          </form>
        </section>
      )}

      {step === 5 && (
        <section>
          <h2 className="text-2xl font-semibold">Consentement</h2>
          <p className="mt-2 text-neutral-600">
            J’accepte de recevoir des informations et opportunités d’investissement.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              disabled={loading}
              className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white"
              onClick={() => submitConsent(true)}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                  Envoi…
                </span>
              ) : (
                "J’accepte"
              )}
            </button>
            <button
              disabled={loading}
              className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white"
              onClick={() => submitConsent(false)}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                  Envoi…
                </span>
              ) : (
                "Je refuse"
              )}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
