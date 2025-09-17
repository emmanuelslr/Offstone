'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { track } from '@/lib/analytics';

const OPEN_EVENT = 'waitlist:open';

type OpenEventDetail = {
  email: string;
  page_url?: string;
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  asset_class?: string;
};

type StepState = {
  ticket_target?: string; // 'under_5k' | '5_10k' | '10_25k' | '25_50k' | '50_100k' | '100k_plus'
  rdv_choice?: 'now' | 'later';
  discovery?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  consent?: boolean;
};

const stepVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.34, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.28, ease: 'easeIn' } },
};

function LetterBadge({ selected, idx }: { selected: boolean; idx: number }) {
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
        selected ? 'bg-[#F7B096] border-[#F7B096] text-black' : 'border-white/40 text-white/80'
      }`}
    >
      {String.fromCharCode(65 + idx)}
    </span>
  );
}

export default function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [meta, setMeta] = useState<OpenEventDetail | null>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<StepState>({ consent: false });

  const [escArmed, setEscArmed] = useState(false);
  const escTimerRef = useRef<number | null>(null);
  const advanceTimerRef = useRef<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const lastSaveRef = useRef<string>('');

  const under5k = data.ticket_target === 'under_5k';

  const steps = useMemo(() => {
    const s: Array<'ticket' | 'rdv' | 'calendly' | 'discovery' | 'profile' | 'submit' | 'success'> = ['ticket'];
    if (!under5k) s.push('rdv');
    if (!under5k && data.rdv_choice === 'now') s.push('calendly');
    s.push('discovery', 'profile', 'submit', 'success');
    return s;
  }, [under5k, data.rdv_choice]);

  const current = steps[stepIndex] ?? 'ticket';
  const twoCols = current === 'calendly';

  const progress = useMemo(() => {
    const total = steps.length;
    const currentNumber = Math.min(stepIndex + 1, total);
    const pct = Math.round(((currentNumber - 1) / (total - 1)) * 100);
    return { total, currentNumber, pct: isFinite(pct) ? pct : 0 };
  }, [stepIndex, steps]);

  
  const canNext = useMemo(() => {
    if (!leadId) return false;
    switch (current) {
      case 'ticket':
        return Boolean(data.ticket_target);
      case 'rdv':
        return Boolean(data.rdv_choice);
      case 'calendly':
        return true;
      case 'discovery':
        return Boolean(data.discovery);
      case 'profile':
        return Boolean(data.first_name && data.last_name);
      case 'submit':
        return Boolean(data.consent);
      default:
        return true;
    }
  }, [leadId, current, data]);const reset = useCallback(() => {
    setOpen(false);
    setSubmitting(false);
    setLeadId(null);
    setEmail('');
    setMeta(null);
    setStepIndex(0);
    setData({ consent: false });
    setEscArmed(false);
    if (escTimerRef.current) { window.clearTimeout(escTimerRef.current); escTimerRef.current = null; }
    if (advanceTimerRef.current) { window.clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    if (saveTimerRef.current) { window.clearTimeout(saveTimerRef.current); saveTimerRef.current = null; }
  }, []);

  const onOpen = useCallback(async (detail: OpenEventDetail) => {
    const email = (detail.email || '').trim();
    if (!email) return;
    setEmail(email);
    setMeta(detail);
    setOpen(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          page_url: detail.page_url,
          ref: detail.ref,
          utm_source: detail.utm_source,
          utm_medium: detail.utm_medium,
          utm_campaign: detail.utm_campaign,
          utm_content: detail.utm_content,
          utm_term: detail.utm_term,
          asset_class: detail.asset_class || 'retail',
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.id) throw new Error(json?.error || 'Insert failed');
      setLeadId(json.id);
      track('lead_open', { id: json.id, email });
    } catch (e) {
      console.error('Lead insert failed', e);
    }
  }, []);
  // Listen for open event from anywhere and drain any queued payloads
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<OpenEventDetail>;
      if (ce?.detail) onOpen(ce.detail);
    };
    window.addEventListener(OPEN_EVENT, handler as EventListener);
    document.addEventListener(OPEN_EVENT, handler as EventListener);
    try {
      const w: any = window as any;
      const q: any[] | undefined = w.__offstone_waitlist_queue;
      if (Array.isArray(q)) {
        while (q.length) onOpen(q.shift());
      }
      w.offstoneOpenWaitlist = (detail: any) => onOpen(detail);
    } catch {}
    return () => {
      window.removeEventListener(OPEN_EVENT, handler as EventListener);
      document.removeEventListener(OPEN_EVENT, handler as EventListener);
      try { delete (window as any).offstoneOpenWaitlist; } catch {}
    };
  }, [onOpen]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);

  useEffect(() => {
    if (!open || !leadId) return;
    track('lead_step_view', { id: leadId, step: current, index: stepIndex + 1 });
  }, [open, leadId, current, stepIndex]);

  useEffect(() => {
    if (!leadId) return;
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(async () => {
      try {
        const payload: Record<string, any> = {};
        if (data.ticket_target) payload.ticket_target = data.ticket_target;
        if (data.rdv_choice !== undefined) payload.wants_call = !under5k && data.rdv_choice === 'now';
        if (data.discovery) payload.discovery = data.discovery;
        if (data.first_name) payload.first_name = data.first_name;
        if (data.last_name) payload.last_name = data.last_name;
        if (data.phone) payload.phone = data.phone;
        if (typeof data.consent === 'boolean') payload.consent = data.consent;
        if (meta?.page_url) payload.page_url = meta.page_url;
        if (meta?.ref) payload.ref = meta.ref;
        if (meta?.utm_source) payload.utm_source = meta.utm_source;
        if (meta?.utm_medium) payload.utm_medium = meta.utm_medium;
        if (meta?.utm_campaign) payload.utm_campaign = meta.utm_campaign;
        if (meta?.utm_content) payload.utm_content = meta.utm_content;
        if (meta?.utm_term) payload.utm_term = meta.utm_term;
        if (meta?.asset_class) payload.asset_class = meta.asset_class;
        const s = JSON.stringify(payload);
        if (!payload || Object.keys(payload).length === 0) return;
        if (s === lastSaveRef.current) return;
        lastSaveRef.current = s;
        await fetch(`/api/leads/${leadId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: s,
        });
        track('lead_partial_save', { id: leadId, step: current });
      } catch {}
    }, 500) as unknown as number;
    return () => { if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current); };
  }, [data, meta, leadId, current, under5k]);

  const next = useCallback(() => {
    if (stepIndex < steps.length - 1) setStepIndex((i) => i + 1);
  }, [stepIndex, steps.length]);
  const prev = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  const submit = useCallback(async () => {
    if (!leadId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_target: data.ticket_target,
          discovery: data.discovery,
          wants_call: !under5k && data.rdv_choice === 'now',
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          consent: data.consent === true,
          page_url: meta?.page_url,
          ref: meta?.ref,
          utm_source: meta?.utm_source,
          utm_medium: meta?.utm_medium,
          utm_campaign: meta?.utm_campaign,
          utm_content: meta?.utm_content,
          utm_term: meta?.utm_term,
          asset_class: meta?.asset_class || 'retail',
          status: 'completed',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Update failed');
      setStepIndex(steps.findIndex((s) => s === 'success'));
      track('lead_completed', { id: leadId });
    } catch (e) {
      console.error('Lead update failed', e);
    } finally {
      setSubmitting(false);
    }
  }, [leadId, data, meta, steps.length, under5k]);

  const onOk = useCallback(() => {
    if (current === 'submit') return submit();
    if (canNext) next();
  }, [current, canNext, next, submit]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onOk();
      } else if (e.key === 'Escape') {
        if (escArmed) {
          reset();
        } else {
          setEscArmed(true);
          if (escTimerRef.current) window.clearTimeout(escTimerRef.current);
          escTimerRef.current = window.setTimeout(() => setEscArmed(false), 1500) as unknown as number;
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOk, reset, escArmed]);

  const autoAdvance = useCallback((cb: () => void) => {
    cb();
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = window.setTimeout(() => {
      if (canNext) next();
    }, 320) as unknown as number;
  }, [canNext, next]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-[98%] max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1a1a1a] text-white p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logos/offstone-logo-white.svg" alt="Offstone" className="w-40 h-auto" />
            </div>
            <div className="relative">
              <button aria-label="Fermer" onClick={reset} className="text-white/70 hover:text-white text-2xl">×</button>
              {escArmed && (
                <div className="absolute right-0 mt-2 px-2 py-1 rounded bg-white/10 text-white/80 text-xs whitespace-nowrap">Appuyez encore sur Échap pour fermer</div>
              )}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#F7B096]" style={{ width: `${progress.pct}%` }} />
            </div>
            <div className="mt-2 text-xs text-white/60">Étape {progress.currentNumber} / {progress.total}</div>
          </div>

          <div className={`mt-4 grid gap-8 items-start ${twoCols ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="max-w-xl relative min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div key={current} variants={stepVariants} initial="initial" animate="animate" exit="exit" className="absolute left-0 right-0 top-0 bottom-20">
                  <div className="mb-6">
                    {current === 'ticket' && (<span className="text-2xl font-semibold leading-tight">Indiquez votre ticket d'investissement</span>)}
                    {current === 'rdv' && (<span className="text-2xl font-semibold leading-tight">Souhaitez-vous programmer un RDV ?</span>)}
                    {current === 'calendly' && (<span className="text-2xl font-semibold leading-tight">Choisissez un créneau avec notre équipe</span>)}
                    {current === 'discovery' && (<span className="text-2xl font-semibold leading-tight">Comment nous avez-vous découvert ?</span>)}
                    {current === 'profile' && (<span className="text-2xl font-semibold leading-tight">Votre profil</span>)}
                    {current === 'submit' && (<span className="text-2xl font-semibold leading-tight">Confirmation</span>)}
                  </div>

                  {current === 'ticket' && (
                    <div className="space-y-4">
                      {[
                        { k: 'under_5k', label: 'Moins de 5kâ‚¬' },
                        { k: '5_10k', label: 'Entre 5 et 10kâ‚¬' },
                        { k: '10_25k', label: 'Entre 10 et 25kâ‚¬' },
                        { k: '25_50k', label: 'Entre 25 et 50kâ‚¬' },
                        { k: '50_100k', label: 'Entre 50 et 100kâ‚¬' },
                        { k: '100k_plus', label: 'Plus de 100kâ‚¬' },
                      ].map((o, idx) => {
                        const selected = data.ticket_target === o.k;
                        return (
                          <button
                            key={o.k}
                            type="button"
                            onClick={() => {
                              track('lead_step_select', { id: leadId, step: 'ticket', value: o.k });
                              autoAdvance(() => setData((d) => ({ ...d, ticket_target: o.k })));
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition flex items-center gap-3 focus-visible:ring-2 ring-[#F7B096]/60 outline-none ${selected ? 'border-[#F7B096] bg-white/10' : 'border-white/30 hover:border-white/60'}`}
                          >
                            <LetterBadge selected={selected} idx={idx} />
                            <span className="text-sm sm:text-base">{o.label}</span>
                            {selected && (<span className="ml-auto text-[#F7B096]">âœ“</span>)}
                          </button>
                        );
                      })}
                      {under5k && (<p className="text-xs text-white/70">Pour les tickets inférieurs à 5k€, l'étape RDV est sautée.</p>)}
                    </div>
                  )}

                  {current === 'rdv' && (
                    <div className="space-y-3">
                      {[
                        { k: 'now' as const, label: 'Programmer un rdv maintenant' },
                        { k: 'later' as const, label: 'Programmer plus tard' },
                      ].map((o, idx) => {
                        const selected = data.rdv_choice === o.k;
                        return (
                          <button
                            key={o.k}
                            type="button"
                            onClick={() => {
                              track('lead_step_select', { id: leadId, step: 'rdv', value: o.k });
                              autoAdvance(() => setData((d) => ({ ...d, rdv_choice: o.k })));
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition flex items-center gap-3 focus-visible:ring-2 ring-[#F7B096]/60 outline-none ${selected ? 'border-[#F7B096] bg-white/10' : 'border-white/30 hover:border-white/60'}`}
                          >
                            <LetterBadge selected={selected} idx={idx} />
                            <span className="text-sm sm:text-base">{o.label}</span>
                            {selected && (<span className="ml-auto text-[#F7B096]">âœ“</span>)}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current === 'discovery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['LinkedIn','Instagram / Tiktok','Podcast / Youtube','Un membre du club','Conférence','Recherche Google','Autre'].map((opt, idx) => {
                        const selected = data.discovery === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              track('lead_step_select', { id: leadId, step: 'discovery', value: opt });
                              autoAdvance(() => setData((d) => ({ ...d, discovery: opt })));
                            }}
                            className={`px-4 py-3 rounded-xl border text-left transition flex items-center gap-3 focus-visible:ring-2 ring-[#F7B096]/60 outline-none ${selected ? 'border-[#F7B096] bg-white/10' : 'border-white/30 hover:border-white/60'}`}
                          >
                            <LetterBadge selected={selected} idx={idx} />
                            <span className="text-sm sm:text-base">{opt}</span>
                            {selected && (<span className="ml-auto text-[#F7B096]">âœ“</span>)}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current === 'profile' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Prénom</label>
                        <input value={data.first_name ?? ''} onChange={(e)=>setData((d)=>({...d, first_name: e.target.value}))} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60" placeholder="Votre prénom" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Nom</label>
                        <input value={data.last_name ?? ''} onChange={(e)=>setData((d)=>({...d, last_name: e.target.value}))} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60" placeholder="Votre nom" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Téléphone (optionnel)</label>
                        <input value={data.phone ?? ''} onChange={(e)=>setData((d)=>({...d, phone: e.target.value}))} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60" placeholder="06 12 34 56 78" />
                      </div>
                    </div>
                  )}

                  {current === 'submit' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input id="consent" type="checkbox" checked={data.consent === true} onChange={(e)=>setData((d)=>({...d, consent: e.target.checked}))} />
                        <label htmlFor="consent" className="text-sm text-white/80">J'accepte d'être contacté(e) et la politique de confidentialité.</label>
                      </div>
                    </div>
                  )}

                  {steps[stepIndex] === 'success' && (
                    <div className="text-left">
                      <h4 className="text-xl font-semibold mb-2">Merci !</h4>
                      <p className="text-white/80">Votre demande a bien été enregistrée. Nous revenons vers vous très vite.</p>
                      <div className="mt-6">
                        <button onClick={reset} className="px-4 py-2 rounded-lg bg-[#F7B096] text-black text-sm">Fermer</button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={onOk} disabled={!canNext || submitting} className={`px-4 py-2 rounded-full text-sm font-medium ${(!canNext || submitting) ? 'bg-white/10 text-white/50' : 'bg-[#F7B096] text-black hover:opacity-90'}`}>Ok</button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prev} disabled={stepIndex === 0} className={`px-3 py-2 rounded-full ${stepIndex===0 ? 'bg-white/10 text-white/40' : 'bg-white/10 hover:bg-white/20'}`}>^</button>
            </div>
            </div>

            {twoCols && (
              <div className="hidden lg:block">
                <div className="w-full h-[480px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  <div className="text-center">
                    <div className="text-sm mb-2">Intégration Calendly</div>
                    <div className="text-xs text-white/50">Placez ici l'iframe Calendly ou un composant personnalisé.</div>
                  </div>
                </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function openWaitlist(detail: OpenEventDetail) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent(OPEN_EVENT, { detail });
  window.dispatchEvent(event);
}















