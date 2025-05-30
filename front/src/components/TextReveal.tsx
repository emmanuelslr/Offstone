'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function TextReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  
  const text = "Our software powers real-time, AI-driven decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines.";
  const words = text.split(" ");

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Configuration for our animations
  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: i * 0.1
      }
    })
  };

  return (
    <section ref={ref} className="w-full TextReveal">
      <div className="max-w-[1400px] mx-auto px-4 py-16 md:py-20">
        <motion.div 
          className="text-4xl md:text-5xl lg:text-[4rem] text-center font-light leading-tight tracking-tight text-[#383843]"
          animate={{
            y: [0, -30, -50, -60, -50, -30, 0],
          }}
          transition={{
            duration: 20,
            times: [0, 0.3, 0.45, 0.5, 0.55, 0.7, 1],
            ease: [0.2, 0.05, 0.05, 0.2],
            repeat: Infinity,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                custom={i}
                variants={revealVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
