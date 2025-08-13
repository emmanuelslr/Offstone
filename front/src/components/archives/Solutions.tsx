'use client';
import Image from 'next/image';
import ScrollSection from './ScrollSection';
import { motion } from 'framer-motion';

const solutions = [
  {
    title: 'Financial Services',
    description: 'Modernize risk management and trading operations with real-time analytics.',
    image: '/solution1.jpg',
    stats: ['40% faster', 'Risk Analysis']
  },
  {
    title: 'Healthcare',
    description: 'Optimize patient care and operational efficiency through data-driven insights.',
    image: '/solution2.jpg',
    stats: ['60% improved', 'Patient Outcomes']
  }
];

export default function Solutions() {
  return (
    <section className="pt-16 bg-white" id="about">
      <div className="container-custom">
        <ScrollSection className="text-center mb-16">
          <h2 className="heading-lg mb-6 text-black">
            Industry-Leading
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help organizations across industries transform their operations
            through advanced data analytics and AI.
          </p>
        </ScrollSection>

        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <ScrollSection key={solution.title}>
              <div className={`flex flex-col lg:flex-row gap-4 lg:gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 relative aspect-[16/9] w-full rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  </div>
                </motion.div>

                <div className="flex-1 space-y-6">
                  <h3 className="heading-md text-black">{solution.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">{solution.description}</p>
                  <div className="flex gap-8">
                    {solution.stats.map((stat, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-2xl font-bold text-gradient">{stat}</p>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-[200px] py-3.5 text-[15px] font-normal tracking-[-0.01em] text-white bg-[#1E2124] rounded border border-[#1E2124] hover:bg-white hover:text-[#1E2124] transition-all mt-4"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>
      </div>
    </section>
  );
}
