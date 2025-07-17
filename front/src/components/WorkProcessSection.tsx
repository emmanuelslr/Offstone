"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function WorkProcessSection() {
  const workProcessRef = useRef(null);
  const isInView = useInView(workProcessRef, { once: true, margin: '-95% 0px' });
  const controls = useAnimation();
  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    if (isInView) {
      setScrollLocked(true);
      document.body.style.overflow = 'hidden';
      controls.start('stacked').then(() => {
        setScrollLocked(false);
        document.body.style.overflow = '';
      });
    }
  }, [isInView, controls]);

  const steps = [
    {
      number: 1,
      title: "Schematic Design",
      description: "Where a preliminary design is created"
    },
    {
      number: 2,
      title: "Design Development",
      description: "Where details of the design are fleshed out"
    },
    {
      number: 3,
      title: "Construction Documents",
      description: "Where detailed drawings and specifications are created"
    },
    {
      number: 4,
      title: "Construction Administration",
      description: "Where the building is overseen during construction to ensure it is built according to the design"
    }
  ];

  return (
    <section className="pt-40 pb-24 bg-white min-h-[150vh]" ref={workProcessRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-32">
          {/* Left Side Content */}
          <div className="lg:w-2/5">
            <h2 className="text-4xl font-bold mb-6 text-black">How we manage</h2>
            <p className="text-lg text-gray-600 mb-8">
              We are a team of passionate architects, designers, and engineers dedicated to creating innovative and sustainable designs for our clients. Our company specializes in designing residential homes, commercial buildings, and public spaces that are functional, beautiful, and tailored to meet our clients' needs. We work closely with our clients throughout the design process, from concept development to construction, to ensure that their vision is brought to life.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              About us
            </button>
          </div>

          {/* Right Side Cards */}
          <div className="lg:w-3/5 mt-[320px]">
            <div className="sticky top-1/2 -translate-y-1/2 h-[600px]">
              <div
                className="relative h-full"
                style={{
                  pointerEvents: scrollLocked ? 'none' : 'auto'
                }}
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="bg-gray-100 rounded-lg p-8 shadow-lg w-full absolute left-0"
                    style={{
                      top: `${index * 120}px`,
                      zIndex: index + 1,
                    }}
                    initial="unstacked"
                    animate={controls}
                    variants={{
                      unstacked: { top: `${index * 120}px` },
                      stacked: { top: '0px' }
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.3
                    }}
                  >
                    <span className="block text-6xl font-bold text-black mb-4">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
