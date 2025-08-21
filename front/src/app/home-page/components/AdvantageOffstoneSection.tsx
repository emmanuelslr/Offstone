'use client';

import React, { useEffect, useRef, useState } from 'react';
import ParaformRightHeroCardsStep from '@/components/ParaformRightHeroCardsStep';

export default function AdvantageOffstoneSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    // Déclenche l'animation du titre quand la section entre dans le viewport (une seule fois)
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

  // Animation reveal progress for the title (scroll-based, like TextReveal)
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
    const handleScroll = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Démarre la vidéo quand elle est à 200px du bas du viewport
      if (rect.top < windowHeight - 200) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.25;
    }
  }, []);

  return (
    <section>
      <div ref={sectionRef} className="w-full" style={{ backgroundColor: '#F7F6F1', paddingTop: '72px', paddingBottom: '13rem' }}>
        <div
          ref={titleRef}
          className={`mb-0 text-4xl md:text-5xl lg:text-[3.25rem] text-center font-light text-[#111] transition-all duration-[1800ms] ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'AllianceNo1-Regular, sans-serif', display: 'inline-block', width: '100%' }}
          id="advantage-title"
        >
          {(() => {
            // Two lines, keep <br />
            const text = ["L’avantage d'investir avec", "Offstone."];
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
        <div className="flex justify-center mt-20">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              minHeight: 260,
              width: 1380,
              height: 420,
              overflow: 'hidden',
              background: '#F6F4F0'
            }}
          >
            <video
              ref={videoRef}
              className="max-w-full max-h-full object-contain"
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
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <ParaformRightHeroCardsStep
          size={700}
          gap={18}
          intervalMs={2600}
          cropPx={44}
          cards={[
            { id: "2barbes", image: "/images/Buildings/2barbes.PNG" },
            { id: "truchet", image: "/images/Buildings/Truchet.jpg" },
            { id: "ienaa",  image: "/images/Buildings/Ienaa.jpg" },
          ]}
        />
      </div>
    </section>
  );
}
