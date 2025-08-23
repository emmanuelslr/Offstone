import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/shared/Footer";
import PreFooterSection from "@/components/shared/PreFooterSection";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Hectos Capital | Home",
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
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased min-h-screen w-full">
        <div className="mx-auto">
          {children}
        </div>
        <PreFooterSection />
        <Footer />
      </body>
    </html>
  );
}
