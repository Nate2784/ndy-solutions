"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation"; // 1. Import pathname hook
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "pricing", label: "Pricing" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "contact", label: "Contact" }
];

export default function ScrollingAquaBall() {
  const pathname = usePathname(); // 2. Grab current route
  const [activeSection, setActiveSection] = useState("about");
  const [ballPosition, setBallPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isMobileVisible, setIsMobileVisible] = useState(true);
  const milestoneRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // 3. Intersection Observer to detect current view section
  useEffect(() => {
    // Safety exit if we are not on the main homepage
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", 
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // 4. Track element coordinates for absolute alignment precision
  useEffect(() => {
    if (pathname !== "/") return;

    const updatePosition = () => {
      const activeBtn = milestoneRefs.current[activeSection];
      if (activeBtn) {
        setBallPosition({
          top: activeBtn.offsetTop,
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          height: activeBtn.offsetHeight,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeSection, isMobileVisible, pathname]);

  // 5. If the user is on /projects or any other route, stop here and show nothing
  if (pathname !== "/") return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= DESKTOP LAYOUT (Left Side Margin Gutter) ================= */}
      {/* Elevated to z-100 to consistently float cleanly above layout background/footers */}
      <div className="notranslate fixed left-6 top-0 h-screen w-12 hidden xl:flex flex-col items-center justify-center pointer-events-none z-100">
        <div className="relative flex flex-col justify-between py-8 items-center h-[50vh] w-full bg-white/40 border border-zinc-200/50 backdrop-blur-md rounded-full pointer-events-auto shadow-sm">
          <div className="absolute top-10 bottom-10 w-0.5 border-l-2 border-dashed border-zinc-200 -z-10" />

          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                ref={(el) => { milestoneRefs.current[sec.id] = el; }}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-center w-8 h-8 focus:outline-hidden cursor-pointer"
                aria-label={`Go to ${sec.label}`}
              >
                <div className="w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-cyan-300 transition-colors duration-300" />
                
                <span className={`absolute left-10 px-2.5 py-1 rounded-lg border font-mono text-[9px] font-black tracking-widest uppercase whitespace-nowrap transition-all duration-300 pointer-events-none shadow-xs
                  ${isActive 
                    ? "bg-cyan-50 border-cyan-200 text-cyan-700 opacity-100 translate-x-0" 
                    : "bg-white border-zinc-200 text-zinc-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }
                `}>
                  {sec.label}
                </span>
              </button>
            );
          })}

          {/* Dynamic Tracker Ball */}
          <motion.div
            animate={{
              y: ballPosition.top,
              x: ballPosition.left,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="absolute top-0 left-0 w-8 h-8 rounded-full pointer-events-none flex items-center justify-center"
            style={{ boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
          >
            <div className="w-6 h-6 rounded-full bg-radial from-cyan-400 via-teal-500 to-cyan-950 overflow-hidden border border-cyan-300 relative">
              <div className="absolute top-[8%] left-[15%] w-[40%] h-[25%] rounded-full bg-linear-to-b from-white/60 to-transparent rotate-[-15deg] blur-[0.5px]" />
            </div>
          </motion.div>
        </div>
      </div>


      {/* ================= MOBILE LAYOUT (Floating Under Header) ================= */}
      {/* Elevated to z-100 to remain on top of any page content elements */}
      <AnimatePresence>
        {isMobileVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-0 flex justify-center xl:hidden z-100 px-4 pointer-events-none"
          >
            <div className="notranslate relative flex items-center justify-between w-full max-w-md bg-white/90 border border-zinc-200/80 backdrop-blur-md py-2.5 pl-4 pr-2 rounded-xl pointer-events-auto shadow-md">
              
              {/* Mobile navigational options container */}
              <div className="relative flex items-center justify-around flex-1 mr-2">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={`${sec.id}-mobile`}
                      ref={(el) => { if (window.innerWidth < 1280) milestoneRefs.current[sec.id] = el; }}
                      onClick={() => scrollToSection(sec.id)}
                      className="relative flex flex-col items-center justify-center py-1 flex-1 text-center focus:outline-hidden cursor-pointer"
                    >
                      <span className={`font-mono text-[8px] font-black tracking-wider uppercase transition-all duration-300
                        ${isActive ? "text-cyan-600 scale-105" : "text-zinc-400"}
                      `}>
                        {sec.label}
                      </span>
                    </button>
                  );
                })}

                {/* Mobile horizontal tracking line */}
                <motion.div
                  animate={{
                    x: ballPosition.left,
                    width: ballPosition.width,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  className="absolute bottom-0 h-0.5 bg-linear-to-r from-cyan-400 to-teal-500 rounded-full pointer-events-none shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  style={{ left: 0 }}
                />
              </div>

              <div className="w-px h-5 bg-zinc-200 mx-1" />

              {/* Minimal Dismiss Icon (X) Button */}
              <button
                onClick={() => setIsMobileVisible(false)}
                className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Hide progress guide"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2.5} 
                  stroke="currentColor" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}