'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SecondHero() {
  return (
    <section className="w-full bg-white">
      <div className="container-custom py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="max-w-xl"
          >
            <h2 className="text-[34px] sm:text-[44px] text-black font-light tracking-tight leading-tight mb-6">
              Foundational Software <br className="hidden sm:block" />
              for the Future
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed">
              Our platforms are more than tools—they&apos;re a strategic advantage, empowering organizations to harness data and drive actionable insights.
            </p>
            <a 
              href="#learn-more" 
              className="inline-flex items-center text-[#4E6AE9] font-medium hover:text-blue-700 transition-colors"
            >
              Learn More
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="/solution1.jpg"
              alt="Platform visualization"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
