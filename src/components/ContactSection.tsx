'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Selling a Property',
    message: '',
    gdpr: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdpr) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'inquiry',
          source: 'contact-section'
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-transparent border-b border-white/10 py-3 focus:border-brand-gold text-white outline-none transition-all placeholder:text-white/10"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email</label>
                   <input 
                     required
                     type="email" 
                     placeholder="you@luxury.com"
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-transparent border-b border-white/10 py-3 focus:border-brand-gold text-white outline-none transition-all placeholder:text-white/10"
                   />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Interested In</label>
                <select 
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
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
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border border-white/5 p-4 focus:border-brand-gold text-white outline-none transition-all placeholder:text-white/10 resize-none"
                />
             </div>

             <div className="flex items-start gap-4">
               <input 
                 id="gdpr" 
                 type="checkbox" 
                 required 
                 checked={formData.gdpr}
                 onChange={(e) => setFormData({...formData, gdpr: e.target.checked})}
                 className="mt-1"
               />
               <label htmlFor="gdpr" className="text-[10px] text-white/40 leading-relaxed cursor-pointer">
                 I consent to The Jenkins Group storing my information to contact me regarding my inquiry. 
                 Data-driven precision requires human-first trust.
               </label>
             </div>
             
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
