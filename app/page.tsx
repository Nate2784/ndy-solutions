"use client";

import React, { useState } from 'react';
// FIX: Imported the strict Variants type from framer-motion
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Send, Layout, Laptop, Shield, Check, ArrowUpRight } from 'lucide-react';
import PricingSection from '@/components/PricingSection';
import ContactForm from '@/components/ContactForm';

export default function NdySolutionsHome() {
  const [activeTab, setActiveTab] = useState<'small' | 'large'>('small');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', businessSize: 'small', message: '' });

  const pricingData = [
    { title: "Profile Page", price: "$89.99", unit: "Flat Rate", desc: "Single page professional company profile." },
    { title: "Multi-Page", price: "$67.99", unit: "Per Page", desc: "Scalable websites with custom sub-pages." },
    { title: "Software", price: "Custom", unit: "Estimate", desc: "Cloud tools & complex ecosystems." },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // FIX: Explicitly typed as Variants to satisfy the AnimationGeneratorType requirement
  const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.6 } 
    }
  };

  // FIX: Explicitly typed as Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  return (
    <div className="relative py-12 md:py-20 space-y-32 overflow-hidden">
      
    {/* ================= LIGHT MODE AMBIENT BACKGROUND SYSTEM ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-cyan-100/20 blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -20, 40, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-10 w-125 h-125 rounded-full bg-blue-50/30 blur-3xl"
        />
      </div>

{/* ================= SECTION 1: ABOUT THE COMPANY (ELECTRIC AQUA HERO) ================= */}
<motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
  id="about" 
  className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start border-b-2 border-zinc-950 pb-24 group/section"
>
  
  {/* Left Dynamic Typographic Pillar */}
  <div className="lg:col-span-7 space-y-8 relative pl-0 lg:pl-6">
    
    {/* High-Pop Geographical Anchor Tag */}
    <motion.div 
      variants={scrollReveal}
      className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.25em] bg-cyan-50 border-2 border-cyan-200/80 px-4 py-2 rounded-xl text-cyan-700 font-black shadow-sm shadow-cyan-100"
    >
      <span>HQ // ADDIS ABABA, ETHIOPIA</span>
      <span className="text-cyan-300 hidden sm:inline">|</span>
      <span className="text-cyan-600/70 font-bold hidden sm:inline">9.0192° N, 38.7468° E</span>
    </motion.div>

    {/* Luxury Line-by-Line Stagger Reveal with Electric Accent */}
   <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[0.95] uppercase space-y-1 md:space-y-2">
  {["We build", "digital platforms", "that scale your business."].map((line, index) => (
    <span key={index} className="block overflow-hidden pb-1">
      <motion.span
        className={`block origin-left ${
          index === 1 
            ? 'text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-teal-500 drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]' 
            : ''
        }`}
        variants={{
          hidden: { y: "100%", rotate: 2 },
          visible: { 
            y: 0, 
            rotate: 0,
            transition: { type: 'spring', stiffness: 50, damping: 15, mass: 0.8 } 
          }
        }}
      >
        {line}
      </motion.span>
    </span>
  ))}
</h1>

    {/* Interactive Electric Edge Light (Glows on section hover) */}
    <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b from-cyan-400 via-teal-400 to-transparent opacity-0 scale-y-95 group-hover/section:opacity-100 group-hover/section:scale-y-100 transition-all duration-500 origin-top hidden lg:block shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
  </div>
  
  {/* Right Contextual Insight Pillar */}
  <motion.div 
    variants={scrollReveal}
    className="lg:col-span-5 space-y-8 lg:pt-16 text-zinc-600 text-base md:text-[17px] leading-relaxed relative"
  >
    <div className="space-y-4">
      <p className="text-cyan-600 font-black text-xs tracking-[0.25em] uppercase font-mono flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping absolute opacity-75" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 relative" />
        LOCAL FOUNDATION × GLOBAL DELIVERY
      </p>
      
      <p className="font-medium text-zinc-900 text-lg md:text-xl tracking-tight leading-snug">
        Based proudly out of <span className="relative inline-block px-1 font-black text-zinc-950 z-10 before:absolute before:inset-x-0 before:bottom-1 before:h-3 before:bg-cyan-200/60 before:-z-10 before:transform before:skew-x-6">Addis Ababa, Ethiopia</span>, Ndy Solutions operates at the intersection of premium design aesthetics and high-performance engineering.
      </p>
    </div>

    <div className="space-y-4 border-t-2 border-zinc-100 pt-6 group-hover/section:border-cyan-100 transition-colors duration-500">
      <p className="text-sm md:text-[15px] text-zinc-500 leading-relaxed">
        We build beautiful, lightning-fast web architectures and production-grade software ecosystems. Whether you want to command brand authority with a striking new showcase platform or centralize operations with custom cloud tools, our work is engineered to be simple, bulletproof, and built to scale.
      </p>
    </div>

    {/* High-Visibility Status Dashboard Fragment */}
    <div className="pt-2 flex items-center gap-6 font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
      <div className="bg-zinc-50 border border-zinc-200/60 px-3 py-2 rounded-xl group-hover/section:border-cyan-100 group-hover/section:bg-cyan-50/20 transition-all duration-500">
        <span className="text-zinc-400 block text-[9px] mb-0.5 font-bold tracking-wider">EST. TIMEZONE</span>
        <span className="font-extrabold text-zinc-800 group-hover/section:text-cyan-950">EAT (UTC +3)</span>
      </div>
      
      <div className="bg-zinc-50 border border-zinc-200/60 px-3 py-2 rounded-xl group-hover/section:border-cyan-100 group-hover/section:bg-cyan-50/20 transition-all duration-500">
        <span className="text-zinc-400 block text-[9px] mb-0.5 font-bold tracking-wider">AVAILABILITY</span>
        <span className="font-extrabold text-emerald-600 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ONLINE
        </span>
      </div>
    </div>
  </motion.div>

</motion.section>

{/* ================= SECTION 2: ANIMATED VALUE PROPOSITION ================= */}
<PricingSection />

{/* ================= SECTION 3: WHAT WE DO (HIGH-POP ELECTRIC AQUA MATRIX) ================= */}
<motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
  id="services" 
  className="relative z-10 space-y-16"
>
  {/* Header Block with Vivid Aqua Accentuation */}
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-zinc-950 pb-6 relative">
    <motion.div variants={scrollReveal} className="space-y-2">
      <span className="font-mono text-xs tracking-[0.35em] text-cyan-600 font-black block uppercase">
        // CORE CAPABILITIES
      </span>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase">
        WHAT WE DO
      </h2>
    </motion.div>
    <motion.span 
      variants={scrollReveal}
      className="font-mono text-[10px] text-cyan-700 tracking-widest uppercase bg-cyan-50/80 border-2 border-cyan-200/80 px-4 py-1.5 rounded-full font-bold shadow-sm"
    >
      [ EXPLORE OUR EXPERTISE ]
    </motion.span>
  </div>

  {/* High-Contrast Services Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        icon: <Layout className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
        title: "Design & Full Deployment", // Updated Title
        desc: "We design, build, and deploy elegant corporate websites. We handle the entire technical journey—from your first layout to pushing your site live to the cloud.",
        pill: "FROM DESIGN TO LIVE", // Updated Pill
        glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
        bgGradient: "from-cyan-400/20 via-emerald-400/5 to-transparent"
      },
      {
        icon: <Laptop className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
        title: "Custom Business Software",
        desc: "We build easy-to-use software dashboards, financial tracking apps, and online business systems tailored exactly around how your team operates day-to-day.",
        pill: "BUILT FOR YOUR NEEDS",
        glow: "group-hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
        bgGradient: "from-sky-400/20 via-cyan-400/5 to-transparent"
      },
      {
        icon: <Shield className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
        title: "Security & Reliability",
        desc: "We ensure your customer data is safe, private, and always available. We set up reliable cloud systems so your website stays up and running with zero interruptions.",
        pill: "SAFE & SECURE HOSTING",
        glow: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]",
        bgGradient: "from-teal-400/20 via-cyan-400/5 to-transparent"
      }
    ].map((service, idx) => (
       
      <motion.div 
        key={idx}
        variants={scrollReveal}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`p-8 bg-white/80 backdrop-blur-xl border-2 border-zinc-200/60 hover:border-cyan-400 flex flex-col justify-between h-85 group relative overflow-hidden rounded-2xl transition-all duration-300 ${service.glow}`}
      >
        {/* Dynamic Holographic Radial Backglow on Hover */}
        <div className={`absolute inset-0 bg-linear-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />
        
        {/* Top-Border Twin Trace Line */}
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-cyan-400 to-teal-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />

        <div className="space-y-6 relative z-10">
          {/* Neon Active Icon Block */}
          <div className="w-12 h-12 rounded-xl bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center text-cyan-600 group-hover:bg-linear-to-br group-hover:from-cyan-400 group-hover:to-teal-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm shadow-cyan-100">
            {service.icon}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-black tracking-tight text-zinc-950 uppercase group-hover:text-cyan-950 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal group-hover:text-zinc-900 transition-colors duration-300">
              {service.desc}
            </p>
          </div>
        </div>

        {/* High-Visibility Interactive Label Footer */}
        <div className="font-mono text-[10px] text-zinc-400 group-hover:text-cyan-600 tracking-wider font-extrabold flex items-center gap-2.5 relative z-10 transition-colors duration-300 pt-4 border-t border-zinc-100 group-hover:border-cyan-100">
          <span className="w-2 h-2 rounded-full bg-zinc-300 group-hover:bg-cyan-500 animate-pulse transition-colors duration-300" />
          {service.pill}
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>

{/* ================= SECTION 4: SOLUTIONS WE PROVIDE ================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollReveal}
        id="solutions" 
        className="relative z-10 space-y-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-zinc-950 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.35em] text-cyan-600 uppercase font-black block mb-2">
              OUR TARGET PACKAGES
            </span>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 uppercase">
              SOLUTIONS WE PROVIDE
            </h2>
          </div>
          
          <div className="flex p-1 bg-zinc-100 rounded-xl border border-zinc-200/80 font-mono text-[10px] tracking-wider uppercase shadow-sm">
            <button 
              onClick={() => setActiveTab('small')}
              className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${activeTab === 'small' ? 'bg-white text-cyan-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'}`}
            >
              Small Businesses
            </button>
            <button 
              onClick={() => setActiveTab('large')}
              className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${activeTab === 'large' ? 'bg-white text-teal-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'}`}
            >
              Large Businesses
            </button>
          </div>
        </div>

        <div className="min-h-70 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'small' ? (
              <motion.div
                key="small-panel"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center editorial-glass p-8 md:p-12 rounded-2xl border-2 border-zinc-200/60 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300 group"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block font-mono text-[9px] text-cyan-700 tracking-[0.2em] uppercase font-black px-2.5 py-1 bg-cyan-50 border-2 border-cyan-200/60 rounded-md shadow-sm">
                    PREMIUM COMPANY WEBSITES
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 uppercase group-hover:text-cyan-950 transition-colors">Grow Your Online Brand</h3>
                  <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                    Designed specifically for growing businesses, retail stores, or event spaces that want an exceptional online presence. We build clean showcase sites that help you win customer trust, display services clearly, and open up pathways for steady business growth.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 border-2 border-zinc-200/60 group-hover:border-cyan-200 rounded-xl space-y-3 font-mono text-[10px] uppercase tracking-wider text-zinc-700 shadow-sm transition-colors">
                  <div className="flex items-center gap-3 font-bold text-zinc-800"><Check className="w-4 h-4 text-cyan-500" /> Custom Branding & Colors</div>
                  <div className="flex items-center gap-3 font-bold text-zinc-800"><Check className="w-4 h-4 text-cyan-500" /> Ready for Google AdSense & SEO</div>
                  <div className="flex items-center gap-3 font-bold text-zinc-800"><Check className="w-4 h-4 text-cyan-500" /> Looks Perfect on Mobile Phones</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="large-panel"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center editorial-glass p-8 md:p-12 rounded-2xl border-2 border-zinc-200/60 hover:border-teal-400/60 hover:shadow-[0_0_30px_rgba(20,184,166,0.12)] transition-all duration-300 group"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block font-mono text-[9px] text-teal-700 tracking-[0.2em] uppercase font-black px-2.5 py-1 bg-teal-50 border-2 border-teal-200/60 rounded-md shadow-sm">
                    ADVANCED SOFTWARE SYSTEMS
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 uppercase group-hover:text-teal-950 transition-colors">Automate Business Operations</h3>
                  <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                    Built for larger operations or trading companies dealing with higher volumes of information. We develop powerful management portals, secure login dashboards, and data tracking tools that organize your business workflows completely.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 border-2 border-zinc-200/60 group-hover:border-teal-200 rounded-xl space-y-3 font-mono text-[10px] uppercase tracking-wider text-zinc-700 shadow-sm transition-colors">
                  <div className="flex items-center gap-3 font-bold text-zinc-800"><Check className="w-4 h-4 text-teal-500" /> Secure Financial Data Tools</div>
                  <div className="flex items-center gap-3 font-bold text-zinc-800"><Check className="w-4 h-4 text-teal-500" /> Personal Account Login Areas</div>
                  <div className="flex items-center gap-3 font-bold text-zinc-800"><Check className="w-4 h-4 text-teal-500" /> Solid, High-Performance Systems</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

{/* ================= SECTION 5: CONTACT ENGAGEMENT (ELECTRIC AQUA FORM) ================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollReveal}
        id="contact" 
        className="relative z-10 space-y-12"
      >
        {/* Section Title Unit */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-zinc-950 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.35em] text-cyan-600 uppercase font-black block mb-2">
              // INITIATE PROJECTS
            </span>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 uppercase">
              LET'S BUILD TOGETHER
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase hidden md:inline-block">
            ESTIMATED RESPONSE: TIME &lt; 5 business days
          </span>
        </div>

        {/* Core Architecture Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Action Narrative */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between py-2">
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-zinc-950 uppercase">
                Ready to elevate your digital infrastructure?
              </h3>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                Whether you need a high-utility company showcase optimized for traffic and monetization, or a secure full-stack operational portal, let’s map out a blueprint that fits your project vision flawlessly.
              </p>
            </div>

            {/* Quick Context Chips */}
            <div className="space-y-3 pt-6 border-t border-zinc-200/80">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-zinc-600">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                SYSTEM AVAILABILITY: ACTIVE FOR Q3
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-zinc-600">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                PRIMARY CORE: ADDIS ABABA & GLOBAL
              </div>
            </div>
          </div>

          {/* Right Column: High-Pop Form Shell */}
<div className="lg:col-span-7 backdrop-blur-md  transition-all duration-300">
  <ContactForm />
</div>

        </div>
      </motion.section>

    </div>
  );
}