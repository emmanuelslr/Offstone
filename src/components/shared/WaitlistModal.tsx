'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { track } from '@/lib/analytics';

const OPEN_EVENT = 'waitlist:open';
const OPENED_EVENT = 'waitlist:opened';
const CLOSED_EVENT = 'waitlist:closed';

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
  phone_country?: 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB';
  consent?: boolean;
};

const stepVariants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 32, mass: 0.6 },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.995,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as any },
  },
};

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
  );
}
function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  );
}
function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  );
}

// Lightweight inline SVG flags (no network, harmonized size)
function FlagSvg({ code, className = 'w-5 h-3 rounded-sm overflow-hidden shadow-sm' }: { code: 'FR'|'BE'|'CH'|'LU'|'DE'|'ES'|'IT'|'GB'; className?: string }) {
  switch (code) {
    case 'FR': // Blue-White-Red vertical
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="France"><rect width="1" height="2" x="0" y="0" fill="#0055A4"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#EF4135"/></svg>
      );
    case 'BE': // Black-Yellow-Red vertical
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Belgique"><rect width="1" height="2" x="0" y="0" fill="#000"/><rect width="1" height="2" x="1" y="0" fill="#FFD90C"/><rect width="1" height="2" x="2" y="0" fill="#EF3340"/></svg>
      );
    case 'IT': // Green-White-Red vertical
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Italie"><rect width="1" height="2" x="0" y="0" fill="#009246"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#CE2B37"/></svg>
      );
    case 'DE': // Black-Red-Gold horizontal
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Allemagne"><rect width="3" height="2" fill="#000"/><rect width="3" height="1.333" y="0.667" fill="#DD0000"/><rect width="3" height="0.666" y="1.334" fill="#FFCE00"/></svg>
      );
    case 'ES': // Red-Yellow-Red horizontal (simplified)
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Espagne"><rect width="3" height="2" fill="#AA151B"/><rect width="3" height="1" y="0.5" fill="#F1BF00"/></svg>
      );
    case 'GB': // Simplified Union Jack
      return (
        <svg viewBox="0 0 60 36" className={className} aria-label="Royaume-Uni">
          <rect width="60" height="36" fill="#012169"/>
          <path d="M0,0 60,36 M60,0 0,36" stroke="#fff" strokeWidth="8"/>
          <path d="M0,0 60,36 M60,0 0,36" stroke="#C8102E" strokeWidth="4"/>
          <rect x="26" width="8" height="36" fill="#fff"/>
          <rect y="14" width="60" height="8" fill="#fff"/>
          <rect x="28" width="4" height="36" fill="#C8102E"/>
          <rect y="16" width="60" height="4" fill="#C8102E"/>
        </svg>
      );
    case 'CH': // Red with white cross
      return (
        <svg viewBox="0 0 3 3" className={className} aria-label="Suisse"><rect width="3" height="3" fill="#D52B1E"/><rect x="1.25" y="0.5" width="0.5" height="2" fill="#fff"/><rect x="0.5" y="1.25" width="2" height="0.5" fill="#fff"/></svg>
      );
    case 'LU': // Red-White-LightBlue horizontal
      return (
        <svg viewBox="0 0 3 2" className={className} aria-label="Luxembourg"><rect width="3" height="2" fill="#ED2939"/><rect width="3" height="0.666" y="0.666" fill="#fff"/><rect width="3" height="0.666" y="1.334" fill="#00A1DE"/></svg>
      );
    default:
      return (<span className={`inline-flex items-center justify-center ${className} bg-white/20 text-[10px] text-white/80`}>{code}</span>);
  }
}

function LetterBadge({ selected, idx }: { selected: boolean; idx: number }) {
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${selected ? 'bg-[#F7B096] border-[#F7B096] text-black' : 'border-white/40 text-white/80'}`}>
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
  const [data, setData] = useState<StepState>({ consent: false, phone_country: 'FR' });

  const [escArmed, setEscArmed] = useState(false);
  const escTimerRef = useRef<number | null>(null);
  const advanceTimerRef = useRef<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const lastSaveRef = useRef<string>('');
  const [flashKey, setFlashKey] = useState<string | null>(null);
  const [advancing, setAdvancing] = useState(false);
  const advancingRef = useRef(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryMenuRef = useRef<HTMLDivElement | null>(null);
  const flagStyle: React.CSSProperties = {
    fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla","EmojiOne Color","Segoe UI Symbol",system-ui,sans-serif',
    lineHeight: '1',
  };

  // Phone formatting helpers: FR mobile only => "+33 6 XX XX XX XX"
  const formatFrPhone = (raw: string): string => {
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    if (rest.startsWith('33')) rest = rest.slice(2);
    if (rest.startsWith('0')) rest = rest.slice(1);
    if (!rest.startsWith('6')) {
      // Force mobile prefix 6
      rest = '6' + rest.replace(/^[0-9]?/, '');
    }
    const after = rest.slice(1, 9); // up to 8 digits after leading 6
    const pairs = after.match(/.{1,2}/g) || [];
    return '+33 6' + (pairs.length ? ' ' + pairs.join(' ') : '');
  };

  type CountryCode = 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB';
  const COUNTRIES: Array<{ code: CountryCode; name: string; dial: string; flag: string; placeholder: string }>= [
    { code: 'FR', name: 'France', dial: '+33', flag: 'FR', placeholder: '+33 6 12 34 56 78' },
    { code: 'BE', name: 'Belgique', dial: '+32', flag: 'BE', placeholder: '+32 4x xx xx xx' },
    { code: 'CH', name: 'Suisse', dial: '+41', flag: 'CH', placeholder: '+41 7x xxx xx xx' },
    { code: 'LU', name: 'Luxembourg', dial: '+352', flag: 'LU', placeholder: '+352 6x xx xx xx' },
    { code: 'DE', name: 'Allemagne', dial: '+49', flag: 'DE', placeholder: '+49 15x xxxx xxxx' },
    { code: 'ES', name: 'Espagne', dial: '+34', flag: 'ES', placeholder: '+34 6xx xxx xxx' },
    { code: 'IT', name: 'Italie', dial: '+39', flag: 'IT', placeholder: '+39 3xx xxx xxxx' },
    { code: 'GB', name: 'Royaume-Uni', dial: '+44', flag: 'GB', placeholder: '+44 7xxxx xxxxxx' },
  ];

  const getCountry = (code: CountryCode) => COUNTRIES.find(c => c.code === code)!;
  const formatPhoneByCountry = (raw: string, code: CountryCode): string => {
    if (code === 'FR') return formatFrPhone(raw);
    const country = getCountry(code);
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    const dialNoPlus = country.dial.replace('+','');
    if (rest.startsWith(dialNoPlus)) rest = rest.slice(dialNoPlus.length);
    const groupMap: Record<CountryCode, number[]> = {
      FR: [1,2,2,2,2],
      BE: [1,2,2,2],
      CH: [1,3,2,2],
      LU: [1,2,2,2],
      DE: [3,4,4],
      ES: [3,3,3],
      IT: [3,3,4],
      GB: [5,6],
    };
    const groups = groupMap[code];
    const parts: string[] = [];
    let idx = 0;
    for (const len of groups) {
      if (idx >= rest.length) break;
      parts.push(rest.slice(idx, idx + len));
      idx += len;
    }
    const grouped = parts.join(' ');
    return country.dial + (grouped ? ' ' + grouped : '');
  };

  const countryFlag = (code: CountryCode): string => {
    try {
      return code
        .slice(0, 2)
        .toUpperCase()
        .split('')
        .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
        .join('');
    } catch {
      return code;
    }
  };

  const under5k = data.ticket_target === 'under_5k';

  const steps = useMemo(() => {
    const s: Array<'ticket' | 'rdv' | 'calendly' | 'discovery' | 'profile' | 'success'> = ['ticket'];
    if (!under5k) s.push('rdv');
    if (!under5k && data.rdv_choice === 'now') s.push('calendly');
    s.push('discovery', 'profile', 'success');
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
    default:
      return true;
  }
}, [current, data]);const reset = useCallback(() => {
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
    try { window.dispatchEvent(new Event(CLOSED_EVENT)); } catch {}
  }, []);

  const onOpen = useCallback(async (detail: OpenEventDetail) => {
    const email = (detail.email || '').trim();
    if (!email) return;
    setEmail(email);
    setMeta(detail);
    setOpen(true);
    try { window.dispatchEvent(new Event(OPENED_EVENT)); } catch {}

    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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
      if (!res.ok || !json?.id) throw new Error(json?.error || 'insert failed');
      setLeadId(json.id);
      track('lead_open', { id: json.id, email });
    } catch (e) {
      console.error('Lead insert failed', e);
    }
  }, []);

  // Listen for event + queue
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
      if (Array.isArray(q)) { while (q.length) onOpen(q.shift()); }
      w.offstoneOpenWaitlist = (detail: any) => onOpen(detail);
    } catch {}
    return () => {
      window.removeEventListener(OPEN_EVENT, handler as EventListener);
      document.removeEventListener(OPEN_EVENT, handler as EventListener);
      try { delete (window as any).offstoneOpenWaitlist; } catch {}
    };
  }, [onOpen]);

  // Lock scroll
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);

  // Close country menu on outside click / Escape
  useEffect(() => {
    if (!countryOpen) return;
    const onClick = (e: MouseEvent) => {
      const el = countryMenuRef.current;
      if (el && !el.contains(e.target as Node)) setCountryOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCountryOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, [countryOpen]);

  // Track step
  useEffect(() => { if (open && leadId) track('lead_step_view', { id: leadId, step: current, index: stepIndex + 1 }); }, [open, leadId, current, stepIndex]);

  // Debounced partial save
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
        // consent removed
        if (meta?.page_url) payload.page_url = meta.page_url;
        if (meta?.ref) payload.ref = meta.ref;
        if (meta?.utm_source) payload.utm_source = meta.utm_source;
        if (meta?.utm_medium) payload.utm_medium = meta.utm_medium;
        if (meta?.utm_campaign) payload.utm_campaign = meta.utm_campaign;
        if (meta?.utm_content) payload.utm_content = meta.utm_content;
        if (meta?.utm_term) payload.utm_term = meta.utm_term;
        if (meta?.asset_class) payload.asset_class = meta.asset_class;
        const s = JSON.stringify(payload);
        if (Object.keys(payload).length === 0) return;
        if (s === lastSaveRef.current) return; lastSaveRef.current = s;
        await fetch(`/api/leads/${leadId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: s });
        track('lead_partial_save', { id: leadId, step: current });
      } catch {}
    }, 500) as unknown as number;
    return () => { if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current); };
  }, [data, meta, leadId, current, under5k]);

  const next = useCallback(() => { if (stepIndex < steps.length - 1) setStepIndex(i => i + 1); }, [stepIndex, steps.length]);
  const prev = useCallback(() => { if (stepIndex > 0) setStepIndex(i => i - 1); }, [stepIndex]);

  const submit = useCallback(async () => {
    if (!leadId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_target: data.ticket_target,
          discovery: data.discovery,
          wants_call: !under5k && data.rdv_choice === 'now',
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          // consent removed
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
      if (!res.ok) throw new Error(json?.error || 'update failed');
      setStepIndex(steps.findIndex(s => s === 'success'));
      track('lead_completed', { id: leadId });
    } catch (e) { console.error('Lead update failed', e); } finally { setSubmitting(false); }
  }, [leadId, data, meta, steps.length, under5k]);

  const onOk = useCallback(() => { if (current === 'profile') return submit(); if (canNext) next(); }, [current, canNext, next, submit]);

  useEffect(() => {
    setAdvancing(false);
    advancingRef.current = false;
  }, [stepIndex]);

  const autoAdvance = useCallback((cb: () => void) => {
    if (advancingRef.current) return;
    advancingRef.current = true; setAdvancing(true);
    cb();
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    // Slightly slower to maximize understanding of the selection
    advanceTimerRef.current = window.setTimeout(() => { if (canNext) next(); }, 360) as unknown as number;
  }, [canNext, next]);
  const selectAndAutoAdvance = useCallback((key: string, patch: (d: any) => any) => {
    if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
    setFlashKey(key);
    setData((d) => patch(d));
    // Keep flash a bit longer before moving to next question
    advanceTimerRef.current = window.setTimeout(() => { setFlashKey(null); next(); }, 360) as unknown as number;
  }, [next]);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as any }}
      style={{ willChange: 'opacity' }}
    >
      <div className="absolute inset-0 bg-black/70 md:backdrop-blur-sm" />
      <motion.div
        className={`relative w-[98%] ${twoCols ? 'max-w-6xl' : 'max-w-3xl'} rounded-2xl overflow-hidden shadow-2xl`}
        initial={{ y: 8, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 32, mass: 0.6 } }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1a1a1a] text-white p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logos/offstone-logo-white.svg" alt="Offstone" className="w-40 h-auto" />
            </div>
            <button aria-label="Fermer" onClick={reset} className="text-white/70 hover:text-white text-2xl">×</button>
          </div>

          <div className={`mt-6 mb-4 ${twoCols ? '' : 'max-w-2xl'}`}>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#F7B096]" style={{ width: `${progress.pct}%` }} /></div>
            <div className="mt-2 text-xs text-white/60">Étape {progress.currentNumber} / {progress.total}</div>
          </div>

          <div className={`mt-4 grid gap-8 items-start ${twoCols ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className={`${twoCols ? 'max-w-xl' : 'max-w-2xl'} relative min-h-[560px] pb-36 sm:pb-40`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 right-0 top-0 bottom-36"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="mb-6">
                    {current === 'ticket' && (<span className="text-2xl font-semibold leading-tight">Indiquez votre ticket d'investissement</span>)}
                    {current === 'rdv' && (<span className="text-2xl font-semibold leading-tight">Souhaitez-vous programmer un RDV ?</span>)}
                    {current === 'calendly' && (<span className="text-2xl font-semibold leading-tight">Choisissez un créneau avec notre équipe</span>)}
                    {current === 'discovery' && (<span className="text-2xl font-semibold leading-tight">Comment nous avez-vous découvert ?</span>)}
                    {current === 'profile' && (<span className="text-2xl font-semibold leading-tight">Votre profil</span>)}
                  </div>

                  {current === 'ticket' && (
                    <div className="space-y-4">
                      {[
                        { k: 'under_5k', label: 'Moins de 5k€' },
                        { k: '5_10k', label: 'Entre 5 et 10k€' },
                        { k: '10_25k', label: 'Entre 10 et 25k€' },
                        { k: '25_50k', label: 'Entre 25 et 50k€' },
                        { k: '50_100k', label: 'Entre 50 et 100k€' },
                        { k: '100k_plus', label: 'Plus de 100k€' },
                      ].map((o, idx) => {
                        const selected = data.ticket_target === o.k;
                        return (
                          <button key={o.k} type="button"
                            onClick={() => { track('lead_step_select', { id: leadId, step: 'ticket', value: o.k }); selectAndAutoAdvance(o.k, (d) => ({ ...d, ticket_target: o.k })); }}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition flex items-center gap-3 focus-visible:ring-2 ring-[#F7B096]/60 outline-none ${selected ? 'border-[#F7B096] bg-white/10' : 'border-white/30 hover:border-white/60'} ${flashKey === o.k ? 'ring-2 ring-[#F7B096]/80' : ''}`}
                          >
                            <LetterBadge selected={selected} idx={idx} />
                            <span className="text-sm sm:text-base">{o.label}</span>
                            {selected && (<span className="ml-auto text-[#F7B096]"><Check /></span>)}
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
                          <button key={o.k} type="button"
                            onClick={() => { track('lead_step_select', { id: leadId, step: 'rdv', value: o.k }); selectAndAutoAdvance(o.k, (d) => ({ ...d, rdv_choice: o.k })); }}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition flex items-center gap-3 focus-visible:ring-2 ring-[#F7B096]/60 outline-none ${selected ? 'border-[#F7B096] bg-white/10' : 'border-white/30 hover:border-white/60'} ${flashKey === o.k ? 'ring-2 ring-[#F7B096]/80' : ''}`}
                          >
                            <LetterBadge selected={selected} idx={idx} />
                            <span className="text-sm sm:text-base">{o.label}</span>
                            {selected && (<span className="ml-auto text-[#F7B096]"><Check /></span>)}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current === 'discovery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['LinkedIn','Instagram / Tiktok','Podcast / Youtube','Un membre du club','Conference','Recherche Google','Autre'].map((opt, idx) => {
                        const selected = data.discovery === opt;
                        return (
                          <button key={opt} type="button"
                            onClick={() => { track('lead_step_select', { id: leadId, step: 'discovery', value: opt }); selectAndAutoAdvance(String(idx), (d) => ({ ...d, discovery: opt })); }}
                            className={`px-4 py-3 rounded-xl border text-left transition flex items-center gap-3 focus-visible:ring-2 ring-[#F7B096]/60 outline-none ${selected ? 'border-[#F7B096] bg-white/10' : 'border-white/30 hover:border-white/60'} ${flashKey === String(idx) ? 'ring-2 ring-[#F7B096]/80' : ''}`}
                          >
                            <LetterBadge selected={selected} idx={idx} />
                            <span className="text-sm sm:text-base">{opt}</span>
                            {selected && (<span className="ml-auto text-[#F7B096]"><Check /></span>)}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current === 'profile' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Prénom</label>
                        <input value={data.first_name ?? ''} onChange={(e)=>startTransition(()=>setData(d=>({...d, first_name: e.target.value})))} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60" placeholder="Votre Prénom" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Nom</label>
                        <input value={data.last_name ?? ''} onChange={(e)=>startTransition(()=>setData(d=>({...d, last_name: e.target.value})))} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60" placeholder="Votre nom" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Téléphone</label>
                        <div className="grid grid-cols-[180px_1fr] gap-2 items-center">
                          <div className="hidden absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <span className="text-base">????</span>
                          </div>
                          <div className="relative w-[180px]" ref={countryMenuRef as any}>
                            <button
                              type="button"
                              className="relative w-full bg-white/10 text-white border border-white/30 rounded-lg pl-2 pr-7 py-2 text-sm text-left hover:bg-white/15 outline-none focus-visible:ring-2 ring-[#F7B096]/60 flex items-center gap-2 whitespace-nowrap"
                              onClick={(e) => { e.preventDefault(); setCountryOpen(v => !v); }}
                            >
                              <span className="mr-2"><FlagSvg code={(data.phone_country ?? 'FR') as CountryCode} /></span>
                              <span className="mr-1 font-semibold">{(data.phone_country ?? 'FR')}</span>
                              <span className="font-medium">{getCountry((data.phone_country ?? 'FR') as CountryCode).dial}</span>
                              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70">
                                <ArrowDown />
                              </span>
                            </button>
                            <div className={`${countryOpen ? '' : 'hidden'} absolute left-0 right-0 mt-1 max-h-56 overflow-auto rounded-lg border border-white/20 bg-[#0f0f0f] shadow-lg z-20`}
                            >
                              {COUNTRIES.map(c => (
                                <button
                                  type="button"
                                  key={c.code}
                                  className={`w-full px-3 py-2 text-sm text-left ${c.code === (data.phone_country ?? 'FR') ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/10'}`}
                                  onClick={() => {
                                    const code = c.code as CountryCode;
                                    startTransition(()=>setData(d => ({ ...d, phone_country: code, phone: formatPhoneByCountry(d.phone ?? '', code) })));
                                    setCountryOpen(false);
                                  }}
                                >
                                  <span className="mr-2"><FlagSvg code={c.code as CountryCode} /></span>
                                  <span className="truncate">{c.code} ({c.dial})</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={data.phone ?? ''}
                            onFocus={() => { if (!data.phone) { const cc = (data.phone_country ?? 'FR') as CountryCode; const dial = getCountry(cc).dial; startTransition(()=>setData(d => ({ ...d, phone: cc === 'FR' ? dial + ' 6 ' : dial + ' ' }))); } }}
                            onChange={(e)=>{ const cc = (data.phone_country ?? 'FR') as CountryCode; startTransition(()=>setData(d=>({...d, phone: formatPhoneByCountry(e.target.value, cc)}))); }}
                            maxLength={24}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60"
                            placeholder={getCountry((data.phone_country ?? 'FR') as CountryCode).placeholder}
                          />
                        </div>
                      </div>
                      {/* consent checkbox removed */}
                    </div>
                  )}

                  {current === 'submit' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input id="consent" type="checkbox" checked={data.consent === true} onChange={(e)=>startTransition(()=>setData(d=>({...d, consent: e.target.checked})))} />
                        <label htmlFor="consent" className="text-sm text-white/80">J'accepte d'être contacté(e) et la politique de confidentialité.</label>
                      </div>
                    </div>
                  )}

                  {steps[stepIndex] === 'success' && (
                    <div className="text-left">
                      <h4 className="text-xl font-semibold mb-2">Merci !</h4>
                      <p className="text-white/80">Votre demande a bien été enregistrée. Nous revenons vers vous très vite.</p>
                      <div className="mt-6"><button type="button" onClick={reset} className="px-4 py-2 rounded-lg bg-[#F7B096] text-black text-sm">Fermer</button></div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              
            </div>

            {twoCols && (
              <div className="hidden lg:block">
                <div className="w-full h-[480px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  <div className="text-center">
                    <div className="text-sm mb-2">Integration Calendly</div>
                    <div className="text-xs text-white/50">Placez ici l'iframe Calendly ou un composant personnalise.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Global bottom action bar spanning full modal width */}
          <div className="absolute left-0 right-0 bottom-0 z-10 grid grid-cols-[auto_1fr_auto] items-center px-6 sm:px-10 py-3 bg-black/20 md:backdrop-blur-sm border-t border-white/10">
            <div className="flex items-center">
              <button type="button" onClick={prev} disabled={stepIndex === 0} className={`px-3 py-2 rounded-full ${stepIndex===0 ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}`} aria-label="Précédent">
                <ArrowUp />
              </button>
            </div>
            <div className="flex items-center justify-center">
              {current !== 'success' && (
                <button type="button" onClick={onOk} disabled={!canNext || submitting} className={`px-5 py-2 rounded-full text-sm font-medium ${(!canNext || submitting) ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-[#F7B096] text-black hover:opacity-90'}`}>
                  Suivant
                </button>
              )}
            </div>
            <div className="flex items-center justify-end">
              {current !== 'success' && (
                <button type="button" onClick={current === 'profile' ? onOk : next} disabled={!canNext} className={`px-3 py-2 rounded-full ${!canNext ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}`} aria-label="Suivant">
                  <ArrowDown />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function openWaitlist(detail: OpenEventDetail) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent(OPEN_EVENT, { detail });
  window.dispatchEvent(event);
}









