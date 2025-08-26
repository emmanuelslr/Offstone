import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import Footer from "@/components/shared/Footer";
import HydrationFix from "@/components/shared/HydrationFix";
import { repoName } from "@/lib/prismicio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Offstone | Home",
  description: "Transform your operations with cutting-edge data analytics and AI solutions.",
  icons: {
    icon: '/logos/x-bleu.svg',
    apple: '/logos/x-bleu.svg',
  },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Script pour nettoyer l'attribut cz-shortcut-listen AVANT l'hydratation */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Nettoyer immédiatement si le body existe déjà
                if (document.body) {
                  document.body.removeAttribute('cz-shortcut-listen');
                }
                
                // Observer les changements sur le body
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'cz-shortcut-listen') {
                      document.body.removeAttribute('cz-shortcut-listen');
                    }
                  });
                });
                
                // Attendre que le body soit disponible
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    if (document.body) {
                      observer.observe(document.body, {
                        attributes: true,
                        attributeFilter: ['cz-shortcut-listen']
                      });
                    }
                  });
                } else {
                  if (document.body) {
                    observer.observe(document.body, {
                      attributes: true,
                      attributeFilter: ['cz-shortcut-listen']
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-black antialiased min-h-screen w-full">
        <HydrationFix />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repoName} />
      </body>
    </html>
  );
}
