'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function TextReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const mainControls = useAnimation();
  
  const lines = [""];

  return (
    <section className="w-full TextReveal" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-16">
        <div 
          className="text-2xl md:text-3xl lg:text-4xl text-center font-light tracking-tight text-[#383843]"
        >
          <div className="flex flex-col gap-8">
            {lines.map((line, lineIndex) => (
              <motion.div
                key={lineIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: lineIndex * 0.25 }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
