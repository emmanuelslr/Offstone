'use client';
import { createContext, useContext } from 'react';
import { MotionValue } from 'framer-motion';

type ColorContextType = {
  backgroundColor: MotionValue<string>;
  textColor: MotionValue<string>;
};

export const ColorContext = createContext<ColorContextType | null>(null);

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};
