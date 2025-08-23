'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface SectionBadgeProps {
  text?: string;
  colorClass?: string;
}

const TYPING_SPEED = 60; // ms per character

export default function SectionBadge({
  text = 'INVESTISSONS ENSEMBLE',
  colorClass = 'text-gray-600',
}: SectionBadgeProps) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed('');
    setShowCursor(true);
    let i = 0;
    // Démarre l'animation du rond, puis le texte après un court délai
    const startTyping = () => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 800);
        }
      }, TYPING_SPEED);
    };
    // Délai très court pour laisser le rond apparaître avant le texte
    const timeout = setTimeout(startTyping, 180);
    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  return (
    <div className="flex items-center mb-1 pl-[2px] mt-[-30px]">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{
          duration: 1.2,
          times: [0, 0.5, 1],
          repeat: 2,
          repeatType: 'reverse',
        }}
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: '#96D5F7' }}
      />
      <span
        className={`uppercase tracking-widest font-medium text-[10px] sm:text-xs ${colorClass} ml-[6px]`}
        style={{
          fontWeight: 500,
          letterSpacing: '0.13em',
          fontFamily: 'inherit',
        }}
      >
        {displayed}
        {showCursor && (
          <span className="inline-block w-1 h-3 align-middle animate-pulse" style={{ background: 'transparent' }}>
            |
          </span>
        )}
      </span>
    </div>
  );
}
