'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrollSection from './ScrollSection';

const features = [
  {
    title: 'Data Integration',
    description: 'Seamlessly connect and integrate data from multiple sources into a unified platform.',
    icon: '/file.svg'
  },
  {
    title: 'Global Scale',
    description: 'Deploy and manage solutions across multiple regions with enterprise-grade security.',
    icon: '/globe.svg'
  },
  {
    title: 'Real-time Analytics',
    description: 'Process and analyze data in real-time to make informed decisions faster.',
    icon: '/window.svg'
  }
];

export default function Features() {
  return (
    <section className="pt-16 pb-0 bg-white" id="solutions">
      <div className="container-custom">
        <ScrollSection className="text-center mb-16">
          <h2 className="heading-lg mb-6 text-black">
            Transform Your Operations with
            <span className="text-gradient"> Advanced Analytics</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides the tools and insights you need to make better decisions
            and drive meaningful outcomes.
          </p>
        </ScrollSection>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {features.map((feature) => (
            <ScrollSection key={feature.title} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full bg-gray-50 backdrop-blur-sm rounded-xl p-10 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="mb-6 inline-block">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="heading-md mb-4 text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </ScrollSection>
          ))}
        </div>
      </div>
    </section>
  );
}
