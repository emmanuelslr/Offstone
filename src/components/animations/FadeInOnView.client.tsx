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
    // Détecter si on est sur un écran mobile (inclut iPhone 14 Pro Max)
    const checkScreenSize = () => {
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsSmallScreen(isMobile);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Sur mobile, forcer la visibilité immédiatement
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      setIsVisible(true);
    }
    
    // Timeout de sécurité pour forcer l'affichage après 2 secondes
    const safetyTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      clearTimeout(safetyTimeout);
    };
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
      // Fallback pour s'assurer que le contenu est visible même si l'animation échoue
      onAnimationComplete={() => {
        const element = document.querySelector(`.${className.split(' ')[0]}`);
        if (element) {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </motion.div>
  );
}

