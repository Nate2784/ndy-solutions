"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(0);

  const pricingData = [
    { title: "Profile", price: "$94.99", unit: "Flat Rate", desc: "Single page professional company profile." },
    { title: "Multi-Page", price: "$49.99", unit: "Per Page", desc: "Scalable websites with custom sub-pages." },
    { title: "Software", price: "Custom", unit: "Estimate", desc: "ERP sys, Multi functional websites, Cloud tools & complex ecosystems." },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative z-10 py-24 border-b-2 border-zinc-950 overflow-hidden"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-zinc-950 leading-[0.9] tracking-tighter uppercase">
                {/* Primary Hero Statement */}
                <span className="block mb-2">BUILDING</span>
                
                {/* The Visual Hook */}
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-teal-400 to-cyan-600 mb-6">
                    ELEGANT WEBSITES
                </span>
                
                {/* The Balanced Value Proposition */}
                <span className="block text-3xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">
                    FOR AN AMAZING PRICE <span className=" text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-teal-400 to-cyan-600 mb-6">!</span>
                </span>
               
                </h2>
            <p className="text-zinc-600 text-lg max-w-md">
              High-end engineering tailored to your scope. Choose your path below to see our transparent pricing tiers.
            </p>
          </div>

          <motion.div className="relative p-1 rounded-4xl bg-linear-to-br from-cyan-400 to-teal-500 shadow-2xl">
            <div className="bg-white p-8 md:p-10 rounded-[1.8rem] flex flex-col items-center text-center space-y-6">
              <div className="flex bg-zinc-100 p-1 rounded-xl w-full">
                {pricingData.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === idx ? 'bg-white shadow-sm text-cyan-600' : 'text-zinc-400'}`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2 py-4"
                >
                  <div className="text-5xl md:text-6xl font-black text-zinc-950">{pricingData[activeTab].price}</div>
                  <div className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">{pricingData[activeTab].unit}</div>
                  <p className="text-zinc-600 text-sm pt-4">{pricingData[activeTab].desc}</p>
                </motion.div>
              </AnimatePresence>

              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-cyan-600 transition-colors cursor-pointer"
              >
                {activeTab === 2 ? "Request Estimate" : "Get My Quote"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}