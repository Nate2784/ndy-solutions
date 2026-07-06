import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Imported Component
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ndy Solutions — Web Design & Software Development",
  description: "We build premium corporate websites and custom software systems tailored exactly to your business needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes ambient-drift-1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(50px, -80px) scale(1.1); }
            66% { transform: translate(-30px, 40px) scale(0.95); }
          }
          @keyframes ambient-drift-2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-60px, 70px) scale(1.15); }
          }
          .animate-drift-slow-1 {
            animation: ambient-drift-1 22s infinite ease-in-out;
          }
          .animate-drift-slow-2 {
            animation: ambient-drift-2 28s infinite ease-in-out;
          }
        `}} />
      </head>
      <body className="min-h-full bg-white text-zinc-900 font-sans flex flex-col relative overflow-x-hidden selection:bg-[#00f2fe] selection:text-black">
        
        {/* Global Living Background Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[15%] left-[10%] w-150 h-150 rounded-full bg-cyan-100/20 blur-[130px] animate-drift-slow-1" />
          <div className="absolute bottom-[25%] right-[5%] w-175 h-175 rounded-full bg-blue-50/40 blur-[140px] animate-drift-slow-2" />
        </div>

        {/* Sticky Modular Header */}
        <Header />

        {/* Dynamic Inner Page Slots */}
        <main className="flex-auto relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24">
          {children}
        </main>

        {/* Layout-Aligned Go To Top Button */}
        <ScrollToTop />

        {/* Separated Lavish Footer */}
        <Footer />

      </body>
    </html>
  );
}