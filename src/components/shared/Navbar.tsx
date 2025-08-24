'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
 

export default function Navbar({ forceWhiteStyle = false }: { forceWhiteStyle?: boolean }) {
  const [isOnWhiteSection, setIsOnWhiteSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const peopleDoSection = document.querySelector('.PeopleDoSection');
      const navbarOffset = 16; // top-4
      const navbarHeight = 80;
      let isOnWhite = false;

      if (peopleDoSection) {
        const rect = peopleDoSection.getBoundingClientRect();
        // Change color a bit earlier (e.g. 40px before the section reaches the navbar)
        const earlyOffset = 16;
        if (rect.top <= navbarHeight + navbarOffset + earlyOffset) {
          isOnWhite = true;
        }
      }
      setIsOnWhiteSection(isOnWhite);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
<header
      className={`fixed top-0 sm:top-4 inset-x-0 sm:inset-x-4 lg:inset-x-8 mx-auto max-w-[92rem] z-[100] sm:rounded-lg transition-all duration-300 ease-in-out ${
        (isOnWhiteSection || forceWhiteStyle) ? 'bg-white/[0.45] backdrop-blur-[45px] backdrop-saturate-[180%] border-none' : 'bg-white/[0.10] backdrop-blur-[5px] shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 sm:h-20">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="group">
            <span
              className="block leading-none select-none antialiased"
              style={{
                fontFamily: "'Alliance No.1', Arial, sans-serif",
                fontWeight: 500,
                fontSize: 28,
                letterSpacing: '0.02em',
                color: (isOnWhiteSection || forceWhiteStyle) ? '#000000' : '#FFFFFF'
              }}
            >
              Offstone.
            </span>
          </Link>
        </div>
        <ul className="hidden md:flex items-center space-x-12 mx-auto flex-1 justify-center">
          <li>
<Link href="/notre-methode" className={`text-[15px] font-medium transition-all duration-300 ${
              (isOnWhiteSection || forceWhiteStyle) ? 'text-black hover:text-[#F7B096]' : 'text-white hover:text-[#F7B096]'
            }`}>
              Notre Méthode
            </Link>
          </li>
          <li>
<Link href="/investir" className={`text-[15px] font-medium transition-all duration-300 ${
              (isOnWhiteSection || forceWhiteStyle) ? 'text-black hover:text-[#F7B096]' : 'text-white hover:text-[#F7B096]'
            }`}>
              Investir
            </Link>
          </li>
          <li>
            <Link href="/notre-histoire" className={`text-[15px] font-medium transition-all duration-300 ${
              (isOnWhiteSection || forceWhiteStyle) ? 'text-black hover:text-[#F7B096]' : 'text-white hover:text-[#F7B096]'
            }`}>
              Notre Histoire
            </Link>
          </li>
          <li>
            <Link href="/ressources" className={`text-[15px] font-medium transition-all duration-300 ${
              (isOnWhiteSection || forceWhiteStyle) ? 'text-black hover:text-[#F7B096]' : 'text-white hover:text-[#F7B096]'
            }`}>
              Ressources
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          <Link href="#expert" className={`inline-flex items-center justify-center px-6 py-2 text-[15px] font-medium tracking-[-0.01em] shadow-sm rounded-full transition-all ${
            (isOnWhiteSection || forceWhiteStyle)
              ? 'text-black border border-black hover:bg-black hover:text-white' 
              : 'text-white border border-white hover:bg-white hover:text-black'
          }`}>
            Parler à un expert
          </Link>
          <Link href="#membre" className={`inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium tracking-[-0.01em] shadow-sm rounded-full transition-all ${
            (isOnWhiteSection || forceWhiteStyle)
              ? 'text-black bg-[#F7B096] border border-[#F7B096] hover:bg-white hover:text-[#F7B096]' 
              : 'text-black bg-[#F7B096] border border-[#F7B096] hover:bg-white hover:text-[#F7B096]'
          }`}>
            Devenir Membre
          </Link>
        </div>

        <button 
          className="md:hidden p-2 -mr-2" 
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className={`w-6 h-6 transition-all duration-300 ${(isOnWhiteSection || forceWhiteStyle) ? 'text-black' : 'text-white'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>

    {/* Mobile Menu */}
    <div 
      className={`md:hidden fixed inset-0 bg-[#0a0a0a] z-[100] transition-transform duration-300 ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
        <div 
          className="flex flex-col items-center justify-center min-h-screen space-y-8 px-6 bg-[#0a0a0a]"
          onClick={(e) => e.stopPropagation()}
        >
<Link 
href="/notre-methode"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[17px] font-medium text-white hover:text-[#F7B096] transition-colors"
          >
            Notre Méthode
          </Link>
            <Link 
href="/investir"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[17px] font-medium text-white hover:text-[#F7B096] transition-colors"
          >
            Investir
          </Link>
          
<Link 
            href="/notre-histoire" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[17px] font-medium text-white hover:text-[#F7B096] transition-colors"
          >
            Notre Histoire
          </Link>
<Link 
            href="/ressources" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[17px] font-medium text-white hover:text-[#F7B096] transition-colors"
          >
            Ressources
          </Link>
          <div className="flex flex-col gap-4 w-full max-w-[280px] mt-4">
            <Link 
              href="#expert" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full px-6 py-2 text-[15px] font-medium border border-white text-white shadow-sm rounded-full hover:bg-white hover:text-black transition-all text-center"
            >
              Parler à un expert
            </Link>
<Link 
  href="#membre" 
  onClick={() => setIsMobileMenuOpen(false)}
  className="w-full px-6 py-2.5 text-[15px] font-medium bg-[#F7B096] text-black border border-[#F7B096] shadow-sm rounded-full hover:bg-white hover:text-[#F7B096] transition-all text-center"
>
  Devenir Membre
</Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-5 right-4 p-2 text-white"
              aria-label="Close menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
