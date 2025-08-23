'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1E2124]">
      <div className="container-custom py-24">
        <div className="border-t border-[#333839] mb-16" />
        <div className="flex mb-16 relative footer-section">
          {/* Logo section */}
          <div className="mt-[12px] w-[200px]">
            <Link href="/" className="group">
              <svg width="160" height="48" viewBox="0 0 372 110" className="group">
                <path 
                  d="M30.3763 85.8259L23.3365 79.4513L40.1321 60.9743C41.144 59.8272 41.9181 58.4908 42.4097 57.0424C42.9014 55.5939 43.1006 54.0624 42.9961 52.5364C42.9293 51.0528 42.5682 49.5972 41.9338 48.2543C41.2994 46.9115 40.4043 45.7082 39.3007 44.7145L22.7452 30.2223L29.009 23.0532L45.5767 37.57C47.625 39.3975 49.2912 41.6125 50.4794 44.0871C51.6675 46.5617 52.3541 49.247 52.4994 51.9883C52.6747 54.7791 52.2946 57.5771 51.3812 60.2201C50.4678 62.8631 49.0392 65.2987 47.178 67.3858L30.3763 85.8259Z M78.8354 85.8258L62.0336 67.3488C60.1728 65.2612 58.744 62.8258 57.8296 60.183C56.9152 57.5402 56.5333 54.7424 56.706 51.9513C56.8549 49.2174 57.542 46.5397 58.7278 44.0719C59.9137 41.604 61.575 39.3945 63.6165 37.57L80.2027 23.0778L86.4664 30.2469L69.8802 44.7144C68.7821 45.7108 67.8928 46.9153 67.2637 48.258C66.6346 49.6007 66.2784 51.055 66.2156 52.5364C66.1102 54.0619 66.3085 55.5933 66.799 57.0416C67.2896 58.49 68.0626 59.8267 69.0733 60.9742L85.8751 79.4513L78.8354 85.8258Z"
                  className="transition-colors duration-300 fill-white group-hover:fill-[#4E6AE9]"
                />
                <path 
                  d="M124.267 39.56C134.527 39.56 142.897 45.23 142.897 60.44V86H135.517V60.89C135.517 51.35 130.927 46.31 123.007 46.31C114.457 46.31 109.147 52.7 109.147 63.05V86H101.767V23H109.147V47.66C111.847 43.34 116.527 39.56 124.267 39.56ZM172.926 86.54C159.156 86.54 150.156 77.09 150.156 63.05C150.156 49.1 158.976 39.56 171.936 39.56C184.896 39.56 193.356 47.75 193.716 61.34C193.716 62.33 193.626 63.41 193.536 64.49H157.896V65.12C158.166 73.85 163.656 79.97 172.386 79.97C178.866 79.97 183.906 76.55 185.436 70.61H192.906C191.106 79.79 183.546 86.54 172.926 86.54ZM158.346 58.37H185.796C185.076 50.45 179.676 46.04 172.026 46.04C165.276 46.04 159.066 50.9 158.346 58.37ZM222.748 86.54C209.338 86.54 200.518 77.45 200.518 63.14C200.518 49.1 209.608 39.56 222.928 39.56C234.178 39.56 241.288 45.86 243.178 55.94H235.438C234.088 49.82 229.588 46.13 222.838 46.13C214.018 46.13 208.078 53.15 208.078 63.14C208.078 73.13 214.018 79.97 222.838 79.97C229.408 79.97 233.908 76.19 235.348 70.34H243.178C241.378 80.24 233.908 86.54 222.748 86.54ZM254.689 74.03V46.85H246.409V40.1H254.689V27.23H262.069V40.1H273.949V46.85H262.069V73.94C262.069 77.81 263.419 79.25 267.379 79.25H274.669V86H266.659C257.839 86 254.689 82.13 254.689 74.03ZM301.071 86.54C287.661 86.54 278.301 77 278.301 63.05C278.301 49.1 287.661 39.56 301.071 39.56C314.481 39.56 323.841 49.1 323.841 63.05C323.841 77 314.481 86.54 301.071 86.54ZM301.071 79.97C310.161 79.97 316.281 72.86 316.281 63.05C316.281 53.24 310.161 46.13 301.071 46.13C291.981 46.13 285.861 53.24 285.861 63.05C285.861 72.86 291.981 79.97 301.071 79.97ZM330.238 70.88H337.798C338.068 76.28 342.838 80.24 350.488 80.24C356.968 80.24 361.558 77.45 361.558 73.22C361.558 67.46 356.518 67.01 349.678 66.2C339.418 64.94 331.228 62.87 331.228 53.33C331.228 44.96 338.878 39.47 349.228 39.56C359.668 39.65 367.228 44.51 367.948 54.05H360.388C359.848 49.37 355.528 45.86 349.228 45.86C342.838 45.86 338.518 48.56 338.518 52.79C338.518 57.83 343.378 58.46 350.038 59.27C360.478 60.53 368.848 62.51 368.848 72.68C368.848 81.23 360.658 86.54 350.488 86.54C338.608 86.54 330.418 80.96 330.238 70.88Z"
                  className="fill-white"
                />
              </svg>
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
          <div className="footer-bottom-link">© Hectos 2025</div>
          <nav className="flex flex-wrap md:flex-row items-center gap-x-8 md:mx-12">
            <Link href="#" className="footer-bottom-link">Privacy policy</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Legal notice</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Support</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Contact Us</Link>
            <Link href="#" className="text-[#8F9193] hover:text-white transition-colors text-sm">Security</Link>
          </nav>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin-button md:ml-auto">
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
