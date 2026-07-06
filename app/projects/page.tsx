"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Globe, Sparkles, Play, Power, Mail, Database } from 'lucide-react';

export default function NdySolutionsProjects() {
  const [isInteractive, setIsInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setIsInteractive(false);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 18, mass: 0.8 } }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative py-12 md:py-20 overflow-hidden min-h-screen bg-white selection:bg-cyan-500 selection:text-white" ref={containerRef}>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-50/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-125 h-125 rounded-full bg-zinc-100/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="relative z-10 space-y-4 border-b-0 md:border-b-2 border-zinc-950 pb-10 mb-16">
          <motion.span variants={scrollReveal} className="font-mono text-xs tracking-[0.4em] text-cyan-600 font-black block uppercase">// SELECTED PRODUCTION DEPLOYMENTS</motion.span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950 uppercase">PROUD WORK</h1>
        </motion.div>

        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* LEFT: Text Content */}
          <motion.div variants={scrollReveal} className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 text-white font-mono text-[9px] tracking-widest font-black uppercase rounded-md shadow-sm w-fit">
                <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-400" /> FLAGSHIP CASE STUDY
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 uppercase tracking-tight">Ayana General Trading</h2>
            </div>
            
            <div className="space-y-6 text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
              <p>A premium, highly-stylized digital storefront designed to match the elite market presence of Ayana General Trading. This platform trades heavy, cluttered layouts for an ultra-clean, minimalist aesthetic that commands immediate corporate authority.</p>
            {/* Lead Capture Documentation */}
                <div className="p-4 border-l-2 border-cyan-500 bg-cyan-500/5 rounded-r-lg">
                  <h4 className="font-mono text-[10px] font-bold text-cyan-700 uppercase mb-2">// Lead Capture Pipeline</h4>
                  <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
                    Form submissions are routed through a server-side API endpoint, encrypting user data and triggering an automated SMTP dispatch directly to the organization's corporate inbox for immediate sales team notification.
                  </p>
                </div>  
            {/* Project Tech Specs Stack Grid */}

          <div className="border-t border-zinc-200 pt-6 space-y-4">

            <span className="font-mono text-[10px] tracking-wider text-zinc-400 font-bold block uppercase">// DEPLOYMENT METRICS</span>

            <div className="grid grid-cols-2 gap-4 font-mono text-[11px] uppercase">

              <div className="bg-zinc-50/80 border border-zinc-200/60 p-3 rounded-xl">

                <span className="text-zinc-400 text-[9px] block mb-0.5 font-bold">INFRASTRUCTURE</span>

                <span className="font-extrabold text-zinc-900 flex items-center gap-1.5">

                  <Globe className="w-3.5 h-3.5 text-zinc-900" /> VERCEL EDGE

                </span>

              </div>

              <div className="bg-zinc-50/80 border border-zinc-200/60 p-3 rounded-xl">

                <span className="text-zinc-400 text-[9px] block mb-0.5 font-bold">CORE ENGINE</span>

                <span className="font-extrabold text-zinc-900">NEXT.JS + TS</span>

              </div>


              <div className="bg-zinc-50/80 border border-zinc-200/60 p-3 rounded-xl">

                <span className="text-zinc-400 text-[9px] block mb-0.5 font-bold">STYLING MATRIX</span>

                <span className="font-extrabold text-zinc-900">TAILWIND CSS</span>

              </div>



              <div className="bg-zinc-50/80 border border-zinc-200/60 p-3 rounded-xl">

                <span className="text-zinc-400 text-[9px] block mb-0.5 font-bold">CORE PERFORMANCE</span>

                <span className="font-extrabold text-emerald-600 flex items-center gap-1">

                  <Zap className="w-3.5 h-3.5 fill-emerald-500 text-transparent" /> 100% LIGHTHOUSE

                </span>

              </div>

            </div>

          </div>
          </div>
          </motion.div>

          {/* RIGHT: Phone Frame + Button Group */}
          <motion.div variants={scrollReveal} className="space-y-6">
            <div className="w-75 h-137.5 mx-auto bg-zinc-950 rounded-[3rem] border-8 border-cyan-900 relative overflow-hidden shadow-2xl transition-all duration-500">
              <AnimatePresence mode="wait">
                {!isInteractive ? (
                  <motion.div key="static" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 p-6 text-center">
                    <Globe className="w-12 h-12 text-zinc-700 mb-4" />
                    <button onClick={() => setIsInteractive(true)} className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 font-black text-[10px] tracking-widest uppercase rounded-full hover:bg-cyan-400 transition-all">
                      <Play className="w-3 h-3 fill-current" /> Start Interaction
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 w-full h-full">
                    <iframe src="https://ayana-eight.vercel.app/" className="w-full h-full border-none" />
                    <button onClick={() => setIsInteractive(false)} className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-red-500/90 text-white rounded-full font-mono text-[9px] shadow-lg">
                      <Power className="w-3 h-3" /> FREEZE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Visit Button Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white border-2 border-zinc-200/80 rounded-2xl shadow-xs mx-auto max-w-75 sm:max-w-none">
              <div className="flex items-center gap-3 font-mono text-[10px] font-extrabold tracking-wider text-zinc-700 uppercase">
                <ShieldCheck className="w-5 h-5 text-cyan-500" /> SSL Secured
              </div>
              <a 
                href="https://ayana-eight.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-cyan-500 text-white hover:text-zinc-950 font-mono text-[11px] font-black tracking-wider uppercase rounded-xl shadow-xs transition-all"
              >
                Visit WebPage <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}