"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-50 border-t-2 border-zinc-950 bg-linear-to-tr from-zinc-50 via-white to-cyan-500/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-12">
        
        {/* Asymmetric Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200/80">
          
          {/* Main Manifesto Block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-600 uppercase font-black block">
              // DESIGN PHILOSOPHY
            </span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-[1.1]">
              INTELLIGENT ARCHITECTURE.<br />
              <span className="text-cyan-500">INTUITIVE INTERFACES.</span>
            </h3>
            <p className="max-w-xl text-zinc-600 text-sm leading-relaxed font-medium">
              A specialized digital workshop delivering high-utility web architecture, data-driven systems, and visually arresting user interfaces tailored for high market performance.
            </p>
          </div>

          {/* Directory & Operations Blocks */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 lg:pt-0 text-left">
            
            {/* Nav Matrix */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                // navigate
              </h4>
              <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
                {[
                  { name: "The Workspace", path: "/#about" },
                  { name: "Capabilities", path: "/#services" },
                  { name: "Projects", path: "/projects" },
                  { name: "Core Solutions", path: "/#solutions" },
                  { name: "Initiate Session", path: "/#contact" }
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover:scale-125 transition-transform" />
                    <a href={item.path} className="text-zinc-950 font-bold hover:text-cyan-500 transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terminal Pipeline */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                // Contact
              </h4>
              <div className="space-y-3 font-mono text-xs tracking-wider">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-zinc-400 block uppercase">SECURE MAIL</span>
                  <a href="mailto:nate@company.com" className="text-zinc-950 font-bold hover:text-cyan-500 font-sans tracking-normal lowercase transition-colors block">
                    Ndytechsolutions@gmail.com
                  </a>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-zinc-400 block uppercase">NODE REGION</span>
                  <span className="text-zinc-950 font-bold font-sans tracking-normal block">
                    Addis Ababa // Remote
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Lower Utility Horizon Row */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
          
          {/* Horizontal Social Index */}
          <div className="flex flex-wrap items-start justify-start gap-x-6 gap-y-2 font-mono text-[10px] tracking-widest uppercase">
            <span className="text-zinc-400 font-bold">NETWORKS:</span>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-950 font-black hover:text-cyan-500 transition-colors">
              [ GitHub ]
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-950 font-black hover:text-cyan-500 transition-colors">
              [ LinkedIn ]
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-950 font-black hover:text-cyan-500 transition-colors">
              [ Instagram ]
            </a>
          </div>

          {/* Legal Stamp */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            © {new Date().getFullYear()} <span className="text-zinc-950 font-black">NDY TECH SOLUTIONS LLC</span>. All rights reserved globally.
          </p>
          
        </div>

      </div>
    </footer>
  );
}