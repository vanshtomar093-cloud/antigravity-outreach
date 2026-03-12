'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interestedIn, setInterestedIn] = useState("Selling a Property");
  const [messageText, setMessageText] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!gdprConsent) {
      setError("Please agree to the GDPR terms before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const resp = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          interestedIn,
          message: messageText,
          gdprConsent,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setSuccess(true);
      // reset fields
      setName("");
      setEmail("");
      setInterestedIn("Selling a Property");
      setMessageText("");
      setGdprConsent(false);
    } catch (err: any) {
      console.error("Inquiry submit error", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-sm uppercase tracking-[0.5em] text-brand-gold font-bold mb-6">Inquiry</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-8 leading-tight">
            The Conversation <br /> <span className="italic italic text-brand-gold">Starts Here.</span>
          </h3>
          <p className="text-brand-charcoal/60 text-lg leading-relaxed max-w-md mb-12 font-sans">
            Whether you are listing a legacy estate or seeking a precision market entry, Sarah Jenkins and her team provide the clarity you deserve.
          </p>

          <div className="space-y-8">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded-full">
                   <Mail size={20} className="text-brand-gold" />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold mb-1">Inquiries</p>
                   <p className="text-brand-charcoal font-serif text-lg">sarah@jenkinsgroup.com</p>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded-full">
                   <Phone size={20} className="text-brand-gold" />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold mb-1">Direct Line</p>
                   <p className="text-brand-charcoal font-serif text-lg">+1 (555) 234-5678</p>
                </div>
             </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="bg-brand-charcoal p-10 lg:p-16 relative"
        >
          {/* Success Overlay */}
          {success && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 bg-brand-charcoal flex flex-col items-center justify-center p-10 text-center"
            >
               <div className="p-6 bg-brand-gold/20 rounded-full mb-6 text-brand-gold">
                  <CheckCircle size={64} strokeWidth={1} />
               </div>
               <h4 className="text-3xl font-serif text-white mb-4 italic">Message Received.</h4>
               <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                 Thank you for reaching out. Sarah will review your inquiry and contact you within one business hour.
               </p>
               <button 
                 onClick={() => setSuccess(false)}
                 className="mt-10 border border-brand-gold text-brand-gold px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-charcoal transition-all"
               >
                 Send Another Message
               </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Name</label>
                   <input 
                     required
                     type="text" 
                     placeholder="Your full name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full bg-transparent border-b border-white/10 py-3 focus:border-brand-gold text-white outline-none transition-all placeholder:text-white/10"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email</label>
                   <input 
                     required
                     type="email" 
                     placeholder="you@luxury.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-transparent border-b border-white/10 py-3 focus:border-brand-gold text-white outline-none transition-all placeholder:text-white/10"
                   />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Interested In</label>
                <select
                  value={interestedIn}
                  onChange={(e) => setInterestedIn(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:border-brand-gold text-white/60 outline-none transition-all appearance-none"
                >
                   <option className="bg-brand-charcoal text-white">Selling a Property</option>
                   <option className="bg-brand-charcoal text-white">Acquisition Inquiry</option>
                   <option className="bg-brand-charcoal text-white">Strategic Consulting</option>
                   <option className="bg-brand-charcoal text-white">Other</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="How can The Jenkins Group assist you?"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-transparent border border-white/5 p-4 focus:border-brand-gold text-white outline-none transition-all placeholder:text-white/10 resize-none"
                />
             </div>

             <div className="flex items-center gap-2">
               <input
                 type="checkbox"
                 checked={gdprConsent}
                 onChange={(e) => setGdprConsent(e.target.checked)}
                 id="gdpr-consent"
                 className="w-4 h-4 form-checkbox text-brand-gold"
               />
               <label htmlFor="gdpr-consent" className="text-xs text-white/70">
                 I agree to the <a href="/privacy" className="underline">privacy policy</a> and consent to having my data processed.
               </label>
             </div>

             {error && (
               <p className="text-red-400 text-sm">{error}</p>
             )}
             
             <button 
               type="submit" 
               disabled={isSubmitting}
               className="w-full bg-brand-gold text-brand-charcoal py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
             >
                {isSubmitting ? "Sending..." : (
                  <>
                    Secure Communication <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
             </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
