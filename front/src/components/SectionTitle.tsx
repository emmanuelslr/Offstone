'use client';
import { motion } from 'framer-motion';

import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center';
  textColor?: 'light' | 'dark';
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  textColor = 'dark',
  fontWeight = 'normal'
}: SectionTitleProps) {
  const fontWeightClass = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <div className={`w-full mb-20 px-4 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
className={`text-4xl md:text-5xl ${fontWeightClass[fontWeight]} ${
  textColor === 'light' ? 'text-white' : 'text-[#383843]'
} mb-8`}
      >
        {title}
      </motion.h2>
      {title === "Investissez là où la valeur se construit." && (
        <motion.svg
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          width="900"
          height="64"
          viewBox="0 0 900 64"
          fill="none"
          style={{ display: "block", margin: "-36px auto 0 auto" }}
          preserveAspectRatio="none"
        >
          <path
            d="M30 16 Q 225 10, 450 14 Q 675 18, 870 12"
            stroke="#00D481"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M32 17 Q 225 11, 450 15 Q 675 17, 868 13"
            stroke="#00D481"
            strokeWidth="1.95"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>
      )}
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.1,
              ease: [0.2, 0.65, 0.3, 0.9],
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
className={`text-lg md:text-xl ${
  textColor === 'light' ? 'text-gray-400' : 'text-gray-600'
} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
