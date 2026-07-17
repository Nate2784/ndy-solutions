"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, AlertCircle, CheckCircle, Loader2, ShieldCheck, XCircle } from "lucide-react";
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sendEmail } from "@/app/actions/sendEmail";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: "", 
    subject: "consultation",
    honeypot: "" // Tracks hidden automated bot field entries
  });
  
  // Track the currently selected country code dynamically to show it next to the flag
  const [currentCountry, setCurrentCountry] = useState<any>("ET");

  // Track touched fields to avoid showing errors before user interacts
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; isError: boolean }>({
    isOpen: false, title: "", message: "", isError: false,
  });

  const wordCount = formData.message.trim() ? formData.message.trim().split(/\s+/).length : 0;

  // Validation Logic
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    if (touched.name && !formData.name) newErrors.name = "Name is required";
    if (touched.name && /[\d]/.test(formData.name)) newErrors.name = "Names cannot contain numbers";
    
    if (touched.email && !formData.email) newErrors.email = "Email is required";
    if (touched.email && !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    
    if (touched.phone && !formData.phone) newErrors.phone = "Phone is required";
    if (touched.phone && formData.phone && !isValidPhoneNumber(formData.phone)) newErrors.phone = "Invalid phone number";
    
    if (touched.message && (wordCount === 0 || wordCount > 300)) newErrors.message = "Message must be 1-300 words";

    setErrors(newErrors);
  }, [formData, touched, wordCount]);

  const isFormValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.phone && formData.message;

  const handleBlur = (field: string) => setTouched({ ...touched, [field]: true });

  const inputClass = "w-full bg-white px-4 py-3 border-2 rounded-xl text-sm outline-none transition-all";
  const getBorder = (field: string) => errors[field] ? "border-red-400" : "border-zinc-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

  return (
    <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl border-2 border-zinc-200/80 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        <ShieldCheck size={16} />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Secure SSL Transmission</span>
      </div>

      <form className="space-y-6" onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await sendEmail(formData);
        if (result.success) {
          setModal({ isOpen: true, title: "DISPATCH SUCCESSFUL", message: "Your message has been routed to our specialist.", isError: false });
          setFormData({ name: "", email: "", phone: "", message: "", subject: "consultation", honeypot: "" });
          setTouched({});
        } else {
          setModal({ isOpen: true, title: "SYSTEM ERROR", message: "Dispatch failed. Please check your data or try again.", isError: true });
        }
        setIsSubmitting(false);
      }}>
        
        {/* Honeypot Field - Visually invisible to humans, trap for automated scrapers */}
        <div className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
          <label className="font-mono text-[10px]">Leave this field completely blank</label>
          <input
            type="text"
            name="fax_number_confirmation"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>
        
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="font-mono text-[10px] font-black uppercase text-zinc-700">Your Name *</label>
            <input type="text" placeholder="Natnael Dagnachew" value={formData.name} 
              onBlur={() => handleBlur('name')}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`${inputClass} ${getBorder('name')}`} />
            {errors.name && <p className="text-red-500 text-[9px] font-mono flex items-center gap-1"><XCircle size={10}/> {errors.name}</p>}
          </div>
          
          <div className="space-y-1">
            <label className="font-mono text-[10px] font-black uppercase text-zinc-700">Email Address *</label>
            <input type="email" placeholder="nate@company.com" value={formData.email} 
              onBlur={() => handleBlur('email')}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`${inputClass} ${getBorder('email')}`} />
            {errors.email && <p className="text-red-500 text-[9px] font-mono flex items-center gap-1"><XCircle size={10}/> {errors.email}</p>}
          </div>
        </div>

        {/* Phone & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-1">
        <label className="font-mono text-[10px] font-black uppercase text-zinc-700">Phone Number *</label>
        
        {/* Modern Visual Separation: Unique inner bg and distinct accent border */}
        <div className={`group relative w-full bg-zinc-50 border-2 rounded-xl transition-all ${errors.phone ? 'border-red-400' : 'border-zinc-200 focus-within:border-cyan-500 focus-within:bg-white'}`}>
            <PhoneInput 
            defaultCountry="ET" 
            value={formData.phone} 
            onBlur={() => handleBlur('phone')}
            onCountryChange={(country) => setCurrentCountry(country)}
            onChange={(val) => setFormData({...formData, phone: val || ""})} 
            className="px-4 py-3 [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountry]:scale-105 [&_.PhoneInputCountrySelect]:cursor-pointer [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputCountrySelectArrow]:ml-1 [&_.PhoneInputInput]:pl-12" 
            />
            {/* Displaying country calling code seamlessly right next to the native flag element container layout */}
            {currentCountry && (
              <span className="absolute left-[54px] top-1/2 -translate-y-1/2 pointer-events-none font-mono text-xs font-semibold text-zinc-500 select-none z-10">
                +{getCountryCallingCode(currentCountry)}
              </span>
            )}
        </div>
        
        {errors.phone && <p className="text-red-500 text-[9px] font-mono flex items-center gap-1"><XCircle size={10}/> {errors.phone}</p>}
        </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] font-black uppercase text-zinc-700">Project Type</label>
            <select className={`${inputClass} ${getBorder('subject')}`} value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
              <option value="consultation">Architectural Consultation</option>
              <option value="platform">Platform Development</option>
              <option value="static-site">Company Profile / Static Website</option>
              <option value="static-site">Other</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="font-mono text-[10px] font-black uppercase text-zinc-700">Project Blueprint *</label>
          <textarea rows={4} placeholder="DESCRIBE YOUR VISION..." value={formData.message} 
            onBlur={() => handleBlur('message')}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className={`${inputClass} ${getBorder('message')} resize-none`} />
          <div className="flex justify-between">
            {errors.message ? 
              <p className="text-red-500 text-[9px] font-mono flex items-center gap-1"><XCircle size={10}/> {errors.message}</p> : <div></div>
            }
            <span className={`text-[10px] font-mono ${wordCount > 300 ? 'text-red-500' : 'text-zinc-400'}`}>{wordCount}/300 words</span>
          </div>
        </div>

        <button disabled={!isFormValid || isSubmitting} type="submit"
          className="w-full py-4 bg-zinc-950 text-white font-mono text-xs font-black uppercase rounded-xl disabled:opacity-30 hover:bg-cyan-600 transition-all flex items-center justify-center gap-2">
          {isSubmitting ? <Loader2 className="animate-spin" /> : <>SEND MESSAGE <ArrowUpRight className="w-4 h-4" /></>}
        </button>
      </form>

      <AnimatePresence>
        {modal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div initial={{scale: 0.95}} animate={{scale: 1}} className="bg-white p-8 rounded-2xl max-w-sm w-full text-center">
              {modal.isError ? <AlertCircle className="mx-auto text-red-500 mb-4" size={48} /> : <CheckCircle className="mx-auto text-cyan-500 mb-4" size={48} />}
              <h3 className="font-bold text-lg mb-2">{modal.title}</h3>
              <p className="text-sm text-zinc-600 mb-6">{modal.message}</p>
              <button onClick={() => setModal({...modal, isOpen: false})} className="w-full py-3 bg-zinc-900 text-white rounded-xl">CLOSE</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}