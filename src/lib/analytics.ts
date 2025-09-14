"use client";

type GAEvent = {
  name: string;
  params?: Record<string, unknown>;
};

export function trackEvent(event: GAEvent) {
  try {
    // Google Tag (gtag)
    // @ts-ignore
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      // @ts-ignore
      window.gtag("event", event.name, event.params || {});
      return;
    }
    // Google Tag Manager (dataLayer)
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      window.dataLayer.push({ event: event.name, ...(event.params || {}) });
    }
  } catch (e) {
    // avoid crashing on analytics
    console.warn("trackEvent error", e);
  }
}

// Backward-compat simple alias
export function track(name: string, params?: Record<string, unknown>): void;
export function track(event: GAEvent): void;
export function track(arg1: string | GAEvent, arg2?: Record<string, unknown>) {
  const evt: GAEvent = typeof arg1 === "string" ? { name: arg1, params: arg2 } : arg1;
  trackEvent(evt);
}

// Footer-specific GA4 helpers
export function trackFooterLinkClick(section: string, label: string, href: string) {
  track('footer_link_click', { section, label, href });
}

export function trackNewsletterSubmit(source: string) {
  track('newsletter_submit', { source });
}

export function trackOutboundClick(label: string, source: string) {
  track('outbound_click', { label, source });
}
