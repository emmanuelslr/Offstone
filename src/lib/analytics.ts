// Lightweight analytics helper supporting GA4 (gtag) and Meta Pixel (fbq)
// Safe to import in client components; no-ops if libs not present
export type AnalyticsPayload = Record<string, any>;

export function track(event: string, payload: AnalyticsPayload = {}) {
  try {
    if (typeof window !== 'undefined') {
      const p = { ...payload };
      // Google Analytics 4 via gtag
      const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
      if (typeof gtag === 'function') {
        gtag('event', event, p);
      }
      // Meta Pixel
      const fbq = (window as any).fbq as undefined | ((...args: any[]) => void);
      if (typeof fbq === 'function') {
        fbq('trackCustom', event, p);
      }
    }
  } catch {}
}
