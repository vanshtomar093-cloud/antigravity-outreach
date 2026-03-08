'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, ShieldCheck } from 'lucide-react';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ValuationModal({ isOpen, onClose }: ValuationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeframe: 'immediately',
    gdpr: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
          interest: `Valuation for ${formData.address}`,
          message: `Timeframe: ${formData.timeframe}`,
          type: 'valuation-request',
          source: 'hero-valuation-modal'
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-none shadow-2xl overflow-hidden border border-brand-gold/20"
          >
            {/* Header */}
            <div className="bg-brand-charcoal p-8 flex justify-between items-start">
              <div className="flex flex-col">
                <h2 className="text-2xl font-serif text-brand-gold tracking-tight mb-2">
                  {success ? "Success" : "Your Valuation Request"}
                </h2>
                <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed">
                  {success 
                    ? "Thank you for trusting The Jenkins Group." 
                    : "Data-driven precision for your real estate legacy."}
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-8">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/60 font-bold block">Property Address</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Where is your home located?"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full border-b border-brand-charcoal/10 py-3 focus:border-brand-gold outline-none transition-colors text-brand-charcoal font-serif text-xl bg-transparent placeholder:text-brand-charcoal/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/60 font-bold block">Estimated Timeframe to Sell</label>
                        <select 
                          value={formData.timeframe}
                          onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                          className="w-full border-b border-brand-charcoal/10 py-3 focus:border-brand-gold outline-none transition-colors text-brand-charcoal font-sans text-sm bg-transparent"
                        >
                          <option value="immediately">Immediately</option>
                          <option value="1-3-months">1-3 Months</option>
                          <option value="6-months">6+ Months</option>
                          <option value="just-curious">Just Curious</option>
                        </select>
                      </div>
                      <button 
                         type="button" 
                         onClick={() => formData.address && setStep(2)}
                         className="w-full bg-brand-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-charcoal transition-all disabled:opacity-30"
                         disabled={!formData.address}
                      >
                        Next: Contact Details
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/60 font-bold block">Full Name</label>
                           <input 
                             required
                             type="text" 
                             placeholder="Full Name"
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             className="w-full border-b border-brand-charcoal/10 py-2 focus:border-brand-gold outline-none transition-colors text-brand-charcoal font-sans text-sm bg-transparent"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/60 font-bold block">Phone Number</label>
                           <input 
                             required
                             type="tel" 
                             placeholder="(555) 000-0000"
                             value={formData.phone}
                             onChange={(e) => setFormData({...formData, phone: e.target.value})}
                             className="w-full border-b border-brand-charcoal/10 py-2 focus:border-brand-gold outline-none transition-colors text-brand-charcoal font-sans text-sm bg-transparent"
                           />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/60 font-bold block">Email Address</label>
                         <input 
                           required
                           type="email" 
                           placeholder="you@luxury.com"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full border-b border-brand-charcoal/10 py-2 focus:border-brand-gold outline-none transition-colors text-brand-charcoal font-sans text-sm bg-transparent"
                         />
                       </div>

                       <div className="flex items-center gap-3 py-4 text-xs text-brand-charcoal/40 bg-brand-gold/5 px-4">
                          <ShieldCheck size={16} className="text-brand-gold" />
                          <span>We respect your privacy. No spam, only data-driven insights.</span>
                       </div>

                       <div className="flex items-start gap-4 py-2">
                         <input 
                           id="gdpr-modal" 
                           type="checkbox" 
                           required 
                           checked={formData.gdpr}
                           onChange={(e) => setFormData({...formData, gdpr: e.target.checked})}
                           className="mt-1"
                         />
                         <label htmlFor="gdpr-modal" className="text-[10px] text-brand-charcoal/40 leading-relaxed cursor-pointer">
                           I consent to The Jenkins Group storing my information to contact me regarding my valuation. 
                           Privacy and precision are our core pillars.
                         </label>
                       </div>

                       <div className="flex gap-4">
                          <button 
                            type="button" 
                            onClick={() => setStep(1)}
                            className="px-6 border border-brand-charcoal text-brand-charcoal py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-charcoal hover:text-white transition-all"
                          >
                            Back
                          </button>
                          <button 
                            type="submit" 
                            className="flex-1 bg-brand-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-charcoal transition-all flex items-center justify-center gap-2"
                            disabled={isSubmitting || !formData.gdpr}
                          >
                            {isSubmitting ? "Processing..." : (
                              <>
                                Submit Strategy Call <Send size={14} />
                              </>
                            )}
                          </button>
                       </div>

                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-6">
                   <div className="flex justify-center">
                      <div className="p-6 bg-brand-gold/20 rounded-full">
                         <CheckCircle size={60} className="text-brand-gold" strokeWidth={1} />
                      </div>
                   </div>
                   <h3 className="text-3xl font-serif text-brand-charcoal italic">Request Submitted.</h3>
                   <div className="w-12 h-[2px] bg-brand-gold mx-auto" />
                   <div className="space-y-2 max-w-sm mx-auto">
                     <p className="text-sm font-sans text-brand-charcoal/60 leading-relaxed">
                       Our proprietary AI strategy team is already analyzing <strong>{formData.address}</strong>.
                     </p>
                     <p className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal font-bold pt-4">
                       Sarah or a Senior Partner will reach out within 15 minutes.
                     </p>
                   </div>
                   <button 
                      onClick={onClose}
                      className="mt-8 bg-brand-charcoal text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-charcoal transition-all"
                   >
                     Close Window
                   </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
