"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function FadeInOnView({ children, className = "", delay = 0, y = 20 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Détecter si on est sur un petit écran
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 375);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Sur petit écran, forcer la visibilité immédiatement
    if (window.innerWidth <= 375) {
      setIsVisible(true);
    }
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sur petit écran, afficher directement sans animation
  if (isSmallScreen) {
    return (
      <div className={className} style={{ opacity: 1, transform: 'translateY(0)' }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

