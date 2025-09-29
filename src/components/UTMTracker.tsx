'use client';

import { useEffect } from 'react';
import { initializeUTMTracking } from '@/lib/utm-tracking';

export default function UTMTracker() {
  useEffect(() => {
    initializeUTMTracking();
  }, []);

  return null; // This component doesn't render anything
}

