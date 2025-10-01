'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 200%", "end 0%"]
  });

  // Parallax effect for image
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const backgroundColor = "#1E2124";
  const textColor = "#fff";

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 transition-all duration-800 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <div className="absolute inset-0 z-0 bg-[#1E2124]" />
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 h-auto" style={{marginTop: 'auto', marginBottom: 'auto'}}>
          {/* Image left side */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-[420px] h-[420px] overflow-visible flex items-center justify-center"
              style={{ y: parallax }}
            >
              <Image
                src="/images/personnalites/JONATHAN_ANGUELOV_0048bd2_fcf52cbd2a.webp?v=3"
                alt="Jonathan Anguelov"
                fill
                priority
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                className="!relative scale-[1.5]"
              />
            </motion.div>
          </div>
          {/* Content right side */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-xl ml-auto mt-[-40px] md:mt-[-80px] md:pl-12">
              <blockquote>
                <p
                  style={{ color: textColor }}
                  className="text-[1.8rem] leading-[1.3] font-light mb-8 max-w-full text-center md:text-left"
                >
                  « Nous ne structurons que<br />
                  des opérations dans lesquelles<br />
                  nous investissons nous-mêmes.<br />
                  C’est une exigence que nous<br />
                  appliquons à chaque décision. »
                </p>
                <footer
                  style={{ color: textColor }}
                  className="mb-4"
                >
                  <cite className="not-italic">
                    <span className="block text-xl font-light mb-2">Jonathan Anguelov</span>
                    <span className="text-base font-light opacity-80">Co-Fondateur de Kelios Capital</span>
                  </cite>
                </footer>
              </blockquote>
              <div className="flex justify-center md:justify-start">
                <Link
                  href="#contact"
                  className="group"
                >
                  <div
                    className="inline-flex items-center justify-center w-[200px] py-3.5 text-[15px] font-normal tracking-[-0.01em] rounded border transition-all hover:bg-[#1E2124] hover:text-white hover:border-white"
                    style={{
                      backgroundColor: textColor,
                      color: "#00D481",
                      borderColor: textColor
                    }}
                  >
                    CONTACTEZ-NOUS
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
