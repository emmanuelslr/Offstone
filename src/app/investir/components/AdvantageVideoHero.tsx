'use client';

import React, { useEffect, useRef, useState } from 'react';
import SectionBadge from '@/app/home-page/components/SectionBadge';

export default function AdvantageVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [reveal, setReveal] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(false);

  useEffect(() => {
    if (titleVisible) {
      const timeout = setTimeout(() => setBadgeVisible(true), 600);
      return () => clearTimeout(timeout);
    } else {
      setBadgeVisible(false);
    }
  }, [titleVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (titleVisible) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 20) {
        setTitleVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [titleVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const revealStart = rect.top - windowHeight * 0.7;
      const revealEnd = rect.bottom - windowHeight * 0.3;
      let p = 0;
      if (revealEnd <= 0) {
        p = 1;
      } else if (revealStart >= 0) {
        p = 0;
      } else {
        p = 1 - revealEnd / (rect.height + windowHeight * 0.4);
        p = Math.max(0, Math.min(1, p));
      }
      setReveal(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) videoRef.current.play();
      else videoRef.current.pause();
    }
  }, [isVisible]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 6.5;
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-[#F7F6F1] pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-6 md:pb-8 lg:pb-10 xl:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {badgeVisible && (
          <div className="flex justify-center mb-6 md:mb-8 transition-opacity duration-700 opacity-100">
            <SectionBadge colorClass="text-gray-600" text="IMMEUBLES EXCLUSIFS" />
          </div>
        )}
        <div
          ref={titleRef}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[3.5rem] text-center font-light text-[#111] transition-all duration-[1800ms] ease-out mb-8 md:mb-12 lg:mb-16 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'AllianceNo1-Regular, sans-serif' }}
          id="advantage-title"
        >
          {(() => {
            const text = ["L'avantage d'investir", "avec Offstone."];
            const allLetters = text.join('');
            const totalLetters = allLetters.length;
            const revealedCount = Math.floor(reveal * totalLetters);
            let letterIndex = 0;
            return text.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {line.split('').map((char, i) => {
                  const isRevealed = letterIndex < revealedCount;
                  const span = (
                    <span
                      key={i}
                      style={{
                        color: isRevealed ? '#111' : '#928D80',
                        transition: 'color 0.3s cubic-bezier(.77,0,.18,1)',
                        willChange: 'color',
                      }}
                    >
                      {char}
                    </span>
                  );
                  letterIndex++;
                  return span;
                })}
                {lineIdx === 0 && <br />}
              </React.Fragment>
            ));
          })()}
        </div>
        <div className="flex justify-center mb-6 md:mb-8">
          <button
            className="inline-flex items-center justify-center h-11 bg-black text-white font-normal rounded-full px-6 text-base shadow-sm border border-black transition hover:bg-[#F7B096] hover:text-black hover:border-[#F7B096] group"
            type="button"
          >
            Investir
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-[90vw] mx-[calc(50%-45vw)] md:w-[88vw] md:mx-[calc(50%-44vw)] xl:w-[82vw] xl:mx-[calc(50%-41vw)] 2xl:w-[78vw] 2xl:mx-[calc(50%-39vw)] max-w-[1560px] xl:max-w-[1720px] 2xl:max-w-[1880px] aspect-[16/9] bg-[#F6F4F0] rounded-lg lg:rounded-xl overflow-hidden relative flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-contain object-top"
              src="/videos/TEST3_Component AdvantageOffStone.mp4"
              muted
              playsInline
              controls={false}
              style={{ background: '#F7F6F1' }}
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = videoRef.current.duration - 0.1;
                  videoRef.current.pause();
                }
              }}
            />
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-2 sm:h-3 md:h-4 bg-[#F6F4F0]" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 sm:h-3 md:h-4 bg-[#F6F4F0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

