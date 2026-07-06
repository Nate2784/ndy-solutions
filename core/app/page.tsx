"use client";

import React, { useState } from 'react';
// FIX: Imported the strict Variants type from framer-motion
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Send, Layout, Laptop, Shield, Check } from 'lucide-react';

export default function NdySolutionsHome() {
  const [activeTab, setActiveTab] = useState<'small' | 'large'>('small');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', businessSize: 'small', message: '' });

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
          className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-blue-50/30 blur-3xl"
        />
      </div>

      {/* ================= SECTION 1: ABOUT THE COMPANY (PREMIUM EDITORIAL HERO) ================= */}
<motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
  id="about" 
  className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start border-b border-[var(--color-editorial-border)] pb-24 group/section"
>
  
  {/* Left Dynamic Typographic Pillar */}
  <div className="lg:col-span-7 space-y-8 relative">
    
    {/* Geographical Anchor Tag */}
    <motion.div 
      variants={scrollReveal}
      className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase"
    >
      <span className="text-[var(--color-aqua-primary)] font-bold">[ HQ // ADDIS ABABA, ETHIOPIA ]</span>
      <span className="text-zinc-300 hidden sm:inline">|</span>
      <span className="text-zinc-500 font-medium tracking-widest hidden sm:inline">9.0192° N, 38.7468° E</span>
    </motion.div>

    {/* Luxury Line-by-Line Stagger Reveal */}
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[0.95] uppercase sm:space-y-1">
      {["We build modern", "digital platforms", "that help you grow your business."].map((line, index) => (
        <span key={index} className="block overflow-hidden pb-1">
          <motion.span
            className="block origin-left"
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

    {/* Interactive Geometric Highlight Accent Line */}
    <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-aqua-primary)] to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity duration-700 hidden lg:block" />
  </div>
  
  {/* Right Contextual Insight Pillar */}
  <motion.div 
    variants={scrollReveal}
    className="lg:col-span-5 space-y-8 lg:pt-14 text-zinc-600 text-base md:text-[17px] leading-relaxed relative"
  >
    <div className="space-y-4">
      <p className="text-zinc-900 font-bold text-xs tracking-[0.2em] uppercase font-mono flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-aqua-primary)] animate-pulse" />
        // LOCAL FOUNDATION × GLOBAL DELIVERY
      </p>
      
      <p className="font-medium text-zinc-900">
        Based proudly out of <span className="underline decoration-[var(--color-aqua-accent)] decoration-2 underline-offset-4 font-semibold text-zinc-950">Addis Ababa, Ethiopia</span>, <br /> <b>Ndy Solutions</b> operates at the intersection of premium design aesthetics and high-performance engineering.
      </p>
    </div>

    <div className="space-y-4 border-t border-zinc-100 pt-6">
      <p className="text-sm text-zinc-500">
        We build beautiful, lightning-fast web architectures and production-grade software ecosystems. Whether you want to command brand authority with a striking new showcase platform or centralize operations with custom cloud tools, our work is engineered to be simple, bulletproof, and built to scale.
      </p>
    </div>

    {/* Subtle Minimal Operational Status Stamp */}
    <div className="pt-2 flex items-center gap-6 font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
      <div>
        <span className="text-zinc-300 block mb-0.5">EST. TIMEZONE</span>
        <span className="font-bold text-zinc-700">EAT (UTC +3)</span>
      </div>
      <div className="w-[1px] h-6 bg-zinc-200" />
      <div>
        <span className="text-zinc-300 block mb-0.5">AVAILABILITY</span>
        <span className="font-bold text-emerald-600 flex items-center gap-1">
          ONLINE
        </span>
      </div>
    </div>
  </motion.div>

</motion.section>

      {/* ================= SECTION 2: WHAT WE DO (USING CUSTOM HOVERS) ================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollReveal}
        id="services" 
        className="relative z-10 space-y-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-950 pb-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-bold block mb-2">
              OUR EXPERTISE
            </span>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 uppercase">
              WHAT WE DO
            </h2>
          </div>
          <span className="font-mono text-[11px] text-zinc-400 tracking-wider">SERVICES WE EXCEL IN</span>
        </div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div 
            variants={scrollReveal}
            whileHover={{ y: -4 }}
            className="p-8 editorial-glass editorial-hover shadow-sm flex flex-col justify-between h-72 group relative overflow-hidden rounded-xl"
          >
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[var(--color-editorial-border)] flex items-center justify-center text-zinc-900 group-hover:bg-[var(--color-aqua-accent)] group-hover:border-[var(--color-aqua-accent)] transition-colors duration-300">
                <Layout className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black tracking-tight text-zinc-950 uppercase">Stunning Web Design</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We design elegant, modern, and pixel-perfect corporate websites. Every layout is optimized to look incredible on mobile devices and attract premium customers easily.
              </p>
            </div>
            <div className="font-mono text-[9px] text-[var(--color-aqua-primary)] tracking-widest font-bold">FAST & RESPONSIVE</div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={scrollReveal}
            whileHover={{ y: -4 }}
            className="p-8 editorial-glass editorial-hover shadow-sm flex flex-col justify-between h-72 group relative overflow-hidden rounded-xl"
          >
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[var(--color-editorial-border)] flex items-center justify-center text-zinc-900 group-hover:bg-[var(--color-aqua-accent)] group-hover:border-[var(--color-aqua-accent)] transition-colors duration-300">
                <Laptop className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black tracking-tight text-zinc-950 uppercase">Custom Business Software</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We build easy-to-use software dashboards, financial tracking apps, and online business systems tailored exactly around how your team operates day-to-day.
              </p>
            </div>
            <div className="font-mono text-[9px] text-zinc-900 tracking-widest font-bold">BUILT FOR YOUR NEEDS</div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={scrollReveal}
            whileHover={{ y: -4 }}
            className="p-8 editorial-glass editorial-hover shadow-sm flex flex-col justify-between h-72 group relative overflow-hidden rounded-xl"
          >
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[var(--color-editorial-border)] flex items-center justify-center text-zinc-900 group-hover:bg-[var(--color-aqua-accent)] group-hover:border-[var(--color-aqua-accent)] transition-colors duration-300">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black tracking-tight text-zinc-950 uppercase">Security & Reliability</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We ensure your customer data is safe, private, and always available. We set up reliable cloud systems so your website stays up and running with zero interruptions.
              </p>
            </div>
            <div className="font-mono text-[9px] text-zinc-400 tracking-widest">SAFE & SECURE HOSTING</div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ================= SECTION 3: SOLUTIONS WE PROVIDE ================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollReveal}
        id="solutions" 
        className="relative z-10 space-y-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-editorial-border)] pb-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-bold block mb-2">
              OUR TARGET PACKAGES
            </span>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 uppercase">
              SOLUTIONS WE PROVIDE
            </h2>
          </div>
          
          <div className="flex p-1 bg-zinc-100 rounded-lg border border-[var(--color-editorial-border)] font-mono text-[10px] tracking-wider uppercase">
            <button 
              onClick={() => setActiveTab('small')}
              className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${activeTab === 'small' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'}`}
            >
              Small Businesses
            </button>
            <button 
              onClick={() => setActiveTab('large')}
              className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${activeTab === 'large' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-950'}`}
            >
              Large Businesses
            </button>
          </div>
        </div>

        <div className="min-h-[280px] relative">
          <AnimatePresence mode="wait">
            {activeTab === 'small' ? (
              <motion.div
                key="small-panel"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center editorial-glass p-8 md:p-12 rounded-2xl"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block font-mono text-[9px] text-[var(--color-aqua-primary)] tracking-[0.2em] uppercase font-bold px-2 py-1 bg-cyan-50 border border-cyan-100 rounded">
                    PREMIUM COMPANY WEBSITES
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 uppercase">Grow Your Online Brand</h3>
                  <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                    Designed specifically for growing businesses, retail stores, or event spaces that want an exceptional online presence. We build clean showcase sites that help you win customer trust, display services clearly, and open up pathways for steady business growth.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-white p-6 border border-[var(--color-editorial-border)] rounded-xl space-y-3 font-mono text-[10px] uppercase tracking-wider text-zinc-700">
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-[var(--color-aqua-primary)]" /> Custom Branding & Colors</div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-[var(--color-aqua-primary)]" /> Ready for Google AdSense & SEO</div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-[var(--color-aqua-primary)]" /> Looks Perfect on Mobile Phones</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="large-panel"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center editorial-glass p-8 md:p-12 rounded-2xl"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block font-mono text-[9px] text-zinc-900 tracking-[0.2em] uppercase font-bold px-2 py-1 bg-zinc-200 border border-zinc-300 rounded">
                    ADVANCED SOFTWARE SYSTEMS
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 uppercase">Automate Business Operations</h3>
                  <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                    Built for larger operations or trading companies dealing with higher volumes of information. We develop powerful management portals, secure login dashboards, and data tracking tools that organize your business workflows completely.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-white p-6 border border-[var(--color-editorial-border)] rounded-xl space-y-3 font-mono text-[10px] uppercase tracking-wider text-zinc-700">
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-zinc-950" /> Secure Financial Data Tools</div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-zinc-950" /> Personal Account Login Areas</div>
                  <div className="flex items-center gap-3"><Check className="w-4 h-4 text-zinc-950" /> Solid, High-Performance Systems</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ================= SECTION 4: CONTACT FORM ================= */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollReveal}
        id="contact" 
        className="relative z-10 space-y-12 max-w-3xl mx-auto"
      >
        <div className="text-center space-y-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-aqua-primary)] uppercase font-bold block">
            GET IN TOUCH WITH US
          </span>
          <h2 className="text-3xl font-black tracking-tighter text-zinc-950 uppercase">
            START YOUR PROJECT TODAY
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 max-w-sm mx-auto">
            Tell us about your project goals. Our design and development team will reach out to you within 12 business hours.
          </p>
        </div>

        <div className="editorial-glass shadow-xl rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                onSubmit={handleFormSubmit} 
                className="space-y-6"
                exit={{ opacity: 0, y: -15 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">Your Name / Company Name</label>
                    <input 
                      type="text" required name="name" value={formData.name} onChange={handleInputChange}
                      placeholder="e.g. Alex Sterling"
                      className="w-full border-b border-[var(--color-editorial-border)] py-3 text-sm text-zinc-950 focus:outline-none focus:border-[var(--color-aqua-primary)] transition-colors placeholder:text-zinc-300 bg-transparent font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">Your Email Address</label>
                    <input 
                      type="email" required name="email" value={formData.email} onChange={handleInputChange}
                      placeholder="alex@company.com"
                      className="w-full border-b border-[var(--color-editorial-border)] py-3 text-sm text-zinc-950 focus:outline-none focus:border-[var(--color-aqua-primary)] transition-colors placeholder:text-zinc-300 bg-transparent font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">What is your business size?</label>
                  <select 
                    name="businessSize" value={formData.businessSize} onChange={handleInputChange}
                    className="w-full border-b border-[var(--color-editorial-border)] py-3 text-sm text-zinc-700 focus:outline-none focus:border-[var(--color-aqua-primary)] transition-colors bg-transparent uppercase font-mono tracking-wider cursor-pointer"
                  >
                    <option value="small">Small Business (Need Web Design / Showcase Website)</option>
                    <option value="large">Large Business (Need Custom Dashboard / Software System)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tell us briefly about your project</label>
                  <textarea 
                    rows={4} required name="message" value={formData.message} onChange={handleInputChange}
                    placeholder="Describe what you want to achieve with your new website or software..."
                    className="w-full border-b border-[var(--color-editorial-border)] py-3 text-sm text-zinc-950 focus:outline-none focus:border-[var(--color-aqua-primary)] transition-colors placeholder:text-zinc-300 bg-transparent resize-none font-sans"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-zinc-950 text-white font-mono text-[11px] tracking-widest uppercase rounded-xl hover:bg-zinc-900 active:scale-[0.99] transition-all flex items-center justify-center gap-3 font-bold shadow-sm"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 text-[var(--color-aqua-accent)]" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 rounded-full flex items-center justify-center text-[var(--color-aqua-primary)] mx-auto shadow-sm">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black tracking-tight text-zinc-950 uppercase">Message Sent!</h3>
                <p className="text-sm text-zinc-600 max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out. We have successfully received your project details and our team will speak with you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

    </div>
  );
}