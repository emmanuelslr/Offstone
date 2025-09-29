// UTM Tracking utilities for HubSpot integration

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  first_touch_ts?: number;
  last_touch_ts?: number;
}

export class UTMTracker {
  private static readonly STORAGE_KEY = 'offstone_utm_params';

  /**
   * Parse UTM parameters from URL and store them in localStorage
   */
  static trackFromURL(): UTMParams {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMParams = {};

    // Extract UTM parameters
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key as keyof UTMParams] = value;
      }
    });

    // If we have UTM parameters, update storage
    if (Object.keys(utmParams).length > 0) {
      this.updateUTMStorage(utmParams);
    }

    return utmParams;
  }

  /**
   * Update UTM storage with new parameters
   */
  private static updateUTMStorage(newParams: UTMParams): void {
    if (typeof window === 'undefined') return;

    try {
      const existing = this.getStoredUTM();
      const now = Date.now();
      
      const updated: UTMParams = {
        ...existing,
        ...newParams,
        last_touch_ts: now
      };

      // Only set first_touch_ts if it doesn't exist
      if (!existing.first_touch_ts) {
        updated.first_touch_ts = now;
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      
      console.log('✅ UTM parameters stored:', updated);
    } catch (error) {
      console.error('❌ Error storing UTM parameters:', error);
    }
  }

  /**
   * Get stored UTM parameters from localStorage
   */
  static getStoredUTM(): UTMParams {
    if (typeof window === 'undefined') return {};

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('❌ Error reading UTM parameters:', error);
      return {};
    }
  }

  /**
   * Get UTM parameters for form submission (from URL or storage)
   */
  static getUTMForSubmission(): UTMParams {
    // First try to get from URL
    const urlParams = this.trackFromURL();
    
    // If no UTM in URL, get from storage
    if (Object.keys(urlParams).length === 0) {
      return this.getStoredUTM();
    }
    
    return urlParams;
  }

  /**
   * Clear stored UTM parameters
   */
  static clearUTM(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('✅ UTM parameters cleared');
    } catch (error) {
      console.error('❌ Error clearing UTM parameters:', error);
    }
  }
}

/**
 * Initialize UTM tracking on page load
 */
export function initializeUTMTracking(): void {
  if (typeof window === 'undefined') return;

  // Track UTM parameters immediately
  UTMTracker.trackFromURL();

  // Also track on popstate (back/forward navigation)
  window.addEventListener('popstate', () => {
    UTMTracker.trackFromURL();
  });
}

