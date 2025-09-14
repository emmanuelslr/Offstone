"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function BenefitsChipsSectionInner(props: any) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const value = (email || '').trim();
      if (!value) return;
      const url = typeof window !== 'undefined' ? window.location.href : undefined;
      const entries = searchParams ? Array.from(searchParams.entries()) : [];
      const params = new URLSearchParams(entries);
      (function (d) {
        if (typeof window !== 'undefined') {
          try {
            const w: any = window as any;
            if (w.offstoneOpenWaitlist) {
              w.offstoneOpenWaitlist(d);
            } else {
              (w.__offstone_waitlist_queue ||= []).push(d);
              w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d }));
            }
          } catch {}
        }
      })({
        email: value,
        page_url: url,
        ref: typeof document !== 'undefined' ? document.referrer : undefined,
        utm_source: params.get('utm_source') || 'site',
        utm_medium: 'internal_cta',
        utm_campaign: 'investir',
        utm_content: 'investir-hero',
        utm_term: 'Investissez à nos côtés',
        cta_id: params.get('cta_id') || 'investir_ecosysteme_hero',
        asset_class: 'retail',
      });
      setSubmitted(true);
      setEmail('Inscription confirmée');
    } catch {}
  };

  // ...le reste du composant (copié tel quel depuis BenefitsChipsSectionInner)
  // Pour la clarté, on ne recopie pas tout ici, mais il faut mettre tout le JSX du composant original
  return null; // Remplacer par le vrai JSX
}

export default BenefitsChipsSectionInner;
