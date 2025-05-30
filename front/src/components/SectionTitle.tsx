'use client';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  textColor?: 'light' | 'dark';
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  textColor = 'dark'
}: SectionTitleProps) {
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
        className={`text-5xl md:text-6xl font-light ${
          textColor === 'light' ? 'text-white' : 'text-[#383843]'
        } mb-8`}
      >
        {title}
      </motion.h2>
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
          className={`text-xl md:text-2xl ${
            textColor === 'light' ? 'text-gray-300' : 'text-gray-600'
          } max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
