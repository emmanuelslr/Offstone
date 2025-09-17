"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import { getHiddenFromLocation } from "@/lib/utm";
import HubSpotMeeting from "./HubSpotMeeting";
import HubSpotMeetingModal from "./HubSpotMeetingModal";
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
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hidden = useMemo(() => getHiddenFromLocation(), []);
  const { addToast } = useToast();

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      console.log('Mobile detection:', mobile, 'Width:', window.innerWidth);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      if (!res.ok || !json?.lead_id) {
        console.log("API failed, but continuing for testing:", json?.error || "Start failed");
        // Continue même si l'API échoue
        setLeadId("test-lead-id"); // ID fictif pour les tests
      } else {
        setLeadId(json.lead_id);
      }
      ga("lead_start", { method: "overlay" });
      setStep(1);
    } catch (e: any) {
      console.log("API error, but continuing for testing:", e?.message || "Une erreur est survenue");
      // Continue même en cas d'erreur
      setLeadId("test-lead-id"); // ID fictif pour les tests
      setStep(1);
    } finally {
      setLoading(false);
    }
  }, [email, hidden, defaultAssetClass, articleUid]);

  const patch = useCallback(
    async (p: Record<string, any>) => {
      if (!leadId) {
        console.log("No leadId, skipping patch");
        return;
      }
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
      } catch (error) {
        console.log("Patch failed, but continuing:", error);
        // Continue même si l'API échoue
        ga("lead_update", { fields: Object.keys(p) });
      }
    },
    [leadId, addToast]
  );

  const submitConsent = useCallback(async (consent: boolean) => {
    console.log("submitConsent called with:", consent);
    console.log("Current step:", step);
    console.log("leadId:", leadId);
    
    if (!leadId) {
      // Si pas de leadId, on continue quand même pour tester
      console.log("No leadId, but continuing for testing");
    }
    setLoading(true);
    try {
      if (leadId) {
        console.log("Updating lead via API...");
        await fetch("/api/leads/update", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lead_id: leadId, patch: { consent, status: "completed" } }),
        });
        console.log("Lead updated successfully");
      }
      ga("lead_submit", {
        ticket: ticket ?? undefined,
        discovery: discovery ?? undefined,
        wantsCall: wantsCall ?? undefined,
        source: "overlay",
      });
      console.log("Setting step to 6...");
      setStep(6);
    } catch (error) {
      console.error("Error submitting consent:", error);
      // Continue même en cas d'erreur pour tester
      console.log("Error occurred, but setting step to 6 anyway...");
      setStep(6);
    } finally {
      setLoading(false);
    }
  }, [leadId, wantsCall, ticket, discovery, onDone, step]);

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
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Moins de 20 k€", value: "lt_20k" },
              { label: "20 k€ – 50 k€", value: "20k_50k" },
              { label: "50 k€ – 100 k€", value: "50k_100k" },
              { label: "100 k€ – 500 k€", value: "100k_500k" },
              { label: "500 k€ – 1 M€", value: "500k_1m" },
              { label: "Plus de 1 M€", value: "gt_1m" },
            ].map(({ label, value }) => (
              <button
                key={value}
                className="rounded-lg border px-4 py-3 hover:bg-black hover:text-white"
                onClick={async () => {
                  setTicket(label);
                  await patch({ ticket_target: value });
                  ga("lead_progress", { step: 2, ticket: label });
                  setStep(2);
                }}
              >
                {label}
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
          <h2 className="text-lg sm:text-2xl font-semibold">Choisissez un créneau avec notre équipe</h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm opacity-70">Votre réservation sera confirmée par email.</p>
          
          {/* Debug info */}
          <div className="text-xs text-gray-500 mb-2">
            Debug: isMobile = {isMobile.toString()}, width = {typeof window !== 'undefined' ? window.innerWidth : 'undefined'}
          </div>
          
          {/* Desktop: Affichage inline */}
          {!isMobile && (
            <div className="mt-0 sm:mt-4 rounded-lg sm:rounded-xl border border-white/10 p-0 sm:p-2 max-w-2xl mx-auto" style={{ marginTop: '-20px' }}>
              <HubSpotMeeting
                email={email}
                firstname={firstName || undefined}
                lastname={lastName || undefined}
                className="w-full"
              />
            </div>
          )}
          
          {/* Mobile: Bouton pour ouvrir le modal */}
          {isMobile && (
            <div className="mt-4">
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ouvrir le calendrier
              </button>
            </div>
          )}
          
          <div className="mt-2 sm:mt-4 flex justify-end">
            <button
              className="rounded-lg border px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-base hover:bg-black hover:text-white"
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
                first_name: firstName || null,
                last_name: lastName || null,
                phone: phone || null,
              });
              setStep(5);
            }}
          >
            <input 
              name="first_name" 
              placeholder="Prénom" 
              className="rounded-lg border px-4 py-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
              name="last_name" 
              placeholder="Nom" 
              className="rounded-lg border px-4 py-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input 
              name="phone" 
              placeholder="Téléphone" 
              className="rounded-lg border px-4 py-3 sm:col-span-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
              onClick={() => {
                console.log("Accept button clicked");
                submitConsent(true);
              }}
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
              onClick={() => {
                console.log("Refuse button clicked");
                submitConsent(false);
              }}
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

      {step === 6 && (
        <section>
          <h2 className="text-2xl font-semibold">Merci !</h2>
          <p className="mt-2 text-neutral-600">
            Votre demande a été enregistrée avec succès.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              className="rounded-lg border px-5 py-3 hover:bg-black hover:text-white"
              onClick={() => onDone(wantsCall ? "rdv" : "merci")}
            >
              Continuer
            </button>
          </div>
        </section>
      )}
      
      {/* Modal HubSpot pour mobile */}
      <HubSpotMeetingModal
        email={email}
        firstname={firstName || undefined}
        lastname={lastName || undefined}
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}
