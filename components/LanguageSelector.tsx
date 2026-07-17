"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const languages = [
  { code: "en", name: "English", label: "EN" },
  { code: "am", name: "አማርኛ", label: "አማ" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [showToast, setShowToast] = useState(false);
  const [toastLanguageName, setToastLanguageName] = useState("");
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initializingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Structural Google Widget setup execution definition
  const initGoogleTranslate = useCallback(() => {
    if (typeof window !== "undefined") {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              includedLanguages: "en,am",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
    }
  }, []);

  // Core helper optimized to prevent double loading loops
  const injectGoogleScript = useCallback(() => {
    if (typeof window === "undefined") return;

    if (document.getElementById("google-translate-script")) {
      initGoogleTranslate();
      return;
    }

    initGoogleTranslate();

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, [initGoogleTranslate]);

  // Initial Sync State run safely exactly once on mount
  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    if (match && match[1]) {
      const activeLang = match[1].split("/").pop();
      if (activeLang) setCurrentLang(activeLang);
    } else {
      setCurrentLang("en");
    }

    injectGoogleScript();
  }, [injectGoogleScript]);

  // Clean fallback layout reset engine
  const resetToEnglishFallback = useCallback(() => {
    setCurrentLang("en");
    const pastDate = "Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `googtrans=; path=/; expires=${pastDate};`;
    document.cookie = `googtrans=; path=/; domain=.${window.location.hostname}; expires=${pastDate};`;
    
    const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (googleSelect) {
      googleSelect.value = "en";
      googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  // Handle Language Change with custom Toast triggers
  const handleLanguageChange = useCallback((langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    const selectedLanguageName = languages.find(l => l.code === langCode)?.name || "";
    setToastLanguageName(selectedLanguageName);
    setShowToast(true);
    
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    const targetTransValue = `/en/${langCode}`;

    document.cookie = `googtrans=${targetTransValue}; path=/;${expires}`;
    document.cookie = `googtrans=${targetTransValue}; path=/; domain=.${window.location.hostname};${expires}`;

    let attempts = 0;
    const triggerTranslation = () => {
      const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      
      if (googleSelect) {
        googleSelect.value = langCode;
        googleSelect.dispatchEvent(new Event("focus", { bubbles: true }));
        googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
        googleSelect.dispatchEvent(new Event("blur", { bubbles: true }));
        
        if (langCode === "en") {
          document.querySelectorAll(".goog-te-font-inherit").forEach((el) => {
            el.classList.remove("goog-te-font-inherit");
          });
        }
      } else if (attempts < 20) {
        attempts++;
        timeoutRef.current = setTimeout(triggerTranslation, 100);
      } else {
        resetToEnglishFallback();
      }
    };

    triggerTranslation();

    if (typeof window !== "undefined" && window.google?.translate) {
      window.dispatchEvent(new Event("hashchange"));
    }
  }, [resetToEnglishFallback]);

  const activeLangLabel = languages.find((l) => l.code === currentLang)?.label || "EN";

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50 notranslate" translate="no">
      <div id="google_translate_element" className="hidden" />

      {/* Responsive Trigger Button - Tuned to your Aqua & Zinc theme */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-3 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-950 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300 group cursor-pointer shadow-inner"
      >
        <Globe size={14} className="text-cyan-600 group-hover:rotate-12 transition-transform duration-500 shrink-0" />
        <span className="text-[11px] md:text-[10px] font-mono font-bold tracking-widest uppercase notranslate min-w-5.5 text-center">
          {activeLangLabel}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-500 group-hover:text-cyan-500 shrink-0"
        >
          <ChevronDown size={13} />
        </motion.div>
      </button>

      {/* Dropdown Navigation Menu - Tuned to match Header's glass panel style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 notranslate mt-2 w-40 origin-top-right rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl overflow-hidden"
          >
            <div className="p-1 flex flex-col gap-0.5">
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full notranslate text-left px-4 py-2.5 text-xs font-bold font-mono tracking-wide transition-all duration-300 flex justify-between items-center touch-manipulation rounded-lg group cursor-pointer ${
                      isActive 
                        ? "text-cyan-600 bg-cyan-50/50 font-black" 
                        : "text-zinc-600 hover:bg-cyan-50 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`${lang.code === 'am' ? 'font-sans' : 'font-mono'} text-xs transition-transform duration-300 group-hover:translate-x-0.5`}>
                      {lang.name}
                    </span>
                    
                    {isActive && (
                      <span className="text-[8px] text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded-md uppercase tracking-tighter font-black border border-cyan-500/20 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM CUSTOM POPUP TOAST NOTIFICATION - Styled to match dark branding options */}
      <AnimatePresence onExitComplete={() => setShowToast(false)}>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onAnimationComplete={() => {
              timeoutRef.current = setTimeout(() => setShowToast(false), 3500);
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 notranslate pointer-events-none"
          >
            <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 shadow-2xl text-white px-5 py-3 rounded-xl flex items-center gap-3 min-w-65 justify-center text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-300">
                Translated to: <span className="text-cyan-400 font-bold">{toastLanguageName}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}