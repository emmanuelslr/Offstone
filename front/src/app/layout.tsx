import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Hectos Capital | Home",
  description: "Transform your operations with cutting-edge data analytics and AI solutions.",
  icons: {
    icon: '/Logos/X bleu.svg',
    apple: '/Logos/X bleu.svg',
  },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden min-h-screen w-full">
        <div className="mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
