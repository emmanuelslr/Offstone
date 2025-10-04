'use client';

// Imports optimisés de framer-motion pour réduire la taille du bundle
export { motion } from 'framer-motion';
export { AnimatePresence } from 'framer-motion';
export { useInView } from 'framer-motion';
export { useScroll } from 'framer-motion';
export { useTransform } from 'framer-motion';
export { useSpring } from 'framer-motion';

// Composants d'animation optimisés
import { motion as m, useInView as useInViewHook, useScroll as useScrollHook, useTransform as useTransformHook, useSpring as useSpringHook } from 'framer-motion';

// Composant de base optimisé
export const MotionDiv = m.div;
export const MotionSection = m.section;
export const MotionH1 = m.h1;
export const MotionH2 = m.h2;
export const MotionH3 = m.h3;
export const MotionP = m.p;
export const MotionSpan = m.span;
export const MotionButton = m.button;
export const MotionImg = m.img;

// Hooks optimisés
export const useInView = useInViewHook;
export const useScroll = useScrollHook;
export const useTransform = useTransformHook;
export const useSpring = useSpringHook;

// Variants d'animation prédéfinis pour éviter la duplication
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Transitions optimisées
export const smoothTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
};

export const fastTransition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1]
};

export const slowTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1]
};
