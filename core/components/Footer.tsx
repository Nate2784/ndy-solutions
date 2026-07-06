import React from 'react';

export default function Footer() {
  return (
    /* 
      - Tied directly to your theme variable: to-[var(--color-aqua-primary)]
      - Added a trailing /15 opacity modifier to keep the background soft and the typography sharp.
        (Feel free to adjust or remove the /15 depending on how intense you want the color to be!)
    */
    <footer className="relative z-50 border-t border-zinc-200/50 bg-gradient-to-br from-white to-[var(--color-aqua-primary)]/15 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-8 md:pb-12">
        
        {/* Upper Layout: Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Brand Statement Column */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-950 leading-none">
              BUILDING TO LAST.<br />
              SCALING TO LEAD.
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span>PREMIUM DESIGN & EXPONENTIAL SOFTWARE</span>
            </div>
          </div>

          {/* Directory Links Column */}
          <div className="lg:col-span-4 font-mono text-xs tracking-widest uppercase space-y-4">
            <h4 className="text-zinc-950 font-bold text-[11px] tracking-[0.2em]">DIRECTORY</h4>
            <ul className="space-y-2.5 text-zinc-500">
              <li>
                <a href="#about" className="hover:text-zinc-950 transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-300 -ml-2 group-hover:ml-0">→</span> About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-zinc-950 transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-300 -ml-2 group-hover:ml-0">→</span> Our Services
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-zinc-950 transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-300 -ml-2 group-hover:ml-0">→</span> Target Packages
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-zinc-950 transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-300 -ml-2 group-hover:ml-0">→</span> Get In Touch
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ================= GLOBAL CENTERING BOTTOM LAYER ================= */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-zinc-200/30 text-center">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-zinc-400">
            © {new Date().getFullYear()} <span className="text-zinc-950 font-bold">NDY SOLUTIONS LLC</span>. All rights reserved globally.
          </p>
        </div>

      </div>
    </footer>
  );
}