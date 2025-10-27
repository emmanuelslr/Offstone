'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { buildHubspotMeetingUrl } from '@/lib/hubspot';

type Props = {
  email?: string;
  firstname?: string;
  lastname?: string;
  className?: string;
};

const MOBILE_BREAKPOINT = 1024;

export default function HubSpotMeeting({ email, firstname, lastname, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const src = useMemo(() => {
    const params: Record<string, string | undefined> = {
      email,
      firstname,
      lastname,
    };

    if (isMobile) {
      params.hideEventTypeDetails = 'true';
      params.hideLandingPageDetails = 'true';
    }

    return buildHubspotMeetingUrl(params);
  }, [email, firstname, lastname, isMobile]);

  const containerStyle = useMemo<CSSProperties>(() => {
    const minHeight = isMobile ? 600 : 450;
    return {
      minHeight,
      maxHeight: isMobile ? 'calc(100vh - 80px)' : 'min(450px, calc(100vh - 200px))',
      height: isMobile ? 'calc(100vh - 80px)' : 'min(450px, calc(100vh - 200px))',
      width: '100%',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      background: 'transparent',
    };
  }, [isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsLoaded(false);

    let iframe = iframeRef.current;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframeRef.current = iframe;
    }

    iframe.src = src;
    iframe.title = 'HubSpot meeting';
    iframe.allow = 'microphone; camera; geolocation';
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '100%';
    iframe.onload = () => setIsLoaded(true);

    container.replaceChildren(iframe);

    return () => {
      if (iframe) {
        iframe.onload = null;
      }
    };
  }, [src]);

  const wrapperClass = [
    'relative w-full rounded-2xl',
    isMobile ? 'border border-white/15' : 'border border-white/10 bg-white/[0.04] backdrop-blur-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass} style={containerStyle}>
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0A1E42]/25 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Chargement du calendrier</p>
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
