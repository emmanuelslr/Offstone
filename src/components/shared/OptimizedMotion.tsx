'use client';

// Direct re-exports to avoid React Fast Refresh proxy conflicts
export { 
  motion, 
  AnimatePresence, 
  useInView, 
  useScroll, 
  useTransform, 
  useSpring 
} from 'framer-motion';

// Import motion separately for creating element shortcuts
import { motion as m } from 'framer-motion';

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

// Hooks are re-exported directly above to avoid duplicate names

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
