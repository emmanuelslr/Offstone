"use client";
// Footer principal Offstone (structure, responsive, i18n, accessibilité, tracking)
// Voir AlertDisclaimer, WaitlistMiniForm, analytics, data/footerNav.*.json


import AlertDisclaimer from './AlertDisclaimer';
import { getFooterNav } from '../lib/getFooterNav';
import { useFooterDictionary } from '../lib/useFooterDictionary';
import { trackFooterLinkClick, trackOutboundClick } from '../lib/analytics';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SpontaneousApplicationModal from './forms/SpontaneousApplicationModal';


// Types
type FooterNavLink = { label: string; href: string; disabled?: boolean; action?: string };
type FooterColProps = { title: string; links: FooterNavLink[]; section: string; onOpenSpontaneousModal?: () => void };

// Fallback locale (à remplacer par context ou prop si besoin)
const fallbackLocale = typeof navigator !== 'undefined' && navigator.language?.startsWith('en') ? 'en' : 'fr';

export default function Footer({ locale }: { locale?: string }) {
  const router = useRouter();
  const lang = locale || fallbackLocale;
  const [currentLang, setCurrentLang] = useState(lang);
  const [isSpontaneousModalOpen, setIsSpontaneousModalOpen] = useState(false);
  const dict = useFooterDictionary(currentLang);
  const nav = getFooterNav(currentLang);

  // Lang switcher
  function handleLangChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    document.cookie = `NEXT_LOCALE=${next};path=/`;
    setCurrentLang(next);
    router.replace(`/${next}`); // App Router: reroute to home in new lang (adapter si besoin)
  }

  return (
  <footer className="bg-[#1E2124] text-white border-t border-[#333839] pt-12" role="contentinfo">
  {/* <AlertDisclaimer dict={dict} /> */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Desktop/tablette : 5 colonnes, mobile : accordéons */}
        <div className="hidden lg:flex gap-x-8 mb-20">
          {/* Logo */}
          <div className="flex flex-col w-[220px] mr-8">
            <Link href="/" className="mb-4 group no-underline hover:no-underline">
              <span 
                className="block leading-none select-none antialiased text-white font-medium text-2xl tracking-wide transition-colors duration-200" 
                style={{fontFamily: "'Alliance No.1', Arial, sans-serif"}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F1AC93';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                Offstone.
              </span>
            </Link>
          </div>
          {/* Colonnes navigation */}
          <FooterCol title={dict['investir']} links={nav.investir} section="investir" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
          <FooterCol title={dict['ressources']} links={nav.ressources} section="ressources" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
          <FooterCol title={dict['offstone']} links={nav.offstone} section="offstone" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
          <FooterCol title={dict['legal']} links={nav.legal} section="legal" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
        </div>
        {/* Mobile/tablette : accordéons */}
        <div className="lg:hidden flex flex-col gap-4 mb-14">
          <AccordionFooterCol title={dict['investir']} links={nav.investir} section="investir" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
          <AccordionFooterCol title={dict['ressources']} links={nav.ressources} section="ressources" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
          <AccordionFooterCol title={dict['offstone']} links={nav.offstone} section="offstone" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
          <AccordionFooterCol title={dict['legal']} links={nav.legal} section="legal" onOpenSpontaneousModal={() => setIsSpontaneousModalOpen(true)} />
        </div>
        {/* Bloc CTA sous les colonnes, champ email + bouton Candidater + flèche diagonale */}
        <div className="w-full flex flex-col items-center justify-center bg-[#23262A] rounded-lg py-6 px-4 mb-8">
          <div className="font-semibold text-lg mb-1 text-white text-center">{dict['joinTitle']}</div>
          <div className="text-sm text-[#8F9193] mb-4 text-center">{dict['joinCopy']}</div>
          <form 
            className="w-full max-w-md flex flex-col sm:flex-row gap-3 justify-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              try {
                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector('#footer-email') as HTMLInputElement | null;
                const email = (input?.value || '').trim();
                if (!email) return;
                const url = typeof window !== 'undefined' ? window.location.href : undefined;
                const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                // Déterminer la campagne UTM basée sur la page actuelle
                const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
                let utmCampaign = 'footer-cta';
                
                if (currentPath === '/' || currentPath === '/fr' || currentPath === '/en') {
                  utmCampaign = 'home-page';
                } else if (currentPath.startsWith('/investir')) {
                  utmCampaign = 'investir-page';
                } else if (currentPath.startsWith('/notre-histoire')) {
                  utmCampaign = 'notre-histoire-page';
                } else if (currentPath.startsWith('/pourquoi-offstone')) {
                  utmCampaign = 'pourquoi-offstone-page';
                } else if (currentPath.startsWith('/ressources')) {
                  utmCampaign = 'ressources-page';
                } else if (currentPath.startsWith('/espace-membre')) {
                  utmCampaign = 'espace-membre-page';
                } else if (currentPath.startsWith('/faq')) {
                  utmCampaign = 'faq-page';
                } else if (currentPath.startsWith('/comment-ca-marche')) {
                  utmCampaign = 'comment-ca-marche-page';
                } else {
                  utmCampaign = 'other-page';
                }

                (function(d){ if (typeof window !== 'undefined') { try { const w:any = window as any; if (w.offstoneOpenWaitlist) { w.offstoneOpenWaitlist(d); } else { (w.__offstone_waitlist_queue ||= []).push(d); w.dispatchEvent(new CustomEvent('waitlist:open', { detail: d })); } } catch(e){} } })({
                  email,
                  page_url: url,
                  ref: typeof document !== 'undefined' ? document.referrer : undefined,
                  utm_source: params.get('utm_source') || 'site',
                  utm_medium: params.get('utm_medium') || 'internal_cta',
                  utm_campaign: params.get('utm_campaign') || utmCampaign,
                  utm_content: params.get('utm_content') || 'footer',
                  utm_term: params.get('utm_term') || 'candidatez',
                  cta_id: params.get('cta_id') || 'footer_candidater',
                  asset_class: 'retail'
                });
              } catch {}
            }}
          >
            <input
              id="footer-email"
              type="email"
              placeholder="Votre adresse mail"
              className="w-full rounded px-4 py-2 text-[#1E2124] text-base bg-white focus:outline-none focus:ring"
              aria-label="Votre adresse mail"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-white text-[#1E2124] font-semibold rounded px-6 py-2 text-base hover:bg-[#F7B096] transition border border-[#1E2124]"
            >
              Candidater
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6.5M13 5V11.5" stroke="#1E2124" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
          <a href="https://www.linkedin.com/company/offstone-fr" target="_blank" rel="noopener" title={dict['linkedinTitle']} onClick={()=>trackOutboundClick('LinkedIn','footer')} className="mt-4 inline-flex items-center hover:opacity-80 focus-visible:ring">
            <Image src="/images/icones/linkedin.svg" alt="LinkedIn" width={28} height={28} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
        {/* Bloc conformité/statut avec séparateur */}
        <div className="w-full border-t border-[#333839] my-6" />
        <div className="mb-4 text-xs text-[#8F9193] leading-relaxed text-center max-w-3xl mx-auto">
          <span>{dict['compliance1']}</span><br />
          <span>{dict['compliance2']}</span><br />
          {/* <span>{dict['compliance4']}</span> */}
        </div>
        <div className="w-full border-t border-[#333839] my-6" />
        {/* Bas de page avec séparateur et sans sélecteur langue */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <span>© Offstone 2025 — {dict['allRights']}</span>
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  // Vérifier si tarteaucitron est disponible
                  if (typeof (window as any).tarteaucitron !== 'undefined' && (window as any).tarteaucitron.userInterface) {
                    // Ouvrir directement le panneau de gestion des cookies
                    (window as any).tarteaucitron.userInterface.openPanel();
                  } else {
                    // Fallback : supprimer le cookie et recharger si tarteaucitron n'est pas encore chargé
                    document.cookie = 'offstone-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = 'tarteaucitron=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    window.location.reload();
                  }
                }
              }}
              className="underline text-sm hover:opacity-80 transition-opacity duration-200"
            >
              {dict['cookies']}
            </button>
            <Link href="/legal/mentions-legales" className="underline text-sm">{dict['legalNotice']}</Link>
            <Link href="/legal/conditions" className="underline text-sm">CGU</Link>
          </div>
        </div>
      </div>
      
      {/* Modal de candidature spontanée */}
      <SpontaneousApplicationModal 
        isOpen={isSpontaneousModalOpen}
        onClose={() => setIsSpontaneousModalOpen(false)}
      />
    </footer>
  );
}



function FooterCol({ title, links, section, onOpenSpontaneousModal }: FooterColProps) {
  // Fonction pour ouvrir le modal de liste d'attente avec les UTM parameters spécifiés
  function openWaitlistModal() {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : undefined;
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
      
      // UTM parameters spécifiés par l'utilisateur
      const utmData = {
        email: '',
        page_url: url,
        ref: typeof document !== 'undefined' ? document.referrer : undefined,
        utm_source: params.get('utm_source') || 'site',
        utm_medium: params.get('utm_medium') || 'internal_cta',
        utm_campaign: params.get('utm_campaign') || 'candidatez-footer',
        utm_content: params.get('utm_content') || 'footer',
        utm_term: params.get('utm_term') || 'candidatez',
        cta_id: params.get('cta_id') || 'footer_candidatez',
        asset_class: 'retail'
      };

      // Déclencher l'ouverture du modal
      if (typeof window !== 'undefined') {
        const w: any = window as any;
        if (w.offstoneOpenWaitlist) {
          w.offstoneOpenWaitlist(utmData);
        } else {
          (w.__offstone_waitlist_queue ||= []).push(utmData);
          w.dispatchEvent(new CustomEvent('waitlist:open', { detail: utmData }));
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du modal:', error);
    }
  }

  return (
    <div className="flex-1 min-w-[140px]">
      <h3 className="text-sm font-semibold text-white mb-3 tracking-wide uppercase">{title}</h3>
      <ul className="space-y-2">
        {links.map((l: FooterNavLink, index) => (
          <li key={`${l.label}-${l.href}-${index}`}>
            {l.disabled ? (
              <span className="text-[#8F9193] cursor-not-allowed" aria-disabled="true">{l.label}</span>
            ) : l.action === 'open-waitlist-modal' ? (
              <button
                onClick={() => {
                  trackFooterLinkClick(section, l.label, l.href);
                  openWaitlistModal();
                }}
                className="text-[#8F9193] hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0 text-left"
              >
                {l.label}
              </button>
            ) : l.action === 'open-spontaneous-application-modal' ? (
              <button
                onClick={() => {
                  trackFooterLinkClick(section, l.label, l.href);
                  onOpenSpontaneousModal?.();
                }}
                className="text-[#8F9193] hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0 text-left"
              >
                {l.label}
              </button>
            ) : (
              <Link
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener' : undefined}
                title={l.href.startsWith('http') ? 'Ouvre un nouvel onglet' : undefined}
                className="text-[#8F9193] hover:text-white transition-colors text-sm"
                onClick={() => trackFooterLinkClick(section, l.label, l.href)}
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Accordéon mobile pour chaque colonne
function AccordionFooterCol({ title, links, section, onOpenSpontaneousModal }: FooterColProps) {
  const [open, setOpen] = useState(false);

  // Fonction pour ouvrir le modal de liste d'attente avec les UTM parameters spécifiés
  function openWaitlistModal() {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : undefined;
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
      
      // UTM parameters spécifiés par l'utilisateur
      const utmData = {
        email: '',
        page_url: url,
        ref: typeof document !== 'undefined' ? document.referrer : undefined,
        utm_source: params.get('utm_source') || 'site',
        utm_medium: params.get('utm_medium') || 'internal_cta',
        utm_campaign: params.get('utm_campaign') || 'candidatez-footer',
        utm_content: params.get('utm_content') || 'footer',
        utm_term: params.get('utm_term') || 'candidatez',
        cta_id: params.get('cta_id') || 'footer_candidatez',
        asset_class: 'retail'
      };

      // Déclencher l'ouverture du modal
      if (typeof window !== 'undefined') {
        const w: any = window as any;
        if (w.offstoneOpenWaitlist) {
          w.offstoneOpenWaitlist(utmData);
        } else {
          (w.__offstone_waitlist_queue ||= []).push(utmData);
          w.dispatchEvent(new CustomEvent('waitlist:open', { detail: utmData }));
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du modal:', error);
    }
  }

  return (
    <div className="border border-[#23262A] rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-[#23262A] text-white text-sm font-semibold focus:outline-none focus-visible:ring"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`footer-accordion-${section}`}
      >
        {title}
        <span className="ml-2">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <ul id={`footer-accordion-${section}`} className="px-4 py-2 space-y-2 bg-[#23262A]">
          {links.map((l: FooterNavLink, index) => (
            <li key={`${l.label}-${l.href}-${index}`}>
              {l.disabled ? (
                <span className="text-[#8F9193] cursor-not-allowed" aria-disabled="true">{l.label}</span>
              ) : l.action === 'open-waitlist-modal' ? (
                <button
                  onClick={() => {
                    trackFooterLinkClick(section, l.label, l.href);
                    openWaitlistModal();
                  }}
                  className="text-[#8F9193] hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  {l.label}
                </button>
              ) : l.action === 'open-spontaneous-application-modal' ? (
                <button
                  onClick={() => {
                    trackFooterLinkClick(section, l.label, l.href);
                    onOpenSpontaneousModal?.();
                  }}
                  className="text-[#8F9193] hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener' : undefined}
                  title={l.href.startsWith('http') ? 'Ouvre un nouvel onglet' : undefined}
                  className="text-[#8F9193] hover:text-white transition-colors text-sm"
                  onClick={() => trackFooterLinkClick(section, l.label, l.href)}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
