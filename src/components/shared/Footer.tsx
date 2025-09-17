'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1E2124]">
      <div className="container-custom pt-0 md:pt-0 pb-24">
        <div className="border-t border-[#333839] mb-16" />
        <div className="flex mb-16 relative footer-section">
          {/* Logo section */}
          <div className="mt-[20px] w-[200px]">
            <Link href="/" className="group">
              <span
                className="block leading-none select-none antialiased text-white"
                style={{
                  fontFamily: "'Alliance No.1', Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: 28,
                  letterSpacing: '0.02em'
                }}
              >
                Offstone.
              </span>
            </Link>
          </div>

          {/* Navigation Grid */}
          <div className="hidden lg:flex pl-[280px]">
            <div className="grid grid-cols-4 gap-x-8 w-[720px]">
              {/* Product */}
              <div className="space-y-4">
                <h3 className="footer-heading">Product</h3>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="footer-link">How to launch</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Why Swan</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Features</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Pricing</Link>
                </div>
              </div>

              {/* Use cases */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Use cases</h3>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Financial</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Proptech</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">HR tech</Link>
                </div>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Company</h3>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">About</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Customers</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Blog</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Jobs</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">FAQ</Link>
                </div>
              </div>

              {/* For developers */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white whitespace-nowrap">For developers</h3>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Documentation</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Play in Sandbox</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">System status</Link>
                  <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">API Explorer</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Grid */}
          <div className="grid grid-cols-2 gap-x-24 gap-y-12 lg:hidden mt-16">
            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Product</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm whitespace-nowrap">How to launch</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm whitespace-nowrap">Why Swan</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Features</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Pricing</Link>
              </div>
            </div>

            {/* Use cases */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Use cases</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Financial</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Proptech</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">HR tech</Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Company</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">About</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Customers</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Blog</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Jobs</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">FAQ</Link>
              </div>
            </div>

            {/* For developers */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">For developers</h3>
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Documentation</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Play in Sandbox</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">System status</Link>
                <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">API Explorer</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-[#333839] border-t">
          <div className="footer-bottom-link">© Offstone 2025</div>
          <nav className="flex flex-wrap md:flex-row items-center gap-x-8 md:mx-12">
            <Link href="#" className="footer-bottom-link">Privacy policy</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Legal notice</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Support</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Contact Us</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Security</Link>
          </nav>
          <Link href="https://www.linkedin.com/company/offstone-fr" target="_blank" rel="noopener noreferrer" className="linkedin-button md:ml-auto">
            <span className="sr-only">LinkedIn</span>
            <Image
              src="/images/icones/linkedin.svg"
              alt="LinkedIn"
              width={32}
              height={32}
              priority
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
