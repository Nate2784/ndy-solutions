"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/projects" },
    { label: "Solutions", href: "/#solutions" },
    { label: "Contact", href: "/#contact" },
  ];

  // Helper to handle navigation to sections from other pages
  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      if (pathname !== '/') {
        router.push(href);
      } else {
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-zinc-200/50 bg-linear-to-r from-white/95 via-white/90 to-cyan-500/10 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-14 md:h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none group select-none relative z-50 shrink-0">
          <span className="text-lg md:text-xl font-black tracking-tighter text-cyan-500 group-hover:text-cyan-600 transition-colors">NDY</span>
          <span className="text-[6px] md:text-[7px] font-mono tracking-[0.5em] text-zinc-950 font-black uppercase mt-1 pl-px">SOLUTIONS</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 font-mono text-[11px] uppercase tracking-widest">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-zinc-950 hover:text-cyan-500 transition-colors flex items-center gap-1.5 relative py-1 group/link text-left"
            >
              <span className="font-bold">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-500 transition-all duration-300 ease-out group-hover/link:w-full" />
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button 
            onClick={() => handleNavClick('/#contact')}
            className="group flex items-center justify-center gap-1.5 px-4 py-1.5 bg-zinc-950 text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-cyan-500 hover:text-zinc-950 transition-all"
          >
            Request Consulting <ArrowUpRight className="w-3 h-3 text-cyan-400 group-hover:text-zinc-950" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex md:hidden p-1.5 text-zinc-950 z-50">
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Panel */}
      {isMenuOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-6 md:hidden z-100 shadow-2xl">
          <nav className="flex flex-col space-y-4 items-center">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => handleNavClick(item.href)} className="font-mono text-xs font-bold uppercase py-2">
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}