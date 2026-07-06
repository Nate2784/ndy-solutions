"use client";

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "01", label: "About", href: "#about" },
    { id: "02", label: "Services", href: "#services" },
    { id: "03", label: "Solutions", href: "#solutions" },
    { id: "04", label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/40 bg-gradient-to-r from-white/95 via-white/90 to-[var(--color-aqua-primary)]/20 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-14 md:h-16 flex items-center justify-between gap-4">
        
        {/* ================= COLUMN 1: TYPOGRAPHIC LOGO ================= */}
        <a href="/" className="flex flex-col items-start leading-none group select-none relative z-50 flex-shrink-0">
          <span className="text-lg md:text-xl font-black tracking-tighter text-zinc-950 group-hover:text-zinc-800 transition-colors">
            NDY
          </span>
          <span className="text-[6px] md:text-[7px] font-mono tracking-[0.5em] text-zinc-400 group-hover:text-zinc-600 uppercase mt-1 pl-[1px] transition-colors">
            SOLUTIONS
          </span>
        </a>
        
        {/* ================= COLUMN 2: BALANCED NAV INDEX ================= */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={item.href} 
              className="text-zinc-500 hover:text-zinc-950 transition-colors flex items-center gap-1.5 relative py-1 group/link"
            >
              <span className="text-zinc-300 text-[9px] font-light font-sans group-hover/link:text-zinc-400 transition-colors">
                {item.id}
              </span> 
              <span className="font-semibold">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-zinc-950 transition-all duration-300 ease-out group-hover/link:w-full" />
            </a>
          ))}
        </nav>

        {/* ================= COLUMN 3: STANDOUT CTA BUTTON ================= */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <a 
            href="#contact" 
            className="group flex items-center justify-center gap-1.5 px-4 py-1.5 bg-zinc-950 text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-zinc-800 shadow-sm transition-all duration-300 active:scale-[0.98]"
          >
            <span>Request Consulting</span>
            <ArrowUpRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex md:hidden p-1.5 text-zinc-950 focus:outline-none relative z-50 rounded-full hover:bg-zinc-50/50 transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        
      </div>

      {/* ================= MOBILE EXPANDED PANEL ================= */}
      {isMenuOpen && (
        /* 
          ADJUSTMENT: 
          - Swapped background to match the exact header gradient framework
          - Coordinated border opacity to border-zinc-200/40 and set backdrop-blur-md
        */
        <div className="absolute top-full mt-2 left-4 right-4 bg-gradient-to-r from-white/95 via-white/90 to-[var(--color-aqua-primary)]/20 backdrop-blur-md border border-zinc-200/40 shadow-2xl md:hidden z-40 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 ease-out">
          <nav className="flex flex-col p-6 space-y-3 font-mono text-xs uppercase tracking-widest text-center items-center">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2 w-full max-w-xs text-zinc-500 hover:text-zinc-950 hover:bg-zinc-950/5 rounded-xl transition-all"
              >
                <span className="text-zinc-300 text-[9px]">{item.id} //</span>
                <span className="font-bold text-xs tracking-wider">{item.label}</span>
              </a>
            ))}
            
            <div className="pt-2 w-full max-w-xs mx-auto">
              <a 
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-950 text-white text-center font-mono text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:bg-zinc-900 transition-colors"
              >
                <span>Request Consulting</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}