'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const slides = [
  {
    image: '/Immo.jpg',
    title: 'Nous cultivons notre passion pour l\'immobilier',
    description: 'Une expertise immobilière approfondie pour des investissements durables'
  },
  {
    image: '/Tech.avif',
    title: 'Innovation technologique',
    description: 'Des solutions modernes pour une gestion optimisée'
  },
  {
    image: '/ESG.png',
    title: 'Engagement ESG',
    description: 'Un investissement responsable pour un avenir durable'
  }
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      ref={ref}
      className="relative w-full dark-section overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 50 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-20">
        <div className="relative h-[600px] rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 6, ease: "linear" }}
              >
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="brightness-75"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
                >
                  {slides[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl md:text-2xl text-white/90"
                >
                  {slides[currentIndex].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-8 left-8 md:left-16 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
