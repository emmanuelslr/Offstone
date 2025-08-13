'use client';
import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center';
  textColor?: 'light' | 'dark';
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  fontSize?: string;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  textColor = 'dark',
  fontWeight = 'normal',
  fontSize = 'text-4xl md:text-5xl'
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
      <h2
        className={`${fontSize} ${fontWeightClass[fontWeight]} ${
          textColor === 'light' ? 'text-white' : 'text-[#383843]'
        } mb-8`}
      >
        {title}
      </h2>
      {title === "Investissez là où la valeur se construit." && (
        <svg
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
        </svg>
      )}
      {subtitle && (
        <p
          className={`text-lg md:text-xl ${
            textColor === 'light' ? 'text-gray-400' : 'text-gray-600'
          } max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
