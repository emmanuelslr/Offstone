'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { track } from '@/lib/analytics';

const OPEN_EVENT = 'waitlist:open';
const OPENED_EVENT = 'waitlist:opened';
const CLOSED_EVENT = 'waitlist:closed';

type OpenEventDetail = {
  email?: string;
  page_url?: string;
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  asset_class?: string;
  // Optional identifier to know which CTA triggered the form
  cta_id?: string;
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

const stepVariants: any = {
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
function ArrowLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  );
}
function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
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
  const [skipEmailStep, setSkipEmailStep] = useState(false);

  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<StepState>({ consent: false, phone_country: 'FR' });
  const [validationErrors, setValidationErrors] = useState<{first_name?: boolean, last_name?: boolean, phone?: boolean, email?: boolean}>({});

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
    while (rest.startsWith('0')) rest = rest.slice(1);
    // Keep only if starts with 6 or 7; otherwise wait for valid input
    if (!/^([67]\d*)?$/.test(rest)) {
      // Drop leading non-6/7
      const m = rest.match(/[67].*/);
      rest = m ? m[0] : '';
    }
    // Limit to 1 + 8 digits
    rest = rest.slice(0, 9);
    if (!rest) return '+33';
    const first = rest.slice(0,1);
    const after = rest.slice(1);
    const pairs = after.match(/.{1,2}/g) || [];
    return '+33 ' + first + (pairs.length ? ' ' + pairs.join(' ') : (after ? ' ' + after : ''));
  };

  type CountryCode = 'FR' | 'BE' | 'CH' | 'LU' | 'DE' | 'ES' | 'IT' | 'GB';
  const COUNTRIES: Array<{
    code: CountryCode;
    name: string;
    dial: string;
    flag: string;
    placeholder: string;
  }>= [
    { code: 'FR', name: 'France',      dial: '+33',  flag: 'FR', placeholder: '+33 6 12 34 56 78' },
    { code: 'BE', name: 'Belgique',    dial: '+32',  flag: 'BE', placeholder: '+32 4xx xx xx xx' },
    { code: 'CH', name: 'Suisse',      dial: '+41',  flag: 'CH', placeholder: '+41 7x xxx xx xx' },
    { code: 'LU', name: 'Luxembourg',  dial: '+352', flag: 'LU', placeholder: '+352 621 123 456' },
    { code: 'DE', name: 'Allemagne',   dial: '+49',  flag: 'DE', placeholder: '+49 15x xxxx xxxx' },
    { code: 'ES', name: 'Espagne',     dial: '+34',  flag: 'ES', placeholder: '+34 6xx xxx xxx' },
    { code: 'IT', name: 'Italie',      dial: '+39',  flag: 'IT', placeholder: '+39 3xx xxx xxxx' },
    { code: 'GB', name: 'Royaume-Uni', dial: '+44',  flag: 'GB', placeholder: '+44 7xxxx xxxxxx' },
  ];

  const getCountry = (code: CountryCode) => COUNTRIES.find(c => c.code === code)!;
  const formatPhoneByCountry = (raw: string, code: CountryCode): string => {
    if (code === 'FR') return formatFrPhone(raw);
    const country = getCountry(code);
    const digits = (raw || '').replace(/[^0-9]/g, '');
    let rest = digits;
    const dialNoPlus = country.dial.replace('+','');
    if (rest.startsWith(dialNoPlus)) rest = rest.slice(dialNoPlus.length);
    while (rest.startsWith('0')) rest = rest.slice(1);

    const groupMap: Record<CountryCode, { groups: number[]; max: number }> = {
      FR: { groups: [1,2,2,2,2], max: 9 },
      BE: { groups: [3,2,2,2],   max: 9 },
      CH: { groups: [2,3,2,2],   max: 9 },
      LU: { groups: [3,3,3],     max: 9 },
      DE: { groups: [3,4,4],     max: 11 },
      ES: { groups: [3,3,3],     max: 9 },
      IT: { groups: [3,3,4],     max: 10 },
      GB: { groups: [5,6],       max: 11 },
    };

    const rule = groupMap[code];
    rest = rest.slice(0, rule.max);
    if (!rest) return country.dial;

    const parts: string[] = [];
    let idx = 0;
    for (const len of rule.groups) {
      if (idx >= rest.length) break;
      parts.push(rest.slice(idx, Math.min(idx + len, rest.length)));
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

  const under20k = data.ticket_target === 'under_20k';

  const steps = useMemo(() => {
    const s: Array<'email' | 'ticket' | 'rdv' | 'calendly' | 'discovery' | 'profile' | 'success'> = [];
    // Show email step only when we didn't capture email upstream AND no lead exists yet
    if (!skipEmailStep && !leadId) s.push('email');
    s.push('ticket');
    if (!under20k) s.push('rdv');
    if (!under20k && data.rdv_choice === 'now') s.push('calendly');
    s.push('discovery', 'profile', 'success');
    return s;
  }, [skipEmailStep, leadId, under20k, data.rdv_choice]);

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
    case 'email':
      return /.+@.+\..+/.test(email);
    case 'ticket':
      return Boolean(data.ticket_target);
    case 'rdv':
      return Boolean(data.rdv_choice);
    case 'calendly':
      return true;
    case 'discovery':
      return Boolean(data.discovery);
    case 'profile':
      return true; // Toujours permettre de cliquer, on valide dans onOk
    default:
      return true;
  }
}, [current, data, email]);const reset = useCallback(() => {
    setOpen(false);
    setSubmitting(false);
    setLeadId(null);
    setEmail('');
    setMeta(null);
    setSkipEmailStep(false);
    setStepIndex(0);
    setData({ consent: false, phone_country: 'FR' });
    setEscArmed(false);
    if (escTimerRef.current) { window.clearTimeout(escTimerRef.current); escTimerRef.current = null; }
    if (advanceTimerRef.current) { window.clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    if (saveTimerRef.current) { window.clearTimeout(saveTimerRef.current); saveTimerRef.current = null; }
    try { window.dispatchEvent(new Event(CLOSED_EVENT)); } catch {}
  }, []);

  const onOpen = useCallback(async (detail: OpenEventDetail) => {
    const emailInput = (detail.email || '').trim();
    if (emailInput) setEmail(emailInput);
    setMeta(detail);
    // If email provided upstream, skip the email step entirely
    setSkipEmailStep(Boolean(emailInput));
    setOpen(true);
    try { window.dispatchEvent(new Event(OPENED_EVENT)); } catch {}

    // If email already provided, create the lead immediately; otherwise wait until user provides it on first step
    if (emailInput) {
      try {
        const res = await fetch('/api/leads', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailInput,
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
        // Enrich analytics with CTA and UTM context
        track('lead_open', {
          id: json.id,
          email: emailInput,
          cta_id: detail.cta_id || detail.utm_content,
          utm_source: detail.utm_source,
          utm_medium: detail.utm_medium,
          utm_campaign: detail.utm_campaign,
          utm_content: detail.utm_content,
          utm_term: detail.utm_term,
        });
      } catch (e) {
        console.error('Lead insert failed', e);
      }
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
        if (data.rdv_choice !== undefined) payload.wants_call = !under20k && data.rdv_choice === 'now';
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
  }, [data, meta, leadId, current, under20k]);

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
          wants_call: !under20k && data.rdv_choice === 'now',
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
  }, [leadId, data, meta, steps.length, under20k]);

  const clearFieldError = useCallback((field: 'first_name' | 'last_name' | 'phone' | 'email') => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const onOk = useCallback(async () => {
    if (current === 'profile') {
      // Validation des champs obligatoires
      const errors: {first_name?: boolean, last_name?: boolean, phone?: boolean} = {};
      if (!data.first_name?.trim()) errors.first_name = true;
      if (!data.last_name?.trim()) errors.last_name = true;
      
      // Validation du téléphone plus robuste
      const phone = data.phone?.trim();
      const countryCode = (data.phone_country ?? 'FR') as CountryCode;
      const countryDial = getCountry(countryCode).dial;
      
      if (!phone || phone === countryDial) {
        errors.phone = true;
      } else {
        // Vérifier que le numéro a au moins 8 chiffres après l'indicatif
        const digitsOnly = phone.replace(/[^\d]/g, '');
        const dialDigits = countryDial.replace(/[^\d]/g, '');
        const phoneDigits = digitsOnly.replace(dialDigits, '');
        
        if (phoneDigits.length < 8) {
          errors.phone = true;
        }
      }
      
      setValidationErrors(errors);
      
      // Si il y a des erreurs, ne pas continuer
      if (Object.keys(errors).length > 0) return;
      
      return submit();
    }
    if (current === 'email') {
      // Strict email format validation
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid) {
        setValidationErrors({ email: true });
        return;
      }
      // Clear email error if valid
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
      try {
        setSubmitting(true);
        const res = await fetch('/api/leads', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            page_url: meta?.page_url,
            ref: meta?.ref,
            utm_source: meta?.utm_source,
            utm_medium: meta?.utm_medium,
            utm_campaign: meta?.utm_campaign,
            utm_content: meta?.utm_content,
            utm_term: meta?.utm_term,
            asset_class: meta?.asset_class || 'retail',
          }),
        });
        const json = await res.json();
        if (!res.ok || !json?.id) throw new Error(json?.error || 'insert failed');
        setLeadId(json.id);
        track('lead_open', {
          id: json.id,
          email,
          cta_id: meta?.cta_id || meta?.utm_content,
          utm_source: meta?.utm_source,
          utm_medium: meta?.utm_medium,
          utm_campaign: meta?.utm_campaign,
          utm_content: meta?.utm_content,
          utm_term: meta?.utm_term,
        });
      } catch (e) {
        console.error('Lead insert failed', e);
      } finally {
        setSubmitting(false);
      }
      return next();
    }
    if (canNext) next();
  }, [current, canNext, next, submit, email, meta]);

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
              <span
                className="block leading-none select-none antialiased"
                style={{
                  fontFamily: "'Alliance No.1', Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  letterSpacing: '0.02em',
                  color: '#FFFFFF'
                }}
              >
                Offstone.
              </span>
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

                  {current === 'email' && (
                    <div className="space-y-4">
                      <h4 className="text-2xl font-semibold leading-tight">Votre email</h4>
                      <p className="text-white/80 text-sm">Entrez votre adresse email pour commencer votre candidature.</p>
                      <div className="relative">
                        <input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                          autoFocus
                          value={email}
                          onChange={(e)=>{
                            setEmail(e.target.value);
                            clearFieldError('email');
                          }}
                          onKeyDown={(e)=>{ if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onOk(); } }}
                          placeholder="prenom.nom@email.com"
                          className={`w-full px-4 py-2.5 rounded-lg bg-white/10 border outline-none text-white placeholder:text-white/60 focus-visible:ring-2 ring-[#F7B096]/60 ${validationErrors.email ? 'border-red-400' : 'border-white/30'}`}
                        />
                        {validationErrors.email && <p className="text-red-400 text-xs mt-1">Veuillez entrer une adresse email valide</p>}
                      </div>
                    </div>
                  )}

                  {current === 'ticket' && (
                    <div className="space-y-4">
                      {[
                        { k: 'under_20k', label: 'Moins de 20k€' },
                        { k: '20_40k', label: 'Entre 20 et 40k€' },
                        { k: '40_60k', label: 'Entre 40 et 60k€' },
                        { k: '60_80k', label: 'Entre 60 et 80k€' },
                        { k: '100_500k', label: 'Entre 100 et 500k€' },
                        { k: '500k_plus', label: 'Plus de 500k€' },
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
                      {/** Message supprimé: pas nécessaire pour under_5k **/}
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
                      {['LinkedIn','Instagram / Tiktok','Podcast / Youtube','Un membre de la communauté','Conference','Recherche Google','Autre'].map((opt, idx) => {
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
                        <label className="block text-sm text-white/80 mb-1">Prénom <span className="text-red-400">*</span></label>
                        <input 
                          value={data.first_name ?? ''} 
                          onChange={(e)=>{
                            setData(d=>({...d, first_name: e.target.value}));
                            clearFieldError('first_name');
                          }}
                          className={`w-full px-4 py-2 rounded-lg bg-white/10 border outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60 ${validationErrors.first_name ? 'border-red-400' : 'border-white/30'}`} 
                          placeholder="Votre Prénom" 
                        />
                        {validationErrors.first_name && <p className="text-red-400 text-xs mt-1">Ce champ est obligatoire</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Nom <span className="text-red-400">*</span></label>
                        <input 
                          value={data.last_name ?? ''} 
                          onChange={(e)=>{
                            setData(d=>({...d, last_name: e.target.value}));
                            clearFieldError('last_name');
                          }}
                          className={`w-full px-4 py-2 rounded-lg bg-white/10 border outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60 ${validationErrors.last_name ? 'border-red-400' : 'border-white/30'}`} 
                          placeholder="Votre nom" 
                        />
                        {validationErrors.last_name && <p className="text-red-400 text-xs mt-1">Ce champ est obligatoire</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-white/80 mb-1">Téléphone <span className="text-red-400">*</span></label>
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
                                    setData(d => ({ ...d, phone_country: code, phone: formatPhoneByCountry(d.phone ?? '', code) }));
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
                            onFocus={() => { if (!data.phone) { const cc = (data.phone_country ?? 'FR') as CountryCode; const dial = getCountry(cc).dial; setData(d => ({ ...d, phone: dial })); } }}
                            onChange={(e)=>{ 
                              const cc = (data.phone_country ?? 'FR') as CountryCode; 
                              setData(d=>({...d, phone: formatPhoneByCountry(e.target.value, cc)}));
                              clearFieldError('phone');
                            }}
                            onKeyDown={(e)=>{ 
                              if (e.key === 'Enter') { 
                                e.preventDefault(); 
                                e.stopPropagation(); 
                                // Vérifier que tous les champs sont remplis avant de valider
                                if (data.first_name?.trim() && data.last_name?.trim() && data.phone?.trim() && data.phone !== '+33' && data.phone !== getCountry((data.phone_country ?? 'FR') as CountryCode).dial) {
                                  onOk(); 
                                }
                              } 
                            }}
                            maxLength={24}
                            className={`w-full px-4 py-2 rounded-lg bg-white/10 border outline-none text-white placeholder:text-white/50 focus-visible:ring-2 ring-[#F7B096]/60 ${validationErrors.phone ? 'border-red-400' : 'border-white/30'}`}
                            placeholder={getCountry((data.phone_country ?? 'FR') as CountryCode).placeholder}
                          />
                        </div>
                        {validationErrors.phone && <p className="text-red-400 text-xs mt-1">Veuillez entrer un numéro de téléphone valide</p>}
                      </div>
                      {/* consent checkbox removed */}
                    </div>
                  )}

                  {(current as any) === 'submit' && (
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
                <ArrowLeft />
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
                  <ArrowRight />
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









