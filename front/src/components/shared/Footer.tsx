import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#181818] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <span className="font-bold text-lg">Aguesseau Capital</span>
          <span className="block text-sm mt-1">© {new Date().getFullYear()} Tous droits réservés.</span>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com/company/aguesseau-capital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="w-6 h-6 fill-white hover:fill-[#F7B096] transition-colors" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.062-1.867-3.062-1.868 0-2.154 1.459-2.154 2.967v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.041 0 3.604 2.002 3.604 4.604v5.592z"/>
            </svg>
          </a>
          <a href="mailto:contact@aguesseaucapital.com" aria-label="Email">
            <svg className="w-6 h-6 fill-white hover:fill-[#F7B096] transition-colors" viewBox="0 0 24 24">
              <path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
