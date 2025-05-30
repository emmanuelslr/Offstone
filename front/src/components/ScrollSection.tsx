'use client';
import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollSection({ children, className = '' }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
