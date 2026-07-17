"use client";

import  { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import LanguageSelector from './LanguageSelector'; // Ensure this matches your file name exactly

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

 const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Check if the link is an anchor link (starts with /#)
    if (href.startsWith('/#')) {
      const id = href.replace('/#', ''); // Extract the ID (e.g., "about")
      
      if (pathname !== '/') {
        // If we are on another page (e.g., /projects), 
        // redirect to the root path and append the hash
        router.push(`/${href}`); 
        // Note: Next.js will handle the scroll automatically if you 
        // define the scroll behavior in your next.config.js or via useEffect
      } else {
        // If we are already on the homepage, scroll smoothly
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Standard page navigation
      router.push(href);
    }
  };

  return (
    <header translate="no" className="notranslate sticky top-0 z-100 border-b border-zinc-200/50 bg-linear-to-r from-white/95 via-white/90 to-cyan-500/10 backdrop-blur-md transition-all duration-300">
      {/* Header structural tracking container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-14 md:h-16 flex items-center justify-between relative">
        
        {/* LEFT: Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="flex md:hidden p-1.5 text-zinc-950 z-50 -ml-1.5 transition-transform active:scale-95 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        {/* CENTER (Mobile) / LEFT (Desktop): Logo */}
        <Link 
          href="/" 
          className="flex flex-col items-center md:items-start leading-none group select-none z-50 shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <span className="text-lg md:text-xl font-black tracking-tighter text-cyan-500 group-hover:text-cyan-600 transition-colors">NDY</span>
          <span className="text-[6px] md:text-[7px] font-mono tracking-[0.5em] text-zinc-950 font-black uppercase mt-1 pl-px"> Tech SOLUTIONS</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 font-mono text-[11px] uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-zinc-950 hover:text-cyan-500 transition-colors flex items-center gap-1.5 relative py-1 group/link text-left cursor-pointer"
            >
              <span className="font-bold">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-500 transition-all duration-300 ease-out group-hover/link:w-full" />
            </button>
          ))}
        </nav>

        {/* RIGHT: Language Switcher + CTA */}
        <div className="flex items-center gap-4 z-50">
          <LanguageSelector />

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button 
              onClick={() => handleNavClick('/#contact')}
              className="group flex items-center justify-center gap-1.5 px-4 py-1.5 bg-zinc-950 text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-cyan-500 hover:text-zinc-950 transition-all cursor-pointer shadow-md hover:shadow-cyan-500/20"
            >
              Request Consulting <ArrowUpRight className="w-3 h-3 text-cyan-400 group-hover:text-zinc-950" />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Panel */}
      {isMenuOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-6 md:hidden z-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4 items-center">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.href)} 
                className="font-mono text-xs font-bold uppercase py-2 w-full text-center hover:text-cyan-500 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={() => handleNavClick('/#contact')}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-950 text-white font-mono text-[11px] uppercase tracking-widest rounded-xl hover:bg-cyan-500 transition-colors cursor-pointer"
            >
              Request Consulting <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}