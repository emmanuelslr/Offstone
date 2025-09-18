/**
 * Microsoft Clarity utility functions
 * Provides type-safe access to Clarity tracking
 */

declare global {
  interface Window {
    clarity: (action: string, ...args: any[]) => void;
  }
}

/**
 * Check if Clarity is loaded and available
 */
export const isClarityLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
};

/**
 * Track a custom event with Clarity
 */
export const trackClarityEvent = (eventName: string, data?: any): void => {
  if (isClarityLoaded()) {
    window.clarity('event', eventName, data);
  } else {
    console.warn('Clarity not loaded, event not tracked:', eventName);
  }
};

/**
 * Set custom tags for the current session
 */
export const setClarityTags = (tags: Record<string, string>): void => {
  if (isClarityLoaded()) {
    window.clarity('set', tags);
  } else {
    console.warn('Clarity not loaded, tags not set:', tags);
  }
};

/**
 * Identify a user with Clarity
 */
export const identifyClarityUser = (userId: string, sessionId?: string, pageId?: string, userHint?: string): void => {
  if (isClarityLoaded()) {
    window.clarity('identify', userId, sessionId, pageId, userHint);
  } else {
    console.warn('Clarity not loaded, user not identified:', userId);
  }
};

/**
 * Track page views manually (usually not needed as Clarity auto-tracks)
 */
export const trackClarityPageView = (pageUrl?: string): void => {
  if (isClarityLoaded()) {
    window.clarity('pageview', pageUrl);
  } else {
    console.warn('Clarity not loaded, page view not tracked');
  }
};
