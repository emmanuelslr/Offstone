'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 120%", "end 0%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });

  const backgroundColor = useTransform(
    smoothProgress,
    [0.1, 0.15, 0.85, 0.9],
    ['#ffffff', '#1E2124', '#1E2124', '#ffffff']
  );

  const textColor = useTransform(
    smoothProgress,
    [0.1, 0.15, 0.85, 0.9],
    ['#000000', '#ffffff', '#ffffff', '#000000']
  );

  return (
    <motion.div className="w-full">
      <motion.section 
        ref={sectionRef}
        className="relative py-8 transition-all duration-700"
      >
        <motion.div 
          className="absolute inset-0 z-0 transition-colors duration-700"
          style={{ backgroundColor }}
        />
        <motion.div 
          ref={contentRef}
          className="relative z-10 max-w-7xl mx-auto px-4 w-full"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-16">
              {/* Image left side */}
              <div className="flex items-center justify-end">
                <div className="relative w-[550px] h-[750px] flex items-center justify-center">
                  <div className="relative w-[92%] h-[92%] rounded-2xl overflow-hidden">
                    <Image
                      src="/JA.jpg"
                      alt="Citation de Jonathan Anguelov"
                      fill
                      priority
                      style={{ objectFit: 'cover', objectPosition: '50% 0%' }}
                      className="!relative !w-full !h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Content right side */}
              <div className="flex items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="space-y-6"
                  >
                    <blockquote>
                      <motion.p 
                        style={{ color: textColor }}
                        className="text-[2.5rem] leading-[1.2] font-light mb-8"
                      >
                        &quot;Notre équipe est un excellent partenaire à avoir dans son camp. Nous restons concentrés sur la vision globale, même pendant les périodes de distraction. Je les recommande vivement.&quot;
                      </motion.p>
                      <motion.footer 
                        style={{ color: textColor }}
                        className="mb-4"
                      >
                        <cite className="not-italic">
                          <span className="block text-xl font-light mb-2">Jonathan Anguelov</span>
                          <span className="text-base font-light opacity-80">Cofondateur & CEO de Aguesseau Capital</span>
                        </cite>
                      </motion.footer>
                    </blockquote>

                    <motion.div>
                      <Link 
                        href="#contact"
                        className="group"
                      >
                        <motion.div
                          className="inline-flex items-center justify-center w-[200px] py-3.5 text-[15px] font-normal tracking-[-0.01em] rounded border transition-all hover:bg-[#1E2124] hover:text-white hover:border-white"
                          style={{
                            backgroundColor: textColor,
                            color: backgroundColor,
                            borderColor: textColor
                          }}
                        >
                          CONTACTEZ-NOUS
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
